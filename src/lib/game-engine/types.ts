// Game Engine Types
// Every moment in a lesson is a GameMoment — either a scene, dialogue, or game.
// There are NO passive reading screens. Everything is interactive.

import type { Exercise, VocabItem, StoryScene } from '@/lib/content/types';
import type { KuttanMoodImage } from '@/components/character/KuttanImage';

// ── Scene Types ──────────────────────────────────────────────

export type GameMomentType =
  | 'scene'           // Full-screen scene with dialogue overlay
  | 'dialogue'        // Character dialogue with choices
  | 'word-discover'   // Discover a new word through interaction
  | 'game'            // A mini-game challenge
  | 'reaction'        // Brief Kuttan reaction (auto-advances in 1.5s)
  | 'victory'         // Lesson complete celebration

export interface GameMoment {
  id: string;
  type: GameMomentType;

  // Visual
  sceneImage?: string;          // Background image URL
  kuttan?: {
    mood: KuttanMoodImage;
    position?: 'left' | 'center' | 'right';
  };

  // Dialogue (for 'scene' and 'dialogue' types)
  dialogue?: {
    speaker: string;            // "Kuttan" | "Baker" | "Officer" | etc.
    text: string;               // MAX 60 chars — one short line
    choices?: GameChoice[];     // If present, user must choose (not tap "next")
  };

  // Word discovery (for 'word-discover' type)
  vocab?: VocabItem;
  /** Which game to use for discovery: listen-match, tap-reveal, catch */
  discoveryGame?: 'listen-match' | 'tap-reveal' | 'word-catch' | 'memory';

  // Game challenge (for 'game' type)
  exercise?: Exercise;
  /** Which game component to use */
  gameType?: 'swipe' | 'scramble' | 'word-bank' | 'falling' | 'bubble' | 'article-sort' | 'memory-flip' | 'quiz-show' | 'speed-round' | 'scene-explore';

  // Auto-advance timing (for 'reaction' type)
  autoAdvanceMs?: number;
}

export interface GameChoice {
  text: string;                 // The choice text (in German for learning!)
  isCorrect: boolean;
  response: string;             // Brief response (max 40 chars)
  kuttanMood: KuttanMoodImage;
}

// ── Scene Image Mapping ──────────────────────────────────────

export const SCENE_IMAGES: Record<string, string> = {
  'cafe': '/images/kaffee_kuchen.png',
  'bahnhof': '/images/german_train_station.png',
  'street': '/images/berlin_people.png',
  'classroom': '/images/university_library.png',
  'kitchen': '/images/breakfast_merge.png',
  'office': '/images/office_building.png',
  'bakery': '/images/german_bakery.png',
  'supermarket': '/images/supermarket_checkout.png',
  'restaurant': '/images/german_menu.png',
  'doctor': '/images/doctor_waiting_room.png',
  'pharmacy': '/images/german_apotheke.png',
  'apartment': '/images/german_apartment.png',
  'wg': '/images/wg_living.png',
  'train': '/images/db_schedule.png',
};

// ── Game Type Selection ──────────────────────────────────────

/** Pick the best game type for an exercise based on its type */
export function pickGameType(exercise: Exercise): GameMoment['gameType'] {
  switch (exercise.type) {
    case 'multiple-choice': return 'swipe';
    case 'fill-blank': return exercise.options?.length ? 'word-bank' : 'scramble';
    case 'type-answer': return 'scramble';
    case 'free-text': return 'scramble';
    case 'dictation': return 'falling';
    case 'matching': return 'bubble';
    case 'ordering': return 'scramble';
    case 'speaking': return 'swipe'; // fallback
    default: return 'swipe';
  }
}

/** Pick a discovery game type — rotates to avoid repetition */
export function pickDiscoveryGame(index: number): GameMoment['discoveryGame'] {
  const types: GameMoment['discoveryGame'][] = ['listen-match', 'tap-reveal', 'word-catch', 'memory'];
  return types[index % types.length];
}
