# Adipoli German QC/fix loop — 18-7 recap upgrade

Generated: 2026-05-20T09:52:48Z
Workspace: `/shared/german-course`

## Required context read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B from this run's priority order: production floor was already clear, so I improved the current weakest lesson, starting with `18-7`.

Target lesson:
- `18-7 Adipoli A1 Conclusion — Celebration!`

## Changed files
- `src/lib/content/modules/module-18.ts`
  - Added one short recap video/richContent block for lesson `18-7`.
  - Added a final A1 confidence checklist anchored in Kerala/Goethe Kochi.
  - Added three small, safe exercises:
    - celebration MCQ: `ex18-7-celebration-mcq`
    - final oral checklist speaking prompt: `ex18-7-final-speaking-checklist`
    - final writing reflection: `ex18-7-final-writing-reflection`

No files deleted. No cron jobs scheduled.

## Course-soul/canon check
- Kerala-rooted setting preserved: final scene remains the Kerala cafe after Goethe Kochi.
- Kuttan is not physically placed in Germany.
- Germany is framed only as future rehearsal/goal.
- Exercises stay A1-safe and Goethe-oriented.

## Before → after readiness
Initial audit in this run:
- Audit report: `GermanCourse_QC/20260520T095029Z_app-level-readiness-audit.md`
- Lessons: 91
- Average readiness: 86.2 / 100
- Videos in lessons: 146
- Exercises: 994
- Production exercises: 311
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Weakest lesson: `18-7`, score 66; issues: no videos, thin exercise set (<6)

After fix:
- Audit report: `GermanCourse_QC/20260520T095200Z_app-level-readiness-audit.md`
- Lessons: 91
- Average readiness: 86.5 / 100
- Videos in lessons: 147
- Exercises: 997
- Production exercises: 313
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- `18-7` is no longer listed among weakest online lesson units.
- Current weakest lessons: `17-6` and `18-6`, both score 81.

## Verification
Commands run:

```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done
npm run audit:app-readiness
npm run lint -- --max-warnings=0
```

Results:
- Module loader: 18/18 modules imported successfully.
- App readiness audit: passed and wrote `GermanCourse_QC/20260520T095200Z_app-level-readiness-audit.md`.
- Lint: failed with pre-existing app-wide lint/code issues; no new content/module lint blocker was reported from this edit.

Top current lint blockers:
- `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect` for synchronous `setMounted(true)`.
- `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect` for synchronous `setPhase('victory')`.
- `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect` for `generateQuestions()` inside effect.
- `src/app/games/greeting-time/page.tsx:362` and `:452` — synchronous state updates inside effects.
- `src/app/games/hor-und-los/page.tsx:135` and `:171` — callbacks accessed before declaration; plus `Date.now()` purity warning at `:201`.
- `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts:137` — `@next/next/no-assign-module-variable`.

## Next recommended lane
Improve `17-6 Übungstest — Hören & Lesen` next. It is now tied for weakest lesson with `18-6` at score 81. Safe options:
1. Add/mark explicit exam-simulation richContent/feedback, or
2. Add a small vocabulary/review array if the app expects lesson vocabulary, without rewriting the mock test.
