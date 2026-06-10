# Adipoli German — Vision-to-SMART plan reset

Generated: 2026-05-31 17:01 Europe/Berlin
Workdir: `/shared/german-course`
Run context: 4h continuous vision reset, iteration 11

This is not a new strategy direction. It is the execution contract that future agents should use so Boss does not have to keep catching the same mismatch: too much text, too many pages, dashboard thinking, generic drills, weak proof, and quality claims without evidence.

## Evidence inspected in this reset

Docs read/synthesized:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
- `docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`
- `docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`
- `docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`
- `docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`
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

QC/run evidence inspected:
- `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`
- `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1641.md`
- recent app-readiness/product-UX audit signals in `GermanCourse_QC/*.md`

Source inspected:
- Routes: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`
- Mission routes: `src/app/missions/module-1/*/page.tsx`, `src/app/missions/module-2/*/page.tsx`
- Shared mission UI: `src/app/missions/module-2/_components/MissionUI.tsx`
- Mission data: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`
- Course content structure: `src/lib/content/modules/module-01.ts` through `module-18.ts`
- Audio structure: `public/audio/hoeren/`, `public/audio/missions/`, `public/audio/tts/`
- QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_module2_production_mobile.mjs`

Live checks run:
- `git status --short | wc -l` → 262 dirty/untracked entries. Branch: `adipoli-page-by-page-reset-20260523-1802`. Commit: `b201d05`.
- `curl -I http://127.0.0.1:3000/` → HTTP 200.
- Route status checks: `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, all 5 Module 2 mission routes → HTTP 200.
- `npx tsc --noEmit --pretty false --incremental false` → PASS.
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` → PASS.
- `python3 scripts/qa_mission_pilot.py` → FAIL because the intro/start-path guard expects older CTA/copy snippets (`Greet Frau Weber.`, `Start listening`, old `FIRST_MISSION_PATH` constants). This is a QA-staleness problem unless source has actually regressed; update harness before trusting it.
- Browser visual QA:
  - `/` is concise, professional, one CTA, not dashboard-like.
  - `/intro` is low-text and action-led, though still a bit hero-page-like.
  - first mission screen is clean and low-load, but must prove the listen → learner reply → repair loop, not just a passive listen state.

## 1. Vision reconstruction — what Boss is trying to build

Boss is not trying to build “German lessons in an app.”

He is trying to build a premium, Kerala-rooted German A1 coach for Malayali beginners who want Germany but are starting from real beginner fear.

Plain version:

Adipoli German should feel like a guided Kerala-to-Germany journey where a learner opens the app, meets a concrete situation, hears real German, says or writes something useful, fixes one likely mistake, and leaves each short session with a real ability they can use in Goethe A1 and in life.

The product should feel made for a Malayali learner:
- Manglish-friendly explanations.
- Kerala situations, names, anxieties, family pressure, Goethe Kochi-style prep, visa/exam stakes.
- Kuttan as peer/older-cousin companion: warm, relatable, not childish mascot noise.
- Germany as the dream/future destination during A1, not as a fake physical setting for Kuttan.
- Goethe A1 seriousness underneath the fun.

The app should not feel like:
- a generic dashboard with lessons/games/search/practice tabs fighting for attention;
- a Duolingo clone with Kerala words pasted on top;
- a pile of AI-generated scripts;
- a course where the learner mostly clicks recognition answers;
- product theatre where the agent polishes pages but the student still cannot speak/write/listen.

North star:

A mission-based German coach where every short session creates a real ability: hear, speak, write, repair, and feel progress.

## 2. Non-negotiables

These are not preferences. If a build violates them, it is wrong-direction even if it looks polished.

1. Malayali/Kerala identity stays central
- A1 Kuttan story happens in Kerala: Thrissur home, Goethe/Kochi class, Kerala public life, family scenes, exam prep, visa/airport departure.
- Learner imagination can use Germany scenes, but Kuttan himself does not physically live in Berlin/Munich/Frankfurt during A1.
- Names, examples, stakes, humor, and bridge explanations should feel local without becoming caricature.

2. Goethe A1 seriousness
- The product must prepare for Hören, Lesen, Schreiben, and Sprechen, all 25% each.
- Launch-ready means the learner can perform, not just recognize.
- Exam checkpoints must exist after key modules, especially Module 2, Module 3, Module 14, Module 17, and Module 18.

