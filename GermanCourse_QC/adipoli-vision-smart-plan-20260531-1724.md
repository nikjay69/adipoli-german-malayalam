# Adipoli German — vision-to-SMART execution plan

Generated: 2026-05-31 17:24 Europe/Berlin
Workdir: `/shared/german-course`
Loop: 4h continuous vision reset, iteration 14

This is the execution contract. It is not another strategy document. The direction is clear enough to build against: stop polishing isolated UI, make the course a verified mission-based Goethe A1 product for Malayali learners.

## Evidence inspected in this reset

Mandatory vision/product docs synthesized:
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

Recent QC/run evidence inspected:
- `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`
- Iteration plans from this loop, especially 16:41, 16:52, 17:01, and 17:10.
- Recent continuous UI/UX checkpoints around conversation-scene-first, text reduction, M1/M2 audio gates, and stale QA.

Source inspected enough to judge feasibility:
- First-path routes: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`
- Mission routes: `src/app/missions/module-1/*/page.tsx`, `src/app/missions/module-2/*/page.tsx`
- Shared mission UI: `src/app/missions/module-2/_components/MissionUI.tsx`
- Mission data: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`
- Course content: `src/lib/content/modules/module-01.ts` through `module-18.ts`
- Audio/media structure: `public/audio/missions/`, `public/audio/hoeren/`, `public/audio/tts/`, `public/videos/`
- QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_module2_production_mobile.mjs`

Iteration 13 live checks:
- Time: `2026-05-31T17:14:54+02:00`
- Branch: `adipoli-page-by-page-reset-20260523-1802`
- Commit: `b201d05`
- Dirty/untracked status entries: `262`. Do not commit/push this as one blob.
- Local server root: HTTP 200.
- `npx tsc --noEmit --pretty false --incremental false` → PASS.
- HTTP 200 routes: `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, all 5 Module 2 mission routes.
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` → PASS: 8 voice-first M1/M2 missions, mobile width 390, nav/search hidden, no legacy builders on reviewed path.
- `python3 scripts/qa_mission_pilot.py` → FAIL on stale intro/start-path expectations: it still expects older snippets like `Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, and old first-mission constants.
- Browser click proof: `/` → `Enter the course` → `/intro` → `BEGIN LESSON 1` → `/missions/module-1/greet-frau-weber` PASS.
- Browser mission proof: first mission has one real `<audio>`, nav/search are hidden, audio `readyState=4`, `duration=4.752`, `currentTime=4.752`, `error=null`, progress `100%`, turn cue `Now answer.` appears after playback.
- Browser weakness spotted: first mission still exposes some product/process copy such as `No builder, no typing.` and accessibility/progress text appears in the snapshot. This is not a P0 blocker for the plan, but it must be cut/verified before calling the first mission launch-grade.

