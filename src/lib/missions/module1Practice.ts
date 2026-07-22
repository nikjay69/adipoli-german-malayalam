export type Module1PracticeItem = {
  id: string;
  task: string;
  expectedOutput: string;
  timeBoxMinutes: number;
  weaknessTags: string[];
};

export type Module1PracticeChoice = {
  id: string;
  title: string;
  weaknessTags?: string[];
};

export type Module1MiniCheckItem = {
  id: string;
  mode: 'speak' | 'choose' | 'write';
  prompt: string;
  expected: string;
  pass: string;
  weaknessTags: string[];
};

export type Module1RecoveryCard = {
  weaknessTag: string;
  learnerMessage: string;
  mustDo: string[];
  output: string;
  timeBoxMinutes: number;
  retest: string;
};

export type Module1PracticeSet = {
  id: string;
  title: string;
  route: string;
  source: string;
  scene: {
    speakerName: string;
    speakerLine: string;
    audioSrc: string;
    turnCue: string;
  };
  outputLines: string[];
  practiceItems: Module1PracticeItem[];
  repair: {
    correctChoiceId: string;
    options: Module1PracticeChoice[];
    wrongFeedback: string;
    correctFeedback: string;
  };
  miniCheck: {
    closedBookInstruction: string;
    passRule: string;
    items: Module1MiniCheckItem[];
  };
  recoveryCards: Module1RecoveryCard[];
  nextTask: string;
};

