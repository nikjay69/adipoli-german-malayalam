# Adipoli 4h continuous vision-to-SMART-plan loop

Started: 2026-05-31T15:37:35+02:00
Hard stop target: 2026-05-31T19:12:35+02:00
Run dir: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan
Prompt: /shared/german-course/GermanCourse_QC/adipoli-4h-vision-plan-prompt.md

## Iteration 1 — 2026-05-31T15:40:26+02:00

- Docs/source inspected:
  - Core vision docs already loaded in this loop: README, operating brief, product reset, whole-course mission spine, autonomous execution, premium quality, goals/retention, automation/marketing, story bible, course plan, Goethe exam map, exercise rules, module/script/series docs, M1/M2/game/launch audits.
  - Source routes inspected: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, Module 1 mission routes, Module 2 mission routes, shared mission UI.
  - Data/media inspected: `src/lib/missions/`, `src/lib/content/modules/`, `public/audio/missions`, `public/audio/hoeren`, `public/videos`, existing QA scripts.
- Vision findings:
  - Boss wants a Kerala-rooted, adult-safe, mission-based A1 course for Malayali learners, not a dashboard/content library.
  - Core loop: hear real German in a scene → understand → answer aloud → repair a Manglish/A1 trap → tiny writing only when useful → ability win → next pull.
  - Goethe A1 seriousness and self-sufficient launch readiness beat mascot/story preservation when they conflict.
- Mismatch findings:
  - Current app has real M1/M2 mission pieces and real audio, but still carries old dashboard/lesson/game-library DNA.
  - QA trust is damaged: `python3 scripts/qa_mission_pilot.py` fails on stale intro start-path snippets even though local key routes return 200.
  - Git tree is very dirty (262 status entries), so no commit/push should happen without isolating intended changes.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local curl 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` fails on intro snippet expectations.
- Plan sections drafted/refined:
  - Vision reconstruction, non-negotiables, mismatch diagnosis, product model, student-interest plan, SMART roadmap, 7-day plan, 48h lane, launch-ready definition, Boss decisions.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1540.md`
- Remaining questions/risks:
  - Need Boss decision on public protagonist name (`Kuttan` vs Arun/Kiran with Kuttan as nickname).
  - Need to repair QA before any further review link is trusted.
  - Legacy browser SpeechSynthesis remains in practice pages outside reviewed mission path.
- Next iteration focus:
  - If loop continues, repair first-path QA/playthrough gates first; do not polish UI containers.
- Addendum incorporated:
  - Final plan now includes a reusable vision-alignment scorecard, required evidence per output, objective rejection rules, and an agent self-judge protocol.



# Boss addendum — 2026-05-31T15:40:22+02:00

Boss clarified the final plan must be **verifiable**, because agents will often judge outputs without Boss checking every screen/document.

Add to the final SMART plan:
- a reusable vision-alignment scorecard;
- PASS/WEAK/FAIL gates for each actionable step;
- required evidence per build output: files changed, route/browser proof, screenshots if visual, audio playback proof if audio, content sample checks if pedagogy/content, source references to Boss vision docs;
- objective rejection rules for outputs that are text-heavy, dashboard-like, generic-German, childish, click-heavy, missing production practice, or not tied to Goethe A1/Malayali learner value;
- an agent self-judge protocol: no output is “done” until it passes the rubric or is labeled WEAK/FAIL with the next fix.

This is a hard requirement, not optional polish.
===== ITERATION 1 END 2026-05-31T15:44:03+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-01.log
Git status after iteration 1: 262 dirty/untracked entries. Full status captured in iteration log.

## Iteration 2 — 2026-05-31T15:47:22+02:00

- Docs/source inspected:
  - Re-read current final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1540.md` and found section-order mismatch with Boss request: verification harness and scorecard were present but not clearly as requested sections 11 and 12.
  - Re-inspected source routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, Module 2 shared mission UI, Module 1/2 mission data.
  - Re-inspected QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`.
  - Inventory refreshed: 18 module files, 8 mission routes, 23 mission MP3s, 134 Hören MP3s, 25 video files, QA scripts present.
- Vision findings:
  - Product unit remains mission, not lesson page.
  - The exact core loop must be explicit in the plan and harness: hear → understand → answer aloud → repair → tiny write/proof → win → next.
  - Verification must be treated as part of product vision, not a later engineering detail, because Boss’s trust problem is caused by overconfident agent claims.
- Mismatch findings:
  - Current source first path is directionally right, but proof is still broken.
  - `qa_mission_pilot.py` fails because intro start-path expectations are stale.
  - `qa_gold_slice_first_journey.mjs` fails because it expects old intro copy/CTA text (`Greet Frau Weber`, `Start listening`) while current `/intro` says `Your first German moment` / `Begin lesson 1`.
  - Git tree remains very dirty: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 status entries.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `curl` HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`.
  - FAIL: `python3 scripts/qa_mission_pilot.py` on stale intro start-path snippets.
  - FAIL: `node scripts/qa_gold_slice_first_journey.mjs` on stale intro copy/CTA expectations.
- Plan sections drafted/refined:
  - Rewrote/refined final plan as a new artifact with the exact requested shape:
    1. Vision reconstruction
    2. Non-negotiables
    3. Current mismatch diagnosis
    4. Product model
    5. Student-interest plan
    6. SMART roadmap
    7. First 7 days execution plan
    8. First 48 hours exact build lane
    9. Definition of launch-ready
    10. Boss decisions needed
    11. Verification harness
    12. Vision-alignment scorecard
  - Made the verification harness concrete: source contract checks, route/browser checks, audio checks, content sample checks, UX cognitive-load checks, self-judge block, anti-hallucination rules.
  - Made launch-ready gates explicit across content/audio/UX/mobile/pedagogy/exam/trust.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1547.md`
- Remaining questions/risks:
  - The final plan is now stronger, but no source QA repair was made in this planning iteration by design.
  - Next execution lane must repair stale QA before any UI/product polish.
  - Public protagonist naming remains a Boss decision.
  - Audio accent/taste remains human-review territory; technical playback proof is not the same as native-sounding German.
- Next iteration focus:
  - If the loop continues into build work, start with `scripts/qa_mission_pilot.py` and `scripts/qa_gold_slice_first_journey.mjs` source/QA contract repair, then rerun browser playthrough.
===== ITERATION 2 END 2026-05-31T15:48:00+02:00 rc=0 =====
===== ITERATION 2 END 2026-05-31T15:51:15+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-02.log
Git status after iteration 2: 262 dirty/untracked entries (full listing preserved in iteration log).

## Iteration 3 — 2026-05-31T15:54:39+02:00

- Docs/source inspected:
  - Re-read checkpoint and final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1547.md`.
  - Re-inspected recent 6h immersive-phone-first checkpoint for Boss’s correction: stop chip/builder chores, use phone-first hear → answer aloud → repair flow.
  - Re-inspected source routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, shared Module 2 mission UI, Module 1/2 mission data, and all 8 mission routes under `src/app/missions/`.
  - Re-inspected QA scripts: `qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, `qa_intro_start_path.mjs`, `qa_module2_production_mobile.mjs`.
  - Refreshed inventory: 8 mission routes and 18 module content files.
- Vision findings:
  - The plan needs to distinguish “professional root framing” from “dashboard clutter.” Boss does not want cold learners dumped into action with no course promise, but also does not want a page-heavy/text-heavy setup maze.
  - Verification is now a first-class product requirement: source and QA must agree before any review link or “good” claim.
  - M1/M2 immersive direction is stronger than the earlier plan implied; the remaining problem is first-path contract drift/stale QA, not just missing mission UI.
- Mismatch findings:
  - Current `/intro` source uses `Your first German moment.` / `Begin lesson 1`; stale QA expects `Greet Frau Weber.` / `Start listening` and `?start=listen` constants.
  - Current root `/` is concise course framing with CTA to `/intro`; stale `qa_intro_start_path.mjs` expects root to show `Greet Frau Weber.` and link directly to first mission.
  - `qa_module2_production_mobile.mjs` passes and proves 8 M1/M2 voice-first missions locally; start-path QA scripts still fail.
  - Git tree remains dirty at 262 entries; no commit/push should happen.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local curl 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` — 8 voice-first missions, no legacy builders on reviewed path.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on intro/start-path snippets.
  - FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA expectations.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` on root direct-first-mission expectation.
- Plan sections drafted/refined:
  - Rewrote/refined final plan as `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1554.md`.
  - Added current evidence from source and checks.
  - Tightened Phase 1 and First 48h lane around choosing/locking the first-path source/QA contract before more UI or Module 3 work.
  - Kept all requested sections 1–12 and added the `## Boss summary` bottom section.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1554.md`
- Remaining questions/risks:
  - Boss decision still needed: root `/` as concise framing → `/intro` → mission, or direct root → first audio mission.
  - Public protagonist name remains a launch decision.
  - Audio accent/taste remains human-review territory; technical playback proof does not prove native-sounding German.
- Next iteration focus:
  - Patch stale start-path QA to the chosen contract, then browser-prove `/` → `/intro` → first M1 audio mission before building Module 3.
===== ITERATION 3 END 2026-05-31T15:54:39+02:00 rc=0 =====

===== ITERATION 3 END 2026-05-31T16:01:18+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-03.log

## Iteration 4 — 2026-05-31T16:04:11+02:00

- Docs/source inspected:
  - Re-read core vision docs: README, operating brief, product reset, whole-course mission spine, autonomous execution plan, premium quality protocol, goals/retention, automation/marketing, story bible.
  - Extracted/summarized mandatory supporting docs: course 10/10 plan, Goethe A1 exam map, exercise quality rules, module blueprints, script architecture, series arc/full script, M1 audit, M2/M3 setting audit, game audit, launch checklist, product QA system, module scorecard.
  - Re-inspected source routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, Module 2 mission data, `qa_mission_pilot.py`.
  - Browser-inspected live local path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
- Vision findings:
  - Boss’s vision is stable: mission-based, Kerala-rooted, Goethe-serious, adult-safe, phone-first, audio/production-first, self-sufficient.
  - The immediate product problem is not lack of direction; it is source/QA contract drift plus scaling the mission model beyond M1/M2.
  - Root `/` can be concise professional framing without violating “action fast,” but QA must encode that choice explicitly.
- Mismatch findings:
  - M1/M2 route behavior works locally and first mission audio plays in browser.
  - Start-path QA remains stale/failing: `qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, and `qa_intro_start_path.mjs` expect older copy/route decisions.
  - Dirty git state remains 262 dirty/untracked entries; no commit/push as one blob.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false` (`tsc_exit=0`).
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
  - PASS: browser click path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
  - PASS: browser mission audio proof: `readyState=4`, `duration=4.752`, `currentTime advanced`, `error=null`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets.
  - FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` on old root-page contract.
