# Adipoli German QC Sprint — Module 11-4 Story-Tied Stem Fix

Generated: 2026-05-20T15:55:32Z

## Lane chosen

Production coverage did not regress, and lessons 18-7 / 17-6 / 18-6 already had recent recap/mock-review enrichment. I used the next safe lane: reduce generic exercise stems in one module without changing grammar targets, options, correct answers, or lesson structure.

## Files changed

- `src/lib/content/modules/module-11.ts`

## Safe improvement made

Lesson `11-4` — **Talking About Skills**

Rewrote 8 generic exercise question stems to be story-tied to the existing Kerala / Kuttan / Goethe Kochi professional-practice frame:

- `ex11-4-1`
- `ex11-4-2`
- `ex11-4-3`
- `ex11-4-4`
- `ex11-4-6`
- `ex11-4-7`
- `ex11-4-9`
- `ex11-4-10`

No answers, options, audio paths, grammar targets, vocabulary, or production counts were changed.

## Before → after

Initial audit in this sprint:

- Average readiness: `86.9 / 100`
- Generic exercise stems needing story tie-in: `370`
- Lessons below production floor: `0`
- No-speaking lessons: `0`
- No-dictation lessons: `0`

After fix:

- Average readiness: `87.0 / 100`
- Generic exercise stems needing story tie-in: `362`
- Lessons below production floor: `0`
- No-speaking lessons: `0`
- No-dictation lessons: `0`

Lesson `11-4` specifically:

- Generic stems: `8 → 0`
- Readiness score: `85 → 95`
- Exercises: `11`
- Production exercises: `3`

## Verification

Passed:

```bash
for i in $(seq 1 18); do npx tsx scripts/lib/module_loader.ts $i >/dev/null || exit 1; done
npm run audit:app-readiness
```

Results:

- Module loader: `18/18` pass
- Latest audit report: `GermanCourse_QC/20260520T155501Z_app-level-readiness-audit.md`
- App lessons: `91`
- Average readiness: `87.0 / 100`
- Production floor gaps: `0`

Lint:

```bash
npm run lint -- --max-warnings=0
```

Still fails with pre-existing app-wide lint issues unrelated to this content-only stem rewrite. Top current blockers include:

- `src/app/auth/signup/page.tsx` — `react-hooks/set-state-in-effect`
- `src/app/games/boss/[moduleId]/page.tsx` — `react-hooks/set-state-in-effect`
- `src/app/games/fill-the-gap/page.tsx` — `react-hooks/set-state-in-effect`
- `src/app/games/hor-und-los/page.tsx` — hook immutability / function access-before-declaration / `Date.now()` purity issues
- `src/lib/content/modules.ts`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts` — `@next/next/no-assign-module-variable`

## Canon check

The edit keeps A1 physically rooted in Kerala. German professional contexts are framed as Kerala practice / Goethe Kochi / future-use preparation. Kuttan is not placed physically in Germany.

## Next lane

Continue reducing generic stems, preferably one weak module per sprint:

1. `12-1` Hobbies — 8 generic stems
2. `12-2` Weather & Seasons — 8 generic stems
3. `14-4` Formal Letters & Emails — 8 generic stems

Keep the same safe pattern: rewrite only `question` stems; do not touch answer validity unless separately audited.
