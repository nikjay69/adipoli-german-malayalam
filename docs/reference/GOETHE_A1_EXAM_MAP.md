# Goethe A1 Mastery Coverage Map — 56-Lesson Contract

Status: **Canonical row-level coverage reference.** Rebuilt 2026-07-17 under DECISIONS #23. Replaces the stale 2026-03 18-module gap map. Product rules live in the source-of-truth docs; this reference makes their per-lesson coverage auditable.

## Purpose and interpretation

This map answers one question before scripts, videos or adaptive routes are frozen:

> Does every essential adult Goethe A1 ability have teaching, useful learner production, closed diagnosis, exact recovery, fresh retesting and later recall somewhere in the 56-lesson course?

The default zero-to-A1 learner completes the 56-lesson spine. Results change scaffolding, repetition, recovery and timing—not the exit standard. A watch event, streak, recognition score or self-reported confidence never proves mastery.

Official anchors checked 2026-07-17:

- Goethe A1 exam/competency overview: `https://www.goethe.de/de/spr/prf.html`
- official adult practice sets: `https://www.goethe.de/en/m/spr/prf/ueb/pa1.html`
- official adult Start Deutsch 1 Wortliste: `https://www.goethe.de/pro/relaunch/prf/sr/A1_SD1_Wortliste_02.pdf`

The official Wortliste describes about 650 entries: all should be passively understood and roughly half should be available actively at this level. Its themes and word groups must be mapped into lessons, practice and SRS; they do not each require a separate video.

## Row contract and status legend

Every row must eventually be machine-validated for: unique ID · outcome · exact source · Goethe/life transfer · required production proof · 1–3 stable tags · level-1 recovery · different level-2 recovery · at least two unseen retests · SRS card set · later spiral point · final video inventory state.

Current evidence codes:

- `SRC` — reusable teaching source exists in current app/course-production inventory.
- `PASS` / `WEAK` — current app source result in `scripts/output/spine-premium-audit.json` (structural floor, not a feel grade).
- `SCRIPT` — current owned script exists; still requires cast/timing/mastery freeze.
- `SCRIPT0` — 56-spine outline/source exists but no current final owned production script.
- `R-GAP` — row emits at least one tag with no exact current recovery card.
- `A-GAP` — required final native audio is missing/unverified or part of the pending batch.
- `C-GAP` — official task-shape/difficulty/scoring calibration or final readiness logic remains unverified.
- `F?` — no evidenced human Feel Rubric grade yet.
- `V0` — no approved launch-complete video master yet.

`PASS` never means launch-ready. Every current row remains `V0`; M2–M8 remain `SCRIPT0`; and all rows remain `F?` until real playthrough evidence exists.

