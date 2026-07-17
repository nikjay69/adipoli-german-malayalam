# QA_AND_EVALUATION_HARNESS.md — Quality System

Status: **Source of truth.** Established 2026-06-11. Absorbs the 10 hard gates and anti-hallucination protocol from `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md` (archived). Lesson-level review lives in `LESSON_QUALITY_STANDARD.md`; customer-flow gate in `LEARNER_JOURNEY.md`.

## Core rule (anti-hallucination)

**Never say "this is good" without evidence.** Default assumption: *not good enough yet* until proven. Every quality claim needs: source inspection, browser screenshots (390px width), console check, and PASS/WEAK/FAIL per gate with weaknesses named. A report with no weaknesses is probably hallucinated.

## Automated checks — `npm run qa`

| Check | What | Status |
|---|---|---|
| Build / lint / typecheck | `next build`, ESLint, `tsc` | exists |
| Content schema | Every module/lesson/exercise validates against types | seed: `tests/content-validation.test.ts` |
| Quiz answer validity | correctAnswer present in options; no empty answers | consolidate from `scripts/audit-content.js` etc. |
| Audio link check | Every `audioUrl` resolves to a real file in `public/` | from `scripts/audit-missing-audio.js` |
| Production floor | Every spine lesson: ≥3 production exercises, ≥1 listening | from `scripts/audit-app-readiness.ts` |
| Empty explanations | No empty `explanation` fields | `scripts/find-empty-explanations.js` |
| Duplicate exercises | Near-identical question/answer detection | from `scripts/audit-deep.js` |
| Wortliste coverage | Current official adult Start Deutsch 1 themes + ~650-entry passive inventory mapped to lessons/SRS; active target explicitly selected | current `scripts/check-wortliste.js` checks only a small hand-written list and is **insufficient**; replace before content freeze |
| 56-row mastery coverage | Exactly `M1L1`–`M8L7`; every row has outcome, exam transfer, production proof, source, diagnostic tags, recovery, ≥2 fresh retests and spiral return | required by DECISIONS #23; validator added before M1 content lock |
| Recovery completeness | Every emitted weakness tag resolves to recovery level 1 + alternate level 2; no orphan tag or generic “revise more” | required by DECISIONS #23; compare checkpoint/mini-check emitters to prescription registry |
| Retest freshness | Retests share tag/difficulty but not prompt, order, audio or answer surface with diagnosis; ≥2 variants/tag | required by DECISIONS #23; seeded duplicate/item-bank check |
| Official calibration | Current official adult A1 specification, Wortliste themes and three practice sets mapped; internal mocks compared for shape/difficulty/scoring | human + recorded fixture review before pilot; internal tests never self-certify |
| Broken routes/links | All linked routes render | from `scripts/audit-nav.mjs` |
| Video launch inventory | Exactly 56 spine videos; each has approved master, captions/transcript, native German audio, QC report, manifest/checksum, protected delivery asset, and verified playback evidence; zero placeholder/coming-soon video | required by DECISIONS #22; automated inventory gate added during V1 production |

(Phase 0/1 task: merge these existing ad-hoc scripts into the single `npm run qa` command + Vitest suite.)

## Proportionate evidence per change type (DECISIONS #17)

Every chunk names its gate from this table in its PR-body contract; evidence goes on the PR.

| Change type | Automated gate | Owner evidence |
|---|---|---|
| Docs / process | qa stays green | PR diff (+ DECISIONS entry if direction changed) |
| App code (non-UI) | `npm run qa` | qa output verbatim in the handoff |
| Learner-facing UI | qa + console clean | 390px playthrough screenshots + Vercel preview URL |
| Lesson content / feel | qa + `audit:spine` | Feel Rubric grade by real playthrough (FLAT = sev-1) |
| Video composition source | engine check / scene-contract validator | stills or contact sheet on the PR |
| Rendered video | ffprobe + full decode + duration/size vs contract; native-audio transcript check against the manifest | contact sheet + ≤10 MB proxy on the PR + committed `render-report.json` |
| App video integration | qa + audio/video link audit | 390px playthrough with the video actually playing |
| Remote reproducibility (per V1 stage gate) | fresh-clone bootstrap + preflight + one unit render on a second machine or CI | log on the PR |