- Plan sections drafted/refined:
  - Created final iteration-4 plan with all requested sections 1–12 plus `## Boss summary`.
  - Tightened roadmap and first 48h lane around proof repair before Module 3.
  - Added current browser/audio evidence and explicit anti-hallucination PASS/WEAK/FAIL gates.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1604.md`
- Remaining questions/risks:
  - First-path contract still needs to be locked in QA: recommended `/` framing -> `/intro` -> first M1 audio mission.
  - Public protagonist naming remains Boss decision.
  - Technical audio playback proof is not accent/native-quality proof.
- Next iteration focus:
  - Patch stale start-path QA scripts to current chosen contract, rerun checks, then only then begin Module 3 build.
===== ITERATION 4 END 2026-05-31T16:04:11+02:00 rc=0 =====

Git status after iteration 3:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html

===== ITERATION 4 END 2026-05-31T16:10:07+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-04.log
Git status after iteration 4:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html

## Iteration 5 — 2026-05-31T16:13:11+02:00

- Docs/source inspected:
  - Continued from iteration 4 plan and checkpoint.
  - Re-read vacation/calendar state: vacation is expired; no vacation signal today.
  - Re-inspected SERIES_ARC_PLAN.md, SERIES_FULL_SCRIPT.md, M1_AUDIT_REPORT.md, M2_M3_SETTING_AUDIT.md, GAME_AUDIT.md, LAUNCH_CHECKLIST.md.
  - Re-inspected source routes: /, /intro, /learn, /learn/[moduleId], shared mission UI, M1/M2 mission data, and QA scripts.
- Vision findings:
  - The vision remains stable: Kerala-rooted, Goethe-serious, adult-safe, phone-first, mission-led, real-audio, production-first, launch-trustworthy.
  - Root framing is acceptable if it stays compact and immediately routes to the first German action; dumping cold buyers into action with no framing is not required.
  - Verification itself is a product requirement because Boss’s trust problem is over-claiming without proof.
- Mismatch findings:
  - M1/M2 mission direction is strong enough to keep; the immediate blocker is stale source/QA contract, not another UI redesign.
  - Three QA scripts still fail on old first-path expectations.
  - Dirty git state remains 262 dirty/untracked entries.
- Verification run:
  - PASS: npx tsc --noEmit --pretty false --incremental false.
  - PASS: local HTTP 200 for /, /intro, /learn, /learn/1, /learn/2, all M1/M2 mission routes.
  - PASS: ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs.
  - FAIL/stale: python3 scripts/qa_mission_pilot.py on old intro/start-path snippets.
  - FAIL/stale: node scripts/qa_gold_slice_first_journey.mjs on old intro copy/CTA.
  - FAIL/stale: node scripts/qa_intro_start_path.mjs on old root-page contract.
- Plan sections drafted/refined:
  - Produced final iteration-5 plan with all requested sections 1-12 and Boss summary.
  - Kept first 48h lane tightly focused on QA/source contract repair before any Module 3 build.
  - Added current iteration evidence and exact stale QA failures.
- Final artifact:
  - /shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1613.md
- Remaining questions/risks:
  - Public protagonist naming remains a Boss decision.
  - Audio accent/taste remains human-review, not proven by technical playback.
  - No source QA repair was performed in this planning iteration by guardrail; next build lane should patch QA scripts first.
- Next iteration focus:
  - If execution continues, patch stale start-path QA scripts to the chosen contract and rerun the full proof set before starting Module 3.
===== ITERATION 5 END 2026-05-31T16:13:11+02:00 rc=0 =====
===== ITERATION 5 END 2026-05-31T16:18:22+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-05.log
Git status after iteration 5:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 6 — 2026-05-31T16:21:46+02:00

- Time/iteration:
  - Iteration 6, 2026-05-31T16:18–16:22+02:00.
- Docs/source inspected:
  - Re-read and used the existing final draft `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1613.md`.
  - Re-read source route evidence for `/`, `/intro`, `/learn`, `/learn/[moduleId]`, M1/M2 mission data, and shared `MissionUI`.
  - Re-read mandatory late docs/audits not already visible in this window: `COURSE_PLAN_10_10.md`, `EXERCISE_QUALITY_RULES.md`, `MODULE_BLUEPRINTS.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `SERIES_FULL_SCRIPT.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`, `GAME_AUDIT.md`, `LAUNCH_CHECKLIST.md`.
- Vision findings:
  - The core vision is not “nicer UI”; it is a Kerala-rooted, Goethe-serious, audio-first mission course that produces actual A1 abilities.
  - The course unit remains: hear German -> understand -> answer aloud -> repair one real beginner trap -> tiny write/proof where useful -> ability win -> next pull.
- Mismatch findings:
  - The product direction in M1/M2 is now much closer to Boss’s vision.
  - Trust is still blocked because three start-path QA scripts encode stale expectations and fail while the live source/browser path works under the chosen contract.
  - Dirty tree remains huge: 262 dirty/untracked entries on branch `adipoli-page-by-page-reset-20260523-1802` at commit `b201d05`.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1 mission routes, all M2 mission routes.
  - PASS: browser click path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`; route has one real `<audio>` and visible custom `Listen` control; console has no JS errors.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` fails on old intro/start-path snippets.
  - FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` fails on old intro copy/CTA expectations.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` fails on old root-page contract.
- Plan sections drafted/refined:
  - Created final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1621.md` by refining the 16:13 draft with live browser and command evidence.
  - Added Iteration 6 verification addendum.
- Remaining questions/risks:
  - Boss still needs the public-name decision for Kuttan vs adult-safe name.
  - Audio accent/taste is still human-review, not proven by technical QA.
  - No source QA repair was done in this planning iteration by guardrail; stale QA is the first build lane.
- Next iteration focus:
  - Patch stale start-path QA scripts to the chosen `/` -> `/intro` -> first M1 mission contract.
  - Rerun all QA.
  - Only then build Module 3 missions.
===== ITERATION 6 END 2026-05-31T16:21:46+02:00 rc=0 =====
===== ITERATION 6 END 2026-05-31T16:24:28+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-06.log
Git status after iteration 6:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html

## Iteration 7 — 2026-05-31T16:26:17+02:00

- Time/iteration:
  - Iteration 7, 2026-05-31T16:24–16:26+02:00.
- Docs/source inspected:
  - Re-read current plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1621.md` and the loop prompt for iteration 7.
  - Re-read recent M1/M2 UI/UX checkpoint for Boss’s correction: voice-first, phone-first, not builder/chip/typing-heavy.
  - Re-inspected source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, all current mission routes under `src/app/missions/`, `src/lib/missions/`, and current QA scripts.
  - Refreshed mandatory doc inventory/headings for the requested vision/product docs.
  - Refreshed content/media inventory: 18 module files, 8 mission routes, 23 mission MP3s, 134 Hören MP3s, 24 videos, 6 QA scripts.
- Vision findings:
  - The plan should stop hedging: recommended first-path contract is `/` compact professional framing -> `/intro` compact first moment -> first M1 audio mission.
  - This preserves Boss’s “do German fast” rule without dumping cold buyers into an unexplained mission.
  - The core product remains mission-based: hear real German -> answer aloud -> repair -> tiny write/proof -> ability win -> next pull.
- Mismatch findings:
  - M1/M2 product direction is now aligned enough to keep.
  - Trust remains blocked by stale QA scripts that encode older direct-root/old-copy expectations.
  - Dirty tree remains 262 dirty/untracked entries; no commit/push or broad code churn.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_intro_start_path.mjs` on old root-page direct-mission contract.
- Plan sections drafted/refined:
  - Created final iteration-7 artifact with all requested sections 1–12 and `## Boss summary`.
  - Tightened the first 48h lane around QA/source contract repair, not source redesign.
  - Added explicit launch-ready PASS/WEAK/FAIL and anti-hallucination gates.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1626.md`
- Remaining questions/risks:
  - Public protagonist name remains the main launch identity decision.
  - Audio accent/taste remains human-review; technical playback proof is not enough for paid launch.
  - QA must be repaired before review links or Module 3 claims.
- Next iteration focus:
  - Patch stale start-path QA scripts to the chosen `/` -> `/intro` -> first M1 mission contract.
  - Rerun all QA and browser-prove the path.
  - Only then start Module 3 missions.
===== ITERATION 7 END 2026-05-31T16:26:17+02:00 rc=0 =====

===== ITERATION 7 END 2026-05-31T16:34:11+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-07.log
Git status after iteration 7:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



---

## Iteration 8 — 2026-05-31T16:36+02:00

### Docs/source inspected
- Re-read checkpoint tail and final plan draft: `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`, `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1626.md`.
- Re-read mandatory synthesis docs/source samples: `docs/README.md`, operating brief, product reset, mission spine, script architecture/series docs, M1/M2 audits, game audit, launch checklist, QA system, scorecard template.
- Inspected current first-path/app source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
- Inspected mission data/UI: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`.
- Inspected existing QA gate: `scripts/qa_mission_pilot.py`.

### Vision findings
- Vision is stable: Kerala-rooted Goethe A1 mission course for Malayali adults; hear real German, answer aloud, repair one mistake, write only when useful, leave with an ability win.
- Course unit must be the mission, not the old lesson/dashboard/game catalog.
- First path needs compact professional framing, then immediate German action; not cold dashboard browsing and not another UI-polish loop.

### Mismatch findings
- Git state remains high-risk: 262 dirty/untracked entries on `adipoli-page-by-page-reset-20260523-1802` at `b201d05`.
- Current source contract is `/` compact framing -> `/intro` -> `/missions/module-1/greet-frau-weber`.
- `qa_mission_pilot.py` is stale against that contract: audio/text/meta subchecks pass, then it fails expecting older intro snippets and `?start=listen` constants.
- M1/M2 mission QA direction is good locally: 8 voice-first missions pass the mobile production QA.

### Plan sections drafted/refined
- Final artifact updated from iteration 7 into `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1636.md`.
- Added iteration 8 verification addendum with re-run evidence.
- Kept roadmap unchanged because evidence still says the first real lane is proof/QA contract repair, not new product polish.

### Checks run
- PASS: `npx tsc --noEmit --pretty false --incremental false`.
- PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
- PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
- FAIL/stale: `python3 scripts/qa_mission_pilot.py` fails on old intro/start-path expected snippets.

### Remaining questions/risks
- Boss decision still needed on public protagonist name: keep Kuttan publicly or use Arun/Kiran as adult-safe name.
- Need human review of German audio accent quality before paid launch; technical playback is not accent proof.
- Need scoped git cleanup before any commit/push; current tree is too broad.

### Next iteration focus
- If continuing build work: patch start-path QA to the chosen contract, then browser-prove `/` -> `/intro` -> first M1 audio mission.
- Only after that: start Module 3 numbers/time mission pilot.
===== ITERATION 8 END 2026-05-31T16:40:11+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-08.log
Git status after iteration 8:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


---

## Iteration 9 — 2026-05-31T16:41+02:00

### Docs/source inspected
- Re-read/checkpointed current loop state and iteration 8 conclusions.
- Re-read additional mandatory/synthesis docs: `docs/M2_M3_SETTING_AUDIT.md`, `docs/SERIES_ARC_PLAN.md`, `docs/SERIES_FULL_SCRIPT.md`, `docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md`, `docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md`.
- Reconfirmed existing final-plan lineage: latest previous artifact was `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1636.md`.
- Reconfirmed QA inventory includes `scripts/qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, `qa_intro_start_path.mjs`, `qa_module2_production_mobile.mjs`, and related route/playthrough audits.

### Vision findings
- The product vision remains stable: a self-sufficient, launch-ready Goethe A1 course for Malayali adults, using Kerala-rooted mission scenes and real audio to make learners speak/write quickly.
- The series docs reinforce that A1 is Kerala -> Goethe exam -> takeoff; Germany belongs after A1 or as mock/future/dream/video-call framing.
- The QA system and scorecard docs reinforce that a lesson/script is not enough; route UX, media, production exercises, review/checkpoints, mobile, and visual trust are all part of the product.

### Mismatch findings
- `M2_M3_SETTING_AUDIT.md` gives concrete proof of older Germany-setting drift in Modules 2/3; some fixes were completed and several were deferred.
- Current source direction is promising for M1/M2 missions, but the first-path proof harness still needs repair before future agents can claim quality.
- The dirty git tree remains a shipping risk; no commit/push should happen from this mixed state.

### Plan sections drafted/refined
- Wrote final requested artifact with exact Boss-requested sections 1-12 plus evidence base, immediate recommendation, and `## Boss summary`.
- Explicitly included verification harness and reusable vision-alignment scorecard with PASS/WEAK/FAIL thresholds and anti-hallucination rules.
- Made the first 48h lane executable: scope git state, freeze first-path contract, repair QA, browser-test, prove audio, cut cognitive load, write evidence report, stop.

### Final artifact
- `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1641.md`

### Remaining questions/risks
- Boss decision still needed on public protagonist name (`Kuttan` publicly vs Arun/Kiran with Kuttan as nickname).
- Human review still needed for German audio accent/taste before paid launch.
- QA contract repair is the next build step; this iteration intentionally avoided source churn.

### Next iteration focus
- If continuing beyond planning: patch `scripts/qa_mission_pilot.py`, prove `/` -> `/intro` -> first M1 audio mission in browser, then only move to Module 3 missionization after proof passes.
===== ITERATION 9 END 2026-05-31T16:49:49+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-09.log
Git status after iteration 9:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## 2026-05-31T16:52:42+02:00 — Iteration 10

### Docs/source inspected
- Re-read mandatory remaining planning docs not fully covered in earlier context: `COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`, `COURSE_PLAN_10_10.md`, `EXERCISE_QUALITY_RULES.md`, `MODULE_BLUEPRINTS.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `SERIES_FULL_SCRIPT.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`, `GAME_AUDIT.md`, `LAUNCH_CHECKLIST.md`.
- Inspected source routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, Module 1 mission routes, Module 2 mission routes.
- Inspected mission/data/QA structures: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`, `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_module2_production_mobile.mjs`.
- Inspected content/audio structure enough to assess feasibility: `src/lib/content/modules/module-01.ts` through `module-18.ts`, `public/audio/hoeren/`, `public/audio/missions/`, `public/audio/tts/`.

