# Adipoli German — docs index

This index is intentionally short. The course had too many planning documents; **do not create another strategy doc unless it unblocks implementation today**.

## Single source of truth

Read first and patch when direction changes:

- [`COURSE_OPERATING_BRIEF_2026-05-19.md`](COURSE_OPERATING_BRIEF_2026-05-19.md) — current course soul, MVP direction, safe work lanes, and build priority.

Current locked direction, 2026-06-02:

- **MVP first:** guided A1 video course + practice + checkpoints. Games are later.
- **Course spine:** ~35h of our own A1 video lessons, phone-first and desktop-friendly.
- **Learner promise:** zero → Goethe A1-ready, not vague “learn German”.
- **Guidance style:** spoon-fed must-do path, not “here are 20 resources”.
- **Adaptive spine:** closed tests diagnose Hören/Lesen/Schreiben/Sprechen/grammar/vocab weaknesses.
- **Recovery:** prescribe exact remedial tasks and score-booster tasks.
- **Scoring:** manual/human answer coding is acceptable for MVP; AI is optional support, not the foundation.
- **External content:** allowed only as assigned reinforcement, never as the course backbone.

## Active build stack

Only load deeper docs when the task needs them.

1. [`COURSE_OPERATING_BRIEF_2026-05-19.md`](COURSE_OPERATING_BRIEF_2026-05-19.md) — source of truth.
2. [`A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md`](A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md) — concrete customer-facing page flow, MVP page list, low-text UX rules, and customer PASS/WEAK/FAIL gate.
3. [`A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md`](A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md) — active 35h A1 syllabus, must-do/score-booster tracks, checkpoints, weakness tags, scoring rubric, and recovery prescriptions.
4. [`WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`](WHOLE_COURSE_MISSION_SPINE_2026-05-20.md) — module/mission arc.
5. [`PRODUCT_DIRECTION_RESET_2026-05-20.md`](PRODUCT_DIRECTION_RESET_2026-05-20.md) — why the app must be guided missions, not dashboard/game clutter.
6. [`PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`](PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md) — PASS/WEAK/FAIL evidence gates.
7. [`AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`](AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md) — what the agent may do without babysitting.

## Task-specific references

Use these only when needed:

- Goethe/exam mapping: [`GOETHE_A1_EXAM_MAP.md`](GOETHE_A1_EXAM_MAP.md)
- Exercise design: [`EXERCISE_QUALITY_RULES.md`](EXERCISE_QUALITY_RULES.md), [`PRODUCTION_EXERCISE_SPECS.md`](PRODUCTION_EXERCISE_SPECS.md)
- Story canon: [`A1_STORY_BIBLE.md`](A1_STORY_BIBLE.md)
- Video/script production: [`SCRIPT_ARCHITECTURE.md`](SCRIPT_ARCHITECTURE.md), [`VIDEO_SCRIPT_TEMPLATE.md`](VIDEO_SCRIPT_TEMPLATE.md), [`MANUAL_PRODUCTION_WORKFLOW.md`](MANUAL_PRODUCTION_WORKFLOW.md), [`REMOTION_PIPELINE.md`](REMOTION_PIPELINE.md)
- Active Module 1 production pack: [`../course-production/a1-mvp/module-01/`](../course-production/a1-mvp/module-01/) — brief, scripts 1–7, storyboard/slides, checkpoint rubric, must-do/score-booster pack, app-practice wiring spec, standalone Lesson 2–7 practice routes, and scored checkpoint route `/missions/module-1/checkpoint`
- Module/product QA: [`MODULE_PRODUCT_SCORECARD_TEMPLATE.md`](MODULE_PRODUCT_SCORECARD_TEMPLATE.md), `GermanCourse_QC/`
- Launch/business later: [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md), [`INSTAGRAM_MARKETING_PLAN.md`](INSTAGRAM_MARKETING_PLAN.md), [`CAMPAIGN_PLAN.md`](CAMPAIGN_PLAN.md)

## Historical/reference only

These are not the current plan. Do not treat them as active direction unless Boss explicitly asks:

- old cinematic/video-generation plans
- old broad automation/marketing plans
- old audit reports
- game audits and game-first ideas
- long continuous-loop prompts/checkpoints
- per-video scripts under [`scripts/`](scripts/) unless the task is script production/QC

## Working rule

Patch this index or the operating brief instead of adding new planning files. The next useful artifact should be one of:

- a concrete syllabus/module map,
- a lesson/video script,
- a test-and-recovery rubric,
- a browser-verified app change,
- a short QC report with file paths and PASS/WEAK/FAIL evidence.
