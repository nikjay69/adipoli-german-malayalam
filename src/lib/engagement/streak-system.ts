// Enhanced Streak System
// Streak freeze, recovery, and visual milestones

export interface StreakInfo {
  current: number;
  freezesAvailable: number;
  /** Visual tier based on streak length */
  tier: 'none' | 'fire' | 'bluefire' | 'golden';
  /** Emoji for the current tier */
  emoji: string;
  /** Whether user can recover a broken streak */
  canRecover: boolean;
  /** Days until next freeze is earned */
  daysUntilNextFreeze: number;
}

/**
 * Get streak visual info based on current streak count.
 */
export function getStreakInfo(streak: number, freezes: number = 0, lastActiveDate?: string): StreakInfo {
  const tier = streak >= 100 ? 'golden' : streak >= 30 ? 'bluefire' : streak >= 7 ? 'fire' : streak > 0 ? 'fire' : 'none';
  const emoji = tier === 'golden' ? '🌟' : tier === 'bluefire' ? '💙' : tier === 'fire' ? '🔥' : '⚪';

  // Can recover if broken within 24 hours
  const canRecover = (() => {
    if (!lastActiveDate) return false;
    const last = new Date(lastActiveDate);
    const now = new Date();
    const diffHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    return diffHours > 24 && diffHours <= 48 && streak === 0;
  })();

  // Earn 1 freeze per 7-day streak
  const daysUntilNextFreeze = streak > 0 ? 7 - (streak % 7) : 7;

  return { current: streak, freezesAvailable: freezes, tier, emoji, canRecover, daysUntilNextFreeze };
}

/**
 * Check if a streak freeze should be earned (every 7 days).
 */
export function shouldEarnFreeze(streak: number): boolean {
  return streak > 0 && streak % 7 === 0;
}

/**
 * Streak milestone thresholds that deserve celebration.
 */
export const STREAK_MILESTONES = [3, 7, 14, 21, 30, 50, 60, 90, 100, 150, 200, 365];

export function isStreakMilestone(streak: number): boolean {
  return STREAK_MILESTONES.includes(streak);
}