### Vision findings
- Boss vision is a Kerala-rooted Goethe A1 mission coach, not a generic lesson dashboard.
- Core unit should be a mission: situation → real audio → learner output → mistake repair → ability win → next pull.
- Non-negotiables: A1 Kuttan stays in Kerala; Manglish bridge; adult-safe Kuttan/peer tone; real audio; production-first; Goethe proof; self-sufficient product; evidence before praise.

### Mismatch findings
- Current root and intro are visually cleaner and lower-text than older reports; browser QA found one clear CTA and no dashboard clutter there.
- First mission screen is low-load but must prove the full listen → reply → repair path, not just passive listening.
- Mission model exists for M1/M2 only; the rest of the 18-module course is still mostly lesson/content/app-route infrastructure.
- QA harness is stale: `python3 scripts/qa_mission_pilot.py` fails on old intro/start-path copy expectations, while TypeScript and route status checks pass.
- Dirty git scale remains high: fresh check shows 262 dirty/untracked entries on branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`.

### Checks run
- `curl -I http://127.0.0.1:3000/` → HTTP 200.
- Route status checks for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all Module 1 mission routes, all Module 2 mission routes → HTTP 200.
- `npx tsc --noEmit --pretty false --incremental false` → PASS.
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` → PASS.
- `python3 scripts/qa_mission_pilot.py` → FAIL due stale intro CTA/copy/source-snippet expectations.
- Browser visual QA: `/` concise/professional; `/intro` action-led; first mission clean but needs production-loop proof.

### Plan sections drafted/refined
- Wrote final SMART plan with all requested sections, including verification harness and reusable vision-alignment scorecard.
- Final path: `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1652.md`.

### Remaining questions/risks
- Need Boss decisions later on launch scope, public Kuttan name, audio quality bar, AI correction policy, and game visibility.
- Immediate technical risk: agents may keep patching product copy to stale QA scripts unless the harness is updated first.
- Product risk: calling M1/M2 pilot quality “course quality” before mission spine and production/audio floor are generalized.

### Next iteration focus
- If continuing in loop: patch stale `qa_mission_pilot.py` behavior checks, then browser-play `/` → `/intro` → Module 1 mission sequence and record evidence.
===== ITERATION 10 END 2026-05-31T17:01:22+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-10.log
Git status after iteration 10:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 11 — 2026-05-31T17:01:27+02:00

### Docs/source inspected
- Re-read latest final plan: `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1652.md`.
- Re-inspected first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`.
- Re-inspected mission data: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`.
- Re-inventoried route/source/QA files: `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, Module 1 missions, Module 2 missions, `scripts/qa_*`.

### Vision findings
- The final plan shape is now correct: all requested sections 1–12 exist, plus `## Boss summary`.
- The plan’s core model still matches Boss’s vision: compact professional entry, fast German audio, learner production, one repair, ability win, next pull.
- Current source confirms M1/M2 have real mission sequences, but the rest of the course still needs mission-spine generalization.

### Mismatch findings
- `src/app/intro/page.tsx` intentionally uses a low-text first-action page and routes to `/missions/module-1/greet-frau-weber`.
- `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, and `scripts/qa_intro_start_path.mjs` still fail on older copy/contract expectations.
- This is exactly why Phase 0 must fix the QA harness before product copy/UI work: stale tests are now pushing agents toward wrong fixes.
- Dirty git scale remains high: 262 dirty/untracked entries on `adipoli-page-by-page-reset-20260523-1802` at commit `b201d05`.

### Checks run
- `git branch --show-current` → `adipoli-page-by-page-reset-20260523-1802`.
- `git rev-parse --short HEAD` → `b201d05`.
- `git status --short | wc -l` → `262`.
- Route status check for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, all 5 Module 2 mission routes → HTTP 200.
- `npx tsc --noEmit --pretty false --incremental false` → PASS (`tsc_exit=0`).
- `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` → PASS: 8 voice-first M1/M2 missions, nav/search suppressed, no legacy builders on reviewed path.
- `python3 scripts/qa_mission_pilot.py` → FAIL on stale intro CTA/copy/source-snippet expectations.
- `node scripts/qa_gold_slice_first_journey.mjs` → FAIL on old intro copy/CTA expectation.
- `node scripts/qa_intro_start_path.mjs` → FAIL on old root-page headline/direct-first-mission expectation.

### Plan sections drafted/refined
- Copied/refined latest final plan to `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1701.md`.
- Verified required sections are present:
  1. Vision reconstruction
  2. Non-negotiables
  3. Current mismatch diagnosis
  4. Product model
  5. Student-interest plan
  6. SMART roadmap
  7. First 7 days execution plan
  8. First 48 hours exact build lane
  9. Definition of launch-ready
  10. Boss decisions needed
  11. Verification harness
  12. Vision-alignment scorecard
  plus `## Boss summary`.

### Remaining questions/risks
- Biggest immediate risk: an agent may keep editing product source to satisfy stale QA scripts. The correct move is to patch QA to behavior/vision gates first.
- Launch scope, Kuttan public name, audio quality bar, AI correction policy, and game visibility remain the only high-leverage Boss decisions.
- Do not commit/push the dirty tree as one blob.

### Next iteration focus
- Patch stale QA harness behavior checks, then browser-play `/` → `/intro` → Module 1 mission sequence and record exact state/audio evidence.
===== ITERATION 11 END 2026-05-31T17:05:02+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-11.log
Git status after iteration 11:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



## Iteration 12 — 2026-05-31T17:10:00+02:00

- Time/iteration:
  - Iteration 12, 2026-05-31T17:05–17:10+02:00.
- Docs/source inspected:
  - Re-read active vision docs: README, operating brief, product direction reset, whole-course mission spine, autonomous execution plan, premium quality protocol, goals/retention, story bible, Goethe exam map, exercise quality rules.
  - Re-read current final plan draft `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1701.md` and checkpoint tail.
  - Re-inspected source routes `/`, `/intro`, `/learn`, M1/M2 mission data, shared Module 2 mission UI, and `scripts/qa_mission_pilot.py`.
  - Browser-inspected live local path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
- Vision findings:
  - Vision remains stable: Kerala-rooted, Goethe-serious, adult-safe, dialogue-scene-first, audio/production-first, low cognitive load, self-sufficient launch-ready course.
  - Current root framing is acceptable if it stays compact and immediately routes to the first German action.
  - Verification harness is part of the product, not cleanup, because stale QA is damaging Boss trust.
- Mismatch findings:
  - M1/M2 mission direction is usable as the pilot spine; the app still has legacy dashboard/content systems around it.
  - `scripts/qa_mission_pilot.py` still fails on stale intro/start-path snippets although current browser path and route checks pass.
  - Dirty git tree remains large: 262 dirty/untracked status entries on branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1 mission routes, all M2 mission routes.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` — 8 voice-first M1/M2 missions, mobile width 390, nav/search hidden, no legacy builders on reviewed path.
  - PASS: browser click path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
  - PASS: browser audio proof on first mission: audioCount=1, readyState=4, duration=4.752, currentTime advanced, error=null.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` expects older copy/constants (`Greet Frau Weber.`, `Start listening <ArrowRight`, old first-mission constants).
- Plan sections drafted/refined:
  - Produced final artifact with all requested sections 1-12 plus Boss summary.
  - Updated evidence with iteration-12 TypeScript, route, browser, audio, and mobile QA proof.
  - Tightened first 48h lane: fix stale QA harness before Module 3 or more UI polish.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1710.md`
- Remaining questions/risks:
  - Public protagonist naming remains a Boss decision.
  - Audio accent/naturalness still needs human/audio-quality review; technical playback proof is not accent proof.
  - Do not commit/push the dirty tree as one blob.
- Next iteration focus:
  - Patch stale start-path QA to current `/` -> `/intro` -> first M1 mission contract and rerun the full proof set.
  - Then audit/patch Module 2 gold path, then generalize to Modules 3, 14, 17, 18.
===== ITERATION 12 END 2026-05-31T17:14:23+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-12.log
Git status after iteration 12:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 13 — 2026-05-31T17:14:54+02:00

- Time/iteration:
  - Iteration 13, 2026-05-31T17:14–17:20+02:00.
- Docs/source inspected:
  - Re-read current final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1710.md` and checkpoint tail.
  - Re-inspected first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`.
  - Re-inspected mission data: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`.
  - Re-inspected QA scripts enough to identify stale contracts: `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_intro_start_path.mjs`.
  - Browser-inspected live local path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
- Vision findings:
  - Vision remains stable: Kerala-rooted, Goethe-serious, adult-safe, dialogue-scene-first, audio/production-first, low cognitive load, self-sufficient launch-ready course.
  - The correct first-path contract remains `/` compact professional framing -> `/intro` short first action -> first M1 audio mission.
  - Verification harness repair is part of the product, not cleanup, because stale QA is now actively pushing wrong fixes.
- Mismatch findings:
  - Current first-path route works and audio plays, but `qa_mission_pilot.py` still fails on old copy/constants.
  - Browser text revealed one concrete remaining product-copy leak in the first mission: `No builder, no typing.` This should be cut before calling the first mission launch-grade.
  - M1/M2 mission direction is usable as pilot spine; Modules 3–18 still need mission-spine generalization and production/audio-floor proof.
  - Dirty git tree remains large: 262 dirty/untracked entries on branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`.
- Verification run:
  - PASS: local server root HTTP 200.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1 mission routes, all M2 mission routes.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` — 8 voice-first M1/M2 missions, mobile width 390, nav/search hidden, no legacy builders on reviewed path.
  - PASS: browser click path `/` -> `/intro` -> first M1 mission.
  - PASS: browser first-mission audio proof: audioCount=1, nav=false, search=false, readyState=4, duration=4.752, currentTime=4.752, progress=100%, error=null, turn cue=`Now answer.`
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` expects older snippets/constants (`Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, old `FIRST_MISSION_HREF`).
- Plan sections drafted/refined:
  - Produced final artifact with all requested sections 1-12 plus Boss summary.
  - Updated evidence with iteration-13 TypeScript, route, browser, audio, mobile QA proof, and the newly observed first-mission product-copy leak.
  - Tightened Phase 1 / first 48h lane to cut visible product-process copy after QA harness repair.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1714.md`
- Remaining questions/risks:
  - Public protagonist naming remains a Boss decision.
  - Audio accent/naturalness still needs human/audio-quality review; technical playback proof is not accent proof.
  - Do not commit/push the dirty tree as one blob.
- Next iteration focus:
  - Patch stale start-path QA to current `/` -> `/intro` -> first M1 mission contract and rerun the full proof set.
  - Then cut first-mission product-process copy, verify Module 1 sequence, and audit/patch Module 2 gold path.
===== ITERATION 13 END 2026-05-31T17:22:19+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-13.log
Git status after iteration 13:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



## Iteration 14 — 2026-05-31T17:24:00+02:00

- Docs/source inspected:
  - Re-read/reused the current final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1714.md` and checkpoint tail.
  - Re-read key vision docs for this iteration: `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`, `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`, `COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`, `A1_STORY_BIBLE.md`, `GOETHE_A1_EXAM_MAP.md`.
  - Source inspected: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-1/greet-frau-weber/page.tsx`, `src/app/missions/module-2/self-intro/page.tsx`, shared `MissionUI.tsx`, and `scripts/qa_mission_pilot.py`.
- Vision findings:
  - Direction remains stable: Kerala-rooted, adult-safe, Goethe-serious, mission-based, phone-first, real-audio, production-first.
  - Root `/` should stay concise professional framing, then `/intro`, then first mission. Do not revert to an unexplained raw lesson dump.
  - The plan must keep verification as a product requirement, not a later engineering chore.
- Mismatch findings:
  - M1/M2 mission model is directionally correct but only covers the first slice; Modules 3–18 still need generalization.
  - `qa_mission_pilot.py` still fails because it encodes stale intro/start-path copy and constants, while current source uses `/intro` copy `Your first German moment.` / `Begin lesson 1` and routes to the first M1 mission.
  - Dirty git tree remains broad: 262 status entries. No commit/push as one blob.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 M1 mission routes, and all 5 M2 mission routes.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets (`Greet Frau Weber.`, `Start listening`, old first-mission constants).
- Plan sections drafted/refined:
  - Created iteration-14 final plan artifact by carrying forward the complete sectioned SMART plan and adding the fresh verification refresh/evidence.
  - No broad code churn; only report/checkpoint work.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1724.md`
