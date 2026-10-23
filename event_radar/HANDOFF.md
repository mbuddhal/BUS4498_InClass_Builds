# Club Event Radar: handoff for Zoe

## What works now

The public website is live at [https://mbuddhal.github.io/BUS4498_InClass_Builds/event_radar/](https://mbuddhal.github.io/BUS4498_InClass_Builds/event_radar/). A visitor can submit a short announcement and an optional JPG/PNG flyer; the Supabase Edge Function reads the details, checks the posting rules, catches duplicates, and either publishes the event or sends it to moderator review. Signed-in moderators can see waiting posts, read the reason and original announcement, approve or reject them, and sign out. Flyer posts are saved in the `flyers` Storage bucket and always wait for review.

## Where things live

- Repository: `BUS4498_InClass_Builds`, in the `event_radar/` folder.
- Supabase project: `event-radar` — [Project URL](https://wjhyfasmzuvmuoumkvzr.supabase.co).
- Website: `index.html`, `app.js`, `style.css`, and `config.js`.
- Backend: `supabase/functions/submit-event/index.ts`, with `supabase/config.toml` setting JWT verification off.
- Database and storage setup: `supabase/migrations/`; the main table is `public.events` and the flyer bucket is `flyers`.
- Rules and tests: `context/posting-rules.md`, `context/campus-places.md`, and `test/sample-announcements.md`.

## Secrets

Secret names only: `ANTHROPIC_API_KEY`, `SUPABASE_SECRET_KEYS`, and fallback `SUPABASE_SERVICE_ROLE_KEY`. They are set in Supabase → Edge Functions → Secrets. Zoe does not need the values, and no secret belongs in this repository; `config.js` contains only the public Project URL and publishable key.

## How to test

1. Post sample A, the Board Game Guild game night. It should publish with the date, time, UU Room 220, free entry, and free food.
2. Post sample A again, or sample C after A. It should say **Already posted** because the date, start time, and place match.
3. Post sample D or the flyer sample. It should wait for review; sign in under **Moderator sign-in**, approve it, and confirm it appears on the public board with the flyer when applicable.

## What’s next

Keep new sign-ups turned off because every authenticated account currently has moderator access. Enable Supabase leaked-password protection, test the GitHub Pages site after each upload, and consider the optional nightly clean-up for past events. If more moderators are added later, replace the broad authenticated-user review policy with an explicit moderator role.

## How we take turns

Before starting, download the latest repository changes with GitHub Desktop (pull). Before stopping, upload your finished changes (push), and tell the other person before working so we do not edit the same files at the same time. Do not put secrets in commits or share them in chat.
