(function () {
  "use strict";

  const config = window.EVENT_RADAR_CONFIG || {};
  const board = document.getElementById("event-board");
  const boardStatus = document.getElementById("board-status");
  const form = document.getElementById("post-form");
  const announcementInput = document.getElementById("announcement");
  const flyerInput = document.getElementById("flyer");
  const submitButton = document.getElementById("submit-button");
  const refreshButton = document.getElementById("refresh-button");
  const result = document.getElementById("result");
  const resultLabel = document.getElementById("result-label");
  const resultMessage = document.getElementById("result-message");
  const resultReasons = document.getElementById("result-reasons");

  const publicColumns = [
    "id",
    "created_at",
    "status",
    "title",
    "club",
    "event_date",
    "start_time",
    "end_time",
    "place_name",
    "place_detail",
    "cost",
    "free_food",
    "summary",
    "flyer_url",
  ].join(",");

  let supabaseClient = null;

  function setBoardStatus(message) {
    boardStatus.textContent = message;
  }

  function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function formatDate(dateText) {
    if (!dateText) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateText);
    if (!match) return null;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    if (Number.isNaN(date.getTime())) return null;
    return {
      month: new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(date),
      day: new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "UTC" }).format(date),
      whenDate: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(date),
    };
  }

  function formatTime(timeText) {
    if (!timeText) return "";
    const match = /^(\d{2}):(\d{2})/.exec(timeText);
    if (!match) return "";
    const hour = Number(match[1]);
    const minute = match[2];
    if (hour > 23) return "";
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${suffix}`;
  }

  function renderEvent(event) {
    const item = makeElement("li", "event");
    const dateInfo = formatDate(event.event_date);
    const date = makeElement("div", dateInfo ? "date" : "date tba");
    if (dateInfo) {
      date.append(makeElement("span", "mon", dateInfo.month));
      date.append(makeElement("span", "day", dateInfo.day));
    } else {
      date.append(makeElement("span", "day", "TBA"));
    }

    const body = makeElement("div", "event-body");
    const timeParts = [];
    if (dateInfo) timeParts.push(dateInfo.whenDate);
    const start = formatTime(event.start_time);
    const end = formatTime(event.end_time);
    if (start && end) timeParts.push(`${start} to ${end}`);
    else if (start) timeParts.push(start);
    body.append(makeElement("p", "when", timeParts.join(" · ") || "Time to be announced"));
    body.append(makeElement("h3", "", event.title || "Untitled event"));

    const place = [event.club, event.place_name, event.place_detail].filter(Boolean).join(" · ");
    body.append(makeElement("p", "meta", place || "Details to be announced"));
    body.append(makeElement("p", "summary", event.summary || "More details coming soon."));

    const tags = makeElement("p", "tags");
    if (event.cost) tags.append(makeElement("span", "tag", event.cost));
    if (event.free_food) tags.append(makeElement("span", "tag food", "🍕 Free food"));
    if (tags.childElementCount > 0) body.append(tags);

    item.append(date, body);
    const flyerUrl = typeof event.flyer_url === "string" ? event.flyer_url : "";
    const allowedPrefix = `${config.supabaseUrl}/storage/v1/object/public/flyers/`;
    if (flyerUrl.startsWith(allowedPrefix)) {
      const flyer = makeElement("img", "flyer");
      flyer.src = flyerUrl;
      flyer.alt = `${event.title || "Event"} flyer`;
      flyer.loading = "lazy";
      item.append(flyer);
    }
    return item;
  }

  function renderEvents(events) {
    board.replaceChildren();
    if (!events || events.length === 0) {
      board.append(makeElement("li", "empty", "No events yet. Post the first one!"));
      return;
    }
    events.forEach((event) => board.append(renderEvent(event)));
  }

  function clearReasons() {
    resultReasons.replaceChildren();
  }

  function showResult(status, message, reasons) {
    result.hidden = false;
    result.className = `result ${status || "error"}`;
    resultLabel.textContent = status === "published"
      ? "Published"
      : status === "waiting"
      ? "Waiting for review"
      : status === "rejected"
      ? "Not posted"
      : status === "duplicate"
      ? "Already posted"
      : "Something went wrong";
    resultMessage.textContent = message || "The agent did not return a message.";
    clearReasons();
    (Array.isArray(reasons) ? reasons : []).forEach((reason) => {
      resultReasons.append(makeElement("li", "", String(reason)));
    });
  }

  async function loadEvents() {
    if (!supabaseClient) return;
    setBoardStatus("Loading events…");
    const { data, error } = await supabaseClient
      .from("events")
      .select(publicColumns)
      .eq("status", "published")
      .order("event_date", { ascending: true, nullsFirst: false })
      .order("start_time", { ascending: true, nullsFirst: false });

    if (error) {
      renderEvents([]);
      setBoardStatus("The event board could not be loaded right now.");
      return;
    }

    renderEvents(data || []);
    setBoardStatus(`${(data || []).length} published event${(data || []).length === 1 ? "" : "s"}`);
  }

  async function submitAnnouncement(event) {
    event.preventDefault();
    const announcement = announcementInput.value.trim();
    if (!announcement) {
      showResult("error", "Please enter an announcement first.", []);
      announcementInput.focus();
      return;
    }

    const flyer = flyerInput.files && flyerInput.files[0];
    if (flyer) {
      if (flyer.size > 5 * 1024 * 1024) {
        showResult("error", "The flyer must be 5 MB or smaller.", []);
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(flyer.type)) {
        showResult("error", "The flyer must be a JPG or PNG image.", []);
        return;
      }
    }

    submitButton.disabled = true;
    submitButton.textContent = "Posting…";
    try {
      const formData = new FormData();
      formData.append("announcement", announcement);
      if (flyer) formData.append("flyer", flyer);
      const response = await fetch(`${config.supabaseUrl}/functions/v1/submit-event`, {
        method: "POST",
        headers: { apikey: config.publishableKey },
        body: formData,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok === false) {
        showResult("error", payload.message || "The agent could not process that post.", payload.reasons);
        return;
      }
      showResult(payload.status, payload.message, payload.reasons);
      if (payload.status === "published") {
        announcementInput.value = "";
        flyerInput.value = "";
        await loadEvents();
      }
    } catch (error) {
      showResult("error", "The website could not reach the event agent.", []);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Post announcement";
    }
  }

  function start() {
    if (!config.supabaseUrl || !config.publishableKey || !window.supabase) {
      setBoardStatus("The website is missing its Supabase configuration.");
      renderEvents([]);
      showResult("error", "The website is not connected to Supabase yet.", []);
      return;
    }

    supabaseClient = window.supabase.createClient(config.supabaseUrl, config.publishableKey);
    form.addEventListener("submit", submitAnnouncement);
    refreshButton.addEventListener("click", loadEvents);
    loadEvents();
  }

  start();
})();