- Remaining questions/risks:
  - QA harness repair remains the first executable lane.
  - Public protagonist naming (`Kuttan` vs adult-safe public name with Kuttan as nickname) still needs Boss approval before any global rename.
  - Technical audio playback still does not prove native accent quality.
- Next iteration focus:
  - Patch stale QA harness to the chosen first-path contract, rerun `qa_mission_pilot.py`, `qa_gold_slice_first_journey.mjs`, `qa_intro_start_path.mjs`, and browser/audio playthrough before Module 3 work.
===== ITERATION 14 END 2026-05-31T17:26:16+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-14.log
Git status after iteration 14:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



---

## Iteration 15 — 2026-05-31T17:26+02:00

### Docs/source inspected
- Re-read current checkpoint tail and latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1724.md`.
- Re-synthesized mandatory top-level vision/product docs via heading/keyword inventory: README, operating brief, product reset, mission spine, autonomous execution, premium QA protocol, goals/retention, automation/marketing, story bible, 10/10 plan, Goethe map, exercise rules, module/script/series docs, M1/M2/game/launch audits.
- Re-inspected current source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`, `scripts/qa_mission_pilot.py`, `scripts/qa_module2_production_mobile.mjs`.

### Vision findings
- Boss’s vision is stable and buildable: Kerala-rooted, Goethe A1 serious, adult-safe, mission-led, real-audio, production-first, self-sufficient, and evidence-verified.
- The product unit is the mission, not lesson/dashboard/game catalog.
- First path should stay compact professional framing -> immediate first German action, not cold dashboard browsing and not another UI-polish loop.

### Mismatch findings
- M1/M2 mission direction is worth preserving: 8 voice-first missions pass the focused mobile QA.
- Trust blocker remains stale QA/source-contract drift: `qa_mission_pilot.py`, `qa_intro_start_path.mjs`, and `qa_gold_slice_first_journey.mjs` still assert older first-path copy/route contracts.
- Dirty git state remains broad: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries. Do not commit/push as one blob.

### Checks run
- PASS: `npx tsc --noEmit --pretty false --incremental false`.
- PASS: local HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 M1 mission routes, all 5 M2 mission routes.
- PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
- FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path expected snippets.
- FAIL/stale: `node scripts/qa_intro_start_path.mjs` on old root-page headline/direct-start contract.
- FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA expectations.

### Plan sections drafted/refined
- Wrote final iteration-15 artifact with the requested sections 1–12, verification harness, vision-alignment scorecard, and `## Boss summary`.
- Preserved the recommendation: fix QA harness first, prove the first journey, then lock Module 2 gold path, then scale mission spine to Modules 3/14/17/18.

### Final artifact
- `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1726.md`

### Remaining questions/risks
- Public protagonist name remains a launch identity decision: keep Kuttan publicly vs Arun/Kiran with Kuttan as nickname.
- Audio accent/taste still needs human review; technical playback is not native-quality proof.
- Course-wide production/audio floor is not proven for Modules 3–18.

### Next iteration focus
- Patch stale start-path QA to the chosen `/` -> `/intro` -> first M1 mission contract.
- Browser-prove the full first path with audio playback and state transitions.
- Only then move to Module 2 gold path closure / Module 3 mission mapping.
===== ITERATION 15 END 2026-05-31T17:34:55+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-15.log
Git status after iteration 15:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 16 — 2026-05-31T17:42:00+02:00

- Docs/source inspected:
  - Re-read/verified the current plan draft `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1726.md`.
  - Re-inspected first-path routes: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
  - Re-inspected mission data and routes: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, M1/M2 mission route files including `job-languages`, `final-self-intro`, and M1 greeting.
  - Re-inspected QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_gold_slice_first_journey.mjs`, `scripts/qa_module2_production_mobile.mjs`.
  - Re-read key vision docs used to tighten the plan: goals/engagement/retention, Goethe exam map, exercise quality rules, A1 story bible, launch checklist.
- Vision findings:
  - The course promise is stable: Kerala-rooted Goethe A1 mission coach for Malayali beginners.
  - The mission loop must remain hear real German → answer aloud/write → repair one useful mistake → ability win → next pull.
  - Verification is part of the product vision now, not a later engineering chore.
- Mismatch findings:
  - Current `/intro` uses `Your first German moment.` / `Begin lesson 1`; QA still expects older copy like `Greet Frau Weber.` and `Start listening`.
  - Current code direction for M1/M2 is promising: route checks pass, `tsc` passes, and M1/M2 mobile production QA passes.
  - Full-course mismatch remains: old dashboards/support routes exist, Modules 3–18 are not yet mission-spine complete, and Hören/production floors are not course-wide guaranteed.
- Verification run:
  - `date --iso-8601=seconds`: `2026-05-31T17:38:35+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local curl HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 M1 mission routes, all 5 M2 mission routes.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` and `node scripts/qa_gold_slice_first_journey.mjs` on old root/intro copy contract.
- Plan sections drafted/refined:
  - Produced final iteration-16 plan with exact requested sections 1–12, updated evidence, SMART phases, 7-day plan, 48h lane, launch-ready gates, Boss decisions, verification harness, scorecard, and Boss summary.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1742.md`
- Remaining questions/risks:
  - Public protagonist naming remains a Boss decision.
  - Audio accent quality remains human-review unless separately evaluated.
  - Dirty tree is too broad to commit as one blob; source changes must be isolated later.
  - QA harness repair is the immediate build blocker before any more UI/product polish.
- Next iteration focus:
  - If the loop continues, stop planning and patch stale QA to behavior-based checks, then browser-play the first path.
===== ITERATION 16 END 2026-05-31T17:46:13+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-16.log
Git status after iteration 16:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html

## Iteration 17 — 2026-05-31T17:48:00+02:00

- Time/iteration:
  - Iteration 17, 2026-05-31T17:46–17:48+02:00.
- Docs/source inspected:
  - Re-read current plan draft `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1742.md` and checkpoint tail.
  - Re-read key vision docs directly: operating brief, product direction reset, whole-course mission spine, premium quality/anti-hallucination protocol, Goethe A1 exam map, launch checklist.
  - Re-inspected source routes/data: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`.
  - Browser-inspected live local first path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
- Vision findings:
  - Boss’s vision remains stable: Kerala-rooted, Goethe-serious, adult-safe, real-audio, production-first, mission-led, self-sufficient, evidence-verified.
  - The product unit is a mission, not a page, dashboard, game, or script.
  - Verification must be part of the product, because broken review claims are the trust failure.
- Mismatch findings:
  - M1/M2 are directionally good and should be preserved: 8 mission routes, real audio, focused nav/search suppression, mobile voice-first QA passes.
  - Three start-path QA scripts still fail because they encode stale root/intro copy and route assumptions.
  - Browser evidence found a concrete remaining UX leak in the first mission: learner-facing process copy `No builder, no typing.` This must be cut before review.
  - Full-course gaps remain: Modules 3–18 are not mission-spine complete; course-wide production/audio floor is not guaranteed; old dashboard/support systems still exist.
- Verification run:
  - `date --iso-8601=seconds`: `2026-05-31T17:46:57+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Inventory: 8 mission routes, 23 mission audio files, 134 Hören audio files, 24 video files, 6 QA scripts.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local curl HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 M1 mission routes, all 5 M2 mission routes.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets.
  - FAIL/stale: `node scripts/qa_intro_start_path.mjs` on old root-page contract.
  - FAIL/stale: `node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA.
  - PASS with weakness: browser-clicked `/` -> `/intro` -> M1 mission; audio `readyState=4`, `duration=4.752`, progress reached `0:04 / 0:04`, `error=null`; nav/search hidden; visible copy still includes `No builder, no typing.`
- Plan sections drafted/refined:
  - Produced final iteration-17 plan with exact requested sections 1–12 and `## Boss summary`.
  - Added live browser/audio evidence and explicitly promoted `No builder, no typing` removal into Day 2 / first 48h / harness bans.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1748.md`
- Remaining questions/risks:
  - Public protagonist naming remains a Boss decision.
  - Audio accent quality remains human-review unless separately evaluated.
  - Dirty tree is too broad to commit as one blob; source changes must be isolated later.
  - QA harness repair is the immediate build blocker before any more UI/product polish.
- Next iteration focus:
  - If the loop continues, stop planning and patch stale QA to behavior-based checks, then remove visible product-process copy from the first mission path.
===== ITERATION 17 END 2026-05-31T17:48:00+02:00 rc=0 =====

===== ITERATION 17 END 2026-05-31T17:54:28+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-17.log
Git status after iteration 17:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 18 — 2026-05-31T17:56:00+02:00

- Time/iteration:
  - Iteration 18, 2026-05-31T17:54–17:56+02:00.
- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1748.md` and checkpoint tail.
  - Re-inspected mandatory synthesis docs still relevant in this handoff: `COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`.
  - Re-inspected source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`, and first Module 1 mission route.
  - Re-inspected `scripts/qa_mission_pilot.py` source enough to confirm the current stale snippets are in the QA contract, not TypeScript/source build errors.
- Vision findings:
  - No change: Boss wants a Kerala-rooted, adult-safe, Goethe A1 mission coach for Malayali beginners, not incremental UI polish.
  - The course unit is still mission → real audio → learner output → repair → ability win → next pull.
  - Verification harness repair is the immediate trust-restoring build lane.
- Mismatch findings:
  - Current M1/M2 mission direction is worth preserving.
  - `qa_mission_pilot.py` passes its custom audio/opening text/meta-label checks, then fails on stale intro/start-path snippets.
  - Dirty git tree remains 262 entries; no commit/push or broad code churn from this planning loop.
- Verification run:
  - `date --iso-8601=seconds`: `2026-05-31T17:55:38+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` fails on old intro/start-path snippets: `Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, `FIRST_MISSION_PATH`, `?start=listen`.
- Plan sections drafted/refined:
  - Created iteration-18 final artifact by updating the 17:48 plan with fresh handoff-window evidence.
  - Preserved all requested sections 1–12 plus `## Boss summary`.
  - Kept roadmap recommendation unchanged: fix QA/source contract first, then first path, then Module 2 gold path, then Modules 3/14/17/18.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1756.md`
- Remaining questions/risks:
  - Public protagonist name remains a Boss decision.
  - German audio accent quality remains human-review unless separately evaluated.
  - Course-wide mission coverage and production/audio floor are still not launch-ready beyond M1/M2 proof slices.
- Next iteration focus:
  - If another loop continues, stop rewriting the plan. Patch stale QA to behavior-based checks, then cut visible product-process copy from the first mission path.
===== ITERATION 18 END 2026-05-31T17:56:00+02:00 rc=0 =====
===== ITERATION 18 END 2026-05-31T18:00:39+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-18.log
Git status after iteration 18:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 19 — 2026-05-31T18:03:00+02:00

- Time/iteration:
  - Iteration 19, 2026-05-31T18:00–18:03+02:00.
- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1756.md` and checkpoint tail.
  - Re-inspected first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/lib/missions/module1.ts`.
  - Re-inspected shared mission UI: `src/app/missions/module-2/_components/MissionUI.tsx`.
  - Re-inspected stale QA sources: `scripts/qa_mission_pilot.py`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_gold_slice_first_journey.mjs`.
- Vision findings:
  - No vision change: Adipoli is a Kerala-rooted, adult-safe Goethe A1 mission coach, not a dashboard or incremental UI polish project.
  - Verification remains part of the product. Stale QA is now a trust blocker, not just a developer inconvenience.
- Mismatch findings:
  - M1/M2 mission direction remains worth preserving: 8 voice-first missions pass mobile QA.
  - `qa_mission_pilot.py`, `qa_intro_start_path.mjs`, and `qa_gold_slice_first_journey.mjs` still assert old first-path copy/route contracts.
  - `No builder, no typing` survived only as process/accessibility copy in shared mission UI; removed it in this iteration and verified no TS/TSX/MJS/PY source hit remains.
  - Dirty tree remains 262 dirty/untracked entries on branch `adipoli-page-by-page-reset-20260523-1802` at commit `b201d05`.
