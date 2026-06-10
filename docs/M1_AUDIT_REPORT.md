# Module 1 Audit Report

Date: 2026-04-14
Auditor: Pre-launch content review (Claude)
Scope: All 6 lessons of Module 1 (Namaskaram Germany!)
Method: Source code inspection + scenario walkthrough as persona "Reshma, 24, Kerala nurse"

---

## TL;DR — three hard blockers, three systemic problems

### Hard blockers (fix before launch)
1. **Grammar bug, `module-01.ts:178`** — Lesson 1-1 ex4 asks `"Das _____ ist groß"` with answer `Universität` (feminine). Must be `Die _____`. A1 learners will memorize wrong gender.
2. **Pedagogy mismatch, Lesson 1-2** — lesson title *"German Sounds for Malayalam Speakers"* has **zero speaking/pronunciation exercises.** All 8 exercises are MC/fill/match on written words. Learner never produces a sound.
3. **Lesson 1-4 under-tested** — only **3 exercises for 11 vocabulary words.** Vocab-to-exercise ratio too low to consolidate learning.

### Systemic problems (course-wide pattern)
A. **Exercise-type monotony.** M1 exercises are ~80% recognition (MC / fill-blank / matching). Only Lesson 1-5 mixes in production (free-text, dictation, image-prompt). Plan calls for ≥30% production.
B. **Story disconnect.** Every lesson has a rich `storyScene` (Kerala home, Goethe Kochi, Berlin Hauptbahnhof, hostel, airport, Ausländerbehörde) — but exercises **do not reference the story.** Students just did a worksheet.
C. **Goethe A1 Wortliste drift.** L1-1 teaches `Feierabend`, `Ausbildung`, `Studium`, `Chance` (not on Wortliste / too advanced). `Hallo`, `Danke`, `Bitte`, `ja`, `nein` don't appear until L1-3 or L1-4 — they should be in L1-1.

---

## Per-lesson grade cards

### Lesson 1-1 — "Why Learn German?"
**Visual: TBD (need screenshots of player states)**
**Experience: 2/5** — 5 consecutive recognition exercises; story in `storyScene` not tied to exercises; ends on cognate "Chance" (weak finale).
**Content: 3/5** — grammar bug in ex4, Feierabend too advanced for L1-1, ex7 is an English ordering exercise.

**Fixes:**
- `module-01.ts:178` (ex4) — change `"Das _____"` → `"Die _____"`, add explanation that Universität is feminine.
- `module-01.ts:175` (ex1) — replace "Feierabend" (B1-level) with an A1 greeting MC tied to the story: *"Kuttan walks into a Munich café and says…"* options: `[Hallo!, Tschüss!, Nein!, Was?]`.
- `module-01.ts:181` (ex7) — replace English ordering with German greeting ordering (`Guten Morgen → Guten Tag → Guten Abend → Gute Nacht`).
- Add ≥1 `speaking` exercise (e.g., "Say aloud: 'Ich lerne Deutsch'") — pipe to existing `/api/check-speech` route.
- Trim vocab from 11 → 8: drop `Ausbildung`, `Studium`, `Chance`; keep core motivational vocab.
- Tie ex6 to story: *"Kuttan's cousin in Munich hears him say 'Ich lerne Deutsch.' What did he tell him?"*

---

### Lesson 1-2 — "German Sounds for Malayalam Speakers"
**Experience: 2/5** — monotony (7/8 exercises are recognition) and most critical: the lesson about sounds has no exercise where you make a sound.
**Content: 3/5** — strong story (Frau Weber at Goethe Kochi) and decision points, but exercises completely disconnected from pronunciation.

**Fixes:**
- **Add 3+ `speaking` exercises** with mic + `/api/check-speech`:
  - "Say 'ich' with a soft ch (cat-hiss sound)"
  - "Say 'schön' — lips round like O, mouth shape like E"
  - "Say 'München' — round lips, EE sound"
