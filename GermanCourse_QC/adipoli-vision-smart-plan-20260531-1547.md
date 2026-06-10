# Adipoli German — Vision-to-SMART Reset Plan

Generated: 2026-05-31T15:47:22+02:00
Workdir: `/shared/german-course`

This is the reset plan after reading Boss-written vision/product docs and inspecting the current app. It is not a UI-polish plan. It is a course/product execution plan.

Evidence used before writing:
- Core docs synthesized: `docs/README.md`, `COURSE_OPERATING_BRIEF_2026-05-19.md`, `PRODUCT_DIRECTION_RESET_2026-05-20.md`, `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`, `AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`, `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`, `COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`, `COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`, `A1_STORY_BIBLE.md`, `COURSE_PLAN_10_10.md`, `GOETHE_A1_EXAM_MAP.md`, `EXERCISE_QUALITY_RULES.md`, `MODULE_BLUEPRINTS.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `SERIES_FULL_SCRIPT.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`, `GAME_AUDIT.md`, `LAUNCH_CHECKLIST.md`, `COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md`.
- Source inspected: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, Module 1 mission routes, Module 2 mission routes, `src/app/missions/module-2/_components/MissionUI.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/lib/content/modules/`.
- Current inventory: 18 module files, 8 mission routes, 23 mission MP3s, 134 Hören MP3s, 25 video files, QA scripts including `qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, `qa_intro_start_path.mjs`, `qa_module2_production_mobile.mjs`.
- Git state: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries. Not safe to commit or push as one blob.
- Checks run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`
  - FAIL: `python3 scripts/qa_mission_pilot.py` fails on stale intro start-path snippets.
  - FAIL: `node scripts/qa_gold_slice_first_journey.mjs` fails because it expects old intro copy/CTA text.

## 1. Vision reconstruction

Boss is trying to build a complete paid web-app course, not a German content folder.

Plain version:

Adipoli German should take a Malayali adult beginner from zero German to a confident Goethe A1 attempt through short, phone-first story missions. The learner follows Kuttan’s Kerala-to-Germany pressure, but the learner is not passive. Every unit should make the student hear German, understand it, answer aloud, repair one real mistake, write/type only when useful, and leave with a visible ability win.

The product should feel like:
- Kerala-rooted and emotionally familiar, not generic German-app content.
- Goethe A1 serious, not random phrase learning.
- Adult-safe and useful, not childish mascot entertainment.
- Audio-first and production-first, not text-first dashboards.
- Cheap enough to scale, but polished enough to trust.
- Self-sufficient: a learner should know what to do next without Boss explaining the course.

Core promise:

“German A1 for Malayalis through short story missions: hear it, say it, fix it, use it, and prepare for Goethe.”

If the app does not create a usable spoken/listening/writing ability in the learner, it is not matching Boss’s vision no matter how nice the UI looks.

## 2. Non-negotiables

These are the hard rules. If a feature conflicts with these, cut the feature.

1. Malayali/Kerala identity
- A1 physically happens in Kerala.
- Kuttan stays in Kerala during A1.
- Germany appears as goal, dream, video call, exam rehearsal, or learner imagination — not casual physical placement.
- Manglish is a learning bridge, not a joke. It should help learners notice Malayalam/English transfer mistakes.

2. Goethe A1 seriousness
- Every module needs a clear A1 ability win.
- Hören, Lesen, Schreiben, and Sprechen must all be practiced.
- The final course must map to Goethe A1 tasks, especially listening prompts, form filling, short messages, self-introduction, spelling, questions, requests, appointments, prices, numbers, and everyday notices.

3. Adult-safe tone
- Kuttan can be warm, relatable, and funny.
- He cannot feel like a children’s mascot.
- Appu/dog/mascot elements must not drive the course.
- Public naming is still a risk: “Kuttan” is culturally warm but may read childish in a paid adult product.

4. Real audio
- No browser SpeechSynthesis for reviewable German.
- Mission audio must be real files and browser-verifiable: file exists, HTTP 200, audio content type, duration/progress visible, browser readyState clean.
- If a learner is supposed to respond after hearing German, the UI must unlock on actual audio completion, not fake “heard” clicks.

5. Production-first learning
- Recognition alone is not learning enough.
- A mission must push output: answer aloud, write a tiny line, fill a form, spell a name, repair a mistake, or complete a Goethe-style response.
- Sentence builders, chips, counters, undo/clear, and long typing are not the hero experience. They can be remediation only.

6. Self-sufficient launch-ready course
- One clear next action on every major screen.
- No dead links, broken audio, hidden nav/search collisions, stale QA, dashboard walls, or vague progress percentages pretending to be learning.
- If a learner cannot understand the next action within 5 seconds, the screen fails.

## 3. Current mismatch diagnosis

Blunt diagnosis: the docs understand the vision better than the app does.

What is aligned now:
- There is a real mission direction in source.
- Module 1 has 3 mission routes.
- Module 2 has 5 mission routes.
- `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, and first mission routes return HTTP 200 locally.
- `src/lib/missions/module1.ts` and `src/lib/missions/module2.ts` define mission cards and audio paths.
- Module 2 mission UI uses a custom audio control backed by a real `<audio>` element.
- There are real mission audio files and broader Hören audio assets.
- TypeScript passes.

