// greetFrauWeber is a persisted compatibility ID; learner-facing copy uses Frau Fischer.
export type Module1MissionId = 'greetFrauWeber' | 'pleaseThanks' | 'politeExit' | 'firstMiniConversation';

export type Module1MissionCard = {
  id: Module1MissionId;
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
  next: {
    href: string;
    cta: string;
    title: string;
    pull: string;
  };
};

export const module1MissionCards: Module1MissionCard[] = [
  {
    id: 'greetFrauWeber',
    missionNumber: 'Mission 1.1',
    title: 'Greet Frau Fischer without freezing',
    output: 'Guten Morgen, Frau Fischer. Ich lerne Deutsch.',
    proof: 'audio • answer aloud • quick repair',
    href: '/missions/module-1/greet-frau-weber',
    state: 'Start here',
    active: true,
    railLabel: 'Module 1 · First classroom greeting',
    tone: 'green',
    steps: ['Hear it', 'Say it aloud', 'Repair + win'],
    next: {
      href: '/missions/module-1/please-thanks',
      cta: 'Next: danke + bitte',
      title: 'Handle thank-you politely.',
      pull: 'Same classroom. Now answer help with Danke, Bitte, and the right adult tone.',
    },
  },
  {
    id: 'pleaseThanks',
    missionNumber: 'Mission 1.2',
    title: 'Handle thank-you politely',
    output: 'Danke. Bitte.',
    proof: 'audio • answer aloud • quick repair',
    href: '/missions/module-1/please-thanks',
    state: 'Playable now',
    active: true,
    railLabel: 'Module 1 · Danke + Bitte',
    tone: 'green',
    steps: ['Scene + repair'],
    next: {
      href: '/missions/module-1/polite-exit',
      cta: 'Next: polite exit',
      title: 'Leave the room politely.',
      pull: 'Now close the classroom interaction with Vielen Dank and Auf Wiedersehen.',
    },
  },
  {
    id: 'politeExit',
    missionNumber: 'Mission 1.3',
    title: 'Leave the room politely',
    output: 'Vielen Dank. Auf Wiedersehen.',
    proof: 'audio • answer aloud • quick repair',
    href: '/missions/module-1/polite-exit',
    state: 'Playable now',
    active: true,
    railLabel: 'Module 1 · Polite classroom exit',
    tone: 'green',
    steps: ['Scene + repair'],
    next: {
      href: '/missions/module-1/first-mini-conversation',
      cta: 'Next: full mini-conversation',
      title: 'Run the whole tiny exchange.',
      pull: 'Now combine greet, answer, repeat request, thank, and goodbye in one scene.',
    },
  },
  {
    id: 'firstMiniConversation',
    missionNumber: 'Mission 1.4',
    title: 'Run the first mini-conversation',
    output: 'Guten Tag, Frau Fischer. Gut, danke. Auf Wiedersehen.',
    proof: 'audio • answer aloud • quick repair',
    href: '/missions/module-1/first-mini-conversation',
    state: 'Playable now',
    active: true,
    railLabel: 'Module 1 · First mini-conversation',
    tone: 'green',
    steps: ['Scene + repair'],
    next: {
      href: '/missions/module-1/checkpoint',
      cta: 'Do Module 1 checkpoint',
      title: 'Check the first German moment.',
      pull: 'Closed-book checkpoint: score the exact weak spot before Module 2.',
    },
  },
];

export const module1MissionById = Object.fromEntries(
  module1MissionCards.map((mission) => [mission.id, mission])
) as Record<Module1MissionId, Module1MissionCard>;

export const MODULE1_COMPLETED_MISSIONS_STORAGE_KEY = 'adipoli:module1:completedMissions';

export function readCompletedModule1Missions(): Module1MissionId[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(MODULE1_COMPLETED_MISSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(module1MissionCards.map((mission) => mission.id));
    return parsed.filter((id): id is Module1MissionId => typeof id === 'string' && validIds.has(id as Module1MissionId));
  } catch {
    return [];
  }
}

export function writeCompletedModule1Mission(missionId: Module1MissionId) {
  if (typeof window === 'undefined') return;
  const completed = readCompletedModule1Missions();
  const nextCompleted = completed.includes(missionId) ? completed : [...completed, missionId];
  window.localStorage.setItem(MODULE1_COMPLETED_MISSIONS_STORAGE_KEY, JSON.stringify(nextCompleted));
  window.dispatchEvent(new CustomEvent('module1-mission-completed', { detail: { missionId, completed: nextCompleted } }));
}

export const module1MissionAudio = {
  greetFrauWeber: {
    greetingSet: '/audio/tts/v1-3-1/v1-3-1-line-1.mp3',
    safeDefaults: '/audio/tts/v1-3-1/v1-3-1-line-2.mp3',
    formalOpener: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3',
    ichLerneDeutsch: '/audio/hoeren/module-01/ex1-1-prod-dictation.mp3',
  },
  pleaseThanks: {
    dankeBitte: '/audio/tts/v1-4-1/v1-4-1-line-1.mp3',
    politenessContrast: '/audio/tts/v1-4-1/v1-4-1-line-2.mp3',
    exitSet: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3',
  },
  politeExit: {
    exitSet: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3',
    dankeBitte: '/audio/tts/v1-4-1/v1-4-1-line-1.mp3',
    apologyContrast: '/audio/tts/v1-4-1/v1-4-1-line-2.mp3',
    shopExitModel: '/audio/tts/v1-4-1/v1-4-1-line-3.mp3',
  },
  firstMiniConversation: {
    formalOpener: '/audio/tts/v1-3-1/v1-3-1-line-3.mp3',
    exitSet: '/audio/tts/v1-4-1/v1-4-1-line-0.mp3',
  },
} as const;