- `module-01.ts:357` (ex2) — type-answer "Straße" is OK, but add `dictation` version: "Listen and type what you hear" (reinforces ear→written mapping).
- `vocab1-2-3` pronunciation string `"shern"` — ambiguous for learners; use `"shœn"` or a recorded audio file.
- Optional: add a `listen-and-identify` exercise (play 3 umlaut sounds, identify which is ö vs ü vs ä).

---

### Lesson 1-3 — "Basic Greetings"
**Experience: 3/5** — better variety (fill, MC, match, type, order), rich story.
**Content: 4/5** — solid; two small flaws:

**Fixes:**
- `module-01.ts:538 and 542` — `ex1` and `ex5` are near-duplicate fill-blanks on `"Guten _____"`. Replace ex5 with a **speaking** exercise: "Say aloud: 'Guten Tag, wie geht es Ihnen?'" with pronunciation check.
- `module-01.ts:545` (ex8) — "Mahnzeit" is a typo; should be `"Mahlzeit"`.
- Tie ex2 to story: *"At Berlin Hauptbahnhof, the info officer asks your name. Use the form…"* so exercises feel like scenes.

---

### Lesson 1-4 — "Goodbyes & Politeness (The Survival Kit)"
**Experience: 2/5** — only **3 exercises** for 11 new vocab words. Lesson feels unfinished; learner won't internalize the vocab.
**Content: 4/5** — what's there is good, just under-tested.

**Fixes — add 5 more exercises:**
- `speaking` — "Say aloud: 'Vielen Dank für die Hilfe!'"
- `scenario MC` — "You're leaving a bakery at 5 PM. What's the pro goodbye?" options: `[Einen schönen Tag noch!, Gute Nacht!, Hallo!, Auf Wiederhören!]`
- `matching` — Match situation (hostel at night / hostel in morning / friend texting / boss email) → greeting (Gute Nacht / Guten Morgen / Hey! / Sehr geehrte/r).
- `fill-blank` — *"Es tut mir _____, das war mein Fehler."* (answer: `leid`)
- `free-text` — *"Write a 1-sentence polite apology in German."* (rubric: includes `Entschuldigung` or `Es tut mir leid`).

---

### Lesson 1-5 — "Your First Conversation"
**Experience: 4/5** — best-structured lesson in M1. Real variety.
**Content: 4/5** — good. Minor flags:

**Fixes:**
- `module-01.ts:857` (ex4) — dictation references `/audio/hoeren/t1-h1-4.mp3`. Verify this file exists; if not, this exercise is broken. Generate audio if missing (edge-tts).
- `module-01.ts:860` (ex7) — image-prompt uses `/images/apfelschorle.png`. Verify image exists.
- Tie `ex2` and `ex9` (the two free-text exercises) to an auto-grader — currently `correctAnswer` is a single string; for free-text you need rubric matching (e.g., accept "Ich heiße Rahul" OR "Mein Name ist Rahul"). Inspect lesson player to confirm matching logic.

---

### Lesson 1-6 — "Formal vs Informal"
**Experience: 3/5** — strong story (Ausländerbehörde), decision points.
**Content: 4/5** — well-targeted for exam and real life.

**Fixes:**
- Add a `speaking` exercise: "Say this aloud in formal register: 'Guten Morgen, Herr Schmidt. Wie geht es Ihnen?'"
- Add a `free-text` exercise: "Your boss asks you to address them with Du. Write a 1-line polite response." Rubric: must include 1st-person + acceptance.
- Add a `dictation` exercise: listen to *"Sehr geehrte Frau Müller"* (formal email opener) and type it — grounds the formal/informal distinction in real writing.

---

## Course-wide action items (systemic)

These are patterns that show up across all 6 lessons — fixing at the pattern level is higher leverage than per-lesson patches.

### 1. Enforce exercise type distribution per lesson
Target mix per lesson (8 exercises):
- 2 × MC (recognition)
- 1 × fill-blank (recognition)
- 1 × matching or ordering (organizational)
- **2 × speaking** (production) ← most missing today
- **1 × dictation or listening** (production) ← mostly missing today
- **1 × free-text or type-answer** (production)

Current M1 reality: ~6 recognition + 1 organizational + 1 production per lesson. Needs flipping.

