# Adipoli German — QC/fix loop report

Generated: 2026-05-20T19:32:03Z

## Fix lane

Lane B: improve the current weakest prioritized exam lesson after production-floor coverage passed.

- Production floor had no gaps: `belowProductionFloor=0`, `noSpeaking=0`, `noDictation=0`.
- `18-7` was already clean at 100 readiness.
- Chose `17-6` next because it was the next prioritized weak exam lesson and had one remaining app-readiness issue: video not wired to `videoUrl`.

## Changed files

- `src/lib/content/modules/module-17.ts`
  - Added `videoUrl: "/videos/generated/v17-6-1.mp4"` to lesson `17-6` video `v17-6-1`.
- `public/videos/generated/v17-6-1.mp4`
  - Added an 8-second online-app video slate for the Goethe A1 Hören/Lesen mock exam strategy lesson.

No files deleted by this run. No broad rewrites. Workspace already had many unrelated modified/untracked files before/around this pass; this report lists only the intentional QC-loop changes above.

## Before → after readiness numbers

Initial audit report from this run: `GermanCourse_QC/20260520T192948Z_app-level-readiness-audit.md`

After-fix audit report: `GermanCourse_QC/20260520T193133Z_app-level-readiness-audit.md`

Course totals:

| Metric | Before | After |
|---|---:|---:|
| Lessons | 91 | 91 |
| Average readiness | 87.45 | 87.51 |
| Videos with `videoUrl` | 23 | 24 |
| Exercises | 997 | 997 |
| Production exercises | 314 | 314 |
| Generic stems | 345 | 345 |
| Below production floor | 0 | 0 |
| No speaking | 0 | 0 |
| No dictation | 0 | 0 |

Lesson `17-6`:

| Metric | Before | After |
|---|---:|---:|
| Readiness score | 95 | 100 |
| Video URLs | 0 | 1 |
| Issues | `videos not wired to videoUrl` | none |
| Exercises | 19 | 19 |
| Production exercises | 4 | 4 |

## Verification

- Module import check: passed for all 18 modules using `scripts/lib/module_loader.ts`.
- `npm run audit:app-readiness`: passed.
  - Latest audit: `GermanCourse_QC/20260520T193133Z_app-level-readiness-audit.md`
  - Summary: `Lessons=91 avgReadiness=87.5 belowProductionFloor=0 noSpeaking=0 noDictation=0`
- Media check: `public/videos/generated/v17-6-1.mp4` exists and probes cleanly.
  - Duration: 8.0s
  - Size: 33,209 bytes
- `npm run lint -- --max-warnings=0`: failed with existing app-code lint debt, not from this content/media edit.
  - Top current errors include:
    - `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect`
    - `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect`
    - `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect`
    - `src/app/games/hor-und-los/page.tsx:135` — `finishGame` accessed before declaration
    - `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts:11/31/44`, `src/lib/study-plan.ts:137` — `no-assign-module-variable`

## Next recommended lane

Continue Lane B with `18-6`: it is now the next prioritized exam lesson with the same remaining app-readiness issue — one video exists in content but is not wired to a real `videoUrl`.
