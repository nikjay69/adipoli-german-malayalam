# Adipoli German — Sprint tick report

Generated: 2026-05-20T13:42:50Z
Workdir: `/shared/german-course`

## Briefs read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Starting audit
Command: `npm run audit:app-readiness`

Report: `GermanCourse_QC/20260520T134052Z_app-level-readiness-audit.md`

Key numbers before this tick:
- Lessons: 91
- Average readiness: 86.8 / 100
- Exercises: 997
- Production exercises: 313
- Lessons below production floor: 0
- No-speaking lessons: 0
- No-dictation lessons: 0
- Generic stems: 372

Interpretation: production coverage did not regress, so I stayed in the Module 18 final-recap lane.

## Safe improvement made
Changed file:
- `src/lib/content/modules/module-18.ts`

Specific edits in lesson `18-7`:
1. Enriched the final recap video's `richContent` with an app-readable oral A1 mini-check table:
   - introduce yourself
   - say where you live
   - ask politely
   - say a future plan
   - thank the examiner
2. Kept canon safe:
   - final scene remains Kerala cafe / Goethe Kochi celebration
   - Germany is framed only as future rehearsal
   - no Kuttan physical Germany drift introduced
3. Cleaned the malformed `exercises: [,` array start in `18-7` to `exercises: [`.
   - This removed one empty array slot that the audit had been counting as an exercise-like entry.
   - Real exercises remained intact; `18-7` still has 6 real exercises and the required speaking/free-text/dictation production mix.

## Verification
### Module import check
Command:
```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts "$i" >/dev/null || exit 1; done
```
Result: PASS — all 18 modules import.

### App readiness audit after edit
Command: `npm run audit:app-readiness`

Report: `GermanCourse_QC/20260520T134211Z_app-level-readiness-audit.md`

After numbers:
- Lessons: 91
- Average readiness: 86.8 / 100
- Exercises: 996
- Production exercises: 313
- Lessons below production floor: 0
- No-speaking lessons: 0
- No-dictation lessons: 0
- Generic stems: 372

Before → after:
- Average readiness: 86.8 → 86.8
- Production floor gaps: 0 → 0
- Production exercises: 313 → 313
- Exercises: 997 → 996, because the empty `18-7` array slot was removed; no real learner exercise was deleted.

### Lint
Command: `npm run lint -- --max-warnings=0`

Result: FAIL — existing app-wide lint blockers remain. The current content edit did not touch these files.

Top current failure types observed:
- `react-hooks/set-state-in-effect` in multiple app/game/components files, e.g.:
  - `src/app/auth/signup/page.tsx:57`
  - `src/app/games/boss/[moduleId]/page.tsx:70`
  - `src/app/games/fill-the-gap/page.tsx:502`
- `react-hooks/immutability` / declaration-order issues in `src/app/games/hor-und-los/page.tsx`.
- `react-hooks/purity` from render-time `Math.random()` / `Date.now()`, e.g.:
  - `src/components/lesson/NarrativeIntro.tsx:64`
  - `src/components/lesson/SceneConclusion.tsx:31`
  - `src/components/visual/SceneBackground.tsx:104`
- `@next/next/no-assign-module-variable` in:
  - `src/lib/content/modules.ts:48`
  - `src/lib/curriculum.ts`
  - `src/lib/study-plan.ts:137`

Lint summary from command: `260 problems (109 errors, 151 warnings)`.

## Notes
- The workspace already had broader uncommitted `module-18.ts` changes visible in git diff before/around this tick. This report only claims the small `18-7` richContent/table cleanup described above.
- No files deleted.
- No cron jobs scheduled.

## Next lane
Continue with the ordered course lane: improve `17-6` or `18-6` mock-test quality by adding app-readable review/exam-simulation content and richer feedback, without broad rewriting.
