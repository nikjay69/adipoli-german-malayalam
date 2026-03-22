# Modules 1–3 QA Pass

_Last updated: 2026-03-22_

## Scope
This pass focused only on the first three modules:
- Module 1: Welcome to German
- Module 2: Who Are You?
- Module 3: Numbers & Time

## Why these first
These modules determine whether a learner:
1. feels safe enough to continue,
2. builds correct pronunciation habits early,
3. gains the self-introduction and number/time control needed for Goethe A1.

If these early modules are too fluffy, too broad, or too passive, the whole course weakens later.

---

## What I found

### Module 1 — strong motivation, but risk of too much inspiration and not enough output
**Strengths**
- emotionally strong start
- strong Malayali relevance
- lowers fear for beginners

**Risk**
- can drift toward motivational storytelling more than immediate language performance

**Adjustment made**
- reframed module/lesson descriptions to emphasize:
  - pronunciation accuracy
  - first usable output
  - A1 speaking/listening relevance

---

### Module 2 — very important for A1, needed clearer exam framing
**Strengths**
- highly exam-relevant
- excellent for self-introduction and personal details
- practical for Germany life and forms

**Risk**
- can become broader than necessary if geography/nationality content expands too far

**Adjustment made**
- reframed descriptions toward:
  - form filling
  - self-introduction
  - practical personal-information control
  - production, not just recognition

---

### Module 3 — useful content, needed stronger "survival + exam" framing
**Strengths**
- high-frequency real-world content
- useful for prices, dates, age, appointments, time
- strongly relevant for Hören and Alltag

**Risk**
- learners may "know" numbers but still freeze under speed/listening pressure

**Adjustment made**
- reframed descriptions to emphasize:
  - fast retrieval
  - prices/phone numbers/appointments
  - listening usefulness
  - A1 survival skill relevance

---

## What I changed in code
Updated the learner-facing descriptions in:
- `src/lib/content/modules/module-01.ts`
- `src/lib/content/modules/module-02.ts`
- `src/lib/content/modules/module-03.ts`

### Specific improvements
- reduced vague hype language
- increased A1 exam relevance
- increased real-life Germany usefulness
- increased focus on output and retrieval
- made pedagogical intent clearer for future cleanup passes

---

## What is still not done
This pass improved the **instructional framing**, not the full body of every lesson.

Still remaining for Modules 1–3:
1. exercise-by-exercise quality review
2. identify any weak distractors / repetitive items
3. add more explicit micro-output expectations
4. trim any filler examples that do not help A1 performance
5. check listening/speaking retrieval pressure more directly

---

## Critical judgment after this pass
Modules 1–3 are conceptually strong.
Their biggest remaining need is not a new direction, but **deeper exercise-level tightening** so the early course becomes more active and exam-ready.