- Verification run:
  - `date --iso-8601=seconds`: `2026-05-31T18:03:07+02:00`.
  - Dev server listening on `0.0.0.0:3000`.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` still fails on old intro/start-path snippets after custom audio/opening/meta gates pass.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_intro_start_path.mjs` on old root direct-mission contract.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA.
- Plan sections drafted/refined:
  - Produced iteration-19 final artifact with all requested sections 1–12 and `## Boss summary`.
  - Updated evidence to reflect the tiny copy cleanup and fresh QA results.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1803.md`
- Remaining questions/risks:
  - Public protagonist name remains a Boss decision.
  - German audio accent quality remains human-review unless separately evaluated.
  - Course-wide mission coverage and production/audio floor are still not launch-ready beyond M1/M2 proof slices.
- Next iteration focus:
  - Patch stale QA to behavior-based checks for the chosen `/` -> `/intro` -> M1 mission contract; then browser-prove the full first path and only then move to Module 3 / exam-risk module missionization.
===== ITERATION 19 END 2026-05-31T18:03:00+02:00 rc=0 =====
===== ITERATION 19 END 2026-05-31T18:09:05+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-19.log
Git status after iteration 19:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



## Iteration 20 — 2026-05-31T18:09:48+02:00

- Time/iteration:
  - Iteration 20, 2026-05-31T18:09–18:12+02:00.
- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1803.md` and checkpoint tail.
  - Re-inspected current root/intro source: `src/app/page.tsx`, `src/app/intro/page.tsx`.
  - Re-inspected mission model source: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`.
  - Reconfirmed active docs index and operating brief requirements: mission-based, Kerala-rooted, Goethe-serious, adult-safe, real-audio, production-first, self-sufficient.
- Vision findings:
  - No direction change. The correct product is a Kerala-rooted Goethe A1 mission coach, not incremental UI polish or a dashboard.
  - Current M1/M2 mission direction is worth preserving because it matches the hear -> answer aloud -> repair -> win pattern and passes the targeted mobile mission QA.
  - The next trust-restoring step is verification-harness repair, not more copy/container polish.
- Mismatch findings:
  - The product still lacks course-wide mission coverage beyond M1/M2 and course-wide production/audio floor guarantees.
  - Three QA scripts are stale against the chosen first-path contract and should be repaired to behavior-based gates instead of forcing source copy backward.
  - Dirty git tree remains too broad for commit/push as one blob.
- Verification run:
  - `date --iso-8601=seconds`: `2026-05-31T18:09:48+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Dev server listening on `0.0.0.0:3000`.
  - PASS: route-status HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, and all 5 Module 2 mission routes.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` still fails on old intro/start-path snippets after its custom audio/opening/meta gates pass.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_intro_start_path.mjs` still expects old root-page contract.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_gold_slice_first_journey.mjs` still expects old intro copy/CTA.
- Plan sections drafted/refined:
  - Produced iteration-20 final artifact with all requested sections 1–12 and `## Boss summary`.
  - Updated evidence baseline with fresh command outputs and route-status check.
  - Kept roadmap recommendation unchanged: QA contract repair -> first path proof -> Module 2 gold path -> Modules 3/14/17/18 missionization.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1809.md`
- Remaining questions/risks:
  - Public protagonist name remains a Boss decision.
  - German audio accent/taste remains human-review; technical playback proves reviewability only.
  - No source rewrite should happen before the verification harness is trustworthy.
- Next iteration focus:
  - Patch stale QA scripts to behavior-based vision gates for `/` -> `/intro` -> first M1 audio mission, then browser-prove the path before Module 3 work.
===== ITERATION 20 END 2026-05-31T18:12:39+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-20.log
Git status after iteration 20:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



## Iteration 21 — 2026-05-31T18:13:22+02:00

- Time/iteration:
  - Iteration 21, 2026-05-31T18:13–18:20+02:00.
- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1809.md` and checkpoint tail.
  - Re-read core/mandatory vision docs: docs index, operating brief, product direction reset, whole-course mission spine, autonomous execution plan, premium quality protocol, goals/retention brief, A1 story bible, Goethe exam map, exercise quality rules, module blueprints, launch checklist.
  - Re-inspected current first-path and mission source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`, and mission route inventory.
  - Re-inspected QA script inventory: `qa_mission_pilot.py`, `qa_intro_start_path.mjs`, `qa_gold_slice_first_journey.mjs`, `qa_module2_production_mobile.mjs`.
- Vision findings:
  - No direction change. Boss wants a Kerala-rooted, Goethe-serious, adult-safe, real-audio, production-first mission coach, not more isolated UI polish.
  - The reusable course unit is still the mission: situation -> hear -> respond -> notice/repair -> ability win -> next pull.
  - Verification is part of the product, not an engineering afterthought, because stale/overconfident QA is a trust failure.
- Mismatch findings:
  - M1/M2 mission implementation is directionally worth preserving: all 8 routes exist, all return 200 locally, and mobile mission QA passes.
  - Product coherence is incomplete: Modules 3-18 lack mission coverage and course-wide production/audio floors are not guaranteed.
  - Three QA scripts are still stale against the chosen first-path contract and should be repaired to behavior-based gates instead of forcing source copy backward.
  - Dirty git state remains too broad for commit/push as one blob.
- Verification run:
  - `date --iso-8601=seconds`: `2026-05-31T18:13:22+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Dev server listening on `0.0.0.0:3000`.
  - PASS: route-status HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, and all 5 Module 2 mission routes.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` — 8 voice-first M1/M2 missions, 390px mobile viewport, nav/search hidden, no legacy builders on reviewed path.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` still fails on old intro/start-path snippets after custom audio/opening/meta/cognitive-load checks pass.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_intro_start_path.mjs` still expects old root direct-start contract.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_gold_slice_first_journey.mjs` still expects old intro copy/CTA.
- Plan sections drafted/refined:
  - Produced iteration-21 final artifact with all requested sections 1-12 and `## Boss summary`.
  - Tightened evidence baseline to fresh 18:13 command outputs.
  - Kept roadmap recommendation unchanged: QA contract repair -> first path proof -> Module 2 gold path -> Modules 3/14/17/18 missionization -> production/audio floor -> beta readiness.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1813.md`
- Remaining questions/risks:
  - Public protagonist name remains a Boss decision.
  - German audio accent/taste remains human-review; technical playback proves reviewability only.
  - No source rewrite should happen before the verification harness is trustworthy.
- Next iteration focus:
  - Patch stale QA scripts to behavior-based vision gates for `/` -> `/intro` -> first M1 audio mission, then browser-prove the path before Module 3 work.
===== ITERATION 21 END 2026-05-31T18:20:00+02:00 rc=0 =====
===== ITERATION 21 END 2026-05-31T18:21:39+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-21.log
Git status after iteration 21:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 22 — 2026-05-31T18:23:09+02:00

- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1813.md` and checkpoint tail.
  - Re-inspected current first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
  - Re-inspected mission source/data: `src/app/missions/module-2/_components/MissionUI.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`.
  - Re-inspected QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_module2_production_mobile.mjs`.
- Vision findings:
  - Vision remains stable: Kerala-rooted, adult-safe, Goethe A1 serious, dialogue-scene-first, real-audio, production-first, self-sufficient, evidence-gated.
  - Current M1/M2 direction is worth preserving; do not rewrite product copy to satisfy stale QA.
  - The shortest route back to trust is QA harness repair, then first-path and Module 2 gold-path proof.
- Mismatch findings:
  - Source current contract is `/` compact professional framing -> `/intro` first action -> `/missions/module-1/greet-frau-weber`.
  - `qa_mission_pilot.py`, `qa_intro_start_path.mjs`, and `qa_gold_slice_first_journey.mjs` still encode older direct-start/copy expectations.
  - Mission coverage remains only M1/M2; course-wide production/audio floor is not guaranteed.
- Verification run:
  - Date: `2026-05-31T18:23:09+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Dev server listening on `0.0.0.0:3000`.
  - PASS: HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 M1 mission routes, all 5 M2 mission routes.
  - PASS: browser click proof `/` -> `/intro` -> first M1 mission; mission audio `readyState=4`, `duration=4.752`, `currentTime` advanced, `error=null`, nav/search hidden, no console/page errors.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for 8 voice-first M1/M2 missions.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_intro_start_path.mjs` on old root direct-start contract.
  - FAIL/stale: `ADIPOLI_BASE_URL=http://127.0.0.1:3000 node scripts/qa_gold_slice_first_journey.mjs` on old intro copy/CTA.
- Plan sections drafted/refined:
  - Created latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1823.md` with updated iteration-22 evidence.
  - Kept the requested 12 sections plus `## Boss summary`.
- Remaining questions/risks:
  - Decide beta scope, public protagonist name, audio quality bar, AI correction policy, and game visibility.
  - Do not commit/push the dirty tree as one blob.
  - Technical audio proof does not prove accent/native quality.
- Next iteration focus:
  - If another iteration runs, stop writing plan variants and patch the stale QA harness first.
===== ITERATION 22 END 2026-05-31T18:27:38+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-22.log
Git status after iteration 22:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html

## Iteration 23 — 2026-05-31T18:28:37+02:00

- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1823.md` and the checkpoint tail.
  - Re-inspected current first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
  - Re-inspected mission source/data: `src/app/missions/module-2/_components/MissionUI.tsx`, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`.
  - Re-inspected QA scripts: `scripts/qa_mission_pilot.py`, `scripts/qa_intro_start_path.mjs`, `scripts/qa_module2_production_mobile.mjs`.
- Vision findings:
  - Vision has not changed: Kerala-rooted, adult-safe, Goethe A1 serious, dialogue-scene-first, real-audio, production-first, self-sufficient, evidence-gated.
  - Current M1/M2 mission slice is directionally right and should be preserved.
  - The next real trust win is harness repair, not another visual tweak or another broad strategy doc.
- Mismatch findings:
  - Current source contract remains `/` compact professional framing -> `/intro` first action -> first M1 audio mission.
  - `qa_mission_pilot.py` still encodes stale start-path snippets and fails after its mission/audio/text checks pass.
  - Course-wide mission coverage remains incomplete beyond M2; production/audio floors are not guaranteed for Modules 3-18.
- Verification run:
  - Date: `2026-05-31T18:28:37+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Inventory: 3 M1 mission routes, 5 M2 mission routes, 18 module content files, 23 mission MP3s, 134 Hören MP3s.
  - PASS: HTTP 200 confirmed for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for all 8 voice-first M1/M2 missions.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets after passing custom audio/opening/meta/choice/repair checks.
- Plan sections drafted/refined:
  - Created latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1828.md` with updated iteration-23 evidence.
  - Kept the requested 12 sections plus `## Boss summary`.
  - Did not create code churn; this loop is synthesis/planning only.
- Remaining questions/risks:
  - Decide beta scope, public protagonist name, audio quality bar, AI correction policy, and game visibility.
  - Do not commit/push the dirty tree as one blob.
  - Technical audio proof does not prove accent/native quality.
- Next iteration focus:
  - If one more iteration runs before hard stop, stop producing plan variants; patch stale QA scripts to the chosen first-path contract and rerun the harness.
===== ITERATION 23 END 2026-05-31T18:31:00+02:00 rc=0 =====
===== ITERATION 23 END 2026-05-31T18:32:41+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-23.log
Git status after iteration 23:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html

## Iteration 24 — 2026-05-31T18:33:25+02:00

- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1828.md` and checkpoint tail.
  - Re-read/checked core vision docs already synthesized in loop: README, operating brief, product reset, mission spine, autonomous execution, premium quality protocol, goals/retention, story bible, Goethe map, exercise rules, course 10/10 plan, game/launch/audit docs.
  - Re-inspected source routes: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
  - Re-inspected mission data/QA: `src/lib/missions/module2.ts`, `scripts/qa_mission_pilot.py`.
- Vision findings:
  - Boss’s vision remains stable: Kerala-rooted, adult-safe, Goethe A1 serious, dialogue-scene-first, real-audio, production-first, self-sufficient, evidence-gated.
  - Current M1/M2 mission slice is directionally right and should be preserved.
  - The next real trust win is harness repair, not another visual tweak or another broad strategy doc.
- Mismatch findings:
  - Current source contract remains `/` compact professional framing -> `/intro` first action -> first M1 audio mission.
  - Browser click proof confirms that path works locally.
  - `qa_mission_pilot.py` still encodes stale start-path snippets and fails after passing custom audio/opening/meta/choice/repair checks.
  - Course-wide mission coverage remains incomplete beyond M2; production/audio floors are not guaranteed for Modules 3-18.
- Verification run:
  - Date: `2026-05-31T18:33:25+02:00`.
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Inventory: 8 mission routes, 18 module content files, 23 mission MP3s, 134 Hören MP3s.
  - PASS: HTTP 200 confirmed for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1 mission routes, all M2 mission routes.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for all 8 voice-first M1/M2 missions.
  - PASS: Browser click path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`; first mission audio proof `readyState=4`, `duration=4.752`, `currentTime` advanced, `error=null`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets after passing custom audio/opening/meta/choice/repair checks.
- Plan sections drafted/refined:
  - Created final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1833.md` with updated iteration-24 evidence.
  - Kept the requested 12 sections plus `## Boss summary`.
  - Did not create code churn; this loop is synthesis/planning only.
- Remaining questions/risks:
  - Decide beta scope, public protagonist name, audio quality bar, AI correction policy, and game visibility.
  - Do not commit/push the dirty tree as one blob.
  - Technical audio proof does not prove accent/native quality.
- Next iteration focus:
  - Stop producing plan variants; patch stale QA scripts to the chosen first-path contract and rerun the harness.
===== ITERATION 24 END 2026-05-31T18:39:00+02:00 rc=0 =====
===== ITERATION 24 END 2026-05-31T18:39:38+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-24.log
Git status after iteration 24:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 25 — 2026-05-31T18:40:23+02:00

- Time/iteration:
  - Iteration 25, final synthesis before hard stop.
- Docs/source inspected:
  - Re-read latest final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1833.md` and checkpoint tail.
  - Re-inspected current first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
  - Re-inspected mission data: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`.
  - Re-ran source/media inventory and current QA commands.
- Vision findings:
  - Vision remains stable: Kerala-rooted, adult-safe, Goethe A1 serious, dialogue-scene-first, real-audio, production-first, self-sufficient, evidence-gated.
  - Current M1/M2 mission slice is worth preserving; the next trust win is harness repair, not UI polish.
- Mismatch findings:
  - First-path source contract remains `/` compact professional framing -> `/intro` first action -> first M1 audio mission.
  - Course-wide mission coverage still stops at M1/M2; Modules 3-18 need mission/checkpoint conversion and production/audio floor proof.
  - `scripts/qa_mission_pilot.py` still fails on stale intro/start-path snippets after its mission/audio/text checks pass.
- Verification run:
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Inventory: 8 mission routes, 18 module content files, 23 mission MP3s, 134 Hören MP3s.
  - PASS: HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all M1/M2 mission routes.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for all 8 voice-first M1/M2 missions.
  - PASS: browser click path `/` -> `/intro` -> `/missions/module-1/greet-frau-weber`.
  - PASS: first mission audio browser proof: one `<audio>`, `readyState=4`, `duration=4.752`, `currentTime` advanced to `0.630745`, `error=null`; browser console clean.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` on old intro/start-path snippets.
- Plan sections drafted/refined:
  - Produced final requested artifact: `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1840.md`.
  - Kept the exact requested 12 sections plus `## Boss summary`.
  - Updated evidence to iteration-25 route, browser, audio, TypeScript, and QA results.
- Remaining questions/risks:
  - Boss decisions remain: beta scope, public protagonist name, audio quality bar, AI correction policy, game visibility.
  - Do not commit/push this dirty tree as one blob.
  - Technical audio proof does not prove native/accent quality.
- Next iteration focus:
  - Stop plan variants. Execute Phase 0: patch stale QA harness to the chosen contract, then rerun proof before Module 3 work.
===== ITERATION 25 END 2026-05-31T18:45:00+02:00 =====
===== ITERATION 25 END 2026-05-31T18:43:57+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-25.log
Git status after iteration 25:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 26 — 2026-05-31T18:47:00+02:00

- Time/iteration:
  - Iteration 26, final synthesis before hard stop.
- Docs/source inspected:
  - Re-read latest final draft `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1840.md` and checkpoint tail.
  - Re-inspected source route files for `/`, `/intro`, `/learn`, `/learn/[moduleId]`, Module 1/2 mission examples, shared `MissionUI`, `src/lib/missions/module2.ts`, and `scripts/qa_mission_pilot.py`.
  - Refreshed docs signal via headings/key lines from README, operating brief, product reset, mission spine, autonomous plan, premium quality protocol, goals/retention, story bible, Goethe map, exercise rules, and launch checklist.
- Vision findings:
  - Boss’s stable vision is a Kerala-rooted, adult-safe, Goethe-serious mission coach: scene -> real German audio -> learner output -> mistake repair -> named ability -> next pull.
  - Verification is part of the product, not admin. Agents must not call work good without browser/audio/source evidence and PASS/WEAK/FAIL scoring.
- Mismatch findings:
  - M1/M2 mission work is directionally correct and should be preserved.
  - The immediate blocker remains stale QA/start-path contract drift, not lack of UI polish.
  - Course-wide launch readiness is unproven because Modules 3-18 do not yet have the same mission/checkpoint/audio/production proof.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` passes custom audio/opening-text/meta-label/choice/repair/scene-copy checks, then fails on stale intro snippets (`Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, `FIRST_MISSION_PATH`, `?start=listen`).
  - Git baseline: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries, 113 tracked changed files excluding `GermanCourse_QC/`.
- Plan sections drafted/refined:
  - Produced final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1847.md` with all requested sections 1-12 plus `## Boss summary`.
  - Updated evidence section to distinguish fresh iteration-26 checks from earlier browser/route/audio evidence captured in this loop.
- Remaining questions/risks:
  - Public name decision: keep Kuttan publicly or use Arun/Kiran with Kuttan as nickname.
  - Audio accent/taste remains human-review; technical playback proof only proves reviewability.
  - Dirty git state must be separated before any commit/push.
- Next iteration focus:
  - Start actual build lane by patching stale QA harness, then prove `/` -> `/intro` -> Module 1 mission sequence and Module 2 gold path before starting Module 3.
===== ITERATION 26 END 2026-05-31T18:47:00+02:00 rc=0 =====
===== ITERATION 26 END 2026-05-31T18:49:43+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-26.log
Git status after iteration 26:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 27 — 2026-05-31T18:50:00+02:00

- Time/iteration:
  - Iteration 27, final artifact refresh before hard stop.
- Docs/source inspected:
  - Re-read latest final draft `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1847.md` and checkpoint tail.
  - Re-inspected current QA source enough to confirm the failure class in `scripts/qa_mission_pilot.py`.
  - Reconfirmed source/route scope from this loop: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, all M1/M2 mission routes, `src/lib/missions/`, `src/lib/content/modules/`, audio folders, and existing QA scripts.
- Vision findings:
  - No vision change: Adipoli must be a Kerala-rooted, adult-safe, Goethe-serious, real-audio, production-first mission coach.
  - First-path/M1/M2 mission direction is worth preserving; more UI/container polish is the wrong next move.
- Mismatch findings:
  - The remaining immediate blocker is still stale QA/start-path contract drift.
  - Course-wide launch readiness is still unproven beyond M1/M2 because Modules 3-18 lack the same mission/checkpoint/audio/production proof.
  - Dirty git state remains broad: 262 dirty/untracked entries, 113 tracked changed files excluding `GermanCourse_QC/`.
- Verification run:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local route-status curl HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 missions, and all 5 Module 2 missions.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for all 8 voice-first M1/M2 missions at 390px.
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` still fails only after several relevant subchecks pass, on stale intro/start-path snippets (`Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, `FIRST_MISSION_PATH`, `?start=listen`).
- Plan sections drafted/refined:
  - Produced final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1850.md`.
  - Kept the exact requested 12 sections plus `## Boss summary`.
  - Updated evidence to iteration-27 command results without adding broad code churn.
- Remaining questions/risks:
  - Boss decisions remain: beta scope, public protagonist name, audio quality bar, AI correction policy, game visibility.
  - Technical audio proof still does not prove native/accent quality.
  - Do not commit/push the dirty tree as one blob.
- Next iteration focus:
  - Stop producing plan variants. Execute Phase 0: repair the stale QA harness, then browser-prove `/` -> `/intro` -> Module 1 sequence and Module 2 gold path before Module 3 work.
===== ITERATION 27 END 2026-05-31T18:50:00+02:00 rc=0 =====
===== ITERATION 27 END 2026-05-31T18:53:17+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-27.log
Git status after iteration 27:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 28 — 2026-05-31T18:54:08+02:00

- Time/iteration:
  - Iteration 28, final verification/synthesis pass before hard stop.
- Docs/source inspected:
  - Re-read latest final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1850.md`.
  - Re-read checkpoint tail for iteration continuity.
  - Re-inspected core vision docs: `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`, `AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`, `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`, `A1_STORY_BIBLE.md`, `GOETHE_A1_EXAM_MAP.md`, `EXERCISE_QUALITY_RULES.md`.
  - Re-inspected source routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, shared mission UI, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, and QA scripts.
- Vision findings:
  - Final plan still matches Boss vision: Kerala-rooted, adult-safe, Goethe-serious, mission-based, real-audio, production-first, self-sufficient course.
  - Product model remains mission-first: situation -> hear -> output -> repair -> win -> next pull.
- Mismatch findings:
  - Stale QA remains the only fresh failing command class: `scripts/qa_mission_pilot.py` still expects old intro/start-path snippets.
  - M1/M2 mission path is directionally solid, but launch readiness beyond M2 is unproven.
  - Dirty tree remains too broad to commit/push as one blob.
- Verification run:
  - Time/branch/commit checked: `20260531-1854`, branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`.
  - Dirty status entries: `262`.
  - Diff scale excluding `GermanCourse_QC/`: 113 tracked files, `40117 insertions`, `12439 deletions`.
  - PASS: `npx tsc --noEmit --pretty false --incremental false` produced no errors.
  - PARTIAL/FAIL: `python3 scripts/qa_mission_pilot.py` passes custom audio/opening text/meta-label/choice/repair/scene-copy checks, then fails on stale intro/start-path snippets: `Greet Frau Weber.`, `Guten Morgen, Frau Weber.`, `Start listening <ArrowRight`, `FIRST_MISSION_PATH`, `?start=listen`.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for all 8 voice-first M1/M2 missions at 390px; nav/search hidden; no legacy builders on reviewed path.
- Plan sections drafted/refined:
  - Final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1850.md` already contains the required 12 sections plus `## Boss summary`.
  - No additional plan variant needed; more planning would be avoidance.
- Remaining questions/risks:
  - Boss decisions remain capped at 5: beta scope, public protagonist name, audio quality bar, AI correction policy, game visibility.
  - Audio technical proof still does not prove native accent quality.
  - Future agents must fix QA truth before more UI polish.
- Next iteration focus:
  - Stop planning. Execute Phase 0: repair stale QA harness and browser-prove the full first path + Module 2 gold path.
===== ITERATION 28 END 2026-05-31T18:54:08+02:00 rc=0 =====
===== ITERATION 28 END 2026-05-31T18:56:27+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-28.log
Git status after iteration 28:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 29 — 2026-05-31T18:56+02:00

- Time/iteration:
  - Iteration 29, final synthesis/write pass before hard stop.
- Docs/source inspected:
  - Re-read latest final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1850.md`.
  - Re-read checkpoint tail from iteration 28.
  - Refreshed source route inspection for `/`, `/intro`, `/learn`, `/learn/[moduleId]`, all Module 1/2 mission routes, `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, and existing QA scripts.
- Vision findings:
  - Vision is stable and no more strategy churn is useful: Kerala-rooted Goethe A1 mission coach for Malayali adults.
  - Product unit remains mission: situation -> hear real German -> produce aloud/write -> repair -> named ability win -> next pull.
- Mismatch findings:
  - M1/M2 route direction is worth preserving.
  - Trust blocker remains QA truth, not lack of a new plan: `qa_mission_pilot.py` still fails only after passing several current mission checks because it expects stale intro/start-path snippets.
  - Launch readiness beyond M2 is unproven; course-wide production/audio floors still need audit.
  - Git state remains too broad to commit/push as one blob.
