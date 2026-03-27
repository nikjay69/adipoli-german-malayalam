// Daily Challenge System
// Varies by day of week + user progress level to keep things fresh

export type ChallengeType =
  | 'vocab-sprint'       // Learn X new words
  | 'perfect-lesson'     // Score 100% on any lesson
  | 'speak-3'            // Complete 3 speaking exercises
  | 'boss-attempt'       // Attempt a boss battle
  | 'review-15'          // Review 15 SRS words
  | 'game-trio'          // Play 3 different games
  | 'explorer'           // Visit a module you haven't tried
  | 'pronunciation-5'    // Pronounce 5 words with 80%+ score
  | 'streak-keep'        // Just show up (easy day)
  | 'combo-10';          // Reach a combo of 10 in any game

export interface DailyChallenge {
  type: ChallengeType;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  /** Target number to complete */
  target: number;
}

const CHALLENGES: Record<ChallengeType, Omit<DailyChallenge, 'target' | 'xpReward'>> = {
  'vocab-sprint': {
    type: 'vocab-sprint',
    title: 'Word Sprint',
    description: 'Learn new vocabulary words today',
    emoji: '📖',
  },
  'perfect-lesson': {
    type: 'perfect-lesson',
    title: 'Perfection',
    description: 'Score 100% on any lesson',
    emoji: '🎯',
  },
  'speak-3': {
    type: 'speak-3',
    title: 'Voice Training',
    description: 'Complete speaking exercises',
    emoji: '🎙️',
  },
  'boss-attempt': {
    type: 'boss-attempt',
    title: 'Boss Challenge',
    description: 'Attempt a boss battle',
    emoji: '⚔️',
  },
  'review-15': {
    type: 'review-15',
    title: 'Memory Lane',
    description: 'Review vocabulary cards',
    emoji: '🧠',
  },
  'game-trio': {
    type: 'game-trio',
    title: 'Game Explorer',
    description: 'Play different games',
    emoji: '🎮',
  },
  'explorer': {
    type: 'explorer',
    title: 'New Horizons',
    description: 'Try a new module or lesson',
    emoji: '🌍',
  },
  'pronunciation-5': {
    type: 'pronunciation-5',
    title: 'Say It Right',
    description: 'Practice pronunciation',
    emoji: '🗣️',
  },
  'streak-keep': {
    type: 'streak-keep',
    title: 'Show Up',
    description: 'Just open the app and do anything today',
    emoji: '🔥',
  },
  'combo-10': {
    type: 'combo-10',
    title: 'Combo Master',
    description: 'Reach a combo of 10 in any game',
    emoji: '⚡',
  },
};

// Day of week → challenge type mapping (varies the experience)
const DAY_CHALLENGES: ChallengeType[][] = [
  ['streak-keep', 'review-15'],       // Sunday — easy day
  ['vocab-sprint', 'explorer'],        // Monday — fresh start
  ['speak-3', 'pronunciation-5'],      // Tuesday — speaking focus
  ['game-trio', 'combo-10'],           // Wednesday — game day
  ['review-15', 'vocab-sprint'],       // Thursday — review
  ['perfect-lesson', 'boss-attempt'],  // Friday — challenge day
  ['game-trio', 'explorer'],           // Saturday — exploration
];

/**
 * Get today's daily challenge based on day of week and user level.
 * Uses a deterministic seed so the same user sees the same challenge all day.
 */
export function getDailyChallenge(level: number, date: Date = new Date()): DailyChallenge {
  const dayOfWeek = date.getDay();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

  // Pick from the day's challenge pool
  const pool = DAY_CHALLENGES[dayOfWeek];
  const index = dayOfYear % pool.length;
  const type = pool[index];
  const base = CHALLENGES[type];

  // Scale target and reward by level
  const levelMultiplier = Math.max(1, Math.floor(level / 5) + 1);
  const targetMap: Record<ChallengeType, number> = {
    'vocab-sprint': 5 + levelMultiplier * 2,
    'perfect-lesson': 1,
    'speak-3': 3,
    'boss-attempt': 1,
    'review-15': 10 + levelMultiplier * 3,
    'game-trio': 3,
    'explorer': 1,
    'pronunciation-5': 3 + levelMultiplier,
    'streak-keep': 1,
    'combo-10': 10,
  };

  const xpMap: Record<ChallengeType, number> = {
    'vocab-sprint': 30 + levelMultiplier * 5,
    'perfect-lesson': 50,
    'speak-3': 40,
    'boss-attempt': 60,
    'review-15': 25 + levelMultiplier * 3,
    'game-trio': 35,
    'explorer': 40,
    'pronunciation-5': 35,
    'streak-keep': 15,
    'combo-10': 45,
  };

  return {
    ...base,
    target: targetMap[type],
    xpReward: xpMap[type],
  };
}

/**
 * Get the date string for today (used as a key for tracking completion).
 */
export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}
