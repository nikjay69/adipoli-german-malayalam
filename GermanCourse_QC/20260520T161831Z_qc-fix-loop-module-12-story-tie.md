# Adipoli German — QC/fix loop report

Generated: 2026-05-20T16:18:31Z

## Documents read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane C — reduce generic exercise stems in one module by story-tying prompts without changing correct answers.

Reason: current audit showed production floor already clean (`belowProductionFloor=0`, `noSpeaking=0`, `noDictation=0`). The priority lessons `18-7`, `17-6`, and `18-6` are already at score 95 and their remaining audit issue is unwired `videoUrl`, which is not safe to fake without an actual video asset. I therefore used the next safe lane and improved Module 12’s weakest lesson exercise stems.

## Changed files
- `src/lib/content/modules/module-12.ts`

## Exact changes
Story-tied 8 generic prompts in lesson `12-1` (`Hobbies`) while preserving all options and correct answers:
- `ex12-1-1`
- `ex12-1-2`
- `ex12-1-3`
- `ex12-1-4`
- `ex12-1-6`
- `ex12-1-7`
- `ex12-1-8`
- `ex12-1-9`

The edits anchor prompts to Kerala/Kuttan/Arjun/Priya/Goethe Kochi contexts and keep the A1 target unchanged.

## Before → after readiness numbers
Initial audit: `GermanCourse_QC/20260520T161626Z_app-level-readiness-audit.md`
After audit: `GermanCourse_QC/20260520T161759Z_app-level-readiness-audit.md`

Course-wide:
- Average readiness: `87.0` → `87.2`
- Generic exercise stems: `362` → `354`
- Lessons below production floor: `0` → `0`
- No-speaking lessons: `0` → `0`
- No-dictation lessons: `0` → `0`
- Exercises: `997` → `997`
- Production exercises: `314` → `314`

Lesson-level:
- `12-1 Hobbies` readiness: `83` → `95`
- `12-1` generic stems: `8` → `0`
- Remaining `12-1` issue: `videos not wired to videoUrl`

## Verification results
- Module import verification: PASS — all 18 modules imported with `scripts/lib/module_loader.ts`.
- `npm run audit:app-readiness`: PASS — wrote `GermanCourse_QC/20260520T161759Z_app-level-readiness-audit.md`; `Lessons=91 avgReadiness=87.2 belowProductionFloor=0 noSpeaking=0 noDictation=0`.
- `npm run lint -- --max-warnings=0`: FAIL, existing app-wide lint debt; no errors point to `src/lib/content/modules/module-12.ts`.

Top current lint blockers observed:
1. `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect` for `setMounted(true)`.
2. `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect` for `setPhase('victory')`.
3. `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect` for `generateQuestions()`.
4. `src/app/games/hor-und-los/page.tsx:135` / `171` — hook immutability errors from accessing `finishGame` / `handleTimeout` before declaration.
5. `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts:11/31/44`, `src/lib/study-plan.ts:137` — Next.js `no-assign-module-variable` errors.

## Next recommended lane
Continue Lane C in Module 12: story-tie generic stems in `12-2 Weather & Seasons` next (`8` generic stems), then `12-3`, then `12-4`. Do not touch `videoUrl` fields until real video assets or a deliberate placeholder-video policy exists.
