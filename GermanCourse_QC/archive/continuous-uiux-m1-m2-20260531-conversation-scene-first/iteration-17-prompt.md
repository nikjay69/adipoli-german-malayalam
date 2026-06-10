# Adipoli German — 6h autonomous UI/UX + M1/M2 build loop

You are running one iteration inside a true continuous 6-hour autonomous loop for Boss.

Workdir: `/shared/german-course`.

## Boss request

Improve Adipoli German from the first page onward. Current critique:
- UI/UX still has too much text.
- Use pictures/GPT-generated images neatly if they genuinely help; pictures should clarify, not clutter.
- Fix animations/stuff wherever needed.
- Improve overall product feel.
- Read course soul first.
- Work autonomously and improve the course, with special focus on finishing/improving Module 1 and Module 2.
- Current videos are tool-generated and later Boss may record himself using these as basis.
- Think critically about whether “Kuttan” is too childish and propose better adult-safe names. Do not mass-rename the whole product without Boss approval.
- New Boss critique: current builder/production screens are still too click-heavy and boring. Do not center the experience on sentence builders, chip counters, undo/clear controls, mandatory long typing, or “Said it / Continue” chore loops. The product must feel more immersive: hear a scene, answer aloud, get light repair, and move forward.
- Newer voice feedback: UI looks good, but UX/product idea is still confusing, too text-heavy, too many pages, and not pedagogically intentional. Desired feel: two people standing in a scene; one says `Guten Morgen`; the other replies; learner joins the exchange. Less reading, fewer screens, more intentional conversational learning.

## Non-negotiable course soul

Read these before making changes:
1. `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
2. `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
3. `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
4. `docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`
5. `docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md` if present
6. Existing QC reports relevant to M1/M2 in `GermanCourse_QC/`

Preserve: Kerala-rooted adult Malayali beginner, Manglish bridge, Goethe A1 seriousness, production-first learning, warm but not childish. A1 happens physically in Kerala; Germany can appear as dream/future/video-call/exam rehearsal.

## What to improve

Work from the learner’s first path:
`/` or `/intro` → `/learn` → Module 1 → Module 2 → mission routes.

Prioritize fixes in this order:
1. **Text reduction:** first screens should be aggressively short. One headline, one short context sentence, 2–3 micro-promises max, one obvious CTA, tiny phrase preview. Remove duplicated cards/rails/paragraphs. Prefer visual hierarchy over explanation.
2. **M1/M2 completion:** M1 and M2 should feel like actual guided missions, not lesson lists and not builder games. The learner should hear a real scene, answer aloud, do one light recognition/repair action, write only a tiny useful piece when it earns its place, and end with a visible ability win.
3. **First-page path:** CTA must be visible, clickable, not intercepted by fixed nav/search, and must lead toward the guided mission lane.
4. **Images:** only add imagery if it clarifies the scene or reduces text. Prefer small, calm, culturally correct visual cards/icons/illustrations. If using generated images, at most 1–2 assets this run; verify they have no wrong text, no weird hands/faces, no cultural nonsense. If unsure, use clean CSS/SVG/illustration instead. Never let images create clutter.
5. **Videos:** inspect existing Remotion/video tooling. Improve M1/M2 video basis scripts/templates if safe. Generate local Remotion assets only if feasible. Do not use HeyGen or paid avatar APIs without Boss approval.
6. **Animations:** fix janky/broken/distracting animations. Use subtle purposeful motion only: CTA feedback, step transition, progress/celebration. No speed/frantic beginner games on first path.
7. **Naming:** evaluate Kuttan adult-safety. Produce a concise recommendation in the checkpoint/report. Do not global rename without approval; a safe compromise can be “Arun/Kiran + Kuttan as home nickname” if recommended.

## New run plan — conversation-scene-first reset

1. Stop treating the first path as a sequence of pages/cards. Rebuild the first M1/M2 beat as an in-place two-person conversation scene.
2. Use visual scene + speech bubbles/subtitles + audio turns: Frau Weber speaks → learner replies → instant feedback/repair.
3. Cut explanatory paragraphs, promise chips, counters, builder controls, and page hops unless they serve the current conversational beat.
4. Keep pedagogy explicit internally: every interaction must map to input, response, noticing, repair, or Goethe A1 proof. If not, remove it.
5. Browser-QA on mobile viewport and Tailscale/local routes before claiming improvement: verify fewer visible words, fewer taps, fewer route/page transitions, working audio, and obvious next action.

## Guardrails

Allowed:
- Read source/docs/QC.
- Patch scoped source files and scripts.
- Add/modify small reusable components.
- Add local SVG/CSS assets or verified generated image assets.
- Add QA guards/scripts.
- Run local dev server, curl, npm scripts, Python/tsx QA, browser/puppeteer checks.
- Write timestamped QC/checkpoint reports.

Not allowed without Boss approval:
- Deployment/push/merge.
- Pricing/payment/auth changes.
- Deleting/mass-archiving docs or features.
- Paid HeyGen/API/video generation at scale.
- Mass-renaming Kuttan across the whole course.
- Broad destructive rewrites.

## Evidence-based QA before claiming quality

Run as much as practical each iteration:
- `npm run lint` or targeted lint/check if app-wide lint is inherited-noisy.
- `python3 scripts/qa_mission_pilot.py` if applicable; extend it if scope expands.
- Start/verify dev server on `0.0.0.0:3000`.
- Curl `http://127.0.0.1:3000/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, relevant mission routes.
- Use browser or Puppeteer with `/usr/bin/google-chrome` to actually click the primary CTA and confirm `location.pathname` changes.
- Check console/errors/hydration overlay.
- Verify audio assets over HTTP when audio is part of the reviewed path.
- If app-wide checks fail due inherited issues, separate inherited blockers from your changes.

