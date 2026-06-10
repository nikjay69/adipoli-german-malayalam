# Production Exercise Specifications — Per Module

> Concrete exercise designs for free-text, dictation, speaking, and form-filling tasks.
> Each spec includes: exercise type, prompt, expected output, scoring approach, and A1 exam link.
>
> **Created:** 2026-03-23 11:03 UTC
> **Purpose:** Guide implementation of production exercises across all modules.
> **Priority:** Modules 1–6, 14, 17, 18 first (highest exam leverage).

---

## Design Principles

1. **A1-safe output:** Accept short, correct, high-probability German. Never penalize simplicity.
2. **Rubric-first scoring:** Define acceptable answer bands before deploying AI grading.
3. **3 types per module minimum:** Each module should have at least 1 free-text, 1 dictation, and 1 speaking task.
4. **Progressive difficulty:** Start with fill-gap production → guided sentences → open sentences → short paragraphs.
5. **Recycle vocabulary:** Production exercises should reuse vocab from the same module and 1-2 earlier modules.

---

## Module 1: Welcome to German!

### 1-P1: Greeting Exchange (free-text)
- **Type:** free-text
- **Prompt:** "Write a 4-line conversation: Person A greets Person B, asks how they are, Person B responds, and they say goodbye."
- **Expected output band:**
  ```
  A: Guten Tag! Wie geht es Ihnen?
  B: Gut, danke! Und Ihnen?
  A: Auch gut, danke!
  B: Auf Wiedersehen!
  ```
- **Accept variations:** Hallo/Guten Morgen/Guten Abend; Tschüss/Bis bald; dir/Ihnen; Super/Sehr gut/Es geht
- **Scoring:** 1 point per line that contains appropriate German greeting/response. 4/4 = full marks.
- **A1 link:** Sprechen Teil 1 opener

### 1-P2: Umlaut Pronunciation (speaking)
- **Type:** speaking (Web Speech API)
- **Prompt:** "Say each word clearly: über, schön, Tschüss, Entschuldigung, Guten Abend"
- **Scoring:** Word recognition match via Web Speech API transcription. 4/5 = pass.
- **A1 link:** Sprechen fluency foundation

### 1-P3: Polite Phrases Dictation (dictation)
- **Type:** dictation (audio → typed text)
- **Audio text:** "Guten Tag. Entschuldigung, wie heißen Sie? Vielen Dank! Auf Wiedersehen."
- **Scoring:** Levenshtein fuzzy match. Accept minor typos (Entschuldigung → Entschuligung = partial credit).
- **A1 link:** Hören + Schreiben

### 1-P4: Name Spelling (production)
- **Type:** free-text
- **Prompt:** "Your name is Arun Kumar. Spell it letter by letter in German: A wie Anton, R wie..."
- **Expected:** "A wie Anton, R wie Richard, U wie Ulrich, N wie Nordpol"
- **A1 link:** Sprechen (spelling name), real-life phone calls and offices

---

## Module 2: Who Are You?

### 2-P1: Self-Introduction (free-text)
- **Type:** free-text
- **Prompt:** "Write 5–7 sentences introducing yourself in German. Include: name, age, origin, residence, profession, languages, one hobby."
- **Expected output band:**
  ```
  Ich heiße [Name]. Ich bin [age] Jahre alt.
  Ich komme aus [country/city]. Ich wohne in [city].
  Ich bin [profession] von Beruf.
  Ich spreche [languages].
  Ich [hobby] gern.
  ```
- **Scoring rubric:**
  - Name sentence correct: 1 pt
  - Age correct: 1 pt
  - Origin correct: 1 pt
  - Residence correct: 1 pt
  - Profession correct: 1 pt
  - Languages correct: 1 pt
  - Bonus for hobby or additional detail: 1 pt
- **A1 link:** Sprechen Teil 1 — Sich vorstellen

