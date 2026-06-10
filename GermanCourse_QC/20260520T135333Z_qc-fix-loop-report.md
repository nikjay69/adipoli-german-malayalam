# Adipoli German — QC/fix loop report

Generated: 2026-05-20T13:53:33Z

## Files read first
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B: no production-floor gaps remained, so I improved a current weakest audited lesson unit.

Target: `1-6 Formal vs Informal`.

Why: initial audit listed `1-6` as a weakest online lesson unit with score 83, missing richContent on videos, and 5 generic exercise stems.

## Changed files
- `src/lib/content/modules/module-01.ts`
  - Added `richContent` to video `v1-6-1`.
  - Content added: a Goethe Kochi mock-interview table for `Sie` vs `du`, plus a Kerala/Manglish bridge note comparing `Sie` to respectful `ningal` mode.
  - Preserved canon: lesson stays physically in Goethe Kochi/Kerala; Germany is only future/official-context preparation.

## Before → after readiness
Before audit: `GermanCourse_QC/20260520T135145Z_app-level-readiness-audit.md`
- Lessons: 91
- Average readiness: 86.8 / 100
- M01 average readiness: 89.7
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 372
- Weakest list included `1-6 Formal vs Informal — score 83; issues: no richContent on videos; generic exercise stems (5)`

After audit: `GermanCourse_QC/20260520T135310Z_app-level-readiness-audit.md`
- Lessons: 91
- Average readiness: 86.8 / 100
- M01 average readiness: 90.8
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 372
- `1-6` no longer appears in the weakest lesson list.

## Verification
- Module import verification: 18/18 modules loaded with `npx tsx scripts/lib/module_loader.ts`.
- App readiness audit: passed and wrote `GermanCourse_QC/20260520T135310Z_app-level-readiness-audit.md`.
- Lint: still fails with pre-existing app-wide lint issues unrelated to this content edit.

Top current lint blockers shown in this run:
1. `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect` for `setMounted(true)`.
2. `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect` for `setPhase('victory')`.
3. `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect` for `generateQuestions()`.
4. `src/app/games/greeting-time/page.tsx:362` and `:452` — `react-hooks/set-state-in-effect`.
5. `src/app/games/hor-und-los/page.tsx:135`, `:171`, `:201` — hook immutability/purity issues.
6. `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts:11`, `:31`, `:44`, `src/lib/study-plan.ts:137` — `no-assign-module-variable`.

Lint total: 260 problems, 109 errors, 151 warnings.

## Next recommended lane
Continue Lane B on the next current weakest audit lesson: `3-5 Dates & Birthdays` — add small story-tied richContent or wire safe video metadata if existing generated video assets are verified. If not touching media, reduce generic stems by story-tying prompts without changing answers.
