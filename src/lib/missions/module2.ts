export type Module2MissionId =
  | 'selfIntro'
  | 'spellName'
  | 'fromKerala'
  | 'jobLanguages'
  | 'finalSelfIntro';

export type Module2MissionCard = {
  id: Module2MissionId;
  missionNumber: string;
  title: string;
  output: string;
  proof: string;
  href: string;
  state: string;
  active: boolean;
  railLabel: string;
  tone: 'green' | 'blue';
  steps: string[];
  next?: {
    href: string;
    cta: string;
    title: string;
    pull: string;
  };
  modulePull?: {
    title: string;
    pull: string;
  };
};

export const module2MissionCards: Module2MissionCard[] = [
  {
    id: 'selfIntro',
    missionNumber: 'Mission 2.1',
    title: 'Tell the examiner your name',
    output: 'Ich heiße ...',
    proof: 'Listen • answer aloud • quick repair',
    href: '/missions/module-2/self-intro',
    state: 'Start here',
    active: true,
    railLabel: 'Module 2 · Goethe A1 Sprechen',
    tone: 'green',
    steps: ['Start', 'Scene', 'Catch', 'Speak + repair', 'Win'],
    next: {
      href: '/missions/module-2/spell-name',
      cta: 'Next: spell your name',
      title: 'Spell a Kerala name cleanly.',
      pull: 'Same Goethe room. New pressure: German letter names, slowly and clearly.',
    },
  },
  {
    id: 'spellName',
    missionNumber: 'Mission 2.2',
    title: 'Spell a Kerala name cleanly',
    output: 'K-U-T-T-A-N · Kah, Ooh, Tay...',
    proof: 'audio • spell aloud • quick repair',
    href: '/missions/module-2/spell-name',
    state: 'Playable now',
    active: true,
    railLabel: 'Module 2 · Name spelling',
    tone: 'blue',
    steps: ['Scene + repair'],
    next: {
      href: '/missions/module-2/from-kerala',
      cta: 'Next: say where you’re from',
      title: 'Say where you come from.',
      pull: 'Now turn identity into a clean origin answer: Ich komme aus Kerala.',
    },
  },
  {
    id: 'fromKerala',
    missionNumber: 'Mission 2.3',
    title: 'Say where you come from',
    output: 'Ich komme aus Kerala.',
    proof: 'audio • answer aloud • quick repair',
    href: '/missions/module-2/from-kerala',
    state: 'Playable now',
    active: true,
    railLabel: 'Module 2 · Origin answer',
    tone: 'blue',
    steps: ['Scene + repair'],
    next: {
      href: '/missions/module-2/job-languages',
      cta: 'Next: job + languages',
      title: 'Say job and languages.',
      pull: 'Add the line that makes your self-introduction feel complete.',
    },
  },
  {
    id: 'jobLanguages',
    missionNumber: 'Mission 2.4',
    title: 'Say job and languages',
    output: 'Ich spreche Malayalam und Englisch.',
    proof: 'audio • answer aloud • quick repair',
    href: '/missions/module-2/job-languages',
    state: 'Playable now',
    active: true,
    railLabel: 'Module 2 · Job + languages',
    tone: 'blue',
    steps: ['Scene + repair', 'Win'],
    next: {
      href: '/missions/module-2/final-self-intro',
      cta: 'Next: final self-intro',
      title: 'Deliver the 20-second self-intro.',
      pull: 'Combine name, spelling, origin, job, and languages into one exam-room answer.',
    },
  },
  {
    id: 'finalSelfIntro',
    missionNumber: 'Mission 2.5',
    title: 'Deliver a 20-second self-intro',
    output: 'Name • place • job • languages',
    proof: 'listen • answer aloud • repair',
    href: '/missions/module-2/final-self-intro',
    state: 'Module win',
    active: true,
    railLabel: 'Module 2 · Final self-intro',
    tone: 'blue',
    steps: ['Start', 'Scene', 'Catch', 'Speak + repair', 'Win'],
    modulePull: {
      title: 'Ready for Module 3 pressure.',
      pull: 'Next, numbers and time: catch phone numbers, appointments, and exam times without panic.',
    },
  },
];

export const module2MissionById = Object.fromEntries(
  module2MissionCards.map((mission) => [mission.id, mission])
) as Record<Module2MissionId, Module2MissionCard>;

export const module2MissionAudio = {
  selfIntro: {
    examinerPrompt: '/audio/missions/module-2/self-intro/examiner-prompt.mp3',
    wieHeissenSie: '/audio/missions/module-2/self-intro/wie-heissen-sie.mp3',
    ichHeisseKuttan: '/audio/missions/module-2/self-intro/ich-heisse-kuttan.mp3',
    ichKommeAusKerala: '/audio/missions/module-2/self-intro/ich-komme-aus-kerala.mp3',
    ichSpreche: '/audio/missions/module-2/self-intro/ich-spreche-malayalam-und-englisch.mp3',
    modelIntroShort: '/audio/missions/module-2/self-intro/model-intro-short.mp3',
    modelIntroFull: '/audio/missions/module-2/self-intro/model-intro-full.mp3',
  },
  spellName: {
    scene: '/audio/missions/module-2/dialogue/spell-examiner-buchstabieren.mp3',
    letterTrap: '/audio/missions/module-2/dialogue/spell-letter-trap.mp3',
    clarify: '/audio/missions/module-2/dialogue/spell-clarify-k-wie-kaiser.mp3',
    kuttanModel: '/audio/missions/module-2/dialogue/spell-kuttan-model.mp3',
  },
  fromKerala: {
    scene: '/audio/missions/module-2/dialogue/origin-examiner-woher.mp3',
    modelKerala: '/audio/missions/module-2/dialogue/origin-model-kerala-kochi.mp3',
    ausIndien: '/audio/missions/module-2/dialogue/origin-aus-indien.mp3',
    wohnort: '/audio/missions/module-2/dialogue/origin-wohnort-kochi.mp3',
  },
  jobLanguages: {
    scene: '/audio/missions/module-2/dialogue/job-examiner-beruf-sprachen.mp3',
    modelLanguages: '/audio/missions/module-2/dialogue/job-model-student-languages.mp3',
    jobPattern: '/audio/missions/module-2/dialogue/job-pattern-student.mp3',
    languagePattern: '/audio/missions/module-2/dialogue/job-language-pattern.mp3',
  },
  finalSelfIntro: {
    examiner: '/audio/missions/module-2/dialogue/final-examiner-stellen-sie-sich-vor.mp3',
    modelFull: '/audio/missions/module-2/dialogue/final-model-full.mp3',
    moduleWrap: '/audio/missions/module-2/dialogue/final-module-wrap.mp3',
    finalPrompt: '/audio/missions/module-2/dialogue/final-rehearsal-prompt.mp3',
  },
} as const;
