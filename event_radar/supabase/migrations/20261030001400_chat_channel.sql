-- Stage 14: read GroupMe posts through the read-channel Edge Function.
-- The publishable key is public by design; chat tokens and IDs stay in Supabase Secrets.

alter table public.events
  add column if not exists source text not null default '',
  add column if not exists source_id text not null default '',
  add column if not exists source_name text not null default '';

-- A chat message may receive only one decision, even if a callback and the scheduled
-- job happen to deliver it at the same time.
create unique index if not exists events_one_per_message
  on public.events (source, source_id)
  where source_id <> '';

create table if not exists public.channel_cursor (
  source text primary key,
  last_id text not null default '',
  read_count integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.channel_cursor enable row level security;
revoke all privileges on table public.channel_cursor from public, anon, authenticated;
grant select, insert, update, delete on table public.channel_cursor to service_role;

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- The same job name is an upsert in pg_cron. It runs once a minute and calls the
-- JWT-free GroupMe reader; the reader authenticates to GroupMe with Supabase Secrets.
select cron.schedule(
  'read-chat-channel',
  '* * * * *',
  $$
    select net.http_post(
      url := 'https://wjhyfasmzuvmuoumkvzr.supabase.co/functions/v1/read-channel',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'apikey', 'sb_publishable_pK9S5Uzh1RZLkQtW9gyloQ_MaayHyQs'
      ),
      body := '{}'::jsonb
    ) as request_id;
  $$
);