## M1 — First German moment

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M1L1` | Hear a formal greeting and answer aloud without freezing | Sprechen opening + Hören greeting · M1 mission + `lesson-01-video-script.md` | Hear/choose register, then say full reply · `hoeren:greetings`, `sprechen:greeting_reply` | Slower greeting contrast + shadowing → two new teacher greetings → M1L4/M2L7 | `SRC SCRIPT F? V0` |
| `M1L2` | Say and type `Ich lerne Deutsch` and understand course/exam destination | First controlled sentence + learner orientation · M1 source + `lesson-02-video-script.md` | Say/type from memory; distinguish `Deutsch`/`Deutschland` · `schreiben:first_sentence`, `vocab:first_sentence_chunks`, `vocab:deutsch_vs_deutschland` | Phrase build → chunk cards/alternate visual build → new oral+typed sentence → M2L2/M3L6 | `SRC SCRIPT R-GAP F? V0` |
| `M1L3` | Produce/recognise `ch`, `sch`, German `w/v` and first umlaut contrasts | Intelligibility foundation · M1 sounds source + `lesson-03-video-script.md` | Hear contrast, say target words, self-compare recording · `pronunciation:ch_sch`, `pronunciation:w_v` | Mouth-mechanics model → Malayalam/visual alternate → new word pairs A/B → every later speaking gate | `SRC SCRIPT R-GAP F? V0` |
| `M1L4` | Choose and produce the right formal greeting for time/context | Sprechen register + everyday opening · M1 greetings/formality + `lesson-04-video-script.md` | New scenes: hear context, choose, then greet aloud · `sprechen:formality`, `grammar:formal_context`, `vocab:greeting_set` | Timeline/context sort → role-play alternate → unseen context sets → M2L7/M7L3 | `SRC SCRIPT R-GAP F? V0` |
| `M1L5` | Use `bitte`, `danke`, `Entschuldigung` in a real exchange | Polite requests/reactions · M1 politeness + `lesson-05-video-script.md` | Repair wrong phrase and say two polite turns · `sprechen:request_phrase`, `sprechen:formality` | Model/repair drill → scene comic alternate → new café/classroom turns → M4L2/M5L7 | `SRC SCRIPT F? V0` |
| `M1L6` | End an exchange and ask for repetition | Sprechen interaction repair · M1 goodbye + `lesson-06-video-script.md` | Say `Auf Wiedersehen` and `Noch einmal, bitte` after unseen cues · `hoeren:question_recognition`, `sprechen:question_answer` | Cue-response shadowing → slower audio/phrase-build alternate → new exit/repair cues → all listening lessons | `SRC SCRIPT F? V0` |
| `M1L7` | Complete greet → reply → repair → thank → leave as one tiny conversation | Survival oral gate · M1 first-conversation mission + `lesson-07-video-script.md` | Full unseen formal exchange aloud, no missing turn · `sprechen:greeting_reply`, `sprechen:formality`, `sprechen:fluency_pause` | Turn-by-turn rebuild → audio-only alternate → two unseen exchanges → M2L7 and final simulator | `SRC SCRIPT F? V0` |

## M2 — Identity, numbers, time

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M2L1` | Give and spell own name with German letter names | Sprechen Teil 1 · old M2L1 + module-2 missions | Say name, spell it, catch an unfamiliar spelling · `sprechen:spelling`, `vocab:personal_info` | Alphabet audio chunks → visual mouth/letter map → own + unfamiliar names A/B → M7 forms/M8L5 | `SRC SCRIPT0 R-GAP F? V0` |
| `M2L2` | State origin and nationality correctly | Sprechen Teil 1 + form fields · old M2L2 | Say/write origin vs nationality · `vocab:personal_info`, `grammar:verb_position` | Sentence-frame repair → map/role alternate → unseen profiles → M7L1/M8L5 | `SRC SCRIPT0 R-GAP F? V0` |
| `M2L3` | State job/study and languages in complete sentences | Sprechen Teil 1 · old M2L3–4 | Answer two examiner questions aloud · `sprechen:question_answer`, `vocab:personal_info` | Model-answer chunks → question-cue alternate → new personal cards → M6L1/M8L5 | `SRC SCRIPT0 R-GAP F? V0` |
| `M2L4` | Understand/say 0–100 and write phone numbers accurately | Hören details + form transfer · old M3L1–2 | First-play number/phone dictation + spoken number · `hoeren:numbers`, `schreiben:address_date_phone` | Slow grouping drill → waveform/digit alternate → new number/phone sets → M4L5/M7L2 | `SRC WEAK SCRIPT0 R-GAP A-GAP F? V0` |
| `M2L5` | Understand/say clock time, days and months | Hören time details · old M3L3–4 | Catch appointment time/day; say a time · `hoeren:time_dates`, `vocab:numbers_time` | Clock build → calendar alternate → new appointments A/B → M5L3/M6L6 | `SRC WEAK SCRIPT0 F? V0` |
| `M2L6` | Give/read dates and birthday; understand appointment language | Form + Hören transfer · old M3L5–6 | Write TT.MM.JJJJ and catch date from audio · `schreiben:address_date_phone`, `hoeren:time_dates` | Form/date repair → calendar/audio alternate → new date tasks → M5L5/M7L1 | `SRC WEAK SCRIPT0 R-GAP A-GAP F? V0` |
| `M2L7` | Deliver a complete self-introduction and answer personal questions | Sprechen Teil 1 gate · old M2L5 + module-2 final mission | Full intro aloud + spelling + two unseen questions · `sprechen:self_intro`, `sprechen:question_answer`, `sprechen:fluency_pause` | Chunk ladder → prompt-card alternate → new examiner sets → M4L3/M6L4/M8L5 | `SRC SCRIPT0 F? V0` |

