# Sprint 3 gate — E3 Honest Exam Scoring + dead-video fix + C3 S6 (module-11/12) premium pass

Date: 2026-07-10 · Phase 3R (Quality Rescue, DECISIONS #13) · Mode: Implementation

## What shipped

### E3 — Honest mock scoring (`src/app/tests/[testId]/page.tsx`)
- **Sprechen** no longer scores "did you press record". Real `/api/check-speech` scores (0–100) are stored per item and drive the section score. Recorded-but-unevaluated items (mic denied / €0 AI budget) earn capped **60% credit** — never full marks unscored.
- **Schreiben Teil 1** is scored field-by-field against the test's verified answers (`fields[].answer`) with the tolerant `answer-match` normalizer — a filled form with wrong data now scores 0, like the real exam. The results panel shows the real `x/5`.
- **Schreiben Teil 2** without AI: content heuristic (Goethe length range 20–60 words + greeting/closing frame present → max 7/10; missing frame caps at 5) — never full marks unscored.

### Dead-video fix
- All 24 `videoUrl: "/videos/generated/*.mp4"` refs (modules 01, 02, 17, 18) pointed at files that don't exist (video deferred, DECISIONS #13). They are commented out with a re-enable marker; the player now shows its graceful no-video state instead of a broken `<video>`.
- `audit-audio-links.ts` now validates `videoUrl` refs too — dead media can never ship silently again.

### C3 — S6 content pass (9 lessons: module-11 ×5, module-12 ×4)
All 9 were FAIL at baseline; the audit's original "worst AI-slop" examples (12-2 Weather: "How do you say 'It's raining'?", bare season-matching flashcards) lived here. Now **9/9 PASS**:
- +9 scene-grounded speaking-repairs (Ich bin ~~ein~~ Student, um/in clock times, Liebe/Sehr geehrte register, reflexive mich, will/möchte interview register, verb-ending -e, time-first inversion, dropped zu, and the immortal 'weil ich bin krank').
- All 22 flagged generic stems rewritten scene-grounded (mock interviews with Frau Weber, the Hamburg cousin's weather calls, Stammtisch CV prep, party invitations); the banned bare-matching seasons flashcard is gone.
- Caps enforced via typed/written production conversions; 6 exercises deleted as redundant/broken (multi-sentence orderings that rendered as giant letter-scrambles, duplicate-teaching MCs); fixed a duplicate-option data bug in ex11-2-6.
- Praise openers cleaned throughout.

## Evidence
- `npm run qa` green: 12,762 checks, 0 failures; 260 audio + 14 image + 0 video refs, 0 missing / 42 pending TTS.
- Spine audit: **30 PASS / 20 WEAK / 16 FAIL** (Sprint 2 end: 21/20/25; baseline 1/20/45). genericStems 47 → 22; noRepair 15 → 8.
- Runtime smoke at 390px: tests hub loads, test player loads, `/play/1/1-1` triggers **zero** `/videos/generated` requests, no page errors.

## Named weaknesses (honest list)
1. The Sprechen/Schreiben scoring rewrite is verified by typecheck + code review + smoke; a full recorded-mock playthrough (mic + AI path) needs a human run — scheduled into the Sprint 6 cold-start gate.
2. The Teil 2 no-AI heuristic checks frame + length, not the 3 Inhaltspunkte (needs prompt-specific keywords or AI) — capped at 7/10 to stay honest.
3. Remaining FAIL lessons are all S7/S8 (module-14/17/18) — Sprint 4/5 scope, including the MC-chain exam modules.
4. 42 audio files pending the Sprint 6 TTS batch (browser-TTS fallback window still open — unchanged documented debt).

## Verdict
E3: PASS (honest scoring shipped; full human mock-run pending Sprint 6 gate). C3: PASS at the automated premium bar.