### 2-P2: Form Fill from Audio (dictation + form)
- **Type:** dictation/form-fill
- **Audio script:** "Mein Name ist Priya Nair. Ich bin 28 Jahre alt. Ich komme aus Kochi, Indien. Ich wohne in München. Meine Telefonnummer ist null eins sieben sechs, drei vier fünf sechs sieben acht neun null."
- **Form fields:** Vorname: ___ | Nachname: ___ | Alter: ___ | Geburtsort: ___ | Wohnort: ___ | Telefon: ___
- **Expected:** Priya | Nair | 28 | Kochi | München | 0176 34567890
- **A1 link:** Schreiben Teil 1

### 2-P3: 2-Minute Self-Introduction (speaking)
- **Type:** speaking (timed recording)
- **Prompt:** "Introduce yourself in German for 2 minutes. Cover: name, origin, residence, profession, languages, family, hobbies."
- **Scoring:** Checklist of 6 topics covered (1 pt each). Fluency bonus if minimal pauses.
- **A1 link:** Sprechen Teil 1

---

## Module 3: Numbers & Time

### 3-P1: Number Dictation (dictation)
- **Type:** dictation (audio → write number)
- **Audio items (10):**
  1. dreiundzwanzig → 23
  2. siebenundvierzig → 47
  3. achtundsiebzig → 78
  4. vierundfünfzig → 54
  5. neunundneunzig → 99
  6. fünfzehn Euro dreißig → 15,30€
  7. halb drei → 2:30
  8. Viertel nach sechs → 6:15
  9. am dritten Mai → 03.05.
  10. null eins sieben sechs, fünf vier drei zwei eins → 0176 54321
- **Scoring:** 1 pt per correct answer. 7/10 = pass.
- **A1 link:** Hören (prices, times, dates, phone numbers)

### 3-P2: Clock Time Production (free-text)
- **Type:** free-text
- **Prompt:** "Write the time in words: 8:00, 14:30, 9:15, 18:45, 12:00"
- **Expected:**
  - acht Uhr / zwanzig Uhr
  - halb drei (informal) / vierzehn Uhr dreißig (formal)
  - Viertel nach neun / neun Uhr fünfzehn
  - Viertel vor sieben / achtzehn Uhr fünfundvierzig
  - zwölf Uhr / Mittag
- **Accept both formal and informal forms.**
- **A1 link:** Hören, Lesen (schedules), Sprechen (appointments)

### 3-P3: Appointment Making (speaking)
- **Type:** speaking
- **Prompt:** "Call the doctor's office. Say: your name, that you need an appointment, suggest a day and time."
- **Model:** "Guten Tag, mein Name ist [Name]. Ich brauche einen Termin. Geht es am Mittwoch um zehn Uhr?"
- **Scoring:** Name present, appointment request, day + time mentioned = 3 pts.
- **A1 link:** Sprechen, real-life interaction

### 3-P4: Birthday and Date Writing (free-text)
- **Type:** free-text
- **Prompt:** "Write in German: 1) Your birthday in German format, 2) Today's date, 3) 'My appointment is on Thursday at 3 PM'"
- **A1 link:** Schreiben (form fields), Sprechen

---

## Module 4: My Family & People

### 4-P1: Family Description (free-text)
- **Type:** free-text
- **Prompt:** "Describe your family in 4–5 sentences. Include at least 3 family members, their names, ages, and what they do."
- **Expected output band:**
  ```
  Meine Familie ist [groß/klein].
  Mein Vater heißt [Name]. Er ist [age] Jahre alt. Er ist [Beruf].
  Meine Mutter heißt [Name]. Sie ist [age] Jahre alt.
  Ich habe [einen Bruder / eine Schwester]. Er/Sie ist [age].
  ```
- **Scoring:** 1 pt per family member correctly described (article + possessive + basic info). Min 3 = pass.
- **A1 link:** Sprechen (family topic), Schreiben (personal descriptions)

### 4-P2: Possessive Transformation (free-text)
- **Type:** guided production
- **Prompt:** "Complete with mein/meine/dein/deine: ___ Bruder ist groß. ___ Schwester heißt Priya. Wie heißt ___ Mutter? ___ Eltern wohnen in Kerala."
- **Expected:** Mein, Meine, deine, Meine
- **A1 link:** Grammar accuracy across all sections

