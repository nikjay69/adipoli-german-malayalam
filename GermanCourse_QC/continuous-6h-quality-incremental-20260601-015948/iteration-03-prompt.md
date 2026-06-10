# Adipoli German — 6h quality + incremental improvement loop

You are one iteration inside a true continuous 6-hour autonomous loop for Boss.

Workdir: `/shared/german-course`.

## Boss request

Work for the next 6 hours based on the plan. Focus on quality and incremental improvements.

Latest Boss feedback to preserve:
- The generated Kerala-rooted visual direction is fine and more relatable than random abstract/ball people.
- But visuals must not destroy the course UI.
- Treat visuals as supporting scene assets, not a reskin.

## Required context to read first

1. `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1912.md`
2. `/shared/german-course/GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`
3. `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
4. `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
5. `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
6. Relevant current source/QA files before changing them.

Do not trust old reports without re-checking current files and running verification.

## Current state assumptions to verify

- The repo already has a large inherited dirty tree. Do not commit, push, deploy, or broad-reformat.
- A dev server may already be running on `0.0.0.0:3000`; verify before starting another.
- Recent QA harness fixes may already make these pass: `qa_intro_start_path.mjs`, `qa_gold_slice_first_journey.mjs`, `qa_mission_pilot.py`, `tsc`.

## Product bar

Adipoli German = Kerala-rooted, adult-safe, Goethe A1 mission coach for Malayali beginners.

Every useful improvement should move the product toward:
- scene → real German audio → learner output → repair → ability win → next pull;
- less text, fewer choices, fewer dashboard surfaces;
- more real learner action within 45–90 seconds;
- real browser/mobile/audio evidence before quality claims.

## Priorities for this 6h run

Work in small verified slices. Pick exactly one lane per iteration, finish it, verify it, checkpoint it, then continue.

### Lane A — First-mission visual relatability experiment

Scope:
- One route/surface only, preferably the first Module 1 mission or its immediate intro/start path.
- Replace generic/random abstract placeholder feel with one Kerala-rooted adult-safe scene support asset.
- Use existing generated image sample as direction if useful, or create a lightweight local SVG/CSS scene. Do not generate a new image unless truly necessary.

Hard rules:
- No global reskin.
- No UI architecture replacement.
- No extra learner text.
- No mascot/childish energy.
- Must include before/after screenshots or visual notes.
- If it makes the screen heavier, revert/skip and record WEAK/FAIL.

### Lane B — Module 1 sequence closure

Verify/fix:
- `/` → `/intro` → Module 1 mission 1 works by actual browser click.
- Mission 1 → Mission 2 → Mission 3 → Module 2 handoff is clear.
- Completion requires output/repair, not passive click-through.
- No visible system/meta labels or product-process copy.
- Focused routes hide nav/search and work at 390px mobile.

### Lane C — Module 2 gold path quality

Verify/fix:
- All 5 Module 2 mission routes load and form a coherent name/spelling/origin/job/final-self-intro arc.
- Real audio files return 200 and play in browser where used.
- Each mission has situation, hear, output, repair, ability win, next pull.
- The final self-intro checkpoint proves useful A1 output without long mobile typing burden.

### Lane D — Production/audio/canon inventory only if build lanes are blocked

Read-only or tiny safe fixes:
- Production floor inventory: speaking, free-text/type-answer, dictation/listening per lesson.
- Missing audio manifest.
- Canon drift hits: Kuttan physically in Germany during A1 is wrong unless future/dream/video-call/mock.

## Verification required per iteration

Run targeted checks relevant to the changed area. Prefer real evidence over vibes.

Minimum after code/content changes:
- `npx tsc --noEmit --pretty false --incremental false` when practical.
- Relevant QA script(s):
  - `node scripts/qa_intro_start_path.mjs`
  - `node scripts/qa_gold_slice_first_journey.mjs`
  - `python3 scripts/qa_mission_pilot.py`
  - `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`
- Browser/Puppeteer click path for any changed route.
- Console/errors check.
- Audio HTTP/browser playback proof for any audio path touched.
- Screenshot path or visual notes for visual work.

If app-wide checks fail due inherited dirty tree, separate inherited failures from your change and still run targeted checks.

## Guardrails

Allowed:
- Scoped source edits.
- Small reusable component fixes.
- Local SVG/CSS/image asset usage.
- QA script updates that encode behavior, not stale copy.
- QC reports/checkpoints.

Forbidden without Boss approval:
- Deploy/push/merge/commit.
- Pricing/payment/auth changes.
- Mass doc deletion/archive.
- Mass Kuttan rename.
- Paid media/API generation at scale.
- Broad redesign or reskin.
- Large unverified rewrites.

## Checkpoint requirement

Append after every iteration to:
`/shared/german-course/GermanCourse_QC/adipoli-6h-quality-incremental-checkpoint.md`

Use this shape:

```
## Iteration N — <timestamp>
- Lane:
- Source/docs inspected:
- Files changed:
- Improvement made:
- Verification run:
- PASS/WEAK/FAIL:
- Weaknesses / next fix:
```

Do not stop at planning. Make one safe high-leverage improvement, verify it, checkpoint it, and continue until the hard stop.

## Iteration context
Iteration: 3
Time: 2026-06-01T02:35:57+02:00
Hard stop: 2026-06-01T07:59:48+02:00

Recent checkpoint tail:
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
?? scripts/adipoli_continuous_6h_quality_incremental_loop.sh
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
?? scripts/adipoli_continuous_4h_vision_plan_loop.sh
?? scripts/adipoli_continuous_6h_quality_incremental_loop.sh
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

Continue from current repo state. Do not overwrite unrelated dirty work. Prefer one scoped improvement with real verification.
