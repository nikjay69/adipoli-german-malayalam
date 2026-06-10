# M2 + M3 Setting Audit

Date: 2026-04-14
Status: Partial — L2-1 and L2-5 rewritten in this session. Remaining 9 lessons have proposed Kerala settings below; full storyScene rewrites deferred to next session.

---

## The problem

All 11 lessons in Modules 2 and 3 are currently set in **Germany** (Berlin, Frankfurt), contradicting `docs/A1_STORY_BIBLE.md` which says A1 stays entirely in Kerala.

## Setting swap plan (authoritative)

| Lesson | Current setting | Proposed Kerala setting | Status |
|---|---|---|---|
| **L2-1** Names & Spelling | WG Interview, Berlin-Kreuzberg | **Goethe-Institut Kochi — Day 5 Icebreaker.** Paired with Akhil (software eng from Trivandrum) for name exchange + buchstabieren. | ✅ Rewritten |
| **L2-2** Origin & Nationality | Zum goldenen Hirschen Kneipe, Berlin | **Kaffa Café, Kochi — Saturday language-exchange meetup.** Malayali + expat group shares origin stories. Kuttan meets Sofia (Spanish expat living in Kochi) and Arjun (Keralite returning from Munich). | ⏳ Deferred |
| **L2-3** Professions & sein | TU Berlin Mensa (Cafeteria) | **Thrissur home — older sister's friend group visits for tea.** Engineers, nurses, a journalist, a homemaker. Kuttan practices saying what everyone does in German. | ⏳ Deferred |
| **L2-4** Languages You Speak | Mauerpark, Berlin | **Goethe Kochi courtyard during the long break.** Classmates casually compare how many languages they speak — Malayalam, Tamil, Hindi, English, a few now speak German. | ⏳ Deferred |
| **L2-5** Full Self-Intro | Frankfurt Airport Terminal 1 | **Goethe-Institut Kochi — Mock Consulate, Month 2.** Dr. Bauer returns for a full dress-rehearsal interview combining name, origin, profession, languages. | ✅ Rewritten |
| **L3-1** Numbers 0–20 | Lidl Supermarket checkout, Germany | **Supermarket ("More") in Thrissur.** Cashier calls prices in English; Kuttan mentally repeats them in German. Cousin quizzes him over WhatsApp video call. | ⏳ Deferred |
| **L3-2** Numbers 21–100 | Berlin Bäckerei | **Thomas Bakery, Kochi — Saturday morning.** Kuttan orders for the family. Counter prices flash by. He mentally converts each to German numbers, practicing reverse-order (einundzwanzig = one-and-twenty). | ⏳ Deferred |
| **L3-3** Telling Time | Alexanderplatz U-Bahn, Berlin | **Kochi Metro, Maharaja's College station — meeting Reshma.** They compete: say the arrival time in German faster than the announcement board changes. | ⏳ Deferred |
| **L3-4** Days, Months, Seasons | WG Trash Storage Müllraum, Germany | **Thrissur home kitchen — Amma's calendar.** Amma manages the garbage collection schedule (very real in Kerala). Kuttan offers to write the days in German as practice. Amma is amused but impressed. | ⏳ Deferred |
| **L3-5** Birthdays, Dates, haben | WG Living Room — Birthday Planning | **Thrissur home — planning Achan's 55th birthday.** Family event, dates to coordinate with relatives. Kuttan practices saying the date in German for Amma. | ⏳ Deferred |
| **L3-6** Appointments, Scheduling | Arztpraxis Berlin-Mitte | **Goethe Kochi mock A1 Sprechen test — phone call roleplay.** Frau Weber plays a German consulate receptionist. Kuttan must schedule a visa appointment using numbers, days, and time phrases. | ⏳ Deferred |

## Rewrite template (for next session)

Every deferred storyScene needs:
1. **setting.name** — one of the Kerala locations above.
2. **setting.description** — 2-3 sentences that evoke the place (smells, sounds, context).
3. **narrative.previousRecap** — reference the previous lesson's Kerala scene (not "you landed in Germany").
4. **narrative.currentObjective** — tie to this lesson's pedagogy.
5. **narrative.nextTeaser** — hook to the next lesson's Kerala beat.
6. **kuttanIntro** — 3 Manglish lines, peer voice (not teacher).
7. **vocabEncounters** — keep vocab IDs; rewrite `encounterMoment` and `contextSentence` to match new Kerala setting.
8. **decisionPoints** — replace German characters (Stefan, Lara, Marie, Carlos) with Kerala-appropriate people (Akhil, Reshma, Amma, the cousin, etc.). Pedagogical target stays the same.

## Side effects to clean up later

Several fields outside storyScene still reference Germany and will need touch-up:
- `videos[].scriptOutline` in M2, M3 — mentions Berlin cafés, airports, WGs
- `videos[].description` — similar
- Exercise `question` / `questionGerman` stems that mention Germany-specific settings — audit after storyScene rewrites
- `module.description` headers — mostly OK, some need tonal tweaks
