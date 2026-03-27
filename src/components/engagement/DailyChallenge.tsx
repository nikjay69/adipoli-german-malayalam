'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getDailyChallenge } from '@/lib/engagement/daily-challenges';
import { useGameStore } from '@/lib/store';

interface DailyChallengeProps {
  onTap?: () => void;
}

/**
 * Daily challenge card shown on the home page.
 * Changes every day based on user level + day of week.
 */
export function DailyChallenge({ onTap }: DailyChallengeProps) {
  const { userProgress } = useGameStore();

  const challenge = useMemo(
    () => getDailyChallenge(userProgress.level),
    [userProgress.level]
  );

  // Simple completion check — today's tasks completed count > 0
  const isCompleted = userProgress.completedTaskIds.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className={`w-full rounded-2xl border-2 p-4 cursor-pointer transition-colors ${
        isCompleted
          ? 'border-[#27ae60]/30 bg-[#27ae60]/5'
          : 'border-[#d4a520]/30 bg-gradient-to-r from-[#d4a520]/5 to-[#d4a520]/10'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{challenge.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm">
              {isCompleted ? '✅ ' : ''}{challenge.title}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4a520]/20 text-[#d4a520] font-bold">
              +{challenge.xpReward} XP
            </span>
          </div>
          <p className="text-xs text-[var(--foreground)]/50 mt-0.5">
            {challenge.description}
            {challenge.target > 1 ? ` (${challenge.target}×)` : ''}
          </p>
        </div>
        {!isCompleted && (
          <span className="text-xs text-[#d4a520] font-bold">GO →</span>
        )}
      </div>
    </motion.div>
  );
}
