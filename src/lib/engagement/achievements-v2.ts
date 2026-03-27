// Expanded Achievement System
// 50+ achievements with bronze/silver/gold tiers

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'hidden';

export type AchievementCategory = 'knowledge' | 'consistency' | 'speed' | 'explorer' | 'perfectionist' | 'social' | 'hidden';

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
  tier: AchievementTier;
  category: AchievementCategory;
  /** Check function — receives user progress and returns true if earned */
  condition: (progress: AchievementProgress) => boolean;
  xpReward: number;
}

// Subset of UserProgress we need for checking
export interface AchievementProgress {
  xp: number;
  level: number;
  streak: number;
  completedLessons: { lessonId: string; score: number }[];
  learnedVocabulary: string[];
  gamesPlayed: number;
  bossesDefeated: string[];
  achievements: string[];
}

const TIER_XP: Record<AchievementTier, number> = {
  bronze: 25,
  silver: 50,
  gold: 100,
  hidden: 75,
};

export const ACHIEVEMENTS_V2: AchievementDef[] = [
  // ── Knowledge ──
  { id: 'vocab-10', name: 'Word Collector', description: 'Learn 10 vocabulary words', emoji: '📖', tier: 'bronze', category: 'knowledge', condition: p => p.learnedVocabulary.length >= 10, xpReward: 25 },
  { id: 'vocab-50', name: 'Word Hoarder', description: 'Learn 50 vocabulary words', emoji: '📚', tier: 'silver', category: 'knowledge', condition: p => p.learnedVocabulary.length >= 50, xpReward: 50 },
  { id: 'vocab-100', name: 'Vocabulary Master', description: 'Learn 100 vocabulary words', emoji: '🧠', tier: 'gold', category: 'knowledge', condition: p => p.learnedVocabulary.length >= 100, xpReward: 100 },
  { id: 'vocab-200', name: 'Wortschatz König', description: 'Learn 200 vocabulary words', emoji: '👑', tier: 'gold', category: 'knowledge', condition: p => p.learnedVocabulary.length >= 200, xpReward: 150 },
  { id: 'vocab-500', name: 'Walking Dictionary', description: 'Learn 500 vocabulary words', emoji: '📕', tier: 'gold', category: 'knowledge', condition: p => p.learnedVocabulary.length >= 500, xpReward: 250 },
  { id: 'lesson-1', name: 'First Step', description: 'Complete your first lesson', emoji: '🎯', tier: 'bronze', category: 'knowledge', condition: p => p.completedLessons.length >= 1, xpReward: 25 },
  { id: 'lesson-10', name: 'Getting Serious', description: 'Complete 10 lessons', emoji: '📝', tier: 'silver', category: 'knowledge', condition: p => p.completedLessons.length >= 10, xpReward: 50 },
  { id: 'lesson-30', name: 'Committed Learner', description: 'Complete 30 lessons', emoji: '🎓', tier: 'gold', category: 'knowledge', condition: p => p.completedLessons.length >= 30, xpReward: 100 },
  { id: 'lesson-60', name: 'Halfway There', description: 'Complete 60 lessons', emoji: '⚡', tier: 'gold', category: 'knowledge', condition: p => p.completedLessons.length >= 60, xpReward: 150 },
  { id: 'all-lessons', name: 'Course Complete', description: 'Complete all 90 lessons', emoji: '🏆', tier: 'gold', category: 'knowledge', condition: p => p.completedLessons.length >= 90, xpReward: 500 },

  // ── Consistency ──
  { id: 'streak-3', name: 'Getting Started', description: '3-day streak', emoji: '🔥', tier: 'bronze', category: 'consistency', condition: p => p.streak >= 3, xpReward: 25 },
  { id: 'streak-7', name: 'Week Warrior', description: '7-day streak', emoji: '🔥', tier: 'silver', category: 'consistency', condition: p => p.streak >= 7, xpReward: 50 },
  { id: 'streak-14', name: 'Two Weeks Strong', description: '14-day streak', emoji: '💪', tier: 'silver', category: 'consistency', condition: p => p.streak >= 14, xpReward: 75 },
  { id: 'streak-30', name: 'Month of German', description: '30-day streak', emoji: '⭐', tier: 'gold', category: 'consistency', condition: p => p.streak >= 30, xpReward: 150 },
  { id: 'streak-60', name: 'Unstoppable', description: '60-day streak', emoji: '💎', tier: 'gold', category: 'consistency', condition: p => p.streak >= 60, xpReward: 250 },
  { id: 'streak-100', name: 'Legendary Streak', description: '100-day streak', emoji: '🌟', tier: 'gold', category: 'consistency', condition: p => p.streak >= 100, xpReward: 500 },

  // ── Speed ──
  { id: 'xp-500', name: 'Quick Learner', description: 'Earn 500 XP', emoji: '⚡', tier: 'bronze', category: 'speed', condition: p => p.xp >= 500, xpReward: 25 },
  { id: 'xp-2000', name: 'XP Machine', description: 'Earn 2,000 XP', emoji: '🚀', tier: 'silver', category: 'speed', condition: p => p.xp >= 2000, xpReward: 50 },
  { id: 'xp-5000', name: 'XP Legend', description: 'Earn 5,000 XP', emoji: '💫', tier: 'gold', category: 'speed', condition: p => p.xp >= 5000, xpReward: 100 },
  { id: 'xp-10000', name: 'Ten Thousand Club', description: 'Earn 10,000 XP', emoji: '🏅', tier: 'gold', category: 'speed', condition: p => p.xp >= 10000, xpReward: 200 },
  { id: 'level-5', name: 'Rising Star', description: 'Reach level 5', emoji: '🌟', tier: 'bronze', category: 'speed', condition: p => p.level >= 5, xpReward: 30 },
  { id: 'level-10', name: 'Double Digits', description: 'Reach level 10', emoji: '🔟', tier: 'silver', category: 'speed', condition: p => p.level >= 10, xpReward: 75 },
  { id: 'level-20', name: 'Pioneer', description: 'Reach level 20', emoji: '🗺️', tier: 'gold', category: 'speed', condition: p => p.level >= 20, xpReward: 150 },

  // ── Explorer ──
  { id: 'games-5', name: 'Game Dabbler', description: 'Play 5 games', emoji: '🎮', tier: 'bronze', category: 'explorer', condition: p => p.gamesPlayed >= 5, xpReward: 25 },
  { id: 'games-25', name: 'Game Enthusiast', description: 'Play 25 games', emoji: '🕹️', tier: 'silver', category: 'explorer', condition: p => p.gamesPlayed >= 25, xpReward: 50 },
  { id: 'games-100', name: 'Arcade Master', description: 'Play 100 games', emoji: '👾', tier: 'gold', category: 'explorer', condition: p => p.gamesPlayed >= 100, xpReward: 100 },
  { id: 'boss-1', name: 'Boss Slayer', description: 'Defeat your first boss', emoji: '⚔️', tier: 'silver', category: 'explorer', condition: p => p.bossesDefeated.length >= 1, xpReward: 75 },
  { id: 'boss-5', name: 'Boss Hunter', description: 'Defeat 5 bosses', emoji: '🗡️', tier: 'gold', category: 'explorer', condition: p => p.bossesDefeated.length >= 5, xpReward: 200 },

  // ── Perfectionist ──
  { id: 'perfect-1', name: 'Flawless', description: 'Score 100% on a lesson', emoji: '💯', tier: 'bronze', category: 'perfectionist', condition: p => p.completedLessons.some(l => l.score === 100), xpReward: 30 },
  { id: 'perfect-5', name: 'Precision Player', description: 'Score 100% on 5 lessons', emoji: '🎯', tier: 'silver', category: 'perfectionist', condition: p => p.completedLessons.filter(l => l.score === 100).length >= 5, xpReward: 75 },
  { id: 'perfect-20', name: 'Perfection Machine', description: 'Score 100% on 20 lessons', emoji: '💎', tier: 'gold', category: 'perfectionist', condition: p => p.completedLessons.filter(l => l.score === 100).length >= 20, xpReward: 200 },

  // ── Hidden ──
  { id: 'night-owl', name: 'Night Owl', description: 'Study after midnight', emoji: '🦉', tier: 'hidden', category: 'hidden', condition: () => new Date().getHours() < 5, xpReward: 30 },
  { id: 'early-bird', name: 'Early Bird', description: 'Study before 6 AM', emoji: '🐦', tier: 'hidden', category: 'hidden', condition: () => { const h = new Date().getHours(); return h >= 4 && h < 6; }, xpReward: 30 },
];

/**
 * Check which new achievements have been earned.
 * Returns only achievements not already in the user's list.
 */
export function checkNewAchievements(progress: AchievementProgress): AchievementDef[] {
  return ACHIEVEMENTS_V2.filter(
    a => !progress.achievements.includes(a.id) && a.condition(progress)
  );
}

/**
 * Get all achievements organized by category.
 */
export function getAchievementsByCategory(): Record<AchievementCategory, AchievementDef[]> {
  const result: Record<AchievementCategory, AchievementDef[]> = {
    knowledge: [], consistency: [], speed: [], explorer: [], perfectionist: [], social: [], hidden: [],
  };
  for (const a of ACHIEVEMENTS_V2) {
    result[a.category].push(a);
  }
  return result;
}
