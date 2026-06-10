# Adipoli German — Production-floor QC loop

Generated: 2026-05-20T14:41:04Z

## Required context read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B: production floor was already clear, so I improved the next priority Goethe exam lesson after the already-upgraded `18-7`: `17-6`.

Reason: `17-6` is the full Hören/Lesen mock. It already had the hard production floor, but it needed a stronger post-mock conversion step so learners turn mock performance into an A1 action sentence.

## Changed files
- `src/lib/content/modules/module-17.ts`
  - Appended one safe production exercise to lesson `17-6`:
    - `ex17-6-mock-feedback-writing`
    - type: `free-text`
    - prompt: after the Goethe Kochi mock, write one short feedback/next-action sentence for Kuttan: `Ich übe Hören.` or `Ich übe Lesen.`
  - Preserved Kerala/Goethe Kochi mock framing.
  - No broad rewrites, no deletions, no physical Kuttan-in-Germany drift.

## Before → after readiness numbers
Before audit: `GermanCourse_QC/20260520T143953Z_app-level-readiness-audit.md`
- Lessons: 91
- Exercises: 996
- Production exercises: 313
- Average readiness: 86.8 / 100
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 372
- M17: 89 exercises, 24 production, avg readiness 91.0

After audit: `GermanCourse_QC/20260520T144044Z_app-level-readiness-audit.md`
- Lessons: 91
- Exercises: 997
- Production exercises: 314
- Average readiness: 86.8 / 100
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 372
- M17: 90 exercises, 25 production, avg readiness 91.0

## Verification
### Module loader
Command:
```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done
```
Result: pass — all 18 modules import.

### App readiness audit
Command:
```bash
npm run audit:app-readiness
```
Result: pass — wrote `GermanCourse_QC/20260520T144044Z_app-level-readiness-audit.md`.

### Lint
Command:
```bash
npm run lint -- --max-warnings=0
```
Result: fail with existing app-code lint debt, not from the content edit.

Top current blockers:
- `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect`
- `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect`
- `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect`
- `src/app/games/hor-und-los/page.tsx:135` — `finishGame` accessed before declaration
- `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts:137` — `@next/next/no-assign-module-variable`
- Overall lint summary: 260 problems, 109 errors, 151 warnings.

## Next recommended lane
Continue Lane B with `18-6`: add one small exam-feedback or self-check production step, unless the next audit shows a fresh production-floor regression. After `18-6`, start Lane C: story-tie generic exercise stems in one weak module without changing correct answers.
