// Stage 14 GroupMe reader for Club Event Radar.
// GroupMe credentials and IDs are read only from Supabase Edge Function Secrets.

import { createClient } from "npm:@supabase/supabase-js@2.117.2";

const SOURCE = "groupme";
const MAX_MESSAGES = 20;
const THREAD_WINDOW_MS = 10 * 60 * 1000;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type GroupMeMessage = {
  id?: string;
  text?: string;
  name?: string;
  sender_id?: string;
  sender_type?: string;
  system?: boolean;
  created_at?: number;
};

function reply(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

function serverKey(): string {
  const keys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (keys) {
    try {
      const key = JSON.parse(keys)["default"];
      if (key) return key;
    } catch (_) { /* fall back below */ }
  }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}

function config() {
  return {
    token: Deno.env.get("GROUPME_TOKEN") ?? "",
    groupId: Deno.env.get("GROUPME_GROUP_ID") ?? "",
    botId: Deno.env.get("GROUPME_BOT_ID") ?? "",
    supabaseUrl: Deno.env.get("SUPABASE_URL") ?? "",
    publishableKey: Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "",
  };
}

function groupmeHeaders(token: string) {
  return { "X-Access-Token": token, Accept: "application/json" };
}

function messagesFrom(payload: unknown): GroupMeMessage[] {
  if (!payload || typeof payload !== "object") return [];
  const body = payload as { response?: { messages?: GroupMeMessage[] }; messages?: GroupMeMessage[] };
  return body.response?.messages ?? body.messages ?? [];
}

async function fetchMessages(token: string, groupId: string, params: Record<string, string>): Promise<GroupMeMessage[]> {
  const url = new URL(`https://api.groupme.com/v3/groups/${encodeURIComponent(groupId)}/messages`);
  url.searchParams.set("limit", String(MAX_MESSAGES));
  for (const [key, value] of Object.entries(params)) if (value) url.searchParams.set(key, value);
  const response = await fetch(url, { headers: groupmeHeaders(token), cache: "no-store" });
  if (response.status === 304) return [];
  if (!response.ok) throw new Error(`GroupMe messages request failed (${response.status}).`);
  return messagesFrom(await response.json());
}

async function checkGroupMe(token: string, groupId: string) {
  if (!token || !groupId) return { ok: false, ready: false, token: Boolean(token), group: Boolean(groupId), message: "GROUPME_TOKEN and GROUPME_GROUP_ID are missing." };
  const response = await fetch(`https://api.groupme.com/v3/groups/${encodeURIComponent(groupId)}`, {
    headers: groupmeHeaders(token),
    cache: "no-store",
  });
  return {
    ok: response.ok,
    ready: response.ok,
    token: response.status !== 401 && response.status !== 403,
    group: response.ok,
    message: response.ok ? "The GroupMe token and group work." : `GroupMe returned HTTP ${response.status}.`,
  };
}

async function getCursor(db: ReturnType<typeof createClient>) {
  const { data, error } = await db.from("channel_cursor").select("source, last_id, read_count, updated_at").eq("source", SOURCE).maybeSingle();
  if (error) throw new Error(`Could not read the GroupMe cursor: ${error.message}`);
  return data as { source: string; last_id: string; read_count: number; updated_at: string } | null;
}

async function saveCursor(db: ReturnType<typeof createClient>, lastId: string, readCount: number) {
  const { error } = await db.from("channel_cursor").upsert({
    source: SOURCE,
    last_id: lastId,
    read_count: readCount,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Could not save the GroupMe cursor: ${error.message}`);
}

function messageTime(message: GroupMeMessage): number {
  return typeof message.created_at === "number" ? message.created_at * 1000 : 0;
}

async function earlierMessages(token: string, groupId: string, message: GroupMeMessage): Promise<string[]> {
  if (!message.id || !message.sender_id) return [];
  const before = await fetchMessages(token, groupId, { before_id: message.id });
  const cutoff = messageTime(message) - THREAD_WINDOW_MS;
  return before
    .filter((item) => item.id !== message.id && item.sender_id === message.sender_id && item.sender_type !== "bot" && !item.system && (!cutoff || messageTime(item) >= cutoff) && Boolean(item.text?.trim()))
    .sort((a, b) => messageTime(a) - messageTime(b))
    .slice(-4)
    .map((item) => item.text!.trim().slice(0, 500));
}

async function sendToAgent(cfg: ReturnType<typeof config>, message: GroupMeMessage, thread: string[]) {
  const body = {
    announcement: message.text!.trim().slice(0, 2000),
    source: SOURCE,
    source_id: message.id!,
    source_name: (message.name ?? "").slice(0, 200),
    thread,
  };
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.publishableKey) headers.apikey = cfg.publishableKey;
  const response = await fetch(`${cfg.supabaseUrl}/functions/v1/submit-event`, { method: "POST", headers, body: JSON.stringify(body) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`The agent returned HTTP ${response.status}.`);
  return result as { status?: string; already_read?: boolean; message?: string; reasons?: string[] };
}

async function postToGroupMe(token: string, botId: string, text: string) {
  const response = await fetch("https://api.groupme.com/v3/bots/post", {
    method: "POST",
    headers: { ...groupmeHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ bot_id: botId, text: text.slice(0, 1000) }),
  });
  if (!response.ok) throw new Error(`GroupMe bot reply failed (${response.status}).`);
}

function decisionText(result: { status?: string; message?: string; reasons?: string[] }) {
  const label = result.status ? result.status[0].toUpperCase() + result.status.slice(1) : "Agent result";
  const reasons = result.reasons?.length ? ` ${result.reasons.join(" ")}` : "";
  return `${label}: ${result.message ?? "The agent finished reading this post."}${reasons}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const cfg = config();
  if (req.method === "GET") {
    const check = new URL(req.url).searchParams.get("check");
    if (check === SOURCE) {
      try {
        return reply(200, { ...(await checkGroupMe(cfg.token, cfg.groupId)), bot: Boolean(cfg.botId) });
      } catch (error) {
        return reply(200, { ok: false, ready: false, token: Boolean(cfg.token), group: Boolean(cfg.groupId), bot: Boolean(cfg.botId), message: error instanceof Error ? error.message : "GroupMe check failed." });
      }
    }
    try {
      const db = createClient(cfg.supabaseUrl, serverKey(), { auth: { persistSession: false } });
      const cursor = await getCursor(db);
      return reply(200, {
        ok: true,
        ready: Boolean(cfg.token && cfg.groupId && cfg.supabaseUrl),
        last_message_id: cursor?.last_id ?? "",
        read_count: cursor?.read_count ?? 0,
        bot: Boolean(cfg.botId),
      });
    } catch (error) {
      return reply(200, { ok: false, ready: false, last_message_id: "", read_count: 0, bot: Boolean(cfg.botId), message: error instanceof Error ? error.message : "The reader is not ready." });
    }
  }
  if (req.method !== "POST") return reply(405, { ok: false, message: "Send a POST request." });

  if (!cfg.token || !cfg.groupId || !cfg.supabaseUrl) {
    return reply(503, { ok: false, message: "The GroupMe reader is missing its Supabase or GroupMe configuration." });
  }

  try {
    const db = createClient(cfg.supabaseUrl, serverKey(), { auth: { persistSession: false } });
    const cursor = await getCursor(db);
    const messages = await fetchMessages(cfg.token, cfg.groupId, cursor?.last_id ? { after_id: cursor.last_id } : {});

    // First run establishes a bookmark and deliberately does not import old history.
    if (!cursor) {
      const newest = messages.reduce((latest, message) => messageTime(message) > messageTime(latest) ? message : latest, messages[0]);
      await saveCursor(db, newest?.id ?? "", 0);
      return reply(200, { ok: true, first_run: true, read: 0, last_message_id: newest?.id ?? "" });
    }

    const chronological = [...messages].sort((a, b) => messageTime(a) - messageTime(b));
    let lastId = cursor.last_id;
    let readCount = cursor.read_count;
    let handled = 0;
    for (const message of chronological) {
      if (message.id) lastId = message.id;
      readCount += 1;
      try {
        const text = message.text?.trim() ?? "";
        const skipped = message.sender_type === "bot" || Boolean(message.system) || !text || !message.id;
        if (!skipped) {
          const thread = await earlierMessages(cfg.token, cfg.groupId, message);
          const result = await sendToAgent(cfg, message, thread);
          if (cfg.botId && !result.already_read) await postToGroupMe(cfg.token, cfg.botId, decisionText(result));
          handled += 1;
        }
      } catch (error) {
        console.error("GroupMe message failed", message.id, error);
      }
      // Advance past every message read, including skipped messages and failures.
      await saveCursor(db, lastId, readCount);
    }

    if (!messages.length) await saveCursor(db, lastId, readCount);
    return reply(200, { ok: true, first_run: false, read: messages.length, handled, last_message_id: lastId, read_count: readCount });
  } catch (error) {
    console.error("GroupMe reader failed", error);
    return reply(500, { ok: false, message: error instanceof Error ? error.message : "The GroupMe reader failed. Check the function logs." });
  }
});