3. Adult-safe tone
- Kuttan is a peer/older-cousin figure, not a cartoon child.
- Fun means situational, warm, culturally specific, and useful.
- Avoid loud gamification, childish labels, mascot chatter, and school-kid reward clutter.

4. Real audio
- No browser `SpeechSynthesis` for reviewable German.
- German audio must be real assets, served over HTTP, with visible duration/progress for learner trust.
- Hören tasks must hide transcript until after answer.

5. Production-first learning
- Every mission must end with learner output: speaking, writing, dictation, form fill, or short roleplay.
- Recognition-only missions are not launch-grade.
- Listening-first is allowed only as setup; it must quickly unlock a learner reply and repair moment.

6. Self-sufficient launch-ready course
- The app must teach, practice, correct, review, and checkpoint inside the product.
- It cannot rely on Boss, YouTube, Telegram, or external explanation to make sense.
- A learner should know the next useful action without browsing a dashboard.

7. Evidence before praise
- No future report may call a route/module “good” without source inspection, browser/playthrough evidence, audio verification, and PASS/WEAK/FAIL gates.
- A report with no weaknesses is suspect.

## 3. Current mismatch diagnosis

Blunt read: the direction is now clearer than before, and the current root/intro screens are less embarrassing than the older dashboard-style versions. But the product is not yet coherent or launch-grade. It still looks like several correction waves layered on top of a broad course app.

Mismatches that still matter:

1. Too many route systems competing
- There are old lesson routes, practice routes, games routes, tests, scripts, onboarding, plan, vocabulary, and mission routes.
- Mission routes exist for Module 1 and Module 2, but they are not yet the whole course model.
- The app can still become a browse-and-pick dashboard instead of a guided coach if `/learn`, `/learn/1`, `/learn/2`, and mission memory are not unified.

2. Text-heavy/page-heavy habit is not fully killed
- Root and intro are currently concise.
- But previous QC history shows repeated regressions into hero copy, labels, system/status text, progress ribbons, and explanatory chips.
- Future agents must not add more pages, promise cards, or labels when a single scene action would solve it.

3. Weak mission/product coherence
- Module 1 has 3 mission routes. Module 2 has 5 mission routes. The rest of the 18-module course is still lesson/content-first.
- There is no proven reusable “mission engine” across all modules yet.
- A good pilot route is not a course product. The pattern must scale.

4. Production exists but is not yet guaranteed everywhere
- Docs demand at least 3 production exercises per lesson: speaking, writing/free-text, and listening/dictation.
- Existing audits show recognition-heavy content and uneven production coverage.
- The source has real mission audio and production-style routes now, but launch readiness requires the floor across all lessons/modules, not just M1/M2 pilots.

5. Hören remains the highest exam-risk area
- Audio assets exist under `public/audio/hoeren/` and `public/audio/missions/`, including 23 Module 2 mission MP3s.
- But the plan still needs systematic audio coverage, transcript hiding, replay limits, and audio-only dictation for exam-like tasks.

6. Canon drift risk remains
- Older docs and audits flagged Germany-setting drift in modules/scripts/games.
- Current plan must treat `A1_STORY_BIBLE.md` as the canonical source: A1 Kuttan stays in Kerala; Germany scenes are future/imagination/video-call/mock scenarios.
- Games like Room Builder / boss fights / Situation Sprint need setting reframing before launch promotion.

7. QA harness is partly stale
- TypeScript currently passes.
- Local route status is healthy.
- `qa_module2_production_mobile.mjs` passes.
- `qa_mission_pilot.py` fails because it expects older intro copy/source snippets. A stale QA script creates false confidence or false alarms. Fixing the harness is a Phase 0 task, not optional.

8. Review friction and dead-link fear hurt trust
- Tailscale/raw-link review friction has already damaged confidence in prior loops.
- Future review links must be verified on the exact URL, with route, audio, console, and state-transition checks before Boss sees them.

9. Incremental polish has been the trap
- Repeated small UI fixes made pieces cleaner, but they did not answer Boss’s real question: “Is this course actually useful and interesting?”
- The next work must be module/product-model execution, not container styling.

## 4. Product model

The course unit is not a lesson page.

