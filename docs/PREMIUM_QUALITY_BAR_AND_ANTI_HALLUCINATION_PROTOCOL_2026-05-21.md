# Adipoli German — Premium Quality Bar + Anti-Hallucination Protocol

Generated: 2026-05-21

## Why this exists

Boss explicitly wants the bar set very high and does not want the agent hallucinating that the app is good.

So the agent must not rely on vibes, self-congratulation, or random movement. Every claim of quality must be backed by evidence: source inspection, browser testing, screenshots, audits, learner-flow criteria, and clear fail/pass gates.

## Core rule

Do not say “this is good” unless it passes the gates below.

If it does not pass, say exactly what is weak and what must change next.

## North-star quality standard

Adipoli German should be good enough that a Malayali beginner would say:

> “This feels made for me. I actually want to continue. I can say something useful in German now.”

That means the product must be:

- emotionally specific,
- adult-safe,
- culturally rooted,
- Goethe A1 serious,
- visually polished,
- low-friction,
- production-heavy,
- self-guiding,
- memorable enough to recommend.

## The 10 hard gates

A mission, module, or route cannot be called premium unless it passes all 10 gates.

### Gate 1 — Direction gate

Pass only if:

- It serves the whole-course mission spine.
- It is not an isolated nice screen.
- The learner knows why this matters for Germany/Goethe/life.

Fail signs:

- generic language-app exercise,
- random mini-game,
- Kuttan as decoration,
- no connection to course journey.

Evidence required:

- mission title,
- learner promise,
- Goethe skill,
- target output.

### Gate 2 — First 5 seconds gate

Pass only if a new learner can tell within 5 seconds:

- where they are,
- what they need to do,
- why it matters,
- what the main button/action is.

Fail signs:

- multiple competing CTAs,
- dashboard clutter,
- long intro text,
- unclear icons,
- no emotional hook.

Evidence required:

- browser screenshot,
- one-sentence first-screen verdict.

### Gate 3 — No boring dead moments gate

Pass only if:

- action appears within 45–90 seconds,
- no long passive explanation before interaction,
- each screen has one job.

Fail signs:

- wall of text,
- long passive video/script dump,
- repeated similar clicks,
- reading before context.

Evidence required:

- screen sequence list with action type per step.

### Gate 4 — Production gate

Pass only if learner produces German before completion.

Minimum for a mission:

- 1 speak-aloud moment,
- 1 typed/written output or sentence-builder output,
- 1 listening moment.

For launch-grade lessons:

- at least 3 production exercises,
- speaking >= 2 where possible,
- writing/free-text >= 1,
- dictation/listening >= 1.

Fail signs:

- completion possible by clicking options only,
- no speaking,
- no writing,
- fake listening where text is visible.

Evidence required:

- exercise inventory by type,
- screenshot of production step.

### Gate 5 — Mistake repair gate

Pass only if the product teaches through at least one likely learner mistake.

Examples:

- `Ich bin komme` → `Ich komme`
- English letter names while spelling → German letter names
- wrong formal/informal register
- missing verb position

Fail signs:

- only right/wrong feedback,
- generic “try again,”
- no explanation of why.

Evidence required:

- mistake state screenshot or source snippet.

### Gate 6 — Cultural/tone gate

Pass only if:

- Kerala/Manglish bridge helps memory,
- Kuttan feels useful and adult-safe,
- humor is warm, not cringe,
- Germany references obey A1 canon.

Fail signs:

- childish mascot energy,
- forced jokes,
- generic Western setting,
- Kuttan physically in Germany during A1,
- Malayalam/Manglish that sounds machine-written.

Evidence required:

- sample Kuttan lines,
- canon scan for risky Germany placement.

### Gate 7 — Visual trust gate

Pass only if:

- mobile layout looks clean,
- tap targets are comfortable,
- text is readable,
- hierarchy is obvious,
- motion supports feedback,
- no broken/clipped animations,
- no cheap-looking clutter.

Fail signs:

- tiny buttons,
- floating widgets during focus,
- bad contrast,
- repeated cards with no visual rhythm,
- animation that distracts or fails.

Evidence required:

- browser visual QA screenshot(s),
- console check,
- list of remaining visual weaknesses.

### Gate 8 — Learning science gate

Pass only if the mission uses a real learning arc:

1. context,
2. hear/read input,
3. guided recognition,
4. recall/production,
5. feedback/repair,
6. spaced or future review hook.

Fail signs:

- bare flashcards,
- random MCQ sequence,
- no recall,
- no review/pull.

Evidence required:

- mapped step sequence.

### Gate 9 — Goethe readiness gate

Pass only if the learning maps to at least one Goethe A1 skill:

- Hören,
- Lesen,
- Schreiben,
- Sprechen.

Good missions should usually touch 2+ skills.

Fail signs:

- fun interaction with no exam transfer,
- only vocabulary recognition,
- no speaking/writing in identity modules.

Evidence required:

- Goethe skill tag and exam transfer statement.

### Gate 10 — Recommendation gate

Pass only if the agent can honestly answer yes to:

- Would this feel better than a generic cheap app?
- Would a learner feel seen?
- Would they want to show this to a friend/cousin?
- Did they unlock a real sentence/ability?

Fail signs:

- correct but forgettable,
- polished but generic,
- fun but not useful,
- useful but boring.

Evidence required:

- brutally honest verdict: recommend / not yet / fail.

## Anti-hallucination workflow

For every serious improvement, the agent must follow this sequence:

### 1. Read

Read the relevant docs and source before changing anything.

Minimum for mission work:

- `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
- `docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`
- relevant module file in `src/lib/content/modules/`
- relevant route/component files

### 2. Define target

Write the intended learner promise and pass/fail bar before coding.

### 3. Build small but real

Implement a real local slice, not just a doc.

### 4. Test in browser

Use actual browser inspection/visual screenshots.

Do not rely only on code compiling.

### 5. Check console/errors

Check browser console and local errors.

### 6. Score against gates

Score each gate:

- PASS
- WEAK
- FAIL

Anything WEAK/FAIL must be named.

### 7. Report honestly

Report:

- what improved,
- what is still weak,
- what evidence exists,
- what next step is justified.

## No random movement rule

Every next action must belong to one of these lanes:

1. Direction/spine clarification.
2. Mission blueprint.
3. Pilot implementation.
4. Browser/visual QA.
5. Learning-performance coverage.
6. Content/canon/tone repair.
7. Generalization after pilot approval.

If an idea does not fit a lane, park it.

## Evidence bundle required for Boss review

Before asking Boss for taste feedback, provide:

- Tailscale URL,
- 2–3 screenshots max,
- short description of learner mission,
- PASS/WEAK/FAIL quality gate summary,
- exact question: “Does this feel like Adipoli?”

Do not send vague “I improved things” messages.

## Red flags requiring immediate stop

Stop and rethink if:

- the pilot feels like Duolingo clone with Kerala words pasted on,
- learner can finish without speaking/writing,
- Kuttan feels childish,
- visual QA says it still looks cheap,
- product has no clear next action,
- app becomes more complex instead of more guided,
- quality report has only praise and no weaknesses.

A report with no weaknesses is probably hallucinated.

## Quality scorecard template

For each pilot/mission:

- Direction gate: PASS/WEAK/FAIL
- First 5 seconds: PASS/WEAK/FAIL
- No boring dead moments: PASS/WEAK/FAIL
- Production: PASS/WEAK/FAIL
- Mistake repair: PASS/WEAK/FAIL
- Cultural/tone: PASS/WEAK/FAIL
- Visual trust: PASS/WEAK/FAIL
- Learning science: PASS/WEAK/FAIL
- Goethe readiness: PASS/WEAK/FAIL
- Recommendation: PASS/WEAK/FAIL

Overall verdict:

- `Launch-grade`
- `Promising but not enough`
- `Wrong direction`

The default assumption is **not good enough yet** until evidence proves otherwise.