### 4-P3: Family Presentation (speaking)
- **Type:** speaking (1 minute)
- **Prompt:** "Tell us about one family member: who they are, name, age, job, where they live, something special about them."
- **A1 link:** Sprechen topic practice

---

## Module 5: Daily Routine

### 5-P1: My Day Paragraph (free-text)
- **Type:** free-text
- **Prompt:** "Write 6 sentences describing your normal day from morning to evening. Use at least 2 separable verbs."
- **Expected output band:**
  ```
  Ich stehe um sieben Uhr auf.
  Ich frühstücke um halb acht.
  Ich gehe um neun zur Arbeit.
  Ich arbeite bis fünf Uhr.
  Am Abend koche ich.
  Ich schlafe um elf Uhr ein.
  ```
- **Scoring rubric:**
  - 6 sentences present: 1 pt each
  - Verb conjugation correct: 1 pt per correct verb (max 6)
  - Separable verb correctly split: 1 pt each (need ≥2)
  - Time expressions used: 1 pt if ≥3 time markers
- **A1 link:** Sprechen (daily routine topic), Schreiben

### 5-P2: Conjugation Production (free-text)
- **Type:** guided production
- **Prompt:** "Conjugate: spielen (ich), arbeiten (du), lesen (er), aufstehen (wir), fernsehen (ihr), kochen (Sie)"
- **Expected:** spiele, arbeitest, liest, stehen...auf, seht...fern, kochen
- **A1 link:** Grammar accuracy

### 5-P3: Weekly Routine (speaking)
- **Type:** speaking (1 minute)
- **Prompt:** "Describe what you do on different days of the week. Use time expressions."
- **A1 link:** Sprechen

---

## Module 6: Food & Drink

### 6-P1: Restaurant Order (free-text dialogue)
- **Type:** free-text
- **Prompt:** "Write a restaurant dialogue (6–8 lines). You enter, order a drink and food, ask the price, and pay."
- **Expected output band:**
  ```
  Kellner: Guten Tag! Was möchten Sie trinken?
  Ich: Einen Kaffee, bitte.
  Kellner: Und zum Essen?
  Ich: Ich nehme eine Suppe, bitte.
  Kellner: Gern. Noch etwas?
  Ich: Nein, danke. Was kostet das?
  Kellner: Acht Euro fünfzig.
  Ich: Hier, bitte. Danke schön!
  ```
- **Scoring:** Order includes drink (1pt), food (1pt), polite phrases (1pt), price exchange (1pt), correct accusative in ≥1 item (1pt).
- **A1 link:** Sprechen (service interaction), Hören (café dialogues)

### 6-P2: Favorite Food Description (free-text)
- **Type:** free-text
- **Prompt:** "Write 3–4 sentences about your favorite food and drink. Use gern/nicht gern."
- **Expected:** "Ich esse gern Reis mit Curry. Ich trinke gern Tee. Ich esse nicht gern Wurst."
- **A1 link:** Sprechen (likes/dislikes)

### 6-P3: Menu Dictation (dictation)
- **Type:** dictation
- **Audio:** "Eine Tomatensuppe kostet drei Euro fünfzig. Ein Schnitzel mit Pommes kostet neun Euro neunzig. Ein Wasser kostet eins fünfzig."
- **Task:** Write item + price for each.
- **A1 link:** Hören + Lesen (menu comprehension)

---

## Module 7: Shopping & Money

### 7-P1: Shopping Dialogue (free-text)
- **Type:** free-text
- **Prompt:** "Write a dialogue buying a shirt. Ask about size, color, price, and pay."
- **A1 link:** Sprechen

### 7-P2: Price Dictation (dictation)
- **Type:** dictation (10 prices)
- **Audio items:** Various prices from 0,99€ to 149,00€
- **A1 link:** Hören

### 7-P3: Shopping List (free-text)
- **Type:** free-text
- **Prompt:** "Write a shopping list in German with 8 items. Include articles."
- **Expected:** "die Milch, das Brot, die Butter, das Mehl, die Eier, der Käse, der Joghurt, die Nudeln"
- **A1 link:** Vocabulary production with articles

