# Adipoli German — Vision-to-SMART Reset Plan

Generated: 2026-05-31T15:54:39+02:00
Workdir: `/shared/german-course`

This is the iteration-3 reset plan after reading Boss-written vision/product docs, recent QC loop outputs, source routes, mission data, content/audio structure, git state, and QA scripts.

This is not a UI polish plan. This is the course/product contract agents must execute against.

Evidence used before writing:
- Boss/product docs synthesized: `docs/README.md`, `COURSE_OPERATING_BRIEF_2026-05-19.md`, `PRODUCT_DIRECTION_RESET_2026-05-20.md`, `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`, `AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`, `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`, `COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`, `COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`, `A1_STORY_BIBLE.md`, `COURSE_PLAN_10_10.md`, `GOETHE_A1_EXAM_MAP.md`, `EXERCISE_QUALITY_RULES.md`, `MODULE_BLUEPRINTS.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `SERIES_FULL_SCRIPT.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`, `GAME_AUDIT.md`, `LAUNCH_CHECKLIST.md`, `COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md`, `MODULE_PRODUCT_SCORECARD_TEMPLATE.md`.
- Recent QC/run outputs inspected: `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`, latest 6h M1/M2 immersive-phone-first checkpoint, existing `adipoli-vision-smart-plan-20260531-1547.md`, and gold-slice/page-start QA evidence.
- Source inspected: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, all mission routes under `src/app/missions/`, `src/app/missions/module-2/_components/MissionUI.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, and enough of `src/lib/content/modules/` to confirm the 18-module content backbone still exists.
- Current source inventory: 18 module files, 8 mission routes, 23 mission MP3s, 134 Hören MP3s, 25 video files, QA scripts including `qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, `qa_intro_start_path.mjs`, `qa_module2_production_mobile.mjs`.
- Git state: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries. Not safe to commit or push as one blob.
- Checks run in this iteration:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` — 8 M1/M2 voice-first missions, no legacy builders on reviewed path, mobile overflow/chrome checks pass.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` fails because intro/start-path source expectations are stale.
  - FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` fails because it expects older intro copy/CTA: `Greet Frau Weber.` / `Start listening`, while current `/intro` says `Your first German moment.` / `Begin lesson 1`.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` expects root `/` to route directly to first mission copy, while current root is a compact course introduction with CTA to `/intro`.

## 1. Vision reconstruction

Boss is trying to build a complete paid web-app course, not a German content folder and not a pretty dashboard.

Plain version:

Adipoli German should take a Malayali adult beginner from zero German to a confident Goethe A1 attempt through short, phone-first story missions. The learner follows Kuttan’s Kerala-to-Germany pressure, but the learner is not passive. Every useful unit should make the student hear German, understand it, answer aloud, repair one real mistake, write/type only when exam-relevant, and leave with a visible ability win.

The course should feel like:
- Kerala-rooted and emotionally familiar, not generic German-app content.
- Goethe A1 serious, not random phrase learning.
- Adult-safe and useful, not childish mascot entertainment.
- Audio-first and production-first, not text-first dashboards.
- Cheap enough to scale, but polished enough to trust.
- Self-sufficient: the learner knows what to do next without Boss explaining the product.

Core product promise:

“German A1 for Malayalis through short story missions: hear it, say it, fix it, use it, and prepare for Goethe.”

Hard interpretation:

If the app does not create a usable listening/speaking/writing ability in the learner, it is not matching Boss’s vision no matter how nice the UI looks.

## 2. Non-negotiables

These are hard rules. If a feature conflicts with them, cut or demote the feature.

1. Malayali/Kerala identity
- A1 physically happens in Kerala.
- Kuttan stays in Kerala during A1.
- Germany appears as goal, dream, video call, exam rehearsal, or learner imagination — not casual physical placement.
- Manglish is a learning bridge, not a joke. It should help learners notice Malayalam/English transfer mistakes.
- Kerala context must be functional: classroom, Goethe Kochi, family pressure, documentation anxiety, exam coaching, phone calls, cafes, transport, home scenes.

2. Goethe A1 seriousness
- Every module needs a clear A1 ability win.
- Hören, Lesen, Schreiben, and Sprechen must all be practiced.
- The final course must map to Goethe A1 tasks: listening prompts, notices, forms, short messages, self-introduction, spelling, asking/answering questions, requests, appointments, prices, times, numbers, and everyday survival language.
- Entertainment is allowed only when it supports a Goethe/survival skill.

3. Adult-safe tone
- Kuttan can be warm, relatable, and funny.
- Kuttan/Appu/mascot elements cannot make the paid adult course feel childish.
- Public naming is still product-risky. “Kuttan” is culturally warm, but an adult-facing public name like Arun/Kiran may sell better, with Kuttan retained as a home nickname if Boss approves.

4. Real audio
- No browser SpeechSynthesis for reviewable German.
- Mission audio must be real files and browser-verifiable: file exists, HTTP 200, audio content type, duration/progress visible, browser readyState clean.
- If the learner must answer after hearing German, the UI must unlock on actual audio completion, not fake “heard” clicks.
- Technical playback proof is not accent proof. Human/native accent review is separate before paid launch.

5. Production-first learning
- Recognition alone is not enough.
- A mission must force output: answer aloud, write a tiny line, fill a form, spell a name, repair a mistake, or complete a Goethe-style response.
- Sentence builders, chip counters, undo/clear, and long mobile typing are not the hero path. They are remediation or optional practice only.
- A1-safe output beats fancy German.

6. Self-sufficient launch-ready course
- One clear next action on every major screen.
- No dead links, broken audio, hidden nav/search collisions, stale QA, dashboard walls, or fake progress percentages pretending to be learning.
- If a learner cannot understand the next action within 5 seconds, the screen fails.
- If Boss has to explain where to click or why a screen matters, the product is not ready.

## 3. Current mismatch diagnosis

Blunt diagnosis: the documents now describe a good product more clearly than the app consistently delivers it.

What is aligned now:
- The current app has real M1/M2 mission direction.
- There are 3 Module 1 mission routes and 5 Module 2 mission routes.
- M1/M2 reviewed mission paths have been converted away from builder-heavy hero interactions toward voice-first immersive steps.
- Module 2 mission UI uses a custom audio control backed by a real hidden `<audio>` element.
- Mission audio files and broader Hören assets exist.
- `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, and `/missions/module-2/self-intro` return local 200.
- TypeScript passes.
- The dedicated M1/M2 immersive mobile QA currently passes locally.

