# Adipoli German — Vision-to-SMART Reset Plan

Generated: 2026-05-31T16:21:46+02:00
Workdir: `/shared/german-course`
Loop iteration: 6

This is the execution contract after reading Boss’s course/product docs, recent QC reports, first-path source, mission data, content/audio inventory, git state, and QA scripts.

This is not a new strategy layer. It is the plan future agents must execute and self-verify against before saying the course is good.

Evidence used:
- Vision/product docs: `docs/README.md`, `COURSE_OPERATING_BRIEF_2026-05-19.md`, `PRODUCT_DIRECTION_RESET_2026-05-20.md`, `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`, `AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`, `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`, `COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`, `COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`, `A1_STORY_BIBLE.md`, `COURSE_PLAN_10_10.md`, `GOETHE_A1_EXAM_MAP.md`, `EXERCISE_QUALITY_RULES.md`, `MODULE_BLUEPRINTS.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `SERIES_FULL_SCRIPT.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`, `GAME_AUDIT.md`, `LAUNCH_CHECKLIST.md`.
- QC/run outputs: `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`, earlier `adipoli-vision-smart-plan-*`, recent M1/M2 continuous-loop outputs.
- Source inspected: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, mission routes under `src/app/missions/`, `src/app/missions/module-2/_components/MissionUI.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/lib/content/modules/`, existing QA scripts.
- Browser inspected: local `/` -> `/intro` -> `/missions/module-1/greet-frau-weber` click path. Result: final route `/missions/module-1/greet-frau-weber`, one real `<audio>`, visible custom Listen control, mission text present. Console had only React DevTools/HMR/smooth-scroll dev notices; no JS errors.
- Inventory: 18 module content files, 8 M1/M2 mission routes, 23 mission MP3s, 134 Hören MP3s, 24 video files.
- Git state: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries. Do not commit/push as one blob.
- Checks run this iteration:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all three M1 mission routes, all five M2 mission routes.
  - PASS: browser click path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` — 8 voice-first M1/M2 missions, no legacy builders on reviewed path.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` fails on old intro/start-path snippets.
  - FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` fails on old intro copy/CTA expectations.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` fails on old root-page contract.

## 1. Vision reconstruction

Boss is trying to build a complete paid German A1 web-app course for Malayali adult beginners.

Plain language:
Adipoli German should take a zero-German Malayali learner to a credible Goethe A1 attempt through short, phone-first, Kerala-rooted story missions. The learner follows Kuttan’s Kerala-to-Germany pressure, but the product is not a cartoon, worksheet library, or dashboard. The learner should hear German, understand it, answer aloud, repair one real beginner/Manglish trap, write/type only when useful, and leave each unit with a concrete A1 ability win.

The product should feel:
- made for Malayalis, not generic German learners;
- Goethe-serious, not phrasebook entertainment;
- culturally warm, but adult-safe;
- audio-first and production-first, not text-first;
- self-sufficient enough that Boss does not need to explain the route;
- affordable, but not cheap-feeling.

Core product promise:
German A1 for Malayalis through short story missions: hear it, say it, fix it, use it, and prepare for Goethe.

Hard rule:
If a route can be completed without hearing real German, speaking aloud, writing/typing a useful output, or proving a Goethe-relevant ability, it does not match Boss’s vision.

## 2. Non-negotiables

Malayali/Kerala identity
- A1 physically stays in Kerala.
- Kuttan does not live in Germany during A1. Germany appears as goal, dream, cousin video call, mock exam, future rehearsal, form/document simulation, or takeoff payoff.
- Kerala context must affect the task: Goethe Kochi, family pressure, migration ambition, documentation anxiety, Kerala classroom/cafe/home scenes, Manglish transfer traps.
- Manglish is a bridge for understanding mistakes, not joke garnish.

Goethe A1 seriousness
- Every module must map to a real A1 ability.
- Hören, Lesen, Schreiben, and Sprechen must all be practiced.
- Hören requires real audio.
- Schreiben requires form-filling and short messages, not just typing isolated words.
- Sprechen requires repeated self-intro, spelling, requests, questions, polite answers, and exam-room pressure.
- Games and story are allowed only when they strengthen a survival/exam skill.

Adult-safe tone
- Kuttan can be warm and relatable.
- Kuttan/Appu cannot make the paid product feel like a kids app.
- Appu should stay silent UI flavor unless Boss explicitly changes that.
- Public use of “Kuttan” remains a product identity risk before paid launch.

Real audio
- No browser `SpeechSynthesis` in reviewable German paths.
- Audio must be real files, served over HTTP, with browser playback proof.
- Audio UI must show duration/progress or equivalent playback state.
- Learner turn unlocks after required audio ends, not after a fake “heard” click.
- Technical playback is not accent-quality proof. Native/accent taste needs human review before paid launch.

Production-first learning
- Recognition supports production; it is not completion.
- A mission needs output: say aloud, type/write a short answer, fill a form, spell a name, repair a mistake, answer a Goethe-style prompt.
- Builders, chip counters, undo/clear, and long mobile typing are not beginner hero interactions. Use them only as scaffolding/remediation.
- Short correct A1 German beats clever/fancy German.

Self-sufficient launch-ready course
- Every major screen has one obvious next action.
- No dashboard walls in the first path.
- No dead links, broken audio, hidden nav/search collisions, stale QA, or fake progress claims.
- If Boss has to explain why a screen matters, the screen fails.

## 3. Current mismatch diagnosis

Blunt diagnosis: the vision is clearer than the app’s proof layer.

Aligned now:
- M1/M2 have real mission routes rather than only old lesson pages.
- M1/M2 reviewed mission paths are voice-first and no longer builder-first.
- Module 2 has five playable mission cards: name, spelling, origin, job/languages, final self-intro.
- M1 has three playable first-contact missions.
- Mission audio files exist; M1/M2 mobile QA proves audio-first gating on reviewed routes.
- `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, M1 routes, and M2 routes return local 200.
- TypeScript passes.

