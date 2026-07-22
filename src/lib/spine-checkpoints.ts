// Closed checkpoints for spine modules 2-8 (module 1 has its own bespoke
// checkpoint in src/lib/missions/module1Checkpoint.ts).
//
// ADMINISTERED, not self-marked (DECISIONS #13): every item carries a `task`
// the checkpoint runner presents and grades. choice/type tasks are auto-scored
// against verified answers; production tasks force real output before a model
// answer + rubric self-score (EXAM_PREP_DESIGN 5-point: >=3 passes); auto tasks
// derive from real mock results in the store. Every miss emits weakness tags
// from docs/EXAM_PREP_DESIGN.md; failed tags select recovery cards that
// prescribe 1-3 exact tasks + a retest, linking into the practice library.

import type { MockGateResult, SpineCheckpointResult } from '@/lib/store';
import { simulatorRunDays } from '@/lib/simulator-runs';

export type SkillSectionId = 'hoeren' | 'sprechen' | 'lesen' | 'schreiben' | 'grammarVocab';

export type CheckpointTask =
  /** One tap among instructive distractors — auto-scored. */
  | { kind: 'choice'; question: string; options: string[]; correctAnswer: string; audioUrl?: string }
  /** Typed answer, matched with answer-match normalization — auto-scored. audioUrl = play-first dictation. */
  | { kind: 'type'; question: string; accepted: string[]; audioUrl?: string; placeholder?: string }
  /** Real production (say/write) → reveal model answer → honest rubric self-score (>=3 passes). */
  | { kind: 'production'; action: 'say' | 'write'; question: string; modelAnswer: string; modelAudioUrl?: string; criteria: string[]; speechTarget?: string }
  /** Derived from real records (mock-gate results / simulator runs) — no self-report. */
  | { kind: 'auto'; question: string; source: AutoTaskSource };

export type AutoTaskSource = 'full-mock-exists' | 'full-mock-60' | 'full-mock-75' | 'simulator-2-days';

export type CheckpointItem = {
  id: string;
  sectionId: SkillSectionId;
  mode: 'listen' | 'speak' | 'match' | 'write' | 'choose' | 'do';
  prompt: string;
  expected: string;
  points: number;
  weaknessTags: string[];
  requiredForPass?: boolean;
  task: CheckpointTask;
};

/** Full-mock gates that count as "a timed full mock" for auto tasks. */
const FULL_MOCK_GATE_IDS = ['full-7', 'final-8a', 'final-8b'];

export function evaluateAutoTask(source: AutoTaskSource, mockResults: Record<string, MockGateResult>): boolean {
  if (source === 'simulator-2-days') return simulatorRunDays() >= 2;
  const fullMocks = FULL_MOCK_GATE_IDS.map((id) => mockResults[id]).filter(Boolean) as MockGateResult[];
  if (source === 'full-mock-exists') return fullMocks.length > 0;
  if (source === 'full-mock-60') return fullMocks.some((r) => r.percent >= 60);
  return fullMocks.some((r) => r.percent >= 75);
}

export type CheckpointSection = {
  id: SkillSectionId;
  title: string;
  instruction: string;
  items: CheckpointItem[];
};

export type RecoveryCard = {
  weaknessTag: string;
  title: string;
  mustDo: string[];
  output: string;
  timeBoxMinutes: number;
  retest: string;
  /** Where in the practice library this recovery happens */
  libraryHref: string;
  libraryLabel: string;
};

export type SpineCheckpoint = {
  moduleId: number;
  title: string;
  passRule: string;
  sections: CheckpointSection[];
  recoveryCards: RecoveryCard[];
  /** Optional hard section floors. Falling below one makes the checkpoint FAIL. */
  sectionFloorForPass?: Partial<Record<SkillSectionId, number>>;
};

export type CheckpointScore = {
  earnedPoints: number;
  totalPoints: number;
  percent: number;
  state: 'PASS' | 'WEAK' | 'FAIL';
  label: string;
  sectionScores: Partial<Record<SkillSectionId, { earned: number; total: number }>>;
  sectionPercents: Record<string, number>;
  failedTags: string[];
  nextAction: string;
};

export const SECTION_TITLES: Record<SkillSectionId, string> = {
  hoeren: 'Hören',
  sprechen: 'Sprechen',
  lesen: 'Lesen',
  schreiben: 'Schreiben',
  grammarVocab: 'Grammar & vocab',
};