## Reporting/checkpoint

After each iteration, append a short checkpoint to:
`GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md`

Use this shape:
- Time/iteration.
- Source/docs inspected.
- Files changed.
- UX/text reductions made.
- M1/M2 learner path status.
- Images/video/animation work done or intentionally skipped.
- QA run + PASS/WEAK/FAIL.
- Kuttan/name recommendation note if updated.
- Next best lane.

Do not stop at a plan. Make one safe, high-leverage product improvement, verify it, then report. If you discover a P0 blocker, fix it or report it plainly and move to the next safe lane.

## Resume iteration context
Iteration: 17
Time: 2026-05-31T04:18:25+02:00
Original hard stop: 2026-05-31T06:42:14+02:00

Recent checkpoint tail:
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


Previous iteration tail:
         <p className="sr-only">Listen to the speaker, answer aloud, then fix one tiny trap. No builder, no typing.</p>
         <div className="mt-5 overflow-hidden rounded-[1.55rem] border border-white/12 bg-black/18 p-3 sm:p-4">
-          <div className="relative min-h-[15rem] rounded-[1.25rem] bg-gradient-to-br from-[#f7e5bd] via-[#f1d5a0] to-[#c9964d] p-4 text-[#132414] shadow-inner shadow-black/12">
+          <div className="relative min-h-[17rem] rounded-[1.25rem] bg-gradient-to-br from-[#f7e5bd] via-[#f1d5a0] to-[#c9964d] p-4 text-[#132414] shadow-inner shadow-black/12">
             <div className="absolute inset-x-4 top-4 flex justify-center">
               <div className="rounded-xl bg-[#132414]/90 px-4 py-2 text-sm font-black text-[#f1d27a] shadow-lg">
                 Goethe Kochi
  ┊ review diff
a//shared/german-course/src/app/missions/module-2/_components/MissionUI.tsx → b//shared/german-course/src/app/missions/module-2/_components/MissionUI.tsx
@@ -839,7 +839,7 @@
             <div
               className={clsx(
                 'absolute bottom-24 right-4 max-w-[72%] rounded-2xl rounded-br-md bg-[#132414] px-4 py-3 text-lg font-black leading-tight text-white shadow-lg transition',
-                finished ? 'opacity-100' : 'opacity-40'
+                finished ? 'opacity-100' : 'pointer-events-none opacity-0'
               )}
             >
               {finished ? learnerLine : '…'}
@@ -941,7 +941,7 @@
             <div
               className={clsx(
                 'absolute bottom-24 right-4 max-w-[72%] rounded-2xl rounded-br-md bg-[#132414] px-4 py-3 text-lg font-black leading-tight text-white shadow-lg transition',
-                modelAudioFinished ? 'opacity-100' : 'opacity-40'
+                modelAudioFinished ? 'opacity-100' : 'pointer-events-none opacity-0'
               )}
               data-testid="immersive-model-line"
               data-model-line-hidden={modelAudioFinished ? 'false' : 'true'}
  ┊ review diff
a//shared/german-course/src/app/missions/module-2/_components/MissionUI.tsx → b//shared/german-course/src/app/missions/module-2/_components/MissionUI.tsx
@@ -103,7 +103,7 @@
   const progress = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
   const progressLabel = duration > 0
     ? `${formatAudioTime(currentTime)} / ${formatAudioTime(duration)}`