---

## Module 8: My Home

### 8-P1: Room Description (free-text)
- **Type:** free-text
- **Prompt:** "Describe your room in 4–5 sentences. Say what is in it and where things are."
- **Expected:** "In meinem Zimmer gibt es ein Bett. Das Bett ist neben dem Fenster. Auf dem Tisch steht mein Computer."
- **A1 link:** Sprechen

### 8-P2: Housing Ad Response (free-text)
- **Type:** free-text
- **Prompt:** "[Show a housing ad] Write a short message to the landlord: introduce yourself, say you're interested, ask one question."
- **A1 link:** Schreiben Teil 2

### 8-P3: Object Location Dictation (dictation)
- **Type:** dictation
- **Audio:** "Der Stuhl steht neben dem Tisch. Das Buch liegt auf dem Regal. Die Lampe hängt über dem Bett."
- **Task:** Draw or label a room layout from audio.
- **A1 link:** Hören + prepositions

---

## Module 9: Travel & Directions

### 9-P1: Ticket Purchase (free-text dialogue)
- **Type:** free-text
- **Prompt:** "Write a dialogue buying a train ticket. Include: destination, one-way/return, departure time, platform question."
- **A1 link:** Sprechen

### 9-P2: Direction Dictation (dictation)
- **Type:** dictation
- **Audio:** "Gehen Sie geradeaus, dann links. Nach 200 Metern sehen Sie die Apotheke rechts."
- **A1 link:** Hören

### 9-P3: Travel Plan Writing (free-text)
- **Type:** free-text
- **Prompt:** "Write 3 sentences about a trip: where you want to go, how (transport), and when."
- **A1 link:** Sprechen, Schreiben

---

## Module 10: Health & Body

### 10-P1: Doctor Dialogue (free-text)
- **Type:** free-text
- **Prompt:** "Write a dialogue at the doctor: describe 2 symptoms, answer a question, get advice."
- **A1 link:** Sprechen

### 10-P2: Sick Note Message (free-text)
- **Type:** free-text
- **Prompt:** "Write a message to your teacher/boss saying you are sick today. Say what hurts and that you can't come."
- **Expected:** "Sehr geehrte Frau [Name], ich bin heute krank. Ich habe Kopfschmerzen und Fieber. Ich kann leider nicht kommen. Mit freundlichen Grüßen, [Name]"
- **A1 link:** Schreiben Teil 2

### 10-P3: Symptom Dictation (dictation)
- **Type:** dictation
- **Audio:** "Ich habe Kopfschmerzen. Mein Bauch tut weh. Ich habe seit drei Tagen Fieber."
- **A1 link:** Hören

---

## Module 11: Work & Study

### 11-P1: Professional Email (free-text)
- **Type:** free-text
- **Prompt:** "Write a short email to a language school. Ask about: course start date, price, and what level you need."
- **Scoring rubric:** Formal greeting (1pt), 3 questions present (1pt each), formal closing (1pt).
- **A1 link:** Schreiben Teil 2

### 11-P2: Job Description (speaking)
- **Type:** speaking (1 minute)
- **Prompt:** "Describe your job or studies: what you do, where, since when, and what you like about it."
- **A1 link:** Sprechen Teil 1

### 11-P3: Skills Dictation (dictation)
- **Type:** dictation
- **Audio:** "Ich arbeite als Krankenschwester. Ich spreche drei Sprachen. Ich kann gut mit Menschen arbeiten."
- **A1 link:** Hören

---

## Module 12: Hobbies & Free Time

### 12-P1: Invitation Message (free-text)
- **Type:** free-text
- **Prompt:** "Write an invitation to a friend for your birthday party. Include: day, time, place, and what to bring."
- **Expected:**
  ```
  Liebe/r [Name],
  am Samstag mache ich eine Geburtstagsparty!
  Die Party ist um 19 Uhr bei mir zu Hause.
  Bitte bring etwas zu trinken mit.
  Kommst du?
  Liebe Grüße, [your name]
  ```
