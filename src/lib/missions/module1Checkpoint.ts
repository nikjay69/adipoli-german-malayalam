export type Module1CheckpointSectionId = 'hoeren' | 'sprechen' | 'lesen' | 'schreiben' | 'grammarVocab';

export type Module1CheckpointTag =
  | 'hoeren:greetings'
  | 'hoeren:question_recognition'
  | 'vocab:greeting_set'
  | 'sprechen:greeting_reply'
  | 'sprechen:formality'
  | 'pronunciation:ch_sch'
  | 'pronunciation:w_v'
  | 'lesen:greeting_recognition'
  | 'schreiben:first_sentence'
  | 'grammar:capitalisation_basics'
  | 'vocab:deutsch_vs_deutschland'
  | 'grammar:formal_context'
  | 'vocab:first_sentence_chunks';

export type Module1CheckpointItem = {
  id: string;
  sectionId: Module1CheckpointSectionId;
  mode: 'listen' | 'speak' | 'match' | 'write' | 'choose';
  prompt: string;
  expected: string;
  points: number;
  weaknessTags: Module1CheckpointTag[];
  requiredForPass?: boolean;
};

export type Module1CheckpointSection = {
  id: Module1CheckpointSectionId;
  title: string;
  instruction: string;
  maxPoints: number;
  items: Module1CheckpointItem[];
};

export type Module1CheckpointRecoveryCard = {
  weaknessTag: Module1CheckpointTag;
  title: string;
  mustDo: string[];
  output: string;
  timeBoxMinutes: number;
  retest: string;
};

export type Module1CheckpointScore = {
  earnedPoints: number;
  totalPoints: number;
  percent: number;
  state: 'PASS' | 'WEAK' | 'FAIL';
  label: string;
  sectionScores: Record<Module1CheckpointSectionId, { earned: number; total: number }>;
  failedTags: Module1CheckpointTag[];
  nextAction: string;
};

export const MODULE1_CHECKPOINT_RESULT_STORAGE_KEY = 'adipoli:module1:checkpointResult';