Iteration 14 verification refresh:
- Time: `2026-05-31T17:23:19+02:00`.
- Branch: `adipoli-page-by-page-reset-20260523-1802`.
- Commit: `b201d05`.
- Dirty/untracked status entries: `262`. Still not safe to commit/push as one blob.
- `npx tsc --noEmit --pretty false --incremental false` → PASS.
- Local HTTP 200 confirmed for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, and all 5 Module 2 mission routes.
- `python3 scripts/qa_mission_pilot.py` → FAIL on stale intro/start-path expectations: it expects old snippets/constant names (`Greet Frau Weber.`, `Start listening`, `FIRST_MISSION_PATH`, `?start=listen`) while the current product contract is `/` professional framing → `/intro` → first M1 mission.
- Source re-inspected in this iteration: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-1/greet-frau-weber/page.tsx`, `src/app/missions/module-2/self-intro/page.tsx`, `src/app/missions/module-2/_components/MissionUI.tsx`, and `scripts/qa_mission_pilot.py`.
- Current conclusion unchanged: the plan is right; the next execution lane must repair QA/source-contract drift before more product building.

## 1. Vision reconstruction — what Boss is trying to build

Boss is not trying to build “German lessons in an app.”

He is trying to build a premium, Kerala-rooted Goethe A1 course for Malayali beginners who want Germany but start with beginner fear, low confidence, exam pressure, and limited patience for textbook boredom.

Plain version:

Adipoli German should feel like a guided Kerala-to-Germany A1 coach. The learner opens the app, enters a small situation, hears real German, replies aloud or writes something useful, repairs one likely beginner mistake, and leaves with a named ability that helps in Goethe A1 and real life.

The course should feel made for Malayalis:
- Kerala situations, names, family pressure, Goethe Kochi prep, visa/exam stakes.
- Manglish-friendly support where it lowers fear.
- Kuttan as peer/older-cousin companion, not a childish mascot.
- Germany as dream/future/rehearsal during A1, not fake physical placement for Kuttan.
- Serious Goethe A1 readiness underneath the warmth.

The product should not feel like:
- a dashboard with lessons/games/search/practice tabs fighting for attention;
- a generic Duolingo clone with Kerala words pasted on top;
- a pile of scripts and generated videos;
- a lesson library where learners mostly click recognition answers;
- agent-made product theatre where screens get prettier but students still cannot hear, speak, write, repair mistakes, or pass checkpoints.

North star:

A mission-based German coach where every short session creates a real ability: hear, speak, write, repair, and feel progress.

## 2. Non-negotiables

If a build violates these, it is wrong direction even if it looks polished.

1. Malayali/Kerala identity stays central
- A1 physically happens in Kerala: Thrissur home, Goethe Kochi, Kerala public life, family pressure, exam prep, visa/airport arc.
- Kuttan must not casually be in Berlin, Munich, Frankfurt, German WGs, German supermarkets, or German universities during A1.
- Germany scenes are allowed as future dreams, video calls, mock/rehearsal, exam imagination, or learner-addressed scenarios.
- Kerala identity must help memory and motivation, not become decoration or caricature.

2. Goethe A1 seriousness
- The course must prepare Hören, Lesen, Schreiben, and Sprechen.
- Goethe A1 is not a badge; it must shape checkpoints, audio, writing, speaking, and remediation.
- Modules 2, 3, 14, 17, and 18 are exam-risk modules and need explicit proof gates.

3. Adult-safe tone
- Kuttan should feel like a peer or older cousin, not a cartoon child.
- Fun means useful, situational, culturally warm, and emotionally sticky.
- Avoid loud gamification, mascot chatter, school-kid reward clutter, cringe jokes, and patronizing copy.

4. Real audio
- No browser `SpeechSynthesis` for reviewable German.
- Audio must be real assets, served over HTTP, browser-testable, with visible duration/progress.
- Hören tasks must not show the transcript before the learner listens/answers.
- Technical playback proof does not prove the accent is good. Accent/naturalness remains human-review unless separately evaluated.

5. Production-first learning
- Every mission must require output before completion: speaking, writing, dictation, form fill, or roleplay reply.
- Recognition-only completion is not launch-grade.
- Sentence builders/chips are scaffolds or repair tools, not the hero experience.
- Phone-first means avoid long typing and fussy chip labor early; prefer hear → answer aloud → repair → tiny writing when exam-relevant.

6. Dialogue-scene-first UX
- The beginner path should feel like a tiny staged conversation: someone says a line, learner answers, feedback repairs the moment.
- If a learner must read paragraphs or hop through pages to understand the task, the UX failed.
- Every tap must map to input, response, noticing, repair, Goethe proof, or next pull. Otherwise cut it.

7. Self-sufficient launch-ready course
- The app must teach, practice, correct, review, and checkpoint inside the product.
- It cannot rely on Boss, Telegram, YouTube, or manual explanation to make sense.
- The learner should almost always know the next useful action without browsing.

8. Evidence before praise
- No route/module/course output may be called “good,” “reviewable,” or “launch-ready” without source inspection, browser playthrough, audio evidence if relevant, and PASS/WEAK/FAIL gates.
- A report with no weaknesses is suspect.

## 3. Current mismatch diagnosis

Blunt read: the project is no longer directionless. M1/M2 now contain real mission routes and real audio. The root and intro are much cleaner than earlier dashboard/hero-page versions. But the full product is still not coherent or launch-ready.

Current mismatches:

1. Too many old systems still exist
- The app still has old lesson routes, practice routes, games routes, tests, scripts, plan, onboarding, pricing, vocabulary, search, and dashboard surfaces.
- M1/M2 mission routes exist, but the rest of the course is still content/lesson-first.
- If the mission model is not made the operating system, the app will slide back into browse-and-pick dashboard mode.

2. QA contract drift is now a trust blocker
- Current browser path `/` → `/intro` → first M1 mission works locally.
- TypeScript passes and route status checks pass.
- Module 2 mobile mission QA passes.
- But `qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, and `qa_intro_start_path.mjs` encode older copy/route assumptions.
- This is dangerous either way: stale QA can create false alarms, and stale PASS checks can create false confidence. Phase 0 must repair the harness before more build claims.