## M3 — People, home, daily life

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M3L1` | Name family members and say six true family sentences | Sprechen topic cards · old M4L1/M4L5 | Describe family aloud from an unseen photo cue · `vocab:family_home`, `sprechen:question_answer` | Family map → photo-story alternate → new family cards → M6L4/M8L6 | `SRC WEAK SCRIPT0 F? V0` |
| `M3L2` | Describe a person’s age, job and simple qualities | Sprechen/Lesen profiles · old M4L2 | Read profile, then describe another person aloud · `vocab:family_home`, `grammar:verb_ending` | Profile chunks → portrait-cue alternate → new profiles A/B → M6L1/M8 reading | `SRC WEAK SCRIPT0 F? V0` |
| `M3L3` | Use high-frequency `der/die/das` patterns in meaningful sentences | Production grammar control · old M4L4 | Repair articles and use nouns in spoken sentences · `grammar:articles` | Noun-family grouping → scene-object alternate → new nouns A/B → M4L7/M7 forms | `SRC WEAK SCRIPT0 F? V0` |
| `M3L4` | Use `mein/meine`, `dein/deine` for people/things | Speaking/writing accuracy · old M4L3 | Repair possessives; describe own/another family · `grammar:possessives` | Ending pattern → ownership-scene alternate → new family/home prompts → M7 forms | `SRC WEAK SCRIPT0 F? V0` |
| `M3L5` | Name rooms/furniture and locate basic things | Wohnen Wortliste + reading/listening · old M8L1–2 | Hear/read a room clue and say where an item is · `vocab:family_home`, `lesen:signs` | Label room → visual map alternate → unseen floorplans → M7L5/M8 reading | `SRC WEAK SCRIPT0 F? V0` |
| `M3L6` | Conjugate common present-tense verbs in a real daily routine | All productive sections · old M5L1–2 | Say/type five-line routine · `grammar:verb_ending`, `grammar:verb_position` | Verb-ending repair → timeline alternate → new routine persona → M6L2/M8 writing | `SRC WEAK SCRIPT0 F? V0` |
| `M3L7` | Describe a week using separable verbs and correct word order | Speaking topic cards + messages · old M5L3–5 | One-minute week routine + written plan · `grammar:verb_position`, `vocab:work_hobbies` | Sentence rebuild → clock/timeline alternate → new week prompts → M6L4–6/M8L6 | `SRC WEAK SCRIPT0 F? V0` |

## M4 — Food, shopping, money

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M4L1` | Understand and actively use core food/drink vocabulary | Sprechen topic + menus · old M6L1–2 | Hear/read order items; say own choices · `vocab:food_shopping` | Audio recall → menu-picture alternate → new menu sets → M4L2/M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M4L2` | Order politely with `Ich hätte gern` / `Ich nehme` | Sprechen Teil 3 · old M6L3 | Complete waiter dialogue aloud · `sprechen:request_phrase`, `sprechen:formality` | Model/shadow → phrase-build alternate → new restaurant cards → M5L7/M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M4L3` | Express likes/dislikes with `gern`, `mag`, `nicht/kein` | Sprechen Teil 2 · old M6L4 | Answer/ask food preference questions · `grammar:negation`, `sprechen:question_answer` | Contrast repair → reaction-scene alternate → new topic cards → M6L4/M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M4L4` | Buy supermarket items using quantities | Shopping/listening transfer · old M7L1 | Request three quantities and match a short list · `vocab:food_shopping`, `sprechen:request_phrase` | Quantity drill → basket visual alternate → new shopping lists → M5 services | `SRC PASS SCRIPT0 F? V0` |
| `M4L5` | Catch, say and write prices/currency accurately | Hören + Lesen detail · old M7L2 | First-play price dictation + ad detail · `hoeren:prices`, `lesen:time_price_detail` | Slow price pairs → receipt alternate → new price sets → M7L6/M8 Hören | `SRC PASS SCRIPT0 R-GAP A-GAP F? V0` |
| `M4L6` | Handle colours/clothing and a simple shopping exchange | Lesen ads + Sprechen · old M7L3–4 | Match need to item, then ask/buy aloud · `lesen:ads`, `vocab:food_shopping` | Ad scan → fitting-room alternate → new ads/dialogues → M7L6/M8 Lesen | `SRC PASS SCRIPT0 F? V0` |
| `M4L7` | Use `ein/eine/einen` in survival buying sentences | Productive grammar · old M6L5 | Repair and say new order sentences · `grammar:accusative_survival`, `grammar:articles` | Colour-coded phrase build → role-play alternate → new objects A/B → M5 requests | `SRC PASS SCRIPT0 F? V0` |

## M5 — Travel, services, health

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M5L1` | Understand transport words and buy a ticket | Hören/Lesen public life + Sprechen request · old M9L1–2 | Read timetable; request correct ticket aloud · `vocab:travel_health`, `sprechen:request_phrase` | Route/ticket chunks → kiosk visual alternate → new journeys → M8 listening | `SRC PASS SCRIPT0 F? V0` |
| `M5L2` | Ask for and follow simple directions | Sprechen Teil 2/3 + Hören · old M9L3 | Ask route and trace heard directions · `grammar:question_order`, `sprechen:question_answer` | Question build → map alternate → unseen routes A/B → M7 office | `SRC PASS SCRIPT0 R-GAP F? V0` |
| `M5L3` | Extract platform, time, place and delay from announcements | Hören Teil 1/3 · old M9L4 | First-play announcement details · `hoeren:announcements`, `hoeren:time_dates` | Transcript-hidden replay → station-board alternate → new announcements → M7L2/M8L2 | `SRC PASS SCRIPT0 A-GAP F? V0` |
| `M5L4` | Use `können/müssen/möchten` in survival requests | Speaking/writing control · old M9L5 | Repair modal order; say two requests · `grammar:modal_word_order`, `sprechen:request_phrase` | Verb-frame drill → phrase animation alternate → new service scenes → M7L3/M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M5L5` | Make/change an appointment, catch its details and transfer them into a mini-form | Hören detail + message/form transfer · old M3L6/M10 context | Phone role-play + date/time/service fields · `hoeren:time_dates`, `sprechen:request_phrase`, `schreiben:form_fields` | Appointment script → calendar/audio-form alternate → new calls/forms A/B → M7 forms | `SRC PASS SCRIPT0 A-GAP F? V0` |
| `M5L6` | Name body parts and state basic symptoms | Sprechen topic/service · old M10L1–2 | Say symptoms; understand doctor question · `vocab:travel_health`, `sprechen:question_answer` | Body map → symptom-card alternate → new patient profiles → M5L7/M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M5L7` | Complete doctor/pharmacy requests and emergency basics | Sprechen Teil 3 · old M10L3–5 | Two polite requests + understand response · `sprechen:request_phrase`, `sprechen:formality`, `vocab:travel_health` | Model/shadow → situation-card alternate → new doctor/pharmacy cards → M7/M8 simulator | `SRC PASS SCRIPT0 F? V0` |