export const module1CheckpointSections: Module1CheckpointSection[] = [
  {
    id: 'hoeren',
    title: 'Hören — greetings',
    instruction: 'Hear/read the prompt. Mark only what you can answer without notes.',
    maxPoints: 10,
    items: [
      {
        id: 'hoeren-guten-morgen',
        sectionId: 'hoeren',
        mode: 'listen',
        prompt: 'Frau Weber says: Guten Morgen.',
        expected: 'Guten Morgen. / Guten Morgen, Frau Weber.',
        points: 2,
        weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
        requiredForPass: true,
      },
      {
        id: 'hoeren-guten-tag',
        sectionId: 'hoeren',
        mode: 'listen',
        prompt: 'Frau Weber says: Guten Tag.',
        expected: 'Guten Tag.',
        points: 2,
        weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
      },
      {
        id: 'hoeren-guten-abend',
        sectionId: 'hoeren',
        mode: 'listen',
        prompt: 'Frau Weber says: Guten Abend.',
        expected: 'Guten Abend.',
        points: 2,
        weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
      },
      {
        id: 'hoeren-auf-wiedersehen',
        sectionId: 'hoeren',
        mode: 'listen',
        prompt: 'Frau Weber says: Auf Wiedersehen.',
        expected: 'Auf Wiedersehen.',
        points: 2,
        weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
      },
      {
        id: 'hoeren-lernen-sie-deutsch',
        sectionId: 'hoeren',
        mode: 'listen',
        prompt: 'Frau Weber asks: Lernen Sie Deutsch?',
        expected: 'Ja. Ich lerne Deutsch.',
        points: 2,
        weaknessTags: ['hoeren:question_recognition', 'vocab:first_sentence_chunks'],
      },
    ],
  },
  {
    id: 'sprechen',
    title: 'Sprechen — first reply',
    instruction: 'Say the three chunks aloud. Self-mark honestly; this is diagnostic.',
    maxPoints: 10,
    items: [
      {
        id: 'sprechen-three-chunks',
        sectionId: 'sprechen',
        mode: 'speak',
        prompt: 'Say: Guten Morgen, Frau Weber. Ich lerne Deutsch. Auf Wiedersehen.',
        expected: 'All three chunks without freezing.',
        points: 4,
        weaknessTags: ['sprechen:greeting_reply'],
        requiredForPass: true,
      },
      {
        id: 'sprechen-understandable',
        sectionId: 'sprechen',
        mode: 'speak',
        prompt: 'Pronunciation is mostly understandable.',
        expected: 'Clear enough for a teacher/examiner.',
        points: 2,
        weaknessTags: ['pronunciation:ch_sch', 'pronunciation:w_v'],
      },
      {
        id: 'sprechen-formal-tone',
        sectionId: 'sprechen',
        mode: 'speak',
        prompt: 'Formal/polite tone is safe with Frau Weber.',
        expected: 'Uses Frau Weber / Guten Tag / Auf Wiedersehen safely.',
        points: 2,
        weaknessTags: ['sprechen:formality', 'grammar:formal_context'],
      },
      {
        id: 'sprechen-repeat-after-correction',
        sectionId: 'sprechen',
        mode: 'speak',
        prompt: 'Can repeat once after correction.',
        expected: 'No freezing after a correction prompt.',
        points: 2,
        weaknessTags: ['sprechen:greeting_reply'],
      },
    ],
  },
  {
    id: 'lesen',
    title: 'Lesen — recognise lines',
    instruction: 'Match German to meaning without looking back at the lesson.',
    maxPoints: 10,
    items: [
      {
        id: 'lesen-guten-morgen',
        sectionId: 'lesen',
        mode: 'match',
        prompt: 'Guten Morgen',
        expected: 'Good morning.',
        points: 2,
        weaknessTags: ['lesen:greeting_recognition', 'vocab:greeting_set'],
      },
      {
        id: 'lesen-guten-tag',
        sectionId: 'lesen',
        mode: 'match',
        prompt: 'Guten Tag',
        expected: 'Good day / hello.',
        points: 2,
        weaknessTags: ['lesen:greeting_recognition', 'vocab:greeting_set'],
      },
      {
        id: 'lesen-auf-wiedersehen',
        sectionId: 'lesen',
        mode: 'match',
        prompt: 'Auf Wiedersehen',
        expected: 'Goodbye.',
        points: 2,
        weaknessTags: ['lesen:greeting_recognition', 'vocab:greeting_set'],
      },
      {
        id: 'lesen-ich-lerne-deutsch',
        sectionId: 'lesen',
        mode: 'match',
        prompt: 'Ich lerne Deutsch',
        expected: 'I am learning German.',
        points: 2,
        weaknessTags: ['vocab:first_sentence_chunks'],
      },
      {
        id: 'lesen-deutsch-language',
        sectionId: 'lesen',
        mode: 'match',
        prompt: 'Deutsch',
        expected: 'German language.',
        points: 2,
        weaknessTags: ['vocab:deutsch_vs_deutschland'],
      },
    ],
  },
  {
    id: 'schreiben',
    title: 'Schreiben — first sentence',
    instruction: 'Write from memory: Ich lerne Deutsch.',
    maxPoints: 5,
    items: [
      {
        id: 'schreiben-ich-capital',
        sectionId: 'schreiben',
        mode: 'write',
        prompt: 'Ich is present and capitalised.',
        expected: 'Ich',
        points: 2,
        weaknessTags: ['schreiben:first_sentence', 'grammar:capitalisation_basics'],
      },
      {
        id: 'schreiben-lerne',
        sectionId: 'schreiben',
        mode: 'write',
        prompt: 'lerne is correct enough.',
        expected: 'lerne',
        points: 1,
        weaknessTags: ['schreiben:first_sentence', 'vocab:first_sentence_chunks'],
      },
      {
        id: 'schreiben-deutsch-capital',
        sectionId: 'schreiben',
        mode: 'write',
        prompt: 'Deutsch is correct and capitalised.',
        expected: 'Deutsch',
        points: 1,
        weaknessTags: ['schreiben:first_sentence', 'grammar:capitalisation_basics'],
      },
      {
        id: 'schreiben-whole-sentence',
        sectionId: 'schreiben',
        mode: 'write',
        prompt: 'Whole sentence is understandable.',
        expected: 'Ich lerne Deutsch.',
        points: 1,
        weaknessTags: ['schreiben:first_sentence'],
      },
    ],
  },
  {
    id: 'grammarVocab',
    title: 'Grammar/vocab — safety traps',
    instruction: 'Mark the tiny facts you can answer cleanly.',
    maxPoints: 10,
    items: [
      {
        id: 'grammar-deutsch-deutschland',
        sectionId: 'grammarVocab',
        mode: 'choose',
        prompt: 'Deutsch is the language; Deutschland is the country.',
        expected: 'True.',
        points: 2,
        weaknessTags: ['vocab:deutsch_vs_deutschland'],
      },
      {
        id: 'grammar-formal-teacher',
        sectionId: 'grammarVocab',
        mode: 'choose',
        prompt: 'Safer with a teacher/examiner: Hallo or Guten Tag?',
        expected: 'Guten Tag.',
        points: 2,
        weaknessTags: ['grammar:formal_context', 'sprechen:formality'],
      },
      {
        id: 'grammar-gute-nacht',
        sectionId: 'grammarVocab',
        mode: 'choose',
        prompt: 'When do you use Gute Nacht?',
        expected: 'Going to sleep, not a normal evening hello.',
        points: 2,
        weaknessTags: ['vocab:greeting_set'],
      },
      {
        id: 'grammar-ich-meaning',
        sectionId: 'grammarVocab',
        mode: 'choose',
        prompt: 'What does Ich mean?',
        expected: 'I.',
        points: 2,
        weaknessTags: ['vocab:first_sentence_chunks'],
      },
      {
        id: 'grammar-lernen-meaning',
        sectionId: 'grammarVocab',
        mode: 'choose',
        prompt: 'What does lernen mean?',
        expected: 'To learn.',
        points: 2,
        weaknessTags: ['vocab:first_sentence_chunks'],
      },
    ],
  },
];