What still violates the vision:

1. Verification is not trustworthy yet.
`qa_mission_pilot.py` and `qa_gold_slice_first_journey.mjs` fail on stale intro/start-path expectations. The route may work, but the proof layer is broken. Boss should not be asked to trust a link while the QA gate disagrees with the intended UX.

2. The app still carries old dashboard DNA.
`/learn` has a focused mission hero, but the old lesson map still exists behind controls. `/play/[moduleId]/[lessonId]`, games, scripts, practice, tests, and vocabulary routes still feel like a course library. This is acceptable as transitional infrastructure, not as the final learner mental model.

3. The first path is partially fixed, not launch-stable.
Current source points `/` -> `/intro` -> Module 1 mission -> Module 2 sequence. That is directionally right. But QA expects a different intro copy/CTA and fails. The next build lane must repair the source/QA contract before more product claims.

4. Mission coherence exists only for M1/M2.
Module 2 is the strongest vertical slice. Module 1 has mission work. Modules 3–18 still need conversion from classic lesson/content arrays into mission-led learner loops. The whole-course spine exists in docs, not yet in product behavior.

5. Real audio is inconsistent outside the mission path.
Mission audio exists. Hören audio exists. But legacy practice pages still contain browser speech-synthesis patterns. That is not acceptable for reviewed/paid German audio paths.

6. Games are not yet integrated as learning consequences.
The game audit shows useful practice assets, but a big game catalog is not a course. Games should appear after a mission creates a need: numbers practice after number/time missions, listening practice after Hören missions, dialogue practice after speaking missions.

7. Too much work is unbounded and dirty.
262 dirty/untracked entries means the tree is not reviewable as one change. Any further work needs small lanes, explicit files, QA evidence, and no commit/push until scope is separated.

8. The product has been drifting into incremental polish.
Boss’s faith is down because previous work optimized screens/fragments and then claimed quality too early. The reset must stop vague UX tinkering. Build one complete learner path, prove it, then generalize.

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
- Advance in place unless a new scene really needs a route.

Module loop:

Each module becomes 3–6 missions that build one Goethe-relevant ability.

Examples:
- Module 1: greet Frau Weber, thank/please, leave politely.
- Module 2: name, spell name, origin, job/languages, full self-intro.
- Module 3: numbers, prices, phone numbers, time, appointment.
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
Kuttan is not decorative. He represents pressure Malayali learners recognize: family expectations, Goethe Kochi, migration plans, paperwork, exam anxiety, money/value concerns, goodbye/airport stakes.

3. Cultural fit
The world should feel familiar: Kerala classroom, Kochi exam prep, Malayalam/English transfer mistakes, family context, Indian documentation anxiety, cousin/friend in Germany, migration dreams.

4. Confidence through repair
The most interesting learning moment is: “I almost said the Manglish wrong version. I fixed it. Now I can say the German line.” Build around that.

5. Exam proof
Adult learners continue when they see that each mission moves toward a real exam/survival task. The app should show Goethe usefulness without turning every screen into a scary test center.

6. Low-friction phone UX
The next step must always be obvious: listen, say, tap meaning, fix one mistake, continue. Long typing and fussy chip builders kill momentum early.