The core unit is a mission.

A mission is a short, concrete ability loop:

1. Situation
- One real learner-relevant scene.
- Example: “Frau Weber asks your name at Goethe Kochi.”
- Must be understood in under 5 seconds.

2. Hear
- Real German audio appears early.
- No transcript-first crutch for Hören tasks.
- Audio has visible progress/duration.

3. Try
- Learner answers aloud, types, fills a field, chooses a repair, or performs a mini-roleplay.
- Must include at least one productive act before completion.

4. Notice
- One likely A1 mistake is surfaced.
- Example: `Ich bin Kuttan` vs `Ich heiße Kuttan`; country vs language; `aus` vs `in`.

5. Repair
- Learner corrects the mistake or repeats improved output.
- The repair must be specific, not vague “try again.”

6. Win
- End with an ability statement.
- Example: “You can greet Frau Weber formally and answer your name.”

7. Pull
- Show the next mission as a natural continuation.
- No dashboard browse required.

Module loop:
- 3–6 missions per module.
- Each module ends with one checkpoint task proving the real-world/Goethe output.
- Module 2 checkpoint: self-intro + spell name + origin/job/languages + simple form fields.
- Module 3 checkpoint: hear/say/write numbers, times, dates, and appointments.
- Module 14 checkpoint: form fill + formal message.
- Module 17–18 checkpoint: Goethe-style timed mock sections.

Review/checkpoint loop:
- Mission completion creates review items.
- SRS/review is not a separate random card deck; it recalls phrases from missions.
- Checkpoint failure triggers remediation mission, not a generic “review more” page.

App-level route model:
- `/` = compact professional course promise and one CTA.
- `/intro` = first action, not marketing lecture.
- `/learn` = guided command center with next mission only; old lesson queue collapsed.
- `/learn/[moduleId]` = mission sequence + module checkpoint, not a dashboard.
- `/missions/...` = focused route; hide global nav/search; no clutter.
- `/practice/*` and `/games` = support tools unlocked from needs, not the main first-run path.
- `/tests/*` = exam proof layer, not early clutter.

## 5. Student-interest plan — why learners would continue

A learner continues only if the product gives them repeated proof that they are becoming the person they want to be.

Interest drivers:

1. Story stakes
- Kuttan is not decoration. He externalizes the learner’s own journey: curiosity, embarrassment, grammar frustration, exam pressure, family expectation, leaving Kerala, arriving in Germany later.
- Every module should have a visible emotional job: first courage, identity, time pressure, family, food, travel, bureaucracy, exam.

2. Quick wins
- Session length should create a win fast.
- Within 60–90 seconds, the learner should have heard German and produced one line.
- First mission win: “I can reply `Guten Morgen, Frau Weber.`”
- Module 2 win: “I can introduce myself and spell my name.”

3. Confidence through repair
- The product should not just mark wrong. It should show the common Malayali/A1 mistake and fix it.
- Repair is where trust grows: “Ah, this app knows exactly where I get stuck.”

4. Exam proof
- The learner should see that each mission maps to Goethe A1 skills.
- Keep the exam link visible but small: not corporate badges, just clear proof.
- Example: “Goethe Sprechen: introduce yourself.”

5. Cultural fit
- Use Kerala scenes and Manglish bridges where they reduce fear.
- Do not overdo Malayalam so German disappears.
- Use adult examples: class, job, forms, phone calls, appointments, money, family, travel prep.

6. Retention pull
- Each mission ends by showing the next real ability, not by dumping options.
- Good pull: “Next: Frau Weber asks you to spell your name.”
- Bad pull: “Explore vocabulary, games, scripts, tests, pricing, roadmap.”

7. Premium trust
- Clean mobile UI.
- Real audio.
- No broken controls.
- No visible internal labels like `GREETING SET`, `SAFE DEFAULTS`, debug statuses, or dashboard meta.
- QA reports must admit weak spots.

## 6. SMART roadmap

Phase 0 — Stabilize truth and QA harness

Timebox: 1 day.

Outcome:
- Agents can judge the app against Boss’s vision without stale checks or vibes.

Files/routes affected:
- `scripts/qa_mission_pilot.py`
- `scripts/qa_intro_start_path.mjs`
- `scripts/qa_gold_slice_first_journey.mjs`
- `scripts/qa_module2_production_mobile.mjs`
- `GermanCourse_QC/` reports

