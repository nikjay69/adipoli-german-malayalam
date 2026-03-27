'use client';

import { motion } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import { GameButton } from '@/components/game';
import { getArcForModule } from '@/lib/content/narrative-arcs';
import { getStreakInfo } from '@/lib/engagement/streak-system';

interface StoryRecapProps {
  streak: number;
  vocabCount: number;
  lessonsCompleted: number;
  currentModuleId: number;
  daysSinceLastActive: number;
  onContinue: () => void;
}

const WELCOME_MESSAGES = [
  "Machane! You're back! Nammal continue cheyyaam!",
  "Aiyyo! Missed you machane! Ready to learn more German?",
  "Welcome back! Nammude German journey continue cheyyaam!",
  "Hey machane! Good to see you! Let's pick up where we left off!",
];

/**
 * "Previously on..." story recap shown when user returns after 1+ days.
 * Provides narrative continuity and motivates the next session.
 */
export function StoryRecap({
  streak,
  vocabCount,
  lessonsCompleted,
  currentModuleId,
  daysSinceLastActive,
  onContinue,
}: StoryRecapProps) {
  const arc = getArcForModule(currentModuleId);
  const streakInfo = getStreakInfo(streak);
  const welcomeMsg = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)] p-6"
    >
      {/* Kuttan welcome */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CharacterGuide
          messages={welcomeMsg}
          mood={daysSinceLastActive > 3 ? 'sad' : 'waving'}
          size="md"
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-5 mt-5 mb-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold">{streakInfo.emoji} {streak}</p>
          <p className="text-[10px] text-[var(--foreground)]/40">Day streak</p>
        </div>
        <div className="w-px h-8 bg-[var(--foreground)]/10" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[#d4a520]">{vocabCount}</p>
          <p className="text-[10px] text-[var(--foreground)]/40">Words known</p>
        </div>
        <div className="w-px h-8 bg-[var(--foreground)]/10" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[#27ae60]">{lessonsCompleted}</p>
          <p className="text-[10px] text-[var(--foreground)]/40">Lessons done</p>
        </div>
      </motion.div>

      {/* Story recap */}
      {arc && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-sm w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 mb-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)]/30 mb-1">
            Your story so far
          </p>
          <p className="text-sm font-semibold mb-1">{arc.title}</p>
          <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">
            {arc.description}
          </p>
          <p className="text-xs text-[#d4a520] mt-2 italic">
            Kuttan: {arc.kuttanState}
          </p>
        </motion.div>
      )}

      {/* Streak warning if broken */}
      {daysSinceLastActive > 1 && streak === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xs text-[#c0392b] mb-3"
        >
          Your streak was reset — let&apos;s start a new one today!
        </motion.p>
      )}

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <GameButton onClick={onContinue} variant="primary" size="lg">
          Let&apos;s Continue!
        </GameButton>
      </motion.div>
    </motion.div>
  );
}