3. Text/page/dashboard habit is reduced but not killed
- Root is now concise course framing.
- Intro is short and action-led.
- Mission routes are cleaner.
- But first mission still visibly leaks product/process language like `No builder, no typing.` and accessibility/progress copy appears in snapshots. This must be cut or moved to `sr-only`/QA-only before launch-grade review.
- Prior QC also shows repeated regressions into labels, progress ribbons, promise chips, system/status copy, and explanatory cards. Future agents must cut before they decorate.

4. Mission/product coherence is still incomplete
- Module 1 has 3 mission routes.
- Module 2 has 5 mission routes.
- Modules 3–18 do not yet have the same mission engine coverage.
- A good M2 pilot proves direction, not launch readiness.

5. Production is present in pilots, not guaranteed course-wide
- Docs require at least 3 production exercises per lesson: speaking, writing/free-text/type-answer, and dictation/listening.
- Historical audits show the course was recognition-heavy.
- M1/M2 mission routes now enforce voice-first patterns on reviewed paths, but launch readiness needs a production/audio floor across all modules.

6. Hören is still the largest exam risk
- Audio exists under `public/audio/missions/`, `public/audio/hoeren/`, and `public/audio/tts/`.
- Mission audio technically plays.
- But Goethe Hören readiness needs systematic audio-first drills, transcript hiding, replay behavior, dictation, and exam-style listening for Modules 3, 7, 9, 17, and 18.

7. Canon drift risk remains
- The A1 story bible is clear: Kuttan stays physically in Kerala until airport departure.
- Older docs/content/games have had Germany-setting drift.
- Future agents must scan Kuttan+Germany physical placement before calling content aligned.

8. Review-link friction damaged trust
- Boss has already seen broken/dead/raw Tailscale link issues in previous loops.
- Future review links must be verified on the exact local/Tailscale URL with route, audio, console, and state-transition checks before Boss sees them.

9. Incremental polish has been the trap
- Small UI fixes cleaned individual pages but did not answer Boss’s real question: “Is this course useful and interesting for students?”
- The next work must make the mission model executable across modules, not keep polishing containers.

## 4. Product model

The course unit is not a lesson page.

The course unit is a mission.

A mission is a short ability loop:

1. Situation
- One real learner-relevant scene.
- Example: “Frau Weber asks your name at Goethe Kochi.”
- The learner understands it in under 5 seconds.

2. Hear
- Real German audio appears early.
- Audio has visible duration/progress.
- Transcript is hidden for Hören-style tasks until the learner has listened/answered.

3. Respond
- Learner answers aloud, types a short answer, fills a form, takes dictation, or performs a roleplay reply.
- There must be at least one productive act before completion.

4. Notice
- One likely A1/Malayali beginner mistake is surfaced.
- Examples: `Ich bin komme` → `Ich komme`; English letter names while spelling; `Ich bin Kuttan` vs `Ich heiße Kuttan`; wrong formal/informal register.

5. Repair
- Learner fixes or repeats the corrected output.
- Repair must be specific, not generic “try again.”

6. Win
- End with a clear ability statement.
- Example: “You can greet Frau Weber formally and say your first classroom line.”

7. Pull
- Show the next mission as a natural continuation.
- No dashboard browse required.

Module loop:
- 3–6 missions per module.
- Each module has one checkpoint proving the module promise.
- Module 1 checkpoint: greet, thank, and exit a first classroom interaction.
- Module 2 checkpoint: self-introduction, spelling, origin, job/languages, short form fields.
- Module 3 checkpoint: numbers, times, dates, appointments via audio + spoken output.
- Module 14 checkpoint: form fill + polite formal request/message.
- Module 17 checkpoint: timed Hören/Lesen mini mock.
- Module 18 checkpoint: Schreiben/Sprechen mini mock and final airport departure proof.

Review/checkpoint loop:
- Completed missions create review items.
- SRS is not a random flashcard deck; it resurfaces phrases from missions.
- Checkpoint failure routes to a remediation mission, not a generic “review more” page.

Route model:
- `/` = compact professional course promise and one CTA.
- `/intro` = first action setup, not a marketing lecture.
- `/learn` = guided command center: next mission first, old lesson queue hidden/collapsed.
- `/learn/[moduleId]` = mission sequence and checkpoint, not a dashboard.
- `/missions/...` = focused mission route with nav/search hidden and one primary action.
- `/practice/*` = support tools unlocked from needs, not the first path.
- `/games` = secondary/remediation catalog only after mission/checkpoint model is stable.
- `/tests/*` = exam proof layer, not early clutter.