export const module1CheckpointItems = module1CheckpointSections.flatMap((section) => section.items);

export const module1CheckpointRecoveryCards: Module1CheckpointRecoveryCard[] = [
  {
    weaknessTag: 'hoeren:greetings',
    title: 'Hören — greetings',
    mustDo: ['Replay 10 greeting lines.', 'Choose the response without subtitles.', 'Retest 5 lines.'],
    output: '4/5 greeting responses correct.',
    timeBoxMinutes: 12,
    retest: 'Hear 5 greetings; answer 4 correctly.',
  },
  {
    weaknessTag: 'hoeren:question_recognition',
    title: 'Question recognition',
    mustDo: ['Replay Lernen Sie Deutsch?', 'Answer Ja. Ich lerne Deutsch. five times.', 'Retest with one hidden prompt.'],
    output: 'One clean spoken answer to a question.',
    timeBoxMinutes: 8,
    retest: 'Hear Lernen Sie Deutsch? and answer without looking.',
  },
  {
    weaknessTag: 'sprechen:greeting_reply',
    title: 'Sprechen — first reply',
    mustDo: ['Repeat Guten Morgen, Frau Weber. five times.', 'Repeat Ja. Ich lerne Deutsch. five times.', 'Say the full three-chunk line once.'],
    output: 'One spoken greeting exchange.',
    timeBoxMinutes: 10,
    retest: 'Frau Weber greets once; answer aloud.',
  },
  {
    weaknessTag: 'sprechen:formality',
    title: 'Formal safer default',
    mustDo: ['Sort 8 contexts into formal/casual.', 'Say Guten Tag and Auf Wiedersehen for the formal ones.', 'Retest 4 contexts.'],
    output: '4 formal/casual choices correct.',
    timeBoxMinutes: 8,
    retest: 'Teacher/examiner context gets Guten Tag, not Hallo/Tschüss.',
  },
  {
    weaknessTag: 'pronunciation:ch_sch',
    title: 'ch / sch repair',
    mustDo: ['Shadow ich, Deutsch, Tschüss, schön.', 'Identify ich vs isch in 8 lines.', 'Retest 5 words.'],
    output: '5-word shadow set.',
    timeBoxMinutes: 15,
    retest: 'Say ich and schön distinctly enough.',
  },
  {
    weaknessTag: 'pronunciation:w_v',
    title: 'w / v repair',
    mustDo: ['Compare Weber, Wasser, Visum, viel.', 'Say German w like English v.', 'Retest 6 words.'],
    output: '6-word contrast set.',
    timeBoxMinutes: 10,
    retest: 'Say Weber and Visum without swapping them.',
  },
  {
    weaknessTag: 'schreiben:first_sentence',
    title: 'Write first sentence',
    mustDo: ['Copy Ich lerne Deutsch. twice.', 'Hide it and write from memory.', 'Correct capital letters.'],
    output: 'One clean written sentence.',
    timeBoxMinutes: 8,
    retest: 'Write Ich lerne Deutsch. from memory.',
  },
  {
    weaknessTag: 'vocab:greeting_set',
    title: 'Greeting set',
    mustDo: ['Match 8 greeting/politeness words.', 'Use 4 in a mini-dialogue.', 'Retest 6 words.'],
    output: '6/6 greeting match.',
    timeBoxMinutes: 10,
    retest: 'Choose the correct greeting in 6 short contexts.',
  },
  {
    weaknessTag: 'vocab:deutsch_vs_deutschland',
    title: 'Deutsch vs Deutschland',
    mustDo: ['Write Deutsch = language.', 'Write Deutschland = country.', 'Say Ich lerne Deutsch. twice.'],
    output: 'No language/country swap.',
    timeBoxMinutes: 6,
    retest: 'Pick Deutsch for language in 3 examples.',
  },
  {
    weaknessTag: 'vocab:first_sentence_chunks',
    title: 'First sentence chunks',
    mustDo: ['Point to Ich = I.', 'Point to lerne = learn.', 'Say Ich lerne Deutsch. five times.'],
    output: 'Chunk meaning recall.',
    timeBoxMinutes: 7,
    retest: 'Explain the sentence chunks without notes.',
  },
];

