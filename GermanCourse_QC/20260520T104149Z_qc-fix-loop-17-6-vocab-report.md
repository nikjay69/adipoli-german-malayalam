# Adipoli German — QC/fix loop report

Generated: 2026-05-20T10:41:49Z

## Docs read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane B: no production-floor gaps remained, so I improved the current weakest exam lesson after 18-7: `17-6 Übungstest — Hören & Lesen`.

Rationale from baseline audit:
- `belowProductionFloor=0`
- `noSpeaking=0`
- `noDictation=0`
- Weakest lessons included `17-6` and `18-6`, both score 81 with `no lesson vocabulary array` and missing videoUrl wiring.

## Changed files
- `src/lib/content/modules/module-17.ts`
  - Reframed lesson `17-6` setting from generic `Goethe-Institut Prüfungsraum` to `Goethe Kochi Mock Prüfungsraum`, keeping the A1 narrative physically in Kerala.
  - Added a real lesson vocabulary array for `17-6` with six exam-relevant A1 items:
    - `die Prüfung`
    - `bestehen`
    - `die Aufgabe`
    - `mindestens`
    - `die Durchsage`
    - `das Gespräch`
  - Rewired `17-6` `vocabEncounters` to those local `vocab17-6-*` items.

No files deleted. No cron jobs scheduled.

## Before → after readiness numbers
Baseline audit: `GermanCourse_QC/20260520T103931Z_app-level-readiness-audit.md`
- Lessons: 91
- Average readiness: 86.5 / 100
- Exercises: 997
- Production exercises: 313
- Vocab items: 784
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 373
- Weakest list included `17-6 Übungstest — Hören & Lesen — score 81; issues: videos not wired to videoUrl; no lesson vocabulary array`

After audit: `GermanCourse_QC/20260520T104114Z_app-level-readiness-audit.md`
- Lessons: 91
- Average readiness: 86.6 / 100
- Exercises: 997
- Production exercises: 313
- Vocab items: 790
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 373
- `17-6` dropped out of the weakest lesson list; next weakest exam lesson is now `18-6`.

## Verification results
- Module import verification: PASS — all 18 modules loaded via `npx tsx scripts/lib/module_loader.ts $i`.
- App readiness audit: PASS — wrote `GermanCourse_QC/20260520T104114Z_app-level-readiness-audit.md`.
- Lint: FAIL, pre-existing app-code lint debt remains. The current run did not introduce content-module lint blockers.

Top current lint blockers seen:
1. `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect` from synchronous `setMounted(true)` in an effect.
2. `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect` from `setPhase('victory')` in an effect.
3. `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect` from `generateQuestions()` in an effect.
4. `src/app/games/hor-und-los/page.tsx:135` and `:171` — React compiler immutability errors: callbacks accessed before declaration.
5. `src/lib/content/modules.ts:48`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts:137` — `@next/next/no-assign-module-variable`.

## Next recommended lane
Improve `18-6 Kompletter Übungstest — Alle 4 Teile` next: add a local exam vocabulary array and wire its `vocabEncounters`, with the same Kerala/mock framing discipline. VideoUrl wiring should stay separate unless real video assets exist.