export const module1AnswerFrauFischerPractice: Module1PracticeSet = {
  id: 'answer-frau-weber',
  title: 'Practice: answer Frau Fischer',
  route: '/missions/module-1/greet-frau-weber',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#2-lesson-1-practice--answer-frau-weber',
  scene: {
    speakerName: 'Frau Fischer',
    speakerLine: 'Guten Morgen.',
    audioSrc: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3',
    turnCue: 'Now answer.',
  },
  outputLines: ['Guten Morgen, Frau Fischer.', 'Ich lerne Deutsch.'],
  practiceItems: [
    {
      id: 'shadow-greeting',
      task: 'Listen once, then say the greeting aloud.',
      expectedOutput: 'Guten Morgen, Frau Fischer.',
      timeBoxMinutes: 3,
      weaknessTags: ['hoeren:greetings', 'sprechen:greeting_reply'],
    },
    {
      id: 'answer-learning-question',
      task: 'Answer the teacher question after the model line.',
      expectedOutput: 'Ja. Ich lerne Deutsch.',
      timeBoxMinutes: 4,
      weaknessTags: ['hoeren:question_recognition', 'sprechen:greeting_reply'],
    },
    {
      id: 'leave-politely',
      task: 'Close the tiny exchange politely.',
      expectedOutput: 'Auf Wiedersehen.',
      timeBoxMinutes: 3,
      weaknessTags: ['sprechen:formality', 'vocab:greeting_set'],
    },
  ],
  repair: {
    correctChoiceId: 'guten-morgen',
    options: [
      { id: 'gute-nacht', title: 'Gute Nacht, Frau Fischer.', weaknessTags: ['hoeren:greetings'] },
      { id: 'guten-morgen', title: 'Guten Morgen, Frau Fischer.' },
      { id: 'tschuss', title: 'Tschüss, Frau Fischer.', weaknessTags: ['sprechen:formality'] },
    ],
    wrongFeedback: 'Wrong moment. Replay once; morning class needs Guten Morgen.',
    correctFeedback: 'Correct. Morning class starts with Guten Morgen.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no Google, no notes. Find the weak spot, then fix it.',
    passRule: 'Pass when the learner answers aloud, chooses the morning greeting, and writes the first sentence cleanly.',
    items: [
      {
        id: 'mc-say-greeting',
        mode: 'speak',
        prompt: 'Frau Fischer says: Guten Morgen. Say a safe reply.',
        expected: 'Guten Morgen, Frau Fischer.',
        pass: 'Learner says a formal morning reply aloud.',
        weaknessTags: ['sprechen:greeting_reply', 'sprechen:formality'],
      },
      {
        id: 'mc-time-choice',
        mode: 'choose',
        prompt: '9 AM teacher greeting: Guten Morgen or Gute Nacht?',
        expected: 'Guten Morgen',
        pass: 'Learner chooses Guten Morgen.',
        weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
      },
      {
        id: 'mc-write-first-sentence',
        mode: 'write',
        prompt: 'Write: I am learning German.',
        expected: 'Ich lerne Deutsch.',
        pass: 'Sentence is understandable; Ich and Deutsch are capitalised.',
        weaknessTags: ['schreiben:first_sentence'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'hoeren:greetings',
      learnerMessage: 'You missed the greeting moment.',
      mustDo: ['Replay 10 greeting lines without subtitles.', 'Choose or say the response.', 'Retest 5 new lines.'],
      output: '4/5 correct on the retest.',
      timeBoxMinutes: 12,
      retest: 'Hear five greetings; answer at least four correctly.',
    },
    {
      weaknessTag: 'sprechen:greeting_reply',
      learnerMessage: 'The reply did not come out yet.',
      mustDo: ['Repeat Guten Morgen, Frau Fischer five times.', 'Repeat Ja. Ich lerne Deutsch five times.', 'Say one teacher exchange without looking.'],
      output: 'One spoken greeting exchange.',
      timeBoxMinutes: 10,
      retest: 'Frau Fischer greets once; learner replies aloud.',
    },
    {
      weaknessTag: 'schreiben:first_sentence',
      learnerMessage: 'The first written sentence needs repair.',
      mustDo: ['Copy Ich lerne Deutsch twice.', 'Hide it.', 'Type it once from memory.'],
      output: 'One clean written sentence.',
      timeBoxMinutes: 8,
      retest: 'Write Ich lerne Deutsch from memory.',
    },
  ],
  nextTask: 'Practice: Danke + Bitte',
};

export const module1WhyA1Practice: Module1PracticeSet = {
  id: 'why-a1',
  title: 'Practice: why I am learning German',
  route: '/missions/module-1/why-a1',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#4-lesson-2-path-check',
  scene: {
    speakerName: 'Boss',
    speakerLine: 'Ich lerne Deutsch.',
    audioSrc: '/audio/hoeren/module-01/ex1-1-prod-dictation.mp3',
    turnCue: 'Now say your reason.',
  },
  outputLines: ['Ich lerne Deutsch.', 'I am learning German for _____.'],
  practiceItems: [
    {
      id: 'say-first-identity-line',
      task: 'Listen once, then say the first German identity line aloud.',
      expectedOutput: 'Ich lerne Deutsch.',
      timeBoxMinutes: 3,
      weaknessTags: ['sprechen:first_identity_line', 'schreiben:first_sentence'],
    },
    {
      id: 'choose-one-reason',
      task: 'Pick one reason so the path stays prescribed.',
      expectedOutput: 'I am learning German for A1 exam, family, Germany plan, work, or confidence.',
      timeBoxMinutes: 2,
      weaknessTags: ['planning:reason_unclear'],
    },
    {
      id: 'say-course-path',
      task: 'Say the app path aloud so the learner does not browse randomly.',
      expectedOutput: 'Watch → Listen → Say → Check → Fix.',
      timeBoxMinutes: 1,
      weaknessTags: ['planning:path_confusion'],
    },
  ],
  repair: {
    correctChoiceId: 'ich-lerne-deutsch',
    options: [
      { id: 'ich-lerne-deutsch', title: 'Ich lerne Deutsch.' },
      { id: 'ich-lernt-deutsch', title: 'Ich lernt Deutsch.', weaknessTags: ['schreiben:first_sentence'] },
      { id: 'ich-lerne-englisch', title: 'Ich lerne Englisch.', weaknessTags: ['vocab:deutsch'] },
    ],
    wrongFeedback: 'Keep the first A1 line simple: Ich lerne Deutsch.',
    correctFeedback: 'Correct. This is your first identity line.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no notes. Say the line, choose one reason, then say the path.',
    passRule: 'Pass when the learner says Ich lerne Deutsch, chooses one reason, and repeats Watch → Listen → Say → Check → Fix.',
    items: [
      {
        id: 'mc-say-identity-line',
        mode: 'speak',
        prompt: 'Say: I am learning German.',
        expected: 'Ich lerne Deutsch.',
        pass: 'Learner says Ich lerne Deutsch aloud without adding extra grammar.',
        weaknessTags: ['sprechen:first_identity_line'],
      },
      {
        id: 'mc-choose-reason',
        mode: 'choose',
        prompt: 'Pick one reason: A1 exam, family, Germany plan, work, or confidence.',
        expected: 'One reason chosen.',
        pass: 'Learner chooses one reason and does not browse extra resources.',
        weaknessTags: ['planning:reason_unclear'],
      },
      {
        id: 'mc-path-order',
        mode: 'speak',
        prompt: 'Say the Adipoli path in order.',
        expected: 'Watch → Listen → Say → Check → Fix.',
        pass: 'Learner repeats the five-step path in order.',
        weaknessTags: ['planning:path_confusion'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'sprechen:first_identity_line',
      learnerMessage: 'The first German line did not come out yet.',
      mustDo: ['Replay Ich lerne Deutsch three times.', 'Say Ich. Ich lerne. Ich lerne Deutsch.', 'Say the full line once without looking.'],
      output: 'One clean spoken line.',
      timeBoxMinutes: 8,
      retest: 'Say Ich lerne Deutsch without looking.',
    },
    {
      weaknessTag: 'planning:reason_unclear',
      learnerMessage: 'The reason is still vague.',
      mustDo: ['Choose one: A1 exam, family, Germany plan, work, confidence.', 'Say: I am learning German for ____.', 'Do not add another resource.'],
      output: 'One chosen reason.',
      timeBoxMinutes: 5,
      retest: 'State the reason in one short sentence.',
    },
    {
      weaknessTag: 'planning:path_confusion',
      learnerMessage: 'The course path is not automatic yet.',
      mustDo: ['Read Watch → Listen → Say → Check → Fix twice.', 'Hide it.', 'Say it once from memory.'],
      output: 'Five-step path from memory.',
      timeBoxMinutes: 4,
      retest: 'Say the path in order without looking.',
    },
  ],
  nextTask: 'Next: train German sounds',
};

export const module1GermanSoundsPractice: Module1PracticeSet = {
  id: 'german-sounds',
  title: 'Practice: German sounds for Malayalis',
  route: '/missions/module-1/german-sounds',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#5-lesson-3-sound-drill',
  scene: {
    speakerName: 'Sound coach',
    speakerLine: 'schön',
    audioSrc: '/audio/tts/v1-2-1/v1-2-1-line-3.mp3',
    turnCue: 'Now shadow slowly.',
  },
  outputLines: ['ich — schön — Weber — Tschüss', 'Hardest sound: _____.'],
  practiceItems: [
    {
      id: 'shadow-danger-sounds',
      task: 'Shadow the dangerous sound set slowly.',
      expectedOutput: 'ich, schön, Weber, Tschüss.',
      timeBoxMinutes: 8,
      weaknessTags: ['pronunciation:ch_sch', 'pronunciation:w_v', 'pronunciation:umlaut'],
    },
    {
      id: 'choose-ich-not-isch',
      task: 'Choose the safer standard German sound for Ich lerne Deutsch.',
      expectedOutput: 'ich, not isch.',
      timeBoxMinutes: 2,
      weaknessTags: ['pronunciation:ch_sch'],
    },
    {
      id: 'name-hardest-sound',
      task: 'Name the one hardest sound so recovery is not random.',
      expectedOutput: 'ch/sch, w/v, or umlaut.',
      timeBoxMinutes: 1,
      weaknessTags: ['planning:pronunciation_focus_unclear'],
    },
  ],
  repair: {
    correctChoiceId: 'ich',
    options: [
      { id: 'isch', title: 'isch', weaknessTags: ['pronunciation:ch_sch'] },
      { id: 'ich', title: 'ich' },
      { id: 'schoen', title: 'schön', weaknessTags: ['pronunciation:ch_sch', 'pronunciation:umlaut'] },
    ],
    wrongFeedback: 'For Ich lerne Deutsch, choose ich. Use sch only where the word has sch, like schön.',
    correctFeedback: 'Correct. ich uses soft ch; schön uses sch.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no notes. Choose the sound, shadow four words, name the weak spot.',
    passRule: 'Pass when the learner chooses ich, shadows the four-word set, and names one hardest sound.',
    items: [
      {
        id: 'mc-ich-vs-isch',
        mode: 'choose',
        prompt: 'For Ich lerne Deutsch, which is safer: ich or isch?',
        expected: 'ich',
        pass: 'Learner chooses ich and does not turn every ch into sch.',
        weaknessTags: ['pronunciation:ch_sch'],
      },
      {
        id: 'mc-w-v',
        mode: 'choose',
        prompt: 'German w in Weber is closer to English v or English w?',
        expected: 'English v',
        pass: 'Learner recognises German w as v-like in Weber.',
        weaknessTags: ['pronunciation:w_v'],
      },
      {
        id: 'mc-shadow-umlaut',
        mode: 'speak',
        prompt: 'Say: schön, Tschüss.',
        expected: 'Learner attempts ö and ü slowly.',
        pass: 'Learner does not ignore umlaut dots.',
        weaknessTags: ['pronunciation:umlaut'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'pronunciation:ch_sch',
      learnerMessage: 'ch and sch are mixed.',
      mustDo: ['Say ich five times softly.', 'Say schön five times with sh.', 'Alternate: ich — schön — ich — schön.'],
      output: '8 slow contrasts.',
      timeBoxMinutes: 10,
      retest: 'Choose ich vs schön in five quick prompts.',
    },
    {
      weaknessTag: 'pronunciation:w_v',
      learnerMessage: 'German w still sounds English.',
      mustDo: ['Say Weber with v-like w five times.', 'Say Wasser and Wiedersehen slowly.', 'Say Frau Fischer once.'],
      output: 'Three v-like w words.',
      timeBoxMinutes: 8,
      retest: 'Say Frau Fischer and Auf Wiedersehen.',
    },
    {
      weaknessTag: 'pronunciation:umlaut',
      learnerMessage: 'Umlaut dots are being ignored.',
      mustDo: ['Say schön slowly five times.', 'Say Tschüss slowly five times.', 'Mark ö/ü with your finger before saying.'],
      output: 'Two umlaut words attempted.',
      timeBoxMinutes: 8,
      retest: 'Say schön and Tschüss without rushing.',
    },
  ],
  nextTask: 'Next: formal greetings',
};

export const module1FormalGreetingsPractice: Module1PracticeSet = {
  id: 'formal-greetings',
  title: 'Practice: choose the formal greeting',
  route: '/missions/module-1/formal-greetings',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#6-lesson-4-formal-greetings',
  scene: {
    speakerName: 'Frau Fischer',
    speakerLine: 'Guten Tag.',
    audioSrc: '/audio/tts/v1-3-1/v1-3-1-line-1.mp3',
    turnCue: 'Now choose the safe greeting.',
  },
  outputLines: ['Guten Morgen · Guten Tag · Guten Abend', 'Safe formal default: Guten Tag.'],
  practiceItems: [
    {
      id: 'hear-time-greeting',
      task: 'Hear the greeting and connect it to time/context.',
      expectedOutput: 'Morning: Guten Morgen. Day/formal: Guten Tag. Evening: Guten Abend.',
      timeBoxMinutes: 6,
      weaknessTags: ['hoeren:greetings', 'vocab:greeting_set'],
    },
    {
      id: 'choose-formal-default',
      task: 'Pick the safest greeting for teacher/office/examiner context.',
      expectedOutput: 'Guten Tag.',
      timeBoxMinutes: 2,
      weaknessTags: ['sprechen:formality'],
    },
    {
      id: 'avoid-gute-nacht-trap',
      task: 'Reject Gute Nacht as a normal evening hello.',
      expectedOutput: 'Use Guten Abend when meeting; Gute Nacht when going to sleep.',
      timeBoxMinutes: 2,
      weaknessTags: ['vocab:gute_nacht_trap'],
    },
  ],
  repair: {
    correctChoiceId: 'guten-tag',
    options: [
      { id: 'guten-morgen', title: 'Guten Morgen.', weaknessTags: ['hoeren:greetings'] },
      { id: 'guten-tag', title: 'Guten Tag.' },
      { id: 'gute-nacht', title: 'Gute Nacht.', weaknessTags: ['vocab:gute_nacht_trap'] },
    ],
    wrongFeedback: 'Teacher or office in the day: choose Guten Tag.',
    correctFeedback: 'Correct. Guten Tag is the safe formal default.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no notes. Choose the greeting, say it, reject the bedtime trap.',
    passRule: 'Pass when the learner chooses Guten Tag for formal daytime context and explains Gute Nacht correctly.',
    items: [
      {
        id: 'mc-formal-daytime',
        mode: 'choose',
        prompt: 'Teacher/office at 2 PM: Guten Morgen, Guten Tag, or Gute Nacht?',
        expected: 'Guten Tag',
        pass: 'Learner chooses Guten Tag as the safe formal daytime greeting.',
        weaknessTags: ['hoeren:greetings', 'sprechen:formality'],
      },
      {
        id: 'mc-evening-meeting',
        mode: 'choose',
        prompt: 'Meeting someone at 7 PM: Guten Abend or Gute Nacht?',
        expected: 'Guten Abend',
        pass: 'Learner uses Guten Abend for an evening meeting.',
        weaknessTags: ['vocab:gute_nacht_trap'],
      },
      {
        id: 'mc-say-formal-set',
        mode: 'speak',
        prompt: 'Say the formal set: Guten Morgen, Guten Tag, Guten Abend.',
        expected: 'Guten Morgen. Guten Tag. Guten Abend.',
        pass: 'Learner says the three greetings slowly and understandably.',
        weaknessTags: ['sprechen:formality', 'vocab:greeting_set'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'hoeren:greetings',
      learnerMessage: 'Greeting and time are mixed.',
      mustDo: ['Replay the three greeting lines.', 'Point to morning/day/evening as you hear them.', 'Choose the response without subtitles.'],
      output: '3/3 time greetings correct.',
      timeBoxMinutes: 10,
      retest: 'Hear three greetings; choose the right context.',
    },
    {
      weaknessTag: 'sprechen:formality',
      learnerMessage: 'The formal safe default is not automatic.',
      mustDo: ['Say Guten Tag five times.', 'Imagine teacher, office, examiner.', 'Answer each with Guten Tag.'],
      output: 'Three formal replies aloud.',
      timeBoxMinutes: 8,
      retest: 'Teacher greets; learner replies Guten Tag.',
    },
    {
      weaknessTag: 'vocab:gute_nacht_trap',
      learnerMessage: 'Gute Nacht is used too early.',
      mustDo: ['Read: Guten Abend = meeting in evening.', 'Read: Gute Nacht = going to sleep.', 'Sort six mini-contexts.'],
      output: '6 context sorts.',
      timeBoxMinutes: 8,
      retest: 'Pick Guten Abend vs Gute Nacht in four contexts.',
    },
  ],
  nextTask: 'Next: Danke + Bitte',
};

export const module1PolitenessPractice: Module1PracticeSet = {
  id: 'politeness-survival',
  title: 'Practice: Danke, Bitte, Entschuldigung',
  route: '/missions/module-1/please-thanks',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#8-lesson-5-politeness-repair',
  scene: {
    speakerName: 'Frau Fischer',
    speakerLine: 'Bitte.',
    audioSrc: '/audio/tts/v1-4-1/v1-4-1-line-1.mp3',
    turnCue: 'Now answer politely.',
  },
  outputLines: ['Danke. Bitte. Entschuldigung.', 'Safer default: Danke first after help.'],
  practiceItems: [
    {
      id: 'answer-after-help',
      task: 'Hear the help moment and answer with thanks.',
      expectedOutput: 'Danke.',
      timeBoxMinutes: 3,
      weaknessTags: ['sprechen:formality', 'vocab:politeness_set'],
    },
    {
      id: 'ask-repeat-politely',
      task: 'Replace a rough “what?” with a safe repeat request.',
      expectedOutput: 'Noch einmal, bitte.',
      timeBoxMinutes: 3,
      weaknessTags: ['sprechen:request_phrase', 'sprechen:formality'],
    },
    {
      id: 'interrupt-politely',
      task: 'Use the long apology word before interrupting or repairing.',
      expectedOutput: 'Entschuldigung.',
      timeBoxMinutes: 3,
      weaknessTags: ['vocab:entschuldigung', 'sprechen:formality'],
    },
  ],
  repair: {
    correctChoiceId: 'danke',
    options: [
      { id: 'bitte', title: 'Bitte.', weaknessTags: ['vocab:bitte_danke_swap'] },
      { id: 'danke', title: 'Danke.' },
      { id: 'was', title: 'Was?', weaknessTags: ['sprechen:formality'] },
    ],
    wrongFeedback: 'After help, say Danke. Bitte replies to thanks or works as polite glue.',
    correctFeedback: 'Correct. After help: Danke.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no notes. Replace rough lines with polite German.',
    passRule: 'Pass when the learner repairs thanks, repeat, interrupt, formal leave, and reply-to-thanks situations.',
    items: [
      {
        id: 'mc-help-received',
        mode: 'choose',
        prompt: 'Someone helps you. Say Danke or Bitte?',
        expected: 'Danke',
        pass: 'Learner chooses Danke after help.',
        weaknessTags: ['vocab:bitte_danke_swap'],
      },
      {
        id: 'mc-need-repeat',
        mode: 'speak',
        prompt: 'You missed the line. Ask politely.',
        expected: 'Noch einmal, bitte.',
        pass: 'Learner says the repeat phrase without “Was?”.',
        weaknessTags: ['sprechen:request_phrase'],
      },
      {
        id: 'mc-interrupt',
        mode: 'speak',
        prompt: 'You need to interrupt politely.',
        expected: 'Entschuldigung.',
        pass: 'Learner attempts Entschuldigung slowly and clearly.',
        weaknessTags: ['vocab:entschuldigung', 'sprechen:formality'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'vocab:bitte_danke_swap',
      learnerMessage: 'Danke and Bitte are swapped.',
      mustDo: ['After help: say Danke five times.', 'After someone says Danke: say Bitte five times.', 'Run five tiny help/thanks prompts.'],
      output: '5/5 danke/bitte choices correct.',
      timeBoxMinutes: 8,
      retest: 'Choose Danke or Bitte in five situations.',
    },
    {
      weaknessTag: 'sprechen:request_phrase',
      learnerMessage: 'The repeat request is not automatic.',
      mustDo: ['Say Noch einmal, bitte five times.', 'Say Langsam, bitte five times.', 'Pick repeat vs slow-down in four prompts.'],
      output: '4/4 request choices correct.',
      timeBoxMinutes: 8,
      retest: 'Hear missed/too-fast prompts; choose the right request.',
    },
    {
      weaknessTag: 'vocab:entschuldigung',
      learnerMessage: 'Entschuldigung is still too heavy.',
      mustDo: ['Chunk Ent-schul-di-gung three times.', 'Say Entschuldigung, bitte three times.', 'Use it before one repair phrase.'],
      output: 'One polite repair line.',
      timeBoxMinutes: 8,
      retest: 'Say Entschuldigung, noch einmal, bitte.',
    },
  ],
  nextTask: 'Next: polite exit',
};

export const module1GoodbyeRepairPractice: Module1PracticeSet = {
  id: 'goodbye-repair',
  title: 'Practice: goodbye + repair phrases',
  route: '/missions/module-1/polite-exit',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#9-lesson-6-repair-phrase-role-play',
  scene: {
    speakerName: 'Frau Fischer',
    speakerLine: 'Auf Wiedersehen.',
    audioSrc: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3',
    turnCue: 'Now leave politely.',
  },
  outputLines: ['Auf Wiedersehen. Tschüss.', 'Noch einmal, bitte. Langsam, bitte.'],
  practiceItems: [
    {
      id: 'formal-goodbye',
      task: 'Leave a teacher/examiner/office scene safely.',
      expectedOutput: 'Auf Wiedersehen.',
      timeBoxMinutes: 3,
      weaknessTags: ['sprechen:formality', 'vocab:goodbye_set'],
    },
    {
      id: 'choose-casual-goodbye',
      task: 'Use the casual goodbye only with friends/classmates.',
      expectedOutput: 'Tschüss.',
      timeBoxMinutes: 2,
      weaknessTags: ['vocab:formal_casual'],
    },
    {
      id: 'repair-fast-or-missed',
      task: 'Choose repeat vs slow-down repair phrase.',
      expectedOutput: 'Noch einmal, bitte. / Langsam, bitte.',
      timeBoxMinutes: 4,
      weaknessTags: ['sprechen:request_phrase', 'hoeren:repair_need'],
    },
  ],
  repair: {
    correctChoiceId: 'auf-wiedersehen',
    options: [
      { id: 'auf-wiedersehen', title: 'Auf Wiedersehen.' },
      { id: 'tschuss', title: 'Tschüss.', weaknessTags: ['vocab:formal_casual'] },
      { id: 'auf-wiederhoeren', title: 'Auf Wiederhören.', weaknessTags: ['vocab:phone_goodbye'] },
    ],
    wrongFeedback: 'Face-to-face formal exit: Auf Wiedersehen.',
    correctFeedback: 'Correct. Formal exit.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no notes. Say the goodbye or repair phrase.',
    passRule: 'Pass when the learner chooses formal/casual goodbye and separates repeat from slow-down requests.',
    items: [
      {
        id: 'mc-formal-goodbye',
        mode: 'choose',
        prompt: 'Teacher/examiner goodbye: Auf Wiedersehen or Tschüss?',
        expected: 'Auf Wiedersehen',
        pass: 'Learner chooses formal goodbye.',
        weaknessTags: ['sprechen:formality'],
      },
      {
        id: 'mc-missed-line',
        mode: 'speak',
        prompt: 'You missed the line. Ask once more.',
        expected: 'Noch einmal, bitte.',
        pass: 'Learner says the repeat request.',
        weaknessTags: ['sprechen:request_phrase'],
      },
      {
        id: 'mc-too-fast',
        mode: 'speak',
        prompt: 'The speaker is too fast. Ask slowly.',
        expected: 'Langsam, bitte.',
        pass: 'Learner says the slow-down request.',
        weaknessTags: ['hoeren:repair_need', 'sprechen:request_phrase'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'vocab:formal_casual',
      learnerMessage: 'Formal and casual goodbye are mixed.',
      mustDo: ['Sort teacher/office/friend/classmate into formal or casual.', 'Say Auf Wiedersehen for formal contexts.', 'Say Tschüss only for friend/classmate.'],
      output: '6/6 context choices correct.',
      timeBoxMinutes: 8,
      retest: 'Choose goodbye for six contexts.',
    },
    {
      weaknessTag: 'sprechen:request_phrase',
      learnerMessage: 'Repair phrase is not automatic yet.',
      mustDo: ['Say Noch einmal, bitte five times.', 'Say Langsam, bitte five times.', 'Pick missed line vs too fast in four prompts.'],
      output: '4/4 repair choices correct.',
      timeBoxMinutes: 8,
      retest: 'Choose repeat or slow-down in four prompts.',
    },
    {
      weaknessTag: 'vocab:phone_goodbye',
      learnerMessage: 'Phone goodbye appeared in a face-to-face scene.',
      mustDo: ['Read: Auf Wiedersehen = safe face-to-face goodbye.', 'Read: Auf Wiederhören = phone goodbye.', 'Sort four face/phone contexts.'],
      output: '4/4 face/phone choices correct.',
      timeBoxMinutes: 6,
      retest: 'Pick the goodbye for office vs phone call.',
    },
  ],
  nextTask: 'Next: first mini-conversation',
};

export const module1FirstConversationPractice: Module1PracticeSet = {
  id: 'first-mini-conversation',
  title: 'Practice: first mini-conversation',
  route: '/missions/module-1/first-mini-conversation',
  source: 'course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md#10-lesson-7-first-mini-conversation',
  scene: {
    speakerName: 'Frau Fischer',
    speakerLine: 'Guten Tag. Wie geht es Ihnen?',
    audioSrc: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3',
    turnCue: 'Now answer, then leave.',
  },
  outputLines: ['Guten Tag, Frau Fischer. Gut, danke.', 'Noch einmal, bitte. Auf Wiedersehen.'],
  practiceItems: [
    {
      id: 'answer-formal-check-in',
      task: 'Greet Frau Fischer and answer the check-in politely.',
      expectedOutput: 'Guten Tag, Frau Fischer. Gut, danke.',
      timeBoxMinutes: 4,
      weaknessTags: ['sprechen:formality', 'sprechen:question_answer'],
    },
    {
      id: 'ask-repeat-if-needed',
      task: 'If the question is missed, ask once more instead of freezing.',
      expectedOutput: 'Noch einmal, bitte.',
      timeBoxMinutes: 3,
      weaknessTags: ['sprechen:request_phrase', 'hoeren:question_recognition'],
    },
    {
      id: 'close-conversation',
      task: 'Thank the teacher and leave formally.',
      expectedOutput: 'Vielen Dank. Auf Wiedersehen.',
      timeBoxMinutes: 3,
      weaknessTags: ['vocab:goodbye_set', 'sprechen:formality'],
    },
  ],
  repair: {
    correctChoiceId: 'formal-mini-conversation',
    options: [
      { id: 'hey-was', title: 'Hey. Was?', weaknessTags: ['sprechen:formality', 'sprechen:request_phrase'] },
      { id: 'formal-mini-conversation', title: 'Guten Tag, Frau Fischer. Gut, danke.' },
      { id: 'gute-nacht', title: 'Gute Nacht, Frau Fischer.', weaknessTags: ['vocab:gute_nacht_trap'] },
    ],
    wrongFeedback: 'Keep the adult path: greet formally, answer shortly, ask repeat with bitte if needed.',
    correctFeedback: 'Correct. Formal greeting plus short answer is enough for A1.',
  },
  miniCheck: {
    closedBookInstruction: 'Closed check: no notes. Run the tiny exchange from memory.',
    passRule: 'Pass when the learner greets, answers one question, asks repeat if needed, thanks, and leaves formally.',
    items: [
      {
        id: 'mc-greet-answer',
        mode: 'speak',
        prompt: 'Frau Fischer says: Guten Tag. Wie geht es Ihnen? Answer politely.',
        expected: 'Guten Tag, Frau Fischer. Gut, danke.',
        pass: 'Learner gives a short formal answer without freezing.',
        weaknessTags: ['sprechen:question_answer', 'sprechen:formality'],
      },
      {
        id: 'mc-repeat-request',
        mode: 'speak',
        prompt: 'You missed the question. Ask once more.',
        expected: 'Noch einmal, bitte.',
        pass: 'Learner asks for repetition politely.',
        weaknessTags: ['sprechen:request_phrase'],
      },
      {
        id: 'mc-thank-leave',
        mode: 'speak',
        prompt: 'End the classroom conversation.',
        expected: 'Vielen Dank. Auf Wiedersehen.',
        pass: 'Learner thanks and leaves with the formal goodbye.',
        weaknessTags: ['vocab:goodbye_set', 'sprechen:formality'],
      },
    ],
  },
  recoveryCards: [
    {
      weaknessTag: 'sprechen:question_answer',
      learnerMessage: 'The answer freezes after the greeting.',
      mustDo: ['Replay the Frau Fischer question twice.', 'Say Gut, danke five times.', 'Run the greeting + answer once without looking.'],
      output: 'One complete greeting-answer pair.',
      timeBoxMinutes: 10,
      retest: 'Hear the question once; answer within five seconds.',
    },
    {
      weaknessTag: 'sprechen:request_phrase',
      learnerMessage: 'The repair phrase is not ready.',
      mustDo: ['Say Noch einmal, bitte five times.', 'Say Langsam, bitte five times.', 'Choose repeat vs slow-down in four prompts.'],
      output: '4/4 repair prompts correct.',
      timeBoxMinutes: 8,
      retest: 'Ask for repeat after one missed line.',
    },
    {
      weaknessTag: 'sprechen:formality',
      learnerMessage: 'The tiny exchange is too casual.',
      mustDo: ['Say Frau Fischer with the greeting five times.', 'Use Guten Tag for teacher/office/examiner.', 'Close with Auf Wiedersehen twice.'],
      output: 'One formal mini-conversation.',
      timeBoxMinutes: 8,
      retest: 'Run greet → answer → thank → leave formally.',
    },
  ],
  nextTask: 'Module 1 checkpoint',
};

export const module1PracticeSets: Module1PracticeSet[] = [
  module1AnswerFrauFischerPractice,
  module1WhyA1Practice,
  module1GermanSoundsPractice,
  module1FormalGreetingsPractice,
  module1PolitenessPractice,
  module1GoodbyeRepairPractice,
  module1FirstConversationPractice,
];
