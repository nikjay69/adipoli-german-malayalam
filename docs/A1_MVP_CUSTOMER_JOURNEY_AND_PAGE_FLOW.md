# Adipoli German A1 MVP — Customer Journey and Page Flow

Updated: 2026-06-02 10:40 CEST

This is a concrete product artifact, not a strategy essay. Use it to design, QA, and cut screens from the customer’s point of view.

## 1. Customer promise in plain words

Adipoli German helps a Malayali adult beginner go from zero German to Goethe A1 readiness without guessing what to study next.

The customer buys:

- a guided A1 video course, not a content library;
- Malayalam/Manglish-friendly teaching, but serious German outcomes;
- phone-first daily lessons with one obvious next action;
- listening, speaking, reading, and writing practice after each teaching block;
- closed checkpoints that diagnose weak skills;
- exact recovery tasks before moving on;
- optional score-booster resources for higher marks.

Plain sales line:

> Start from Kerala. Follow a guided A1 path. Watch, listen, speak, write, get checked, fix weaknesses, and become ready for Goethe A1.

What it must not promise:

- “play games to learn German”; games are later/remediation only;
- “AI tutor magic”; AI is optional support, not the product promise;
- “browse 20 resources”; the app prescribes exactly what to do;
- “fluent German”; the target is honest Goethe A1 readiness.

## 2. First-page experience for a cold user

Route reality today:

- `/` is the first page a cold app user sees.
- `/intro` exists as a focused first-moment page.
- `/learn` is already a focused command center with the old lesson map hidden.
- Mission routes such as `/missions/module-1/greet-frau-weber` and Module 2 routes are the current best proof of the scene-first direction.

MVP decision:

- Treat `/` as Page 1.
- Page 1 must introduce the course enough to build trust, then immediately lead into a real German moment.
- Do not make cold users read a course plan before hearing/saying German.
- Do not show dashboards, games, old lesson queues, search, streaks, or broad roadmap on first touch.

Cold-user Page 1 must show, above the fold on a phone:

1. Brand/course identity: `Adipoli German · A1`.
2. One promise: `German for Malayalis. Goethe A1 with Kerala context.`
3. One tiny scene preview:
   - Frau Weber: `Guten Morgen.`
   - You: `Guten Morgen, Frau Weber.`
4. One CTA: `Start listening`.
5. One adult-safe visual: Kerala classroom / Goethe Kochi practice / learner scene.

Cold-user Page 1 must not show:

- module roadmaps;
- “features” grids;
- game tiles;
- pricing pressure before the first taste;
- Kuttan mascot chatter unless it clarifies the task;
- long Manglish comedy copy;
- generic Germany stock imagery;
- more than one primary CTA.

First 10-second customer script:

> “This is a Malayali-focused A1 course. I can start by hearing one real line and answering it. I know exactly what to tap.”

## 3. Onboarding path

Onboarding should happen in two phases: taste first, setup second.

### Phase A — first win before setup

Customer path:

1. `/` — concise promise + scene preview + `Start listening`.
2. First mission, preferably `/missions/module-1/greet-frau-weber?start=listen`.
3. Mission beat 1 — hear Frau Weber’s greeting.
4. Mission beat 2 — learner says the reply aloud.
5. Mission beat 3 — one recognition or repair action.
6. Win screen — `You can greet a German teacher.`

Why:

- The learner should feel the course in under one minute.
- Setup screens before a win feel like admin.
- A1 beginners need confidence before planning.

### Phase B — lightweight setup after first win

After the first win, ask only what changes the path:

1. Daily pace:
   - `5 min/day`
   - `15 min/day`
   - `30 min/day`
2. Goal:
   - `Pass Goethe A1`
   - `Prepare for Germany`
   - `Learn with family/partner`
3. Exam date, optional:
   - `No date yet`
   - `Within 3 months`
   - `Within 6 months`
   - date picker later.

Setup output:

- Today’s must-do lesson block.
- Estimated course pace.
- First checkpoint date or module-based checkpoint.

Do not ask during MVP onboarding:

- detailed proficiency survey;
- learning-style quiz;
- grammar confidence ratings;
- preferred game types;
- notification permissions before the learner trusts the app;
- payment before a credible sample unless business rules require it.

## 4. Phone-first page flow

The MVP page flow is linear by default and browsable only as a secondary mode.

### Default path for a new learner

```text
/                 Page 1: promise + first listening CTA
  → first mission  Hear → answer aloud → repair → win
  → onboarding     choose pace + goal
  → /learn         today’s next required block
  → video lesson   watch one guided teaching segment
  → practice       listen/speak/write tied to the video
  → mini-check     closed quick check
  → next lesson    continue or stop with clear next task
```

### Module path

```text
/learn
  → current module command card
  → video lesson 1
  → practice set 1
  → video lesson 2
  → practice set 2
  → ...
  → module diagnostic
  → recovery if weak OR next module if pass
```

### Checkpoint path

```text
module complete
  → closed diagnostic instructions
  → Hören / Lesen / Schreiben / Sprechen tasks
  → score by skill tag
  → result: pass, weak pass, or fail
  → exact recovery task list
  → retest gate for failed required skills
```

### Recovery path

```text
checkpoint result
  → weakness tag, e.g. hoeren:numbers
  → 1–3 prescribed tasks only
  → short practice
  → retest only the weak tag
  → unlock next must-do block when recovered
```

### Score-booster path

```text
checkpoint pass OR strong learner asks for more
  → optional booster card
  → one curated resource/task
  → clear expected output
  → no gate unless it is a mock-test booster
```

Phone-first rules:

- One primary action visible without scrolling.
- CTA thumb-zone friendly: bottom or central, not tiny top-right.
- Avoid long typing early; use speaking, shadowing, tap-to-repair, and short writing.
- Keep old roadmap/library behind an explicit secondary disclosure.
- Hide global nav/search on focused learning routes.
- Avoid fixed bottom nav covering CTAs.
- Every route must work in a 390px-wide viewport.

## 5. Where core product pieces appear

### Video

Video is the teaching backbone.

Where it appears:

- inside each lesson block after the first mission taste;
- on module pages as `Watch: [specific outcome]`, not as a video library;
- before practice, except when the lesson starts with a tiny scene hook;
- in recovery when the weakness needs reteaching.

Video unit should include:

- one hook tied to a real A1 situation;
- 3–7 useful German chunks;
- Malayalam/Manglish explanation where it helps;
- practice pauses;
- exam link when relevant;
- next app task after the video.

Video page must answer:

- What am I learning?
- Why does Goethe/life care?
- What do I do immediately after watching?

### Practice

Practice appears immediately after video and inside scene missions.

Must-do practice types:

- Hören: hear a real German line and choose/answer.
- Sprechen: say aloud, shadow, answer a question.
- Schreiben: short guided output when exam-relevant.
- Lesen: forms, notices, short messages, dialogue subtitles.
- Repair: fix one common mistake.

Practice must never be only click-completion. Each module needs at least one speaking win and one writing win.

### Checkpoint

Checkpoints appear:

- as mini-checks after lesson blocks;
- as module diagnostics;
- as Goethe-style gates every few modules;
- as final mock in Modules 17–18.

Checkpoint rules:

- closed-book instruction shown clearly;
- no Google/YouTube/ChatGPT/notes/dictionary;
- skills tagged: `hoeren`, `lesen`, `schreiben`, `sprechen`, `grammar`, `vocab`;
- manual scoring allowed for speaking/writing MVP;
- result page prescribes exact next work.

### Recovery

Recovery appears only after a weak result.

Recovery card must show:

1. Weakness in plain words: `You missed numbers in listening.`
2. Why it matters: `Goethe Hören uses numbers often.`
3. Must-do recovery: 1–3 tasks.
4. Retest button.

Bad recovery copy:

- `Revise Module 3`.
- `Practice more listening`.
- `Your grammar is weak`.

Good recovery copy:

- `Replay Numbers 0–100 video, 8m.`
- `Do 10 phone-number dictations.`
- `Retest: catch 5 appointment times.`

