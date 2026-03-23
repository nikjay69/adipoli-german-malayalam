# Modules 17 & 18: Goethe A1 Exam Prep — Launch Plan

> **Last updated:** 2026-03-23 11:45 UTC

---

## Combined Exam Module Identity

These two modules are the capstone — they exist purely for exam performance.

### Module 17: Hören & Lesen (Receptive)
- **Scripts:** ✅ ALL COMPLETE (v17-1-1, v17-2-1, v17-3-1)
- **Exercises:** 65
- **Readiness:** 11/15 — nearest to launch-ready

### Module 18: Schreiben & Sprechen (Productive)
- **Scripts:** ✅ ALL COMPLETE (v18-1-1 through v18-5-1) — 5 scripts, all at v2.0
- **Exercises:** 70
- **Readiness:** 10/15

---

## Goethe A1 Exam Structure (Reference)

| Section | Duration | Points | What it tests |
|---------|----------|--------|--------------|
| Hören (Listening) | ~20 min | 25 | 3 parts: short messages, dialogues, announcements |
| Lesen (Reading) | ~25 min | 25 | 3 parts: signs/ads, emails, short texts |
| Schreiben (Writing) | ~20 min | 25 | 2 parts: form-filling, short message |
| Sprechen (Speaking) | ~15 min | 25 | 3 parts: self-intro, topic Q&A, requests |

**Pass threshold: 60% overall (60/100). Each section can be compensated but severe weakness in one = fail.**

---

## Module 17: Hören & Lesen — Detailed Status

### What Works
- ✅ 65 exercises with strong exam-format coverage
- ✅ Test UI supports audio-only Hören (text hidden, 2 replays)
- ✅ Strategy scripts cover all 3 Hören and 3 Lesen parts
- ✅ Format overview with point distribution and timing advice

### What's Missing (Priority Order)

#### 1. AUDIO GENERATION — THE CRITICAL BLOCKER
- Hören UI is built but **no audio files exist**
- Without audio, "Hören exercises" are actually "Lesen exercises with Hören labels"
- **Estimated clips needed:** ~120 for Goethe test Hören exercises + ~50 for lesson listening tasks
- **Tool:** edge-tts with `de-DE-ConradNeural` voice (FREE)
- **Files:** `public/audio/hoeren/{exerciseId}.mp3`

#### 2. Timed reading practice
- Lesen exercises exist but no timer
- Real exam: ~2 min per reading item
- Need: timer overlay for Lesen practice mode

#### 3. Error analysis exercises
- Students should understand WHY wrong answers are wrong
- Need: 5-10 "why was B wrong?" guided analysis items (spec 17-P3)

### Exam-Strategy Cheat Sheet (from scripts)

**Hören strategy:**
- Read questions BEFORE audio plays
- Listen for keywords, not full sentences
- First listen = main idea, second listen = details
- Don't panic if you miss one — move on

**Lesen strategy:**
- Scan headings/bold text first
- Match keywords from questions to text
- Signs/ads: look for numbers, times, addresses
- Emails: focus on the 3-4 key info points

---

## Module 18: Schreiben & Sprechen — Detailed Status

### What Works
- ✅ 70 exercises — highest count in the course
- ✅ All 5 scripts at v2.0 quality
- ✅ /practice/write exists (20 Schreiben prompts)
- ✅ /practice/intro exists (6-topic, 2-min self-intro)
- ✅ 3 request patterns taught (Können Sie/Könnten Sie/Darf ich)
- ✅ 3 content-point formula for Schreiben Teil 2

### What's Missing (Priority Order)

#### 1. Scoring rubrics for /practice/write
- AI checks answers but without structured rubric
- Need: model answer bands, partial credit rules, specific A1 feedback
- Example rubric for Schreiben Teil 2:
  - Content point 1 addressed: 5 pts
  - Content point 2 addressed: 5 pts
  - Content point 3 addressed: 5 pts
  - Appropriate greeting/closing: 2.5 pts
  - Comprehensible language: 2.5 pts
  - **Total: 20 pts, pass at 12+**

