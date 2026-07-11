import {
  scoreSpineCheckpoint,
  type CheckpointItem,
  type CheckpointScore,
  type CheckpointSection,
  type RecoveryCard,
  type SpineCheckpoint,
} from '@/lib/spine-checkpoints';

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

export type Module1CheckpointItem = CheckpointItem;
export type Module1CheckpointSection = CheckpointSection;
export type Module1CheckpointRecoveryCard = RecoveryCard;
export type Module1CheckpointScore = Omit<CheckpointScore, 'failedTags'> & { failedTags: Module1CheckpointTag[] };

export const MODULE1_CHECKPOINT_RESULT_STORAGE_KEY = 'adipoli:module1:checkpointResult';

export const module1AdministeredCheckpoint: SpineCheckpoint = {
  moduleId: 1,
  title: 'First German moment',
  passRule: '70%+, Hören and Sprechen both at least 50%, and the full greeting produced aloud.',
  sectionFloorForPass: { hoeren: 50, sprechen: 50 },
  sections: [
    {
      id: 'hoeren',
      title: 'Hören — greetings in the room',
      instruction: 'Listen before answering. Each clip plays twice maximum.',
      items: [
        {
          id: 'm1-h-greeting-set',
          sectionId: 'hoeren',
          mode: 'listen',
          prompt: 'Catch all three greetings, in order.',
          expected: 'Guten Morgen · Guten Tag · Hallo',
          points: 2,
          weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
          task: {
            kind: 'type',
            question: 'Play the audio. Type the three greetings in the order you hear them.',
            accepted: ['Guten Morgen Guten Tag Hallo', 'Guten Morgen, Guten Tag, Hallo'],
            audioUrl: '/audio/tts/v1-3-1/v1-3-1-line-1.mp3',
            placeholder: 'Greeting 1, greeting 2, greeting 3',
          },
        },
        {
          id: 'm1-h-formal-opener',
          sectionId: 'hoeren',
          mode: 'listen',
          prompt: 'Understand Frau Weber’s morning exchange.',
          expected: 'Formal morning greeting + I am learning German.',
          points: 2,
          weaknessTags: ['hoeren:greetings', 'hoeren:question_recognition', 'vocab:first_sentence_chunks'],
          task: {
            kind: 'choice',
            question: 'Play the audio. What does the learner communicate?',
            options: [
              'A formal morning greeting, then “I am learning German.”',
              'A casual goodbye, then “I live in Germany.”',
              'An evening greeting, then “I speak English.”',
              'An apology, then “Please speak slowly.”',
            ],
            correctAnswer: 'A formal morning greeting, then “I am learning German.”',
            audioUrl: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3',
          },
        },
        {
          id: 'm1-h-polite-exit',
          sectionId: 'hoeren',
          mode: 'listen',
          prompt: 'Recognise a polite exit.',
          expected: 'Thank you very much. Goodbye.',
          points: 2,
          weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
          task: {
            kind: 'choice',
            question: 'Play the audio. What is happening?',
            options: ['Someone thanks and leaves politely', 'Someone asks for help', 'Someone introduces their name', 'Someone orders breakfast'],
            correctAnswer: 'Someone thanks and leaves politely',
            audioUrl: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3',
          },
        },
      ],
    },
    {
      id: 'sprechen',
      title: 'Sprechen — reply without freezing',
      instruction: 'Produce first. The model stays hidden until after your attempt.',
      items: [
        {
          id: 'm1-s-full-greeting',
          sectionId: 'sprechen',
          mode: 'speak',
          prompt: 'Deliver the full classroom reply.',
          expected: 'Guten Morgen, Frau Weber. Ich lerne Deutsch.',
          points: 4,
          weaknessTags: ['sprechen:greeting_reply', 'sprechen:formality', 'pronunciation:w_v'],
          requiredForPass: true,
          task: {
            kind: 'production',
            action: 'say',
            question: 'Frau Weber greets you at 9 AM. Reply aloud with a greeting and say that you are learning German.',
            speechTarget: 'Guten Morgen Frau Weber Ich lerne Deutsch',
            modelAnswer: 'Guten Morgen, Frau Weber. Ich lerne Deutsch.',
            modelAudioUrl: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3',
            criteria: ['Both sentences said aloud', 'Formal Frau Weber address used', 'Understandable without a long freeze'],
          },
        },
        {
          id: 'm1-s-polite-exit',
          sectionId: 'sprechen',
          mode: 'speak',
          prompt: 'Close the exchange politely.',
          expected: 'Vielen Dank. Auf Wiedersehen.',
          points: 2,
          weaknessTags: ['sprechen:greeting_reply', 'sprechen:formality', 'pronunciation:ch_sch'],
          task: {
            kind: 'production',
            action: 'say',
            question: 'Class is over. Thank Frau Weber and say goodbye aloud.',
            speechTarget: 'Vielen Dank Auf Wiedersehen',
            modelAnswer: 'Vielen Dank. Auf Wiedersehen.',
            modelAudioUrl: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3',
            criteria: ['Both chunks said aloud', 'Auf Wiedersehen used instead of a casual Tschüss'],
          },
        },
      ],
    },
    {
      id: 'lesen',
      title: 'Lesen — read the situation',
      instruction: 'Read once and choose the meaning that fits.',
      items: [
        {
          id: 'm1-l-morning-teacher',
          sectionId: 'lesen',
          mode: 'match',
          prompt: 'Guten Morgen, Frau Weber.',
          expected: 'A respectful morning greeting to the teacher.',
          points: 1.5,
          weaknessTags: ['lesen:greeting_recognition', 'grammar:formal_context'],
          task: {
            kind: 'choice',
            question: '“Guten Morgen, Frau Weber.” fits which situation?',
            options: ['Greeting your teacher at 9 AM', 'Leaving your friend at night', 'Ordering at a bakery', 'Asking someone’s name'],
            correctAnswer: 'Greeting your teacher at 9 AM',
          },
        },
        {
          id: 'm1-l-deutsch',
          sectionId: 'lesen',
          mode: 'match',
          prompt: 'Ich lerne Deutsch.',
          expected: 'I am learning German.',
          points: 1.5,
          weaknessTags: ['lesen:greeting_recognition', 'vocab:deutsch_vs_deutschland', 'vocab:first_sentence_chunks'],
          task: {
            kind: 'choice',
            question: 'What does “Ich lerne Deutsch.” mean?',
            options: ['I am learning German', 'I live in Germany', 'I speak with a German person', 'I am travelling to Germany'],
            correctAnswer: 'I am learning German',
          },
        },
      ],
    },
    {
      id: 'schreiben',
      title: 'Schreiben — first sentence',
      instruction: 'Type it from memory. Capitalisation counts.',
      items: [
        {
          id: 'm1-w-first-sentence',
          sectionId: 'schreiben',
          mode: 'write',
          prompt: 'Write: I am learning German.',
          expected: 'Ich lerne Deutsch.',
          points: 3,
          weaknessTags: ['schreiben:first_sentence', 'grammar:capitalisation_basics', 'vocab:first_sentence_chunks'],
          task: {
            kind: 'type',
            question: 'Without looking back, type “I am learning German” in German.',
            accepted: ['Ich lerne Deutsch'],
            placeholder: 'German sentence',
          },
        },
      ],
    },
    {
      id: 'grammarVocab',
      title: 'Grammar & vocab — adult-safe choices',
      instruction: 'Choose the line that fits the person and situation.',
      items: [
        {
          id: 'm1-g-formal-teacher',
          sectionId: 'grammarVocab',
          mode: 'choose',
          prompt: 'Teacher you just met: formal or casual?',
          expected: 'Formal Frau Weber / Sie-world German.',
          points: 1,
          weaknessTags: ['grammar:formal_context', 'sprechen:formality'],
          task: {
            kind: 'choice',
            question: 'You meet Frau Weber for the first time. Which line is safest?',
            options: ['Guten Morgen, Frau Weber.', 'Hey Weber!', 'Na, du?', 'Tschüss, Anna!'],
            correctAnswer: 'Guten Morgen, Frau Weber.',
          },
        },
        {
          id: 'm1-g-danke-bitte',
          sectionId: 'grammarVocab',
          mode: 'choose',
          prompt: 'Danke → Bitte.',
          expected: 'Thank you → You’re welcome.',
          points: 1,
          weaknessTags: ['vocab:greeting_set', 'grammar:formal_context'],
          task: {
            kind: 'choice',
            question: 'A classmate says “Danke.” What is the natural reply?',
            options: ['Bitte.', 'Gute Nacht.', 'Deutschland.', 'Ich heiße.'],
            correctAnswer: 'Bitte.',
          },
        },
      ],
    },
  ],
  recoveryCards: [
    { weaknessTag: 'hoeren:greetings', title: 'Hear the greeting moment', mustDo: ['Replay the greeting set twice.', 'Write the three greetings in order.', 'Retest with audio hidden until play.'], output: '3/3 greetings caught.', timeBoxMinutes: 10, retest: 'Catch all three on the first play.', libraryHref: '/missions/module-1/greet-frau-weber?start=listen', libraryLabel: 'Greeting mission' },
    { weaknessTag: 'hoeren:question_recognition', title: 'Catch the full classroom line', mustDo: ['Replay the formal opener.', 'Shadow it twice.', 'Retest the meaning.'], output: 'Full line understood.', timeBoxMinutes: 8, retest: 'Hear once and explain the line.', libraryHref: '/missions/module-1/first-mini-conversation?start=listen', libraryLabel: 'Mini-conversation mission' },
    { weaknessTag: 'sprechen:greeting_reply', title: 'Reply without freezing', mustDo: ['Hear the model once.', 'Shadow it three times.', 'Record one clean reply.'], output: 'One complete spoken reply.', timeBoxMinutes: 10, retest: 'Full greeting without a long pause.', libraryHref: '/missions/module-1/greet-frau-weber?start=listen', libraryLabel: 'Greeting mission' },
    { weaknessTag: 'sprechen:formality', title: 'Formal classroom German', mustDo: ['Practise Frau Weber + Guten Morgen.', 'Practise Vielen Dank + Auf Wiedersehen.', 'Run one full exchange.'], output: 'Formal opening and exit.', timeBoxMinutes: 9, retest: 'Choose and say both formal lines.', libraryHref: '/missions/module-1/polite-exit?start=listen', libraryLabel: 'Polite exit mission' },
    { weaknessTag: 'lesen:greeting_recognition', title: 'Read the greeting set', mustDo: ['Read five greeting cards.', 'Match each to time/person.', 'Retest two new situations.'], output: '5/5 situations matched.', timeBoxMinutes: 8, retest: 'Two unseen greeting situations.', libraryHref: '/practice/review', libraryLabel: '5-min review' },
    { weaknessTag: 'schreiben:first_sentence', title: 'Write the first sentence', mustDo: ['Copy Ich lerne Deutsch once.', 'Cover it and write from memory twice.', 'Retest after five minutes.'], output: 'One clean sentence from memory.', timeBoxMinutes: 8, retest: 'Ich lerne Deutsch with capitals.', libraryHref: '/missions/module-1/first-mini-conversation?start=listen', libraryLabel: 'Mini-conversation mission' },
    { weaknessTag: 'vocab:deutsch_vs_deutschland', title: 'Deutsch or Deutschland', mustDo: ['Say: Ich lerne Deutsch.', 'Say: Ich wohne in Deutschland.', 'Contrast both without notes.'], output: 'Language and country separated.', timeBoxMinutes: 6, retest: 'Choose the right word in two new lines.', libraryHref: '/practice/review', libraryLabel: '5-min review' },
    { weaknessTag: 'grammar:formal_context', title: 'Choose the adult-safe line', mustDo: ['Sort teacher vs friend greetings.', 'Say both formal lines aloud.', 'Retest with one new person.'], output: 'Formal choice automatic.', timeBoxMinutes: 7, retest: 'Teacher, stranger, friend — 3/3.', libraryHref: '/missions/module-1/formal-greetings', libraryLabel: 'Formal greeting practice' },
  ],
};

export const module1CheckpointSections = module1AdministeredCheckpoint.sections;
export const module1CheckpointItems = module1CheckpointSections.flatMap((section) => section.items);
export const module1CheckpointRecoveryCards = module1AdministeredCheckpoint.recoveryCards;

export function scoreModule1Checkpoint(passedItemIds: string[]): Module1CheckpointScore {
  const score = scoreSpineCheckpoint(module1AdministeredCheckpoint, passedItemIds);
  return { ...score, failedTags: score.failedTags as Module1CheckpointTag[] };
}