Acceptance criteria:
- TypeScript passes.
- Local route status checks pass for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all mission routes.
- QA scripts no longer assert stale copy. They assert behavior and vision gates: first CTA route, nav/search hidden, audio real, audio duration/progress visible, state transition works, learner output required, repair exists, no banned visible labels.
- Every QA output uses PASS/WEAK/FAIL and includes at least one weakness unless truly none found with evidence.

What NOT to do:
- Do not rewrite UI to satisfy stale string checks.
- Do not add more docs instead of fixing the harness.

Phase 1 — Lock first learner journey

Timebox: 2 days.

Outcome:
- The path `/` → `/intro` → first Module 1 mission → Module 1 sequence → `/learn/2` works as a single guided journey.

Files/routes affected:
- `src/app/page.tsx`
- `src/app/intro/page.tsx`
- `src/app/learn/page.tsx`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/missions/module-1/*`
- `src/lib/missions/module1.ts`
- shared focused-mode nav/search suppression

Acceptance criteria:
- Browser clicks prove final `location.pathname` after each CTA.
- First mission gives German audio and learner reply within 90 seconds.
- Completion moves to the next mission without dashboard browsing.
- Global nav/search hidden on focused routes.
- Mobile viewport has no overlapping CTA/nav/search.
- Console clean enough: no hydration/runtime errors on the tested path.

What NOT to do:
- Do not polish marketing containers.
- Do not add another onboarding step.
- Do not expose old lesson queue before the first win.

Phase 2 — Make Module 2 the gold-standard mission module

Timebox: 3 days.

Outcome:
- Module 2 becomes the reusable proof of the product model: self-intro, spelling, origin, job/languages, final rehearsal.

Files/routes affected:
- `src/app/missions/module-2/*`
- `src/app/missions/module-2/_components/MissionUI.tsx`
- `src/lib/missions/module2.ts`
- `public/audio/missions/module-2/*`
- `src/app/learn/2` route logic

Acceptance criteria:
- All 5 Module 2 missions load and play with real audio.
- Each mission includes hear → learner output → one repair/noticing moment → ability win.
- Final Module 2 checkpoint produces a 5–7 sentence A1-safe self-introduction and a name-spelling/form-fill proof.
- No mission can be completed without speaking or writing.
- QA checks audio `readyState`, duration, progress movement, and no `speechSynthesis` / JS-only `new Audio()` fallback.
- Browser mobile QA passes.

What NOT to do:
- Do not add more Module 2 promise cards.
- Do not turn the first path into sentence-builder chip work unless it clearly supports the scene.
- Do not make typing long paragraphs mandatory on mobile.

Phase 3 — Convert the remaining course into a mission spine

Timebox: 7–10 days for blueprint + first implementation wave.

Outcome:
- Every module has a concrete mission sequence and checkpoint before broad coding continues.

Files/routes affected:
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md` as source reference, not a new sprawl doc
- `src/lib/missions/` new module mission data files
- `src/app/missions/module-{n}/...` generated/scaffolded routes using shared mission primitives
- `src/lib/content/modules/module-*.ts` where canon/content gaps block missions

Acceptance criteria:
- 18 modules each have: learner promise, 3–6 missions, exact output, Goethe section mapping, required audio, required production, checkpoint.
- First implementation wave covers Modules 1–3 because they control activation.
- Goethe-heavy implementation wave covers Modules 14, 17, 18 because they control launch trust.
- Mission data reuses shared primitives; no copy-paste route chaos.

What NOT to do:
- Do not build all routes before proving the shared engine.
- Do not rewrite every lesson script line-by-line during product modeling.
- Do not hide weak modules behind “coming soon” unless Boss approves launch scope reduction.

Phase 4 — Production floor and audio floor

Timebox: 7 days after mission spine is stable.

Outcome:
- Course stops being recognition-heavy. Every lesson has launch-grade production practice and real Hören where needed.

Files/routes affected:
- `src/lib/content/modules/module-01.ts` through `module-18.ts`
- `public/audio/hoeren/`
- `scripts/gen-tts.ts`, `scripts/gen-pimsleur.ts`, or a dedicated free/local audio generation script if approved
- audit scripts under `scripts/audit-*`

Acceptance criteria:
- Every lesson has at least 3 production exercises: speaking, writing/free-text/type-answer, listening/dictation.
- Audio-backed tasks have existing files and HTTP 200.
- Hören tasks hide transcript until after answer.
- Module 3, 7, 9, 14, 17, 18 have audio-first exam-style drills.
- Goethe Wortliste audit exists and flags out-of-scope/missing core words.

What NOT to do:
- Do not mass-add generic exercises to improve counts.
- Do not use text-only dictation.
- Do not spend paid API/media credits without approval.

Phase 5 — Launch readiness and beta proof

Timebox: 5–7 days after core course path passes.

Outcome:
- The course can be shown to beta learners without Boss apologizing for the experience.

Files/routes affected:
- launch checklist routes and env readiness only after Boss approves business/deployment work
- `src/app/tests/*`, `src/app/practice/*`, `src/app/games/*`, auth/pricing only if in approved launch scope
- `GermanCourse_QC/launch-readiness-*.md`

Acceptance criteria:
- Full first-journey browser playthrough passes local + Tailscale review URL.
- Mobile screenshots for root, intro, first mission, Module 2 final checkpoint, exam checkpoint are captured and reviewed.
- No broken audio/images on audited paths.
- Beta scope is explicit: what is included, what is hidden, what is not launch-ready.
- Boss decisions on pricing/deployment/auth are requested only when needed.

What NOT to do:
- Do not deploy/push/merge without approval.
- Do not touch pricing/payment/auth business logic during product QA unless specifically asked.
- Do not claim launch-ready from TypeScript alone.

## 7. First 7 days execution plan

Day 1 — QA truth + first path proof

Deliverables:
- Patch stale mission QA expectations to behavior-based checks.
- Run `tsc`, route-status curl, mission QA, intro/start path QA.
- Browser-play `/` → `/intro` → first Module 1 mission.
- Write `GermanCourse_QC/day1-first-path-qa-YYYYMMDD.md`.

QA gates:
- First CTA path works by browser click.
- No stale string checks.
- First mission has real audio and state transition.
- Weaknesses listed.

Day 2 — Module 1 mission closure

Deliverables:
- Ensure all 3 Module 1 missions form one uninterrupted guided sequence.
- Completion state advances to next mission and then Module 2 start.
- Cut any visible system/meta labels.

QA gates:
- Mobile + desktop browser checks.
- Audio duration/progress visible.
- Completion requires learner reply/repair.

Day 3 — Module 2 gold path source cleanup

Deliverables:
- Inspect all 5 Module 2 mission definitions and route pages.
- Ensure each mission has one concrete output and one repair moment.
- Update Module 2 QA to check all 5 routes, not just page load.

QA gates:
- Every mission route HTTP 200.
- Every audio URL HTTP 200.
- No `speechSynthesis`, no native ugly controls unless explicitly accepted, no hidden JS-only audio.

Day 4 — Module 2 final checkpoint

Deliverables:
- Build/verify final self-intro checkpoint: 5–7 A1-safe sentences + spelling + origin/job/languages.
- Add rubric for acceptable output.
- Ensure mobile typing burden is sane.

QA gates:
- Learner cannot pass without speaking or writing.
- Common mistakes are repaired.
- Ability win is visible.

Day 5 — Mission spine compression for Modules 3, 14, 17, 18

Deliverables:
- Produce compact mission map for the highest exam-risk modules.
- Define exact audio assets needed.
- Define checkpoints.

QA gates:
- Each mission has output, Goethe section, audio need, production need, repair need.
- No new broad strategy doc; patch active plan/index or write one implementation map under QC.

Day 6 — Production/audio floor audit

Deliverables:
- Run or create audit that counts speaking/free-text/dictation per lesson.
- Generate missing-audio manifest, not audio itself unless free/local and approved by existing scripts.
- Prioritize P0 lessons.

QA gates:
- Report lists exact module/lesson gaps.
- No fake “audio” if file does not exist.

Day 7 — Beta-scope readiness report

Deliverables:
- One blunt report: Built / Why / Verified / Weak / Need Boss.
- Recommend beta scope: likely first path + Modules 1–2 + selected exam/practice surfaces, not full public launch unless gates pass.

QA gates:
- PASS/WEAK/FAIL across content, audio, UX, mobile, pedagogy, exam readiness, trust.
- Max 5 Boss decisions.

## 8. First 48 hours exact build lane

This is the immediate agent task list. No asking Boss unless a forbidden area is hit.

Hour 0–2: Freeze evidence baseline
- Run `git status --short` and save count/branch/commit in QC report.
- Run `npx tsc --noEmit --pretty false --incremental false`.
- Run route-status curl for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, and all mission routes.
- Run existing QA scripts and record exact failures.

Hour 2–5: Fix stale QA harness, not product copy
- Update `scripts/qa_mission_pilot.py` so it checks behavior, not old text snippets.
- Required checks:
  - root CTA exists and routes to intro/first path;
  - intro CTA browser-clicks to mission;
  - focused routes suppress global nav/search;
  - audio files are real and reachable;
  - mission route has learner output control after audio;
  - no banned visible labels;
  - no `speechSynthesis`.

Hour 5–8: Browser play first journey
- Use local server.
- Browser test `/` → `/intro` → first Module 1 mission.
- Click primary CTAs, inspect `location.pathname` after each.
- Play mission audio; verify duration/progress changes.
- Verify next action appears after audio completion.
- Capture visual notes, not just source snippets.

Hour 8–12: Module 1 sequence
- Inspect `src/lib/missions/module1.ts` and all Module 1 mission route files.
- Confirm mission 1 → 2 → 3 progression.
- Fix only small safe blockers: wrong links, stale labels, missing route handoff, obvious clutter.
- Do not redesign containers.

Hour 12–18: Module 2 sequence audit
- Inspect `src/lib/missions/module2.ts` and all 5 mission route files.
- Verify the 23 Module 2 audio files serve locally.
- Check each mission for: situation, hear, output, repair, win, pull.
- Mark each PASS/WEAK/FAIL.

Hour 18–24: Module 2 gold path patch lane
- Patch only safe high-leverage issues:
  - missing next links;
  - visible debug/system labels;
  - output not required;
  - audio progress not visible;
  - repair step absent where easy to add from existing data.
- Run targeted QA after each patch.

Hour 24–30: Production floor inventory
- Run or add a read-only audit to count production types per lesson.
- Output: module, lesson, speaking count, free-text/type-answer count, dictation/listening count, audio files present/missing.
- Do not mass-add exercises yet.

Hour 30–36: Canon drift inventory
- Search source/content/scripts/games for high-risk physical Germany settings attached to Kuttan in A1.
- Classify as safe future/imagination/video-call/mock vs canon violation.
- Patch only obvious one-line labels if safe; otherwise report.

Hour 36–42: Mission spine implementation map
- For Modules 3, 14, 17, 18, define mission outputs and checkpoints.
- Keep it executable: route/data/audio/files affected.
- No broad pedagogy essay.

Hour 42–48: Final 48h report
- Write `GermanCourse_QC/first-48h-execution-report-YYYYMMDD.md`.
- Include Built / Why / Verified / Weak / Need Boss.
- Recommend next 5 build tasks.

## 9. Definition of launch-ready

Launch-ready does not mean “the app compiles.” It means a real beginner can use the course without Boss explaining it and get measurably closer to Goethe A1.

Content gate
- PASS: All modules have mission sequence + checkpoint; every lesson has story/context, teaching support, and production practice.
- WEAK: Modules 1–3 strong, later modules content-complete but mission/checkpoint uneven.
- FAIL: Learner browses generic lessons/exercises without guided ability outcomes.

Audio gate
- PASS: All Hören/dictation/mission audio is real, served over HTTP, has visible duration/progress, and transcripts are hidden until appropriate.
- WEAK: Mission audio works, but exam modules still have gaps.
- FAIL: Browser TTS, missing audio, text shown for listening, or audio controls that do not work on review URL.

UX gate
- PASS: One clear next action on every main path; focused routes hide nav/search; no dashboard clutter before first win.
- WEAK: Core path clean but support pages still cluttered.
- FAIL: Learner must choose among many routes/cards before doing German.

Mobile gate
- PASS: 375px viewport works for root, intro, mission, checkpoint, review; no fixed nav/CTA overlap; tap targets usable.
- WEAK: Minor spacing issues but no blocked action.
- FAIL: CTA hidden, nav/search overlaps, text walls, or audio/progress unusable.

Pedagogy gate
- PASS: Every mission has situation → hear → produce → repair → win; examples are A1-safe and useful.
- WEAK: Some missions have weak repair or too much recognition.
- FAIL: Learner can complete by clicking choices only.

Exam-readiness gate
- PASS: Goethe A1 Hören/Lesen/Schreiben/Sprechen each have practice, checkpoints, and pass/remediate logic.
- WEAK: Sections covered but not timed/mock-like enough.
- FAIL: No clear proof the learner can pass A1.

Trust gate
- PASS: Browser QA, source checks, route checks, audio checks, TypeScript, and honest weakness report all exist.
- WEAK: Some evidence missing but no critical blocker.
- FAIL: Claims quality without evidence, stale QA, broken review link, or no weaknesses reported.

Launch recommendation rule:
- Public launch only if all gates PASS.
- Beta launch can happen with WEAK gates if scope is explicit and no FAIL exists in first learner path.
- Any FAIL in audio, first journey, or Goethe checkpoint blocks paid launch.

## 10. Boss decisions needed

Max 5. These are the only high-leverage decisions Boss should be asked, not broad “what do you think?” questions.

1. Launch scope
- Do we beta only the guided first path + Modules 1–2 first, or insist on all 18 modules before any paid beta?

2. Public character name
- Keep “Kuttan” publicly, or use adult-safe public name like Arun/Kiran while keeping Kuttan as nickname/flavor?

3. Audio quality bar
- Is current generated German audio acceptable for beta if technically clean, or does Boss want human-reviewed/native voice before paid launch?

4. AI correction policy
- Should writing/speaking feedback use local/rubric checks first and AI only as optional premium, or is server AI correction acceptable for beta?

5. Game visibility
- Should `/games` stay hidden below the guided course until missions/checkpoints are stable, or remain accessible as a secondary practice catalog?

## 11. Verification harness

Future agents must judge outputs against Boss’s vision without Boss checking every screen.

Required harness layers:

1. Source route guard
- Scan focused routes for global nav/search inclusion.
- Scan mission routes for banned APIs: `speechSynthesis`, JS-only `new Audio()` playback where not paired with visible verified UI, and `<audio controls>` on premium review paths unless explicitly allowed.
- Scan for banned visible labels: `GREETING SET`, `SAFE DEFAULTS`, `Heard`, debug/status copy, internal asset names, long progress meta.

2. Browser path guard
- Browser-click actual CTAs, do not trust source links.
- Verify `location.pathname` after each transition.
- Required path: `/` → `/intro` → first Module 1 mission → next mission → `/learn/2` → Module 2 mission.
- If a click appears inert, inspect DOM/hit testing before changing routing.

3. Audio guard
- For every mission audio URL:
  - HTTP 200.
  - Browser `readyState` clean.
  - Duration > 0.
  - Progress changes after play.
  - Error is null.
- Transcript hidden until after answer for Hören-style tasks.

4. Production guard
- Mission cannot complete without one learner output.
- At least one of: speaking self-report gated by audio completion, typed A1 output, dictation, form fill, roleplay reply.
- A pure multiple-choice path fails.

5. Repair guard
- Every mission must contain one concrete mistake/repair/noticing step.
- Must name the mistake in A1-simple language.
- Generic “try again” fails.

6. Cognitive-load guard
- First screen visible text budget:
  - one headline;
  - one short context sentence;
  - max 3 micro-promises or none;
  - one CTA;
  - no dashboard stats before action.
- Mission screen must have one primary action.
- Mobile screenshot required.

7. Canon guard
- Search high-risk Kuttan + Germany physical-placement patterns.
- Classify each hit as safe or violation.
- A1 named Kuttan physically in Berlin/Munich/Frankfurt/WG/Mensa/Bürgeramt fails unless it is a video call, mock, future rehearsal, imagination addressed to learner, or A2+ content.

8. Goethe guard
- Each module checkpoint maps to at least one Goethe section.
- Modules 2, 3, 14, 17, 18 require explicit checkpoint proof.
- Course-wide audit must cover Hören/Lesen/Schreiben/Sprechen.

9. Evidence report guard
- Every final report must include:
  - source files inspected;
  - files changed;
  - checks run and exact outputs;
  - browser path tested;
  - audio evidence;
  - visual notes/screenshots path if taken;
  - PASS/WEAK/FAIL scorecard;
  - weaknesses;
  - Boss decisions needed.

10. Anti-hallucination rules
- Do not call a route “reviewable” unless it was browser-clicked and audio-tested on the exact review URL.
- Do not call audio “good German” unless a human/audio-quality evaluator checked accent; technical playback only proves playback.
- Do not call the course launch-ready if any first-path, audio, production, or Goethe checkpoint gate is FAIL.
- Do not hide inherited failures; separate inherited blockers from current edits.
- Do not make “quality” claims from screenshots alone.
- Do not create new strategy docs when the needed action is code, QA, or a compact implementation map.

## 12. Vision-alignment scorecard

Each build output must be scored before it is called good.

Use this scale:
- PASS = acceptable for beta/review.
- WEAK = directionally right but needs concrete fix.
- FAIL = wrong-direction or blocks review.

Learner value
- PASS: Learner leaves with one named ability they can use.
- WEAK: Ability exists but is not clearly stated/proven.
- FAIL: Learner only consumed content or clicked recognition.

Malayali/Kerala identity
- PASS: Scene/examples feel made for Malayali beginners without caricature.
- WEAK: Kerala identity present but thin/decorative.
- FAIL: Generic German app with pasted names, or A1 Kuttan physically in Germany.

Goethe A1 proof
- PASS: Output maps to Hören/Lesen/Schreiben/Sprechen and checkpoint logic.
- WEAK: Goethe link exists but not measured.
- FAIL: No exam relevance beyond topic coverage.

Adult-safe tone
- PASS: Warm, peer-like, useful, not childish.
- WEAK: Slight mascot/hero copy but not damaging.
- FAIL: Cringe, cartoonish, patronizing, or noisy.

Audio/speaking/writing production
- PASS: Real audio + learner speaks/writes/dictates/forms before completion.
- WEAK: Production exists but too late or weakly gated.
- FAIL: Completion possible by passive listening/MC only.

Engagement
- PASS: Situation has stakes, quick win, next pull.
- WEAK: Mechanically useful but emotionally flat.
- FAIL: Boring drill, page browsing, no reason to continue.

Low cognitive load
- PASS: One clear action, minimal text, no competing UI.
- WEAK: Some extra labels/copy but task still clear.
- FAIL: Dashboard clutter, text wall, multiple CTAs, hidden action.

Premium trust
- PASS: Clean mobile UI, no broken controls, real audio progress, console clean enough.
- WEAK: Minor visual issues but no trust break.
- FAIL: broken audio, cheap native controls where banned, overlap, debug labels, dead links.

Launch-readiness
- PASS: Source + browser + audio + mobile + pedagogy + exam gates pass with evidence.
- WEAK: Beta-safe if scope is explicit.
- FAIL: Any P0 gate fails or evidence is missing.

Final rule:
- A build output is not “good” if any of these are FAIL: learner value, production, audio, first-path UX, Goethe proof, or premium trust.
- A build output with more than 2 WEAK scores cannot be sent to Boss as “ready”; it can only be sent as “promising but not enough.”

## Immediate recommendation

Do not keep polishing containers.

Next build lane should be:

1. Fix stale QA harness.
2. Prove `/` → `/intro` → Module 1 mission sequence by browser click and audio playback.
3. Make Module 2 the gold-standard mission module with all 5 missions passing hear → output → repair → win.
4. Then generalize the mission engine to Modules 3, 14, 17, 18 before touching lower-leverage pages.

This is the shortest route back to Boss trusting the project: not more promises, not more docs, but a verified guided learner path that creates real German ability.

## Boss summary

The vision is clear now: Adipoli should be a Kerala-rooted Goethe A1 mission coach, not a dashboard or flashcard app. Current root/intro are cleaner, TypeScript passes, local routes load, and Module 2 mobile QA passes. The weak spot is coherence: QA is partly stale, missions cover only M1/M2, production/audio floors are not guaranteed course-wide, and old dashboard/content systems still compete.

Next move: fix the QA harness, then prove the first path and Module 2 gold path with browser + audio evidence before any more UI polish.
