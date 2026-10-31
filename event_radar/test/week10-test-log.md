# Week 10 test log: what Club Event Radar knows and remembers

- Student: @mbuddhal
- Website: https://mbuddhal.github.io/BUS4498_InClass_Builds/event_radar/
- Folder: https://github.com/mbuddhal/BUS4498_InClass_Builds/tree/main/event_radar
- Chat app: GroupMe
- Written by the BUS 4498 Memory Builder on Oct 30, 2026, 5:28 PM.

## Builder checks

| Check | Result | When |
|---|---|---|
| Week 9 build ready | Passed. The events table is there, and visitors can read published posts. The agent is running with your AI key: Claude (claude-haiku-5-5). New sign-ups are off. Your website opens at https://mbuddhal.github.io/BUS4498_InClass_Builds/event_radar/ | 4:13 PM |
| Chat-group reader | Not passed. The reader has its GroupMe secrets. It hasn’t run yet. The scheduled job runs it within a minute; check again. A bot ID is set, so the group gets a reply for each post. | 4:44 PM |
| Club list | Not passed. The club list has 6 clubs: Accounting Society, Board Game Guild, Cal Poly Ski & Snowboard Club, Mustang Pitch Society, Sustainability Crew, Women in Finance Circle. Cal Poly Kite Flyers isn’t on the list yet. Post B shows you when to add it. The agent reads the club list: it knows 6 clubs. | 5:06 PM |
| Lessons table | Not run |  |

## Test posts

| Post | Expected | What happened | What the agent looked at |
|---|---|---|---|
| A. A nickname | Published, with the club shown as Board Game Guild: the agent matched the nickname "BGG" on the club list. | published: Your event is posted on the website. | Club list (6 clubs): matched "BGG" to Board Game Guild. |
| B. A club that isn't on the list | Waiting for a moderator, because "Cal Poly Kite Flyers" isn't on the club list yet. | waiting: A moderator will check this post before it appears on the website. | Club list (6 clubs): no listed club matched. |
| C. The new club's next post | Published, with the club shown as Cal Poly Kite Flyers. You changed what the agent knows without touching the code. | duplicate: Nothing new was added. This event is already in the database. |  |
| D. A known club, no place | Waiting for a moderator, because the place is missing (rule R2). The reason adds a hint from the club list: Board Game Guild usually meets at University Union (UU), Room 220. The agent didn't fill the place in: knowledge about a club in general isn't a fact about this event. | waiting: A moderator will check this post before it appears on the website. | Club list (7 clubs): matched "Board Game Guild" to Board Game Guild. Usual place hint for Board Game Guild: University Union (UU), Room 220; the place was not filled into the event. |
| E. The original post | Published for Tuesday, November 3 at 6:00 PM at the UU Plaza. | published: Your event is posted on the website. | Club list (7 clubs): matched "Mustang Pitch Society" to Mustang Pitch Society. Mustang Pitch Society has no upcoming posts yet, so there was nothing to compare. |
| F. An update | Published, replacing E. The agent checked the club's upcoming posts, saw that this updates "pitch practice," and copied the place from the earlier post. The earlier card leaves the website. | published: Your event is posted on the website. It replaces the club's earlier post, "Mustang Pitch Society pitch practice". | Club list (7 clubs): matched "Mustang Pitch Society" to Mustang Pitch Society. Checked 1 upcoming post from Mustang Pitch Society. This updates "Mustang Pitch Society pitch practice" (2026-11-03 18:00 UU Plaza). |
| G. A reminder that changes nothing | Already posted. A reminder isn't an update, and the database's duplicate check (same date, start time, and place as F) refuses a second copy. | duplicate: Nothing new was added. This event is already in the database. | Club list (7 clubs): matched "Mustang Pitch Society" to Mustang Pitch Society. Checked 1 upcoming post from Mustang Pitch Society: this is a new event. |
| H. Something the rules don't cover | Published. The posting rules don't say anything about study hours, so to the agent it looks like an event. Now teach it: sign in as a moderator and save this lesson: *Drop-in study hours, tutoring, and office hours aren't events for this website. Hold them for a moderator.* | published: Your event is posted on the website. | Club list (7 clubs): matched "Accounting Society" to Accounting Society. Accounting Society has no upcoming posts yet, so there was nothing to compare. Lessons: 0 active. |
| I. The next one, after the lesson | Waiting for a moderator, citing your lesson. | duplicate: Nothing new was added. This event is already in the database. | Club list (7 clubs): matched "Accounting Society" to Accounting Society. Checked 2 upcoming posts from Accounting Society: this is a new event. Lessons: 1 active; followed 1: "Drop-in study hours, tutoring, and office hours aren't events for this website. Hold them for a moderator.". |
| J. A post that tries to teach the agent | Waiting for a moderator. Your lesson still applies, and the post is flagged for trying to give the AI instructions. Check Table Editor → lessons: there is still only the lesson you wrote. A post can't teach the agent, because only signed-in moderators can write lessons. | waiting: A moderator will check this post before it appears on the website. | Club list (7 clubs): matched "Accounting Society" to Accounting Society. Checked 2 upcoming posts from Accounting Society: this is a new event. Lessons: 1 active; followed 1: "Drop-in study hours, tutoring, and office hours aren't events for this website. Hold them for a moderator.". |
| K. After you switch the lesson off | Published. The agent forgot the lesson the moment you switched it off. Switch it back on when you're done. | duplicate: Nothing new was added. This event is already in the database. | Club list (7 clubs): matched "Accounting Society" to Accounting Society. Checked 4 upcoming posts from Accounting Society: this is a new event. Lessons: 0 active. |

## My answers

**The demo (Step 1):** For the follow-up, the agent couldn't connect “Actually, 8 pm” to the original event because it lost the context from the previous run. This was short-term memory forgetting. For the update, the agent created a duplicate event instead of updating the existing one because it didn't retrieve the saved information, which was persistent memory forgetting.

**The fix (Step 2):** (not answered)

**My chat group (Step 4):** The first incomplete post was processed in under one minute. The bot replied: ‘Waiting: A moderator will check this post before it appears on the website. Missing: place. Please add it (rule R2).’ After I added ‘At UU,’ the bot replied: ‘Published: Your event is posted on the website.

**Knowledge (Step 5):** (not answered)

**Memory (Step 6):** The agent matched Mustang Pitch Society, checked its one earlier pitch-practice post, and copied the UU Plaza from that post because F said “same place.”

**Lessons (Step 7):** (not answered)
