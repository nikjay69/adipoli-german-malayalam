export interface JourneyLocation {
  id: string;
  name: string;
  nameManglish: string;
  description: string;
  icon: string;
  /** Position on the map (0-100 scale) */
  position: { x: number; y: number };
  /** Which module unlocks this location */
  moduleId: number;
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
    icon: '🌴',
    position: { x: 10, y: 85 },
    moduleId: 0,
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
    icon: '🏘️',
    position: { x: 25, y: 70 },
    moduleId: 1,
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a1a3e 0%, #16213e 100%)',
      accent: '#ff6b9d',
    },
  },
  {
    id: 'kochi-airport',
    name: 'Kochi Airport',
    nameManglish: 'Airport ready!',
    description: 'Essential phrases for travel and daily life',
    icon: '✈️',
    position: { x: 40, y: 55 },
    moduleId: 2,
    theme: {
      bgGradient: 'linear-gradient(135deg, #1a2a4e 0%, #0f3460 100%)',
      accent: '#3b82f6',
    },
  },
  {
    id: 'in-flight',
    name: 'In the Air',
    nameManglish: 'Sky-il aanu!',
    description: 'Numbers, time, and making conversation',
    icon: '☁️',
    position: { x: 55, y: 40 },
    moduleId: 3,
    theme: {
      bgGradient: 'linear-gradient(135deg, #1e3a5f 0%, #2a5298 100%)',
      accent: '#06b6d4',
    },
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt Airport',
    nameManglish: 'Germany ethi!',
    description: 'Navigating Germany — directions, transport, food',
    icon: '🇩🇪',
    position: { x: 72, y: 28 },
    moduleId: 4,
    theme: {
      bgGradient: 'linear-gradient(135deg, #2d1b4e 0%, #1a1040 100%)',
      accent: '#a855f7',
    },
  },
  {
    id: 'berlin',
    name: 'Berlin',
    nameManglish: 'Berlin-il settled!',
    description: 'Life in Germany — work, university, culture',
    icon: '🏛️',
    position: { x: 88, y: 15 },
    moduleId: 5,
    theme: {
      bgGradient: 'linear-gradient(135deg, #3d1a1a 0%, #4a1020 100%)',
      accent: '#ffd93d',
    },
  },
];

/** Get the current journey location based on completed modules */
export function getCurrentLocation(completedModuleCount: number): JourneyLocation {
  const index = Math.min(completedModuleCount, JOURNEY_LOCATIONS.length - 1);
  return JOURNEY_LOCATIONS[index];
}

/** Get progress as a percentage (0-100) */
export function getJourneyProgress(completedModuleCount: number): number {
  return Math.round((completedModuleCount / (JOURNEY_LOCATIONS.length - 1)) * 100);
}