## 5. Student-interest plan — why a learner would continue

A learner continues if the product repeatedly proves: “I am becoming someone who can handle German.”

Interest drivers:

1. Story stakes
- Kuttan externalizes the learner’s own fear and ambition: family doubt, Goethe anxiety, visa pressure, embarrassment, small wins, airport departure.
- Story should create memory and motivation, not slow serious learners down.

2. Quick wins
- Within 45–90 seconds, the learner should hear German and do one useful action.
- First win: “I can reply `Guten Morgen, Frau Weber.`”
- Module 2 win: “I can introduce myself and spell my name.”

3. Confidence through repair
- The product should not just mark wrong. It should repair the exact beginner traps Malayali learners hit.
- Trust grows when the app feels like it knows the learner’s real mistakes.

4. Exam proof without panic
- Every mission should quietly map to Goethe A1 skills.
- Keep exam proof visible but small: Hören, Sprechen, Schreiben, Lesen transfer, not scary badges.

5. Cultural fit
- Use Kerala/Manglish context when it reduces fear or makes examples memorable.
- Do not overuse Malayalam so German disappears.
- Use adult situations: Goethe class, job/study, forms, family, travel prep, money, appointments, official requests.

6. Retention pull
- Each mission ends with the next real ability, not a menu of options.
- Good pull: “Next: Frau Weber asks you to spell your name.”
- Bad pull: “Explore games, scripts, tests, pricing, practice, vocabulary.”

7. Premium trust
- Real audio.
- Clean mobile flow.
- No broken controls.
- No visible internal labels or debug/status copy.
- Honest QA with weaknesses.

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
- `tsc` passes.
- Route-status check passes for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1 mission routes, all M2 mission routes.
- QA no longer asserts stale copy such as old `Greet Frau Weber.` / `Start listening <ArrowRight` snippets unless the product contract explicitly requires them.
- QA checks behavior: actual click path, audio playback, nav/search suppression, state transition, production required, repair present, no banned labels, no browser TTS.
- QA reports use PASS/WEAK/FAIL and include weaknesses.

What NOT to do:
- Do not rewrite current product copy just to satisfy stale QA.
- Do not add new strategy docs.
- Do not start Module 3 before the proof harness is trustworthy.

Phase 1 — Lock the first learner journey

Timebox: 2 days.

Outcome:
- `/` → `/intro` → first Module 1 mission → full Module 1 sequence → Module 2 start works as one guided path.