const emptySectionScores = module1CheckpointSections.reduce((scores, section) => {
  scores[section.id] = { earned: 0, total: section.maxPoints };
  return scores;
}, {} as Record<Module1CheckpointSectionId, { earned: number; total: number }>);

export function scoreModule1Checkpoint(passedItemIds: string[]): Module1CheckpointScore {
  const passed = new Set(passedItemIds);
  const sectionScores = module1CheckpointSections.reduce((scores, section) => {
    scores[section.id] = {
      earned: section.items.reduce((sum, item) => sum + (passed.has(item.id) ? item.points : 0), 0),
      total: section.maxPoints,
    };
    return scores;
  }, { ...emptySectionScores } as Record<Module1CheckpointSectionId, { earned: number; total: number }>);

  const totalPoints = module1CheckpointSections.reduce((sum, section) => sum + section.maxPoints, 0);
  const earnedPoints = Object.values(sectionScores).reduce((sum, section) => sum + section.earned, 0);
  const percent = Math.round((earnedPoints / totalPoints) * 100);

  const failedTags = Array.from(new Set(
    module1CheckpointItems
      .filter((item) => !passed.has(item.id))
      .flatMap((item) => item.weaknessTags)
  ));

  const hoerenFailed = sectionScores.hoeren.earned < 6 || !passed.has('hoeren-guten-morgen');
  const sprechenFailed = sectionScores.sprechen.earned < 4 || !passed.has('sprechen-three-chunks');
  const hardFail = percent < 60 || hoerenFailed || !passed.has('sprechen-three-chunks');
  const weak = !hardFail && (percent < 70 || sprechenFailed || sectionScores.schreiben.earned < 3);
  const state: Module1CheckpointScore['state'] = hardFail ? 'FAIL' : weak ? 'WEAK' : 'PASS';

  const label = state === 'PASS'
    ? 'Pass. Start Module 2.'
    : state === 'WEAK'
      ? 'Weak pass. Do one recovery, then start Module 2.'
      : 'Recovery gate. Fix the first weak spot before Module 2.';

  const firstRecovery = module1CheckpointRecoveryCards.find((card) => failedTags.includes(card.weaknessTag));
  const nextAction = state === 'PASS'
    ? 'Start Module 2 self-introduction.'
    : firstRecovery
      ? `${firstRecovery.title}: ${firstRecovery.mustDo[0]} ${firstRecovery.timeBoxMinutes}m.`
      : 'Redo the checkpoint after one 10m review block.';

  return {
    earnedPoints,
    totalPoints,
    percent,
    state,
    label,
    sectionScores,
    failedTags,
    nextAction,
  };
}
