# EXAM_PREP_DESIGN.md — Goethe A1 (Start Deutsch 1) Training System

Status: **Source of truth.** Established 2026-06-11. Absorbs the test-and-recovery system from the archived `A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md`. Exam format reference: `reference/GOETHE_A1_EXAM_MAP.md`.

## Exam facts (anchor)

Start Deutsch 1: Hören 3 Teile (~20m, 25P) · Lesen 3 Teile (~25m, 25P) · Schreiben 2 Teile (form + 30-word message, ~20m, 25P) · Sprechen 3 Teile (intro/word cards/requests, ~15m, 25P). Pass = 60/100. **8 internal full mocks already exist** in `src/lib/content/goethe-tests.ts` (~360 questions). They are substantial practice inventory, but they do not count as exam-realistic until calibrated against the current official adult specification and practice sets.

Official calibration anchors (checked 2026-07-17):

- exam and competency overview: `https://www.goethe.de/de/spr/prf.html`
- official adult A1 practice sets: `https://www.goethe.de/en/m/spr/prf/ueb/pa1.html`
- official adult Start Deutsch 1 Wortliste: `https://www.goethe.de/pro/relaunch/prf/sr/A1_SD1_Wortliste_02.pdf` (~650 entries; all passive, roughly half active at A1 according to its introduction)

## Per-skill training design

| Skill | Learner goal | MVP practice | Premium (later) | Feedback | Readiness check |
|---|---|---|---|---|---|
| **Hören** | Catch key info from slow clear German, 2 plays | Dictation + R/F + matching per module · announcements (M5+) · audio-to-form (M7) · mock Hören sections | Accent/noise variants | Auto-scored + tags | Both readiness mocks ≥60% in Hören; at least one ≥18/25 |
| **Lesen** | Signs, ads, short emails, scanning under time | Per-module reading drills · timed Lesen from M7 · mock Lesen sections | Inference items | Auto-scored + tags | Both readiness mocks ≥60% in Lesen; at least one ≥18/25 |
| **Schreiben** | Forms error-free; 30-word email hitting 3 Inhaltspunkte | Form drills (M2/M5/M7) · guided email builder with model answers (M6+) | Gemini rubric scoring (capped) | Checklist self-score vs model; rubric below | 2 forms error-free + 3 messages with all points |
| **Sprechen** ⚠ | Teil 1 intro, Teil 2 word-card Q&A, Teil 3 requests — without fear | Shadowing every module · **speaking simulator**: examiner audio → pause → learner answers aloud → model answer + optional speech-eval score | Live partner/tutor slots | Self-compare + Web Speech/Gemini eval (capped) | Full simulator completed on two different days; intro fluent <60s; no Teil below rubric 3/5 |

Common Malayali mistakes to train against: v/w confusion · ö/ü vowels · English letter names while spelling · `Ich bin komme` · verb-second violations · du/Sie register · article omission/overuse (`Ich bin ein Lehrer` → `Ich bin Lehrer`).

## Checkpoint mechanics

Closed-book always (no Google/YouTube/ChatGPT/notes/dictionary — diagnosis, not score-cheating). Every wrong item emits 1–3 weakness tags. Cadence and thresholds: see `A1_COURSE_ARCHITECTURE.md`.

### Adaptive mastery routing

Tests decide the next learning action, not the learner's worth and not a lower personal standard.

| Evidence | State | Required route |
|---|---|---|
| ≥70%, all required production complete, no failed core tag | `secure` | Continue; schedule SRS + later spiral sample |
| Supporting tag weak, but no core/production failure | `supported_progress` | Continue with mandatory recovery due before the next relevant gate |
| Core tag failed, production missing/<3, repeated tag failure, or section below its floor | `recovery_required` | Lock the prerequisite; prescribe exact recovery; fresh-item tag retest |
| Writing/speaking evidence cannot be judged by deterministic rubric | `manual_review_needed` | Preserve attempt; use human/self-rubric review; never award automatic mastery |

Recovery escalation is deterministic and works at €0 AI budget:

1. **First miss:** short same-concept reteach → guided drill → one useful output → unseen retest A.
2. **Second miss:** different explanation/modality (slower audio, visual phrase build, Malayalam bridge, smaller step or worked model) → unseen retest B.
3. **Third unresolved miss:** strongest approved support path (extended recovery set and, if available, human review); keep the prerequisite blocked. Never loop the identical quiz and never silently mark complete.

Retest items share the target tag and difficulty band but not the original wording, order, audio or answer surface. A tag becomes secure only from the latest closed evidence. Supporting tags can remain due temporarily; all must be cleared before **A1 Ready**.

