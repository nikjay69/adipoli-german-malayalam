# Adipoli German — QC/fix loop report

Generated: 2026-05-20T18:43:56Z

## Read first
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Exact fix lane
Lane **3b — improve current weakest priority lesson**, starting with `18-7`.

Production floor was already clean:
- lessons with productionExercises < 3: 0
- lessons with no speaking: 0
- lessons with no dictation/listening-production: 0

`18-7` still had one readiness issue: its recap video content existed but was not wired to a real `videoUrl`.

## Changed files
- `src/lib/content/modules/module-18.ts`
  - Added `videoUrl: "/videos/generated/v18-7-1.mp4"` to lesson `18-7` recap video.
- `public/videos/generated/v18-7-1.mp4`
  - Added a small generated title-card MP4 for the final recap video. It stays Kerala-rooted and frames Germany as future Goethe confidence, not as Kuttan physically being in Germany.

## Before → after readiness numbers
Initial audit: `GermanCourse_QC/20260520T184139Z_app-level-readiness-audit.md`
Final audit: `GermanCourse_QC/20260520T184323Z_app-level-readiness-audit.md`

### Whole app
- Lessons: 91 → 91
- Average app-readiness: 87.4 → 87.5
- Lessons below production floor: 0 → 0
- Lessons with no speaking: 0 → 0
- Lessons with no dictation/listening-production: 0 → 0
- Wired lesson videoUrls: 22 → 23
- Generic stems: 345 → 345

### Lesson `18-7`
- Readiness score: 95 → 100
- videoUrls: 0 → 1
- issues: `videos not wired to videoUrl` → none
- exercises: 6 → 6
- production exercises: 5 → 5

## Verification results
- Module import verification: **PASS** — all 18 modules imported with `scripts/lib/module_loader.ts`.
- App readiness audit: **PASS** — `Lessons=91 avgReadiness=87.5 belowProductionFloor=0 noSpeaking=0 noDictation=0`.
- Video asset existence: **PASS** — `public/videos/generated/v18-7-1.mp4` exists.
- Lint: **FAIL, pre-existing app-code lint debt**. Current top blockers include:
  - `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect`
  - `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect`
  - `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect`
  - `src/app/games/hor-und-los/page.tsx:135` and `:171` — callback accessed before declaration / immutability
  - `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts:137` — Next.js `no-assign-module-variable`

No lint failure was introduced by the content/video wiring edit.

## Next recommended lane
Continue lane **3b** with `17-6`, then `18-6`: either wire real video assets for their mock-exam recap videos or explicitly mark them as intentional no-video exam simulations and update the audit to understand that distinction. After those are clean, move to reducing generic exercise stems one module at a time without changing correct answers.
