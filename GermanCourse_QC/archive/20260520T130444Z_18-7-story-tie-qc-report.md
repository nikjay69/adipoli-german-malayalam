# Adipoli German QC/fix loop — 18-7 story-tied dictation

Generated: 2026-05-20T13:04:44Z
Workdir: `/shared/german-course`

## Required context read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B: no production-floor blockers remained, so improved the priority lesson `18-7`.

Production floor status before fix:
- Lessons below production floor: 0
- Lessons with no speaking: 0
- Lessons with no dictation: 0

## Changed files
- `src/lib/content/modules/module-18.ts`

## Exact safe fix
Story-tied the remaining generic dictation prompt in Lesson `18-7` without changing the answer, audio URL, exercise type, or scoring.

Changed prompt:
- Before: `Listen and type the A1 sentence you hear.`
- After: `At the Kerala cafe, Kuttan plays one final Goethe A1 audio note. Listen and type the sentence you hear.`

Why this is safe:
- Keeps the existing A1 sentence: `Können Sie mir bitte helfen`
- Keeps the existing audio: `/audio/hoeren/module-18/ex18-7-prod-dictation.mp3`
- Preserves Kerala-rooted course canon
- Does not place Kuttan physically in Germany
- Improves the online learner chain by making the Hören task feel like the final Goethe/Kerala celebration scene, not a generic app prompt

## Before → after readiness numbers
Initial audit: `GermanCourse_QC/20260520T130323Z_app-level-readiness-audit.md`
Post-fix audit: `GermanCourse_QC/20260520T130423Z_app-level-readiness-audit.md`

Course-wide:
- Average app-readiness: 86.7 → 86.8
- Lessons: 91 → 91
- Exercises: 997 → 997
- Production exercises: 313 → 313
- Lessons below production floor: 0 → 0
- Lessons with no speaking: 0 → 0
- Lessons with no dictation: 0 → 0
- Generic exercise stems: 373 → 372

Lesson `18-7`:
- Readiness score: 93 → 95
- Generic exercise stems: 1 → 0
- Production exercises: 5 → 5
- Speaking/free-text/dictation: 2 / 2 / 1 → 2 / 2 / 1
- Remaining audit issue: `videos not wired to videoUrl`

## Verification results
1. Module import check:
   - Command: `for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts "$i" >/dev/null; done`
   - Result: PASS — all 18 modules import.

2. App readiness audit:
   - Command: `npm run audit:app-readiness`
   - Result: PASS — wrote `GermanCourse_QC/20260520T130423Z_app-level-readiness-audit.md`
   - Summary: `Lessons=91 avgReadiness=86.8 belowProductionFloor=0 noSpeaking=0 noDictation=0`

3. Lint:
   - Command: `npm run lint -- --max-warnings=0`
   - Result: FAIL — pre-existing app-wide lint blockers, not introduced by this content-only edit.
   - Top current blockers:
     - `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect`
     - `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect`
     - `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect`
     - `src/app/games/greeting-time/page.tsx:362` and `:452` — `react-hooks/set-state-in-effect`
     - `src/app/games/hor-und-los/page.tsx:135` and `:171` — callback accessed before declaration / immutability
     - `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts:11/31/44`, `src/lib/study-plan.ts:137` — `@next/next/no-assign-module-variable`
   - Reported total: 260 problems, 109 errors, 151 warnings.

## Next recommended lane
Continue Lane B with `17-6`, then `18-6`: improve mock-test lesson readiness by adding/marking richer exam-review structure and reducing generic prompts, while keeping production-floor coverage intact. If video assets are intentionally absent for exam simulations, add explicit content metadata or richContent explaining the no-video exam mode rather than pretending videos exist.
