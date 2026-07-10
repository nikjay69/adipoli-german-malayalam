# Sprint 2 gate — E2 Administered Checkpoints + C2 S5 (module-09/10) premium pass

Date: 2026-07-10 · Phase 3R (Quality Rescue, DECISIONS #13) · Mode: Implementation

## What shipped

### E2 — Checkpoints administer and score (no more self-report)
The module 2–8 checkpoints were self-ticked checklists with a **"Mark all passed"** button — the single worst break of the "closed checkpoints diagnose your weaknesses" promise. Now:
- Every `CheckpointItem` carries a `task` the runner presents and grades (`src/lib/spine-checkpoints.ts`):
  - **choice / type** tasks auto-score against verified answers (typed answers use the tolerant `answer-match` normalizer; dictation tasks play real audio, max 2 plays like the exam).
  - **production** tasks (say/write) force real output first — write tasks won't reveal the model until ≥10 characters are written — then show the model answer + audio + explicit criteria, and take an honest rubric verdict (≥3 passes, per EXAM_PREP_DESIGN).
  - **auto** tasks (module 8) read real mock results from the store — "completed a full timed mock ≥60/≥75" can no longer be self-claimed.
- The page (`src/app/course/[moduleId]/checkpoint/page.tsx`) is a one-task-at-a-time runner: intro (closed-book rule) → tasks with progress bar → scored result, auto-saved. Weakness tags now come **from actual misses**. "Mark all passed" is gone from the learner path (the `/preview` owner tool still seeds the store directly).
- ~40 tasks authored across checkpoints 2–7 using the existing checkpoint audio (7 files) + 13 new model/dictation audios queued for the Sprint 6 TTS batch.
- `audit-audio-links.ts` now validates checkpoint task audio too (241→251 audio refs covered).

### C2 — S5 content pass (10 lessons: module-09 ×5, module-10 ×5)
All 10 were FAIL at baseline. Now **10/10 PASS**:
- +10 scene-grounded speaking-repair exercises (gehen/fahren, zu/nach, Sie-imperative, modal bracket ×2, tut/tun plural, Mir ist kalt, will/möchte register, für/gegen, einen Krankenwagen under stress).
- 24 generic stems rewritten scene-grounded; dictation stems no longer print their answer sentence.
- Caps enforced by converting over-cap MC/fill-blank/ordering to typed/written production (answers preserved); 5 exercises deleted as redundant or groan-test failures; fixed a misnumbered id (`ex10-5-10` living inside lesson 9-5 → `ex9-5-10`).
- Praise-opener explanations cleaned throughout.

## Evidence
- `npm run qa` green: 12,836 checks, 0 failures; 251 audio + 14 image refs, 0 missing / 33 pending TTS.
- Spine audit: **21 PASS / 20 WEAK / 25 FAIL** (Sprint 1 end: 11/20/35; baseline: 1/20/45). genericStems 71 → 47; noRepair 21 → 15.
- 390px runner playthrough (`scripts/verify-sprint2.mjs` → `scripts/output/sprint2-verify/`): **9/9 assertions PASS** — intro shows closed-book rule, no "Mark all passed", full cp4 run administered, deliberately-failed required speaking item → **FAIL verdict at 78%** ("Recovery gate"), `sprechen:request_phrase` tag emitted from the actual miss, "Polite requests" recovery card with retest + library link rendered, result auto-saved to the store, zero console errors.

## Named weaknesses (honest list)
1. **Speaking rubric is still self-scored** (structured: model + criteria + 3-verdict buttons). True auto-scoring of speech waits for the simulator/check-speech wiring (Sprint 3/5). Writing tasks force real typed output but the 3-point check is also rubric self-scored.
2. **13 checkpoint model/dictation audios pending** the Sprint 6 TTS batch (tracked in `scripts/tts-queue.json`); until then those model buttons fall back to browser TTS — same documented debt window as Sprint 1.
3. cp8's Hören/Lesen auto-items check that a full timed mock EXISTS, not per-section ≥18/25 — `MockGateResult` stores only overall percent. Improving this needs per-section mock storage (candidate for Sprint 3's honest-scoring work).
4. The option shuffle is deterministic per item (stable across retakes) — retakes show the same order.
5. Human 1.5× boredom scan of modules 9/10 storyScenes not re-run this sprint (exercise layer only).

## Verdict
E2: PASS — the exam-success promise's core mechanism (diagnose → prescribe → retest) is now real. C2: PASS at the automated premium bar.
