# Sprint 5 gate — E5 Exam Layer (Speaking Simulator v1) + C5 S8 (module-18) premium pass + Kerala-canon fixes

Date: 2026-07-11 · Phase 3R (Quality Rescue, DECISIONS #13) · Mode: Implementation

## What shipped

### C5 — S8 content pass (module-18 ×7 lessons) + canon fixes
- **module-18** (Final Exam Prep) closed the last repair gap: 7 new **exam-behavior speaking-repairs** (Straße spelling under dictation stress, Viele Grüße as one chunk, the age line without finger-counting, weekend answers in sentence form, the polite Formular request, raising a question without panic, the "Ich kann Deutsch!" closer). Runs under the exam-drill profile (DECISIONS #14) — caps waived for Goethe-format MC chains, every other premium rule enforced.
- **Course-wide audit: 47 PASS / 19 WEAK / 0 FAIL** (Sprint 4 end: 40/20/6). noRepair 4 → **0** — every spine lesson now has a Malayali mistake-repair. genericStems stays 0, emptyExplanations 0.
- **Kerala-canon fixes**: 13 Germany-set storyScenes across modules 04–08 (WG, Bäckerei, Lidl/Aldi, Edeka/Rewe, H&M, Gasthaus, home-office) reframed as **Frau Weber's visualization drill at Goethe Kochi** — name prefixed "Imagined: ", description opens with the eyes-closed rehearsal frame. A1 stays physically in Kerala (A1_STORY_BIBLE canon); Germany appears only as imagined rehearsal.

### E5 — Exam layer
- **Speaking Simulator v1** at `/practice/simulator` (+ EXAM card at the top of the practice hub): all 3 Sprechen Teile, card by card — 8 test sets × 12 cards (Teil 1 Stichwort → Teil 2 ask-and-answer word cards → Teil 3 polite requests). Prompt appears → learner answers ALOUD → native-audio model answer (reuses the existing 128 `public/audio/sprechen/` files — **zero new TTS spend**) → honest 3-way verdict where "Couldn't say it" fails the run. Runs persist to `adipoli-simulator-runs` (`src/lib/simulator-runs.ts`).
- **cp8 readiness wired to real runs**: `cp8-s-mock2` ("simulator done a second time on a different day") converted from a rubric self-score into a **derived auto task** (`simulator-2-days`: ≥2 runs on ≥2 distinct calendar days, read from saved runs, no self-report). The checkpoint runner's "not on record" hint is now source-aware (points to the simulator, not the mock tests page).
- Readiness consolidation itself shipped in Sprint 1 (checkpoint-derived skill bars on `/profile`); no second readiness source has crept back in.

### Game-player pedagogy pass (lesson-feel consistency, E4 carry-over)
- `buildGameSequence` is now **deterministic and authored-order-preserving**: the random Kuttan filler lines and `Math.random()` moment shuffling are gone; exercise order and exercise types survive the sequence builder (production exercises are never downgraded); lesson video material becomes an app-native **teach** moment while video stays deferred.
- Locked by a new invariant test `tests/player-sequence.test.ts`, wired into `npm run qa` as `test:player` (deterministic · authored order · teaching-complete · no filler reactions · production-safe).

## Evidence
- `npm run qa` green: 12,769 checks passed / 0 failed; 0 lint errors (19 warnings, cap 200); 59 pending TTS refs (52 + 7 module-18), 0 missing.
- Spine audit (`scripts/output/spine-premium-audit.json`): **47/19/0**. The 19 WEAK are the M3/M4/M5/M8 cap-deviations explicitly accepted at the June Phase 2 gate — unchanged, documented, not silently redefined.
- Runtime verification at 390px (`scripts/verify-sprint5.mjs`, headless DOM assertions — framer-motion won't raster in screenshots here): **14/14 PASS** — practice-hub card · simulator intro/8-set selector · full 12-card clean run → result + persisted run (passed:true) · second run with a missed verdict → honest fail headline + passed:false · canon-framed scene renders in the game player (`/play/4/4-3` → "IMAGINED: WG HALLWAY & STORAGE AREA") · cp8 simulator auto-item reads "On record." from two seeded run-days while the four mock-derived autos stay "Not on record yet." → checkpoint ends as an honest 45% FAIL gate with recovery cards · zero page errors, zero non-audio 4xx/5xx.

## Named weaknesses (honest list)
1. **The 7-day exam plan generator (E5's third item) is not built.** `scoreSpineCheckpoint` already emits the "final 7-day plan" next-action string on a cp8 PASS, but there is no generator that turns weakest-tags into a day-by-day plan — carried explicitly to Sprint 6 slack / post-rescue.
2. Simulator verdicts are honest structured self-scores, not AI speech evaluation — same status as checkpoint production rubrics. Web-Speech/AI scoring stays out until a human runs the recorded-mock path end to end.
3. Remaining M1/M2 mission-arc extensions (please-thanks, polite-exit, first-mini-conversation, M2 set) still carried from Sprint 4.
4. 59 pending TTS files — lesson speaking-model lines still fall back to browser TTS until the Sprint 6 batch (owner go-ahead + re-provisioned Google Cloud creds required). Simulator model audio is unaffected (pre-rendered files already exist).
5. Human 1.5× boredom scan of the rewritten modules still outstanding (machine groan-test only).

## Verdict
C5: PASS — S8 at the premium bar; **0 FAIL course-wide, mistake-repair coverage 100%**, canon violations closed. E5: PASS for Speaking Simulator v1 + honest cp8 wiring; the 7-day plan generator is named, not hidden, and carried forward.
