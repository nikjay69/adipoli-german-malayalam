# Adipoli German — Mock-test quality sprint

Generated: 2026-05-20T15:21:55Z
Workdir: `/shared/german-course`

## Lane chosen
Production coverage did not regress, and lesson `18-7` already has the final recap/richContent/checklist and 6 exercises. I used the next safe lane: improve mock-test quality for `17-6` without broad rewrites.

## Change made
Changed file:

- `src/lib/content/modules/module-17.ts`

Lesson improved:

- `17-6` — `Übungstest — Hören & Lesen`

Append/enrich-only improvement:

- Added an app-readable `richContent` list: **Exam simulation rules — do this before tapping Start**.
- Added an app-readable `richContent` vocabulary block for key mock-test words: `die Durchsage`, `das Gespräch`, `die Aufgabe`, `mindestens`.
- Added a richer feedback note that forces post-mock diagnosis by skill instead of vague “good/bad” scoring:
  - Hören = missed sound/detail
  - Lesen = missed proof line
  - next A1 action: `Ich übe Hören.` / `Ich übe Lesen.`

Canon check:

- Kept setting in Goethe Kochi / Kerala mock-test frame.
- No Kuttan physical Germany placement added.
- Germany references remain exam/future/material context only.

## Before → after audit numbers

Before sprint audit: `GermanCourse_QC/20260520T152011Z_app-level-readiness-audit.md`

- Lessons: 91
- Exercises: 997
- Production exercises: 314
- Average app-readiness: 86.9 / 100
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 371

After sprint audit: `GermanCourse_QC/20260520T152140Z_app-level-readiness-audit.md`

- Lessons: 91
- Exercises: 997
- Production exercises: 314
- Average app-readiness: 86.9 / 100
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 371

Note: the audit score did not move because this sprint improved rich mock-test guidance/review content, not counted exercise totals.

## Verification

Commands run:

```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done
npm run audit:app-readiness
npm run lint -- --max-warnings=0
```

Results:

- Module loader: 18/18 passed.
- App-readiness audit: passed and wrote `GermanCourse_QC/20260520T152140Z_app-level-readiness-audit.md`.
- Production floor remains clean: 0 lessons below floor, 0 no-speaking, 0 no-dictation.
- Lint still fails with pre-existing app-wide issues unrelated to this content edit.

Top current lint blockers:

- `src/app/auth/signup/page.tsx` — `react-hooks/set-state-in-effect` at `setMounted(true)`.
- `src/app/games/boss/[moduleId]/page.tsx` — `react-hooks/set-state-in-effect` around victory/defeat phase updates.
- `src/app/games/fill-the-gap/page.tsx` — `react-hooks/set-state-in-effect` via `generateQuestions()` in effect.
- `src/app/games/hor-und-los/page.tsx` — hook immutability/order issues: `finishGame` and `handleTimeout` accessed before declaration; `Date.now()` purity warning.
- `src/lib/content/modules.ts`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts` — `@next/next/no-assign-module-variable`.
- `src/remotion/LessonGuideVideo.tsx` — `react-hooks/immutability` from reassigning `cursor` during render.

## Next lane

Reduce generic exercise stems in one weak module, starting with a low-scoring lesson from the current audit such as `12-1`, `12-2`, or `11-4`. Keep grammar targets and answers unchanged; only story-tie the question stems to the existing scene/Kuttan/Goethe context.
