# EXAM_PREP_DESIGN.md — Goethe A1 (Start Deutsch 1) Training System

Status: **Source of truth.** Established 2026-06-11. Absorbs the test-and-recovery system from the archived `A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md`. Exam format reference: `reference/GOETHE_A1_EXAM_MAP.md`.

## Exam facts (anchor)

Start Deutsch 1: Hören 3 Teile (~20m, 25P) · Lesen 3 Teile (~25m, 25P) · Schreiben 2 Teile (form + 30-word message, ~20m, 25P) · Sprechen 3 Teile (intro/word cards/requests, ~15m, 25P). Pass = 60/100. **8 full mock tests already exist** in `src/lib/content/goethe-tests.ts` (~360 questions, exact format).

## Per-skill training design

| Skill | Learner goal | MVP practice | Premium (later) | Feedback | Readiness check |
|---|---|---|---|---|---|
| **Hören** | Catch key info from slow clear German, 2 plays | Dictation + R/F + matching per module · announcements (M5+) · audio-to-form (M7) · mock Hören sections | Accent/noise variants | Auto-scored + tags | Mock Hören ≥18/25 |
| **Lesen** | Signs, ads, short emails, scanning under time | Per-module reading drills · timed Lesen from M7 · mock Lesen sections | Inference items | Auto-scored + tags | Mock Lesen ≥18/25 |
| **Schreiben** | Forms error-free; 30-word email hitting 3 Inhaltspunkte | Form drills (M2/M5/M7) · guided email builder with model answers (M6+) | Gemini rubric scoring (capped) | Checklist self-score vs model; rubric below | 2 forms error-free + 3 messages with all points |
| **Sprechen** ⚠ | Teil 1 intro, Teil 2 word-card Q&A, Teil 3 requests — without fear | Shadowing every module · **speaking simulator**: examiner audio → pause → learner answers aloud → model answer + optional speech-eval score | Live partner/tutor slots | Self-compare + Web Speech/Gemini eval (capped) | Simulator completed for all 3 Teile twice; intro fluent <60s |

Common Malayali mistakes to train against: v/w confusion · ö/ü vowels · English letter names while spelling · `Ich bin komme` · verb-second violations · du/Sie register · article omission/overuse (`Ich bin ein Lehrer` → `Ich bin Lehrer`).

## Checkpoint mechanics

Closed-book always (no Google/YouTube/ChatGPT/notes/dictionary — diagnosis, not score-cheating). Every wrong item emits 1–3 weakness tags. Cadence and thresholds: see `A1_COURSE_ARCHITECTURE.md`.

## Weakness tags (stable IDs — the app prescribes by tag, no AI required)

- `hoeren:` greetings · numbers · time_dates · prices · announcements · dialogue_detail · question_words · audio_to_form
- `lesen:` signs · ads · emails · forms · scanning · time_price_detail · question_words
- `schreiben:` form_fields · address_date_phone · three_points · greeting_closing · word_order · articles · too_long_or_b2 · missing_required_info
- `sprechen:` self_intro · spelling · question_answer · request_phrase · pronunciation_blocker · fluency_pause · formality · incomplete_answer
- `grammar:` verb_position · verb_ending · articles · accusative_survival · negation · modal_word_order · possessives · question_order
- `vocab:` module_core · personal_info · numbers_time · family_home · food_shopping · travel_health · work_hobbies · official_exam

## Scoring rubrics (manual scoring is acceptable; AI optional)

**Writing (5-point, forms + messages):** 5 strong A1 (all info, minor errors) · 4 pass (all info, some errors) · 3 weak pass (one small weakness, meaning intact) · 2 recovery (missing point or repeated structural errors) · 1 not pass (meaning unclear) · 0 no valid attempt. **Auto-fail:** missing one of the 3 Inhaltspunkte · wrong field content where meaning matters · text far above A1 (copied/AI feel).

**Speaking (5-point, intro/cards/requests):** 5 complete + understandable + correct formality · 4 complete with minor issues · 3 hesitant/one detail incomplete · 2 missing info / wrong pattern / formality confusion · 1 examiner couldn't understand · 0 no attempt. Evidence options: self-check vs model audio · recorded clip for review · speech-eval transcript.

**Result logic:** `pass` all thresholds · `weak_pass` one non-critical tag low, no production fail · `recovery_required` production fail / section below threshold / same tag fails twice · `manual_review_needed` writing/speaking unscoreable by rule.

## Recovery prescriptions (exact and short — never "revise more")

Default patterns by skill, always ending in a retest of the failed tag only:

- **Hören**: rewatch matching recovery clip 6–10m → one focused drill 10–15 items → retest tag. E.g. `hoeren:numbers`: replay Numbers 0–100 (8m) → write 15 heard numbers → retest 8 phone numbers.
- **Lesen**: scanning-strategy clip 5–8m → one timed same-type drill → retest with new text. E.g. `lesen:ads`: underline need-words, match 8 ads → retest 4.
- **Schreiben**: rebuild one model answer from chunks → write one new answer with strict checklist → rubric score → retest. E.g. `schreiben:three_points`: mark the 3 points → write a 30-word SMS → retest new prompt.
- **Sprechen**: model audio → shadow 5–10 lines → record/say target again → retest new card. E.g. `sprechen:spelling`: alphabet micro-drill → spell own name + email → retest unfamiliar name.
- **Grammar**: one micro-lesson ≤8m for the exact tag → repair 10 sentences → use pattern in one spoken/written output → retest inside a real A1 task.
- **Vocab**: 15–25 tagged words with audio → active recall → use 8 in sentences → mixed retest. Recall + production, never passive re-reading.

## Score boosters & external resources (assigned like medicine, not dumped like a library)

Allowed: one selected public video/audio/worksheet per weakness · Goethe-style sample papers · extra speaking/writing prompt sets. Rules: one resource at a time · every resource has target tag + expected output + time box · ≤3 booster options on a page, default one · timestamp ranges for anything >20m · never a channel/playlist/search dump · framing stays Adipoli-Manglish. Good: "Watch 06:10–13:45 of the number-listening video, then write 15 heard numbers. 15m." Bad: "Watch these 12 YouTube videos."

## Final 7-day exam plan (issued after the final mock)

Day 7→1: one skill per day, weakest (by tag history) first · 20-min sessions · day 2 = full timed mock #3 if `risky` · day 1 = light review + logistics (documents, route, exam-day script: greeting the examiner, `Wie bitte?`, `Noch einmal, bitte`). Output: printable/at-a-glance checklist in the app.
