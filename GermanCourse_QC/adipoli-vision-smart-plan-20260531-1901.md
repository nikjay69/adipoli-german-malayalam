# Adipoli German — vision-to-SMART execution plan

Generated: 2026-05-31 19:01 Europe/Berlin
Workdir: `/shared/german-course`
Loop: 4h continuous vision reset, iteration 30 / final synthesis

This is the execution contract after Boss said he is losing faith. It is not another loose strategy doc.

Blunt reconstruction: Adipoli German must become a Kerala-rooted, adult-safe, Goethe A1 mission coach for Malayali beginners. A learner should enter one small scene, hear real German, respond aloud or write something useful, repair one likely beginner mistake, and leave with a named A1 ability. If a change does not move the app toward that loop, it is probably avoidance.

## Evidence inspected in this reset

Vision/product docs synthesized across this 4h loop:
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

Source inspected enough to judge feasibility:
- First path: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`
- Mission routes: all 8 routes under `src/app/missions/module-1/*/page.tsx` and `src/app/missions/module-2/*/page.tsx`
- Shared mission UI: `src/app/missions/module-2/_components/MissionUI.tsx`
- Mission data: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`
- Course content: `src/lib/content/modules/module-01.ts` through `module-18.ts` structure and inventories
- Audio/media structure: `public/audio/missions/`, `public/audio/hoeren/`, `public/audio/tts/`, `public/videos/`
- QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_module2_production_mobile.mjs`

Fresh iteration-30 final verification:
- Time checked: `2026-05-31T19:01+02:00`.
- Branch: `adipoli-page-by-page-reset-20260523-1802`.
- Commit: `b201d05`.
- Dirty/untracked status entries: `262`. Do not commit or push this as one blob.
- Diff scale excluding `GermanCourse_QC/`: 113 changed tracked files, `40117 insertions(+)`, `12439 deletions(-)`. This is inherited loop work plus broad prior churn; separate before any commit.
- Source inspected across the loop and refreshed in iteration 30: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, all Module 1/2 mission routes, shared `MissionUI`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, module content structure, audio folders, and QA scripts.
- Current route contract in source: `/` gives compact professional framing; `/intro` gives first-action setup; `/intro` routes to `/missions/module-1/greet-frau-weber`; `/learn` and `/learn/[moduleId]` put the next M1/M2 mission above old lesson queues.
- Inventory from this loop: 3 Module 1 mission routes, 5 Module 2 mission routes, 18 module content files, 1808 audio files under `public/audio`, and 23 Module 2 mission MP3s in the inspected mission folders.
- Course-content quick count: 18 module files; lesson/exercise structure is present across all modules, but the audit still needs to prove the production floor per lesson rather than trust raw counts.
- `npx tsc --noEmit --pretty false --incremental false`: PASS.
- Route-status curl: HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, and all 5 Module 2 mission routes.
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`: PASS for all 8 voice-first M1/M2 missions at 390px mobile width; nav/search hidden; no legacy builders on reviewed path.
- `python3 scripts/qa_mission_pilot.py`: partial PASS then FAIL. Custom audio, opening text budget, visible meta-label bans, compact choice subtitles, no-dead-button choice flow, compact repair explainer, and scene-copy checks pass. It still fails on stale intro/start-path snippets: `Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, `FIRST_MISSION_PATH`, and `?start=listen`.
- Earlier loop evidence already captured in the checkpoint: browser click proof `/` -> `/intro` -> first M1 mission; first-mission audio proof with `readyState=4`, duration/progress movement, `error=null`; browser console clean.
- Current conclusion did not change: first-path/M1/M2 direction is worth preserving; trust is blocked by stale QA, incomplete mission coverage beyond M2, and unproven course-wide production/audio floors.

Current conclusion:
- M1/M2 are directionally worth preserving: real mission routes, real audio UI, voice-first mobile QA, route availability, browser first-path proof, first-mission audio proof, and TypeScript are all clean.
- The blocker is trust/coherence, not a broken compiler: stale QA, incomplete mission coverage beyond M2, and course-wide production/audio floors are not guaranteed.
- Next build lane must repair the verification harness before more UI polish. More container polish is avoidance.

## 1. Vision reconstruction — what Boss is trying to build

Boss is trying to build a full paid web-app course, not a pile of German content.

Plain language version:

Adipoli German should take a Malayali beginner from zero German to credible Goethe A1 readiness through a guided Kerala-to-Germany story course. The product should feel like it was built for their actual life: Kerala home/family pressure, Goethe Kochi, visa/exam anxiety, job/study ambition, Manglish support where useful, and serious German output.

The learner journey should feel like:
- I know where I am in the story.
- I hear one real German line early.
- I answer aloud or write a short useful response.
- The app repairs a beginner mistake I might actually make.
- I end with a clear ability: “I can greet Frau Weber,” “I can spell my name,” “I can catch an appointment time,” “I can fill a form field.”
- The next mission is obvious without browsing.

The product should not feel like:
- a dashboard with lessons, games, search, practice, vocabulary, tests, scripts, and streaks fighting for attention;
- a generic German A1 app with Kerala names pasted on top;
- a YouTube/script library;
- a cute mascot product for children;
- a tap-heavy sentence-builder treadmill;
- a polished shell where learners still cannot hear, speak, write, repair, and pass checkpoints.

The north star:

A mission-based German coach where every short session creates a real A1 ability: hear, speak, write, repair, and feel progress.

## 2. Non-negotiables

If a build violates these, it is wrong direction even if it looks good.

1. Malayali/Kerala identity
- A1 physically happens in Kerala: Thrissur home, Goethe Kochi, Kerala public life, family pressure, visa prep, Kochi airport departure.
- Kuttan does not physically appear in Berlin, Munich, Frankfurt, German WGs, German supermarkets, German universities, Bürgeramt, Mensa, etc. during A1.
- Germany can appear as future dream, cousin video call, mock exam, learner imagination, form simulation, or A2+ later arc.
- Kerala identity must help motivation and memory. It must not be caricature or decoration.

2. Goethe A1 seriousness
- Hören, Lesen, Schreiben, and Sprechen must all be taught, practiced, checkpointed, and remediated.
- Goethe A1 is not a marketing badge. It controls the product design.
- Exam-risk modules need explicit proof: Module 2 self-intro, Module 3 numbers/time, Module 14 forms/formality, Module 17 exam skills, Module 18 final mock.

3. Adult-safe tone
- Kuttan is a peer/older-cousin learner, not a childish mascot.
- Appu is a silent UI mascot only, not a speaking story character.
- Humor should be warm and useful, not cringe, noisy, or school-kid energy.

4. Real audio
- No browser `SpeechSynthesis` for reviewable German.
- German audio must be real assets, HTTP-served, browser-playable, with visible duration and progress.
- Technical playback proof is not the same as native-sounding German. Accent/naturalness needs human/audio-quality review.

5. Production-first learning
- Recognition-only completion is not launch-grade.
- Every mission needs output: speaking, writing, dictation, form-fill, roleplay reply, or equivalent.
- Hard lesson floor: at least 3 production exercises per lesson: speaking, free-text/type-answer, and listening/dictation.
- Builders/chips are scaffolds or repairs, not the hero interaction.

6. Dialogue-scene-first UX
- Beginner flow should feel like a two-person scene: Frau Weber/examiner says one line, learner responds, app repairs.
- If the learner must read paragraphs or pass through multiple explanation pages before doing German, the UX failed.
- Every tap must map to input, response, noticing, repair, Goethe proof, or next pull. Otherwise cut it.

7. Self-sufficient launch-ready course
- The app must teach, practice, correct, review, and checkpoint without Boss explaining the course manually.
- Learner should almost always know the next useful action.
- Old support surfaces can exist, but the first path must be guided.

8. Evidence before praise
- No output is “good,” “reviewable,” or “launch-ready” without source inspection, browser playthrough, audio proof when relevant, mobile check, and PASS/WEAK/FAIL scoring.
- A report with no weaknesses is suspicious.

## 3. Current mismatch diagnosis

The project is no longer directionless. The current M1/M2 mission work is much closer to Boss’s vision than the older dashboard/course-library model. But the product is still not coherent or launch-ready.

Current mismatches:

1. Old systems still surround the new mission model
- The app still has lesson routes, practice routes, games, tests, scripts, plan, vocabulary, search, pricing, onboarding, and dashboard surfaces.
- M1/M2 now have mission routes, but Modules 3-18 remain mostly lesson/content-first.
- Risk: if the mission model is not made the operating system, the app slides back into browse-and-pick dashboard mode.

2. QA contract drift is a trust blocker
- Current product contract: `/` concise professional framing -> `/intro` first action setup -> first M1 audio mission.
- Browser proof says this path works.
- Stale QA scripts still expect older direct-start copy and constants.
- This creates false alarms now and could create false confidence later. The harness must be repaired before product claims continue.

3. Text-heavy/page-heavy habits are reduced, not eliminated
- Root and intro are cleaner than earlier versions, but root still has course-framing list copy.
- `/learn` and `/learn/[moduleId]` lead with missions for M1/M2, but old lesson queues and support surfaces still exist behind collapsed/secondary UI.
- Product-process copy already leaked once (`No builder, no typing`) and was removed; the harness must ban that entire class of visible copy.

4. Mission coverage is incomplete
- Current mission routes: 3 in Module 1 and 5 in Module 2.
- Modules 3-18 need mission maps/checkpoints before broad implementation.
- A good M2 pilot proves direction, not launch readiness.

5. Production is not guaranteed course-wide
- Docs and audits repeatedly flag recognition-heavy lessons.
- M1/M2 mission routes pass voice-first mobile QA, but that does not prove all 90 lessons have speaking, writing, dictation/listening, and repair.

6. Hören remains the largest exam risk
- `GOETHE_A1_EXAM_MAP.md` calls real listening audio the critical gap.
- Current assets exist under `public/audio/missions/`, `public/audio/hoeren/`, and `public/audio/tts/`, but coverage is not guaranteed.
- Modules 3, 7, 9, 17, and 18 need audio-first exam-style drills.

7. Canon drift risk remains
- `A1_STORY_BIBLE.md` is explicit: Kuttan physically stays in Kerala during A1.
- Older docs/content had Germany-setting drift.
- Every future content pass must classify Kuttan/Germany hits as safe future/imagination/video-call/mock or violation.

8. Games are not the main path
- `GAME_AUDIT.md` says several games have real value, but the catalog can become a wall.
- Games should support missions/checkpoints as remediation or practice, not compete with the first learner journey.

9. Review-link friction damaged trust
- Boss has previously seen broken/dead/raw Tailscale review issues.
- Future review links must be verified on the exact URL with route, console, state transition, and audio checks before Boss sees them.

10. Incremental polish was the trap
- UI polish fixed surfaces but did not answer: “Is this useful and interesting for students?”
- The next work must make the mission model executable across the course, not keep changing containers.

## 4. Product model

Course unit: mission.

A mission is one short ability loop:

1. Situation
- One learner-relevant scene.
- Example: “Frau Weber asks your name at Goethe Kochi.”
- Learner understands the situation within 5 seconds.

2. Hear
- Real German audio appears early.
- Audio has duration/progress.
- For Hören tasks, transcript stays hidden until the learner has listened/answered.

3. Respond
- Learner answers aloud, writes/types a short answer, fills a form, takes dictation, or performs a roleplay reply.
- Passive click-through is not enough.

4. Notice
- One likely A1/Malayali beginner trap appears.
- Examples: `Ich bin komme` -> `Ich komme`; English letter names while spelling; wrong `du/Sie`; `Ich bin Kuttan` vs `Ich heiße Kuttan`.

5. Repair
- Learner corrects or repeats the repaired output.
- Feedback is specific, not “try again.”

6. Win
- End with a named ability.
- Example: “You can greet Frau Weber formally and say your first classroom line.”

7. Pull
- The next mission follows naturally.
- No dashboard browse needed.

Module loop:
- 3-6 missions per module.
- One module checkpoint proves the module promise.
- Mission sequence creates a story/ability arc, not a list of lessons.

Review/checkpoint loop:
- Completed missions create review items.
- SRS resurfaces mission phrases in new scenes, not random deck drilling.
- Checkpoint failure routes to remediation mission, not vague “review more.”

Route model:
- `/` = compact professional promise and one CTA.
- `/intro` = first action setup, not a marketing lecture.
- `/learn` = guided command center: next mission first, old queue hidden/collapsed.
- `/learn/[moduleId]` = mission sequence and checkpoint, not a dashboard.
- `/missions/...` = focused scene route with nav/search hidden and one primary action.
- `/practice/*` = support tools unlocked by need.
- `/games` = secondary/remediation catalog after mission/checkpoint model is stable.
- `/tests/*` = exam proof layer.

## 5. Student-interest plan — why a learner would continue

A learner continues when the app repeatedly proves: “I am becoming someone who can handle German.”

1. Story stakes
- Kuttan externalizes the learner’s fear and ambition: family doubt, Goethe anxiety, visa pressure, embarrassment, burnout, airport departure.
- Story is useful only when it creates memory, stakes, or motivation.

2. Quick wins
- Within 45-90 seconds, learner hears German and does one useful action.
- First win: “I can answer `Guten Morgen, Frau Weber.`”
- Module 2 win: “I can introduce myself and spell my name.”

3. Confidence through repair
- The app repairs mistakes Malayali beginners actually make.
- Trust grows when the product feels like it knows the learner’s real traps.

4. Exam proof without panic
- Goethe A1 skill transfer is visible but not terrifying.
- Every mission should map to Hören, Lesen, Schreiben, or Sprechen.

5. Cultural fit
- Kerala/Manglish context lowers fear and creates memory.
- Use adult settings: Goethe class, family, job/study, forms, money, appointments, official requests, travel prep.
- Do not overuse Malayalam until German disappears.

6. Retention pull
- Each mission ends with the next real ability.
- Good: “Next: Frau Weber asks you to spell your name.”
- Bad: “Explore games, tests, scripts, vocabulary.”

7. Premium trust
- Real audio, clean mobile flow, no broken controls, no debug labels, honest QA.

## 6. SMART roadmap

Phase 0 — Stabilize truth and QA harness
Timebox: 1 day.

Specific outcome:
- Agents can judge first path and M1/M2 against Boss’s vision without stale checks or vibes.

Files/routes affected:
- `scripts/qa_mission_pilot.py`
- `scripts/qa_intro_start_path.mjs`
- `scripts/qa_gold_slice_first_journey.mjs`
- `scripts/qa_module2_production_mobile.mjs`
- `GermanCourse_QC/` reports

Acceptance criteria:
- `tsc` passes.
- Route-status check passes for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
- QA checks behavior, not stale copy: CTA click path, audio playback, nav/search suppression, state transition, production required, repair present, no banned labels, no browser TTS.
- QA reports PASS/WEAK/FAIL and includes weaknesses.

What NOT to do:
- Do not rewrite product copy to satisfy stale QA.
- Do not create new broad strategy docs.
- Do not start Module 3 before proof harness is trustworthy.

Phase 1 — Lock the first learner journey
Timebox: 2 days.

Specific outcome:
- `/` -> `/intro` -> Module 1 mission sequence -> Module 2 start works as one guided path.

Files/routes affected:
- `src/app/page.tsx`
- `src/app/intro/page.tsx`
- `src/app/learn/page.tsx`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/missions/module-1/*`
- `src/lib/missions/module1.ts`
- layout/nav/search suppression

Acceptance criteria:
- Browser clicks prove final `location.pathname` after each CTA.
- First mission gives audio and learner reply within 90 seconds.
- Mission 1 -> 2 -> 3 -> Module 2 handoff works without dashboard browsing.
- Focused routes hide global nav/search.
- Mobile viewport has no CTA/nav/search overlap.
- Audio proof: `readyState`, duration, progress movement, `error=null`.
- Completion requires voice/write/repair; passive click-through fails.
- No learner-facing product-process labels.

What NOT to do:
- Do not polish marketing containers.
- Do not add another onboarding page.
- Do not expose old lesson queues before the first win.

Phase 2 — Make Module 2 the gold-standard mission module
Timebox: 3 days.

Specific outcome:
- Module 2 proves the product model: name, spelling, origin, job/languages, final 20-second self-introduction.

Files/routes affected:
- `src/app/missions/module-2/*`
- `src/app/missions/module-2/_components/MissionUI.tsx`
- `src/lib/missions/module2.ts`
- `public/audio/missions/module-2/*`
- `/learn/2`

Acceptance criteria:
- All 5 missions load and play real audio.
- Each mission includes situation -> hear -> output -> repair -> ability win -> next pull.
- Final Module 2 checkpoint produces 5-7 A1-safe self-intro sentences plus spelling and basic form-fill proof.
- No mission completes by passive listening or MCQ only.
- Mobile QA passes at 390px.
- No `speechSynthesis`, no hidden JS-only audio, no ugly native controls on premium path.

What NOT to do:
- Do not add more Module 2 promise cards.
- Do not make chip builders or long typing the hero experience.
- Do not call Module 2 done from route loads alone.

Phase 3 — Convert the remaining course into mission spine
Timebox: 7-10 days for blueprint + first implementation wave.

Specific outcome:
- Every module has a mission sequence and checkpoint before broad coding continues.

Files/routes affected:
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md` as spine reference, not more sprawling docs.
- `src/lib/missions/` for mission data.
- `src/app/missions/module-{n}/...` only after shared primitives are stable.
- `src/lib/content/modules/module-*.ts` where canon/content gaps block missions.

Acceptance criteria:
- All 18 modules have learner promise, 3-6 missions, exact output, Goethe mapping, audio need, production need, repair need, checkpoint.
- First implementation wave covers Modules 1-3.
- Exam-risk wave covers Modules 14, 17, and 18.
- Shared primitives are reused; no copy-paste route chaos.

What NOT to do:
- Do not build all routes before proving the engine.
- Do not line-edit every lesson script during mission modeling.
- Do not hide weak modules behind “coming soon” unless Boss approves beta scope reduction.

Phase 4 — Production floor and audio floor
Timebox: 7 days after mission spine stabilizes.

Specific outcome:
- The course stops being recognition-heavy. Every lesson has launch-grade production and Hören practice.

Files/routes affected:
- `src/lib/content/modules/module-01.ts` through `module-18.ts`
- `public/audio/hoeren/`
- `public/audio/missions/`
- `scripts/audit-*`
- audio generation scripts only within approved/free/local limits

Acceptance criteria:
- Every lesson has at least 3 production exercises: speaking, free-text/type-answer, listening/dictation.
- Audio-backed tasks have existing files and HTTP 200.
- Hören transcripts are hidden until after answer.
- Modules 3, 7, 9, 14, 17, 18 have audio-first exam-style drills.
- Goethe Wortliste/skill coverage audit flags gaps.

What NOT to do:
- Do not mass-add generic exercises to improve counts.
- Do not leave dictation as text-only.
- Do not spend paid API/media credits without approval.

Phase 5 — Launch readiness and beta proof
Timebox: 5-7 days after core path passes.

Specific outcome:
- The course can be shown to beta learners without Boss apologizing for it.

Files/routes affected:
- `GermanCourse_QC/launch-readiness-*.md`
- `src/app/tests/*`, `src/app/practice/*`, `src/app/games/*` only inside approved launch/beta scope.
- Auth/pricing/deployment only after Boss approves.

Acceptance criteria:
- Full first-journey browser playthrough passes locally and on exact Tailscale review URL.
- Mobile visual QA for root, intro, first mission, Module 2 final checkpoint, and one exam checkpoint.
- No broken audio/images on audited paths.
- Beta scope is explicit: included, hidden, not ready.
- PASS/WEAK/FAIL covers content, audio, UX, mobile, pedagogy, exam readiness, trust.

What NOT to do:
- Do not deploy/push/merge without approval.
- Do not touch pricing/payment/auth business logic unless asked.
- Do not claim launch-ready from TypeScript or screenshots alone.

## 7. First 7 days execution plan

Day 1 — QA truth + first path proof
- Patch stale start-path QA expectations to behavior-based checks.
- Run `tsc`, route-status curl, mission QA, intro/start path QA, Module 2 mobile QA.
- Browser-play `/` -> `/intro` -> first Module 1 mission and verify audio.
- Write `GermanCourse_QC/day1-first-path-qa-YYYYMMDD.md`.
- Gate: first CTA path works by browser click; QA no longer fails on stale copy; first mission has real audio, progress, state transition, learner output, repair, and listed weaknesses.

Day 2 — Module 1 mission closure
- Verify all 3 Module 1 missions form one guided sequence.
- Verify completion advances to next mission and then Module 2.
- Cut visible system/meta labels and old product-process copy.
- Gate: mobile + desktop browser checks; audio duration/progress visible; completion requires reply/repair; no dashboard browse before Module 2.

Day 3 — Module 2 gold path source audit
- Inspect all 5 Module 2 mission definitions and route pages.
- Score each mission against situation/hear/output/repair/win/pull.
- Update QA to check all 5 routes behavior, not just loads.
- Gate: every route HTTP 200; every audio URL HTTP 200 and browser-playable; no `speechSynthesis`, no hidden JS-only audio, no banned labels.

Day 4 — Module 2 final checkpoint
- Verify/build final self-intro checkpoint: 5-7 A1-safe sentences, spelling, origin, job/languages.
- Add rubric for acceptable output.
- Keep mobile typing burden sane.
- Gate: learner cannot pass without speaking/writing; common mistakes are repaired; ability win is visible and exam-mapped.

Day 5 — Mission map for Modules 3, 14, 17, 18
- Produce compact implementation map for highest exam-risk modules.
- Define exact output, route/data files, audio assets needed, checkpoint type.
- Keep it under QC or patch active spine/index. Do not create broad doc sprawl.
- Gate: each mission has output, Goethe section, audio need, production need, repair need; Hören gaps explicit.

Day 6 — Production/audio floor audit
- Run or add read-only audit counting speaking, free-text/type-answer, dictation/listening per lesson.
- Output missing-audio manifest.
- Prioritize P0 lessons.
- Gate: report lists exact module/lesson gaps; no fake audio if file does not exist; no mass exercise patching yet.

Day 7 — Beta-scope readiness report
- Write one blunt report: Built / Why / Verified / Weak / Need Boss.
- Recommend beta scope: likely first path + Modules 1-2 + selected exam/practice surfaces, not full public launch unless all gates pass.
- Gate: PASS/WEAK/FAIL across content, audio, UX, mobile, pedagogy, exam readiness, trust; max 5 Boss decisions.

## 8. First 48 hours exact build lane

This is the next concrete lane. Agents can execute without asking Boss unless a forbidden area is hit.

Hour 0-2: Freeze evidence baseline
- Record branch, commit, dirty count, and relevant dirty files in QC.
- Run `npx tsc --noEmit --pretty false --incremental false`.
- Run route-status curl for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
- Run existing QA scripts and record exact failures.

Hour 2-5: Fix stale QA harness
- Update `scripts/qa_mission_pilot.py`, `scripts/qa_intro_start_path.mjs`, and `scripts/qa_gold_slice_first_journey.mjs` to current chosen contract: `/` compact framing -> `/intro` first action -> M1 audio mission.
- Assert behavior, not exact old copy.
- Required checks: CTA route, focused nav/search suppression, real audio, duration/progress, mission output gate, repair step, no banned labels, no browser TTS.

Hour 5-8: Browser-play first journey
- Use local server.
- Click `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
- Inspect `location.pathname` after each step.
- Play mission audio and verify `readyState`, duration, progress movement, `error=null`.
- Verify learner next action unlocks only after required audio behavior.

Hour 8-12: Module 1 sequence
- Inspect `src/lib/missions/module1.ts` and all Module 1 mission routes.
- Verify mission 1 -> 2 -> 3 -> Module 2 progression.
- Patch only safe blockers: wrong links, stale labels, missing handoff, obvious clutter.
- Do not redesign containers.

Hour 12-18: Module 2 sequence audit
- Inspect `src/lib/missions/module2.ts` and all 5 Module 2 mission routes.
- Verify all Module 2 audio files serve locally.
- Score each mission: situation, hear, output, repair, win, pull.
- Mark PASS/WEAK/FAIL.

Hour 18-24: Module 2 gold path patch lane
- Patch only high-leverage safe issues: missing next links, visible debug/system labels, output not required, audio progress not visible, repair absent where data already supports it.
- Run targeted QA after each patch.

Hour 24-30: Production floor inventory
- Run or add read-only audit for production types per lesson.
- Output module, lesson, speaking count, free-text/type-answer count, dictation/listening count, audio present/missing.
- Do not mass-add exercises yet.

Hour 30-36: Canon drift inventory
- Search source/content/scripts/games for high-risk physical Germany settings attached to Kuttan in A1.
- Classify each hit as safe future/imagination/video-call/mock vs canon violation.
- Patch only obvious one-line safe fixes; report the rest.

Hour 36-42: Mission spine implementation map
- For Modules 3, 14, 17, 18, define mission outputs and checkpoints.
- Include route/data/audio/files affected.
- Keep it executable, not an essay.

Hour 42-48: Final 48h report
- Write `GermanCourse_QC/first-48h-execution-report-YYYYMMDD.md`.
- Include Built / Why / Verified / Weak / Need Boss.
- Recommend next 5 build tasks.

## 9. Definition of launch-ready

Launch-ready means a real beginner can use the course without Boss explaining it and get measurably closer to Goethe A1.

Content gate
- PASS: Every module has mission sequence + checkpoint; every lesson has story/context, teaching support, review, and production practice.
- WEAK: Modules 1-3 strong; later modules content-complete but mission/checkpoint uneven.
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
- PASS: 375-390px viewport works for root, intro, mission, checkpoint, review; no overlap; tap targets usable.
- WEAK: Minor spacing issues but no blocked action.
- FAIL: CTA hidden, nav/search overlap, text walls, unusable audio/progress.

Pedagogy gate
- PASS: Every mission has situation -> hear -> produce -> repair -> win; German is A1-safe and useful.
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

Max 5. No broad “what do you think?” questions.

1. Beta scope
- Test guided first path + Modules 1-2 first, or wait until all 18 modules have mission/checkpoint coverage?

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
- Focused routes must suppress global nav/search.
- Mission routes must ban `speechSynthesis` and review-path JS-only `new Audio()` playback unless visible audio UI is separately verified.
- Scan for banned learner-facing labels: internal asset names, debug/status copy, `GREETING SET`, `SAFE DEFAULTS`, visible `Heard`, visible `Replay` clutter, old builder counters, product-process explanations, `No builder`, `no typing`.

2. Route/browser guard
- Browser-click actual CTAs; do not trust source links.
- Verify `location.pathname` after each transition.
- Required first path: `/` -> `/intro` -> first Module 1 mission -> next Module 1 mission -> Module 2 mission.
- If a click is inert, inspect DOM/hit-testing before changing routing.

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
- Output can be speaking self-report gated by audio completion, short typed A1 answer, dictation, form fill, or roleplay reply.
- Pure multiple-choice completion fails.

5. Repair guard
- Every mission has one concrete mistake/repair/noticing step.
- The mistake must be A1-specific and useful.
- Generic “try again” fails.

6. Cognitive-load guard
First-screen visible text budget:
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
- Course-wide audit must cover Hören, Lesen, Schreiben, Sprechen.

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
- Do not call a route reviewable unless it was browser-clicked and audio-tested on the exact review URL.
- Do not call audio “good German” unless a human/audio-quality evaluator checked accent.
- Do not call the course launch-ready if first-path, audio, production, or Goethe checkpoint gates fail.
- Separate inherited failures from current edits.
- Do not make quality claims from screenshots alone.
- Do not create new strategy docs when the needed output is code, QA, or a compact implementation map.

## 12. Vision-alignment scorecard

Every build output must be scored before it is called good.

Scale:
- PASS = acceptable for beta/review.
- WEAK = directionally right but needs concrete fix.
- FAIL = wrong direction or blocks review.

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
- FAIL: Completion possible by passive listening or multiple choice only.

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

Final rejection rules:
- If learner value, production, audio, first-path UX, Goethe proof, or premium trust is FAIL, the output is not good.
- More than 2 WEAK scores means “promising but not enough,” not “ready.”
- Stale QA or missing evidence is a trust FAIL, even if the route looks fine.

## Immediate recommendation

Do not keep polishing containers.

Next build lane:
1. Fix the stale QA harness.
2. Prove `/` -> `/intro` -> Module 1 mission sequence by browser click and audio playback.
3. Keep product-process copy banned from the first mission path.
4. Make Module 2 the gold-standard mission module with all 5 missions passing hear -> output -> repair -> win.
5. Then generalize the mission engine to Modules 3, 14, 17, 18.

This is the shortest route back to trust: not more promises, not more docs, but a verified guided learner path that creates real German ability.

## Boss summary

The vision is clear: Adipoli should be a Kerala-rooted Goethe A1 mission coach, not a dashboard, generic flashcard app, or pile of scripts.

Current state: root/intro are cleaner; all first-path and M1/M2 mission routes return HTTP 200 locally; browser click path `/` -> `/intro` -> first M1 mission was already proven in this loop; first mission audio plays in browser; TypeScript passes; M1/M2 mobile mission QA passes.

Main weakness: coherence and trust. QA is partly stale, missions only cover M1/M2, course-wide production/audio floors are not guaranteed, and old dashboard/content systems still exist.

Next move: fix the QA harness first, then prove the full first path and Module 2 gold path with browser + audio evidence before touching more UI polish.
