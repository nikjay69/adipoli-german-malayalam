# Adipoli German — 4h continuous vision-to-plan reset

You are running inside a true 4-hour autonomous loop for Boss after he said he is losing faith. Treat this seriously.

Workdir: `/shared/german-course`.

## Boss request
Boss asked: read all documents he has written about how he wants this course, understand the whole vision/goals, stop making incremental UI tweaks, and come back after 4 hours with a **feasible, SMART, actionable, well-defined plan** that definitely matches his vision and makes the German course useful and interesting for students.

## Output target
The final artifact is NOT another vague strategy document. Produce:

`GermanCourse_QC/adipoli-vision-smart-plan-YYYYMMDD-HHMM.md`

It must contain:
1. **Vision reconstruction** — what Boss is trying to build, in plain language.
2. **Non-negotiables** — what must be preserved: Malayali/Kerala identity, Goethe A1 seriousness, adult-safe tone, real audio, production-first, self-sufficient launch-ready course.
3. **Current mismatch diagnosis** — where app/content currently violates vision (text-heavy, page-heavy, dashboard-like, confusing UX, incremental polish, dead links/Tailscale review friction, weak mission/product coherence, boring/click-heavy interactions).
4. **Product model** — the course unit, learner loop, module loop, review/checkpoint loop.
5. **Student-interest plan** — why a learner would continue: story stakes, quick wins, confidence, retention, exam proof, cultural fit.
6. **SMART roadmap** — 4–6 phases with specific outcomes, files/routes affected, acceptance criteria, and what NOT to do.
7. **First 7 days execution plan** — day-by-day, with deliverables and QA gates.
8. **First 48 hours exact build lane** — concrete task list small enough for agents to execute without asking Boss.
9. **Definition of launch-ready** — PASS/WEAK/FAIL gates for content, audio, UX, mobile, pedagogy, exam readiness, and trust.
10. **Boss decisions needed** — max 5 high-leverage decisions; no broad “what do you think?” questions.
11. **Verification harness** — define exactly how future agents judge whether outputs match Boss's vision without Boss checking everything. Include objective rubrics, required evidence, PASS/WEAK/FAIL thresholds, screenshots/browser checks, content-sample checks, and explicit anti-hallucination rules.
12. **Vision-alignment scorecard** — a reusable checklist each build output must pass before being called good: learner value, Malayali/Kerala identity, Goethe A1 proof, adult-safe tone, audio/speaking/writing production, engagement, low cognitive load, premium trust, and launch-readiness.

Use blunt, concrete language. No corporate fluff. No tables unless necessary (Telegram unfriendly). Make it useful for execution and self-verification.

## Mandatory reading
Read and synthesize all top-level vision/product docs in `docs/*.md`, especially:
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

Also inspect relevant recent QC/run outputs in `GermanCourse_QC/`, especially recent continuous-loop checkpoints/reports and any page-by-page/gold-slice reports.

Do not waste time reading every lesson script line-by-line unless needed; use them as evidence for whether the plan can map to real content.

## Evidence requirements
Before writing the final plan, inspect:
- source routes for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, and mission routes under `src/app/missions/`;
- `src/lib/missions/`, `src/lib/content/modules/`, and content/audio structure enough to know what is feasible;
- current git status/diff scale;
- existing QA scripts.

Run lightweight checks if useful: `npx tsc --noEmit --pretty false --incremental false`, `python3 scripts/qa_mission_pilot.py`, curl local routes if server is running. Do not spend the whole loop on coding. The main deliverable is the plan.

## Guardrails
Allowed:
- read files widely;
- write reports/plans/checkpoints under `GermanCourse_QC/`;
- add small helper inventory scripts if useful;
- run QA/check commands;
- make tiny safe source patches only if they directly unblock understanding or review.

Not allowed:
- deployment/push/merge;
- deleting/mass-archiving docs/features;
- pricing/payment/auth changes;
- paid API/media generation;
- mass renaming Kuttan;
- broad code rewrites in this planning loop.

## Iteration behavior
Each iteration should append to:
`GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`

Checkpoint shape:
- Time/iteration
- Docs/source inspected
- Vision findings
- Mismatch findings
- Plan sections drafted/refined
- Remaining questions/risks
- Next iteration focus

Final iteration must produce the final plan path above and include a concise Telegram-ready summary at the bottom titled `## Boss summary`.

## Iteration context
Iteration: 10
Time: 2026-05-31T16:49:54+02:00
Hard stop: 2026-05-31T19:12:35+02:00

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

Current planning docs inventory:
- docs/A1_CURRICULUM_AUDIT.md
- docs/A1_STORY_BIBLE.md
- docs/AI_CINEMATIC_SCRIPTS_V4.md
- docs/AI_GENERATION_COSTS.md
- docs/AI_GENERATION_LOG.md
- docs/AI_GENERATION_PLAN.md
- docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
- docs/CHEATSHEET_LIST.md
- docs/COURSE_AGENT_PRODUCT_QA_SYSTEM_2026-05-20.md
- docs/COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md
- docs/COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md
- docs/COURSE_OPERATING_BRIEF_2026-05-19.md
- docs/COURSE_PLAN_10_10.md
- docs/EXERCISE_QUALITY_RULES.md
- docs/GAME_AUDIT.md
- docs/GOETHE_A1_EXAM_MAP.md
- docs/IMAGE_GENERATION_GUIDE.md
- docs/INTRO_VIDEO_SCRIPT.md
- docs/LAUNCH_CHECKLIST.md
- docs/LESSON_BLUEPRINTS_PRIORITY.md
- docs/M1_AUDIT_REPORT.md
- docs/M2_M3_SETTING_AUDIT.md
- docs/MANUAL_PRODUCTION_WORKFLOW.md
- docs/MODULE_BLUEPRINTS.md
- docs/MODULE_PRODUCT_SCORECARD_TEMPLATE.md
- docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
- docs/PRODUCTION_EXERCISE_SPECS.md
- docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
- docs/README.md
- docs/REMOTION_PIPELINE.md
- docs/SCRIPT_ARCHITECTURE.md
- docs/SERIES_ARC_PLAN.md
- docs/SERIES_FULL_SCRIPT.md
- docs/VIDEO_PIPELINE_V4.md
- docs/VIDEO_PRODUCTION_PLAN.md
- docs/VIDEO_SCRIPT_TEMPLATE.md
- docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md

Important: This run is for synthesis and planning. Do not create broad code churn. Produce/refine the final SMART plan under GermanCourse_QC.