-    : 'Loading…';
+    : '0:00';
 
   const syncAudioProgress = () => {
     const audio = audioRef.current;
  ⟳ compacting context…
  ┊ review diff
a//tmp/adipoli_iteration16_checkpoint.md → b//tmp/adipoli_iteration16_checkpoint.md
@@ -0,0 +1,41 @@
+
+## Iteration 16 — 2026-05-31T04:17:29+02:00
+
+- Source/docs inspected:
+  - `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
+  - `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
+  - `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
+  - `docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`
+  - `docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`
+  - Existing M1/M2 checkpoint history and active mission route sources.
+- Files changed:
+  - `src/app/missions/module-1/polite-exit/page.tsx`
+  - `src/lib/missions/module1.ts`
+  - `src/app/missions/module-2/_components/MissionUI.tsx`
+  - `scripts/qa_mission_pilot.py`
+  - `scripts/qa_direct_final_sequence_status.mjs`
+  - `GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md`
+- UX/text reductions made:
+  - Converted M1 `Polite classroom exit` into a one-screen conversation repair: Frau Weber says goodbye, learner answers aloud, then fixes the formal exit phrase.
+  - Removed the older start/intro/win page progression from this mission path and aligned its metadata to `Scene + repair` only.
+  - Reduced shared scene clutter: more vertical room, hidden locked learner bubble until the audio turn finishes, and audio progress fallback changed from `Loading…` to `0:00`.
+- M1/M2 learner path status:
+  - M1 now has all three reviewed missions in voice-first scene form: greeting, please-thanks, and polite-exit.
+  - M2 remains guarded as a five-mission voice-first path with direct final-route completion checks.
+  - Directly completing final missions no longer falsely marks full module completion; storage stays route-specific.
+- Images/video/animation work done or intentionally skipped:
+  - Images intentionally skipped; the high-leverage fix was interaction reduction and scene clarity, not adding more visual material.
+  - Video tooling not changed this run.
+  - Animation kept restrained; no new motion added beyond existing focused mission transitions.
+- QA run + PASS/WEAK/FAIL:
+  - PASS: `npx eslint src/app/missions/module-1/polite-exit/page.tsx src/lib/missions/module1.ts src/app/missions/module-2/_components/MissionUI.tsx scripts/qa_direct_final_sequence_status.mjs`
+  - PASS: `python3 -m py_compile scripts/qa_mission_pilot.py`
+  - PASS: `node scripts/qa_direct_final_sequence_status.mjs`
+  - PASS: `python3 scripts/qa_mission_pilot.py` including M1/M2 immersive mobile QA, direct final sequence status, local + Tailscale gold-slice checks, 8 voice-first missions, 0 legacy builders on reviewed path.
+  - PASS: browser mobile check on `/missions/module-1/polite-exit`: no nav/search, audio ends before learner cue, correct repair writes `adipoli:module1:completedMissions=["politeExit"]`, inline ability win appears, no console errors.
+  - PASS: visual check after shared scene adjustment: less bubble crowding, focused one-screen conversation scene remains readable.
+  - WEAK/inherited: full `npm run lint` still fails repo-wide from unrelated older auth/game/Remotion lint debt; touched-file ESLint passes.
+- Kuttan/name recommendation note:
+  - Unchanged: recommend an adult-safe public name like `Arun` or `Kiran`, keeping `Kuttan` as a home/family nickname only if Boss approves. No mass rename done.
+- Next best lane:
+  - Verify `/learn/1` landing copy and CTA against the now-finished three-mission M1 path, then reduce any remaining dashboard/list clutter. 45m.

session_id: 20260531_041719_82e92a
Iteration 16 complete and checkpointed.

Changed:
- /shared/german-course/src/app/missions/module-1/polite-exit/page.tsx
- /shared/german-course/src/lib/missions/module1.ts
- /shared/german-course/src/app/missions/module-2/_components/MissionUI.tsx
- /shared/german-course/scripts/qa_mission_pilot.py
- /shared/german-course/scripts/qa_direct_final_sequence_status.mjs
- /shared/german-course/GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md

Product improvement:
- M1 “Polite classroom exit” is now a one-screen conversation repair:
  - Frau Weber says: “Auf Wiedersehen.”
  - Learner hears the audio.
  - Learner answers aloud: “Vielen Dank. Auf Wiedersehen.”
  - One small repair choice confirms the formal exit phrase.
  - Inline ability win appears.
- Removed the old start/intro/win page flow from this mission.
- Shared mission scene got cleaner:
  - more vertical room
  - hidden learner bubble until audio finishes
  - audio progress fallback now shows “0:00” instead of “Loading…”

Verified:
- PASS targeted ESLint on touched files.
- PASS Python QA compile.
- PASS direct-final sequence status browser script.
- PASS full `python3 scripts/qa_mission_pilot.py`.
- PASS mobile browser check on `/missions/module-1/polite-exit`: no nav/search, audio gating works, repair writes `["politeExit"]`, no console errors.
- WEAK inherited: full `npm run lint` still fails repo-wide from unrelated old auth/game/Remotion lint debt.

Checkpoint appended:
- /shared/german-course/GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md

Next: `/learn/1` landing cleanup, 45m.

Current git status snapshot:
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
?? scripts/adipoli_continuous_6h_uiux_m1_m2_loop.sh
?? scripts/adipoli_continuous_7h_loop.sh
?? scripts/audit-all-lessons.mjs

Important: Continue from the current repo state. The previous supervisor died after iteration 5. Do not overwrite unrelated changes. Prefer scoped safe patches and verification. Next suggested lane: reduce please-thanks screen count, then browser/QA verify.