7. Retention pull
Every mission should end with a real next pressure:
- “Now spell your name.”
- “Now catch the phone number.”
- “Now fill the form.”
- “Now answer Frau Weber without freezing.”

Not: “Continue learning.” That is dead product copy.

## 6. SMART roadmap

Phase 1 — Stabilize trust and first path

Timebox: 2 days.

Outcome:
A clean, reviewable first learner path from `/` through Module 2.

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

Acceptance criteria:
- `/` -> `/intro` -> M1 mission -> M2 sequence works locally.
- Every first-path route returns 200.
- Mission audio exists, serves, and plays in browser.
- No browser SpeechSynthesis in reviewed mission path.
- QA scripts match the intended current UX and pass.
- Browser playthrough clicks actual CTAs and verifies route changes, not source snippets only.
- Boss receives a review URL only after proof passes.

What NOT to do:
- Do not redesign all routes.
- Do not add new broad strategy docs.
- Do not polish containers while QA is stale.
- Do not commit/push dirty tree.

Phase 2 — Convert Module 3 into the second proof module

Timebox: 3 days.

Outcome:
Module 3 becomes a complete mission sequence for numbers/time, proving the mission model is reusable beyond self-introduction.

Files/routes affected:
- New `src/lib/missions/module3.ts`
- New `src/app/missions/module-3/*`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/learn/page.tsx`
- relevant audio under `public/audio/missions/module-3/` or existing `public/audio/hoeren`
- QA scripts expanded to Module 3.

Acceptance criteria:
- 4–5 Module 3 missions: numbers 0–20, price, phone number, time, appointment.
- Every mission has real audio, answer aloud, one repair, and tiny typed/written task where exam-relevant.
- One Module 3 checkpoint catches a phone number/time from audio.
- No long keyboard burden in first two missions.
- Mobile viewport QA passes.

What NOT to do:
- Do not build another isolated “beautiful page.”
- Do not make Number Blitz/Time Attack the module itself. Use games after mission need.

Phase 3 — Roll mission spine through Modules 4–12

Timebox: 10 working days.

Outcome:
Core daily-life A1 modules become mission-led enough to feel like one course, not a patched lesson library.

Files/routes affected:
- Generic mission config or `src/lib/missions/module4.ts` through `module12.ts`
- `src/app/missions/module-[4-12]/*` if route-per-module continues
- `src/lib/content/modules/module-04.ts` through `module-12.ts`
- `/learn/[moduleId]` mission landing logic

Acceptance criteria:
- Each module has 3–5 mission cards with one ability win.
- Existing content is reused where possible; no mass rewrite.
- Games appear as post-mission practice, not a wall.
- Each module has speaking output and writing/free-text/form output.
- Kerala/Kuttan canon scan passes.

What NOT to do:
- Do not rewrite every script line-by-line.
- Do not generate paid media.
- Do not move Kuttan to Germany before A1 climax.

Phase 4 — Exam modules and checkpoints

Timebox: 5 working days.

Outcome:
Modules 17–18 become honest Goethe A1 proof, not decorative “final lessons.”

Files/routes affected:
- `src/lib/content/modules/module-17.ts`
- `src/lib/content/modules/module-18.ts`
- `src/app/tests/*`
- `src/app/practice/review/page.tsx`
- `src/app/practice/write/page.tsx`
- audio under `public/audio/hoeren/module-17`, `module-18`

Acceptance criteria:
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

Outcome:
The course is safe for sister/friends to try without embarrassment.

Files/routes affected:
- navigation/global search focused-mode logic
- primary path route QA
- asset verification scripts
- mobile browser QA scripts
- auth/payment only if already configured; otherwise keep gated

Acceptance criteria:
- No broken links on primary learner path.
- No missing audio/video/image assets on launch path.
- TypeScript passes.
- Mission QA passes.
- Browser playthrough passes on mobile viewport.
- No console/hydration errors in primary flow.
- Dirty git state is separated into reviewable scopes.

What NOT to do:
- Do not deploy/push until Boss approves.
- Do not configure pricing/payments in this product reset.
- Do not ask Boss to review a link before evidence exists.

Phase 6 — Marketing alignment after product proof

Timebox: after Phases 1–5 pass.

Outcome:
Marketing says what the product actually does.

Files/routes affected:
- `src/app/landing/page.tsx`
- pricing/marketing pages after course proof
- launch copy/campaign docs

Acceptance criteria:
- Landing promise matches playable first path.
- Demo video/screenshots show real mission interaction, not dashboards.
- Positioning is clear: German A1 for Malayalis, Kerala-rooted, Goethe-serious.

What NOT to do:
- Do not market a product that still needs Boss to explain it.

## 7. First 7 days execution plan

Day 1 — Repair proof before polish

Deliverables:
- Fix `scripts/qa_mission_pilot.py` and `scripts/qa_gold_slice_first_journey.mjs` so they match the intended `/intro` and first mission start behavior.
- Choose one source contract: either `/intro` links to `/missions/module-1/greet-frau-weber` or to `/missions/module-1/greet-frau-weber?start=listen`. Then enforce the same in source and QA.
- Add/repair a browser playthrough that clicks `/` -> `/intro` -> first M1 mission.

QA gates:
- `npx tsc --noEmit --pretty false --incremental false`
- `python3 scripts/qa_mission_pilot.py`
- `node scripts/qa_gold_slice_first_journey.mjs`
- local route 200 checks.

Day 2 — Make Module 1 + Module 2 reviewable

Deliverables:
- Verify all M1/M2 mission routes in browser.
- Verify audio-ended gating on one M1 route and one M2 route.
- Confirm M1 completion pulls to M2 and M2 completion pulls to Module 3/learn-3 without dead end.
- Produce one Tailscale review URL only after proof passes.

QA gates:
- browser console clean on review path.
- audio readyState/duration/progress proof.
- no nav/search overlay on focused path.

Day 3 — Module 3 mission config and first two missions

Deliverables:
- Create `src/lib/missions/module3.ts` with 4–5 mission cards.
- Build first two Module 3 routes: catch a number, catch a time.
- Reuse existing Hören audio where possible.

QA gates:
- route 200.
- audio file exists and plays.
- mission QA includes Module 3 first route.

Day 4 — Finish Module 3 sequence

Deliverables:
- price mission.
- phone-number mission.
- appointment/time checkpoint.

QA gates:
- browser playthrough of Module 3 sequence.
- mobile viewport check.
- no mandatory long typing before confidence.

Day 5 — Connect games as post-mission practice

Deliverables:
- Number/time missions can offer Number Blitz/Time Attack as optional practice after the ability win.
- `/games` catalog is not first-path navigation.

QA gates:
- no first-session user hits a 19-game wall.
- game links work where offered.

Day 6 — Goethe map checkpoint audit

Deliverables:
- Fresh QC report mapping Modules 1–3 mission outputs to Goethe skills.
- Exact gap list for Modules 4–18 rollout.
- No new broad strategy doc; append to one QC report.

QA gates:
- PASS/WEAK/FAIL per module.
- next module lane selected.

Day 7 — Boss review package

Deliverables:
- One verified Tailscale URL.
- One concise QC report: files changed, routes tested, QA results, known weaknesses.
- Max three screenshots if visual proof is needed.
- Ask only the high-leverage decisions in section 10.

QA gates:
- all first-week checks rerun.
- no “good” claim without browser evidence.

## 8. First 48 hours exact build lane

This is agent-executable. No Boss babysitting.

Task 1: Repair mission QA contract
- Open `scripts/qa_mission_pilot.py` and `scripts/qa_gold_slice_first_journey.mjs`.
- Update stale intro expectations to match current intended behavior.
- If source should include `?start=listen`, patch `src/app/intro/page.tsx`; otherwise patch QA to accept the current direct mission href.
- Acceptance: both scripts fail only on real product issues, not stale strings.

Task 2: Add first-path browser playthrough
- Click actual CTAs, do not inspect source only.
- Verify final `location.pathname` after every click.
- Verify at least one mission audio play and ended event.
- Acceptance: `/` -> `/intro` -> M1 route is proven in browser.

Task 3: Verify M1/M2 audio inventory
- Extract all audio paths from `src/lib/missions/module1.ts` and `src/lib/missions/module2.ts`.
- Check file exists and size > 10 KB.
- If server is running, check HTTP 200 and audio content type.
- Acceptance: zero silent missing/suspicious primary mission files.

Task 4: Clean only first-path text flagged by browser QA
- Do not redesign containers.
- Remove learner-facing system labels/counters/status text only if visible on first path.
- Acceptance: first screen has one headline, one short context sentence, one CTA, and immediate German/audio action.

Task 5: Standardize M1 -> M2 transition
- Complete or simulate `polite-exit` completion.
- Confirm CTA reaches `/missions/module-2/self-intro`.
- Acceptance: deterministic browser route transition.

Task 6: Standardize M2 -> M3 transition
- Complete or simulate final self-intro completion.
- Confirm next action reaches `/learn/3` or first Module 3 placeholder.
- Acceptance: no dead end after Module 2.

Task 7: Produce evidence checkpoint
- Append to `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`.
- Include commands, exit codes, exact failures, exact next fix.
- Acceptance: no vague “UX improved” report.

Task 8: Only then start Module 3 pilot
- Mission data first.
- First route second.
- Real audio third.
- QA fourth.
- Acceptance: one playable number/time mission, not a broad rewrite.

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

UX

PASS:
- First action within 5 seconds.
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

Mobile

PASS:
- Primary path works on phone viewport.
- Tap targets are large.
- Audio controls visible and usable.
- No mandatory long typing early.

WEAK:
- Some later exam writing is longer but justified.

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
- “Production” means only dragging chips.
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
Should `/intro` be a compact framing screen before the first mission, or should first-time users go directly from `/` into the first audio mission?

Recommendation: keep one compact framing screen, then immediate audio mission. Cold buyers need one sentence of framing.

3. Launch scope
Beta with Modules 1–3 plus review/checkpoints, or wait until all 18 modules are mission-first?

Recommendation: beta can be M1–M3 if clearly labeled. Paid launch needs all 18 modules coherent enough to be self-sufficient.

4. Audio quality bar
Is technically clean generated/prerendered audio acceptable for beta, or does paid launch require native/human accent review?

Recommendation: technical PASS for internal/beta; paid launch needs human review on core mission audio.

5. Canon cleanup scope
Patch all Kuttan-in-Germany A1 violations now, or only primary path first?

Recommendation: primary path first, systematic canon scan before public launch. Do not mass-edit while mission engine is unstable.

## 11. Verification harness

Future agents must judge outputs against Boss’s vision without Boss checking everything. This is the harness.

Harness layers:

1. Source contract checks
- Check exact files changed.
- Check route/source still points to mission-first path.
- Reject source-only claims if the route was not executed.

Required evidence:
- `git status --short`
- files changed list
- source snippets only as support, not proof

PASS:
- Changed files are scoped to the lane.
- No unrelated broad churn.

WEAK:
- Small inherited dirty state exists and is named.

FAIL:
- Broad source churn with no lane boundary.
- Agent cannot explain what changed.

2. Route/browser checks
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

3. Audio checks
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

4. Content sample checks
- Sample changed mission/lesson content for German correctness.
- Check A1 level, grammar, capitalization, articles, word order.
- Check Kerala/Kuttan canon.
- Check Goethe map contribution.
- Check that production output exists.

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

5. UX/cognitive-load checks
- First screen visible text budget: target under 45 visible learner-facing words for mission openings.
- One primary CTA.
- No dashboard/status/meta labels in first path.
- No long typing before audio/speaking confidence.

Required evidence:
- screenshot or DOM text extraction
- visible word count
- primary CTA text
- mobile viewport note

PASS:
- Learner knows what to do in 5 seconds.

WEAK:
- Extra clutter but primary action still clear.

FAIL:
- Text-heavy, dashboard-like, multiple competing CTAs, scrolling before first action.

6. Vision-alignment self-judge block

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
- If QA is stale, fix QA before claiming quality.
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

## Boss summary

Blunt read: Boss’s vision is clear. The app has been drifting because agents kept polishing fragments and trusting their own taste. The reset is not “make the UI nicer.” It is: stabilize the first mission path, repair stale QA, prove M1/M2 with real browser/audio evidence, then build Module 3 as the second reusable mission slice.

Current proof:
- TypeScript passes.
- Key local routes return 200.
- M1/M2 mission structure and real audio assets exist.
- QA is currently stale/failing, so trust is not restored yet.

Best next move: repair `qa_mission_pilot.py` + `qa_gold_slice_first_journey.mjs`, then browser-prove `/` -> `/intro` -> first M1 mission before touching more UI.