### 2. Tie every exercise to the lesson's `storyScene`
Every exercise should reference the scene's setting, character (Kuttan / Frau Weber / Lisa / officer), or contextSentence. Current exercises are scene-agnostic worksheets. Low-cost rewrite: just change the question stem — *"How do you say X?"* → *"Kuttan walks into Y and needs to say X — which is right?"*.

### 3. Goethe A1 Wortliste discipline
- Audit every vocab word in M1-M18 against `GOETHE_A1_EXAM_MAP.md`. Flag out-of-scope ones.
- Ensure `Hallo`, `Danke`, `Bitte`, `ja`, `nein`, `hallo`, `Tschüss` are all taught by end of L1-1 (currently they're spread across L1-3 and L1-4).

### 4. Audio asset verification
Several exercises reference `/audio/hoeren/*.mp3` and `/images/*.png`. Before launch, verify each asset exists. Missing asset = broken exercise = quit.

### 5. Lesson length standardization
L1-4 has 3 exercises, L1-1 has 8, L1-5 has 9. Standardize to 7–9 exercises per lesson. Uneven length feels arbitrary.

---

## Priority fix list (suggested order for next session)

**P0 — correctness blockers (30 min)**
- [ ] Fix L1-1 ex4 gender bug (`module-01.ts:178`)
- [ ] Fix L1-3 ex8 typo `Mahnzeit → Mahlzeit` (`module-01.ts:545`)
- [ ] Verify L1-5 `/audio/hoeren/t1-h1-4.mp3` and `/images/apfelschorle.png` exist; if not, generate or remove exercise

**P1 — add missing production exercises (1.5-2 hrs)**
- [ ] L1-1: add 1 speaking exercise
- [ ] L1-2: add 3 speaking exercises (mandatory — lesson is ABOUT sounds)
- [ ] L1-3: replace duplicate ex5 with speaking
- [ ] L1-4: add 5 more exercises (3 lesson is too short)
- [ ] L1-6: add speaking + dictation + free-text (1 each)

**P2 — story tie-ins (1 hr)**
- [ ] Rewrite exercise question stems in L1-1, L1-2, L1-6 to reference their `storyScene` setting/character

**P3 — vocab Wortliste audit (follow-up session)**
- [ ] Systematic cross-check of M1-M18 vocab against Goethe A1 Wortliste; flag out-of-scope; patch missing core words.

---

## Recommendations for course-wide plan updates

These should flow into existing docs:

- **`EXERCISE_QUALITY_RULES.md`** — add a mandatory exercise-type-distribution table (≥3 production per lesson, ≤4 MC/fill).
- **`LESSON_BLUEPRINTS_PRIORITY.md`** — add a "story tie-in" requirement to the blueprint checklist.
- **`A1_CURRICULUM_AUDIT.md`** — append the M1 audit findings and update the overall A1 completeness percentage.
- **`GOETHE_A1_EXAM_MAP.md`** — add a per-lesson Wortliste coverage column.

---

## Docs worth archiving (proposal, move to `docs/archive/`)

Candidates (user should confirm before I move):

- `AI_CINEMATIC_SCRIPTS.md` — superseded by `AI_CINEMATIC_SCRIPTS_V3.md` and `V4.md`.
- `VIDEO_PIPELINE_V3.md` — superseded by `VIDEO_PIPELINE_V4.md`.
- `pilot-video-1-foundation.md` — single-pilot doc; no longer load-bearing once pilot shipped.
- `AI_CINEMATIC_SCRIPTS_V3.md` — probably keep one step older (V3) as reference, but V4 is authoritative. Verify before archiving.

I won't move any of these without explicit approval.

---

## Next session scope (proposed)

Pick one:
- **A)** Apply the P0 + P1 fixes from above (~2 hrs, directly in `module-01.ts`).
- **B)** Skip to M2 audit and batch all M1-M3 fixes after (so patterns are clearer).
- **C)** Set up Remotion now (since you've given style specs) and start generating placeholder videos — fixes can come after.

My recommendation: **A** — M1 is the first impression; correctness blockers (P0) should not wait.