- **A1 link:** Schreiben Teil 2 (this is THE classic Goethe A1 writing task)

### 12-P2: Decline with Reason (free-text)
- **Type:** free-text
- **Prompt:** "Your friend invited you to a movie on Saturday. Decline politely and give a reason."
- **Expected:** "Liebe/r [Name], vielen Dank für die Einladung! Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss. Vielleicht nächstes Mal? Liebe Grüße, [Name]"
- **A1 link:** Schreiben Teil 2

### 12-P3: Hobby Presentation (speaking)
- **Type:** speaking (1 minute)
- **Prompt:** "Talk about your hobbies. What do you like doing? How often? With whom?"
- **A1 link:** Sprechen Teil 1/2

---

## Module 13: Talking About the Past

### 13-P1: Weekend Story (free-text)
- **Type:** free-text
- **Prompt:** "Write 5 sentences about what you did last weekend. Use Perfekt tense."
- **Expected output band:**
  ```
  Am Samstag habe ich lange geschlafen.
  Dann bin ich einkaufen gegangen.
  Am Nachmittag habe ich gekocht.
  Am Abend habe ich einen Film gesehen.
  Am Sonntag bin ich spazieren gegangen.
  ```
- **Scoring:** 1 pt per sentence with correct Perfekt (auxiliary + participle). 3/5 = pass.
- **A1 link:** Sprechen (weekend/past experience topic)

### 13-P2: Present → Perfekt Transformation (guided)
- **Type:** guided production
- **Prompt:** "Rewrite in Perfekt: Ich spiele Fußball. / Sie geht nach Hause. / Wir kochen Abendessen. / Er fährt nach Berlin."
- **Expected:** Ich habe Fußball gespielt. / Sie ist nach Hause gegangen. / Wir haben Abendessen gekocht. / Er ist nach Berlin gefahren.
- **A1 link:** Grammar accuracy

### 13-P3: Weekend Dictation (dictation)
- **Type:** dictation
- **Audio:** "Am Wochenende bin ich nach Hamburg gefahren. Ich habe meinen Freund besucht. Wir haben zusammen gegessen."
- **A1 link:** Hören

---

## Module 14: Formal Life in Germany

### 14-P1: Anmeldung Form Fill (form-fill)
- **Type:** form-fill from audio
- **Audio:** Personal details of a fictional person (name, DOB, address, nationality, marital status, phone)
- **Form fields:** All standard Anmeldung fields
- **A1 link:** Schreiben Teil 1

### 14-P2: Appointment Request Email (free-text)
- **Type:** free-text
- **Prompt:** "Write a formal email to the Ausländerbehörde requesting an appointment. Include why you need it."
- **Expected:**
  ```
  Sehr geehrte Damen und Herren,
  ich möchte gern einen Termin machen.
  Ich brauche eine Aufenthaltserlaubnis.
  Können Sie mir bitte einen Termin geben?
  Mit freundlichen Grüßen,
  [Name]
  ```
- **Scoring:** Formal greeting (1pt), reason stated (1pt), polite request (1pt), formal closing (1pt).
- **A1 link:** Schreiben Teil 2

### 14-P3: Course Registration Form (form-fill)
- **Type:** form-fill
- **Prompt:** Fill out a language course registration form with your own details.
- **Fields:** Vorname, Nachname, Geburtsdatum, E-Mail, Telefon, Kursstufe, Wunschtermin
- **A1 link:** Schreiben Teil 1

### 14-P4: Bank Account Form (form-fill)
- **Type:** form-fill
- **Prompt:** Fill out a Kontoeröffnung (account opening) form.
- **Fields:** Name, Anschrift, Geburtsdatum, Staatsangehörigkeit, Beruf, monatliches Einkommen (optional), Kontoart
- **A1 link:** Schreiben Teil 1, real-life

---

## Module 17: Goethe A1 Hören & Lesen

### 17-P1: Audio-Only Hören Drill Set (6 items)
- **Type:** listening + MC (audio hidden, no text visible)
- **6 items covering:** announcement, phone message, dialogue, schedule, price, personal info
- **A1 link:** Direct Hören Teil 1/2/3 simulation

