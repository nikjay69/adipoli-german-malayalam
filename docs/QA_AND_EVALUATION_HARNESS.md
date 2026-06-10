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
| Wortliste coverage | Goethe A1 vocab themes covered | `scripts/check-wortliste.js` |
| Broken routes/links | All linked routes render | from `scripts/audit-nav.mjs` |

(Phase 0/1 task: merge these existing ad-hoc scripts into the single `npm run qa` command + Vitest suite.)

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
6. **Cultural/tone** — Kerala/Manglish bridge helps memory; Kuttan adult-safe; canon respected (Kuttan never physically in Germany during A1). Evidence: sample lines + canon scan.
7. **Visual trust** — clean mobile layout, comfortable taps, readable, purposeful motion. Evidence: visual QA screenshots + console + named remaining weaknesses.
8. **Learning science** — context → input → recognition → production → repair → review hook. No bare flashcards, no random MCQ chains. Evidence: mapped step sequence.
9. **Goethe readiness** — maps to ≥1 (ideally 2+) exam skills with a transfer statement.
10. **Recommendation** — honestly: better than a generic app? learner feels seen? would they show a cousin? unlocked a real ability? Verdict: recommend / not yet / fail.

Scorecard verdicts: `Launch-grade` · `Promising but not enough` · `Wrong direction`.

## Workflow for any serious change

1. **Read** the relevant SOT docs + source files. 2. **Define target** — learner promise + pass/fail bar before coding. 3. **Build small but real.** 4. **Test in browser** (not just compile). 5. **Check console.** 6. **Score against gates.** 7. **Report honestly**: improved / still weak / evidence / justified next step.

## Red flags — stop immediately

Feels like a Duolingo clone with Kerala words pasted on · completable without speaking/writing · Kuttan childish · still looks cheap after visual QA · no clear next action · app getting more complex instead of more guided · report contains only praise.

## Review bundle for the owner

Tailscale/local URL · 2–3 screenshots max · one-line learner mission description · gate scorecard · the exact question to answer. Never "I improved things."
