# Adipoli German — Mock-test quality sprint

Generated: 2026-05-20T16:27:49Z
Workdir: `/shared/german-course`

## Brief read first
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Starting audit
Command:

```bash
npm run audit:app-readiness
```

Starting report: `GermanCourse_QC/20260520T162627Z_app-level-readiness-audit.md`

Starting numbers:
- Lessons: 91
- Average app-readiness: 87.2 / 100
- Exercises: 997
- Production exercises: 314
- Lessons below production floor: 0
- Lessons with no speaking exercise: 0
- Lessons with no dictation/listening-production exercise: 0
- Generic exercise stems needing story tie-in: 354

Interpretation: production coverage did not regress, and 18-7 already had the requested recap video/richContent, 6 exercises, and final oral checklist. I moved to the next safe lane: 18-6 mock-test quality.

## Safe improvement made
Changed file:
- `src/lib/content/modules/module-18.ts`

Lesson improved:
- `18-6` — `Kompletter Übungstest — Alle 4 Teile`

Patch type:
- Append/enrich only inside existing video `richContent`.
- No lesson rewrite.
- No deleted files.
- No cron jobs.

Added app-readable mock-test review content:
1. `Kuttan's score feedback bands — what to do after the mock`
   - 80–100: exam-ready if timing was honest.
   - 60–79: pass zone, repeat weakest section.
   - Below 60: diagnostic, do rescue drills.
   - Panic despite score: run a timed mini-mock.
2. `Canon-safe exam simulation frame`
   - Explicitly says the full mock happens at Goethe Kochi in Kerala.
   - German train/apartment/hotel/office examples are exam materials or future-life rehearsal cards.
   - Kuttan is not physically in Germany during A1.

## Before → after numbers
The app-readiness audit does not currently score richContent depth beyond presence, so totals stayed stable:

- Average app-readiness: 87.2 → 87.2
- Exercises: 997 → 997
- Production exercises: 314 → 314
- Lessons below production floor: 0 → 0
- No-speaking lessons: 0 → 0
- No-dictation lessons: 0 → 0
- Generic stems: 354 → 354

Quality gain: 18-6 now gives learners an explicit post-mock score interpretation and next-step feedback loop instead of only a completion checklist.

## Verification
Commands run:

```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done
npm run audit:app-readiness
npm run lint -- --max-warnings=0
```

Results:
- Module loader: 18/18 modules imported successfully.
- Audit report written: `GermanCourse_QC/20260520T162732Z_app-level-readiness-audit.md`
- Audit result: `Lessons=91 avgReadiness=87.2 belowProductionFloor=0 noSpeaking=0 noDictation=0`
- Lint: still fails with pre-existing app-wide issues, not from this content edit.

Top current lint blockers observed:
- `src/app/auth/signup/page.tsx`: `react-hooks/set-state-in-effect`
- `src/app/games/boss/[moduleId]/page.tsx`: `react-hooks/set-state-in-effect`
- `src/app/games/fill-the-gap/page.tsx`: `react-hooks/set-state-in-effect`
- `src/app/games/greeting-time/page.tsx`: `react-hooks/set-state-in-effect`
- `src/app/games/hor-und-los/page.tsx`: hook/immutability/purity issues, including functions accessed before declaration and `Date.now()` purity warning
- `src/lib/content/modules.ts`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts`: `@next/next/no-assign-module-variable`
- `src/remotion/LessonGuideVideo.tsx`: immutability issue from reassigning `cursor`

## Next lane
Reduce generic exercise stems in one weak module, starting with one of the audit's weakest score-83 lessons. Best next target: `14-2 At the Office` or `12-4 Invitations`, because both have 7 generic stems and can be safely story-tied without changing answers.