Files/routes affected:
- `src/app/page.tsx`
- `src/app/intro/page.tsx`
- `src/app/learn/page.tsx`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/missions/module-1/*`
- `src/lib/missions/module1.ts`
- layout/nav/search suppression code

Acceptance criteria:
- Browser clicks prove final `location.pathname` after each CTA.
- First mission gives audio and learner reply within 90 seconds.
- Mission 1 → 2 → 3 → Module 2 handoff works without dashboard browsing.
- Focused routes hide global nav/search.
- Mobile viewport has no CTA/nav/search overlap.
- Audio has `readyState`, duration, progress movement, and `error=null` proof.
- Completion requires voice or writing/repair; passive click-through fails.
- Visible mission copy has no product-theatre labels like `No builder`, `no typing`, internal QA terms, or debug/status wording.

What NOT to do:
- Do not polish marketing containers.
- Do not add another onboarding page.
- Do not expose the old lesson queue before the first win.

Phase 2 — Make Module 2 the gold-standard mission module

Timebox: 3 days.

Outcome:
- Module 2 proves the product model: self-intro, name spelling, origin, job/languages, final 20-second self-introduction.

Files/routes affected:
- `src/app/missions/module-2/*`
- `src/app/missions/module-2/_components/MissionUI.tsx`
- `src/lib/missions/module2.ts`
- `public/audio/missions/module-2/*`
- `/learn/2` route logic

Acceptance criteria:
- All 5 Module 2 missions load and play with real audio.
- Each mission includes situation → hear → answer aloud/write → repair → ability win → next pull.
- Final Module 2 checkpoint produces a 5–7 sentence A1-safe self-introduction plus name spelling and basic form-fill proof.
- No mission can complete by passive listening or multiple choice only.
- Mobile QA passes at 390px width.
- No browser `speechSynthesis`, no hidden JS-only audio, no ugly native controls where the premium path uses custom audio UI.

What NOT to do:
- Do not add more Module 2 promise cards.
- Do not make chip builders or long typing the hero experience.
- Do not call Module 2 “done” from route loads alone.

Phase 3 — Convert the remaining course into a mission spine

Timebox: 7–10 days for blueprint + first implementation wave.

Outcome:
- Every module has a concrete mission sequence and checkpoint before broad coding continues.

Files/routes affected:
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md` as the source reference, not another sprawling strategy doc.
- `src/lib/missions/` for module mission data.
- `src/app/missions/module-{n}/...` only after shared mission primitives are stable.
- `src/lib/content/modules/module-*.ts` where canon/content gaps block missions.

Acceptance criteria:
- All 18 modules have: learner promise, 3–6 missions, exact output, Goethe mapping, audio need, production need, repair need, checkpoint.
- First implementation wave covers Modules 1–3 because they control activation.
- Exam-risk wave covers Modules 14, 17, and 18 because they control launch trust.
- Mission data reuses shared primitives; no copy-paste route chaos.

What NOT to do:
- Do not build all routes before proving the engine.
- Do not line-edit every lesson script during mission modeling.
- Do not hide weak modules behind “coming soon” unless Boss approves beta scope reduction.

Phase 4 — Production floor and audio floor

Timebox: 7 days after mission spine stabilizes.

Outcome:
- The course stops being recognition-heavy. Every lesson has launch-grade production practice and required Hören coverage.

Files/routes affected:
- `src/lib/content/modules/module-01.ts` through `module-18.ts`
- `public/audio/hoeren/`
- `public/audio/missions/`
- `scripts/audit-*`
- audio generation scripts only within approved/free/local limits

Acceptance criteria:
- Every lesson has at least 3 production exercises: speaking, free-text/type-answer, listening/dictation.
- Audio-backed tasks have existing files and HTTP 200.
- Hören tasks hide transcript until after answer.
- Modules 3, 7, 9, 14, 17, 18 have audio-first exam-style drills.
- Goethe Wortliste coverage audit exists and flags out-of-scope/missing core words.

What NOT to do:
- Do not mass-add generic exercises to improve counts.
- Do not leave dictation as text-only.
- Do not spend paid API/media credits without approval.

Phase 5 — Launch readiness and beta proof

Timebox: 5–7 days after core path passes.

Outcome:
- The course can be shown to beta learners without Boss apologizing for it.

Files/routes affected:
- `GermanCourse_QC/launch-readiness-*.md`
- `src/app/tests/*`, `src/app/practice/*`, `src/app/games/*` only within approved launch/beta scope.
- Auth/pricing/deployment only after Boss approves.

Acceptance criteria:
- Full first-journey browser playthrough passes locally and on exact Tailscale review URL.
- Mobile visual QA for root, intro, first mission, Module 2 final checkpoint, and one exam checkpoint.
- No broken audio/images on audited paths.
- Beta scope is explicit: included, hidden, not ready.
- PASS/WEAK/FAIL report covers content, audio, UX, mobile, pedagogy, exam readiness, trust.

What NOT to do:
- Do not deploy/push/merge without approval.
- Do not touch pricing/payment/auth business logic unless asked.
- Do not claim launch-ready from TypeScript or screenshots alone.

## 7. First 7 days execution plan

Day 1 — QA truth + first path proof

Deliverables:
- Patch stale start-path QA expectations to behavior-based checks.
- Run `tsc`, route-status curl, mission QA, intro/start path QA, Module 2 mobile QA.
- Browser-play `/` → `/intro` → first Module 1 mission and verify audio.
- Write `GermanCourse_QC/day1-first-path-qa-YYYYMMDD.md`.

QA gates:
- First CTA path works by browser click.
- QA no longer fails on stale copy snippets.
- First mission has real audio, progress, state transition, and learner output.
- Weaknesses listed.

Day 2 — Module 1 mission closure

Deliverables:
- Verify all 3 Module 1 missions form one uninterrupted guided sequence.
- Completion advances to next mission and then Module 2.
- Cut visible system/meta labels, including `No builder`, `no typing`, internal progress labels, or QA-status language.

QA gates:
- Mobile + desktop browser checks.
- Audio duration/progress visible.
- Completion requires reply/repair.
- No dashboard browse before Module 2.
- Visible learner copy is task/action language only.

Day 3 — Module 2 gold path source audit

Deliverables:
- Inspect all 5 Module 2 mission definitions and route pages.
- Score each mission against situation/hear/output/repair/win/pull.
- Update QA to check all 5 routes behavior, not just loads.

QA gates:
- Every mission route HTTP 200.
- Every audio URL HTTP 200 and browser-playable.
- No `speechSynthesis`, no hidden JS-only audio, no banned labels.

Day 4 — Module 2 final checkpoint

Deliverables:
- Verify/build final self-intro checkpoint: 5–7 A1-safe sentences, spelling, origin, job/languages.
- Add rubric for acceptable output.
- Keep mobile typing burden sane.

QA gates:
- Learner cannot pass without speaking or writing.
- Common mistakes are repaired.
- Ability win is visible and exam-mapped.

Day 5 — Mission map for Modules 3, 14, 17, 18

Deliverables:
- Produce compact implementation map for highest exam-risk modules.
- Define exact output, route/data files, audio assets needed, checkpoint type.
- Keep it under QC or patch active spine/index; do not create broad strategy sprawl.

QA gates:
- Each mission has output, Goethe section, audio need, production need, repair need.
- Hören gaps are explicit.

Day 6 — Production/audio floor audit

Deliverables:
- Run or add a read-only audit counting speaking, free-text/type-answer, dictation/listening per lesson.
- Output missing-audio manifest.
- Prioritize P0 lessons.

QA gates:
- Report lists exact module/lesson gaps.
- No fake audio if a file does not exist.
- No mass exercise patching yet.

Day 7 — Beta-scope readiness report

Deliverables:
- One blunt report: Built / Why / Verified / Weak / Need Boss.
- Recommend beta scope: likely first path + Modules 1–2 + selected exam/practice surfaces, not full public launch unless all gates pass.

QA gates:
- PASS/WEAK/FAIL across content, audio, UX, mobile, pedagogy, exam readiness, trust.
- Max 5 Boss decisions.

## 8. First 48 hours exact build lane

This is the next concrete agent lane. No asking Boss unless a forbidden area is hit.

Hour 0–2: Freeze evidence baseline
- Record branch, commit, dirty count, and relevant dirty files in QC.
- Run `npx tsc --noEmit --pretty false --incremental false`.
- Run route-status curl for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
- Run existing QA scripts and record exact failures.

Hour 2–5: Fix stale QA harness
- Update `scripts/qa_mission_pilot.py` and related start-path scripts to current chosen contract: `/` compact framing → `/intro` first action → M1 audio mission.
- Assert behavior, not old copy.
- Required checks: CTA route, focused nav/search suppression, real audio, audio duration/progress, mission output gate, repair step, no banned labels, no browser TTS.

Hour 5–8: Browser-play first journey
- Use local server.
- Click `/` → `/intro` → `/missions/module-1/greet-frau-weber`.
- Inspect `location.pathname` after each step.
- Play mission audio and verify `readyState`, duration, progress movement, `error=null`.
- Verify learner next action unlocks only after required audio behavior.

Hour 8–12: Module 1 sequence
- Inspect `src/lib/missions/module1.ts` and all Module 1 mission route files.
- Verify mission 1 → 2 → 3 → Module 2 progression.
- Patch only safe blockers: wrong links, stale labels, missing handoff, obvious clutter.
- Specifically remove visible product/process copy such as `No builder, no typing`; replace with learner-task language only.
- Do not redesign containers.

Hour 12–18: Module 2 sequence audit
- Inspect `src/lib/missions/module2.ts` and all 5 Module 2 mission route files.
- Verify all Module 2 audio files serve locally.
- Score each mission: situation, hear, output, repair, win, pull.
- Mark PASS/WEAK/FAIL.

Hour 18–24: Module 2 gold path patch lane
- Patch only high-leverage safe issues:
  - missing next links;
  - visible debug/system labels;
  - output not required;
  - audio progress not visible;
  - repair step absent where data already supports it.
- Run targeted QA after each patch.

Hour 24–30: Production floor inventory
- Run or add a read-only audit for production types per lesson.
- Output: module, lesson, speaking count, free-text/type-answer count, dictation/listening count, audio present/missing.
- Do not mass-add exercises yet.

Hour 30–36: Canon drift inventory
- Search source/content/scripts/games for high-risk physical Germany settings attached to Kuttan in A1.
- Classify each as safe future/imagination/video-call/mock vs canon violation.
- Patch only obvious one-line safe fixes; report the rest.

Hour 36–42: Mission spine implementation map
- For Modules 3, 14, 17, 18, define mission outputs and checkpoints.
- Include route/data/audio/files affected.
- Keep it executable, not an essay.

Hour 42–48: Final 48h report
- Write `GermanCourse_QC/first-48h-execution-report-YYYYMMDD.md`.
- Include Built / Why / Verified / Weak / Need Boss.
- Recommend next 5 build tasks.

## 9. Definition of launch-ready

Launch-ready means a real beginner can use the course without Boss explaining it and get measurably closer to Goethe A1.

Content gate
- PASS: Every module has mission sequence + checkpoint; every lesson has story/context, teaching support, review, and production practice.
- WEAK: Modules 1–3 strong; later modules content-complete but mission/checkpoint uneven.
- FAIL: Learner browses generic lessons/exercises without guided ability outcomes.

Audio gate
- PASS: All Hören/dictation/mission audio is real, served over HTTP, has visible duration/progress, and hides transcripts until appropriate.
- WEAK: Mission audio works, but exam modules still have gaps.
- FAIL: Browser TTS, missing audio, transcript-first listening, broken controls, or untested review URL.

UX gate
- PASS: One clear next action; focused routes hide nav/search; no dashboard clutter before first win; no learner-facing product-process copy.
- WEAK: Core path clean but support pages cluttered.
- FAIL: Learner must choose among many routes/cards before doing German, or sees internal/status/debug language.

Mobile gate
- PASS: 375–390px viewport works for root, intro, mission, checkpoint, review; no overlap; tap targets usable.
- WEAK: Minor spacing issues but no blocked action.
- FAIL: CTA hidden, nav/search overlap, text walls, unusable audio/progress.

Pedagogy gate
- PASS: Every mission has situation → hear → produce → repair → win; German is A1-safe and useful.
- WEAK: Some missions have weak repair or too much recognition.
- FAIL: Learner can complete by clicking choices only.

Exam-readiness gate
- PASS: Goethe A1 Hören, Lesen, Schreiben, Sprechen each have practice, checkpoints, scoring/remediation.
- WEAK: Sections covered but not timed/mock-like enough.
- FAIL: No clear proof the learner can pass A1.

Trust gate
- PASS: Source checks, route checks, browser playthrough, audio checks, TypeScript, mobile QA, visual notes, and honest weaknesses exist.
- WEAK: Some evidence missing but no critical blocker.
- FAIL: Claims quality without evidence, stale QA, broken review link, or no weaknesses reported.

Launch rule:
- Public launch only if all gates PASS.
- Beta launch can happen with WEAK gates if scope is explicit and no FAIL exists in the first learner path.
- Any FAIL in first journey, audio, production, or Goethe checkpoint blocks paid launch.

## 10. Boss decisions needed

Max 5. These are high-leverage decisions, not broad “what do you think?” questions.

1. Beta scope
- Ship/test guided first path + Modules 1–2 first, or wait until all 18 modules have mission/checkpoint coverage?

2. Public character name
- Keep “Kuttan” publicly, or use an adult-safe public name like Arun/Kiran while keeping Kuttan as nickname/flavor?

3. Audio quality bar
- Is current generated German audio acceptable for beta if technically clean, or does paid launch require native/human-reviewed voice?

4. AI correction policy
- Use local/rubric checks first and AI correction only as optional premium, or allow server AI feedback during beta?

5. Game visibility
- Hide `/games` behind the guided course until missions/checkpoints are stable, or keep it accessible as secondary practice?

## 11. Verification harness

Future agents must judge outputs against Boss’s vision without Boss checking every screen.

Required harness layers:

1. Source contract guard
- Scan focused routes for global nav/search leaks.
- Scan mission routes for banned APIs: `speechSynthesis`, review-path JS-only `new Audio()`, hidden audio without visible verified UI.
- Scan for banned learner-facing labels: internal asset names, debug/status copy, `GREETING SET`, `SAFE DEFAULTS`, visible `Heard`, visible `Replay` clutter, old builder counters, long progress meta, `No builder`, `no typing`, or product-process explanations.

2. Route/browser guard
- Browser-click actual CTAs; do not trust source links.
- Verify `location.pathname` after each transition.
- Required first path: `/` → `/intro` → first Module 1 mission → next Module 1 mission → Module 2 mission.
- If a click appears inert, inspect DOM/hit-testing before changing routing.

3. Audio guard
For every reviewed mission audio URL:
- HTTP 200.
- Browser `readyState` clean.
- Duration > 0.
- Progress changes after play.
- `error=null`.
- Visible duration/progress on custom audio UI.
- Transcript hidden until after answer for Hören-style tasks.

4. Production guard
- Mission cannot complete without learner output.
- At least one output required: speaking self-report gated by audio completion, short typed A1 answer, dictation, form fill, or roleplay reply.
- Pure multiple-choice completion fails.

5. Repair guard
- Every mission contains one concrete mistake/repair/noticing step.
- The mistake must be A1-specific and useful.
- Generic “try again” fails.

6. Cognitive-load guard
First screen visible text budget:
- one headline;
- one short context sentence;
- max 3 micro-promises or none;
- one CTA;
- no dashboard stats before action.

Mission screen rules:
- one primary action;
- no competing CTAs;
- no visible system/product-process labels;
- mobile screenshot/visual check required for reviewable routes.

7. Canon guard
- Search high-risk Kuttan + Germany physical-placement patterns.
- Classify every hit: safe future/imagination/video-call/mock vs violation.
- A1 Kuttan physically in Berlin/Munich/Frankfurt/WG/Mensa/Bürgeramt fails unless explicitly future, mock, video-call, imagination, or A2+.

8. Goethe guard
- Each module checkpoint maps to Goethe A1 skill(s).
- Modules 2, 3, 14, 17, 18 require explicit checkpoint proof.
- Course-wide audit must cover Hören/Lesen/Schreiben/Sprechen.

9. Evidence report guard
Every final build report must include:
- source files inspected;
- files changed;
- checks run and exact outputs;
- browser path tested;
- audio evidence;
- visual notes/screenshots path if visual work;
- content sample checks if pedagogy/content changed;
- PASS/WEAK/FAIL scorecard;
- weaknesses;
- Boss decisions needed.

10. Anti-hallucination rules
- Do not call a route “reviewable” unless it was browser-clicked and audio-tested on the exact review URL.
- Do not call audio “good German” unless a human/audio-quality evaluator checked accent.
- Do not call the course launch-ready if first-path, audio, production, or Goethe checkpoint gates fail.
- Do not hide inherited failures; separate them from current edits.
- Do not make quality claims from screenshots alone.
- Do not create new strategy docs when the needed output is code, QA, or a compact implementation map.

## 12. Vision-alignment scorecard

Each build output must be scored before it is called good.

Scale:
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
- PASS: Real audio plus learner speaks/writes/dictates/forms before completion.
- WEAK: Production exists but too late or weakly gated.
- FAIL: Completion possible by passive listening or MC only.

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
- FAIL: Broken audio, cheap controls where banned, overlap, debug labels, dead links.

Launch-readiness
- PASS: Source + browser + audio + mobile + pedagogy + exam gates pass with evidence.
- WEAK: Beta-safe if scope is explicit.
- FAIL: Any P0 gate fails or evidence is missing.

Final rule:
- A build output is not “good” if any of these are FAIL: learner value, production, audio, first-path UX, Goethe proof, premium trust.
- A build output with more than 2 WEAK scores cannot be sent to Boss as ready; it can only be sent as “promising but not enough.”

## Immediate recommendation

Do not keep polishing containers.

Next build lane:
1. Fix the stale QA harness.
2. Prove `/` → `/intro` → Module 1 mission sequence by browser click and audio playback.
3. Cut visible product-process copy from the first mission.
4. Make Module 2 the gold-standard mission module with all 5 missions passing hear → output → repair → win.
5. Then generalize the mission engine to Modules 3, 14, 17, 18.

This is the shortest route back to trust: not more promises, not more docs, but a verified guided learner path that creates real German ability.

## Boss summary

The vision is clear: Adipoli should be a Kerala-rooted Goethe A1 mission coach, not a dashboard, generic flashcard app, or pile of scripts.

Current state: root/intro are cleaner; local routes load; TypeScript passes; browser path `/` → `/intro` → first M1 mission works; first mission audio plays; M1/M2 mobile mission QA passes.

Main weakness: coherence and trust. QA is partly stale, missions only cover M1/M2, course-wide production/audio floors are not guaranteed, and old dashboard/content systems still exist. I also caught one concrete product-copy leak on the first mission: `No builder, no typing.` That needs cutting before launch-grade review.

Next move: fix the QA harness first, then prove the full first path and Module 2 gold path with browser + audio evidence before touching more UI polish.
