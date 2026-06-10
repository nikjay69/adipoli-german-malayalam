# Adipoli German — Vision-to-SMART execution plan

Generated: 2026-05-31 16:41 Europe/Berlin
Workdir: `/shared/german-course`
Purpose: reset from incremental UI tweaks to a feasible, executable product plan that matches Boss's actual course vision.

This is not a vibes document. It is the execution contract for future agents.

## Evidence base used

Read/synthesized vision and product docs:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
- `docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`
- `docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`
- `docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`
- `docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`
- `docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md`
- `docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md`
- `docs/A1_STORY_BIBLE.md`
- `docs/COURSE_PLAN_10_10.md`
- `docs/GOETHE_A1_EXAM_MAP.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `docs/MODULE_BLUEPRINTS.md`
- `docs/SCRIPT_ARCHITECTURE.md`
- `docs/SERIES_ARC_PLAN.md`
- `docs/SERIES_FULL_SCRIPT.md`
- `docs/M1_AUDIT_REPORT.md`
- `docs/M2_M3_SETTING_AUDIT.md`
- `docs/GAME_AUDIT.md`
- `docs/LAUNCH_CHECKLIST.md`

Inspected source/product structure:
- Routes: `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, mission routes under `src/app/missions/`.
- Mission source: `src/lib/missions/`, `src/app/missions/module-2/_components/MissionUI.tsx`.
- Content source: `src/lib/content/modules/`, module scripts under `scripts/output/`.
- Media structure: `public/audio/missions/`, `public/audio/hoeren/`, `public/audio/tts/`, `public/videos/`, `pilot/`.
- QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_module2_production_mobile.mjs`, `scripts/qa_completed_ability_landings.mjs`, lesson/game/nav audits.

Current verification snapshot from loop:
- PASS: `npx tsc --noEmit --pretty false --incremental false`.
- PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all current M1/M2 mission routes.
- PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
- FAIL/stale: `python3 scripts/qa_mission_pilot.py` still expects old intro/start-path snippets and old `?start=listen` contract.
- Git risk: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, about 262 dirty/untracked entries. Do not commit/push without scoping.

## 1. Vision reconstruction

Boss is trying to build a self-sufficient, launch-ready German A1 course for Malayali learners who want a practical path from Kerala to Germany.

Plain-language vision:

Adipoli German should feel like a serious but friendly course where a Malayali adult joins Kuttan's Kerala-to-Germany journey, hears useful German early, speaks out loud, writes simple exam-relevant phrases, repairs common Malayali/Manglish mistakes, and steadily gains proof that Goethe A1 is becoming possible.

It is not:
- a generic A1 textbook in web-app clothing;
- a dashboard of lessons, games, scripts, and practice modes;
- a mascot/story entertainment app with weak exam output;
- a UI polish project;
- a pile of MD plans that never become a playable course.

The intended product promise:

"If you are a Malayali beginner, this app gives you a clear daily path to Goethe A1: listen, speak, write, repair mistakes, and follow a culturally familiar story from Kerala to takeoff. You always know what to do next. You always produce German, not just read about German."

The emotional product spine:
- Kuttan sees Germany as possible.
- He starts in Kerala, not Germany.
- He struggles like a real learner.
- He gets tiny wins that feel believable.
- He passes Goethe A1.
- He leaves Kerala prepared, not magically fluent.

The pedagogical spine:
- Goethe A1 seriousness is the hard backbone.
- Malayali/Kerala identity is the differentiation.
- Real audio and production practice are the learning engine.
- Mission flow is the product unit.
- The app must guide the learner without Boss explaining anything manually.

## 2. Non-negotiables

Preserve these even when simplifying.

Malayali/Kerala identity:
- A1 happens in Kerala until the departure/takeoff moment.
- Kerala scenes are real and specific: home, veranda, Kochi/Thrissur, Goethe Kochi, family, classmates, cafés, exam centre, airport.
- Manglish bridge is allowed and valuable, but it must be adult-safe and not cringe.
- Cultural specificity must reduce learner friction, not become decoration.

Goethe A1 seriousness:
- Every module must map to real A1 ability: Hören, Lesen, Schreiben, Sprechen.
- The course must prepare for exam-like outputs: self-introduction, spelling, numbers, dates, appointments, forms, short messages, listening to simple announcements/dialogues.
- Entertainment that does not improve a Goethe skill is secondary.

Adult-safe tone:
- Kuttan may remain warm and familiar, but the public product cannot feel childish.
- Avoid babyish labels, mascot overload, dopamine confetti, cute internal status labels, or classroom-toy UI.
- If public naming feels childish, use an adult-safe public name such as Arun/Kiran and keep Kuttan as nickname/family flavor only after Boss approves.

Real audio:
- No browser `SpeechSynthesis` for reviewable German audio.
- Mission audio must be real pre-rendered German audio files.
- Technical playback proof is required: HTTP 200, duration/metadata, play/start/end state, no browser console errors.
- Accent quality still needs human review before paid launch; technical playback is not accent proof.

Production-first learning:
- Learner must speak and write, not just tap recognition cards.
- Every lesson/mission should include: listen, say aloud, one recognition/repair action, one small writing/free-text proof when useful.
- Sentence builders and games are scaffolds/remediation, not the hero experience.

Self-sufficient launch-ready course:
- The app must tell the learner what to do today, what they just achieved, and what comes next.
- No route should dump learners into a wall of options.
- No feature should require Boss to explain it manually.
- A beta learner should be able to complete the first path independently on mobile.

Low cognitive load:
- One main action per screen.
- Minimal learner-facing text.
- No dashboard clutter on focused first-session routes.
- First useful German action should happen within 5 seconds after the course framing screen, or within one obvious CTA from `/`.

Premium trust:
- Cheap pricing is okay. Cheap feeling is not.
- Audio, layout, mobile, progress, and next-step reliability matter more than decorative animation.
- Never ask Boss to review a path unless the route was actually browser-tested.

## 3. Current mismatch diagnosis

The app is directionally closer than earlier loops, but still violates Boss's vision in important ways.

Main mismatches:

1. Old dashboard DNA still competes with mission DNA.
- `/learn`, games, practice, scripts, plan, module pages, and old lesson routes still exist as broad surfaces.
- Some screens behave like catalogues instead of a guided course.
- Learners can still feel they are choosing from a product dashboard rather than being pulled through a learning journey.

2. QA contract is stale.
- `qa_mission_pilot.py` still expects older intro/path constants.
- Some older playthrough scripts expect old copy/CTA text.
- This damages trust because agents can claim the product is good while the proof harness is out of sync with the actual intended path.

3. Text-heavy/page-heavy risk remains.
- Boss repeatedly flagged too much text, too many pages, too much system/status language.
- Earlier agent work often replaced one cluttered page with another polished-but-still-cluttered page.
- The correct fix is not more container polish; it is a simpler course unit and fewer decisions.

4. Product coherence is partial.
- M1/M2 mission routes show the right direction: voice-first, audio-backed, production-oriented.
- But this model is not yet generalized across modules.
- M3+ still mostly lives in old content/module structures rather than a clean mission course loop.

5. Interactions can still be click-heavy.
- Chip builders, counters, undo/clear controls, mandatory typing, and multi-screen microsteps can feel like chores.
- Boss's preferred direction is immersive: hear a line in context, answer aloud, repair one mistake, write a tiny proof, move on.

6. Some content canon gaps remain.
- `M2_M3_SETTING_AUDIT.md` shows Module 2 and 3 had Germany-setting drift. Some rewrites were done, but several were deferred.
- A1 must stay Kerala-first until takeoff. Germany can appear as dream, goal, video call, mock test, or future rehearsal.

7. Games are not yet integrated as learning architecture.
- `GAME_AUDIT.md` and product docs imply games/practice should support skills, not appear as a random arcade wall.
- Speed/frantic games are not ideal for first beginner flow.
- Games should be unlocked/remediation moments tied to missions.

8. Media is present but not fully productized.
- There are mission audio files, Hören files, TTS outputs, videos, and pilot material.
- But launch readiness requires mapping media to missions/modules and proving playback in the actual learner flow.

9. Review/Tailscale friction harmed confidence.
- Past review links were sent before exact path/audio/interaction proof.
- Future review must include exact URL only after browser click-through and audio proof.

10. Git state is too dirty for confident shipping.
- The working tree contains widespread modified/deleted/untracked files.
- Future agents must not commit or push broad mixed churn.
- First action is scoping and proof, not deployment.

## 4. Product model

The product unit is not a lesson page. The product unit is a mission.

Course unit: mission

A mission is one contained learner win:
- Situation: a Kerala/Germany-journey scene with stakes.
- German input: one useful spoken German line or mini-dialogue.
- Understanding: one simple recognition/comprehension action.
- Production: learner says something aloud.
- Repair: learner notices/fixes one likely mistake.
- Writing proof: learner types a small exam-relevant output only when useful.
- Win: app states the ability gained in plain language.
- Pull: next mission is obvious.

Learner loop inside a mission:
1. Hear German in context.
2. Understand the meaning without a grammar lecture.
3. Answer aloud.
4. Repair one common trap.
5. Write or choose one tiny proof.
6. Get feedback.
7. Leave with a named ability.

Module loop:
1. Module promise: what the learner can do by the end.
2. 3–6 missions, each with one ability win.
3. One review/remediation mission for weak spots.
4. One checkpoint mapped to Goethe A1 skill.
5. Next-module teaser.

Review/checkpoint loop:
- Daily review pulls weak audio, speaking, vocab, and writing items from completed missions.
- Checkpoints are exam-shaped, not random quizzes.
- If learner fails, app sends them to one repair mission, not a dashboard.
- Progress means "I can do X" rather than "I completed Y screens".

Whole-course loop:
- Module 1: first German moment; greet, respond, survive first class.
- Module 2: self-introduction; name, origin, profession, languages.
- Module 3: numbers/time/dates; prices, appointments, birthdays, schedules.
- Middle modules: everyday A1 survival, forms, shopping, family, directions, needs.
- Final modules: Goethe A1 exam tasks, full self-intro, listening, writing, speaking simulation, departure.

Navigation model:
- `/` = compact professional course promise + one CTA.
- `/intro` = first guided setup/action bridge, not a text wall.
- First mission = immediate audio-backed German action.
- `/learn` = today's next mission, not a module catalogue by default.
- `/learn/1`, `/learn/2`, etc. = mission sequence for that module, not old lesson browsing.
- Games/practice = contextual support/remediation, not first-path distractions.

## 5. Student-interest plan

Why a learner would continue:

Story stakes:
- The learner is not memorizing abstract German. They are helping a familiar Malayali adult move from first curiosity to Goethe A1 and takeoff.
- Kuttan's struggle normalizes the learner's struggle.
- Kerala scenes make German feel reachable instead of foreign and intimidating.

Quick wins:
- First session: hear and speak a real greeting.
- First 10 minutes: say who you are.
- First module: survive first German class interaction.
- Module 2: give a basic self-introduction.
- Module 3: handle numbers/time/dates in practical Kerala scenes.

Confidence:
- Every mission ends with a named ability: "You can greet Frau Weber", "You can spell your name", "You can say where you are from".
- The app should show progress as usable sentences and exam skills, not XP-only gamification.

Retention:
- Each mission ends with a small cliffhanger: next class, family moment, mock exam, appointment, airport step.
- Review is framed as keeping Kuttan ready for Goethe/takeoff, not punishment.
- Daily plan should be tiny and concrete: one mission + one review set.

Exam proof:
- Each module names its Goethe skill connection.
- Checkpoints resemble real A1 tasks.
- Learner sees that fun/story is feeding exam readiness.

Cultural fit:
- Manglish/Malayali examples help learners understand traps quickly.
- Kerala scenes create emotional familiarity.
- Adult-safe naming/tone avoids the product feeling like a children's app.

Premium trust:
- Real audio works.
- Mobile flow is clean.
- The next action is obvious.
- The course does not feel like AI-generated clutter.

## 6. SMART roadmap

Phase 1 — Freeze the product contract and repair proof

Timebox: Days 1–2.

Outcome:
- One canonical first learner path is documented and enforced:
  `/` -> `/intro` -> first M1 audio mission -> win -> next mission/module path.
- QA scripts match this contract.

Files/routes affected:
- `scripts/qa_mission_pilot.py`
- `scripts/qa_gold_slice_first_journey.mjs`
- `scripts/qa_intro_start_path.mjs`
- `src/app/page.tsx`
- `src/app/intro/page.tsx`
- `src/app/learn/page.tsx`
- `src/app/missions/module-1/*`
- `src/lib/missions/module1.ts`

Acceptance criteria:
- `npx tsc --noEmit --pretty false --incremental false` passes.
- QA passes for exact first path.
- Browser playthrough proves CTA navigation, audio playback, state transitions, and no console errors.
- Screenshot evidence shows no text wall/dashboard on first path.
- A self-judge block labels the path PASS/WEAK/FAIL against the scorecard.

Do NOT:
- Redesign all pages.
- Add new onboarding steps.
- Add decorative animation.
- Send review link before path proof passes.

Phase 2 — Turn M1 and M2 into the reusable mission standard

Timebox: Days 3–7.

Outcome:
- M1 and M2 become the gold standard for the rest of the course: real audio, voice-first flow, repair moment, tiny writing proof, ability landing.
- Module landing pages show mission sequence, not lesson-list/dashboard clutter.

Files/routes affected:
- `src/lib/missions/module1.ts`
- `src/lib/missions/module2.ts`
- `src/app/missions/module-1/*`
- `src/app/missions/module-2/*`
- `src/app/missions/module-2/_components/MissionUI.tsx`
- `src/app/learn/[moduleId]/page.tsx`
- `public/audio/missions/`
- QA scripts above.

Acceptance criteria:
- All M1/M2 mission routes load locally.
- Audio has HTTP 200, duration, start/end state, and UI progress.
- Learner can complete at least one full M1 and one full M2 mission on mobile viewport.
- Mission completion lands on a clear ability win and next action.
- No visible internal labels like `GREETING SET`, `SAFE DEFAULTS`, `Heard`, noisy counters, or system status language.

Do NOT:
- Make builders the hero experience.
- Add more mission pages if existing ones are not playable.
- Claim audio quality beyond technical playback unless human-reviewed.

Phase 3 — Extend the mission engine to Module 3

Timebox: Week 2.

Outcome:
- Module 3 numbers/time/dates becomes the first non-M1/M2 proof that the model generalizes.
- Germany-setting drift from the audit is fixed in the mission layer: Kerala supermarket, bakery, metro, calendar, birthday, appointment/mock call.

Files/routes affected:
- `src/lib/content/modules/module-03.ts`
- new or existing `src/lib/missions/module3.ts`
- new routes under `src/app/missions/module-3/*`
- `src/app/learn/3` or module landing equivalent
- `public/audio/missions/module-3/`
- `docs/M2_M3_SETTING_AUDIT.md` as source-of-truth reference, not user-facing copy.

Acceptance criteria:
- 3 playable Module 3 missions: numbers/prices, time/appointment, birthday/date.
- Each mission includes audio input, spoken response, one repair, one tiny written proof.
- All scenes stay in Kerala or explicit mock/future context.
- One checkpoint checks numbers/time/dates in Goethe-like format.

Do NOT:
- Dump grammar explanations.
- Build generic number games detached from mission stakes.
- Move Kuttan physically to Germany in A1 scenes.

Phase 4 — Convert remaining modules module-by-module

Timebox: Weeks 3–6.

Outcome:
- Each module gets a mission sequence, checkpoint, and remediation loop.
- Old lesson pages remain as support/reference only, not the primary course path.

Files/routes affected:
- `src/lib/content/modules/module-04.ts` through `module-18.ts`
- mission data under `src/lib/missions/`
- mission routes under `src/app/missions/`
- module landings under `src/app/learn/[moduleId]/page.tsx`
- `scripts/output/module-XX.script.md`
- audio/media folders.

Acceptance criteria per module:
- Module scorecard completed with evidence.
- 3–6 missions or explicit reason for fewer.
- Speaking, writing/free-text, listening/dictation coverage.
- Goethe skill map updated/checked.
- Browser smoke test passes for module landing and at least one mission.
- No canon drift.

Do NOT:
- Mass-edit all modules blindly.
- Add generic exercises to raise counts without story/Goethe purpose.
- Hide failures under "mostly done".

Phase 5 — Productize review, checkpoints, and learner plan

Timebox: Weeks 5–7, overlapping after M1–M3 are stable.

Outcome:
- Learners get a daily plan: next mission + review + checkpoint when due.
- Review pulls weak skills from completed missions.
- Checkpoints resemble Goethe A1 tasks.

Files/routes affected:
- `src/app/learn/page.tsx`
- `src/app/plan/page.tsx`
- `src/app/practice/review/page.tsx`
- `src/app/tests/*`
- `src/lib/study-plan.ts`
- mission completion state utilities.

Acceptance criteria:
- Returning learner sees one next action, not a dashboard.
- Review route explains what is being practiced and why.
- At least M1–M3 checkpoints exist and remediate failures.
- Mobile flow works without hidden buttons/overlays.

Do NOT:
- Build a complex productivity system.
- Add XP/streak noise before learning value is proven.
- Make practice a feature catalogue.

Phase 6 — Launch readiness and beta trust pass

Timebox: Weeks 7–8.

Outcome:
- Course is ready for a small beta with clear known limits.
- Launch checklist is evidence-backed.

Files/routes affected:
- `docs/LAUNCH_CHECKLIST.md`
- `src/app/page.tsx`, pricing/landing routes
- core learner routes
- QA scripts
- module scorecards/reports under `GermanCourse_QC/`.

Acceptance criteria:
- Build passes.
- First path and M1–M3 pass browser/mobile/audio QA.
- Known WEAK/FAIL items are listed honestly.
- Beta test script exists: what learners do, what feedback to collect, how to judge success.
- Boss gets one review URL and 2–3 focused questions, not broad babysitting.

Do NOT:
- Deploy/push from dirty mixed tree.
- Claim launch-ready while audio, mobile, or checkpoint proof is missing.
- Create new strategy docs instead of closing gates.

## 7. First 7 days execution plan

Day 1 — Proof contract repair

Deliverables:
- Patch `scripts/qa_mission_pilot.py` to current chosen first path.
- Patch or update `scripts/qa_gold_slice_first_journey.mjs` if it is still useful; otherwise mark it superseded in comments/report and route the canonical proof through `qa_mission_pilot.py`.
- Browser-run first path locally.
- Write checkpoint: `GermanCourse_QC/day-1-first-path-proof.md`.

QA gates:
- TypeScript pass.
- First path QA pass.
- Browser proof: `/` CTA, `/intro` CTA, first mission starts, audio plays, mission advances.
- Console clean or documented non-blocking warnings.

Day 2 — First mission cognitive-load cut

Deliverables:
- Inspect exact mobile view of `/`, `/intro`, first M1 mission.
- Cut visible text/status labels to the minimum required.
- Ensure first useful German action happens immediately after CTA.
- Add source guard for banned labels/internal status language.

QA gates:
- Screenshot before/after.
- Visible-text budget check for first screen and first mission step.
- No fixed nav/search overlay crowding focused path.

Day 3 — M1 mission standardization

Deliverables:
- Confirm all M1 missions follow the loop: hear → understand → say → repair → tiny proof → win.
- Fix one weakest M1 mission.
- Ensure ability landing names a real learner output.

QA gates:
- One full M1 playthrough on mobile viewport.
- Audio proof for each M1 mission first clip.
- Scorecard for M1.

Day 4 — M2 mission standardization

Deliverables:
- Confirm all five M2 routes use the same production-first mission contract.
- Fix the worst M2 flow issue: likely click-heavy builder/typing burden or unclear reply timing.
- Ensure Module 2 landing shows mission sequence and current next action.

QA gates:
- `qa_module2_production_mobile.mjs` pass.
- Browser playthrough for one M2 mission.
- M2 scorecard.

Day 5 — M3 mission blueprint + first playable mission

Deliverables:
- Create compact Module 3 mission blueprint in code comments/report, not a broad strategy doc.
- Build one playable M3 mission for numbers/prices in Kerala supermarket/bakery context.
- Use existing audio only if acceptable; otherwise mark missing audio as WEAK and use non-launch placeholder with clear flag.

QA gates:
- Route loads.
- Learner hears a number/price, says it, repairs one common number-order trap, writes a tiny proof.
- Canon check passes: Kerala setting, no physical Germany drift.

Day 6 — M3 second mission + checkpoint sketch

Deliverables:
- Build second M3 mission for time/appointment or birthday/date.
- Add checkpoint sketch/source structure for numbers/time/dates.
- Add QA assertions for M3 route availability.

QA gates:
- Two M3 missions route-load and browser-advance.
- Checkpoint has Goethe-like task shape.

Day 7 — Review loop and weekly report

Deliverables:
- Connect completed M1/M2/M3 abilities to `/learn` next-action state or document exact gap.
- Weekly report under `GermanCourse_QC/` with PASS/WEAK/FAIL by section.
- One review URL only if first path and at least one M2/M3 mission are genuinely reviewable.

QA gates:
- First path pass.
- M1/M2 pass.
- M3 pilot at least WEAK with named blockers.
- Boss summary includes only focused decisions/questions.

## 8. First 48 hours exact build lane

This is the no-babysitting lane. Agents should execute it without asking Boss.

1. Snapshot before touching source.
- Run `git status --short` and record branch/commit/dirty count in `GermanCourse_QC/first-48h-build-lane.md`.
- Do not commit.

2. Freeze the first-path contract in the report.
- Contract: `/` compact professional promise → `/intro` guided first moment → first M1 audio mission → ability win → next mission.
- If source currently differs, document the actual route and patch only if the difference is a clear bug.

3. Repair `scripts/qa_mission_pilot.py`.
- Remove stale expectations for old intro snippets and old query params.
- Assert current actual copy/route only where it matters.
- Add source checks for:
  - no `speechSynthesis` on mission review path;
  - real mission audio paths;
  - focused route hides/demotes global nav/search where required;
  - banned visible labels do not appear in mission UI.

4. Decide fate of older QA scripts.
- `scripts/qa_gold_slice_first_journey.mjs`: either update to current first path or mark as legacy/superseded in `GermanCourse_QC/first-48h-build-lane.md`.
- Do not keep two contradictory definitions of the first path.

5. Browser-test locally.
- Start dev server bound to `0.0.0.0` if not already running.
- Test `/`, `/intro`, first M1 mission, `/learn`, `/learn/1`, `/learn/2`, one M2 mission.
- Use real clicks and DOM state checks, not source inspection only.
- Capture console errors.

6. Audio proof.
- For first M1 mission and one M2 mission, prove:
  - audio element/source exists;
  - HTTP 200;
  - duration available;
  - play starts;
  - next action unlocks only after required audio event if that is the route contract.

7. Cognitive-load cut.
- On first path only, remove visible internal labels/status language and obvious text overload.
- Keep one headline, one short context sentence, one CTA, and German audio/action.
- Do not redesign global styling.

8. Write evidence report.
- Create `GermanCourse_QC/first-48h-build-lane.md` with:
  - files changed;
  - commands run;
  - route/browser proof;
  - screenshots/visual notes if visual changes made;
  - audio proof;
  - scorecard result;
  - remaining WEAK/FAIL items.

9. Stop.
- Do not drift into Module 3 until the first-path proof is passing.
- Do not send Boss a review link unless QA/browser/audio all pass.

## 9. Definition of launch-ready

Launch-ready means a real learner can use the course without Boss manually guiding them, and the app produces Goethe A1 progress with cultural fit and trust.

Content gate:
- PASS: A1 canon is Kerala-first; every module has clear story beat, learner output, next pull; no generic textbook dominance.
- WEAK: Mostly aligned but some modules still feel generic or have deferred setting fixes.
- FAIL: Germany physical setting appears during A1 learning without mock/dream/future frame; content is mostly grammar/explanation pages.

Audio gate:
- PASS: Real German audio exists for mission/hearing/dictation tasks; playback proven in browser; no browser TTS on review paths; missing audio handled honestly.
- WEAK: Technical playback works but accent quality not human-reviewed, or some non-core modules use placeholders.
- FAIL: Audio missing, JS-only/invisible playback, browser SpeechSynthesis, or broken mission audio.

UX gate:
- PASS: One clear next action; first path is guided; no dashboard clutter on focused routes; completion tells learner what they can now do.
- WEAK: Core path is clear but secondary routes remain cluttered.
- FAIL: Learner lands in catalogue/dashboard, gets lost after completion, or has to read long instructions before action.

Mobile gate:
- PASS: Core path works on mobile viewport; buttons visible; no fixed nav/search overlays blocking CTAs; text density acceptable.
- WEAK: Minor spacing/visual issues but no task blocker.
- FAIL: CTA hidden, audio unusable, layout broken, text wall.

Pedagogy gate:
- PASS: Each mission includes input, production, feedback/repair, and a specific ability win; grammar appears only as useful noticing.
- WEAK: Production exists but some missions still lean recognition-heavy.
- FAIL: Learner mostly taps/reads and does not speak/write.

Exam readiness gate:
- PASS: Modules map to Goethe A1 skills; checkpoints exist; weak skills remediate; final modules simulate exam tasks.
- WEAK: Skill map exists but checkpoints/remediation incomplete.
- FAIL: Story/fun exists but Goethe A1 proof is vague.

Trust gate:
- PASS: Build/QA/browser/audio evidence attached; dirty git scoped; review link tested; failures named honestly.
- WEAK: Most evidence exists but one gate is manual/human-review pending.
- FAIL: Agent says "good" from file edits, screenshots only, or source inspection only.

Launch decision:
- Public paid launch requires PASS on all gates or explicit Boss-approved exceptions.
- Small private beta can start with PASS on first path + M1/M2 + honest WEAK list for later modules.
- No launch/beta claim if first path, audio, mobile, or checkpoint proof is FAIL.

## 10. Boss decisions needed

Max five decisions. These matter; everything else agents can execute.

1. Public protagonist name.
- Option A: keep `Kuttan` publicly.
- Option B: use adult-safe public name `Arun` or `Kiran`, keep Kuttan as family/home nickname.
- Recommendation: use Arun/Kiran publicly if Boss wants broader premium trust; keep Kuttan as nickname flavor.

2. Launch scope.
- Option A: private beta after M1–M3 are mission-quality.
- Option B: wait until all 18 modules have mission loops.
- Recommendation: private beta after M1–M3 PASS, because feedback will expose real UX faster.

3. Audio quality bar.
- Option A: use current generated/pre-rendered audio if technically clean.
- Option B: human-record or higher-quality TTS for first-path/M1–M3 before beta.
- Recommendation: human-review first-path audio before paid launch; generated is acceptable for internal review if clearly labeled.

4. Course framing on `/`.
- Option A: professional course promise first, then action.
- Option B: immediate lesson action with minimal promise.
- Recommendation: compact professional promise first; cold learners need trust before action.

5. Games positioning.
- Option A: keep games visible as a separate section.
- Option B: demote games into mission-linked practice/remediation.
- Recommendation: demote until the core mission path feels valuable.

## 11. Verification harness

Future agents must judge outputs against the vision without Boss checking everything.

Required harness layers:

A. Source contract checks

For every build output, verify the relevant source contains the intended product contract.

First-path checks:
- `/` has one primary CTA to the guided start.
- `/intro` is not a text wall; it leads to first mission.
- `/learn` shows next mission/action first, not old dashboard clutter.
- Focused mission routes suppress distracting global nav/search where needed.
- Mission routes use real audio references, not browser TTS.

Mission checks:
- Mission data includes scene/stakes, German audio/input, learner reply, repair, tiny proof, ability win, next pull.
- No internal labels visible to learners.
- No builders as default hero unless the mission specifically needs scaffolding.

B. Browser route checks

Minimum routes for first-path changes:
- `/`
- `/intro`
- `/learn`
- `/learn/1`
- `/learn/2`
- first M1 mission
- one M2 mission

Browser proof must include:
- HTTP 200/page load.
- Real click from CTA to next route.
- DOM/state transition after click.
- No blocking console errors or hydration overlay.
- Mobile viewport check for CTA visibility and overlay issues.

C. Audio checks

For any route claiming audio readiness:
- Audio URL returns HTTP 200.
- Browser element/source can load metadata.
- Duration is available or explicitly explained.
- Play starts in browser.
- UI state changes after play/start/end according to route contract.
- No `speechSynthesis` in reviewed route.
- No JS-only hidden `new Audio()` control unless explicit temporary internal tool, not review path.

D. Content sample checks

For every module/mission/content output, sample check:
- Kerala/A1 canon.
- Goethe A1 skill link.
- German correctness and A1 level.
- Manglish bridge useful, not cringe.
- Learner produces speech/writing.
- Story scene supports learning, not filler.

Minimum sample size:
- For one mission: inspect whole mission.
- For one module: inspect module landing + at least two missions + checkpoint/review if present.
- For broad content changes: inspect changed files plus random 10% sample or at least 5 lessons, whichever is larger.

E. Cognitive-load checks

Reject if:
- first screen has multiple competing CTAs;
- learner must read long paragraphs before hearing/doing German;
- visible system labels/debug/status words appear;
- dashboard/progress widgets crowd the first task;
- task requires unnecessary typing/clicking before any meaningful German input.

F. PASS/WEAK/FAIL self-judge block

Every build report must end with:

Self-judge:
- Vision alignment: PASS/WEAK/FAIL + reason.
- Learner value: PASS/WEAK/FAIL + evidence.
- Kerala/Malayali identity: PASS/WEAK/FAIL + evidence.
- Goethe A1 proof: PASS/WEAK/FAIL + evidence.
- Audio/production: PASS/WEAK/FAIL + evidence.
- UX/cognitive load: PASS/WEAK/FAIL + evidence.
- Mobile/browser proof: PASS/WEAK/FAIL + evidence.
- Trust/launch readiness: PASS/WEAK/FAIL + evidence.
- Next fix if any WEAK/FAIL.

Anti-hallucination rules:
- Do not call something good from source edits alone.
- Do not call a link reviewable until clicked through in browser on the exact URL.
- Do not call audio good from file existence only.
- Do not call German audio native/natural unless human-reviewed or evaluated by a proper audio/accent process.
- Do not hide stale QA by ignoring it; update or retire contradictory tests.
- Do not average away P0 failures. One FAIL in audio, first-path navigation, or mobile CTA visibility blocks review.
- If evidence is missing, label WEAK/FAIL, not PASS.

Evidence package required per output:
- Files changed.
- Routes tested.
- Commands run and results.
- Browser proof notes.
- Console/error notes.
- Audio proof if relevant.
- Screenshots or visual notes if visual/UX changed.
- Content samples if pedagogy/content changed.
- Scorecard result.

## 12. Vision-alignment scorecard

Use this checklist before calling any output good.

Learner value:
- PASS: learner leaves with one named usable German ability.
- WEAK: learner practices something relevant but ability win is vague.
- FAIL: learner only reads, clicks, or navigates.

Malayali/Kerala identity:
- PASS: scene/examples feel specifically useful to Malayali learner and A1 stays Kerala-first.
- WEAK: identity present but generic or decorative.
- FAIL: generic German course, Germany drift, or culture feels cringe/childish.

Goethe A1 proof:
- PASS: output maps to Hören/Lesen/Schreiben/Sprechen and exam-like ability.
- WEAK: skill link implied but not tested.
- FAIL: no exam relevance.

Adult-safe tone:
- PASS: warm, familiar, respectful, not babyish.
- WEAK: a few cute labels or mascot-heavy moments remain.
- FAIL: feels like kids' app, toy dashboard, or meme course.

Audio/speaking/writing production:
- PASS: learner hears real German, says something aloud, writes/taps a meaningful proof, gets feedback/repair.
- WEAK: two of three production modes present.
- FAIL: recognition-only or passive content.

Engagement:
- PASS: story stakes, quick win, and next pull are clear.
- WEAK: useful but dry.
- FAIL: boring/click-heavy/no reason to continue.

Low cognitive load:
- PASS: one clear action, low text, minimal decisions.
- WEAK: some clutter but core task is obvious.
- FAIL: dashboard-like, page-heavy, multiple competing CTAs, or long preamble.

Premium trust:
- PASS: stable layout, working media, clean browser, mobile proof, no cheap labels/native clunk unless intentionally chosen.
- WEAK: usable but some polish gaps.
- FAIL: broken audio, bad layout, console errors, review friction.

Launch readiness:
- PASS: evidence-backed, QA passes, failures absent or Boss-approved.
- WEAK: internal-review ready with named blockers.
- FAIL: not reviewable; core path/audio/mobile/QA broken.

Hard rejection triggers:
- Browser SpeechSynthesis on reviewable German audio path.
- Physical Germany setting during A1 learning unless explicitly dream/mock/future/video-call.
- First path lands in dashboard/catalogue.
- Learner cannot hear German and act quickly.
- No speaking or writing output.
- QA contradiction ignored.
- Agent says "done" without browser/audio/content evidence.

## Immediate recommendation

The next real build step is not more strategy and not more UI polish.

Do this first:
- Repair the first-path QA contract in `scripts/qa_mission_pilot.py`.
- Browser-prove `/` → `/intro` → first M1 audio mission.
- Cut any remaining first-path text/status clutter.
- Only then move to Module 3 missionization.

## Boss summary

I reconstructed the product vision as: Malayali/Kerala-rooted, adult-safe, Goethe A1-serious, real-audio, production-first missions — not dashboards, not generic grammar pages, not UI polish.

The biggest current mismatch is trust/proof: the app has promising M1/M2 mission pieces, but QA is stale and the wider product still has old dashboard/course-library DNA.

First move: fix the proof harness and first path, then use M1/M2 as the reusable mission standard, then extend to Module 3.

Boss decisions needed: public name (`Kuttan` vs Arun/Kiran), beta scope, audio quality bar, root-page framing, and games positioning.

Recommended next action: patch `scripts/qa_mission_pilot.py` and prove `/` → `/intro` → first M1 audio mission in browser before any more product polish.
