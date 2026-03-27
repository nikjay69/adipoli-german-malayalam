// Narrative arcs connecting modules into a continuous story
// Kuttan is on this journey WITH the user — fellow newcomer, not a teacher

export interface NarrativeArc {
  moduleIds: number[];
  title: string;
  description: string;
  kuttanState: string;  // What Kuttan is feeling/doing in this part of the journey
}

export const NARRATIVE_ARCS: NarrativeArc[] = [
  {
    moduleIds: [1, 2],
    title: 'The Dream Begins',
    description: 'From Kerala to Germany — you and Kuttan dream of a new life abroad. Time to learn the basics before the big move.',
    kuttanState: 'Excited but nervous, packing bags in Kerala',
  },
  {
    moduleIds: [3, 4],
    title: 'First Days in Berlin',
    description: 'You\'ve landed! Everything is new — the numbers, the time, the people. Kuttan is figuring it all out alongside you.',
    kuttanState: 'Wide-eyed, exploring Berlin streets',
  },
  {
    moduleIds: [5, 6],
    title: 'Settling In',
    description: 'Daily routines, food, and drinks. You\'re starting to feel at home — or at least, less lost.',
    kuttanState: 'Getting comfortable, discovering German food',
  },
  {
    moduleIds: [7, 8],
    title: 'Building a Life',
    description: 'Shopping, money, and finding a place to live. The practical stuff that makes Germany feel like home.',
    kuttanState: 'Apartment hunting, learning to budget in euros',
  },
  {
    moduleIds: [9, 10],
    title: 'Getting Around & Staying Healthy',
    description: 'Navigating trains, buses, and the German healthcare system. Essential survival skills.',
    kuttanState: 'Confident on the U-Bahn, registered with a Hausarzt',
  },
  {
    moduleIds: [11, 12],
    title: 'Work, Study & Fun',
    description: 'Finding work, making friends, and discovering hobbies. Germany isn\'t just about bureaucracy!',
    kuttanState: 'Has a part-time job, joined a Verein',
  },
  {
    moduleIds: [13, 14],
    title: 'Telling Your Story',
    description: 'Talking about the past, handling formal situations. You\'re becoming a real resident.',
    kuttanState: 'Confidently handling Anmeldung and paperwork',
  },
  {
    moduleIds: [15, 16],
    title: 'Becoming German-ish',
    description: 'Understanding the culture, bridging two worlds. Kerala meets Deutschland.',
    kuttanState: 'Hosting Onam dinner for German friends',
  },
  {
    moduleIds: [17, 18],
    title: 'The A1 Exam',
    description: 'Everything has led to this. Time to prove your German to the Goethe-Institut.',
    kuttanState: 'Nervous but prepared, exam day arrives',
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
