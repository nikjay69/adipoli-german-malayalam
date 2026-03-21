export interface JourneyLocation {
  id: string;
  name: string;
  nameManglish: string;
  description: string;
  icon: string;
  /** Position on the map (0-100 scale) */
  position: { x: number; y: number };
  /** Which module range this location covers */
  moduleRange: [number, number];
  theme: {
    bgGradient: string;
    accent: string;
  };
}

export const JOURNEY_LOCATIONS: JourneyLocation[] = [
  {
    id: 'kerala-village',
    name: 'Kerala Village',
    nameManglish: 'Nammude gramam',
    description: 'Your journey begins here in a small Kerala village',
    icon: '\u{1F334}',
    position: { x: 5, y: 90 },
    moduleRange: [0, 0],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a4a1a 0%, #0d3b0d 100%)',
      accent: '#4ade80',
    },
  },
  {
    id: 'kochi',
    name: 'Kochi',
    nameManglish: 'Kochiyil ethi!',
    description: 'Learn the basics — greetings, sounds, first words',
    icon: '\u{1F3D8}\uFE0F',
    position: { x: 15, y: 80 },
    moduleRange: [1, 2],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a1a3e 0%, #16213e 100%)',
      accent: '#ff6b9d',
    },
  },
  {
    id: 'kochi-city',
    name: 'Kochi City',
    nameManglish: 'City-il ready!',
    description: 'Numbers, time, family — building your foundation',
    icon: '\u{1F3D9}\uFE0F',
    position: { x: 25, y: 70 },
    moduleRange: [3, 4],
    theme: {
      bgGradient: 'linear-gradient(135deg, #3d2e00 0%, #5a4400 100%)',
      accent: '#ffd93d',
    },
  },
  {
    id: 'kochi-airport',
    name: 'Kochi Airport',
    nameManglish: 'Airport ready!',
    description: 'Daily routines and food — preparing for Germany',
    icon: '\u2708\uFE0F',
    position: { x: 35, y: 60 },
    moduleRange: [5, 6],
    theme: {
      bgGradient: 'linear-gradient(135deg, #4a2800 0%, #6b3a00 100%)',
      accent: '#f59e0b',
    },
  },
  {
    id: 'departure',
    name: 'Departure',
    nameManglish: 'Pokam! Ready aanu!',
    description: 'Shopping and housing — getting ready to leave',
    icon: '\u{1F6EB}',
    position: { x: 45, y: 50 },
    moduleRange: [7, 8],
    theme: {
      bgGradient: 'linear-gradient(135deg, #5a2000 0%, #7a3000 100%)',
      accent: '#ea580c',
    },
  },
  {
    id: 'in-flight',
    name: 'In Flight',
    nameManglish: 'Sky-il aanu!',
    description: 'Travel, directions, and health — survival German',
    icon: '\u2601\uFE0F',
    position: { x: 55, y: 40 },
    moduleRange: [9, 10],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1e3a5f 0%, #2a5298 100%)',
      accent: '#3b82f6',
    },
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt Airport',
    nameManglish: 'Germany ethi!',
    description: 'Work, study, and hobbies — arriving in Germany',
    icon: '\u{1F1E9}\u{1F1EA}',
    position: { x: 65, y: 32 },
    moduleRange: [11, 12],
    theme: {
      bgGradient: 'linear-gradient(135deg, #4a0e0e 0%, #6b1010 100%)',
      accent: '#ef4444',
    },
  },
  {
    id: 'train-to-berlin',
    name: 'Train to Berlin',
    nameManglish: 'Berlin-lekku train!',
    description: 'Past tense and bureaucracy — navigating German life',
    icon: '\u{1F682}',
    position: { x: 75, y: 24 },
    moduleRange: [13, 14],
    theme: {
      bgGradient: 'linear-gradient(135deg, #2d1b4e 0%, #1a1040 100%)',
      accent: '#a855f7',
    },
  },
  {
    id: 'berlin',
    name: 'Berlin',
    nameManglish: 'Berlin-il settled!',
    description: 'German culture and A2.1 bridge — you belong here now',
    icon: '\u{1F3DB}\uFE0F',
    position: { x: 85, y: 16 },
    moduleRange: [15, 16],
    theme: {
      bgGradient: 'linear-gradient(135deg, #3d3d00 0%, #5a5a00 100%)',
      accent: '#ffd93d',
    },
  },
  {
    id: 'exam-hall',
    name: 'Exam Hall',
    nameManglish: 'Prüfung time!',
    description: 'Goethe A1 exam prep — prove what you\'ve learned!',
    icon: '\u{1F393}',
    position: { x: 93, y: 8 },
    moduleRange: [17, 18],
    theme: {
      bgGradient: 'linear-gradient(135deg, #0d3b0d 0%, #1a5a1a 100%)',
      accent: '#4ade80',
    },
  },
];

/** Get the current journey location based on completed modules */
export function getCurrentLocation(completedModuleCount: number): JourneyLocation {
  // Find the last location whose module range start is <= completed count
  for (let i = JOURNEY_LOCATIONS.length - 1; i >= 0; i--) {
    if (completedModuleCount >= JOURNEY_LOCATIONS[i].moduleRange[0]) {
      return JOURNEY_LOCATIONS[i];
    }
  }
  return JOURNEY_LOCATIONS[0];
}

/** Get progress as a percentage (0-100) */
export function getJourneyProgress(completedModuleCount: number): number {
  const totalModules = 18;
  return Math.round((completedModuleCount / totalModules) * 100);
}

/** Get location for a specific module */
export function getLocationForModule(moduleId: number): JourneyLocation {
  for (const location of JOURNEY_LOCATIONS) {
    if (moduleId >= location.moduleRange[0] && moduleId <= location.moduleRange[1]) {
      return location;
    }
  }
  return JOURNEY_LOCATIONS[JOURNEY_LOCATIONS.length - 1];
}
