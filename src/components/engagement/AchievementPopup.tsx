'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackUnlock } from '@/lib/feedback';
import type { AchievementDef } from '@/lib/engagement/achievements-v2';

interface AchievementPopupProps {
  achievement: AchievementDef | null;
  isVisible: boolean;
  onDismiss: () => void;
}

const TIER_COLORS = {
  bronze: { bg: 'from-[#CD7F32]/20 to-[#CD7F32]/5', border: 'border-[#CD7F32]/40', text: 'text-[#CD7F32]' },
  silver: { bg: 'from-[#C0C0C0]/20 to-[#C0C0C0]/5', border: 'border-[#C0C0C0]/40', text: 'text-[#C0C0C0]' },
  gold: { bg: 'from-[#d4a520]/20 to-[#d4a520]/5', border: 'border-[#d4a520]/40', text: 'text-[#d4a520]' },
  hidden: { bg: 'from-[#9333ea]/20 to-[#9333ea]/5', border: 'border-[#9333ea]/40', text: 'text-[#9333ea]' },
};

/**
 * Dramatic achievement unlock popup with animation and sound.
 * Shows briefly then auto-dismisses.
 */
export function AchievementPopup({ achievement, isVisible, onDismiss }: AchievementPopupProps) {
  useEffect(() => {
    if (isVisible && achievement) {
      feedbackUnlock();
      const timer = setTimeout(onDismiss, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, achievement, onDismiss]);

  const colors = achievement ? TIER_COLORS[achievement.tier] : TIER_COLORS.bronze;

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.8 }}
          transition={{ type: 'spring', damping: 12 }}
          onClick={onDismiss}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] cursor-pointer"
        >
          <div className={`
            bg-gradient-to-r ${colors.bg}
            border-2 ${colors.border}
            backdrop-blur-xl rounded-2xl px-5 py-3.5
            flex items-center gap-3 shadow-2xl
            min-w-[260px] max-w-[340px]
          `}>
            {/* Emoji with bounce */}
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 8 }}
              className="text-3xl"
            >
              {achievement.emoji}
            </motion.span>

            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}
              >
                Achievement Unlocked!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-bold text-sm truncate"
              >
                {achievement.name}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
                className="text-[11px] text-[var(--foreground)]/50 truncate"
              >
                {achievement.description} • +{achievement.xpReward} XP
              </motion.p>
            </div>

            {/* Sparkle particles */}
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className={`absolute w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [-10 + i * 20, -20 + i * 30],
                  y: [-5 - i * 10, -15 - i * 15],
                }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                style={{ left: `${30 + i * 25}%`, top: '20%' }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