### Score-booster resources

Score boosters are optional, curated, and sequenced.

They appear:

- after passing a checkpoint;
- inside a module as `Want stronger marks?`;
- before final mock as a targeted booster plan.

Allowed resources:

- Adipoli extra drills;
- selected public YouTube/audio;
- Goethe-style public worksheets;
- extra speaking/writing prompts;
- mock-test variants.

Rules:

- Show one resource/task at a time.
- Explain the output: `After this, write one SMS with 3 required points.`
- Never dump a list of 20 links.
- Never let external resources become the course backbone.

## 6. MVP pages vs later pages

### MVP pages

These must exist and feel coherent before launch.

| Page / route type | MVP job | Customer success condition |
| --- | --- | --- |
| `/` | Course promise + first German action | User understands the offer and taps `Start listening` |
| First mission route | Immediate hear/speak/repair win | User says one correct A1 line aloud |
| Post-win onboarding | Set pace/goal with minimal friction | User gets a prescribed next block |
| `/learn` | Today’s command center | User sees one required action, not a dashboard |
| Module page | Show current module path | User knows current lesson, checkpoint, and locked future |
| Video lesson page | Teach one outcome | User watches and knows the next practice |
| Practice page/step | Convert input into output | User speaks/writes/repairs, not just clicks |
| Mini-check page/step | Confirm lesson recall | User gets pass/weak feedback |
| Module checkpoint | Diagnose readiness | User gets skill-tagged result |
| Recovery page/card | Prescribe exact remediation | User knows the 1–3 tasks to unlock progress |
| Score-booster card | Optional stronger-mark task | User gets one curated next booster |
| Final mock | Goethe A1 proof | User sees exam-section readiness |
| Pricing/access page | Convert after trust | User understands what is included |

### Later pages

These should not dominate MVP first use.

| Page / route type | Later role | MVP treatment |
| --- | --- | --- |
| Games hub | Retention/remediation | Hide from first path; use only if tied to recovery |
| Broad vocabulary library | Reference | Secondary only |
| Global search | Power-user tool | Hidden on focused learning routes |
| Profile/streaks/achievements | Motivation | After course trust, not first screen |
| Community/social sharing | Growth | Later |
| AI tutor/chat | Support | Later/optional; not core promise |
| Image/video generation admin | Production tooling | Internal only |
| Marketing campaign pages | Launch/growth | After MVP learning path is coherent |

## 7. Exact low-text UX rules by page type

These are maximums, not targets. Cut harder whenever possible.

### Page 1 `/`

- One headline: max 5 words.
- One promise sentence: max 12 words.
- One scene preview: max 2 dialogue lines.
- One CTA.
- No bullet list longer than 3 items.
- No scroll required for the first CTA on phone.
- No more than 45 visible words above the fold.

### Intro / first-moment page

- One headline: max 5 words.
- One setup sentence: max 14 words.
- Three micro-promises max: `Listen`, `Answer aloud`, `Fix one mistake`.
- One CTA.
- No course roadmap.
- No mascot speech bubble unless it is the scene speaker.

### Mission page

- One situation line: max 12 words.
- One German line at a time.
- Subtitle allowed; paragraph explanation banned.
- One learner action at a time.
- Visible labels must be human: `Frau Weber`, `You`, `Examiner`.
- Banned visible labels: `GREETING SET`, `SAFE DEFAULTS`, `Heard`, `Replay`, `0 of N`, `Memory check`, internal IDs.
- Audio controls must show progress/duration if custom.
- Next action unlocks only after required audio ends.

### Video lesson page

- Video title: outcome-based, max 9 words.
- Pre-video context: max 20 words.
- One `After watching` task visible.
- Transcript hidden/collapsible by default on phone.
- Key phrases: max 5 visible at once.
- Avoid simultaneous video + long notes + quiz clutter.

### Practice page/step

- Instruction: max 10 words.
- One German prompt at a time.
- One action: listen, say, choose, type, or repair.
- If typing: target answer under 80 characters unless it is an exam-writing task.
- Feedback: max 2 short lines.
- No celebratory animation that delays the next learning action.

