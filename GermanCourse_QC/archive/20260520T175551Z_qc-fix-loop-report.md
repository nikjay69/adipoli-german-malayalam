# Adipoli German — QC/fix loop report

Generated: 2026-05-20T17:55:51Z

## Read first
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B — improve the current weakest audited lesson: `4-2 Describing People`.

Reason: the first audit showed no production-floor blockers, no missing speaking, and no missing dictation. The named Module 17/18 priority lessons (`18-7`, `17-6`, `18-6`) already scored 95 with only unwired videoUrl issues, so I selected the current weakest lesson from the audit (`4-2`, score 83) and made a safe story/canon + generic-stem fix without changing correct answers.

## Changed files
- `src/lib/content/modules/module-04.ts`

## Exact edits
- Reframed lesson `4-2` from physically being at `Tempelhofer Feld, Berlin` to `Goethe Kochi Classroom — Berlin Photo Practice`.
- Kept Berlin as printed-photo / future-life rehearsal only; Kuttan and learner remain in Kerala.
- Rewrote five generic exercise stems to tie them to Goethe Kochi / Kuttan / Frau Weber / Kerala context while preserving options and correct answers:
  - `ex4-2-1`
  - `ex4-2-3`
  - `ex4-2-4`
  - `ex4-2-7`
  - `ex4-2-9`

## Before → after readiness
Initial audit: `GermanCourse_QC/20260520T175308Z_app-level-readiness-audit.md`

After audit: `GermanCourse_QC/20260520T175521Z_app-level-readiness-audit.md`

| Metric | Before | After |
|---|---:|---:|
| Average app-readiness | 87.3 | 87.4 |
| Lessons below production floor | 0 | 0 |
| Lessons with no speaking | 0 | 0 |
| Lessons with no dictation | 0 | 0 |
| Generic exercise stems | 350 | 345 |
| Module 04 avg readiness | 87.0 | 89.4 |
| Lesson 4-2 readiness | 83 | 95 |
| Lesson 4-2 generic stems | 5 | 0 |

## Verification
- Module import check: PASS — all 18 modules imported with `scripts/lib/module_loader.ts`.
- App readiness audit: PASS — wrote `GermanCourse_QC/20260520T175521Z_app-level-readiness-audit.md`.
- Lint: FAIL, pre-existing app-code lint blockers remain. Top current errors include:
  - `src/app/auth/signup/page.tsx:57` — synchronous `setState` inside effect.
  - `src/app/games/boss/[moduleId]/page.tsx:70` — synchronous `setState` inside effect.
  - `src/app/games/fill-the-gap/page.tsx:502` — synchronous state-generating call inside effect.
  - `src/app/games/hor-und-los/page.tsx:135` / `171` — callbacks accessed before declaration.
  - `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts:137` — assignment to variable named `module`.

No new lint errors were introduced in the edited content file.

## Next recommended lane
Continue the same safe weakest-lesson pass: fix `5-2 Morning Routine` next by story-tying generic stems and checking for any Kerala/A1 canon drift, without changing correct answers or broad-rewriting the lesson.