**Pilot/release hard stop (DECISIONS #22):** the full-course gate fails until the video inventory reports `56/56` complete and a browser sample plus delivery audit proves every protected app asset is playable. A valid app-only fallback, finished recording kit, source timeline, or owner-review proxy is not a finished launch video.

**Mastery hard stop (DECISIONS #23):** the full-course gate also fails if any of the 56 rows is incomplete, any emitted tag lacks exact recovery and two fresh retests, any core outcome can complete through watching/recognition alone, any required audio is missing, or the final A1 Ready state can be awarded without two `>=75` timed mocks (no section `<60`) plus the required speaking/writing evidence.

## Human review checklists

**Content** (per lesson — full procedure in `LESSON_QUALITY_STANDARD.md`): A1 alignment · exam relevance · German correctness spot-check · Manglish naturalness · **boredom scan at 1.5× speed** (Reel Rule: any skippable stretch = FAIL) · production usefulness per skill · revision card quality.

**Product** (per flow — full gate in `LEARNER_JOURNEY.md`): learner knows what to do next · progress visible · lessons not too long · one action per screen · no dead-end screens · no unnecessary features in the first path.

**Technical** (per change): qa green · phone playthrough (390px) with screenshots · console clean · audio actually plays with visible progress.

## The 10 hard gates (route/mission/module level)

No mission, module, or route is "premium" unless all 10 PASS, each with evidence:

1. **Direction** — serves the course spine; learner knows why it matters for Goethe/Germany. Evidence: mission title, promise, Goethe skill, target output.
2. **First 5 seconds** — where am I, what do I do, why, what's the main action. Evidence: screenshot + one-line verdict.
3. **No boring dead moments** — action within 45–90s; no passive walls; one job per screen. Evidence: screen-sequence list with action type per step.
4. **Production** — ≥1 speak-aloud, ≥1 written/typed output, ≥1 listening before completion (launch grade: ≥3 production exercises, speaking ≥2). Evidence: exercise inventory + screenshot.
5. **Mistake repair** — teaches through ≥1 likely learner mistake with the why, not just right/wrong. Evidence: mistake-state screenshot/snippet.
6. **Cultural/tone** — Kerala/Manglish bridge helps memory; Nivin and Meera both adult-safe and independently meaningful; neither named peer is physically in Germany during A1; Frau Fischer/Appu roles stay within canon. Evidence: sample lines + canon scan.
7. **Visual trust** — clean mobile layout, comfortable taps, readable, purposeful motion. Evidence: visual QA screenshots + console + named remaining weaknesses.
8. **Learning science** — context → input → recognition → production → repair → review hook. No bare flashcards, no random MCQ chains. Evidence: mapped step sequence.
9. **Goethe readiness** — maps to ≥1 (ideally 2+) exam skills with a transfer statement.
10. **Recommendation** — honestly: better than a generic app? learner feels seen? would they show a cousin? unlocked a real ability? Verdict: recommend / not yet / fail.

Scorecard verdicts: `Launch-grade` · `Promising but not enough` · `Wrong direction`.

## Workflow for any serious change

1. **Read** the relevant SOT docs + source files. 2. **Define target** — learner promise + pass/fail bar before coding. 3. **Build small but real.** 4. **Test in browser** (not just compile). 5. **Check console.** 6. **Score against gates.** 7. **Report honestly**: improved / still weak / evidence / justified next step.

## Red flags — stop immediately

Feels like a Duolingo clone with Kerala words pasted on · completable without speaking/writing · Nivin treated as the only real learner · Meera tokenised/romanticised · Appu made childish or intrusive · still looks cheap after visual QA · no clear next action · app getting more complex instead of more guided · report contains only praise.

## Review bundle for the owner

Tailscale/local URL · 2–3 screenshots max · one-line learner mission description · gate scorecard · the exact question to answer. Never "I improved things."