What still violates the vision:

1. Trust is still not restored because QA contracts disagree with source.
`qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, and `qa_intro_start_path.mjs` are stale against current first-path copy/route decisions. Some of those tests may encode older product decisions. Some may be rightly flagging that current `/` and `/intro` drifted away from direct action. Either way, agents cannot call the app “good” while the proof layer contradicts the source.

2. The app still has dashboard/library DNA.
`/learn` and `/learn/[moduleId]` are more focused for M1/M2, but the old lesson map, games, scripts, practice, tests, vocabulary, and classic lesson pages still exist. That infrastructure is useful, but it cannot be the learner’s mental model. The mental model must be missions and ability wins.

3. The first path is directionally right but not contract-stable.
Current `/` is a compact professional course introduction. Current `/intro` is a compact first-German-moment screen. Some QA scripts expect direct root-to-first-mission behavior and older copy. Boss’s known preference is nuanced: root `/` should be Page 1 with concise course framing, not a blind dashboard; but it should quickly move to lesson action. The source/QA contract must be explicitly chosen and then enforced.

4. Mission coherence exists mainly for M1/M2.
Module 2 is the strongest vertical slice. Module 1 is partly converted into a voice-first mission path. Modules 3–18 remain mostly classic content/module arrays. The whole-course mission spine exists in docs, not yet in product behavior.

5. Real audio is inconsistent outside reviewed paths.
Mission audio exists. Hören audio exists. But legacy practice pages still contain browser TTS/SpeechSynthesis patterns. That is acceptable only as an inherited non-primary weakness, not as launch-ready German audio.

6. Games are not integrated as consequences.
The game catalog contains useful assets, but a big game wall is not a course. Games must appear after missions create a need: number practice after number missions, listening games after Hören missions, dialogue games after speaking missions.

7. The tree is too dirty for trust.
262 dirty/untracked entries means there is no safe “commit everything” moment. Future work must be lane-scoped, with files changed, checks run, and no push/deploy until Boss approves scope.

8. Previous agent behavior drifted into incremental polish.
Boss is losing faith because agents kept optimizing screens/fragments and then over-claimed. The reset must stop vague UX tinkering. Build one complete learner path, prove it, then generalize.

## 4. Product model

The product unit is a mission, not a lesson page.

Course unit: Mission

A mission is one short ability-building scene.

Required mission shape:
1. Hook: why this matters now.
2. Scene: Kerala/Goethe/future-rehearsal situation with visible roles.
3. Audio: learner hears one real German line.
4. Meaning check: learner catches what was said.
5. Production: learner answers aloud before heavy typing.
6. Tiny writing: only if exam-relevant and short.
7. Repair: one predictable Manglish/A1 trap.
8. Win: “You can now ___.”
9. Pull: next mission pressure.

Every mission must answer in 5 seconds:
- Who is speaking?
- What did they say?
- What do I do?
- What ability do I win?

Learner loop:

Hear -> understand -> answer aloud -> repair -> tiny write/proof -> win -> next.

Rules:
- Audio before explanation.
- Speaking before long typing.
- Repair before grammar dump.
- One useful action per screen.
- Advance in place unless a new scene truly needs a route.
- No builder/chip/counter hero path for beginners.

Module loop:

Each module becomes 3–6 missions that build one Goethe-relevant ability cluster.

Examples:
- Module 1: greet Frau Weber, thank/please, leave politely.
- Module 2: name, spell name, origin, job/languages, full self-intro.
- Module 3: numbers, prices, phone numbers, time, appointment.
- Module 4–12: daily-life survival missions mapped to A1.
- Module 13–15: travel/home/admin survival with A1-safe language.
- Module 16: optional bridge/reinforcement, not required for A1 exam path.
- Module 17: Hören/Lesen exam pressure.
- Module 18: Schreiben/Sprechen final proof.

Each module ends with:
- integrated checkpoint,
- explicit ability statement,
- one remediation route if weak,
- clear next-module pull.

Review/checkpoint loop:

Review is not “repeat flashcards.” Review should include:
- SRS for vocabulary and phrases.
- Audio replay for Hören.
- Speaking replay for key lines.
- Writing/form tasks for Schreiben.
- Mini mocks after module clusters.
- Final Goethe A1 mock with PASS/WEAK/FAIL and remediation.

## 5. Student-interest plan

Why a learner would continue:

1. Immediate spoken wins
A learner should speak useful German in the first minute. Not read theory. Not browse a dashboard. Speak.

2. Story pressure
Kuttan is not decorative. He represents pressure Malayali learners recognize: family expectations, Goethe Kochi, migration plans, paperwork, exam anxiety, money/value concerns, saying goodbye, first-call fear, and future Germany pressure.

3. Cultural fit
The world should feel familiar: Kerala classroom, Kochi exam prep, Malayalam/English transfer mistakes, family context, Indian documentation anxiety, cousin/friend in Germany, migration dreams.

4. Confidence through repair
The interesting learning moment is: “I nearly said the Manglish wrong version. I fixed it. Now I can say the German line.” Build around that.

5. Exam proof
Adult learners continue when they see each mission moves toward an exam/survival task. Show Goethe usefulness without turning every screen into a scary test center.

6. Low-friction phone UX
The next step must always be obvious: listen, say, tap meaning, fix one mistake, continue. Long typing, chip games, and fussy controls kill momentum early.

7. Retention pull
Every mission should end with a concrete next pressure:
- “Now spell your name.”
- “Now catch the phone number.”
- “Now fill the form.”
- “Now answer Frau Weber without freezing.”

Not: “Continue learning.” That is dead product copy.

## 6. SMART roadmap

Phase 1 — Stabilize first-path trust

Timebox: 2 days.

Specific outcome:
A clean, reviewable first learner path from `/` through Module 2 where source, QA, browser behavior, and product intent agree.

Files/routes affected:
- `src/app/page.tsx`
- `src/app/intro/page.tsx`
- `src/app/learn/page.tsx`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/missions/module-1/*`
- `src/app/missions/module-2/*`
- `src/app/missions/module-2/_components/MissionUI.tsx`
- `src/lib/missions/module1.ts`
- `src/lib/missions/module2.ts`
- `scripts/qa_mission_pilot.py`
- `scripts/qa_gold_slice_first_journey.mjs`
- `scripts/qa_intro_start_path.mjs`
- `scripts/qa_module2_production_mobile.mjs`

