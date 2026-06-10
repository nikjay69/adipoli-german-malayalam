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
