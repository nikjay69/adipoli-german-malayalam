import type { LearnerPeerId } from '@/lib/cast';

export interface NarrativeArc {
  moduleIds: number[];
  title: string;
  description: string;
  peerStates: Record<LearnerPeerId, string>;
}

export const NARRATIVE_ARCS: NarrativeArc[] = [
  {
    moduleIds: [1, 2],
    title: 'The First German Moment',
    description: 'Greetings and self-introduction move from recognition to a short spoken answer in the Goethe Kochi practice room.',
    peerStates: {
      nivin: 'Acts early, guesses, then repairs the line aloud.',
      meera: 'Prepares carefully, then chooses the shortest correct opening.',
    },
  },
  {
    moduleIds: [3, 4],
    title: 'Building the Basics',
    description: 'Numbers, time, family words, and articles become useful chunks instead of isolated rules.',
    peerStates: {
      nivin: 'Tests a first answer and listens for the correction.',
      meera: 'Stops searching for a perfect sentence and uses one clear chunk.',
    },
  },
  {
    moduleIds: [5, 6],
    title: 'Talking About a Day',
    description: 'Routine, food, and drink practice turns familiar Kerala scenes into clean A1 output.',
    peerStates: {
      nivin: 'Repairs word order without hiding the first attempt.',
      meera: 'Builds a small answer before adding detail.',
    },
  },
  {
    moduleIds: [7, 8],
    title: 'Everyday Practice',
    description: 'Shopping and home-language tasks stay practical, with every destination detail treated as a role-play card rather than cast biography.',
    peerStates: {
      nivin: 'Uses the useful phrase first and adjusts after feedback.',
      meera: 'Selects the exact phrase the situation needs.',
    },
  },
  {
    moduleIds: [9, 10, 11, 12],
    title: 'Speaking Under Pressure',
    description: 'Travel, health, work, and hobbies are rehearsed as editable scenarios using the learner’s true details where needed.',
    peerStates: {
      nivin: 'Keeps speaking through a mistake and performs the repair himself.',
      meera: 'Moves before certainty and completes the answer herself.',
    },
  },
  {
    moduleIds: [13, 14, 15, 16],
    title: 'Forms and Formal German',
    description: 'Past tense, forms, and formal messages are practised with sample cards that never freeze a résumé for either peer.',
    peerStates: {
      nivin: 'Checks the evidence line after making a fast first attempt.',
      meera: 'Uses the form’s required structure without over-writing.',
    },
  },
  {
    moduleIds: [17, 18],
    title: 'The A1 Gate',
    description: 'Timed mock work brings listening, reading, writing, and speaking evidence together before the real exam.',
    peerStates: {
      nivin: 'Names the miss, repairs it aloud, and tries a fresh item.',
      meera: 'Trusts the shortest correct answer and finishes within time.',
    },
  },
];

export function getArcForModule(moduleId: number): NarrativeArc | undefined {
  return NARRATIVE_ARCS.find((arc) => arc.moduleIds.includes(moduleId));
}

export function getModulePosition(moduleId: number): { arcTitle: string; isFirst: boolean; isLast: boolean } | undefined {
  const arc = getArcForModule(moduleId);
  if (!arc) return undefined;
  return {
    arcTitle: arc.title,
    isFirst: arc.moduleIds[0] === moduleId,
    isLast: arc.moduleIds[arc.moduleIds.length - 1] === moduleId,
  };
}
