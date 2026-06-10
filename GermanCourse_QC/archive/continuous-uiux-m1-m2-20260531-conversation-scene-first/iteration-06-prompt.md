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
Iteration: 6
Time: 2026-05-31T02:00:49+02:00
Original hard stop: 2026-05-31T06:42:14+02:00

Recent checkpoint tail:
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


## Iteration 5 — 2026-05-31T01:46:22+02:00

- Source/docs inspected:
  - `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
  - `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
  - `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
  - `docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`
  - `docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`
  - Active M1/M2 mission pages, shared `MissionUI`, and browser QA guards.
- Files changed:
  - `src/lib/missions/module1.ts`
  - `src/app/missions/module-1/greet-frau-weber/page.tsx`
  - `scripts/qa_mission_pilot.py`
  - `scripts/qa_module2_production_mobile.mjs`
  - `scripts/qa_gold_slice_first_journey.mjs`
  - `GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md`
- UX/text reductions made:
  - Cut M1 mission 1 from six learner screens to four: intro → two-person scene → answer+repair → win.
  - Removed the separate `Pick the morning opener` recognition page and separate repair page from the first mission.
  - Merged speaking and repair into one voice-first `SpeakRepairStep`: play the German reply, answer aloud, then pick the correct greeting. No typing gate.
- M1/M2 learner path status:
  - First M1 beat now matches the requested conversation-scene rhythm more closely: Frau Weber speaks, learner replies, immediate light repair, ability win.
  - M2 remains on the already-verified voice-first mission path; no broad churn this iteration.
- Images/video/animation work done or intentionally skipped:
  - Images skipped. The gain this iteration came from fewer screens/taps, not extra visual assets.
  - Video assets skipped. Existing M1/M2 video-basis guard still passes adult-safe checks.
  - Motion guard preserved via mission QA.
- QA run + PASS/WEAK/FAIL:
  - PASS: `npx eslint src/app/missions/module-1/greet-frau-weber/page.tsx src/lib/missions/module1.ts scripts/qa_module2_production_mobile.mjs scripts/qa_gold_slice_first_journey.mjs`
  - PASS: `python3 scripts/qa_mission_pilot.py`
  - PASS: route HTTP checks for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro` after restarting a stuck Next dev process.
  - PASS: browser visual/manual QA on M1 greeting production step: repair choices hidden before audio, play/progress visible, correct choice reaches `First class win`, console clean.
  - WEAK/inherited: full `npm run lint` still fails on pre-existing app-wide issues outside this lane; targeted lint for changed files passes.
- Kuttan/name recommendation note:
  - Unchanged: public-facing adult-safe name should likely be `Arun` or `Kiran`, keeping `Kuttan` as a home nickname if Boss approves. No mass rename performed.
- Next best lane:
  - Apply the same screen-count reduction to the remaining M1/M2 missions that still have separate recognition pages: fold the light recognition/repair into the spoken reply step where it preserves pedagogy.
===== RESUME SUPERVISOR 2026-05-31T02:00:49+02:00 hard-stop 2026-05-31T06:42:14+02:00 =====

