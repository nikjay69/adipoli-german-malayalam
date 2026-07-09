# Sprint 1 gate — E1 One Home + C1 S4 (module-06/07) premium pass

Date: 2026-07-10 · Phase 3R (Quality Rescue, DECISIONS #13) · Mode: Implementation

## What shipped

### E1 — One home
- `/` is now a pure router: cold visitor → `/intro` (promise screen), everyone else → `/learn` (Today). The legacy study-plan dashboard is parked in `src/app/_legacy-dashboard-home.tsx` (not routed).
- Onboarding and intro route to `/learn`, never to the old dashboard (`onboarding/page.tsx`, `intro/page.tsx`).
- Daily-streak accounting moved to the Today screen (`learn/page.tsx` → `updateStreak()` on mount) so it survives the dashboard's retirement.
- **One readiness source**: `/profile`'s count-based `calculateExamReadiness` card (lessons/vocab/games/streak %) replaced with the same checkpoint-derived `getSkillReadiness` bars the Today screen uses. The two disagreeing "A1 ready" numbers are gone.

### C1 — S4 content pass (10 lessons: module-06 ×5, module-07 ×5)
All 10 lessons were FAIL at baseline (speaking 1/2, no repair, 31 generic stems, caps blown). Now **10/10 PASS** the tightened audit:
- +10 scene-grounded speaking exercises, one per lesson, each a **Malayali mistake-repair** (verb-2 'gern' slip, ein/einen accusative, kein/nicht, Menü/Speisekarte false friend, W-question word order, price-reading 'Komma', adjective -es ending, du/Sie formality, wie/als comparative, keinen Hunger).
- All 31 generic stems rewritten scene-grounded (canteen chechi, Frau Weber rehearsals, Amma, video-call cousin, Saturday market); dictation stems no longer reveal their answer sentence.
- Distribution caps enforced by converting over-cap MC/fill-blank items to typed production (verified answers unchanged) — 3 exercises deleted outright as groan-test failures (6-3-4 and 7-4-4: multi-phrase ordering that rendered as a giant letter-scramble; 7-2-1: recognition of a phrase the learner produces twice in the same lesson).
- Canned praise openers removed from every touched explanation.

### Harness
- `audit-spine-premium.ts`: speaking <2 is now FAIL (was WEAK) — matches the written standard.
- `audit-audio-links.ts` + `scripts/tts-queue.json`: the 10 new speaking-model files are tracked as **PENDING** (Sprint 6 TTS batch), still 0 missing; anything unqueued still fails qa.

## Evidence
- `npm run qa` green: 12,903 content checks, lint 0 errors, typecheck clean, 220 audio + 14 image refs, 0 missing / 10 pending.
- Spine audit: **11 PASS / 20 WEAK / 35 FAIL** (was 1/20/45); genericStems 102 → 71; noRepair 30 → 21.
- 390px playthrough (`scripts/verify-sprint1.mjs` → `scripts/output/sprint1-verify/`): **9/9 DOM assertions PASS** — cold `/`→`/intro`, returning `/`→`/learn`, one hero CTA, 4 skill bars, profile readiness skill-based, old breakdown gone, lesson 6-1 loads in the immersive player, zero console/page errors.

## Named weaknesses (honest list)
1. **10 speaking-model audios are pending** until the Sprint 6 TTS batch; until then the player's TTS fallback voices those model lines — a temporary violation of the pre-rendered-audio law, documented here deliberately (DECISIONS #13 accepted this window).
2. **M6/M7 storyScenes are Germany-set** ("Bäckerei Schmidt", imagined Berlin restaurant) without consistent imagined-scenario framing — same canon-borderline issue as the flagged 4-x/5-x/8-x scenes. Some stems now add "imagined" framing, but the scene descriptions themselves are C5 scope; **C5's canon list must extend to M6/M7 scenes**.
3. Boredom scan was done on the exercise layer only (stems read-aloud test); the storyScene/video layers of M6/M7 were not re-scanned this sprint.
4. `ex7-1-3` matching has identical option/answer strings ("die Milch → milk" on both sides) — functional in BubblePop but data-odd; left as-is (verified answers untouched), flag for C-pass cleanup if touched again.

## Verdict
E1: PASS (one home, evidence above). C1: PASS at the automated premium bar; human 1.5× boredom scan of the two rewritten modules recommended at the owner's next review.