## M6 — Work, study, free time, messages

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M6L1` | State profession/study path and understand simple notices | Sprechen Teil 1/2 + Lesen ads · old M11L1 | Read course/job notice; speak own profile · `vocab:work_hobbies`, `lesen:ads` | Notice scan → profile-card alternate → new notices → M7L6/M8 reading | `SRC PASS SCRIPT0 F? V0` |
| `M6L2` | Describe a work/study day | Speaking + writing production · old M11L2 | Say/type daily work routine · `vocab:work_hobbies`, `grammar:verb_position` | Timeline rebuild → audio-day alternate → new persona → M8 writing/speaking | `SRC PASS SCRIPT0 F? V0` |
| `M6L3` | Talk simply about skills and needs | Sprechen personal/topic cards · old M11L4–5 A1-safe subset | Answer work/study questions aloud · `sprechen:question_answer`, `vocab:work_hobbies` | Answer frames → interview-card alternate → new questions → M8L5–6 | `SRC PASS SCRIPT0 F? V0` |
| `M6L4` | Ask/answer hobby and free-time questions | Sprechen Teil 2 · old M12L1 | Five random topic-card exchanges · `sprechen:question_answer`, `vocab:work_hobbies` | W-question drill → image-card alternate → new cards A/B → M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M6L5` | Understand weather/seasons and choose a plan | Hören/Lesen daily details · old M12L2 | Catch forecast; say suitable plan · `hoeren:dialogue_detail`, `vocab:work_hobbies` | Forecast chunks → icon timeline alternate → new forecasts → M8 Hören | `SRC PASS SCRIPT0 A-GAP F? V0` |
| `M6L6` | Make/respond to a simple invitation with time/place | Schreiben + Sprechen · old M12L3–4 | Read invitation, reply aloud and write details · `lesen:emails`, `schreiben:greeting_closing` | Message anatomy → calendar-chat alternate → new invites → M6L7/M8 writing | `SRC PASS SCRIPT0 F? V0` |
| `M6L7` | Write a ~30-word message covering all three points | Schreiben Teil 2 gate · old M11L3/M12L4/M18L2 | Timed new prompt, all points, rubric ≥3/5 · `schreiben:three_points`, `schreiben:greeting_closing`, `schreiben:word_order` | Model rebuild → checklist/colour alternate → unseen prompts A/B → M7/M8 timed writing | `SRC PASS SCRIPT0 F? V0` |