Violations / trust problems:
1. QA disagrees with current source.
`qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, and `qa_intro_start_path.mjs` still encode older first-path expectations. Some failures are stale, but stale QA is still a product failure because agents cannot honestly call the path reviewable while the proof layer contradicts source.

2. The app still carries dashboard/library DNA.
Old lesson maps, games, scripts, practice pages, tests, vocabulary pages, and classic player routes exist. Some are useful infrastructure. They must not be the first mental model. The first mental model must be mission → ability win.

3. The first-path contract is not locked.
Current root `/` is concise professional course framing, `/intro` is a compact first-German-moment screen, then the first M1 mission. That is a reasonable product contract. But QA scripts still test other contracts, so future agents will keep arguing with the product.

4. Mission coherence is currently strongest in M1/M2 only.
Modules 3–18 still need mission mapping and proof. Do not claim the whole course is fixed because the first two modules are better.

5. Real audio is inconsistent outside reviewed paths.
Mission audio and Hören assets exist. Legacy practice pages still contain TTS/SpeechSynthesis patterns. Those must not sit in the paid primary path.

6. Games are not yet consequences.
A 19-game wall is not engagement. Games should appear after a mission creates need: Number Blitz after a number mission, Time Attack after a time mission, Dialogue Dash after a conversation mission.

7. Dirty git state blocks trust.
262 dirty/untracked entries means no mass commit/push. Future work must be lane-scoped with exact file lists.

8. Prior work drifted into incremental polish.
Boss is losing faith because agents polished fragments and over-claimed. The reset is: lock the vision/QA contract, prove a full first path, then generalize module by module.

## 4. Product model

The course unit is a mission.

A mission is one short ability-building scene.

Required mission loop:
1. Hook: why this matters now.
2. Scene: Kerala/Goethe/future-rehearsal situation with visible roles.
3. Audio: learner hears one real German line.
4. Meaning check: learner catches what was said.
5. Production: learner answers aloud before heavy typing.
6. Tiny writing/proof: only if exam-relevant and short.
7. Repair: one predictable beginner/Manglish/A1 trap.
8. Win: “You can now ___.”
9. Pull: next specific pressure.

Learner loop:
Hear -> understand -> answer aloud -> repair -> tiny write/proof -> win -> next.

Module loop:
- Each module becomes 3–6 missions around one ability cluster.
- Each module ends with an ability checkpoint and a clear next pull.
- Module 16 is optional/A1+ bridge; do not let it block exam-focused learners.
- Modules 17–18 become Goethe proof, not decorative finales.

Review/checkpoint loop:
- SRS resurfaces phrases inside scenes, not only dead flashcards.
- Hören review uses audio replay/dictation.
- Schreiben review uses form fields and short messages.
- Sprechen review uses self-intro, spelling, questions, requests.
- Checkpoints return PASS/WEAK/FAIL and send the learner to a remediation mission.

## 5. Student-interest plan

A learner continues if the app creates real wins fast and makes the journey feel personal.

1. First-minute spoken win
The student should hear and say useful German quickly. Not read theory. Not browse modules. Say something.

2. Story pressure
Kuttan matters when he creates stakes: first class embarrassment, family doubt, Goethe Kochi, documentation pressure, cousin in Germany, exam anxiety, airport departure.

3. Cultural fit
The course should feel like it knows the learner: Kerala classrooms, Malayalam/English transfer, family pressure, migration ambition, budget/value pressure.

4. Confidence through repair
The strongest learning moment is: “I almost said it wrong, I fixed it, now I can say it.” Build missions around that.

5. Exam proof without panic
Every mission quietly maps to Goethe A1: self-intro, spelling, numbers, time, forms, notices, short messages, requests, listening prompts.

6. Low-friction phone UX
The next action must be obvious: listen, say, tap meaning, repair, continue. Long typing and chip manipulation kill early beginner momentum.

7. Real next pull
End missions with specific pressure:
- “Now spell your name.”
- “Now catch the phone number.”
- “Now fill the form.”
- “Now answer Frau Weber without freezing.”
Not: “Continue learning.” That is dead copy.

## 6. SMART roadmap

Phase 1 — Stabilize first-path trust
Timebox: 2 days.

Specific outcome:
A clean, reviewable first learner path where source, QA, browser behavior, and product intent agree.

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

Acceptance criteria:
- First-path contract is written in QA comments.
- Recommended contract: `/` = compact professional course framing -> `/intro` = compact first moment -> first M1 audio mission.
- Local 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
- Browser playthrough clicks real CTAs and verifies path changes.
- First mission audio serves and plays in browser.
- Reviewed path has no browser SpeechSynthesis.
- Start-path QA scripts pass because they test the chosen contract, not stale strings.

What NOT to do:
- Do not redesign the whole app.
- Do not add more strategy docs.
- Do not polish containers while QA is stale.
- Do not commit/push the dirty tree.

Phase 2 — Convert Module 3 into the second proof module
Timebox: 3 days after Phase 1 passes.

Specific outcome:
Module 3 becomes a complete mission sequence for numbers/time, proving the model beyond greetings/self-intro.

Files/routes affected:
- `src/lib/missions/module3.ts`
- `src/app/missions/module-3/*` or one generic mission route if engine extraction happens first
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/learn/page.tsx`
- `public/audio/missions/module-3/` or reused `public/audio/hoeren/module-03/`
- QA scripts expanded to Module 3.

Acceptance criteria:
- 4–5 missions: numbers 0–20, price, phone number, time, appointment.
- Each mission has real audio, answer aloud, one repair, and tiny typed/written proof where useful.
- One checkpoint makes the learner catch a phone number/time from audio.
- No required long typing in the first two Module 3 missions.
- Mobile viewport QA passes.

What NOT to do:
- Do not make Number Blitz the module.
- Do not create another isolated beautiful page.
- Do not generate paid media.

Phase 3 — Roll mission spine through Modules 4–12
Timebox: 10 working days.

Specific outcome:
Daily-life A1 modules become mission-led enough to feel like one coherent course.

Files/routes affected:
- `src/lib/missions/module4.ts` through `module12.ts` or shared mission config
- `src/app/missions/module-[4-12]/*` if route-per-module continues
- `src/lib/content/modules/module-04.ts` through `module-12.ts`
- `/learn/[moduleId]` mission landing logic

Acceptance criteria:
- Each module has 3–5 mission cards with one named ability win.
- Existing content is reused where possible.
- Games appear as post-mission practice, not a catalog wall.
- Each module includes speaking and writing/free-text/form output.
- Kerala/Kuttan canon scan passes.

What NOT to do:
- Do not rewrite every lesson line-by-line.
- Do not move Kuttan physically to Germany before A1 climax.
- Do not mass-add exercises just to inflate counts.

Phase 4 — Exam modules and checkpoints
Timebox: 5 working days.

Specific outcome:
Modules 17–18 become honest Goethe A1 proof.

Files/routes affected:
- `src/lib/content/modules/module-17.ts`
- `src/lib/content/modules/module-18.ts`
- `src/app/tests/*`
- `src/app/practice/review/page.tsx`
- `src/app/practice/write/page.tsx`
- `public/audio/hoeren/module-17`, `module-18`

Acceptance criteria:
- Hören Teil 1/2/3 practice uses real audio.
- Schreiben has form-filling and short-message production.
- Sprechen has self-intro, spelling, question, and request practice.
- Mini mock returns PASS/WEAK/FAIL and routes remediation.
- Goethe map gaps are closed or explicitly marked WEAK.

What NOT to do:
- Do not claim exam readiness from coverage counts alone.
- Do not hide failure behind dashboard percentages.

Phase 5 — Launch hardening
Timebox: 5 working days.

Specific outcome:
The course is safe for sister/friends to try without embarrassment.

Files/routes affected:
- primary path route QA
- asset verification scripts
- mobile browser QA scripts
- navigation/global search focused-mode logic
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
- Do not deploy/push without Boss approval.
- Do not configure pricing/payment during this reset.
- Do not ask Boss to review a link before evidence exists.

Phase 6 — Marketing alignment after product proof
Timebox: after Phases 1–5 pass.

Specific outcome:
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
- Choose and encode the first-path contract.
- Recommended: `/` concise course framing -> `/intro` first moment -> `/missions/module-1/greet-frau-weber` audio scene.
- Patch `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, and `scripts/qa_intro_start_path.mjs` so they test the chosen contract.
- Add one QA comment explaining the contract.

QA gates:
- `npx tsc --noEmit --pretty false --incremental false`
- `python3 scripts/qa_mission_pilot.py`
- `node scripts/qa_gold_slice_first_journey.mjs`
- `node scripts/qa_intro_start_path.mjs`
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`
- local route 200 checks.

Day 2 — Make M1/M2 reviewable as one path
Deliverables:
- Browser-verify all M1/M2 mission routes.
- Verify audio-ended gating on one M1 route and one M2 route.
- Confirm M1 completion pulls to M2.
- Confirm M2 completion pulls to Module 3/learn-3 without dead end.
- Produce a review URL only after proof passes.

QA gates:
- Browser console clean on review path, except named harmless dev warnings.
- Audio readyState/duration/progress proof.
- No nav/search overlay on focused path.
- No stale QA failure.

Day 3 — Module 3 mission config and first two missions
Deliverables:
- Create `src/lib/missions/module3.ts`.
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
- game practice maps to the just-earned skill.

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

This is agent-executable without asking Boss.

Task 1: Lock first-path contract
- Read `src/app/page.tsx`, `src/app/intro/page.tsx`, and the three start-path QA scripts.
- Use recommended contract unless Boss overrides: `/` -> `/intro` -> first M1 audio mission.
- Acceptance: contract is written in QA comments and all tests enforce it.

Task 2: Repair stale QA scripts
- Patch only:
  - `scripts/qa_mission_pilot.py`
  - `scripts/qa_gold_slice_first_journey.mjs`
  - `scripts/qa_intro_start_path.mjs`
- Do not change product copy unless browser QA proves the current screen is too vague/text-heavy.
- Acceptance: scripts fail only on real product issues, not outdated strings.

Task 3: Browser-prove first path
- Run local server if needed.
- Click actual CTAs.
- Verify final `location.pathname` after every click.
- Verify at least one mission audio play and ended/unlock behavior.
- Acceptance: `/` -> `/intro` -> M1 route is proven in browser.

Task 4: Verify M1/M2 audio inventory
- Extract all audio paths from `src/lib/missions/module1.ts` and `src/lib/missions/module2.ts`.
- Check file exists and size > 10 KB.
- Check HTTP 200 and audio content type.
- Acceptance: zero missing/suspicious primary mission audio files.

Task 5: Keep first-path text lean
- Do not redesign containers.
- Remove visible system labels/counters/status text only if they crowd the learner.
- Acceptance: first mission has one spoken scene, one audio action, one repair/speaking action, no dashboard labels.

Task 6: Standardize M1 -> M2 transition
- Complete/simulate `polite-exit` completion.
- Confirm CTA reaches `/missions/module-2/self-intro?start=listen`.
- Acceptance: deterministic browser route transition.

Task 7: Standardize M2 -> M3 transition
- Complete/simulate `final-self-intro` completion.
- Confirm next action reaches `/learn/3` or first Module 3 placeholder.
- Acceptance: no dead end after Module 2.

Task 8: Evidence checkpoint
- Append to `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`.
- Include commands, exit codes, exact failures, exact next fix.
- Acceptance: no vague “UX improved” report.

Only after these pass: start Module 3 pilot.

## 9. Definition of launch-ready

Use PASS/WEAK/FAIL. No “pretty good.”

Content
PASS:
- All 18 modules have a clear ability win.
- Primary missions are A1-safe and story-tied.
- No obvious grammar/article/case/word-order teaching bugs.
- No Kuttan-in-Germany A1 canon breaks.

WEAK:
- Some old lesson content remains behind optional routes but does not block primary flow.

FAIL:
- Wrong German.
- Kuttan physically in Germany during A1 named scenes.
- Generic worksheet content appears in primary path.

Audio
PASS:
- Reviewable German uses real audio files.
- Primary audio returns HTTP 200 and plays in browser.
- UI shows duration/progress.
- Learner turn unlocks after audio completion where required.

WEAK:
- Legacy non-primary practice pages still use browser TTS but are clearly marked for replacement.
- Audio technically works but accent/taste still needs human review.

FAIL:
- Browser SpeechSynthesis in reviewed path.
- Missing/silent MP3.
- Audio button cannot prove playback.
- Learner can continue before required audio finishes.

UX
PASS:
- First useful action is obvious within 5 seconds after framing.
- One obvious CTA per screen.
- No dashboard clutter in first path.
- No fixed-nav/search overlay interference.
- Mission advances in place unless a new scene requires a route.

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
- Audio controls are visible and usable.
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
- Inherited issues outside changed lane exist and are named.

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
Should root `/` stay compact professional framing -> `/intro` -> mission, or should first-time users go directly from `/` into first audio mission?

Recommendation: keep root framing. Cold buyers need one sentence of trust before action. But lock it in QA.

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

Future agents must judge outputs against Boss’s vision without Boss checking everything.

Layer 1: Source contract checks
Required evidence:
- `git status --short`
- exact changed files list
- source/QA contract note

PASS:
- Changed files are scoped to the lane.
- Source and QA agree.

WEAK:
- Inherited dirty state exists and is named.

FAIL:
- Broad churn with no lane boundary.
- QA tests stale expectations and agent ignores it.

Layer 2: Route/browser checks
Required evidence:
- route list with HTTP status
- click path with final pathname
- browser console summary
- mobile viewport check for primary path

PASS:
- Route loads, click works, no relevant console/hydration errors.

WEAK:
- Non-blocking inherited console noise exists and is named.

FAIL:
- Dead route, inert CTA, hidden/intercepted CTA, hydration overlay, or unverified Tailscale link.

Layer 3: Audio checks
Required evidence:
- file path
- file size
- HTTP status/content type
- browser readyState/duration/currentTime/error
- proof that turn unlocks after audio end where required

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

Layer 6: Self-judge block required in every serious output
Every build output report must include:
- Output judged: route/file/lesson/mission.
- Vision source checked: doc paths.
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
- Do not treat HTTP 200 as interaction PASS.
- Do not treat audio file existence as playback PASS.
- Do not send Boss a review URL until the exact review path is browser-tested.
- If QA is stale, fix QA or label the lane FAIL. Do not claim quality over failing gates.
- If evidence is missing, label WEAK/FAIL.

## 12. Vision-alignment scorecard

Use this on every changed route, mission, lesson, game, audio flow, or report.

A. Learner value
PASS: learner gets one clear usable ability.
WEAK: useful information but vague ability.
FAIL: content exists but learner cannot do anything new.

B. Malayali/Kerala identity
PASS: Kerala/Malayali context is part of task, scene, mistake, or motivation.
WEAK: cultural tie is surface copy.
FAIL: could be any German app, or Kuttan is physically in Germany during A1.

C. Goethe A1 proof
PASS: maps to Goethe A1 skill/task and uses short correct German.
WEAK: useful beginner German but exam link is indirect.
FAIL: exam claim without practice proof, or out-of-scope German.

D. Adult-safe tone
PASS: warm, grounded, serious enough for adults.
WEAK: slightly cute but not damaging.
FAIL: childish mascot energy dominates.

E. Audio/speaking/writing production
PASS: learner hears real German, answers aloud, writes/types tiny useful output where needed, and repairs one mistake.
WEAK: production exists but one mode is thin.
FAIL: recognition-only, no real audio, or chip dragging treated as production.

F. Engagement
PASS: story pressure, quick win, repair moment, next pull.
WEAK: useful but emotionally flat.
FAIL: boring worksheet/dashboard flow or games without learning reason.

G. Low cognitive load
PASS: one action, low text, no clutter, no early long typing.
WEAK: usable but has extra labels/copy.
FAIL: text-heavy, page-heavy, confusing, dashboard-like, or click-heavy.

H. Premium trust
PASS: audio controls work, mobile route stable, no relevant console errors, QA evidence exists.
WEAK: minor inherited roughness named.
FAIL: broken link/audio/CTA, stale QA ignored, review friction left for Boss.

I. Launch-readiness
PASS: content, audio, UX, mobile, pedagogy, exam mapping, and trust gates pass for scoped lane.
WEAK: lane is usable for beta but known gaps are named.
FAIL: needs Boss explanation, is not self-sufficient, or is not verified.

Minimum score to call an output “done”:
- No FAIL in any category.
- At most two WEAK categories, both named with next fixes.
- Audio and CTA cannot be WEAK/unknown on a reviewable route. They must PASS.
- Source/QA contract cannot be WEAK/unknown. If QA is stale, the lane is not reviewable.

## Iteration 6 verification addendum

This iteration did not change source code. It strengthened the plan with live proof.

Confirmed:
- Current branch: `adipoli-page-by-page-reset-20260523-1802`.
- Current commit: `b201d05`.
- Dirty/untracked scale: 262 entries.
- TypeScript: PASS.
- Local route 200: `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all three M1 mission routes, all five M2 mission routes.
- Browser path: clicked `/` CTA to `/intro`, clicked intro CTA to `/missions/module-1/greet-frau-weber`.
- Mission route has one real `<audio>` element and visible custom `Listen` button.
- Browser console: no JS errors; only normal dev/HMR/smooth-scroll notices.
- M1/M2 immersive mobile QA: PASS for 8 voice-first missions.

Still failing:
- `python3 scripts/qa_mission_pilot.py` fails on stale intro/start-path snippets.
- `node scripts/qa_gold_slice_first_journey.mjs` fails on stale intro copy/CTA expectations.
- `node scripts/qa_intro_start_path.mjs` fails on stale root-page contract.

Decision: the plan remains the same. First build lane must repair stale start-path QA before Module 3 work. Starting Module 3 while QA contradicts the product would repeat the same trust failure.

## Boss summary

Blunt read: Boss’s vision is clear. Adipoli should be a Kerala-rooted, Goethe-serious, phone-first mission course where learners hear German, answer aloud, repair one mistake, write only when useful, and leave with real A1 ability wins.

Current state:
- M1/M2 mission direction is real.
- M1/M2 reviewed routes are voice-first, not builder-first.
- TypeScript passes.
- Primary local routes return 200.
- M1/M2 immersive mobile QA passes locally.
- Trust is still not restored because three start-path QA scripts are stale/failing against current `/` and `/intro` behavior.

Best next move: repair the first-path QA/source contract, then browser-prove `/` -> `/intro` -> first M1 audio mission again before building Module 3.