### Checkpoint page

- Start instruction: max 35 words.
- Must include closed-book rule.
- Show section, time, and number of tasks.
- Do not teach during the checkpoint.
- After submission, show skill result and next prescribed action.

### Recovery page/card

- Weakness label: max 7 words.
- Explanation: max 12 words.
- Must-do list: max 3 tasks.
- Each task must include a specific action and estimated time.
- One retest CTA.

### Score-booster card

- Optional label clear: `Score booster`.
- One resource/task only.
- Max 25 words before CTA.
- Must state the output the learner should produce.
- Never show a generic resource list.

### Module page

- Current module promise: max 12 words.
- Show current required block first.
- Upcoming lessons collapsed or locked.
- Checkpoint visible as destination, not as scary dashboard.
- Roadmap secondary.

### `/learn` command center

- One active card above fold.
- One CTA.
- Current output visible, e.g. `Say a greeting aloud`.
- Old lesson map hidden behind disclosure.
- No games/streak/search competing with the active task.

### Pricing/access page

- One offer summary.
- Clear inclusion list: video, practice, checkpoints, recovery.
- No exaggerated pass guarantee.
- Kerala/Malayali positioning visible but adult-safe.
- CTA clear; free sample path preserved if business model allows.

## 8. PASS / WEAK / FAIL quality gate from customer perspective

Use this gate before calling any page or flow MVP-ready.

### PASS

A Malayali adult beginner can answer these without help:

1. What is this course promising me?
2. What do I tap now?
3. What German did I hear or say within the first minute?
4. How does this move me toward Goethe A1?
5. What happens if I am weak?
6. What should I do next today?

Evidence required:

- phone-width visual check;
- primary CTA visible and working;
- no console/dev overlay errors on the route;
- audio plays where required;
- mission/checkpoint state transitions verified;
- visible text within page-type budget;
- no game/dashboard clutter in first path.

### WEAK

The page/flow is promising but not launch-grade if:

- the right CTA exists but the screen still reads like a dashboard;
- the learner hears German but does not produce anything;
- the video teaches well but practice is detached;
- checkpoint gives a score but no exact recovery;
- text is understandable but too long for phone-first use;
- old lesson maps/games/search are visible but not blocking.

Action:

- cut text;
- hide secondary systems;
- connect video → practice → check → recovery;
- browser-test again.

### FAIL

The page/flow fails the customer if:

- a cold user can browse without hearing/saying German;
- Page 1 is a feature pitch or dashboard;
- games appear as the core product;
- the learner must choose among many resources;
- checkpoints are missing, open-book, or non-diagnostic;
- recovery says only “revise/practice more”;
- old navigation/search overlays block focused learning;
- mobile requires long typing before confidence;
- German audio is browser SpeechSynthesis or technically unverified;
- Kuttan/story feels childish or distracts from Goethe A1.

Action:

- do not polish decoration;
- rebuild the page around one customer action;
- verify on phone width before asking for review.

## 9. Implementation implications for the current app

Immediate product-design implications, based on current source shape:

1. Keep `/` as the real first page, not a redirect trap.
2. Keep the cold page concise: promise + scene preview + `Start listening`.
3. Route the first CTA to a Module 1 first mission, not to a dashboard.
4. Use `/intro` only if it adds a first German moment; otherwise bypass it.
5. Keep `/learn` as a command center with one active card and old maps hidden.
6. Promote video blocks as the backbone after the first mission taste.
7. Add checkpoint/recovery pages before expanding games.
8. Keep games hidden or recovery-scoped until the course/checkpoint MVP is coherent.
9. Score future work against this sequence: `watch/hear → produce → check → recover → continue`.

## 10. Next concrete phase

Next phase should not create another broad plan. Build one vertical course slice using this page flow:

- Module 1 or Module 2 lesson block;
- one presenter-ready video outline/script;
- one post-video practice set;
- one closed mini-check;
- one recovery prescription;
- one score-booster task;
- phone QA against the low-text gate above.
