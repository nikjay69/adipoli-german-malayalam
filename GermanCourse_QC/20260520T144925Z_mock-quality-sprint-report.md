# Adipoli German — Mock quality sprint report

Generated: 2026-05-20T14:49:25Z
Workdir: `/shared/german-course`

## Context read
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `GermanCourse_QC/2026-05-20_production-floor-fix-report.md`
- `GermanCourse_QC/2026-05-20_exercise-ideas-and-app-improvements.md`

## Starting audit
Command: `npm run audit:app-readiness`

Report: `GermanCourse_QC/20260520T144659Z_app-level-readiness-audit.md`

Starting numbers:
- Lessons: 91
- Average readiness: 86.8 / 100
- Below production floor: 0
- No speaking lessons: 0
- No dictation lessons: 0
- Generic stems: 372

Production coverage had not regressed, and lesson `18-7` was already above the requested floor: 6 exercises, 5 production exercises, recap richContent present, final oral checklist present. I therefore used the next safe lane: improve mock-test quality for `17-6`.

## Safe improvement made
Changed file:
- `src/lib/content/modules/module-17.ts`

Lesson improved:
- `17-6` — `Übungstest — Hören & Lesen`

Edits:
1. Added an app-readable richContent table: `Goethe Kochi mock scorecard — Hören & Lesen`.
   - Gives pass-ready proof for Hören, Lesen, and exam strategy.
   - Keeps the setting in Goethe Kochi / Kerala mock-test canon.
   - Converts the mock from “take test” into “score → diagnose → drill next”.
2. Rewrote the `ex17-6-prod-dictation` question stem from generic text to a story-tied Goethe Kochi/Kuttan mock-review prompt.
   - Grammar target, answer, audio URL, and scoring remain unchanged.
   - Removed one generic-stem audit hit without broad rewriting.

## Before → after for lesson 17-6
- Exercises: 19 → 19
- Production exercises: 4 → 4
- Speaking: 1 → 1
- Free-text/type-answer: 2 → 2
- Dictation with audio: 1 → 1
- Generic stems: 1 → 0
- Readiness score: 93 → 95

## After audit
Command: `npm run audit:app-readiness`

Report: `GermanCourse_QC/20260520T144849Z_app-level-readiness-audit.md`

After numbers:
- Lessons: 91
- Average readiness: 86.9 / 100
- Below production floor: 0
- No speaking lessons: 0
- No dictation lessons: 0
- Generic stems: 371
- Module 17 average readiness: 91.0 → 91.3

## Verification
### Module import
Command:

```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done
```

Result: pass — all 18 modules import.

### App readiness audit
Command:

```bash
npm run audit:app-readiness
```

Result: pass — audit completed and wrote `GermanCourse_QC/20260520T144849Z_app-level-readiness-audit.md`.

### Lint
Command:

```bash
npm run lint -- --max-warnings=0
```

Result: fails with existing project-wide lint issues unrelated to this content edit.

Top current blockers surfaced:
- `src/app/auth/signup/page.tsx`: `react-hooks/set-state-in-effect` for synchronous state updates in `useEffect`.
- `src/app/games/boss/[moduleId]/page.tsx`: `react-hooks/set-state-in-effect`.
- `src/app/games/fill-the-gap/page.tsx`: `react-hooks/set-state-in-effect`.
- `src/app/games/greeting-time/page.tsx`: `react-hooks/set-state-in-effect`.
- `src/app/games/hor-und-los/page.tsx`: hook immutability / access-before-declaration / purity issues.
- `src/lib/content/modules.ts`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts`: `@next/next/no-assign-module-variable`.
- `src/components/lesson/NarrativeIntro.tsx`, `src/components/lesson/SceneConclusion.tsx`, `src/components/visual/SceneBackground.tsx`: `react-hooks/purity` due to `Math.random` during render.

No lint failure points at `src/lib/content/modules/module-17.ts` in the reported output.

## Canon check
The new content keeps A1 physically in Kerala:
- Uses `Goethe Kochi mock` framing.
- Uses Kuttan as companion/reviewer.
- Germany is not used as Kuttan’s physical location.

## Next lane
Next safest sprint lane: improve `18-6` mock-test quality in the same way — enrich the full four-skill mock with an app-readable scorecard/review table and story-tie the remaining generic dictation prompt, without changing answers/audio or broad-rewriting the lesson.
