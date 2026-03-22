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

/**
 * A1 Journey: Entirely in Kerala
 *
 * The user starts in a village and ends at the airport gate,
 * READY to fly to Germany — but not yet there.
 *
 * Germany is the dream on the horizon:
 * - A1: Kerala Village → Kochi Airport Gate (learning, preparing)
 * - A2: The Flight → Landing → First Weeks in Germany
 * - B1: Settling → Working → Thriving in Germany
 */
export const JOURNEY_LOCATIONS: JourneyLocation[] = [
  {
    id: 'village',
    name: 'Kerala Village',
    nameManglish: 'Nammude gramam',
    description: 'Your journey begins at home — dreaming of Germany',
    icon: '\u{1F334}',
    position: { x: 5, y: 90 },
    moduleRange: [0, 0],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a4a1a 0%, #0d3b0d 100%)',
      accent: '#4ade80',
    },
  },
  {
    id: 'backwaters',
    name: 'Backwaters',
    nameManglish: 'Kayalil thudangaam!',
    description: 'First words, sounds, greetings — your German begins',
    icon: '\u{1F6F6}',
    position: { x: 12, y: 82 },
    moduleRange: [1, 2],
    theme: {
      bgGradient: 'linear-gradient(135deg, #0d3b2a 0%, #1a4a3a 100%)',
      accent: '#22d3ee',
    },
  },
  {
    id: 'temple-town',
    name: 'Temple Town',
    nameManglish: 'Ambalam kazhinju!',
    description: 'Numbers, time, family — your world expands',
    icon: '\u{1F6D5}',
    position: { x: 22, y: 73 },
    moduleRange: [3, 4],
    theme: {
      bgGradient: 'linear-gradient(135deg, #4a3000 0%, #6b4400 100%)',
      accent: '#fbbf24',
    },
  },
  {
    id: 'kochi',
    name: 'Kochi',
    nameManglish: 'Fort Kochi ethi!',
    description: 'Daily life, food, shopping — you can talk about your day',
    icon: '\u{1F3D7}\uFE0F',
    position: { x: 33, y: 64 },
    moduleRange: [5, 6],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a1a3e 0%, #16213e 100%)',
      accent: '#ff6b9d',
    },
  },
  {
    id: 'marine-drive',
    name: 'Marine Drive',
    nameManglish: 'Shopping & life ready!',
    description: 'Money, housing, writing — getting practical',
    icon: '\u{1F307}',
    position: { x: 44, y: 55 },
    moduleRange: [7, 8],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1e2a4a 0%, #2a3a5e 100%)',
      accent: '#f97316',
    },
  },
  {
    id: 'german-class',
    name: 'German Class',
    nameManglish: 'Class-il padikkaam!',
    description: 'Travel, health, directions — survival German mastered',
    icon: '\u{1F4DA}',
    position: { x: 55, y: 46 },
    moduleRange: [9, 10],
    theme: {
      bgGradient: 'linear-gradient(135deg, #2d1b4e 0%, #3d2b5e 100%)',
      accent: '#a78bfa',
    },
  },
  {
    id: 'embassy',
    name: 'German Embassy',
    nameManglish: 'Visa interview!',
    description: 'Work, hobbies, past tense — speaking about your life',
    icon: '\u{1F3E2}',
    position: { x: 65, y: 37 },
    moduleRange: [11, 12],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
      accent: '#3b82f6',
    },
  },
  {
    id: 'visa-office',
    name: 'Visa Approved!',
    nameManglish: 'Visa kitti machane!',
    description: 'Formal German, bureaucracy, letters — Germany paperwork ready',
    icon: '\u{1F4C4}',
    position: { x: 74, y: 28 },
    moduleRange: [13, 14],
    theme: {
      bgGradient: 'linear-gradient(135deg, #0a2a0a 0%, #1a4a1a 100%)',
      accent: '#22c55e',
    },
  },
  {
    id: 'packing',
    name: 'Packing Bags',
    nameManglish: 'Bag pack cheyyaam!',
    description: 'Culture prep, slang, A2 bridge — almost there',
    icon: '\u{1F9F3}',
    position: { x: 83, y: 19 },
    moduleRange: [15, 16],
    theme: {
      bgGradient: 'linear-gradient(135deg, #3d1a1a 0%, #4a2020 100%)',
      accent: '#ef4444',
    },
  },
  {
    id: 'airport-gate',
    name: 'Airport Gate',
    nameManglish: 'Gate-il ready! Germany vilikkunnu!',
    description: 'Goethe A1 exam prep — prove you\'re ready to fly!',
    icon: '\u{2708}\uFE0F',
    position: { x: 93, y: 10 },
    moduleRange: [17, 18],
    theme: {
      bgGradient: 'linear-gradient(135deg, #d4a520 0%, #b8891a 100%)',
      accent: '#fbbf24',
    },
  },
];

/** Get the current journey location based on completed modules */
export function getCurrentLocation(completedModuleCount: number): JourneyLocation {
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
