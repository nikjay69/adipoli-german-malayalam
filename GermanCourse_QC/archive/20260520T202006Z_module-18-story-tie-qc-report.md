# Adipoli German QC/Fix Loop — Module 18 Story-Tie Pass

Generated: 2026-05-20T20:20:06Z

## Source docs read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Fix lane
Lane C from this run's priority order: reduce generic exercise stems in one module by story-tying prompts without changing correct answers.

Reason: the initial audit showed the production floor is already clear:
- Lessons below production floor: 0
- Lessons with no speaking exercise: 0
- Lessons with no dictation/listening-production exercise: 0

Lessons 18-7, 17-6, and 18-6 already had prior safe enrichment, so I moved to the next safe lane and cleaned Module 18 generic stems.

## Changed files
- `src/lib/content/modules/module-18.ts`

## Exact changes
Story-tied 7 generic Module 18 prompts while preserving answers/options/audio paths:
- `ex18-1-prod-dictation`: anchored the dictation in the Goethe Kochi writing desk + Kuttan help-sentence frame.
- `ex18-2-11`: anchored the message-opening dictation in a Goethe Kochi writing mock replay.
- `ex18-3-13`: anchored the self-introduction dictation in Frau Weber's speaking warm-up.
- `ex18-3-14`: changed a bare translation stem into a Goethe Kochi Herkunft prompt.
- `ex18-4-11`: framed the supermarket question as a future-life rehearsal card at Goethe Kochi.
- `ex18-4-13`: anchored the repeat-please dictation at the Goethe Kochi speaking table.
- `ex18-4-14`: anchored the profession question in Frau Weber/Kuttan exam small talk.

No correct answers were changed. No files were deleted. Kuttan remains in Kerala/A1-safe mock/future-rehearsal framing.

## Before → after readiness numbers
Before (`GermanCourse_QC/20260520T201808Z_app-level-readiness-audit.md`):
- Average readiness: 87.5 / 100
- M18 average readiness: 93.4
- Generic exercise stems: 345
- Below production floor: 0
- No speaking: 0
- No dictation: 0

After (`GermanCourse_QC/20260520T201949Z_app-level-readiness-audit.md`):
- Average readiness: 87.7 / 100
- M18 average readiness: 95.7
- Generic exercise stems: 338
- Below production floor: 0
- No speaking: 0
- No dictation: 0

## Verification results
- Module import check: PASS — all 18 modules loaded via `npx tsx scripts/lib/module_loader.ts $i`.
- App readiness audit: PASS — `Lessons=91 avgReadiness=87.7 belowProductionFloor=0 noSpeaking=0 noDictation=0`.
- Lint: FAIL, pre-existing app-wide lint debt, not introduced by this content-only Module 18 prompt edit.

Top current lint blockers seen:
- `src/app/auth/signup/page.tsx`: `react-hooks/set-state-in-effect` for synchronous `setMounted(true)` in an effect.
- `src/app/games/boss/[moduleId]/page.tsx`: `react-hooks/set-state-in-effect` for `setPhase('victory')` in an effect.
- `src/app/games/fill-the-gap/page.tsx`: `react-hooks/set-state-in-effect` around `generateQuestions()`.
- `src/app/games/hor-und-los/page.tsx`: hook immutability/access-before-declaration around `finishGame` and `handleTimeout`, plus `Date.now()` purity issue.
- `src/lib/content/modules.ts`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts`: Next lint `no-assign-module-variable`.

## Next recommended lane
Continue Lane C in one of the weakest modules from the latest audit. Best next target: Module 14, because all four lessons are still score 83 and generic stems remain high:
- `14-1` generic stems: 5
- `14-2` generic stems: 7
- `14-3` generic stems: 5
- `14-4` generic stems: 8

Keep the same safe pattern: edit only `question` stems, preserve correct answers/options, and frame formal-life exercises as Goethe Kochi/mock/future-rehearsal material rather than placing Kuttan physically in Germany.
