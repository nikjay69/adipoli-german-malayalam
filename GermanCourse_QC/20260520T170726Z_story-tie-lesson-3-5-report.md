# Adipoli German — QC/fix loop report

Generated: 2026-05-20T17:07:26Z

## Fix lane

Lane C / weakest-lesson story tie-in after production floor was already clear.

The audit showed no production-floor gaps:
- lessons below production floor: 0
- no-speaking lessons: 0
- no-dictation lessons: 0

So I made one small, safe content-quality pass on the first currently listed weak lesson from the audit: `3-5 Dates & Birthdays`.

## Changed files

- `src/lib/content/modules/module-03.ts`

## Exact fix

Retrofitted five generic recognition stems in lesson `3-5` into Kerala/Goethe/Kuttan/Frau Weber story-tied prompts without changing answers, options, exercise types, scoring, or grammar target.

Changed exercise question stems:
- `ex3-5-1`
- `ex3-5-2`
- `ex3-5-3`
- `ex3-5-4`
- `ex3-5-5`

Examples:
- Before: `Complete: Ich _____ am fünften März Geburtstag. (I have...)`
- After: `At Goethe Kochi, Kuttan fills in his birthday sentence for Frau Weber: Ich _____ am fünften März Geburtstag. (I have...)`

This preserves the course soul: Kerala-rooted, Goethe Kochi classroom framing, Kuttan as peer companion, no physical Germany drift.

## Before → after readiness numbers

Before audit: `GermanCourse_QC/20260520T170531Z_app-level-readiness-audit.md`
- Average app-readiness: 87.2 / 100
- Generic exercise stems: 354
- M03 average readiness: 87.7
- Lesson `3-5` appeared in weakest list: score 83; generic stems (5)

After audit: `GermanCourse_QC/20260520T170654Z_app-level-readiness-audit.md`
- Average app-readiness: 87.3 / 100
- Generic exercise stems: 350
- M03 average readiness: 89.3
- Lesson `3-5` no longer appears in the top-20 weakest lesson list

Note: generic stems dropped by 4 rather than 5 because one rewritten stem still begins with a generic-looking audit token but is now story-anchored enough pedagogically. I left it because the actual learner prompt is better and answers were untouched.

## Verification

Passed:
- Imported all 18 modules with `npx tsx scripts/lib/module_loader.ts $i`
- Ran `npm run audit:app-readiness`
  - Result: `Lessons=91 avgReadiness=87.3 belowProductionFloor=0 noSpeaking=0 noDictation=0`

Lint:
- Ran `npm run lint -- --max-warnings=0`
- Still fails with pre-existing app/code lint debt, not from this content edit.
- Top current blockers:
  - `src/app/auth/signup/page.tsx`: `react-hooks/set-state-in-effect`
  - `src/app/games/boss/[moduleId]/page.tsx`: `react-hooks/set-state-in-effect`
  - `src/app/games/fill-the-gap/page.tsx`: `react-hooks/set-state-in-effect`
  - `src/app/games/hor-und-los/page.tsx`: hook immutability / variable-before-declaration errors
  - `src/lib/content/modules.ts`, `src/lib/curriculum.ts`, `src/lib/study-plan.ts`: `@next/next/no-assign-module-variable`

## Next recommended lane

Continue lane C: reduce generic stems in the next current weak lesson from the audit, starting with `4-2 Describing People`, again by changing only question stems and preserving correct answers/options.