- Verification run:
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`.
  - Dirty status entries: `262`.
  - Diff scale excluding `GermanCourse_QC/`: 113 tracked files, `40117 insertions`, `12439 deletions`.
  - PASS: `npx tsc --noEmit --pretty false --incremental false`.
  - PASS: local curl HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 Module 1 mission routes, and all 5 Module 2 mission routes.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` for 8 voice-first M1/M2 missions.
  - PARTIAL/FAIL: `python3 scripts/qa_mission_pilot.py` passes current mission subchecks but fails stale intro/start-path snippets.
- Plan sections drafted/refined:
  - Wrote final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1856.md` with all requested sections 1-12 and `## Boss summary`.
  - Updated evidence block to iteration 29 final verification.
- Remaining questions/risks:
  - Boss decisions remain capped at five: beta scope, public protagonist name, audio quality bar, AI correction policy, game visibility.
  - Technical audio playback is not native/accent-quality proof.
  - First real execution lane is Phase 0 QA harness repair, not more UI polish.
- Next iteration focus:
  - Stop planning. Execute Phase 0: repair stale QA harness and browser-prove first path + Module 2 gold path before Module 3 work.
===== ITERATION 29 END 2026-05-31T18:56:57+02:00 rc=0 =====
===== ITERATION 29 END 2026-05-31T18:59:06+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-29.log
Git status after iteration 29:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


## Iteration 30 — 2026-05-31T19:01:45+02:00

- Docs/source inspected:
  - Re-read final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1856.md`.
  - Re-inspected active first-path routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`.
  - Re-inspected mission data/UI: `src/lib/missions/module1.ts`, `src/lib/missions/module2.ts`, `src/app/missions/module-2/_components/MissionUI.tsx`.
  - Re-inspected current QA contract in `scripts/qa_mission_pilot.py`.
  - Confirmed mission route inventory: 3 Module 1 routes and 5 Module 2 routes.
- Vision findings:
  - The final plan still matches Boss vision: Kerala-rooted, Goethe-serious, adult-safe, real-audio, production-first mission coach.
  - The first build lane should be verification-harness repair, not more UI/container polish.
- Mismatch findings:
  - Source now uses `/` compact professional framing -> `/intro` first German moment -> first M1 mission.
  - `qa_mission_pilot.py` still encodes stale intro/start-path snippets from an older contract and fails there.
  - M1/M2 local route availability and mobile production QA are still good.
- Verification run:
  - Branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, dirty/untracked entries `262`.
  - Diff excluding `GermanCourse_QC/`: 113 files changed, 40117 insertions, 12439 deletions.
  - `npx tsc --noEmit --pretty false --incremental false`: PASS.
  - Local curl: HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, all 3 M1 mission routes, all 5 M2 mission routes.
  - `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`: PASS for 8 M1/M2 voice-first mobile missions.
  - `python3 scripts/qa_mission_pilot.py`: partial PASS then FAIL on stale intro/start-path snippets.
- Plan sections drafted/refined:
  - Produced final timestamped SMART plan with requested sections 1-12 and Boss summary.
  - Updated final artifact timestamp and iteration evidence from iteration 30.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1901.md`
- Remaining questions/risks:
  - Do not commit/push dirty tree as one blob.
  - QA harness must be repaired before next product review claim.
  - Course-wide mission/production/audio floors beyond M2 remain unproven.
- Next iteration focus:
  - If build continues: patch stale QA contract first, then browser-prove first path and Module 2 gold path.
===== ITERATION 30 END 2026-05-31T19:03:04+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-30.log
Git status after iteration 30:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



## Iteration 31 — 2026-05-31T19:04+02:00

- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1901.md` and checkpoint synthesis.
  - Re-inspected first-path source: `src/app/page.tsx`, `src/app/intro/page.tsx`, `src/app/learn/page.tsx`, `src/app/learn/[moduleId]/page.tsx`.
  - Reconfirmed mission inventory: 3 Module 1 routes, 5 Module 2 routes, mission data in `src/lib/missions/`, and QA scripts.
- Vision findings:
  - Final direction remains: Kerala-rooted, adult-safe Goethe A1 mission coach; hear real German early, answer aloud/write, repair one mistake, leave with a named ability.
  - First build lane must be proof/QA contract repair, not another UI polish pass.
- Mismatch findings:
  - M1/M2 mission routes are the right direction, but QA trust is blocked by stale start-path expectations.
  - Git state remains too broad for commit/push: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries, 113 changed tracked files excluding QC.
- Verification run:
  - FAIL/stale: `python3 scripts/qa_mission_pilot.py` passes audio/text/meta/choice/repair/scene checks, then fails on old intro/start-path snippets.
  - PASS: `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` passes all 8 M1/M2 voice-first mobile missions.
- Plan sections drafted/refined:
  - Produced final iteration-31 artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1904.md` with all requested sections 1-12 and Boss summary.
- Remaining questions/risks:
  - Boss still needs max-5 decisions listed in final plan; public name and audio quality bar are highest leverage.
  - Do not claim paid launch-ready until first-path QA, mission coverage, production/audio floor, and Goethe checkpoints pass.
- Next iteration focus:
  - Patch stale QA harness first, then browser-prove `/` -> `/intro` -> Module 1 mission sequence with audio evidence.
===== ITERATION 31 END 2026-05-31T19:05:38+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-31.log
Git status after iteration 31:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



## Iteration 32 — 2026-05-31T19:06+02:00

- Time/iteration:
  - Final synthesis iteration before hard stop.
- Docs/source inspected:
  - Re-read latest final plan `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1904.md`.
  - Re-read checkpoint tail and current QA evidence.
  - Reconfirmed current source/QA contract from prior loop evidence: `/` compact framing -> `/intro` first action -> Module 1 audio mission; M1/M2 mission routes are the current aligned product direction.
- Vision findings:
  - No direction change: Adipoli must be a Kerala-rooted, adult-safe, Goethe A1 mission coach, not a dashboard or generic lesson library.
  - First executable lane remains QA/source-contract repair, then full first-path proof, then Module 2 gold-standard hardening.
- Mismatch findings:
  - `python3 scripts/qa_mission_pilot.py` still fails only on stale intro/start-path snippets after passing custom audio, opening text budget, visible meta-label, choice, repair, and scene-copy checks.
  - `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs` passes all 8 M1/M2 voice-first mobile missions.
  - Git state remains high-risk for commit/push: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries, 113 changed tracked files excluding QC.
- Plan sections drafted/refined:
  - Produced final iteration-32 artifact with all requested sections 1-12 and `## Boss summary`.
  - Updated verification evidence to the 19:06 re-run.
- Final artifact:
  - `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1906.md`
- Remaining questions/risks:
  - Public protagonist name and audio quality bar remain the two highest-leverage Boss decisions.
  - Do not call paid launch-ready until first-path QA, mission coverage beyond M2, production/audio floor, and Goethe checkpoints pass.
- Next iteration focus:
  - Patch stale QA harness first; do not polish UI containers.
===== ITERATION 32 END 2026-05-31T19:07:00+02:00 rc=0 =====
===== ITERATION 32 END 2026-05-31T19:07:21+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-32.log
Git status after iteration 32:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



---

## Iteration 33 — 2026-05-31T19:07+02:00

### Docs/source inspected
- Re-read latest final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1906.md`.
- Re-read checkpoint tail and current dirty git snapshot.
- Re-ran `python3 scripts/qa_mission_pilot.py` for final evidence.

### Vision findings
- No change: Adipoli must be a Kerala-rooted, Goethe-serious, adult-safe, audio/production-first mission course, not another dashboard/UI-polish project.
- First path contract remains `/` compact framing -> `/intro` first action -> first M1 audio mission.

### Mismatch findings
- Git tree remains broad and dirty: 262 status entries. Do not commit/push as one blob.
- `qa_mission_pilot.py` still passes custom-audio/text/meta/choice/repair/scene checks, then fails on stale intro/start-path snippet expectations.

### Plan sections drafted/refined
- Created final iteration-33 artifact by refreshing the 19:06 plan and adding a final addendum.
- Kept all required sections 1-12 plus `## Boss summary`.

### Final artifact
- `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1907.md`

### Remaining questions/risks
- Public protagonist name still needs Boss decision.
- German audio accent quality still needs human/audio-quality review before paid launch.
- QA contract repair remains the first build lane; no broad code churn was made in this planning iteration.

### Next iteration focus
- Execute the first 48h lane: patch stale QA, browser-prove first path, then Module 2 gold-standard audit/build.
===== ITERATION 33 END 2026-05-31T19:08:00+02:00 rc=0 =====
===== ITERATION 33 END 2026-05-31T19:08:41+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-33.log
Git status after iteration 33:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html



---

## Iteration 34 — 2026-05-31T19:09+02:00

### Time/iteration
- Hard-stop final synthesis refresh.

### Docs/source inspected
- Re-read latest final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1907.md`.
- Re-read checkpoint tail for iterations 32-33.
- Rechecked live git baseline with `date`, branch, commit, dirty count, and diff scale.

### Vision findings
- No change: Boss wants a Kerala-rooted, adult-safe, Goethe-serious, audio/production-first mission course, not dashboard polish or another strategy loop.
- Current first-path contract remains `/` compact professional framing -> `/intro` first action -> Module 1 audio mission.

### Mismatch findings
- Dirty tree remains broad and high-risk: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries, 113 changed tracked files excluding `GermanCourse_QC/`.
- Stale QA contract remains the first executable blocker; the product direction itself did not change in the final minutes.

### Plan sections drafted/refined
- Produced hard-stop final artifact with all requested sections 1-12 plus `## Boss summary`.
- Refreshed timestamp/evidence and marked it as iteration 34 hard-stop final synthesis.

### Final artifact
- `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1909.md`

### Remaining questions/risks
- Public protagonist name and audio quality bar remain Boss decisions.
- First build lane must repair QA before more UI polish or Module 3 claims.
- Paid launch remains blocked until first-path QA, mission coverage beyond M2, production/audio floor, and Goethe checkpoint gates pass.

### Next iteration focus
- Execute the first 48h lane from the final plan: patch stale QA, browser-prove first path, then harden Module 2 as the gold-standard mission module.
===== ITERATION 34 END 2026-05-31T19:09:14+02:00 rc=0 =====
===== ITERATION 34 END 2026-05-31T19:11:28+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-34.log
Git status after iteration 34:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


---

## Iteration 35 — 2026-05-31T19:12+02:00

### Time/iteration
- Final hard-stop handoff, iteration 35.

### Docs/source inspected
- Re-read latest final artifact `GermanCourse_QC/adipoli-vision-smart-plan-20260531-1909.md`.
- Re-read checkpoint tail for iteration 34.
- Rechecked live baseline with `date`, branch, commit, and dirty count.

### Vision findings
- No change: Boss wants a Kerala-rooted, adult-safe, Goethe-serious, audio/production-first mission course.
- The correct next move remains execution against the plan, not more strategy or UI-container polish.

### Mismatch findings
- Dirty tree remains broad: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries.
- First executable blocker remains stale QA contract vs current `/` -> `/intro` -> first M1 audio mission contract.

### Plan sections drafted/refined
- Created final handoff artifact from the 19:09 synthesis and refreshed the timestamp/evidence for iteration 35.
- Kept all requested sections 1-12 plus `## Boss summary`.

### Final artifact
- `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1912.md`

### Remaining questions/risks
- Public protagonist name and audio quality bar remain Boss decisions.
- Paid launch remains blocked until first-path QA, mission coverage beyond M2, production/audio floor, and Goethe checkpoint gates pass.

### Next iteration focus
- Execute the first 48h lane: patch stale QA, browser-prove first path, then harden Module 2 as the gold-standard mission module.
===== ITERATION 35 END 2026-05-31T19:12:11+02:00 rc=0 =====
===== ITERATION 35 END 2026-05-31T19:13:32+02:00 rc=0 =====
Output: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/iteration-35.log
Git status after iteration 35:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html


