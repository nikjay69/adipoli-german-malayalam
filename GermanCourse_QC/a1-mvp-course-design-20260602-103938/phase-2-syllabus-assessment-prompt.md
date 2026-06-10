You are continuing the 3h A1 MVP course-design run inside `/shared/german-course`.

Read first:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` if it exists
- `docs/GOETHE_A1_EXAM_MAP.md` if it exists
- `src/lib/content/modules/module-01.ts` only for existing Module 1 context.

Task: design the full A1 syllabus and the spoon-fed test/recovery system.

Create/update concrete artifacts:
1. Create or update `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` with:
   - target: ~35h owned video lessons, with reason not to bloat to 40h unless needed
   - 8-module or equivalent structure covering A1 and Goethe A1
   - lesson count, estimated video minutes, practice minutes, homework/review for each module
   - Must-do track per module: exact sequence the learner follows
   - Score-booster track per module: exact extra resource types, no resource dumping
   - checkpoint schedule: lesson checks, module diagnostics, Goethe-style gates, final mock
   - weakness tags and manual scoring rubric
   - recovery prescriptions: what a learner does when weak in Hören/Lesen/Schreiben/Sprechen/grammar/vocab
   - public-resource curation rules: how to assign YouTube/audio/worksheets without dumping 20 sources
2. Patch `docs/README.md` to include this active artifact.
3. Update `GermanCourse_QC/a1-mvp-course-design-latest.md` with files changed, concrete decisions, and next phase.

Guardrails: do not delete files; do not commit/push/deploy; no paid API/media generation; games later; avoid new abstract docs beyond this one production artifact.
