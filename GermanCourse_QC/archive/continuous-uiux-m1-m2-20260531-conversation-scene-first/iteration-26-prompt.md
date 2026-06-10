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
Iteration: 26
Time: 2026-05-31T05:51:11+02:00
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
+        "useSearchParams",
+        "ChevronLeft",
         "What does she want?",
         "Catch instruction",
         "const [meaning",
         "case 4:\n        return repairCorrect;",
+        "{step === 1 && (",
+        "{step === 2 && (",
         "{step === 5 && (",
+        "English letter names.",
+        "German letter names.",
+        "Correct. Slow German letters win.",
+        "That is the common mistake.",
+        "Fix letter names",
     ]
     hits = [snippet for snippet in retired_spell_snippets if snippet in spell_name]
     if hits:
-        fail(f"spell-name reintroduced separate typing/repair chore path: {hits}")
-    print("spell_name_voice_first=merged_repair")
+        fail(f"spell-name reintroduced separate intro/win/typing chore path: {hits}")
+    print("spell_name_voice_first=one_screen_inline_win")
 
 
 def assert_from_kerala_is_voice_first_merged_repair() -> None:
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -1035,7 +1035,7 @@
         "Fix Danke/Bitte",
         "Fix goodbye",
         "Fix ich komme",
-        "Fix letter names",
+        "Fix letters",
         "Fix aus/in",
         "Fix job article",
         "Fix final mistake",
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -219,7 +219,7 @@
         fail(f"shared compact MissionIntro missing snippets: {missing_intro_ui}")
     for page in MISSION_PAGES + MODULE1_MISSION_PAGES:
         src = page.read_text(encoding="utf-8")
-        direct_scene_allowed = "module-1/greet-frau-weber" in page.as_posix() or "module-1/please-thanks" in page.as_posix() or "module-1/polite-exit" in page.as_posix() or "module-2/job-languages" in page.as_posix()
+        direct_scene_allowed = "module-1/greet-frau-weber" in page.as_posix() or "module-1/please-thanks" in page.as_posix() or "module-1/polite-exit" in page.as_posix() or "module-2/spell-name" in page.as_posix() or "module-2/job-languages" in page.as_posix()
         if "<MissionIntro" not in src and not direct_scene_allowed:
             fail(f"mission page should use compact shared MissionIntro or approved direct-scene start: {page}")
         # Extract the step===0 JSX block roughly. This is deliberately simple and conservative.
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -890,7 +890,7 @@
         fail(f"Module 1 win/ribbon reintroduced duplicate next CTA clutter: {module1_crowding_hits}")
     for page, src in mission_pages:
         page_path = page.as_posix()
-        direct_scene_allowed = "module-1/greet-frau-weber" in page_path or "module-1/please-thanks" in page_path or "module-1/polite-exit" in page_path or "module-2/job-languages" in page_path
+        direct_scene_allowed = "module-1/greet-frau-weber" in page_path or "module-1/please-thanks" in page_path or "module-1/polite-exit" in page_path or "module-2/spell-name" in page_path or "module-2/job-languages" in page_path
         module1_one_screen = "module-1/greet-frau-weber" in page_path or "module-1/please-thanks" in page_path or "module-1/polite-exit" in page_path
         required_page = [
             "Module1NextMissionCard",
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -729,8 +729,12 @@
             fail(f"mission page reintroduced local steps/audio data: {page}")
         if "currentMissionId={mission.id}" not in src:
             fail(f"mission shell missing cross-mission sequence ribbon wiring: {page}")
-        if "<MissionWinStep" not in src:
-            fail(f"mission win screen missing shared MissionWinStep: {page}")
+        if page == SPELL_NAME_PAGE:
+            if "data-testid=\"spell-name-inline-win\"" not in src or "writeCompletedModule2Mission" not in src:
+                fail(f"spell-name should keep one-screen inline win/completion wiring: {page}")
+        else:
+            if "<MissionWinStep" not in src:
+                fail(f"mission win screen missing shared MissionWinStep: {page}")
         if "<NextMissionCard currentMissionId={mission.id}" not in src:
             fail(f"mission win side card should use shared NextMissionCard: {page}")
         if "<Sparkles" in src or "Next pull" in src or "Next mission" in src:
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -1212,7 +1212,10 @@
     pages_with_old_inline = []
     for page in MISSION_PAGES:
         src = page.read_text(encoding="utf-8")
-        if "<MissionWinStep" not in src and "<Module1MissionWinStep" not in src:
+        if page == SPELL_NAME_PAGE:
+            if "data-testid=\"spell-name-inline-win\"" not in src or "writeCompletedModule2Mission" not in src:
+                pages_missing_shared.append(f"{page.name}:inline win/completion")
+        elif "<MissionWinStep" not in src and "<Module1MissionWinStep" not in src:
             pages_missing_shared.append(f"{page.name}:mission win step")
         has_conversation_repair = "<ConversationRepairStep" in src
         if "<HearStep" not in src and "<ConversationSceneStep" not in src and not has_conversation_repair:
  ┊ review diff
a//shared/german-course/scripts/qa_intro_start_path.mjs → b//shared/german-course/scripts/qa_intro_start_path.mjs
@@ -190,8 +190,9 @@
   await page.waitForFunction(() => window.location.pathname === '/missions/module-2/spell-name', { timeout: 10000 });
   await delay(700);
   state = await pageState(page);
-  assert(state.text.includes('Spell your name.'), 'Module 2 next-mission CTA should bypass spelling preamble and start in the conversation scene', { text: state.text.slice(0, 900) });
+  assert(state.text.includes('K-U-T-T-A-N.'), 'Module 2 next-mission CTA should bypass spelling preamble and start in the conversation scene', { text: state.text.slice(0, 900) });
   assert(!state.text.includes('Spell your Kerala name.'), 'Module 2 next-mission CTA should not land on the intro card first', { text: state.text.slice(0, 900) });
+  assert(!state.text.includes('Spell your name.'), 'Module 2 next-mission scene should not use an extra explanatory title', { text: state.text.slice(0, 900) });
   assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 2 next-mission listening path should not show a competing Back button', state);
 
   const relevantErrors = consoleErrors.filter((line) => !line.includes('favicon') && !line.includes('404'));
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -1652,8 +1652,8 @@
         "{step === 1 && (",
         "{step === 2 && (",
         "{step === 5 && (",
-        "English letter names.",
-        "German letter names.",
+        "subtitle: 'English letter names.'",
+        "subtitle: 'German letter names.'",
         "Correct. Slow German letters win.",
         "That is the common mistake.",
         "Fix letter names",

I stopped retrying terminal because it hit the tool-call guardrail (repeated_exact_failure_block) after 5 repeated non-progressing attempts. The last tool result explains the blocker; the next step is to change strategy instead of repeating the same call.


session_id: 20260531_054339_386e01
I stopped retrying terminal because it hit the tool-call guardrail (repeated_exact_failure_block) after 5 repeated non-progressing attempts. The last tool result explains the blocker; the next step is to change strategy instead of repeating the same call.

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