# Loop hard stop reached
Finished: 2026-05-31T19:14:34+02:00
Run dir: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan
Final report log: /shared/german-course/GermanCourse_QC/continuous-4h-vision-plan-20260531-153735-vision-smart-plan/final-report.log
Latest git status:
 M docs/A1_CURRICULUM_AUDIT.md
 D docs/AI_CINEMATIC_SCRIPTS.md
 D docs/AI_CINEMATIC_SCRIPTS_V3.md
 M docs/AI_CINEMATIC_SCRIPTS_V4.md
 M docs/AI_GENERATION_COSTS.md
 M docs/AI_GENERATION_LOG.md
 D docs/CINEMATIC_VIDEO_SERIES.md
 M docs/COURSE_PLAN_10_10.md
 M docs/EXERCISE_QUALITY_RULES.md
 M docs/GOETHE_A1_EXAM_MAP.md
 M docs/LESSON_BLUEPRINTS_PRIORITY.md
 M docs/MODULE_BLUEPRINTS.md
 M docs/SCRIPT_ARCHITECTURE.md
 M docs/SERIES_ARC_PLAN.md
 M docs/SERIES_FULL_SCRIPT.md
 D docs/VIDEO_PIPELINE_V3.md
 D docs/pilot-video-1-foundation.md
 M docs/scripts/v1-2-2_FULL_SCRIPT.md
 M docs/scripts/v1-4-2_FULL_SCRIPT.md
 M docs/scripts/v1-5-2_FULL_SCRIPT.md
 M docs/scripts/v1-6-1_FULL_SCRIPT.md
 M docs/scripts/v2-2-1_FULL_SCRIPT.md
 M package-lock.json
 M package.json
 M public/sw.js
 D scripts/build-100-prompts.py
 M scripts/cinematic-arc.json
 A scripts/qa_mission_pilot.py
 M src/app/auth/callback/page.tsx
 M src/app/auth/login/page.tsx
 M src/app/auth/signup/page.tsx
 M src/app/error.tsx
 M src/app/games/article-blitz/page.tsx
 M src/app/games/dialogue-dash/page.tsx
 M src/app/games/fill-the-gap/page.tsx
 M src/app/games/food-order/page.tsx
 M src/app/games/greeting-time/page.tsx
 M src/app/games/listen-act/page.tsx
 M src/app/games/number-blitz/page.tsx
 M src/app/games/page.tsx
 M src/app/games/sentence-builder/page.tsx
 M src/app/games/verb-rush/page.tsx
 D src/app/games/word-match/page.tsx
 M src/app/intro/page.tsx
 M src/app/landing/page.tsx
 M src/app/layout.tsx
 M src/app/learn/[moduleId]/[lessonId]/page.tsx
 M src/app/learn/[moduleId]/page.tsx
 M src/app/learn/page.tsx
 A src/app/missions/module-2/_components/MissionUI.tsx
 A src/app/missions/module-2/final-self-intro/page.tsx
 A src/app/missions/module-2/from-kerala/page.tsx
 A src/app/missions/module-2/job-languages/page.tsx
 A src/app/missions/module-2/self-intro/page.tsx
 A src/app/missions/module-2/spell-name/page.tsx
 M src/app/not-found.tsx
 M src/app/onboarding/page.tsx
 M src/app/page.tsx
 M src/app/plan/page.tsx
 M src/app/play/[moduleId]/[lessonId]/page.tsx
 M src/app/practice/chat/page.tsx
 M src/app/practice/conversation/page.tsx
 M src/app/practice/intro/page.tsx
 M src/app/practice/page.tsx
 M src/app/practice/pronunciation/page.tsx
 M src/app/practice/review/page.tsx
 M src/app/practice/shadowing/page.tsx
 M src/app/practice/speak/page.tsx
 M src/app/practice/write/page.tsx
 M src/app/pricing/page.tsx
 M src/app/privacy/page.tsx
 M src/app/profile/page.tsx
 M src/app/scripts/[moduleId]/page.tsx
 M src/app/scripts/page.tsx
 M src/app/template.tsx
 M src/app/tests/[testId]/page.tsx
 M src/app/tests/page.tsx
 M src/app/vocabulary/page.tsx
 M src/components/ServiceWorkerRegister.tsx
 M src/components/character/Appu.tsx
 M src/components/character/Kuttan.tsx
 M src/components/exercise-games/WordNinja.tsx
 M src/components/exercise-games/index.ts
 M src/components/game-engine/GameRenderer.tsx
 M src/components/game-engine/VocabDiscoveryGame.tsx
 M src/components/game/GameStoryWrapper.tsx
 M src/components/layout/Navigation.tsx
 M src/components/ui/Card.tsx
 M src/components/ui/GlobalSearch.tsx
 M src/lib/app-config.ts
 M src/lib/content/dialogue.ts
 M src/lib/content/modules/module-01.ts
 M src/lib/content/modules/module-02.ts
 M src/lib/content/modules/module-03.ts
 M src/lib/content/modules/module-04.ts
 M src/lib/content/modules/module-05.ts
 M src/lib/content/modules/module-06.ts
 M src/lib/content/modules/module-07.ts
 M src/lib/content/modules/module-08.ts
 M src/lib/content/modules/module-09.ts
 M src/lib/content/modules/module-10.ts
 M src/lib/content/modules/module-11.ts
 M src/lib/content/modules/module-12.ts
 M src/lib/content/modules/module-13.ts
 M src/lib/content/modules/module-14.ts
 M src/lib/content/modules/module-15.ts
 M src/lib/content/modules/module-16.ts
 M src/lib/content/modules/module-17.ts
 M src/lib/content/modules/module-18.ts
 M src/lib/content/narrative-arcs.ts
 M src/lib/content/video-scripts.ts
 M src/lib/study-plan.ts
 M supabase/schema.sql
?? .vercelignore
?? Agents
?? Architecture
?? Frontier.
?? GermanCourse_QC/
?? Inference
?? LLM
?? Modalities
?? concrete
?? docs/A1_STORY_BIBLE.md
?? docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
?? docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
?? docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
?? docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
?? docs/COURSE_OPERATING_BRIEF_2026-05-19.md
?? docs/GAME_AUDIT.md
?? docs/LAUNCH_CHECKLIST.md
?? docs/M1_AUDIT_REPORT.md
?? docs/M2_M3_SETTING_AUDIT.md
?? docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
?? docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
?? docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
?? docs/README.md
?? docs/REMOTION_PIPELINE.md
?? docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
?? docs/archive/AI_CINEMATIC_SCRIPTS_V3.md
?? docs/archive/CINEMATIC_VIDEO_SERIES.md
?? general
?? pilot/intros/
?? pilot/video-0/
?? pilot/video-100/
?? pilot/video-101/
?? pilot/video-2/
?? pilot/video-200/
?? pilot/video-201/
?? pilot/video-202/
?? pilot/video-3/
?? pilot/video-300/
?? pilot/video-301/
?? pilot/video-302/
?? pilot/video-303/
?? pilot/video-304/
?? pilot/video-305/
?? pilot/video-306/
?? pilot/video-307/
?? pilot/video-308/
?? pilot/video-309/
?? pilot/video-310/
?? pilot/video-311/
?? pilot/video-4/
?? pilot/video-5/
?? pilot/video-6/
?? public/audio/hoeren/module-01/
?? public/audio/hoeren/module-03/
?? public/audio/hoeren/module-16/
?? public/audio/hoeren/module-17/
?? public/audio/hoeren/module-18/
?? public/audio/missions/
?? public/audio/pimsleur/
?? public/audio/tts/
?? public/preview/
?? public/videos/
?? remotion.config.ts
?? scripts/__pycache__/
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs
?? scripts/audit-app-readiness.ts
?? scripts/audit-games.mjs
?? scripts/audit-m1-lessons.mjs
?? scripts/audit-nav.mjs
?? scripts/batch_render.sh
?? scripts/build_preview_index.sh
?? scripts/cinematic-arc-v1-backup.json
?? scripts/fix-production-floor.py
?? scripts/gen-m1-videos.ts
?? scripts/gen-pimsleur.ts
?? scripts/gen-tts.ts
?? scripts/get-gcp-token.py
?? scripts/lib/
?? scripts/m1-video-defs.json
?? scripts/m2-video-defs.json
?? scripts/output/.checkpoint.audit-pass1.json
?? scripts/output/.checkpoint.json
?? scripts/output/.pass1-snapshot/
?? scripts/output/.pass2-snapshot/
?? scripts/output/.pre-pass4-snapshot/
?? scripts/output/.pre-repair/
?? scripts/output/all-lesson-audit/
?? scripts/output/audit-log.md
?? scripts/output/game-audit/
?? scripts/output/m1-lesson-audit/
?? scripts/output/module-01.script.md
?? scripts/output/module-02.script.md
?? scripts/output/module-03.script.md
?? scripts/output/module-04.script.md
?? scripts/output/module-05.script.md
?? scripts/output/module-06.script.md
?? scripts/output/module-07.script.md
?? scripts/output/module-08.script.md
?? scripts/output/module-09.script.md
?? scripts/output/module-10.script.md
?? scripts/output/module-11.script.md
?? scripts/output/module-12.script.md
?? scripts/output/module-13.script.md
?? scripts/output/module-14.script.md
?? scripts/output/module-15.script.md
?? scripts/output/module-16.script.md
?? scripts/output/module-17.script.md
?? scripts/output/module-18.script.md
?? scripts/output/nav-audit/
?? scripts/output/playthrough/
?? scripts/output/tts-test/
?? scripts/parse_script.py
?? scripts/playthrough-ext.mjs
?? scripts/playthrough.mjs
?? scripts/props/
?? scripts/qa_completed_ability_landings.mjs
?? scripts/qa_direct_final_sequence_status.mjs
?? scripts/qa_gold_slice_first_journey.mjs
?? scripts/qa_intro_start_path.mjs
?? scripts/qa_module2_production_mobile.mjs
?? scripts/render-video.ts
?? scripts/render_guide.sh
?? scripts/repair_holdouts.py
?? scripts/review-template.html
?? scripts/script_audit_loop.py
?? src/app/api/live/
?? src/app/api/webhooks/
?? src/app/games/hor-und-los/
?? src/app/games/sag-es/
?? src/app/games/tipp-es/
?? src/app/games/was-steht-da/
?? src/app/learn/roleplay/
?? src/app/missions/module-1/
?? src/app/on-the-go/
?? src/components/course/
?? src/components/exercise-games/FreeTextInput.tsx
?? src/components/voice/
?? src/lib/answer-match.ts
?? src/lib/content/roleplay-scenarios.ts
?? src/lib/geo.ts
?? src/lib/missions/
?? src/lib/plan.ts
?? src/lib/pricing.ts
?? src/remotion/

session_id: 20260531_191337_787753
Final plan:
`/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1912.md`

Top 5 plan bullets:
1. Adipoli = Kerala-rooted Goethe A1 mission coach, not dashboard/script pile.
2. Core loop = scene → real German audio → learner output → repair → ability win → next pull.
3. Preserve M1/M2 mission direction; stop polishing containers.
4. Fix stale QA before any more product claims.
5. Scale next to Module 2 gold path, then Modules 3/14/17/18 and course-wide production/audio floors.

First 48h build lane:
- Freeze git/QA baseline.
- Patch stale QA to current `/` → `/intro` → first M1 mission contract.
- Browser-prove first path with audio playback/state evidence.
- Verify Module 1 sequence and Module 2 gold path.
- Run production/audio/canon inventories.
- End with PASS/WEAK/FAIL report, not vibes.

Evidence read/checked:
- Checkpoint: `adipoli-4h-vision-plan-checkpoint.md`
- Latest continuous logs through iteration 35
- Final plan file above
- Git: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries
- Plan evidence: `tsc` pass, M1/M2 route 200s, M1/M2 mobile mission QA pass, `qa_mission_pilot.py` still stale-fails on old intro/start-path snippets

Boss decisions needed:
1. Beta scope: M1/M2 first, or wait for all 18 modules?
2. Public name: keep Kuttan, or use Arun/Kiran publicly?
3. Audio bar: generated audio OK for beta, or human/native review first?

Next step: Fix stale QA harness, 2h.

## Boss addendum — 2026-06-01T01:54:41+0200

Boss approved the generated Kerala-rooted visual direction as relatable, but flagged the risk that it could damage the existing course UI if treated as a redesign.

Plan update made in `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1912.md`:
- Add visuals as **supporting scene assets**, not UI architecture.
- Replace generic/random abstract “ball people” only where they weaken relatability.
- First validation is one route-scoped first-mission illustration experiment with before/after screenshots.
- No global reskin, no added text clutter, no mascot energy, no generic AI-poster rollout.