Previous iteration tail:
+  const immersiveStep = name === 'm1-greet' ? 2 : 3;
+  await page.goto(`${BASE_URL}${route}?adipoliQa=1&adipoliQaStep=${immersiveStep}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
   await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 15000 });
   await new Promise((resolve) => setTimeout(resolve, 300));
 
  ┊ review diff
a//shared/german-course/scripts/qa_gold_slice_first_journey.mjs → b//shared/german-course/scripts/qa_gold_slice_first_journey.mjs
@@ -146,47 +146,29 @@
   current = await state(page);
   assert(!current.buttons.some((button) => button.text.includes('Choose the greeting')), 'hearing CTA should stay hidden until scene audio finishes', current.buttons);
   const hearAudio = await playAllVisibleAudio(page, 1);
-  await page.waitForFunction(() => document.body.innerText.includes('Pick the morning opener.'), { timeout: 10000 });
+  await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 10000 });
   current = await state(page);
-  assert(!current.buttons.some((button) => button.text.includes('Choose the greeting')), 'auto-advance should remove the extra hearing continue tap', current.buttons);
-  await chooseOption(page, 'Guten Morgen');
-  await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 10000 });
+  assert(!current.text.includes('Pick the morning opener.'), 'first mission should not insert a separate recognition page before speaking', { text: current.text.slice(0, 1100) });
   let immersive = await page.evaluate(() => ({
-    merged: Boolean(document.querySelector('[data-testid="speak-write-step"]')),
+    repairOnly: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-step-kind') === 'speak-repair',
     finished: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-model-audio-finished'),
     modelLineHidden: document.querySelector('[data-testid="immersive-model-line"]')?.getAttribute('data-model-line-hidden'),
-    actionDisabled: Array.from(document.querySelectorAll('button')).find((button) => /write|repair|trap|fix/i.test(button.innerText))?.disabled,
-    inputDisabled: document.querySelector('[data-testid="tiny-write-input"]')?.disabled ?? null,
+    hasTinyInput: Boolean(document.querySelector('[data-testid="tiny-write-input"]')),
+    repairHidden: document.querySelector('[data-testid="inline-repair-choice"]')?.classList.contains('sr-only') ?? null,
   }));
-  assert(immersive.finished === 'false' && immersive.modelLineHidden === 'true' && immersive.actionDisabled === true, 'immersive reply should hide text and gate action before model audio finishes', immersive);
+  assert(immersive.repairOnly && immersive.finished === 'false' && immersive.modelLineHidden === 'true' && immersive.hasTinyInput === false && immersive.repairHidden === true, 'first mission should be voice-first and hide repair choices until model audio finishes', immersive);
   const replyAudio = await playAllVisibleAudio(page, 1);
   await page.waitForFunction(() => {
     const step = document.querySelector('[data-testid="immersive-reply-step"]');
-    const merged = Boolean(document.querySelector('[data-testid="speak-write-step"]'));
-    const button = Array.from(document.querySelectorAll('button')).find((candidate) => /write|repair|trap|fix/i.test(candidate.innerText));
-    const input = document.querySelector('[data-testid="tiny-write-input"]');
-    return step?.getAttribute('data-model-audio-finished') === 'true' && button && (merged ? input && !input.disabled : !button.disabled);
+    const inlineRepair = document.querySelector('[data-testid="inline-repair-choice"]');
+    return step?.getAttribute('data-model-audio-finished') === 'true' && inlineRepair && !inlineRepair.classList.contains('sr-only');
   }, { timeout: 10000 });
 
   immersive = await page.evaluate(() => ({
-    merged: Boolean(document.querySelector('[data-testid="speak-write-step"]')),
-    replyOnly: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-step-kind') === 'reply-aloud',
+    repairOnly: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-step-kind') === 'speak-repair',
+    hasTinyInput: Boolean(document.querySelector('[data-testid="tiny-write-input"]')),
   }));
-  if (immersive.merged) {
-    await page.type('[data-testid="tiny-write-input"]', 'Guten Morgen');
-    await page.waitForFunction(() => Array.from(document.querySelectorAll('button')).some((button) => button.innerText.includes('Fix greeting mistake') && !button.disabled), { timeout: 10000 });
-  } else if (immersive.replyOnly) {
-    assert(!await page.$('[data-testid="tiny-write-input"]'), 'voice-only first mission should not expose tiny typing input', await state(page));
-  } else {
-    await clickButtonContaining(page, 'Write the anchor line');
-
-    await page.waitForSelector('[data-testid="tiny-write-step"]', { timeout: 10000 });
-    await page.type('[data-testid="tiny-write-input"]', 'Guten Morgen');
-    await page.waitForFunction(() => Array.from(document.querySelectorAll('button')).some((button) => button.innerText.includes('Fix greeting mistake') && !button.disabled), { timeout: 10000 });
-  }
-  await clickButtonContaining(page, 'Fix greeting mistake');
-
-  await page.waitForFunction(() => document.body.innerText.includes('Fix the time trap.'), { timeout: 10000 });
+  assert(immersive.repairOnly && !immersive.hasTinyInput, 'first mission repair must stay no-typing after audio', immersive);
   await chooseOption(page, 'Guten Morgen, Frau Weber.');
 
   await page.waitForFunction(() => document.body.innerText.includes('First class win.') && document.body.innerText.includes('Handle thank-you politely.'), { timeout: 10000 });
  ┊ review diff
a//shared/german-course/scripts/qa_mission_pilot.py → b//shared/german-course/scripts/qa_mission_pilot.py
@@ -1442,9 +1442,9 @@
         "Morning class.",
         "playAllVisibleAudio",
         "modelLineHidden",
-        "immersive reply should hide text and gate action before model audio finishes",
+        "first mission should be voice-first and hide repair choices until model audio finishes",
         "Guten Morgen, Frau Weber. Ich lerne Deutsch.",
-        "Fix the time trap.",
+        "first mission repair must stay no-typing after audio",
         "First class win.",
         "Handle thank-you politely",
         "adipoli:module1:completedMissions",

session_id: 20260531_013520_23cf80
Iteration 5 done.

Changed:
- `/shared/german-course/src/lib/missions/module1.ts`
- `/shared/german-course/src/app/missions/module-1/greet-frau-weber/page.tsx`
- `/shared/german-course/scripts/qa_mission_pilot.py`
- `/shared/german-course/scripts/qa_module2_production_mobile.mjs`
- `/shared/german-course/scripts/qa_gold_slice_first_journey.mjs`
- `/shared/german-course/GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md`

Product improvement:
- Cut M1 first mission from 6 screens to 4:
  intro → two-person scene → answer+repair → win.
- Removed the separate “Pick the morning opener” recognition page.
- Removed the separate repair page.
- Merged production into one voice-first step:
  play German reply → answer aloud → pick correct greeting.
- No typing gate on the first M1 production beat.

QA:
- PASS: targeted lint for changed files.
- PASS: `python3 scripts/qa_mission_pilot.py`
- PASS: local + Tailscale gold-slice first journey.
- PASS: mobile M1/M2 immersive QA for 8 voice-first missions.
- PASS: browser visual/manual check on M1 greeting step:
  repair choices hidden before audio, audio progress visible, correct choice reaches `First class win`, console clean.
- WEAK/inherited: full `npm run lint` still fails on old app-wide issues outside this lane.

Checkpoint appended:
- `/shared/german-course/GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md`

Kuttan note unchanged:
- Recommend `Arun` or `Kiran` as adult-safe public name later, keeping `Kuttan` as home nickname if Boss approves. No rename done.

Next: reduce `please-thanks` screen count, 45m.

⚠️ File-mutation verifier: 1 file(s) were NOT modified this turn despite any wording above that may suggest otherwise. Run `git status` or `read_file` to confirm.
  • /shared/german-course/GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md — [patch] Found 4 matches for old_string. Provide more context to make it unique, or use replace_all=True.

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
