# Adipoli German — Production floor fix report

Generated: 2026-05-20

## What was implemented

Implemented the app-level production-floor fix across the full online course.

Scope:
- 18 modules
- 91 app lessons
- Exercise layer inside the actual online module source files
- Audio-backed dictation where missing

## Files added

- `scripts/audit-app-readiness.ts`
  - App-level readiness audit: story → video/richContent → vocab → exercises → production → review/exam readiness.
- `scripts/fix-production-floor.py`
  - Safe text-preserving patcher that appends production exercises without rewriting whole module files.
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`
  - Exercise ideas and app-improvement backlog.

## Content changes

Added 103 production exercises across modules 01–18.

Each weak lesson received the missing pieces required by the production floor:
- speaking task
- free-text/writing task when missing
- dictation/listening-production task when missing
- extra free-text production task when total production count was still below 3

The new prompts are intentionally conservative:
- A1-safe
- short sentences
- tied to Kuttan / Kerala / Goethe prep framing
- no Kuttan physically in Germany during the A1 course narrative

## Audio generated

Generated MP3 files for newly added dictation tasks under:

- `public/audio/hoeren/module-01/`
- `public/audio/hoeren/module-02/`
- `public/audio/hoeren/module-03/`
- `public/audio/hoeren/module-04/`
- `public/audio/hoeren/module-05/`
- `public/audio/hoeren/module-06/`
- `public/audio/hoeren/module-07/`
- `public/audio/hoeren/module-08/`
- `public/audio/hoeren/module-09/`
- `public/audio/hoeren/module-10/`
- `public/audio/hoeren/module-11/`
- `public/audio/hoeren/module-12/`
- `public/audio/hoeren/module-13/`
- `public/audio/hoeren/module-14/`
- `public/audio/hoeren/module-15/`
- `public/audio/hoeren/module-16/`
- `public/audio/hoeren/module-17/`
- `public/audio/hoeren/module-18/`

## Verification

Command:

```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null; done
npm run audit:app-readiness
```

Result:

- Module loaders: 18/18 pass
- Lessons: 91
- Average app-readiness: 86.2 / 100
- Lessons below production floor: 0
- Lessons with no speaking exercise: 0
- Lessons with no free-text/writing exercise: 0
- Lessons with no dictation/listening-production exercise: 0

Latest audit report:

- `GermanCourse_QC/20260520T090334Z_app-level-readiness-audit.md`

## Before → after

- Exercises: 890 → 993
- Production exercises: 208 → 311
- Lessons below production floor: 61 → 0
- No-speaking lessons: 84 → 0
- No-dictation lessons: 13 → 0
- Average readiness: 72.6 → 86.2

## Remaining improvement lanes

The production floor is fixed. Remaining work is quality/app polish:

1. Weakest lesson `18-7`
   - Add a short recap video/richContent block.
   - Increase total exercise count to at least 6.
   - Add final oral A1 confidence checklist.

2. Mock tests `17-6` and `18-6`
   - Add vocabulary/review arrays or explicitly mark as exam simulations.
   - Add richer exam feedback.
   - Decide whether no-video exam simulation is intentional or wire placeholder videoUrl.

3. Generic stems
   - 360 generic stems remain.
   - These should be story-tied gradually after production coverage.

4. App UX
   - Speaking record/replay.
   - Dictation replay/slow replay.
   - Free-text tolerant matching.
   - Goethe skill dashboard.
   - Dev content-health page.

## Lint note

`npm run lint -- --max-warnings=0` still fails with pre-existing project-wide lint errors unrelated to this production-floor content pass:
- 260 total lint problems
- 109 errors
- 151 warnings

Examples include:
- `src/lib/study-plan.ts` assigning to variable named `module`
- React hook/state lint in `src/lib/visual/useSceneImage.ts`
- Remotion immutability issue in `src/remotion/LessonGuideVideo.tsx`

These should be handled as a separate app-code lint pass, not mixed with the course-content production-floor pass.
