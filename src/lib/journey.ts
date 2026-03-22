export interface JourneyLocation {
  id: string;
  name: string;
  shortName: string;        // For mobile display (max 6 chars)
  nameManglish: string;
  description: string;
  icon: string;
  position: { x: number; y: number };
  moduleRange: [number, number];
  theme: {
    bgGradient: string;
    accent: string;
  };
}

/**
 * A1 Journey: Kerala → Airport Gate
 *
 * 8 stops (not 10 — cleaner on mobile)
 * Short, clear names that make sense at a glance
 *
 * Future:
 * - A2: Flight → Landing → First Weeks
 * - B1: Settling → Working → Thriving
 */
export const JOURNEY_LOCATIONS: JourneyLocation[] = [
  {
    id: 'home',
    name: 'Home',
    shortName: 'Home',
    nameManglish: 'Nammude veedu',
    description: 'Your journey begins — dreaming of Germany',
    icon: '🏠',
    position: { x: 5, y: 90 },
    moduleRange: [0, 0],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a4a1a 0%, #0d3b0d 100%)',
      accent: '#4ade80',
    },
  },
  {
    id: 'basics',
    name: 'First Words',
    shortName: 'Basics',
    nameManglish: 'Adi sthaanam!',
    description: 'Sounds, greetings, introductions — your German begins',
    icon: '🔤',
    position: { x: 15, y: 78 },
    moduleRange: [1, 2],
    theme: {
      bgGradient: 'linear-gradient(135deg, #0d3b2a 0%, #1a4a3a 100%)',
      accent: '#22d3ee',
    },
  },
  {
    id: 'building',
    name: 'Building Up',
    shortName: 'Build',
    nameManglish: 'Valarunnu!',
    description: 'Numbers, time, family — your world expands',
    icon: '📐',
    position: { x: 27, y: 66 },
    moduleRange: [3, 4],
    theme: {
      bgGradient: 'linear-gradient(135deg, #4a3000 0%, #6b4400 100%)',
      accent: '#fbbf24',
    },
  },
  {
    id: 'daily-life',
    name: 'Daily Life',
    shortName: 'Daily',
    nameManglish: 'Divasam muzhuvan!',
    description: 'Routines, food, shopping — talking about your day',
    icon: '☀️',
    position: { x: 39, y: 54 },
    moduleRange: [5, 6],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a1a3e 0%, #16213e 100%)',
      accent: '#ff6b9d',
    },
  },
  {
    id: 'ready',
    name: 'Getting Ready',
    shortName: 'Ready',
    nameManglish: 'Ready aakunnuu!',
    description: 'Housing, money, writing — practical German',
    icon: '💪',
    position: { x: 51, y: 42 },
    moduleRange: [7, 8],
    theme: {
      bgGradient: 'linear-gradient(135deg, #1e2a4a 0%, #2a3a5e 100%)',
      accent: '#f97316',
    },
  },
  {
    id: 'speaking',
    name: 'Speaking Well',
    shortName: 'Speak',
    nameManglish: 'Nannaayi samsaarikaam!',
    description: 'Travel, health, work, hobbies — real conversations',
    icon: '🗣️',
    position: { x: 63, y: 32 },
    moduleRange: [9, 12],
    theme: {
      bgGradient: 'linear-gradient(135deg, #2d1b4e 0%, #3d2b5e 100%)',
      accent: '#a78bfa',
    },
  },
  {
    id: 'visa',
    name: 'Visa Ready',
    shortName: 'Visa',
    nameManglish: 'Visa kittum!',
    description: 'Past tense, formal German, letters — paperwork done',
    icon: '📋',
    position: { x: 77, y: 22 },
    moduleRange: [13, 16],
    theme: {
      bgGradient: 'linear-gradient(135deg, #0a2a0a 0%, #1a4a1a 100%)',
      accent: '#22c55e',
    },
  },
  {
    id: 'gate',
    name: 'Gate',
    shortName: 'Gate',
    nameManglish: 'Germany vilikkunnu!',
    description: 'A1 exam prep — prove you\'re ready to fly!',
    icon: '✈️',
    position: { x: 92, y: 10 },
    moduleRange: [17, 18],
    theme: {
      bgGradient: 'linear-gradient(135deg, #d4a520 0%, #b8891a 100%)',
      accent: '#fbbf24',
    },
  },
];

export function getCurrentLocation(completedModuleCount: number): JourneyLocation {
  for (let i = JOURNEY_LOCATIONS.length - 1; i >= 0; i--) {
    if (completedModuleCount >= JOURNEY_LOCATIONS[i].moduleRange[0]) {
      return JOURNEY_LOCATIONS[i];
    }
  }
  return JOURNEY_LOCATIONS[0];
}

export function getJourneyProgress(completedModuleCount: number): number {
  return Math.round((completedModuleCount / 18) * 100);
}

export function getLocationForModule(moduleId: number): JourneyLocation {
  for (const location of JOURNEY_LOCATIONS) {
    if (moduleId >= location.moduleRange[0] && moduleId <= location.moduleRange[1]) {
      return location;
    }
  }
  return JOURNEY_LOCATIONS[JOURNEY_LOCATIONS.length - 1];
}
