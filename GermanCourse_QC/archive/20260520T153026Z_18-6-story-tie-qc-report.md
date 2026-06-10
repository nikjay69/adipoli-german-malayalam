# Adipoli German QC/fix loop — 18-6 story-tie pass

Generated: 2026-05-20T15:30:26Z

## Required context read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B/C hybrid, safely applied to the next Goethe-priority target after the existing 18-7 and 17-6 upgrades:
- Production floor had no gaps, so no production-floor patch was needed.
- Improved lesson `18-6` (`Kompletter Übungstest — Alle 4 Teile`) by story-tying generic speaking/writing/dictation stems to Goethe Kochi mock context.
- No answer keys, options, audio paths, lesson structure, or canon were changed.

## Changed files
- `src/lib/content/modules/module-18.ts`
  - `ex18-6-14`: tied ordering prompt to Frau Weber in the Goethe Kochi mock room.
  - `ex18-6-15`: tied Wohnen speaking prompt to the Goethe Kochi speaking table.
  - `ex18-6-16`: framed hotel-reception prompt as a future-travel role card inside the mock, preserving A1 canon.
  - `ex18-6-prod-speaking`: tied speaking production to Kuttan's final Goethe Kochi mock check.
  - `ex18-6-prod-writing`: tied free-text prompt to the Goethe Kochi mock desk.
  - `ex18-6-prod-dictation`: tied dictation prompt to Kuttan's final Goethe Kochi mock audio note.

## Before → after readiness
Initial audit this run: `GermanCourse_QC/20260520T152740Z_app-level-readiness-audit.md`
- Lessons: 91 → 91
- Average readiness: 86.9 → 86.9
- M18 average readiness: 92.4 → 92.7
- Exercises: 997 → 997
- Production exercises: 314 → 314
- Lessons below production floor: 0 → 0
- Lessons with no speaking: 0 → 0
- Lessons with no dictation: 0 → 0
- Generic exercise stems needing story tie-in: 371 → 370

Latest audit after fix: `GermanCourse_QC/20260520T153002Z_app-level-readiness-audit.md`

## Verification results
- Module loader: `for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done` passed for all 18 modules.
- App readiness audit: passed and wrote `GermanCourse_QC/20260520T153002Z_app-level-readiness-audit.md`.
- Lint: `npm run lint -- --max-warnings=0` still fails with pre-existing app-code lint debt, not content introduced by this pass.

Top current lint blockers observed:
1. `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect` for `setMounted(true)`.
2. `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect` for `setPhase('victory')`.
3. `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect` for `generateQuestions()`.
4. `src/app/games/greeting-time/page.tsx:362` and `:452` — `react-hooks/set-state-in-effect`.
5. `src/app/games/hor-und-los/page.tsx:135`, `:171`, `:201` — hook immutability/purity issues around callback order and `Date.now()`.

## Canon safety note
The updated prompts keep Kuttan and the learner physically in Kerala / Goethe Kochi mock context. Germany/hotel-reception usage is explicitly framed as a future-travel role card, not A1 physical relocation.

## Next recommended lane
Continue reducing generic stems in one weak audited module without changing answers. Recommended next target: `module-12.ts` (`12-1` or `12-2`), because M12 remains one of the lowest average-readiness modules and has multiple lessons with 8 generic stems.