Measurable acceptance criteria:
- Product decision documented in the QA file header: root `/` is either concise framing -> `/intro` -> mission, or root `/` goes directly to first mission. No ambiguity.
- `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, M1/M2 mission routes return 200 locally.
- Browser playthrough clicks actual CTAs and verifies path changes.
- Mission audio exists, serves, and plays in browser.
- Reviewed path uses no browser SpeechSynthesis.
- QA scripts match the chosen UX and pass.
- M1/M2 mobile immersive QA passes.

What NOT to do:
- Do not redesign all routes.
- Do not add broad strategy docs.
- Do not polish containers while QA is stale.
- Do not commit/push dirty tree.

Phase 2 — Convert Module 3 into the second proof module

Timebox: 3 days.

Specific outcome:
Module 3 becomes a complete mission sequence for numbers/time, proving the mission model is reusable beyond greetings/self-intro.

Files/routes affected:
- New `src/lib/missions/module3.ts`
- New `src/app/missions/module-3/*` or one generic mission route if extraction happens first
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/learn/page.tsx`
- relevant audio under `public/audio/missions/module-3/` or existing `public/audio/hoeren/module-03/`
- QA scripts expanded to Module 3.

Measurable acceptance criteria:
- 4–5 Module 3 missions: numbers 0–20, price, phone number, time, appointment.
- Every mission has real audio, answer aloud, one repair, and tiny typed/written task where exam-relevant.
- One checkpoint catches a phone number or time from audio.
- No long keyboard burden in the first two Module 3 missions.
- Mobile viewport QA passes.

What NOT to do:
- Do not build another isolated beautiful page.
- Do not make Number Blitz/Time Attack the module itself. Use games after mission need.
- Do not generate paid media.

Phase 3 — Roll mission spine through Modules 4–12

Timebox: 10 working days.

Specific outcome:
Core daily-life A1 modules become mission-led enough to feel like one course, not a patched lesson library.

Files/routes affected:
- Shared mission config or `src/lib/missions/module4.ts` through `module12.ts`
- `src/app/missions/module-[4-12]/*` if route-per-module continues
- `src/lib/content/modules/module-04.ts` through `module-12.ts`
- `/learn/[moduleId]` mission landing logic

Measurable acceptance criteria:
- Each module has 3–5 mission cards with one ability win.
- Existing content is reused where possible.
- Games appear as post-mission practice, not a game wall.
- Each module has speaking output and writing/free-text/form output.
- Kerala/Kuttan canon scan passes.

What NOT to do:
- Do not rewrite every script line-by-line.
- Do not move Kuttan to Germany before A1 climax.
- Do not mass-add exercises just to improve counts if they do not fit the mission.

Phase 4 — Exam modules and checkpoints

Timebox: 5 working days.

Specific outcome:
Modules 17–18 become honest Goethe A1 proof, not decorative final lessons.

Files/routes affected:
- `src/lib/content/modules/module-17.ts`
- `src/lib/content/modules/module-18.ts`
- `src/app/tests/*`
- `src/app/practice/review/page.tsx`
- `src/app/practice/write/page.tsx`
- audio under `public/audio/hoeren/module-17`, `module-18`

Measurable acceptance criteria:
- Hören Teil 1/2/3 practice uses real audio.
- Schreiben form-filling and short-message tasks are production exercises.
- Sprechen self-intro/questions/requests have mission-style practice.
- Mini mock returns PASS/WEAK/FAIL and routes one remediation mission.
- Goethe map gaps are closed or explicitly marked WEAK.

What NOT to do:
- Do not claim exam readiness from coverage counts alone.
- Do not bury failures behind dashboard percentages.

Phase 5 — Launch hardening

Timebox: 5 working days.

Specific outcome:
The course is safe for sister/friends to try without embarrassment.

Files/routes affected:
- navigation/global search focused-mode logic
- primary path route QA
- asset verification scripts
- mobile browser QA scripts
- auth/payment only if already configured; otherwise keep gated

Measurable acceptance criteria:
- No broken links on primary learner path.
- No missing audio/video/image assets on launch path.
- TypeScript passes.
- Mission QA passes.
- Browser playthrough passes on mobile viewport.
- No console/hydration errors in primary flow.
- Dirty git state is separated into reviewable scopes.

What NOT to do:
- Do not deploy/push until Boss approves.
- Do not configure pricing/payment during this product reset.
- Do not ask Boss to review a link before evidence exists.

Phase 6 — Marketing alignment after product proof

Timebox: after Phases 1–5 pass.

Specific outcome:
Marketing says what the product actually does.

Files/routes affected:
- `src/app/landing/page.tsx`
- pricing/marketing pages after course proof
- launch copy/campaign docs

Measurable acceptance criteria:
- Landing promise matches playable first path.
- Demo video/screenshots show real mission interaction, not dashboards.
- Positioning is clear: German A1 for Malayalis, Kerala-rooted, Goethe-serious.

What NOT to do:
- Do not market a product that still needs Boss to explain it.

## 7. First 7 days execution plan

Day 1 — Repair proof before polish

Deliverables:
- Decide and encode the first-path contract in source + QA:
  - Recommended: `/` = concise professional course framing, CTA to `/intro`; `/intro` = compact first-moment framing; first mission begins with real audio/action.
  - If Boss wants more direct action, root `/` can point straight to `/missions/module-1/greet-frau-weber?start=listen`, but then the professional course introduction must live on marketing/landing.
- Patch `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, and `scripts/qa_intro_start_path.mjs` so they test the chosen contract, not stale copy.
- Add one source comment near QA expectations explaining the contract to future agents.

QA gates:
- `npx tsc --noEmit --pretty false --incremental false`
- `python3 scripts/qa_mission_pilot.py`
- `node scripts/qa_gold_slice_first_journey.mjs`
- `node scripts/qa_intro_start_path.mjs`
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`
- local route 200 checks.

Day 2 — Make Module 1 + Module 2 reviewable as one path

Deliverables:
- Browser-verify all M1/M2 mission routes.
- Verify audio-ended gating on one M1 route and one M2 route.
- Confirm M1 completion pulls to M2 and M2 completion pulls to Module 3/learn-3 without dead end.
- Produce one Tailscale review URL only after proof passes.

QA gates:
- Browser console clean on review path.
- Audio readyState/duration/progress proof.
- No nav/search overlay on focused path.
- No stale QA failure.

Day 3 — Module 3 mission config and first two missions

Deliverables:
- Create `src/lib/missions/module3.ts` with 4–5 mission cards.
- Build first two Module 3 routes: catch a number, catch a time.
- Reuse existing Hören audio if suitable; otherwise use approved pre-rendered/local audio only.

QA gates:
- route 200.
- audio file exists and plays.
- mission QA includes Module 3 first route.
- no required long typing before confidence.

Day 4 — Finish Module 3 sequence

Deliverables:
- price mission.
- phone-number mission.
- appointment/time checkpoint.

QA gates:
- browser playthrough of Module 3 sequence.
- mobile viewport check.
- no mandatory long typing before spoken/listening confidence.

Day 5 — Connect games as post-mission practice

Deliverables:
- Number/time missions offer Number Blitz/Time Attack only after the ability win.
- `/games` catalog is not first-path navigation.
- Game links used from mission wins work.

QA gates:
- no first-session user hits a 19-game wall.
- game links work where offered.
- game practice maps to the just-earned mission skill.

Day 6 — Goethe map checkpoint audit

Deliverables:
- Fresh QC report mapping Modules 1–3 mission outputs to Goethe skills.
- Exact gap list for Modules 4–18 rollout.
- No broad strategy doc; append to one QC report.

QA gates:
- PASS/WEAK/FAIL per module.
- next module lane selected.
- gaps are concrete, not “improve pedagogy.”

Day 7 — Boss review package

Deliverables:
- One verified Tailscale URL.
- One concise QC report: files changed, routes tested, QA results, known weaknesses.
- Max three screenshots if visual proof is needed.
- Ask only the high-leverage decisions in section 10.

QA gates:
- all first-week checks rerun.
- no “good” claim without browser evidence.
- no stale QA ignored.

## 8. First 48 hours exact build lane

This is agent-executable. No Boss babysitting.

Task 1: Choose and lock first-path contract
- Read `src/app/page.tsx`, `src/app/intro/page.tsx`, and the three start-path QA scripts.
- Recommended contract:
  - `/` stays Page 1 with concise professional course framing.
  - `/intro` stays one compact first-German-moment screen.
  - CTA reaches `/missions/module-1/greet-frau-weber` or `/missions/module-1/greet-frau-weber?start=listen` consistently.
- Acceptance: one written contract appears in a QA comment and all tests use it.

Task 2: Repair stale QA scripts
- Patch only:
  - `scripts/qa_mission_pilot.py`
  - `scripts/qa_gold_slice_first_journey.mjs`
  - `scripts/qa_intro_start_path.mjs`
- Do not change product copy unless browser QA proves the screen is genuinely too vague/text-heavy.
- Acceptance: scripts fail only on real product issues, not outdated strings.

Task 3: Browser-prove first path
- Run local server if needed.
- Click actual CTAs.
- Verify final `location.pathname` after every click.
- Verify at least one mission audio play and ended event.
- Acceptance: `/` -> `/intro` -> M1 route is proven in browser, or `/` -> M1 route if that contract is chosen.

Task 4: Verify M1/M2 audio inventory
- Extract all audio paths from `src/lib/missions/module1.ts` and `src/lib/missions/module2.ts`.
- Check file exists and size > 10 KB.
- If server is running, check HTTP 200 and audio content type.
- Acceptance: zero silent missing/suspicious primary mission files.

Task 5: Keep first-path text lean
- Do not redesign containers.
- Remove learner-facing system labels/counters/status text only if visible on first path.
- Acceptance: first mission screen has one spoken scene, one audio action, one repair/speaking action, and no dashboard labels.

Task 6: Standardize M1 -> M2 transition
- Complete or simulate `polite-exit` completion.
- Confirm CTA reaches `/missions/module-2/self-intro` with the intended start state.
- Acceptance: deterministic browser route transition.

Task 7: Standardize M2 -> M3 transition
- Complete or simulate `final-self-intro` completion.
- Confirm next action reaches `/learn/3` or first Module 3 placeholder.
- Acceptance: no dead end after Module 2.

Task 8: Produce evidence checkpoint
- Append to `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`.
- Include commands, exit codes, exact failures, exact next fix.
- Acceptance: no vague “UX improved” report.

Only after these pass: start Module 3 pilot.

## 9. Definition of launch-ready

Use PASS/WEAK/FAIL. No “pretty good.”

Content

PASS:
- All 18 modules have a clear ability win.
- Every primary mission is A1-safe and story-tied.
- No obvious grammar/article/case/word-order teaching bugs.
- No Kuttan-in-Germany A1 canon breaks.

WEAK:
- Some old lesson content remains behind optional routes but does not block primary flow.
- Some non-core examples are generic but correct.

FAIL:
- Wrong German.
- Kuttan physically in Germany during A1 named scenes.
- Generic worksheet content appears in the primary path.

Audio

PASS:
- Reviewable German uses real audio files.
- Primary audio returns HTTP 200 and plays in browser.
- UI shows duration/progress.
- Learner turn unlocks after audio completion where required.

WEAK:
- Legacy non-primary practice page still uses browser TTS but is clearly marked for replacement.
- Audio technically works but accent/taste still needs human review.

FAIL:
- Browser SpeechSynthesis in reviewed path.
- Missing/silent MP3.
- Audio button cannot prove playback.
- Learner can continue before required audio finishes.

UX

PASS:
- First action within 5 seconds after framing.
- One obvious CTA per screen.
- No dashboard clutter in first path.
- No fixed-nav/search overlay interference.
- Mission advances in place unless a new scene requires route change.

WEAK:
- Old lesson map exists behind optional disclosure.

FAIL:
- Learner reads paragraphs before doing German.
- 19-game catalog appears as primary learning path.
- Builder/chip/undo/clear flow is the hero interaction for beginners.
- QA scripts and source disagree.

Mobile

PASS:
- Primary path works on phone viewport.
- Tap targets are large.
- Audio controls visible and usable.
- No mandatory long typing early.

WEAK:
- Later exam writing is longer but justified.

FAIL:
- Keyboard burden blocks early confidence.
- CTA is hidden/intercepted.
- First useful action requires scrolling past clutter.

Pedagogy

PASS:
- Hear -> understand -> answer aloud -> repair -> tiny write/proof -> win.
- Every interaction has a learning reason.
- Mistake repair targets real Malayalam/English transfer traps.

WEAK:
- Some recognition exercises remain as support.

FAIL:
- Mostly MC/matching.
- Chip dragging is treated as production.
- Grammar dump before communicative action.

Exam readiness

PASS:
- Goethe A1 Hören/Lesen/Schreiben/Sprechen sections are mapped and practiced.
- Modules 17–18 provide mock-test proof and remediation.
- Form filling and short messages are practiced as production.

WEAK:
- Coverage exists but remediation is thin.

FAIL:
- Course claims Goethe readiness without real Hören audio or speaking/writing production.

Trust/reviewability

PASS:
- TypeScript passes.
- Mission QA passes.
- Browser route playthrough passes.
- Review URL verified before Boss sees it.
- Dirty git work is isolated before commit/push.

WEAK:
- Inherited lint/app issues exist outside changed lane and are named.

FAIL:
- Agent says “good” from source edits alone.
- QA script is stale and ignored.
- Boss receives broken audio, dead CTA, hydration error, or untested Tailscale link.

## 10. Boss decisions needed

Max 5. These are the only decisions worth asking now.

1. Public protagonist name
Keep “Kuttan” publicly, or use an adult-safe public name like Arun/Kiran while keeping Kuttan as home nickname?

Recommendation: use Arun or Kiran publicly before paid launch; keep Kuttan as home/family nickname if Boss wants warmth.

2. First-path strictness
Should root `/` be compact professional framing -> `/intro` -> mission, or should first-time users go directly from `/` into the first audio mission?

Recommendation: keep root as concise professional course introduction, then `/intro` as one compact first-moment screen, then immediate audio mission. Cold buyers need one sentence of framing.

3. Launch scope
Beta with Modules 1–3 plus review/checkpoints, or wait until all 18 modules are mission-first?

Recommendation: beta can be M1–M3 if clearly labeled. Paid launch needs all 18 modules coherent enough to be self-sufficient.

4. Audio quality bar
Is technically clean generated/pre-rendered audio acceptable for beta, or does paid launch require native/human accent review?

Recommendation: technical PASS for internal/beta; paid launch needs human review on core mission audio.

5. Canon cleanup scope
Patch all Kuttan-in-Germany A1 violations now, or only primary path first?

Recommendation: primary path first, systematic canon scan before public launch. Do not mass-edit while mission engine is unstable.

## 11. Verification harness

Future agents must judge outputs against Boss’s vision without Boss checking everything. This is the harness.

Layer 1: Source contract checks

Checks:
- Check exact files changed.
- Check route/source still points to mission-first path.
- Check QA scripts encode the current intended product contract.
- Reject source-only claims if the route was not executed.

Required evidence:
- `git status --short`
- exact changed files list
- source snippets only as support, not proof

PASS:
- Changed files are scoped to the lane.
- No unrelated broad churn.
- Source and QA agree.

WEAK:
- Small inherited dirty state exists and is named.

FAIL:
- Broad source churn with no lane boundary.
- Agent cannot explain what changed.
- QA tests stale expectations and agent ignores it.

Layer 2: Route/browser checks

Checks:
- Start local server bound to `0.0.0.0` when reviewable browser work is needed.
- Test exact routes: `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, relevant mission route.
- Click actual CTAs and verify `location.pathname` after the click.
- Check browser console/page errors.

Required evidence:
- route list with HTTP status
- click path with final pathname
- console error summary
- mobile viewport check for primary path

PASS:
- Route loads, click works, no relevant console/hydration errors.

WEAK:
- Non-blocking inherited console noise exists and is named.

FAIL:
- Dead route, inert CTA, hidden/intercepted CTA, hydration overlay, or unverified Tailscale link.

Layer 3: Audio checks

Checks:
- Extract audio paths from mission data and content modules.
- Check file exists and size > 10 KB.
- Check HTTP 200 and audio content type when server is running.
- In browser, verify audio element readyState, duration, progress movement, and no error.
- Verify turn unlocks only after required audio ends.

Required evidence:
- file path
- HTTP status/content type
- browser readyState/duration/currentTime/error
- screenshot/text/state proving cue after audio end where relevant

PASS:
- Real file, serves, plays, and unlock behavior is correct.

WEAK:
- Technical playback works but human accent quality is not reviewed.

FAIL:
- SpeechSynthesis in reviewed path.
- JS-only hidden playback with no evidence.
- Missing/silent/non-audio file.
- Learner can continue before required audio finishes.

Layer 4: Content sample checks

Checks:
- Sample changed mission/lesson content for German correctness.
- Check A1 level, grammar, capitalization, articles, word order.
- Check Kerala/Kuttan canon.
- Check Goethe map contribution.
- Check production output exists.

Required evidence:
- 3–5 sampled German lines/prompts
- Goethe skill mapping
- production action named
- canon check result

PASS:
- A1-safe, useful, culturally tied, production-backed.

WEAK:
- Correct but generic, or production exists but is thin.

FAIL:
- Wrong German, generic worksheet, no output, canon break.

Layer 5: UX/cognitive-load checks

Checks:
- Mission opening visible text target: under 45 visible learner-facing words unless the screen is root course framing.
- Root course framing must still have one primary CTA and no dashboard clutter.
- One primary CTA per screen.
- No dashboard/status/meta labels in first path.
- No long typing before audio/speaking confidence.

Required evidence:
- screenshot or DOM text extraction
- visible word count
- primary CTA text
- mobile viewport note

PASS:
- Learner knows what to do within 5 seconds.

WEAK:
- Extra clutter but primary action still clear.

FAIL:
- Text-heavy, dashboard-like, multiple competing CTAs, scrolling before first action.

Layer 6: Vision-alignment self-judge block

Every build output report must include this block before it is called done:

- Output judged: route/file/lesson/mission name.
- Vision source checked: doc path(s).
- Files changed: exact list.
- User path tested: exact route/click path.
- Audio proof: exact file/status/browser proof, or `not applicable`.
- Production proof: exact learner output.
- Goethe proof: skill/task mapping.
- Mobile proof: viewport/CTA result, or `not applicable`.
- Result: PASS / WEAK / FAIL.
- If WEAK/FAIL: next fix.

Anti-hallucination rules:
- Do not say “good,” “premium,” “launch-ready,” or “reviewable” from file edits alone.
- Do not treat TypeScript PASS as product PASS.
- Do not treat route HTTP 200 as interaction PASS.
- Do not treat audio file existence as playback PASS.
- Do not send Boss a review URL until the exact review path is browser-tested.
- If QA is stale, fix QA or label the lane FAIL. Do not claim quality over failing gates.
- If evidence is missing, label result WEAK/FAIL. Do not fill the gap with confidence.

## 12. Vision-alignment scorecard

Use this checklist on every changed route, mission, lesson, game, audio flow, or report.

A. Learner value

PASS:
- Learner gets one clear ability they can use.
- Ability is named on the win screen or report.

WEAK:
- Useful information, but ability is vague.

FAIL:
- Content exists but learner cannot do anything new.

B. Malayali/Kerala identity

PASS:
- Kerala/Malayali context is part of the task, scene, mistake, or motivation.
- Manglish bridge helps a real transfer issue.

WEAK:
- Cultural tie exists only as surface copy.

FAIL:
- Could be any German app.
- Kuttan is physically in Germany during A1.

C. Goethe A1 proof

PASS:
- Maps to a Goethe A1 skill/task.
- Uses short, correct, high-probability German.

WEAK:
- Useful beginner German but exam link is indirect.

FAIL:
- Exam claim without practice proof.
- Out-of-scope or fancy German.

D. Adult-safe tone

PASS:
- Warm, grounded, serious enough for adults.

WEAK:
- Slightly cute but not damaging.

FAIL:
- Childish mascot energy dominates.
- App feels like a kids game.

E. Audio/speaking/writing production

PASS:
- Learner hears real German.
- Learner answers aloud.
- Learner writes/types a tiny exam-relevant output where useful.
- Learner repairs one mistake.

WEAK:
- Production exists but one mode is thin.

FAIL:
- Recognition-only.
- Chip dragging is treated as production.
- No real audio on reviewed path.

F. Engagement

PASS:
- Story pressure, quick win, repair moment, and next pull exist.

WEAK:
- Activity is useful but emotionally flat.

FAIL:
- Boring worksheet/dashboard flow.
- Games thrown in without learning reason.

G. Low cognitive load

PASS:
- One action, low text, no clutter, no early long typing.

WEAK:
- Usable but has extra labels/copy.

FAIL:
- Text-heavy, page-heavy, confusing, dashboard-like, or click-heavy.

H. Premium trust

PASS:
- Audio controls work and show progress.
- Mobile route feels stable.
- No console/hydration errors.
- QA evidence exists.

WEAK:
- Minor inherited roughness named.

FAIL:
- Broken link/audio/CTA.
- QA stale and ignored.
- Review friction left for Boss.

I. Launch-readiness

PASS:
- Content, audio, UX, mobile, pedagogy, exam mapping, and trust gates pass for the scoped lane.

WEAK:
- Lane is usable for beta but known gaps are named.

FAIL:
- Needs Boss explanation to be usable.
- Not self-sufficient.
- Not verified.

Minimum score to call an output “done”:
- No FAIL in any category.
- At most two WEAK categories, both named with next fixes.
- Audio and CTA cannot be WEAK/unknown on a reviewable route. They must PASS.
- Source/QA contract cannot be WEAK/unknown. If QA is stale, the lane is not reviewable.

## Boss summary

Blunt read: Boss’s vision is clear. The product should be a Kerala-rooted, Goethe-serious, phone-first mission course where learners hear German, answer aloud, repair one mistake, write only when useful, and leave with real A1 ability wins.

Current state:
- M1/M2 mission direction is real.
- M1/M2 reviewed routes are now mostly voice-first, not builder-first.
- TypeScript passes.
- Key local routes return 200.
- M1/M2 immersive mobile QA passes locally.
- Trust is still not restored because start-path QA scripts are stale/failing against current `/` and `/intro` behavior.

Best next move: repair the first-path contract in QA/source, then browser-prove `/` -> `/intro` -> first M1 audio mission before building Module 3.
