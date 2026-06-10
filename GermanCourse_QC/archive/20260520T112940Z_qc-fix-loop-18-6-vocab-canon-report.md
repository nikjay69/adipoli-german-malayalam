# Adipoli German — QC/fix loop report

Generated: 2026-05-20T11:29:40Z

## Read first
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B: no production-floor gaps remained, so I improved a weak Module 18 exam lesson. `18-7` and `17-6` already had the targeted recap/richContent/vocabulary coverage, so I safely upgraded `18-6`, which the fresh audit flagged as the weakest online lesson unit.

## Changed files
- `src/lib/content/modules/module-18.ts`

## Exact safe fix
Lesson `18-6` — `Kompletter Übungstest — Alle 4 Teile`:
- Changed the story setting from generic `Goethe-Institut (Prüfungszentrum)` to `Goethe Kochi Mock Prüfungszentrum`.
- Reworded the scene description to explicitly keep the simulation in Kerala and frame Germany as a future goal.
- Added a real lesson vocabulary array matching existing `vocabEncounters`:
  - `die Übungsprüfung`
  - `bestehen`
  - `die Prüfung`
  - `das Ergebnis`

No deletions. No broad rewrites. No answer-key changes.

## Before → after readiness
Before (`GermanCourse_QC/20260520T112754Z_app-level-readiness-audit.md`):
- Lessons: 91
- Average readiness: 86.6 / 100
- Module 18 average readiness: 90.4
- Vocab items: 790
- Production exercises: 313
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Weakest lesson: `18-6` score 81; issues: videos not wired to `videoUrl`; no lesson vocabulary array

After (`GermanCourse_QC/20260520T112911Z_app-level-readiness-audit.md`):
- Lessons: 91
- Average readiness: 86.7 / 100
- Module 18 average readiness: 92.1
- Vocab items: 794
- Production exercises: 313
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- `18-6` no longer appears in the weakest lesson list

## Verification
Command sequence run:
```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts "$i" >/dev/null || exit 1; done
npm run audit:app-readiness
npm run lint -- --max-warnings=0
```

Results:
- Module loader: 18/18 modules import successfully.
- App readiness audit: passed and wrote `GermanCourse_QC/20260520T112911Z_app-level-readiness-audit.md`.
- Lint: still fails with pre-existing app-code issues, not introduced by this content edit.

Top current lint blockers:
- `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect`
- `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect`
- `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect`
- `src/app/games/hor-und-los/page.tsx:135` / `171` — callback accessed before declaration / immutability
- `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts:137` — `@next/next/no-assign-module-variable`

## Next recommended lane
Production floor remains fixed. Next safe lane: reduce generic exercise stems in one weak early/mid module by story-tying prompts without changing correct answers, starting with one of the current score-83 lessons such as `1-6`, `8-2`, `11-4`, or `12-1`.