#### 2. Model answers for every prompt
- Each Schreiben prompt should have:
  - A "perfect" model answer (for learning)
  - A "just passing" model answer (for confidence)
  - Common mistakes highlighted

#### 3. Full mock exam flow
- Currently: exercises are scattered across lessons
- Need: single `/practice/mock-exam` page that runs:
  1. Schreiben Teil 1 (form-fill, 5 min timer)
  2. Schreiben Teil 2 (message, 15 min timer)
  3. Sprechen Teil 1 (self-intro, 2 min recording)
  4. Sprechen Teil 2 (topic cards, 3 min)
  5. Sprechen Teil 3 (requests, 2 min)
  - Total: ~27 min simulated productive exam

#### 4. Topic card randomization for Sprechen Teil 2
- Need: random topic card generator from pool
- Topics: Essen, Familie, Wohnung, Arbeit, Freizeit, Reisen, Gesundheit, Einkaufen
- Each card shows 6 keyword prompts
- Student asks questions about each, then answers questions

#### 5. Request scenario pool for Sprechen Teil 3
- Need: 15+ random scenarios
- Examples: train station, restaurant, office, shop, doctor, university, library, post office
- Each scenario: situation + required request

---

## Production Exercise Gap Analysis (Combined)

### Module 17
| Spec ID | Exercise | Status | Priority |
|---------|----------|--------|----------|
| 17-P1 | Audio-Only Hören Drill (6 items) | ❌ BLOCKED by audio gen | **CRITICAL** |
| 17-P2 | Timed Reading (5 items) | ❌ Not built | HIGH |
| 17-P3 | Error Analysis (guided) | ❌ Not built | MEDIUM |

### Module 18
| Spec ID | Exercise | Status | Priority |
|---------|----------|--------|----------|
| 18-P1 | Full Form-Fill Mock (timed) | ❌ Not built | **CRITICAL** |
| 18-P2 | 3-Point Message | ❌ Not built | **CRITICAL** |
| 18-P3 | Topic Card Speaking | ❌ Not built | HIGH |
| 18-P4 | Request Drill | ❌ Not built | HIGH |
| 18-P5 | Full Mock Timer (composite) | ❌ Not built | HIGH |

---

## Concrete Next Steps

### Module 17 — Must-do
1. [ ] Generate ALL Hören audio clips (edge-tts, ~170 clips)
2. [ ] Wire audio playback into existing Hören exercise UI
3. [ ] Build timed reading mode with 2-min-per-item timer
4. [ ] Add 3 error-analysis exercises

### Module 18 — Must-do
5. [ ] Add scoring rubrics to /practice/write
6. [ ] Create model answers (perfect + passing) for 10 Schreiben prompts
7. [ ] Build /practice/mock-exam full simulation page
8. [ ] Build topic card randomizer for Sprechen Teil 2
9. [ ] Build request scenario pool (15+ scenarios)

### Integration — Should-do
10. [ ] Create exam readiness checkpoint before mock tests
11. [ ] Add "recommended review" prompts if checkpoint shows weakness
12. [ ] Link Modules 2, 5, 12, 14 content into exam module review paths

---

## Exam Readiness Indicator (Proposed)

Before a student takes the full mock, they should pass checkpoints:

| Checkpoint | Source | Pass criteria |
|-----------|--------|--------------|
| Self-introduction | /practice/intro | Complete 2-min intro covering 6/6 topics |
| Form-filling speed | Module 14 forms | Complete Anmeldung form in <5 min |
| Message writing | /practice/write | Score ≥12/20 on any 3 prompts |
| Vocab retention | SRS review | ≥80% of Goethe Wortliste items at "Good" or better |
| Number listening | Module 3 audio drills | ≥7/10 on number dictation |

If any checkpoint fails → recommend specific review before mock.

---

*These modules are the closest to launch-ready. The single biggest unlock: audio generation for Hören. Everything else is refinement on a strong base.*
