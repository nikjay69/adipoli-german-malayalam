# Sprint 4 gate — E4 Mission Arc + C4 S7 (module-14/17) premium pass

Date: 2026-07-10 · Phase 3R (Quality Rescue, DECISIONS #13) · Mode: Implementation

## What shipped

### C4 — S7 content pass (10 lessons: module-14 ×4, module-17 ×6)
- **module-14** (Formal Life) got the full teaching-lesson treatment: 4 new speaking-repairs (street-first address order, einen Termin under stress, öffnen/eröffnen, Hiermit-inversion), 12 generic stems rewritten (Bürgeramt/Sparkasse/Ausländerbehörde scenes), caps enforced, 4 broken/redundant exercises deleted (multi-string orderings, cross-module duplicate MCs).
- **module-17** (Exam Skills) got the **exam-drill profile** (DECISIONS #14, codified in `LESSON_QUALITY_STANDARD.md` + audit): its 9–15-MC lessons deliberately mirror Goethe Hören/Lesen sections, so distribution caps are waived there — but every other premium requirement now holds: 6 new **exam-behavior speaking-repairs** (Noch einmal bitte, Wie bitte?, vierzehn/vierzig ear-drill, geöffnet/geschlossen, the skimmed 'nicht', the anti-panic 'Ich habe noch Zeit'), all flagged stems scene-grounded, dictations no longer reveal their answers.

### E4 — Mission arc (first 90 seconds)
- `greet-frau-weber` — the cold-start first mission the whole LEARNER_JOURNEY promise hangs on — extended from a single tap-to-repair step into the full **hear → say aloud → repair → win** arc using the existing `HearStep`/`ReplyAloudStep` components: Frau Weber's greeting audio must finish before the learner may continue; the model line stays hidden until its audio ends (the `immersive-model-line` QA contract holds); the repair + inline win + mini-check close the arc.
- StoryScene coverage audit: **all 66 spine lessons already carry a storyScene** — the immersive player branch is universal; no legacy-quiz fallback on the spine.

## Evidence
- `npm run qa` green: 12,741 checks; 270 audio + 14 image + 0 video refs, 0 missing / 52 pending TTS.
- Spine audit: **40 PASS / 20 WEAK / 6 FAIL** (Sprint 3 end: 30/20/16). **genericStems 22 → 0 — zero generic stems remain course-wide.** noRepair 8 → 4 (all in module-18, Sprint 5 scope).
- Mission arc runtime verification at 390px: step 0 HearStep audio-gated ✓, step 1 ReplyAloudStep with hidden model line ✓, step 2 repair+win ✓, zero page errors. Screenshot: `scripts/output/sprint4-verify-mission-step0.png`.

## Named weaknesses (honest list)
1. **Only the first mission got the full arc this sprint.** The other M1 missions (please-thanks, polite-exit, first-mini-conversation) and M2 missions remain shorter than the vision's ideal; they already use scene/repair components but deserve the same hear→say→repair extension — logged as E4 follow-up for Sprint 5/6 slack.
2. Speaking in missions remains honor-system (say aloud, then tap) — Web Speech verification is E5/simulator territory.
3. The 6 remaining audit FAILs are all module-18 (Sprint 5 C5 scope).
4. 52 pending TTS files (Sprint 6 batch) — the browser-TTS fallback window persists, unchanged.

## Verdict
C4: PASS (S7 10/10 at the premium bar under the codified exam-drill profile). E4: PASS for the critical first-mission arc + coverage audit; remaining mission extensions explicitly carried forward.