## M7 — Official life and exam skills

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M7L1` | Fill personal/official fields accurately | Schreiben Teil 1 + Lesen forms · old M14L1 | Two unseen forms, correct field meaning · `schreiben:form_fields`, `lesen:forms`, `schreiben:address_date_phone` | Field-label repair → data-card alternate → new forms A/B → M8L4 | `SRC PASS SCRIPT0 R-GAP F? V0` |
| `M7L2` | Transfer spoken personal details into a form | Hören→Schreiben transfer · M14L1/M17 listening | Fill unseen audio form first/second play · `hoeren:audio_to_form`, `hoeren:numbers` | Slow segmented audio → speaker/data-grid alternate → new audio forms → M8 mocks | `SRC PASS SCRIPT0 A-GAP F? V0` |
| `M7L3` | Request appointment/document/signature politely | Sprechen Teil 3 + public life · old M14L2 | Three office requests aloud · `sprechen:request_phrase`, `sprechen:formality`, `vocab:official_exam` | Office phrase build → counter-role alternate → new office cards → M8L6 | `SRC PASS SCRIPT0 F? V0` |
| `M7L4` | Handle bank/admin service basics | Reading/forms + Sprechen · old M14L3 | Understand field/notice and make service request · `lesen:forms`, `vocab:official_exam` | Service vocabulary → document visual alternate → new bank/admin scene → M8 reading | `SRC PASS SCRIPT0 F? V0` |
| `M7L5` | Scan signs/notices quickly and act correctly | Lesen Teil 1 · old M17L4 | Timed unseen sign-situation matches · `lesen:signs`, `lesen:scanning` | Key-word scan → icon/context alternate → unseen sign sets A/B → M8L3 | `SRC PASS SCRIPT0 F? V0` |
| `M7L6` | Match needs to ads/short information under time | Lesen Teil 2 · old M17L5 | Timed unseen ads, evidence highlighted · `lesen:ads`, `lesen:time_price_detail`, `lesen:scanning` | Need-word marking → layout scan alternate → new ad sets → M8L3 | `SRC PASS SCRIPT0 R-GAP F? V0` |
| `M7L7` | Read emails/messages for purpose, detail and action | Lesen Teil 3 · old M17L5 | Timed unseen messages, who/when/where/action · `lesen:emails`, `lesen:scanning` | Message skeleton → inbox-card alternate → new emails A/B → M8L3/L4 | `SRC PASS SCRIPT0 F? V0` |

## M8 — Goethe A1 bootcamp

| ID | Non-skippable learner outcome | Goethe/life transfer + source | Closed proof and primary tags | Recovery → unseen retests → spiral | Current status |
|---|---|---|---|---|---|
| `M8L1` | Understand exam sections, instructions, timing and closed-test rules | Whole-exam execution · old M17L1 | Match instructions to actions; run timed setup · `vocab:official_exam` | Instruction-language drill → paper walk-through alternate → new instruction set → all mocks | `SRC PASS SCRIPT0 C-GAP F? V0` |
| `M8L2` | Execute Hören Teile 1–3 under exam conditions | Hören exam section · old M17L2–3/L6 + mocks | Timed unseen section, tagged by Teil · `hoeren:announcements`, `hoeren:dialogue_detail`, `hoeren:question_words` | Failed-Teil transcript-hidden drill → slower contrast alternate → new Teil bank → next full mock | `SRC PASS SCRIPT0 R-GAP A-GAP C-GAP F? V0` |
| `M8L3` | Execute Lesen Teile 1–3 under exam conditions | Lesen exam section · old M17L4–6 + mocks | Timed unseen section, tagged by Teil · `lesen:signs`, `lesen:ads`, `lesen:emails`, `lesen:scanning` | Failed-Teil scan drill → layout/evidence alternate → new Teil bank → next full mock | `SRC PASS SCRIPT0 C-GAP F? V0` |
| `M8L4` | Complete form + ~30-word message inside 20 minutes | Schreiben Teile 1–2 · old M18L1–2 + mocks | New timed form/message; all points; rubric ≥3/5 · `schreiben:form_fields`, `schreiben:three_points`, `schreiben:word_order` | Model rebuild → checklist alternate → new prompts A/B → next full mock | `SRC PASS SCRIPT0 C-GAP F? V0` |
| `M8L5` | Deliver Sprechen Teil 1 self-intro/spelling under 60 seconds | Sprechen Teil 1 · old M18L3 + simulator | New examiner sequence, rubric ≥3/5 · `sprechen:self_intro`, `sprechen:spelling`, `sprechen:fluency_pause` | Shadow/record → prompt-fade alternate → new examiner sets → next simulator day | `SRC PASS SCRIPT0 C-GAP F? V0` |
| `M8L6` | Ask/answer topic cards and make/respond to polite requests | Sprechen Teile 2–3 · old M18L4–5 + simulator | Random unseen cards, both roles, each Teil ≥3/5 · `sprechen:question_answer`, `sprechen:request_phrase`, `sprechen:formality` | Pattern drill → visual-card role-play alternate → new card banks → next simulator day | `SRC PASS SCRIPT0 C-GAP F? V0` |
| `M8L7` | Complete/debrief full mocks and follow a weakest-first 7-day plan | Final A1 Ready decision · old M18L6–7 + 8 internal mocks | Two distinct mocks ≥75, no section <60; speaking/writing evidence complete; all tags secure · all skill tags | Exact weakest-tag recovery → alternate support → weak-section retest/new full mock; SRS continues to exam day | `SRC PASS SCRIPT0 C-GAP F? V0` |

## Official Wortliste theme coverage

This is the theme-level audit. A separate machine-readable lemma ledger must replace the repo's small hand-written `scripts/check-wortliste.js` list before content freeze.

| Official theme/group | Primary 56-lesson home | Current verdict |
|---|---|---|
| Person: name, address, phone, birth, age, gender, family status/relationships, nationality/origin, appearance, habits | M2, M3, M7 | Strong spine coverage; verify full passive vocabulary and form variants |
| Wohnen: rooms, furniture, household equipment, rent/moving | M3L5, M7 reading | Core room/home covered; rent/moving and technical household vocabulary need lemma audit/SRS support |
| Umwelt: plants, animals, climate/weather | M3 family/home context, M6L5 | Weather/animals appear; spot check found no explicit `Pflanze` inventory—add passive SRS/reading coverage if confirmed |
| Reisen/Verkehr: private/public transport, travel, accommodation, luggage | M5L1–3 | Transport/luggage strong; spot check found no explicit `Unterkunft`—verify accommodation set |
| Essen/Trinken | M4L1–5 | Strong |
| Einkaufen/Gebrauchsartikel: shops, price/payment, food, clothing | M4L4–7 | Strong |
| Dienstleistungen: post, telecom, banks, police | M5L7, M7L3–4 | Post/bank/police appear; telecom theme needs explicit audit/support |
| Erziehung/Ausbildung/Lernen: childcare, school, language learning | M1L2, M2L3, M6L1–3 | School/language learning covered; `Kindergarten/Kinderbetreuung` not found in spot check—verify passive coverage |
| Arbeit/Beruf: workplace, holiday | M2L3, M6L1–3 | Strong core; verify `Urlaub` active/passive distribution |
| Freizeit/Unterhaltung: interests, sport, media, internet, reading/press | M6L4–6, M7 reading | Core hobbies/media appear; full lemma audit still required |
| Word groups: numbers/date/time, days/months/seasons, currency, measures/weights, countries/nationalities, colours, directions | M2, M4, M5, M6 | Broad coverage; measures/weights and directions require explicit active/passive ledger |

## Gap register — launch blockers, not optional polish

| ID | Evidence at 2026-07-17 | Required closure |
|---|---|---|
| `G-01 Recovery orphans` | 51 tags emitted by current module checkpoints; 10 have no exact recovery card | 0 emitted tags without level-1 recovery + different level-2 recovery + two fresh retests |
| `G-02 Early foundation quality` | `47 PASS / 19 WEAK / 0 FAIL`; all 19 WEAK are in current spine M2/M3 sources | Clear every structural WEAK and obtain real Feel Rubric evidence before those scripts freeze |
| `G-03 Video scripts` | M1 has seven structurally reviewed drafts; M2–M8 only outlines/reusable legacy source | Current 56-row script/recording inventory; each row mastery-frozen before recording |
| `G-04 M1 freeze debt` | Legacy cast names remain; draft targets range 12–30 min against a 15–18 min target | Cast migration, exact German review, honest rebudget; cut/split overlong work and never pad a complete shorter lesson; mastery artifact match |
| `G-05 Audio` | ROADMAP records 59 pending files; reviewable German may not use browser TTS | 0 pending audio; transcript/native model match; no SpeechSynthesis on graded path |
| `G-06 Wortliste` | Current script checks a small hand-written subset, not official ~650-entry inventory; theme spot checks found probable holes | Official lemma/theme ledger mapped to lesson, passive/active target, SRS and evidence; no unexplained missing core entry |
| `G-07 Official calibration` | Eight internal mocks exist but have not been documented against the three current official adult practice sets | Task-shape, timing, difficulty and scoring comparison; correct mismatches before `A1 Ready` ships |
| `G-08 Readiness logic` | Current checkpoint code can pass on lower/single-mock evidence than PRODUCT_VISION | Code/UI enforce two distinct ≥75 mocks, no section <60, full speaking on two days, writing/form proof, all tags secure |
| `G-09 SRS/spiral` | SM-2 exists globally; no durable row-level 56-lesson return ledger | Every row has exported cards and named later sample; overdue supporting tags visible and mandatory |
| `G-10 Human feel` | Structural audit has no evidenced `feel` values for its 66 source lessons | 390px/audio-on playthrough grades; no FLAT spine lesson; M1/M2 ADIPOLI before scale |
| `G-11 Video delivery` | 0/56 launch-complete video masters | DECISIONS #22 inventory reports 56/56 with captions/audio/QC/manifest/protected delivery/mobile playback |

## “Done once” maintenance rule

This mapping exercise is not repeated from scratch. The 56 IDs and outcomes are stable. Later work updates the status/evidence of the affected rows only. Adding a new core outcome requires a DECISIONS entry and first asks whether an existing row should be improved rather than increasing course length. Pilot evidence may refine examples, recovery strength or token distribution, but it may not silently lower the common A1 exit standard.
