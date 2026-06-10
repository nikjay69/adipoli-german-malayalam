You are continuing the 3h A1 MVP course-design run inside `/shared/german-course`.

Read first:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` if it exists
- `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` if it exists
- `docs/VIDEO_SCRIPT_TEMPLATE.md` and `docs/SCRIPT_ARCHITECTURE.md` if they exist
- `src/lib/content/modules/module-01.ts`
- `src/lib/content/video-scripts.ts`

Use this generated style sample as a route-scoped visual reference, not a UI reskin:
`public/images/mvp-style-samples/a1-kerala-study-evening-20260602.png`
Self-assess it: adult-safe yes/no, Kerala specificity, Goethe seriousness, low visible text, weakness.

Task: turn Module 1 into a presenter-ready video-production pack.

Create/update concrete artifacts under `course-production/a1-mvp/module-01/`:
1. `MODULE_01_PRODUCTION_BRIEF.md`
   - module promise
   - customer outcome
   - lessons/videos in Module 1
   - must-do practice path
   - score-booster path
   - checkpoint/recovery
   - phone/desktop UX notes
2. `lesson-01-video-script.md`
   - presenter-ready script Boss can later speak in Malayalam/Manglish
   - use English stage directions and on-screen text
   - include German examples accurately
   - structure: hook, teaching point, examples, practice pause, tiny test, CTA
   - avoid requiring literal Malayalam script; mark `[Boss explains in Malayalam/Manglish]` where appropriate
3. `lesson-01-storyboard-and-slides.md`
   - scene visuals, slides/tables, AI-image prompts, where to show Boss talking head, where to show on-screen German
   - at least one table and one visual idea
   - keep low text and adult-safe
4. `module-01-checkpoint-rubric.md`
   - closed-book mini-test after Module 1
   - Hören/Lesen/Schreiben/Sprechen/grammar/vocab tags
   - manual scoring rubric
   - must-do recovery prescriptions and score-booster prescriptions.
5. Patch `docs/README.md` to point to this Module 1 production pack.
6. Update `GermanCourse_QC/a1-mvp-course-design-latest.md` with exact files changed and honest PASS/WEAK/FAIL.

Guardrails: do not delete files; do not commit/push/deploy; no paid API/media generation; do not mass-edit existing app code unless required; games later. Produce files Boss can review and eventually use for recording.