## Weakness tags (stable IDs — the app prescribes by tag, no AI required)

- Hören: `hoeren:greetings` · `hoeren:numbers` · `hoeren:time_dates` · `hoeren:prices` · `hoeren:announcements` · `hoeren:dialogue_detail` · `hoeren:question_words` · `hoeren:question_recognition` · `hoeren:audio_to_form`
- Lesen: `lesen:signs` · `lesen:ads` · `lesen:emails` · `lesen:forms` · `lesen:scanning` · `lesen:time_price_detail` · `lesen:question_words` · `lesen:greeting_recognition`
- Schreiben: `schreiben:first_sentence` · `schreiben:form_fields` · `schreiben:address_date_phone` · `schreiben:three_points` · `schreiben:greeting_closing` · `schreiben:word_order` · `schreiben:articles` · `schreiben:too_long_or_b2` · `schreiben:missing_required_info`
- Sprechen: `sprechen:greeting_reply` · `sprechen:self_intro` · `sprechen:spelling` · `sprechen:question_answer` · `sprechen:request_phrase` · `sprechen:pronunciation_blocker` · `sprechen:fluency_pause` · `sprechen:formality` · `sprechen:incomplete_answer`
- Pronunciation: `pronunciation:ch_sch` · `pronunciation:w_v` · `pronunciation:umlauts`
- Grammar: `grammar:verb_position` · `grammar:verb_ending` · `grammar:articles` · `grammar:accusative_survival` · `grammar:negation` · `grammar:modal_word_order` · `grammar:possessives` · `grammar:question_order` · `grammar:capitalisation_basics` · `grammar:formal_context`
- Vocabulary: `vocab:module_core` · `vocab:greeting_set` · `vocab:first_sentence_chunks` · `vocab:deutsch_vs_deutschland` · `vocab:personal_info` · `vocab:numbers_time` · `vocab:family_home` · `vocab:food_shopping` · `vocab:travel_health` · `vocab:work_hobbies` · `vocab:official_exam`

**Coverage law:** every tag emitted by a shipping checkpoint or mini-check must have an exact recovery card and at least two fresh retest variants. The 2026-07-17 audit found 10 emitted tags without an exact recovery: `grammar:capitalisation_basics`, `grammar:question_order`, `hoeren:question_words`, `lesen:time_price_detail`, `pronunciation:ch_sch`, `pronunciation:w_v`, `schreiben:address_date_phone`, `vocab:first_sentence_chunks`, `vocab:greeting_set`, `vocab:personal_info`. These are launch-blocking content gaps until closed and automatically checked.

## Scoring rubrics (manual scoring is acceptable; AI optional)

**Writing (5-point, forms + messages):** 5 strong A1 (all info, minor errors) · 4 pass (all info, some errors) · 3 weak pass (one small weakness, meaning intact) · 2 recovery (missing point or repeated structural errors) · 1 not pass (meaning unclear) · 0 no valid attempt. **Auto-fail:** missing one of the 3 Inhaltspunkte · wrong field content where meaning matters · text far above A1 (copied/AI feel).

**Speaking (5-point, intro/cards/requests):** 5 complete + understandable + correct formality · 4 complete with minor issues · 3 hesitant/one detail incomplete · 2 missing info / wrong pattern / formality confusion · 1 examiner couldn't understand · 0 no attempt. Evidence options: self-check vs model audio · recorded clip for review · speech-eval transcript.

**Result logic:** `secure` all thresholds + no failed core tag · `supported_progress` one supporting tag due, no core or production fail · `recovery_required` core/production fail, section below threshold, or same tag fails twice · `manual_review_needed` writing/speaking unscoreable by rule.

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

## Final A1 Ready gate

The app may say **A1 Ready** only when all conditions are true:

- all eight module gates complete and every core tag secure;
- no supporting weakness tag remains overdue;
- two distinct full timed mocks score ≥75/100, with no section below 60%;
- at least one Hören and one Lesen section score ≥18/25;
- two error-free form tasks and three timed ~30-word messages include all required points at rubric ≥3/5;
- full Sprechen Teile 1–3 completed on two different days, each Teil ≥3/5, self-intro under 60 seconds;
- readiness evidence was produced closed-book; no AI score is the sole gatekeeper.

Before pilot, the internal mocks and scoring bands receive a documented comparison against the three current official adult practice sets. Material that is easier, differently shaped or ambiguously scored is corrected before the readiness label ships.
