// Narrative arcs for A1.
// A1 stays entirely in Kerala — the course ends with boarding a flight to Germany.
// See docs/A1_STORY_BIBLE.md for the canonical story.
// A2 will be the "arrival" arc; B1 the "thriving" arc.

export interface NarrativeArc {
  moduleIds: number[];
  title: string;
  description: string;
  kuttanState: string; // What Kuttan is feeling/doing in this part of the journey
}

export const NARRATIVE_ARCS: NarrativeArc[] = [
  {
    moduleIds: [1, 2],
    title: 'The Dream Begins',
    description: 'Your cousin in Munich sends a WhatsApp: "Free university, machane!" You and Kuttan take the first step — the alphabet, the sounds, the first greeting. It all happens in Kerala.',
    kuttanState: 'Nervous but hopeful, first days at Goethe-Institut Kochi',
  },
  {
    moduleIds: [3, 4],
    title: 'Building the Basics',
    description: 'Numbers, time, family. The real grammar starts. Articles (der/die/das) are maddening — but you stick with it. Amma and Achan are still skeptical.',
    kuttanState: 'Wrestling with grammar, studying at Goethe Kochi library',
  },
  {
    moduleIds: [5, 6],
    title: 'Talking About Your Day',
    description: 'Food, drinks, routines. Video calls with the Munich cousin become practice sessions. You can now hold a short conversation.',
    kuttanState: 'Practicing on WhatsApp voice notes, building confidence',
  },
  {
    moduleIds: [7, 8],
    title: 'Getting Ready for the Move',
    description: 'Shopping, money, describing an apartment. Practical German for the life you\'re about to live — all rehearsed from Kerala.',
    kuttanState: 'Mock-shopping in Kochi, saving euros in his head',
  },
  {
    moduleIds: [9, 10, 11, 12],
    title: 'Speaking Well (and Nearly Quitting)',
    description: 'Travel, health, work, hobbies. Full small-talk conversations. But burnout hits. A Malayali who\'s returned from Germany visits — one tough-love chat pulls you back in.',
    kuttanState: 'Almost gave up. Found a second wind.',
  },
  {
    moduleIds: [13, 14, 15, 16],
    title: 'Visa Ready',
    description: 'Past tense, formal German, letters. The paperwork beast. An embassy form gets rejected. Deadline panic. You push through.',
    kuttanState: 'Refiling documents, prepping for the German consulate in Chennai',
  },
  {
    moduleIds: [17, 18],
    title: 'The Gate',
    description: 'Everything has led to this. Sit for the Goethe A1. Pass. Say goodbye at Kochi airport. Board the flight. Watch Kerala disappear below the clouds.',
    kuttanState: 'Exam morning to boarding announcement — the biggest two weeks of his life',
  },
];

export function getArcForModule(moduleId: number): NarrativeArc | undefined {
  return NARRATIVE_ARCS.find(arc => arc.moduleIds.includes(moduleId));
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
