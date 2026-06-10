# Adipoli German — QC/fix loop report

Generated: 2026-05-20T12:17:44Z

## Fix lane

Lane B: production floor was already clean, so I improved the next high-value Goethe exam lesson after 18-7: `17-6`.

## Changed files

- `src/lib/content/modules/module-17.ts`
  - Enriched lesson `17-6` video `richContent` with an append-only Goethe Kochi post-mock feedback routine.
  - The routine tells learners how to classify wrong answers by Hören/Lesen, replay/underline evidence, and state the next practice step in simple A1 German.

## Before readiness

Initial audit: `GermanCourse_QC/20260520T121529Z_app-level-readiness-audit.md`

- Lessons: 91
- Average readiness: 86.7 / 100
- Exercises: 997
- Production exercises: 313
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 373

## After readiness

Verification audit: `GermanCourse_QC/20260520T121645Z_app-level-readiness-audit.md`

- Lessons: 91
- Average readiness: 86.7 / 100
- Exercises: 997
- Production exercises: 313
- Below production floor: 0
- No speaking: 0
- No dictation: 0
- Generic stems: 373

No numerical audit movement was expected from this safe richContent enrichment; it improves exam-feedback quality inside an already-scored lesson chain.

## Verification

- Module loader: PASS — imported all 18 modules with `npx tsx scripts/lib/module_loader.ts $i` loop.
- App readiness audit: PASS — `npm run audit:app-readiness` completed and wrote `GermanCourse_QC/20260520T121645Z_app-level-readiness-audit.md`.
- Lint: FAIL, pre-existing app-code lint debt remains unrelated to this content edit.

Top current lint blockers from `npm run lint -- --max-warnings=0`:

1. `src/app/auth/signup/page.tsx:57` — `react-hooks/set-state-in-effect` for synchronous `setMounted(true)`.
2. `src/app/games/boss/[moduleId]/page.tsx:70` — `react-hooks/set-state-in-effect` for `setPhase('victory')`.
3. `src/app/games/fill-the-gap/page.tsx:502` — `react-hooks/set-state-in-effect` via `generateQuestions()`.
4. `src/app/games/hor-und-los/page.tsx:135` — `finishGame` accessed before declaration.
5. `src/app/games/hor-und-los/page.tsx:171` — `handleTimeout` accessed before declaration.

Overall lint summary reported: 260 problems, 109 errors, 151 warnings.

## Canon/soul check

The new content stays in the Goethe Kochi mock context, keeps Kuttan as a peer coach, uses simple A1 sentences, and does not place Kuttan physically in Germany.

## Next recommended lane

Continue Lane B with `18-6`: enrich the full Schreiben/Sprechen mock with clearer post-mock scoring feedback and oral self-check guidance, without changing existing correct answers.