### 17-P2: Timed Reading Comprehension (5 items)
- **Type:** reading + short written answers
- **5 items:** Sign, ad, email, notice, short text
- **Time limit:** 2 min per item
- **A1 link:** Lesen Teil 1/2/3

### 17-P3: Error Analysis (guided)
- **Type:** guided analysis
- **Prompt:** "Read the answer explanation. Why was Option B wrong? Write one sentence."
- **A1 link:** Exam strategy

---

## Module 18: Goethe A1 Schreiben & Sprechen

### 18-P1: Full Form-Fill Mock (form-fill)
- **Type:** form-fill (timed, 5 min)
- **Prompt:** Complete a realistic Goethe-style form from written personal details.
- **A1 link:** Schreiben Teil 1

### 18-P2: 3-Point Message (free-text)
- **Type:** free-text
- **Prompt:** "Write a message to your friend. Include these 3 points: 1) Thank them for the birthday present, 2) Say what the present was, 3) Invite them for coffee next week."
- **Expected:** ~30 words, all 3 points addressed, informal register.
- **Scoring:** 1 pt per content point addressed (3 max), 1 pt for appropriate greeting/closing, 1 pt for comprehensibility.
- **A1 link:** Schreiben Teil 2

### 18-P3: Topic Card Speaking (speaking)
- **Type:** speaking (random topic)
- **Random topics:** Essen, Familie, Wohnung, Arbeit, Freizeit, Reisen
- **Format:** Show 6 vocabulary cards → student asks partner a question about each → then answers a question
- **A1 link:** Sprechen Teil 2

### 18-P4: Request Drill (speaking)
- **Type:** speaking
- **Prompts (random):**
  - "You're at the train station. Ask when the next train to Munich leaves."
  - "You're at a restaurant. Ask for the bill."
  - "You're at the office. Ask for a form."
  - "You're at a shop. Ask if they have this in a larger size."
- **A1 link:** Sprechen Teil 3

### 18-P5: Full Mock Timer (composite)
- **Type:** composite exercise
- **Sequence:** Form-fill (5 min) → Message writing (15 min) → Self-intro recording (2 min) → Topic cards (3 min) → Request drill (2 min)
- **Total:** ~27 min mock
- **A1 link:** Full Goethe A1 productive sections

---

## Implementation Priority

### Phase 1 (highest exam leverage):
1. Module 2: 2-P1 (self-intro writing) + 2-P2 (form fill from audio)
2. Module 14: 14-P1 (Anmeldung form) + 14-P2 (appointment email)
3. Module 18: 18-P1 (mock form) + 18-P2 (3-point message)
4. Module 12: 12-P1 (invitation) + 12-P2 (decline)

### Phase 2 (core teaching modules):
5. Module 3: 3-P1 (number dictation)
6. Module 5: 5-P1 (my day paragraph)
7. Module 6: 6-P1 (restaurant order)
8. Module 13: 13-P1 (weekend story)

### Phase 3 (fill remaining modules):
9. All remaining modules get their 3 production exercises

---

## Audio Generation Requirements

Every dictation exercise above needs an edge-tts audio clip. Total new audio clips needed:

| Module | Clips | Content |
|--------|-------|---------|
| 1 | 2 | Greeting dictation, polite phrases |
| 2 | 1 | Personal info for form-fill |
| 3 | 10 | Number/time/date items |
| 6 | 1 | Menu prices |
| 7 | 10 | Price items |
| 8 | 1 | Room description |
| 9 | 1 | Direction instructions |
| 10 | 1 | Symptom description |
| 11 | 1 | Skills/job description |
| 13 | 1 | Weekend story |
| 14 | 1 | Personal details for form |
| 17 | 6 | Full Hören drill items |
| **Total** | **~37** | Production exercise audio |

Plus ~170 Hören exercise audio clips (tracked in COURSE_PLAN_10_10.md).

**All audio: edge-tts, de-DE-ConradNeural voice, FREE.**