const checkpoint2: SpineCheckpoint = {
  moduleId: 2,
  title: 'Identity, numbers, time',
  passRule: '70%+, and the full self-introduction said aloud.',
  sections: [
    {
      id: 'hoeren',
      title: 'Hören — numbers and times',
      instruction: 'Audio plays once for each task. Answer what you catch — that is the diagnosis.',
      items: [
        { id: 'cp2-h-number', sectionId: 'hoeren', mode: 'listen', prompt: 'Hear: dreiundzwanzig, siebzehn, vierzig.', expected: '23, 17, 40 written correctly.', points: 2, weaknessTags: ['hoeren:numbers', 'vocab:numbers_time'],
          task: { kind: 'type', question: 'Play the audio. Type the three numbers you hear as digits, in order (e.g. 5, 12, 30):', accepted: ['23, 17, 40', '23 17 40'], audioUrl: '/audio/checkpoints/cp2-h-number.mp3', placeholder: 'e.g. 5, 12, 30' } },
        { id: 'cp2-h-phone', sectionId: 'hoeren', mode: 'listen', prompt: 'Catch a phone number read digit by digit.', expected: 'All digits in order.', points: 2, weaknessTags: ['hoeren:numbers'],
          task: { kind: 'type', question: 'Play the audio. Type the phone number as digits:', accepted: ['047138926', '0471 38 92 6', '0471 3892 6'], audioUrl: '/audio/checkpoints/cp2-h-phone.mp3', placeholder: 'digits only' } },
        { id: 'cp2-h-time', sectionId: 'hoeren', mode: 'listen', prompt: 'Hear: Der Termin ist um halb drei.', expected: 'Appointment at 2:30.', points: 2, weaknessTags: ['hoeren:time_dates', 'vocab:numbers_time'],
          task: { kind: 'choice', question: 'Play the audio. When is the appointment?', options: ['2:30', '3:30', '3:00', '2:00'], correctAnswer: '2:30', audioUrl: '/audio/checkpoints/cp2-h-time.mp3' } },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — who you are',
      instruction: 'Say it aloud first — really aloud. Then compare with the model and score yourself honestly.',
      items: [
        { id: 'cp2-s-intro', sectionId: 'sprechen', mode: 'speak', prompt: 'Say your full self-intro: Ich heiße ... Ich komme aus ... Ich wohne in ... Ich spreche ...', expected: 'Four lines without freezing, ~20 seconds.', points: 4, weaknessTags: ['sprechen:self_intro'], requiredForPass: true,
          task: { kind: 'production', action: 'say', question: 'The examiner nods at you. Deliver your full self-intro aloud — name, origin, home, languages — before you look at anything.', modelAnswer: 'Ich heiße Priya. Ich komme aus Indien. Ich wohne in Kochi. Ich spreche Malayalam, Englisch und ein bisschen Deutsch.', modelAudioUrl: '/audio/checkpoints/cp2-s-intro-model.mp3', criteria: ['All four lines said aloud', 'No freeze longer than a breath', 'Verb in second position every time'] } },
        { id: 'cp2-s-spell', sectionId: 'sprechen', mode: 'speak', prompt: 'Spell your name with German letter names.', expected: 'No English letter names slipping in.', points: 2, weaknessTags: ['sprechen:spelling'],
          task: { kind: 'production', action: 'say', question: 'The examiner asks: "Wie schreibt man das?" Spell YOUR name aloud with German letter names.', modelAnswer: 'Example: MEERA → Em, E, E, Er, A.', modelAudioUrl: '/audio/checkpoints/cp2-s-spell-model.mp3', criteria: ['German letter names only — no English letter names', 'Every letter of your name, in order'] } },
        { id: 'cp2-s-age', sectionId: 'sprechen', mode: 'speak', prompt: 'Answer: Wie alt sind Sie?', expected: 'Ich bin ... Jahre alt.', points: 2, weaknessTags: ['sprechen:question_answer', 'vocab:personal_info'],
          task: { kind: 'production', action: 'say', question: '"Wie alt sind Sie?" — answer aloud with your real age, full sentence.', modelAnswer: 'Ich bin dreiundzwanzig Jahre alt.', modelAudioUrl: '/audio/checkpoints/cp2-s-age-model.mp3', criteria: ['Full sentence: Ich bin ... Jahre alt', 'Your age said as a German number, not English'] } },
      ],
    },
    {
      id: 'schreiben',
      title: 'Schreiben — personal data',
      instruction: 'Forms are Schreiben Teil 1. Every field label matters.',
      items: [
        { id: 'cp2-w-form', sectionId: 'schreiben', mode: 'write', prompt: 'Fill a mini-form: Vorname, Nachname, Land, Telefonnummer.', expected: 'Right data in the right field.', points: 2, weaknessTags: ['schreiben:form_fields', 'vocab:personal_info'],
          task: { kind: 'choice', question: 'The form has fields: Vorname · Nachname · Land · Telefonnummer. Nivin\'s full name is "Nivin Menon". What goes in "Nachname"?', options: ['Menon', 'Nivin', 'Nivin Menon', 'Indien'], correctAnswer: 'Menon' } },
        { id: 'cp2-w-date', sectionId: 'schreiben', mode: 'write', prompt: 'Write your birthday in German format.', expected: 'TT.MM.JJJJ, e.g. 07.11.2001.', points: 2, weaknessTags: ['schreiben:address_date_phone'],
          task: { kind: 'type', question: 'Write "7 November 2001" the way a German form wants it (TT.MM.JJJJ):', accepted: ['07.11.2001', '7.11.2001'], placeholder: 'TT.MM.JJJJ' } },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Grammar & vocab — exam questions',
      instruction: 'Closed book. Answer, don\'t guess.',
      items: [
        { id: 'cp2-g-wie', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Wie heißen Sie? — what is the examiner asking?', expected: 'Your name → Ich heiße ...', points: 2, weaknessTags: ['hoeren:question_words', 'vocab:personal_info'],
          task: { kind: 'choice', question: 'The examiner asks: "Wie heißen Sie?" What do they want?', options: ['Your name', 'Your age', 'Your address', 'Your job'], correctAnswer: 'Your name' } },
        { id: 'cp2-g-woher', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Woher kommen Sie? vs Wo wohnen Sie? — the difference.', expected: 'Origin vs current home.', points: 2, weaknessTags: ['hoeren:question_words', 'grammar:question_order'],
          task: { kind: 'choice', question: '"Woher kommen Sie?" asks about your…', options: ['origin — where you come from', 'current home — where you live', 'destination — where you are going', 'workplace'], correctAnswer: 'origin — where you come from' } },
        { id: 'cp2-g-numbers', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Numbers 0-20 without counting up from null.', expected: 'Instant recall of any number.', points: 2, weaknessTags: ['vocab:numbers_time'],
          task: { kind: 'type', question: 'Instant recall, no counting up: type "siebzehn" as a digit:', accepted: ['17'], placeholder: 'digit' } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'hoeren:numbers', title: 'Hören — numbers', mustDo: ['Replay the numbers lesson audio, 8m.', 'Write 15 heard numbers.', 'Retest 8 phone numbers.'], output: '12/15 numbers written correctly.', timeBoxMinutes: 15, retest: 'Catch 8 phone numbers first time.', libraryHref: '/games/number-blitz', libraryLabel: 'Number Blitz drill' },
    { weaknessTag: 'hoeren:time_dates', title: 'Hören — times and dates', mustDo: ['Replay the time lesson, 7m.', 'Catch 10 appointment times.', 'Retest 5 new appointments.'], output: '8/10 times caught.', timeBoxMinutes: 12, retest: 'Catch 5 appointment times including halb/Viertel.', libraryHref: '/learn/3', libraryLabel: 'Numbers & time lessons' },
    { weaknessTag: 'sprechen:self_intro', title: 'Sprechen — self-intro', mustDo: ['Shadow the model intro, 5m.', 'Record your own 20-second intro.', 'Compare with the model once.'], output: 'One clean recorded self-intro.', timeBoxMinutes: 10, retest: 'Deliver the intro to a new prompt card.', libraryHref: '/missions/module-2/final-self-intro', libraryLabel: 'Final self-intro mission' },
    { weaknessTag: 'sprechen:spelling', title: 'Sprechen — spelling', mustDo: ['Run the alphabet micro-drill.', 'Spell your name + email aloud.', 'Retest one unfamiliar name.'], output: 'Name spelled with German letters only.', timeBoxMinutes: 8, retest: 'Spell MENON and PRIYA without English letters.', libraryHref: '/missions/module-2/spell-name', libraryLabel: 'Spelling mission' },
    { weaknessTag: 'schreiben:form_fields', title: 'Schreiben — form fields', mustDo: ['Fill 3 forms from data cards.', 'Check Vorname vs Nachname.', 'Retest one form.'], output: '2 forms with zero wrong fields.', timeBoxMinutes: 10, retest: 'Fill one new form error-free.', libraryHref: '/learn/2', libraryLabel: 'Personal info lessons' },
    { weaknessTag: 'vocab:numbers_time', title: 'Vocab — numbers and time', mustDo: ['Review tagged number/time words with audio.', 'Active recall without looking.', 'Say 10 numbers and 5 times aloud.'], output: 'Instant recall of 0-100 pattern.', timeBoxMinutes: 12, retest: 'Mixed retest: hear → write → say.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
  ],
};

const checkpoint3: SpineCheckpoint = {
  moduleId: 3,
  title: 'People, home, daily life',
  passRule: '70%+, and family + routine said aloud.',
  sections: [
    {
      id: 'lesen',
      title: 'Lesen — people and profiles',
      instruction: 'Read once, answer. No looking back at the lessons.',
      items: [
        { id: 'cp3-l-profile', sectionId: 'lesen', mode: 'match', prompt: 'Read: Das ist Priya. Sie ist 25 Jahre alt. Sie wohnt in Kochi.', expected: 'Who, age, and where — all three.', points: 2, weaknessTags: ['lesen:emails', 'vocab:family_home'],
          task: { kind: 'choice', question: 'Read: "Das ist Priya. Sie ist 25 Jahre alt. Sie wohnt in Kochi." Which is true?', options: ['Priya is 25 and lives in Kochi', 'Priya is 35 and lives in Kochi', 'Priya is 25 and works in Kochi', 'Priya is 25 and comes from Kochi'], correctAnswer: 'Priya is 25 and lives in Kochi' } },
        { id: 'cp3-l-family', sectionId: 'lesen', mode: 'match', prompt: 'Read: Mein Bruder arbeitet in München.', expected: 'My brother works in Munich.', points: 2, weaknessTags: ['vocab:family_home'],
          task: { kind: 'choice', question: '"Mein Bruder arbeitet in München." means…', options: ['My brother works in Munich', 'My brother lives in Munich', 'My brother is visiting Munich', 'My uncle works in Munich'], correctAnswer: 'My brother works in Munich' } },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — your real life',
      instruction: 'This is the Goethe family prompt. Say it aloud first, then compare with the model.',
      items: [
        { id: 'cp3-s-family', sectionId: 'sprechen', mode: 'speak', prompt: 'Say 4 sentences about your family (Das ist meine Mutter. Sie heißt ...).', expected: 'Four understandable sentences.', points: 4, weaknessTags: ['sprechen:question_answer', 'vocab:family_home'], requiredForPass: true,
          task: { kind: 'production', action: 'say', question: 'The examiner shows a card: "Familie". Say four sentences about YOUR family aloud, right now.', modelAnswer: 'Das ist meine Mutter. Sie heißt Lakshmi. Das ist mein Bruder. Er ist Student in Bangalore.', modelAudioUrl: '/audio/checkpoints/cp3-s-family-model.mp3', criteria: ['Four full sentences aloud', 'mein/meine matched to each person', 'A stranger would understand every sentence'] } },
        { id: 'cp3-s-routine', sectionId: 'sprechen', mode: 'speak', prompt: 'Describe your day in 3 sentences (Ich stehe um ... auf. Ich arbeite ... Ich lerne Deutsch.).', expected: 'Three routine sentences with correct verb position.', points: 2, weaknessTags: ['grammar:verb_position', 'vocab:family_home'],
          task: { kind: 'production', action: 'say', question: '"Wie ist Ihr Tag?" — describe your day aloud in three sentences.', modelAnswer: 'Ich stehe um sechs Uhr auf. Ich arbeite bis fünf Uhr. Abends lerne ich Deutsch.', modelAudioUrl: '/audio/checkpoints/cp3-s-routine-model.mp3', criteria: ['Three sentences aloud', 'Verb in second position each time', 'aufstehen split correctly: Ich stehe … auf'] } },
      ],
    },
    {
      id: 'schreiben',
      title: 'Schreiben — tiny routine',
      instruction: 'Word order is scored in every written task.',
      items: [
        { id: 'cp3-w-routine', sectionId: 'schreiben', mode: 'write', prompt: 'Write 3 daily-routine sentences.', expected: 'Verb in second position in all three.', points: 2, weaknessTags: ['schreiben:word_order', 'grammar:verb_position'],
          task: { kind: 'type', question: 'Nivin wrote: "Ich um 7 Uhr aufstehe." — that word order fails the exam. Type the sentence correctly:', accepted: ['Ich stehe um 7 Uhr auf', 'Ich stehe um sieben Uhr auf'], placeholder: 'Ich …' } },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Grammar & vocab — survival patterns',
      instruction: 'Closed book. Answer, don\'t guess.',
      items: [
        { id: 'cp3-g-articles', sectionId: 'grammarVocab', mode: 'choose', prompt: 'der Tisch · die Lampe · das Bett — do you know all three articles?', expected: 'All three without guessing.', points: 2, weaknessTags: ['grammar:articles'],
          task: { kind: 'choice', question: 'Pick the row where ALL THREE articles are correct:', options: ['der Tisch · die Lampe · das Bett', 'die Tisch · die Lampe · das Bett', 'der Tisch · das Lampe · das Bett', 'der Tisch · die Lampe · der Bett'], correctAnswer: 'der Tisch · die Lampe · das Bett' } },
        { id: 'cp3-g-possessive', sectionId: 'grammarVocab', mode: 'choose', prompt: 'mein Bruder / meine Schwester — when ein, when eine?', expected: 'mein + der/das words, meine + die words.', points: 2, weaknessTags: ['grammar:possessives'],
          task: { kind: 'type', question: 'Type the missing word: "___ Schwester heißt Anju." (my)', accepted: ['Meine', 'meine'], placeholder: 'mein / meine?' } },
        { id: 'cp3-g-endings', sectionId: 'grammarVocab', mode: 'choose', prompt: 'ich wohne · du wohnst · er wohnt — verb endings.', expected: 'All three endings correct.', points: 2, weaknessTags: ['grammar:verb_ending'],
          task: { kind: 'type', question: 'Complete the verb: "Du wohn__ in Kochi." Type the full verb form:', accepted: ['wohnst'], placeholder: 'wohn…' } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'grammar:articles', title: 'Articles survival set', mustDo: ['Sort 20 high-frequency nouns by article.', 'Use 8 of them in sentences.', 'Retest 10 nouns.'], output: '8/10 articles right.', timeBoxMinutes: 12, retest: 'Article-sort 10 new A1 nouns.', libraryHref: '/games/article-blitz', libraryLabel: 'Article Blitz drill' },
    { weaknessTag: 'grammar:possessives', title: 'mein/meine repair', mustDo: ['Repair 10 possessive mistakes.', 'Say 6 family sentences with mein/meine.', 'Retest 5 items.'], output: 'No mein/meine swaps.', timeBoxMinutes: 8, retest: 'Describe 3 family members correctly.', libraryHref: '/learn/4', libraryLabel: 'Family lessons' },
    { weaknessTag: 'grammar:verb_ending', title: 'Verb endings', mustDo: ['Conjugate wohnen, lernen, arbeiten aloud.', 'Repair 10 wrong endings.', 'Use 5 in real sentences.'], output: 'ich/du/er endings automatic.', timeBoxMinutes: 10, retest: 'Conjugate 3 new regular verbs.', libraryHref: '/learn/5', libraryLabel: 'Daily routine lessons' },
    { weaknessTag: 'grammar:verb_position', title: 'Verb in position 2', mustDo: ['Repair: Ich Deutsch lerne → Ich lerne Deutsch.', 'Write 5 personal sentences.', 'Say them aloud.'], output: 'Five verb-second sentences.', timeBoxMinutes: 10, retest: 'Write 3 routine sentences, verb second.', libraryHref: '/learn/5', libraryLabel: 'Daily routine lessons' },
    { weaknessTag: 'vocab:family_home', title: 'Family & home words', mustDo: ['Review tagged words with audio.', 'Recall without looking.', 'Use 8 in spoken sentences.'], output: 'Family set recalled.', timeBoxMinutes: 12, retest: 'Mixed retest old/new.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
    { weaknessTag: 'schreiben:word_order', title: 'Written word order', mustDo: ['Rebuild one model answer from chunks.', 'Write 5 A1 sentences with a checklist.', 'Self-score with the rubric.'], output: 'Five clean sentences.', timeBoxMinutes: 10, retest: 'Write a 3-sentence routine, verb second.', libraryHref: '/learn/5', libraryLabel: 'Daily routine lessons' },
  ],
};

const checkpoint4: SpineCheckpoint = {
  moduleId: 4,
  title: 'Food, shopping, money',
  passRule: '70%+, and one order said aloud.',
  sections: [
    {
      id: 'hoeren',
      title: 'Hören — prices and quantities',
      instruction: 'Audio plays once. Prices are the most reliable Hören points — catch them.',
      items: [
        { id: 'cp4-h-price', sectionId: 'hoeren', mode: 'listen', prompt: 'Hear: Das kostet drei Euro fünfzig.', expected: '€3.50.', points: 2, weaknessTags: ['hoeren:prices'],
          task: { kind: 'type', question: 'Play the audio. Type the price you hear as numbers (e.g. 2,50):', accepted: ['3,50', '3.50', '350'], audioUrl: '/audio/checkpoints/cp4-h-price.mp3', placeholder: 'e.g. 2,50' } },
        { id: 'cp4-h-prices', sectionId: 'hoeren', mode: 'listen', prompt: 'Catch 5 prices in a row (e.g. 2,99 · 12,50 · 7,20).', expected: '4/5 written correctly.', points: 2, weaknessTags: ['hoeren:prices', 'hoeren:numbers'],
          task: { kind: 'choice', question: 'Play the audio — five prices in a row. Which price was NOT in the list?', options: ['8,45 €', '2,99 €', '12,50 €', '7,20 €'], correctAnswer: '8,45 €', audioUrl: '/audio/checkpoints/cp4-h-prices.mp3' } },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — order and ask',
      instruction: 'Say it aloud, restaurant-real. Then compare with the model.',
      items: [
        { id: 'cp4-s-order', sectionId: 'sprechen', mode: 'speak', prompt: 'Order aloud: Ich hätte gern einen Kaffee, bitte.', expected: 'Polite order without freezing.', points: 4, weaknessTags: ['sprechen:request_phrase'], requiredForPass: true,
          task: { kind: 'production', action: 'say', question: 'The waiter looks at you. Order a coffee aloud, politely — without reading anything first.', modelAnswer: 'Ich hätte gern einen Kaffee, bitte.', modelAudioUrl: '/audio/checkpoints/cp4-s-order-model.mp3', criteria: ['Polite frame: Ich hätte gern … bitte', 'einen Kaffee — the accusative -en said, not swallowed', 'No freeze before speaking'] } },
        { id: 'cp4-s-price', sectionId: 'sprechen', mode: 'speak', prompt: 'Ask: Was kostet das? / Wie viel kostet das?', expected: 'One clean price question.', points: 2, weaknessTags: ['sprechen:question_answer'],
          task: { kind: 'production', action: 'say', question: 'No price tag on the item in your hand. Ask the price aloud.', modelAnswer: 'Wie viel kostet das?', modelAudioUrl: '/audio/exercises/ex7-1-prod-speaking-model.mp3', criteria: ['One clean question aloud', 'W-word first, verb second'] } },
      ],
    },
    {
      id: 'lesen',
      title: 'Lesen — ads and menus',
      instruction: 'Read once, answer.',
      items: [
        { id: 'cp4-l-ad', sectionId: 'lesen', mode: 'match', prompt: 'Ad: T-Shirt, blau, Größe M, 15 Euro. — What costs 15 euro, and what size?', expected: 'The T-shirt, size M.', points: 2, weaknessTags: ['lesen:ads', 'lesen:time_price_detail'],
          task: { kind: 'choice', question: 'Ad: "T-Shirt, blau, Größe M, 15 Euro." What do you know for sure?', options: ['A blue T-shirt in size M costs €15', 'A blue T-shirt in size L costs €15', 'A red T-shirt in size M costs €15', 'A blue T-shirt in size M costs €50'], correctAnswer: 'A blue T-shirt in size M costs €15' } },
        { id: 'cp4-l-menu', sectionId: 'lesen', mode: 'match', prompt: 'Menu line: Tomatensuppe 4,50 € — what is it and what does it cost?', expected: 'Tomato soup, €4.50.', points: 2, weaknessTags: ['lesen:ads', 'vocab:food_shopping'],
          task: { kind: 'type', question: 'Menu line: "Tomatensuppe 4,50 €". Type in English what dish this is:', accepted: ['tomato soup', 'tomatosoup', 'soup'], placeholder: 'the dish in English' } },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Grammar & vocab — buying patterns',
      instruction: 'Closed book. Answer, don\'t guess.',
      items: [
        { id: 'cp4-g-akkusativ', sectionId: 'grammarVocab', mode: 'choose', prompt: 'einen Kaffee · eine Cola · ein Wasser — pick correctly every time?', expected: 'Accusative survival pattern automatic.', points: 2, weaknessTags: ['grammar:accusative_survival'],
          task: { kind: 'type', question: 'Order the water: "Ich nehme ___ Wasser." Type the missing word:', accepted: ['ein'], placeholder: 'ein / eine / einen?' } },
        { id: 'cp4-g-kein', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Ich esse kein Fleisch. — why kein and not nicht?', expected: 'kein negates nouns.', points: 2, weaknessTags: ['grammar:negation'],
          task: { kind: 'choice', question: 'Why is it "Ich esse KEIN Fleisch" and not "nicht Fleisch"?', options: ['kein negates nouns; nicht negates verbs and adjectives', 'kein is more polite', 'nicht is only for the end of a sentence', 'No reason — both are correct'], correctAnswer: 'kein negates nouns; nicht negates verbs and adjectives' } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'hoeren:prices', title: 'Price dictation', mustDo: ['Dictate 12 prices from lesson audio.', 'Check comma vs euro spoken order.', 'Retest 6 prices.'], output: '10/12 prices written.', timeBoxMinutes: 12, retest: 'Catch 6 new prices first time.', libraryHref: '/games/number-blitz', libraryLabel: 'Number Blitz drill' },
    { weaknessTag: 'sprechen:request_phrase', title: 'Polite requests', mustDo: ['Shadow: Ich hätte gern ... / Ich nehme ...', 'Say 8 ordering sentences.', 'Retest 5 situation cards.'], output: 'Eight spoken orders.', timeBoxMinutes: 10, retest: 'Order food + ask price in one go.', libraryHref: '/games/sag-es', libraryLabel: 'Sag es! speaking drill' },
    { weaknessTag: 'grammar:accusative_survival', title: 'einen/eine/ein repair', mustDo: ['Repair ein/eine/einen in 10 buying sentences.', 'Say 5 orders with the right form.', 'Retest 6 items.'], output: 'No accusative misses on common orders.', timeBoxMinutes: 10, retest: 'Order 3 items with correct articles.', libraryHref: '/learn/6', libraryLabel: 'Food & drink lessons' },
    { weaknessTag: 'grammar:negation', title: 'nicht vs kein', mustDo: ['Sort 10 sentences into nicht/kein.', 'Write 4 own examples.', 'Say them aloud.'], output: 'Clean nicht/kein split.', timeBoxMinutes: 8, retest: 'Negate 5 new sentences correctly.', libraryHref: '/learn/6', libraryLabel: 'Food & drink lessons' },
    { weaknessTag: 'lesen:ads', title: 'Ad scanning', mustDo: ['Underline need-words first.', 'Match 8 ads to needs.', 'Retest 4 ads.'], output: '7/8 ads matched.', timeBoxMinutes: 10, retest: 'Match 4 new ads in 5 minutes.', libraryHref: '/games/was-steht-da', libraryLabel: 'Was steht da? reading drill' },
    { weaknessTag: 'vocab:food_shopping', title: 'Food & shopping words', mustDo: ['Review tagged words with audio.', 'Pick items from a shopping list.', 'Say one full order.'], output: 'Shopping set recalled.', timeBoxMinutes: 12, retest: 'Mixed retest with prices.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
  ],
};

const checkpoint5: SpineCheckpoint = {
  moduleId: 5,
  title: 'Travel, services, health',
  passRule: '70%+, and one direction question + one health line aloud.',
  sections: [
    {
      id: 'hoeren',
      title: 'Hören — announcements',
      instruction: 'Audio plays once. Catch the detail, not every word.',
      items: [
        { id: 'cp5-h-zug', sectionId: 'hoeren', mode: 'listen', prompt: 'Hear: Der Zug nach Berlin fährt um 14:20 von Gleis 3.', expected: 'Time 14:20 and platform 3.', points: 2, weaknessTags: ['hoeren:announcements'],
          task: { kind: 'choice', question: 'Play the station announcement. The train to Berlin leaves…', options: ['at 14:20 from platform 3', 'at 14:20 from platform 13', 'at 4:20 from platform 3', 'at 14:02 from platform 3'], correctAnswer: 'at 14:20 from platform 3', audioUrl: '/audio/checkpoints/cp5-h-zug.mp3' } },
        { id: 'cp5-h-form', sectionId: 'hoeren', mode: 'listen', prompt: 'Hear a name + time and write both into a note.', expected: 'Both fields right.', points: 2, weaknessTags: ['hoeren:audio_to_form'],
          task: { kind: 'type', question: 'Play the audio — a name and an appointment time. Type the TIME into the note (HH:MM):', accepted: ['10:30', '10.30', '1030', 'zehn Uhr dreißig'], audioUrl: '/audio/checkpoints/cp5-h-form.mp3', placeholder: 'HH:MM' } },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — survive the situation',
      instruction: 'Say it aloud, stranger-real. Then compare with the model.',
      items: [
        { id: 'cp5-s-weg', sectionId: 'sprechen', mode: 'speak', prompt: 'Ask: Entschuldigung, wo ist der Bahnhof?', expected: 'Polite, clear question.', points: 4, weaknessTags: ['sprechen:request_phrase'], requiredForPass: true,
          task: { kind: 'production', action: 'say', question: 'You are lost, phone dead. Stop a stranger and ask the way to the station — aloud, politely.', modelAnswer: 'Entschuldigung, wo ist der Bahnhof?', modelAudioUrl: '/audio/checkpoints/cp5-s-weg-model.mp3', criteria: ['Entschuldigung first — never skip the softener', 'Wo first, verb second', 'Clear enough for a stranger on a loud street'] } },
        { id: 'cp5-s-arzt', sectionId: 'sprechen', mode: 'speak', prompt: 'Doctor line: Ich habe Kopfschmerzen. / Mein Bein tut weh.', expected: 'One clear symptom sentence.', points: 2, weaknessTags: ['vocab:travel_health', 'sprechen:question_answer'],
          task: { kind: 'production', action: 'say', question: 'The doctor asks: "Was fehlt Ihnen?" Say one clear symptom sentence aloud.', modelAnswer: 'Ich habe Kopfschmerzen.', modelAudioUrl: '/audio/checkpoints/cp5-s-arzt-model.mp3', criteria: ['One full symptom sentence', 'A doctor would know what hurts'] } },
        { id: 'cp5-s-termin', sectionId: 'sprechen', mode: 'speak', prompt: 'Make an appointment: Ich möchte einen Termin machen.', expected: 'Modal verb sentence, machen at the end.', points: 2, weaknessTags: ['grammar:modal_word_order', 'sprechen:request_phrase'],
          task: { kind: 'production', action: 'say', question: 'The receptionist answers the phone: "Praxis Dr. Braun?" Ask for an appointment aloud.', modelAnswer: 'Ich möchte einen Termin machen.', modelAudioUrl: '/audio/checkpoints/cp5-s-termin-model.mp3', criteria: ['möchte in slot 2, machen at the very end', 'einen Termin — the -en said'] } },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Grammar & vocab — modal survival',
      instruction: 'Closed book. Answer, don\'t guess.',
      items: [
        { id: 'cp5-g-modal', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Ich kann morgen kommen. — where does the second verb go?', expected: 'To the end.', points: 2, weaknessTags: ['grammar:modal_word_order'],
          task: { kind: 'choice', question: '"Ich kann morgen kommen." — why is kommen at the end?', options: ['The modal (kann) takes slot 2 and kicks the real verb to the end', 'kommen always goes last in German', 'It is a mistake — kommen belongs after kann', 'Because morgen is a time word'], correctAnswer: 'The modal (kann) takes slot 2 and kicks the real verb to the end' } },
        { id: 'cp5-g-koennen', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Können Sie mir helfen? — what are you asking?', expected: 'Can you help me (polite).', points: 2, weaknessTags: ['sprechen:request_phrase', 'vocab:travel_health'],
          task: { kind: 'choice', question: '"Können Sie mir helfen?" asks…', options: ['Can you help me? (polite)', 'Can I help you?', 'Do you need help?', 'Where is the help desk?'], correctAnswer: 'Can you help me? (polite)' } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'hoeren:announcements', title: 'Announcement listening', mustDo: ['Listen to 6 slow announcements.', 'Write place/time/action for each.', 'Retest 3 new ones.'], output: 'Travel note filled 5/6.', timeBoxMinutes: 15, retest: 'Catch 3 new announcements first time.', libraryHref: '/learn/9', libraryLabel: 'Travel lessons' },
    { weaknessTag: 'hoeren:audio_to_form', title: 'Audio to form', mustDo: ['Listen to 5 personal-info clips.', 'Fill the form fields.', 'Retest 2 new forms.'], output: '2 forms from audio, error-free.', timeBoxMinutes: 12, retest: 'Fill one new form from audio.', libraryHref: '/learn/9', libraryLabel: 'Travel lessons' },
    { weaknessTag: 'grammar:modal_word_order', title: 'Modal word order', mustDo: ['Repair 10 modal sentences (second verb to the end).', 'Role-play one appointment request.', 'Retest 5 items.'], output: 'Modal pattern automatic.', timeBoxMinutes: 10, retest: 'Say 3 modal sentences correctly.', libraryHref: '/learn/10', libraryLabel: 'Health & appointments lessons' },
    { weaknessTag: 'sprechen:request_phrase', title: 'Polite requests', mustDo: ['Shadow Können Sie ...? / Ich möchte ... / Bitte ...', 'Say 5 situation requests.', 'Retest 5 new cards.'], output: 'Five clean requests.', timeBoxMinutes: 10, retest: 'Handle doctor + station card aloud.', libraryHref: '/games/sag-es', libraryLabel: 'Sag es! speaking drill' },
    { weaknessTag: 'vocab:travel_health', title: 'Travel & health words', mustDo: ['Review tagged words with audio.', 'Match picture/situation to phrase.', 'Say one request per situation.'], output: 'Travel/health set recalled.', timeBoxMinutes: 12, retest: 'Mixed retest with situations.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
  ],
};

const checkpoint6: SpineCheckpoint = {
  moduleId: 6,
  title: 'Work, free time, messages',
  passRule: '70%+, and the 30-word message with all 3 points.',
  sections: [
    {
      id: 'sprechen',
      title: 'Sprechen — topic cards',
      instruction: 'Answer aloud like in Sprechen Teil 2, then compare with the model.',
      items: [
        { id: 'cp6-s-beruf', sectionId: 'sprechen', mode: 'speak', prompt: 'Answer: Was sind Sie von Beruf?', expected: 'Ich bin ... / Ich arbeite als ... (no article before the job).', points: 2, weaknessTags: ['sprechen:question_answer', 'vocab:work_hobbies'],
          task: { kind: 'production', action: 'say', question: 'Topic card: "Beruf". The examiner asks: "Was sind Sie von Beruf?" Answer aloud with your real job or studies.', modelAnswer: 'Ich arbeite als Verkäufer. / Ich bin Studentin.', modelAudioUrl: '/audio/checkpoints/cp6-s-beruf-model.mp3', criteria: ['Full sentence aloud', 'NO article before the job: Ich bin Lehrer, never "ein Lehrer"'] } },
        { id: 'cp6-s-freizeit', sectionId: 'sprechen', mode: 'speak', prompt: 'Answer: Was machen Sie in Ihrer Freizeit?', expected: 'Two hobby sentences.', points: 2, weaknessTags: ['sprechen:question_answer', 'vocab:work_hobbies'],
          task: { kind: 'production', action: 'say', question: 'Topic card: "Freizeit". Say two sentences aloud about what you actually do.', modelAnswer: 'Ich spiele gern Cricket. Am Wochenende sehe ich Filme.', modelAudioUrl: '/audio/checkpoints/cp6-s-freizeit-model.mp3', criteria: ['Two full sentences', 'gern or a time phrase used naturally', 'Verb second in both'] } },
      ],
    },
    {
      id: 'schreiben',
      title: 'Schreiben — the 30-word message',
      instruction: 'This is Schreiben Teil 2. All three points or it fails — write it for real.',
      items: [
        { id: 'cp6-w-message', sectionId: 'schreiben', mode: 'write', prompt: 'Write a ~30-word invitation covering: what, when, where.', expected: 'All 3 points present and understandable.', points: 4, weaknessTags: ['schreiben:three_points'], requiredForPass: true,
          task: { kind: 'production', action: 'write', question: 'Write a ~30-word invitation to a friend. It MUST answer: what is happening, when, and where. Write it in the box before you look at the model.', modelAnswer: 'Liebe Anna, ich mache am Samstag eine Party bei mir zu Hause. Wir beginnen um 18 Uhr. Kommst du? Bitte antworte mir. Viele Grüße, Nivin', criteria: ['Point 1: WHAT is happening', 'Point 2: WHEN it happens', 'Point 3: WHERE it happens', 'Roughly 30 words, understandable throughout'] } },
        { id: 'cp6-w-frame', sectionId: 'schreiben', mode: 'write', prompt: 'Open and close correctly: Liebe/Lieber ... → Viele Grüße.', expected: 'Greeting + closing both present.', points: 2, weaknessTags: ['schreiben:greeting_closing'],
          task: { kind: 'choice', question: 'Which opening/closing pair is right for a message to a friend?', options: ['Liebe Anna, … Viele Grüße', 'Sehr geehrte Anna, … Hochachtungsvoll', 'Hey!! … Ende', 'Liebe Anna, … Mit freundlichen Grüßen, Herr K. Menon'], correctAnswer: 'Liebe Anna, … Viele Grüße' } },
      ],
    },
    {
      id: 'lesen',
      title: 'Lesen — messages',
      instruction: 'Read once, answer.',
      items: [
        { id: 'cp6-l-sms', sectionId: 'lesen', mode: 'match', prompt: 'Read a short SMS invitation — find when, where, what.', expected: 'All three details.', points: 2, weaknessTags: ['lesen:emails'],
          task: { kind: 'choice', question: 'SMS: "Hallo! Wir treffen uns am Freitag um 17 Uhr im Café Milano. Bis dann!" — When and where?', options: ['Friday 17:00, Café Milano', 'Thursday 17:00, Café Milano', 'Friday 7:00 in the morning, Café Milano', 'Saturday 17:00, at home'], correctAnswer: 'Friday 17:00, Café Milano' } },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Grammar & vocab — connectors',
      instruction: 'Closed book. Answer, don\'t guess.',
      items: [
        { id: 'cp6-g-separable', sectionId: 'grammarVocab', mode: 'choose', prompt: 'Ich stehe um 7 Uhr auf. — why is auf at the end?', expected: 'Separable verb: aufstehen.', points: 2, weaknessTags: ['grammar:verb_position'],
          task: { kind: 'choice', question: '"Ich stehe um 7 Uhr auf." Why is "auf" sitting at the end?', options: ['aufstehen is separable — the prefix flies to the end', 'auf is a preposition describing the bed', 'It is a word-order mistake', 'auf belongs to "Uhr"'], correctAnswer: 'aufstehen is separable — the prefix flies to the end' } },
        { id: 'cp6-g-connector', sectionId: 'grammarVocab', mode: 'choose', prompt: 'und · aber · oder — use each in a sentence.', expected: 'Three connector sentences.', points: 2, weaknessTags: ['grammar:verb_position', 'vocab:work_hobbies'],
          task: { kind: 'type', question: 'Join the two halves with the right connector: "Ich lerne Deutsch, ___ ich habe wenig Zeit." (but)', accepted: ['aber'], placeholder: 'und / aber / oder?' } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'schreiben:three_points', title: 'Three-point message', mustDo: ['Mark the 3 required points in a model.', 'Write a 30-word SMS to a new prompt.', 'Self-score with the rubric.'], output: 'One message with all 3 points.', timeBoxMinutes: 12, retest: 'New prompt, all 3 points, ~30 words.', libraryHref: '/learn/12', libraryLabel: 'Messages lessons' },
    { weaknessTag: 'schreiben:greeting_closing', title: 'Greeting and closing', mustDo: ['Copy 4 correct openings/closings.', 'Repair 6 wrong messages.', 'Retest one message.'], output: 'Frame automatic.', timeBoxMinutes: 8, retest: 'Write opening + closing from memory.', libraryHref: '/learn/12', libraryLabel: 'Messages lessons' },
    { weaknessTag: 'sprechen:question_answer', title: 'Topic-card answers', mustDo: ['Drill 10 W-question cards.', 'Answer aloud in full sentences.', 'Retest 5 random cards.'], output: 'Ten spoken answers.', timeBoxMinutes: 12, retest: 'Answer 5 cards without preparation.', libraryHref: '/games/sag-es', libraryLabel: 'Sag es! speaking drill' },
    { weaknessTag: 'lesen:emails', title: 'Message reading', mustDo: ['Answer who/when/where/action for 5 short messages.', 'Retest 3 messages.'], output: '4/5 messages decoded.', timeBoxMinutes: 10, retest: 'Decode 3 new messages in 6 minutes.', libraryHref: '/games/was-steht-da', libraryLabel: 'Was steht da? reading drill' },
    { weaknessTag: 'vocab:work_hobbies', title: 'Work & hobby words', mustDo: ['Review tagged words with audio.', 'Recall without looking.', 'Say 6 sentences about your week.'], output: 'Work/hobby set recalled.', timeBoxMinutes: 12, retest: 'Mixed retest in sentences.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
  ],
};

const checkpoint7: SpineCheckpoint = {
  moduleId: 7,
  title: 'Official life and exam skills',
  passRule: '60%+ per Goethe skill tested here; forms complete.',
  sections: [
    {
      id: 'lesen',
      title: 'Lesen — signs, notices, ads',
      instruction: 'Timed mindset: scan, don\'t translate.',
      items: [
        { id: 'cp7-l-sign', sectionId: 'lesen', mode: 'match', prompt: 'Sign: Geöffnet Mo-Fr 9-17 Uhr. — Open on Saturday?', expected: 'No — weekdays only.', points: 2, weaknessTags: ['lesen:signs'],
          task: { kind: 'choice', question: 'Shop sign: "Geöffnet Mo–Fr 9–17 Uhr." You arrive on Saturday at 11. The shop is…', options: ['Closed — it opens weekdays only', 'Open until 17:00', 'Open until 12:00', 'Impossible to tell'], correctAnswer: 'Closed — it opens weekdays only' } },
        { id: 'cp7-l-notice', sectionId: 'lesen', mode: 'match', prompt: 'Notice: Bitte klingeln. — what should you do?', expected: 'Ring the bell.', points: 2, weaknessTags: ['lesen:signs', 'vocab:official_exam'],
          task: { kind: 'type', question: 'Notice on an office door: "Bitte klingeln." Type in English what you should do:', accepted: ['ring the bell', 'ring bell', 'ring', 'ring the doorbell'], placeholder: 'what do you do?' } },
        { id: 'cp7-l-scan', sectionId: 'lesen', mode: 'do', prompt: 'Scan 4 short ads for one detail each, under 5 minutes.', expected: '3/4 details found in time.', points: 2, weaknessTags: ['lesen:scanning', 'lesen:ads'],
          task: { kind: 'choice', question: 'Scan, don\'t read: 1) Fahrrad, gebraucht, 40 € · 2) Kinderbett mit Matratze, 25 € · 3) Sofa, rot, 60 € · 4) Handy, neu, 99 €. Which ad is for a child?', options: ['Ad 2', 'Ad 1', 'Ad 3', 'Ad 4'], correctAnswer: 'Ad 2' } },
      ],
    },
    {
      id: 'schreiben',
      title: 'Schreiben — official forms',
      instruction: 'This is Schreiben Teil 1. Wrong field = zero, even with correct German.',
      items: [
        { id: 'cp7-w-form', sectionId: 'schreiben', mode: 'write', prompt: 'Fill a full form: Name, Adresse, Geburtsdatum, Staatsangehörigkeit, Unterschrift.', expected: 'Every field right, nothing swapped.', points: 4, weaknessTags: ['schreiben:form_fields', 'lesen:forms'], requiredForPass: true,
          task: { kind: 'choice', question: 'The form field says "Staatsangehörigkeit". Nivin is from India. What does he write?', options: ['indisch', 'Indien', 'Kochi, Indien', 'Malayalam'], correctAnswer: 'indisch' } },
        { id: 'cp7-w-audio-form', sectionId: 'schreiben', mode: 'write', prompt: 'Fill 2 form fields from spoken information.', expected: 'Both fields correct.', points: 2, weaknessTags: ['hoeren:audio_to_form'],
          task: { kind: 'type', question: 'Play the audio — a caller leaves their details. Type the phone number into the form:', accepted: ['01759932', '0175 9932', '0175 99 32'], audioUrl: '/audio/checkpoints/cp7-w-audio-form.mp3', placeholder: 'digits' } },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — office German',
      instruction: 'Say it aloud, office-real. Then compare with the model.',
      items: [
        { id: 'cp7-s-office', sectionId: 'sprechen', mode: 'speak', prompt: 'Say: Ich möchte einen Termin. / Ich brauche ein Formular.', expected: 'Two office requests, polite register.', points: 2, weaknessTags: ['sprechen:request_phrase', 'vocab:official_exam'],
          task: { kind: 'production', action: 'say', question: 'At the Amt counter. Make BOTH requests aloud: an appointment, and a form.', modelAnswer: 'Ich möchte einen Termin. Ich brauche ein Formular.', modelAudioUrl: '/audio/checkpoints/cp7-s-office-model.mp3', criteria: ['Both requests said aloud', 'Polite register — Sie-world German', 'einen Termin / ein Formular articles right'] } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'lesen:signs', title: 'Signs and notices', mustDo: ['Match 15 signs to situations.', 'Retest 5 signs in 5 minutes.'], output: '13/15 signs matched.', timeBoxMinutes: 12, retest: '5 new signs, 5 minutes.', libraryHref: '/games/was-steht-da', libraryLabel: 'Was steht da? reading drill' },
    { weaknessTag: 'lesen:scanning', title: 'Scanning strategy', mustDo: ['Watch the scanning strategy clip.', 'One timed drill of the same type.', 'Retest with new text.'], output: 'Detail found before time runs out.', timeBoxMinutes: 10, retest: 'Timed scan, 4 ads, 5 minutes.', libraryHref: '/learn/17', libraryLabel: 'Exam reading lessons' },
    { weaknessTag: 'lesen:forms', title: 'Form field labels', mustDo: ['Identify field labels in 4 forms.', 'Retest 1 complete form.'], output: 'No label confusion.', timeBoxMinutes: 8, retest: 'Label 8 fields without notes.', libraryHref: '/learn/14', libraryLabel: 'Official life lessons' },
    { weaknessTag: 'schreiben:form_fields', title: 'Forms error-free', mustDo: ['Fill 3 forms from data cards.', 'Fill 1 form from audio.', 'Retest one form.'], output: '2 forms, zero missing fields.', timeBoxMinutes: 12, retest: 'One new form error-free.', libraryHref: '/learn/14', libraryLabel: 'Official life lessons' },
    { weaknessTag: 'hoeren:audio_to_form', title: 'Audio to form', mustDo: ['Listen to 5 personal-info clips.', 'Fill the fields.', 'Retest 2 new forms.'], output: 'Audio transfer clean.', timeBoxMinutes: 12, retest: 'One new audio form.', libraryHref: '/learn/17', libraryLabel: 'Exam listening lessons' },
    { weaknessTag: 'vocab:official_exam', title: 'Official vocabulary', mustDo: ['Review tagged official words with audio.', 'Fill forms/notices using the exact labels.', 'Retest mixed.'], output: 'Official set recalled.', timeBoxMinutes: 12, retest: 'Mixed retest with notices.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
  ],
};

const checkpoint8: SpineCheckpoint = {
  moduleId: 8,
  title: 'Goethe A1 readiness',
  passRule: 'Timed full mock ≥60 overall, no section below 45, speaking done aloud.',
  sections: [
    {
      id: 'hoeren',
      title: 'Hören — timed section',
      instruction: 'Checked automatically against your real mock results — no self-report.',
      items: [
        { id: 'cp8-h-mock', sectionId: 'hoeren', mode: 'do', prompt: 'Completed a timed Hören section (20m).', expected: 'A full timed mock on record.', points: 3, weaknessTags: ['hoeren:dialogue_detail', 'hoeren:announcements'],
          task: { kind: 'auto', question: 'A full timed mock (with its Hören section) exists in your results.', source: 'full-mock-exists' } },
      ],
    },
    {
      id: 'lesen',
      title: 'Lesen — timed section',
      instruction: 'Checked automatically against your real mock results.',
      items: [
        { id: 'cp8-l-mock', sectionId: 'lesen', mode: 'do', prompt: 'Completed a timed Lesen section (25m).', expected: 'A full timed mock on record.', points: 3, weaknessTags: ['lesen:scanning', 'lesen:emails'],
          task: { kind: 'auto', question: 'A full timed mock (with its Lesen section) exists in your results.', source: 'full-mock-exists' } },
      ],
    },
    {
      id: 'schreiben',
      title: 'Schreiben — timed tasks',
      instruction: 'Form + message under 20 minutes — write for real, then rubric-score.',
      items: [
        { id: 'cp8-w-mock', sectionId: 'schreiben', mode: 'write', prompt: 'Form filled + 30-word message with all 3 points, in 20m.', expected: 'Rubric ≥3/5, no missing point.', points: 3, weaknessTags: ['schreiben:three_points', 'schreiben:form_fields'],
          task: { kind: 'production', action: 'write', question: 'Set a 20-minute timer. Write a ~30-word message to your teacher: you are ill, you cannot come today, ask for the homework. Write it in the box.', modelAnswer: 'Liebe Frau Fischer, ich bin krank und kann heute nicht zum Kurs kommen. Können Sie mir bitte die Hausaufgaben schicken? Vielen Dank. Viele Grüße, Nivin', criteria: ['Point 1: you are ill', 'Point 2: you cannot come', 'Point 3: you ask for the homework', 'Greeting + closing present, ~30 words, done inside 20 minutes'] } },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — full simulation',
      instruction: 'All three Teile aloud: intro, word cards, requests.',
      items: [
        { id: 'cp8-s-mock', sectionId: 'sprechen', mode: 'speak', prompt: 'Full speaking simulation done aloud (Teil 1-3).', expected: 'Intro fluent under 60s; cards and requests answered.', points: 4, weaknessTags: ['sprechen:self_intro', 'sprechen:question_answer', 'sprechen:request_phrase'], requiredForPass: true,
          task: { kind: 'production', action: 'say', question: 'Run the full Sprechen now, aloud, in one go: Teil 1 — your self-intro (under 60s). Teil 2 — answer two topic-card questions (Essen, Familie). Teil 3 — make two polite requests.', modelAnswer: 'Teil 1: Ich heiße … Ich komme aus … Ich wohne in … Ich spreche … · Teil 2: Ich esse gern Reis. Meine Familie wohnt in Kochi. · Teil 3: Können Sie mir bitte helfen? Ich hätte gern ein Wasser.', criteria: ['Intro fluent, under 60 seconds', 'Both topic-card answers in full sentences', 'Both requests polite (Sie / bitte)'] } },
        { id: 'cp8-s-mock2', sectionId: 'sprechen', mode: 'speak', prompt: 'Speaking Simulator run on two different days.', expected: 'Two simulator runs on record.', points: 2, weaknessTags: ['sprechen:fluency_pause'],
          task: { kind: 'auto', question: 'Two Speaking Simulator runs on record, on two different days — read from your saved runs, no self-report.', source: 'simulator-2-days' } },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Full mocks',
      instruction: 'The readiness proof — read directly from your mock results.',
      items: [
        { id: 'cp8-g-mock60', sectionId: 'grammarVocab', mode: 'do', prompt: 'One full timed mock completed, ≥60 overall.', expected: 'Pass level reached.', points: 3, weaknessTags: ['vocab:official_exam'],
          task: { kind: 'auto', question: 'One full timed mock scored ≥60 overall.', source: 'full-mock-60' } },
        { id: 'cp8-g-mock75', sectionId: 'grammarVocab', mode: 'do', prompt: 'Second full timed mock ≥75 overall.', expected: 'Comfortable pass margin.', points: 2, weaknessTags: ['vocab:official_exam'],
          task: { kind: 'auto', question: 'A full timed mock scored ≥75 overall — the comfortable-pass margin.', source: 'full-mock-75' } },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'hoeren:dialogue_detail', title: 'Hören detail recovery', mustDo: ['Replay the failed Teil with transcript hidden.', 'One focused drill, 10-15 items.', 'Retest the same Teil type.'], output: 'Failed Teil ≥70%.', timeBoxMinutes: 15, retest: 'Retake only the weak Hören Teil.', libraryHref: '/tests', libraryLabel: 'Mock tests' },
    { weaknessTag: 'lesen:scanning', title: 'Lesen timing recovery', mustDo: ['Scanning strategy clip.', 'One timed same-type drill.', 'Retest with new text.'], output: 'Section finished in time.', timeBoxMinutes: 12, retest: 'Retake only the weak Lesen Teil.', libraryHref: '/tests', libraryLabel: 'Mock tests' },
    { weaknessTag: 'schreiben:three_points', title: 'Message under pressure', mustDo: ['Rebuild one model answer.', 'Write one new message, timed 10m.', 'Rubric self-score.'], output: 'Timed message ≥3/5.', timeBoxMinutes: 15, retest: 'New prompt, timed, all 3 points.', libraryHref: '/learn/18', libraryLabel: 'Exam writing lessons' },
    { weaknessTag: 'sprechen:self_intro', title: 'Speaking simulation rerun', mustDo: ['Shadow the model intro.', 'Run Teil 1 aloud, recorded.', 'Compare with the model.'], output: 'Intro under 60 seconds.', timeBoxMinutes: 12, retest: 'Full Teil 1-3 rerun aloud.', libraryHref: '/missions/module-2/final-self-intro', libraryLabel: 'Self-intro mission' },
    { weaknessTag: 'sprechen:fluency_pause', title: 'Fluency pass', mustDo: ['Shadow 10 model lines at full speed.', 'Re-run the weakest Teil aloud.', 'Record and listen once.'], output: 'Fewer frozen pauses.', timeBoxMinutes: 12, retest: 'One smooth full simulation.', libraryHref: '/games/sag-es', libraryLabel: 'Sag es! speaking drill' },
    { weaknessTag: 'vocab:official_exam', title: 'Mock-driven review', mustDo: ['List every word you missed in the mock.', 'Review them with audio.', 'Use 8 in sentences.'], output: 'Personal gap list cleared.', timeBoxMinutes: 15, retest: 'Retake the weakest section.', libraryHref: '/practice/review', libraryLabel: '5-min SRS review' },
  ],
};

export const SPINE_CHECKPOINTS: Record<number, SpineCheckpoint> = {
  2: checkpoint2,
  3: checkpoint3,
  4: checkpoint4,
  5: checkpoint5,
  6: checkpoint6,
  7: checkpoint7,
  8: checkpoint8,
};

export function getSpineCheckpoint(moduleId: number): SpineCheckpoint | undefined {
  return SPINE_CHECKPOINTS[moduleId];
}

export function scoreSpineCheckpoint(checkpoint: SpineCheckpoint, passedItemIds: string[]): CheckpointScore {
  const passed = new Set(passedItemIds);
  const sectionScores: CheckpointScore['sectionScores'] = {};
  const sectionPercents: Record<string, number> = {};

  for (const section of checkpoint.sections) {
    const total = section.items.reduce((sum, item) => sum + item.points, 0);
    const earned = section.items.reduce((sum, item) => sum + (passed.has(item.id) ? item.points : 0), 0);
    sectionScores[section.id] = { earned, total };
    sectionPercents[section.id] = total > 0 ? Math.round((earned / total) * 100) : 0;
  }

  const allItems = checkpoint.sections.flatMap((section) => section.items);
  const totalPoints = allItems.reduce((sum, item) => sum + item.points, 0);
  const earnedPoints = allItems.reduce((sum, item) => sum + (passed.has(item.id) ? item.points : 0), 0);
  const percent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  const failedTags = Array.from(new Set(
    allItems.filter((item) => !passed.has(item.id)).flatMap((item) => item.weaknessTags)
  ));

  const requiredMissed = allItems.some((item) => item.requiredForPass && !passed.has(item.id));
  const sectionFloorMissed = Object.entries(checkpoint.sectionFloorForPass || {}).some(([sectionId, floor]) =>
    (sectionPercents[sectionId] ?? 0) < (floor ?? 0));
  const state: CheckpointScore['state'] = percent < 60 || requiredMissed || sectionFloorMissed ? 'FAIL' : percent < 70 ? 'WEAK' : 'PASS';

  const isFinal = checkpoint.moduleId === 8;
  const label = state === 'PASS'
    ? isFinal ? 'Ready. Book your exam.' : `Pass. Start Module ${checkpoint.moduleId + 1}.`
    : state === 'WEAK'
      ? isFinal ? 'Close. One recovery, then re-run the mock.' : `Weak pass. Do one recovery, then start Module ${checkpoint.moduleId + 1}.`
      : 'Recovery gate. Fix the first weak spot, then retest.';

  const firstRecovery = checkpoint.recoveryCards.find((card) => failedTags.includes(card.weaknessTag));
  const nextAction = state === 'PASS'
    ? isFinal ? 'Follow the final 7-day exam plan.' : `Start Module ${checkpoint.moduleId + 1}.`
    : firstRecovery
      ? `${firstRecovery.title}: ${firstRecovery.mustDo[0]} ${firstRecovery.timeBoxMinutes}m.`
      : 'Redo the checkpoint after one 10m review block.';

  return { earnedPoints, totalPoints, percent, state, label, sectionScores, sectionPercents, failedTags, nextAction };
}

export function toSpineCheckpointResult(checkpoint: SpineCheckpoint, score: CheckpointScore): SpineCheckpointResult {
  return {
    moduleId: checkpoint.moduleId,
    percent: score.percent,
    state: score.state,
    failedTags: score.failedTags,
    sectionPercents: score.sectionPercents,
    savedAt: Date.now(),
  };
}

export function findRecoveryCards(checkpoint: SpineCheckpoint, failedTags: string[], max = 3): RecoveryCard[] {
  const tagSet = new Set(failedTags);
  return checkpoint.recoveryCards.filter((card) => tagSet.has(card.weaknessTag)).slice(0, max);
}
