# Phase 2 — Content bridge gate report (boredom scan + premium pass + mock cadence)

Date: 2026-06-11 · Mode: Implementation · Scope: ROADMAP Version A Phase 2

## What shipped

1. **Spine M1–M3 content raised to premium** (modules 03, 04, 05, 08 — 20 lessons; spine M1 runs on the mission layer, already gate-passed 2026-06-10):
   - 64 generic stems rewritten to scene-grounded stems (answers untouched, per the retrofit rule).
   - 20 copy-pasted "Kuttan practice: Say aloud for this lesson (X)" speaking blocks replaced with scene-specific prompts and lesson-fit sentences (the old blocks repeated one identical sentence across whole modules).
   - +20 new speaking exercises (one per lesson) → every M1–M3 lesson now has **speaking ≥2** and **≥1 Malayali mistake-repair** (am/im/um, mein/meine, ein/einen, verb-second, Dativ location, formal frame).
   - 8 banned bare-matching stems retrofitted; 5 empty explanations filled; dictation stems no longer print their own answers.
2. **Boredom scan, all 66 spine lessons** (audit: `20260611T163058Z_spine-premium-audit.md` + this report):
   - Cuts: `ex3-6-7` (duplicate time-telling), `ex8-3-6` (duplicate Kaution), `ex4-4-5` (third -ung drill), `ex4-4-8` (meta study-advice MC — banned padding), `ex8-2-7` (duplicate Dativ table MC), `ex5-1-6` (lowest-value ihr-form MC).
   - M4–M8 acceptable-grade pass: all 44 remaining mechanical speaking stems rewritten scene-specific, 27 banned matching stems retrofitted, all 24 empty explanations filled. **0 FAIL lessons remain** (was 30 FAIL at baseline).
3. **Mock cadence wired** (`src/lib/mocks.ts`, store `mockResults`, spine blocks, gate-aware test player):
   - Mini-mock (Hören+Lesen, Übungstest 4) in spine M4 · Half-mock (Lesen+Schreiben+Sprechen, Übungstest 7) in M6 · Full mock (Übungstest 5) in M7 · two timed finals (Übungstests 6, 8) in M8.
   - Gates run via `/tests/[testId]?gate=<id>`: scoped sections, scoped scoring, result saved with bands per PRODUCT_VISION (ready / exam-pass likely / risky / not ready), "Continue your course" CTA.
   - `/tests` unlocking switched from 18-module completion (dead end for spine learners) to spine checkpoints.
4. **Spine-breaking bug found & fixed by this gate's playthrough:** the lesson player enforced old 18-module linear sequencing (`module N needs module N−1 complete`), which bounced spine learners off `/learn/3/3-1` and would have permanently locked modules 14 and 17 (their old predecessors 13/16 aren't in the spine). Unlock is now spine-aware (`src/app/learn/[moduleId]/[lessonId]/page.tsx`); non-spine modules (2, 13, 15, 16) are open practice library for recovery.
5. **Scoring bug fix:** test player advertised "60 Punkte | 36 zum Bestehen" but Sprechen could only score 10/15 (max 55). Sprechen now scores 0/7/10/15 like every other section.

## Evidence

- `npm run qa` green: lint:mvp (0 errors, warnings ≤ budget), typecheck clean, 12,942 content checks pass.
- Automated premium audit (new `scripts/audit-spine-premium.ts`): baseline 0 PASS / 36 WEAK / 30 FAIL, 194 generic stems, 64 mechanical stems, 29 empty explanations, 45 lessons without repair → now **0 FAIL**, 0 mechanical, 0 empty, 0 banned; M1–M3 lessons all have speaking ≥2 + repair + 0 generic stems.
- 390px playthrough, zero console errors: `scripts/output/phase2-playthrough/` (9 screenshots) — Today, course path, retrofitted lessons 3-1 and 5-2 actually rendering, /tests spine unlock copy, mini/half gate overviews showing only their scoped sections, course with module 4 active showing the Mini-mock block, lesson 3-1 reachability assertion.

## Named weaknesses (honest list)

- **M4–M8 stay at acceptable, not premium**: 102 generic stems remain, ~30 lessons still speaking 1/2 and without an explicit repair exercise. Per ROADMAP this is the planned depth-first boundary; raising M4–M8 to premium is Version B scope.
- **Distribution caps**: most lessons still exceed "MC ≤2 / fill-blank ≤1 / matching+ordering ≤1 per ~8 exercises". Converting types would change verified answers (prohibited); each over-cap lesson was reviewed — remaining items are distinct and instructive (e.g. 3-6's five fill-blanks each drill a different preposition). Verdict: accepted deviation, documented per lesson in the audit; revisit only where pilot learners report monotony.
- **Canon-borderline scenes**: lessons 4-3/4-4/4-5, 5-1/5-3, 8-1..8-4 have storyScenes physically set in Germany (WG, Edeka), predating the Kerala canon. Scene rewrites are out of Phase 2 scope ("map, don't rewrite"); all NEW stems were written canon-safe (cousin video call / rehearsal / imagined Germany). Flag for the Version B content pass.
- **Legacy lint debt**: `src/app/tests/[testId]/page.tsx` carries 15 pre-existing `no-explicit-any` errors (none introduced by this phase). lint:mvp scope unchanged; widen when that file is next refactored.
- **Mock audio**: Hören gate questions depend on pre-rendered audio files in `/audio/hoeren/`; missing files degrade to transcript mode (existing player behavior, unchanged).
- **A1_COURSE_ARCHITECTURE internal mismatch** between module-table milestones and the gates table resolved in favor of the gates table (mini@M4, half@M6, full@M7) — see DECISIONS #8.

## Verdict

Phase 2 outputs delivered: lessons mapped and *reachable* in the spine, M1–M3 premium per automated checks + human scan, boredom scan complete with cuts, mock cadence wired end-to-end. Human gate for M1–M3: **PASS** (with the named cap deviations). M4–M8: **acceptable** (planned).
