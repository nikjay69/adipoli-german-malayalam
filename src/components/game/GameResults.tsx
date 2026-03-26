'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Kuttan } from '@/components/character/Kuttan';
import { Appu } from '@/components/character/Appu';
import { Confetti } from './Confetti';

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface GameResultsProps {
  score: number; // 0-100
  stats: StatItem[];
  onPlayAgain?: () => void;
  gameName?: string;
}

export function GameResults({ score, stats, onPlayAgain, gameName }: GameResultsProps) {
  const router = useRouter();
  const isPerfect = score >= 100;
  const isGood = score >= 70;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <Confetti isActive={isPerfect} duration={3000} />

      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        className="game-card p-5 max-w-sm w-full text-center"
      >
        {/* Characters */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="flex items-end justify-center gap-2 mb-4"
        >
          <Kuttan
            mood={isPerfect ? 'celebrating' : isGood ? 'happy' : 'sad'}
            size="md"
          />
          {isPerfect && <Appu mood="celebrating" size="xs" />}
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.35 }}
          className="mb-3"
        >
          <div className={`text-4xl font-black ${isPerfect ? 'text-[#ffd93d]' : isGood ? 'text-[#27ae60]' : 'text-[#e94560]'}`}>
            {score}%
          </div>
          <p className="text-sm text-[var(--foreground)]/50 mt-1">
            {isPerfect ? 'Adipoli! Perfect score! 🔥' : isGood ? 'Great job, machaa! 💪' : 'Keep practicing! You got this! 🌱'}
          </p>
        </motion.div>

        {/* Stats grid — staggered */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.08 }}
              className="bg-[var(--foreground)]/5 rounded-xl p-2.5"
            >
              <div className={`text-lg font-bold ${stat.color || 'text-[var(--foreground)]'}`}>
                {stat.value}
              </div>
              <div className="text-xs text-[var(--foreground)]/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex gap-2"
        >
          {onPlayAgain && (
            <button
              onClick={onPlayAgain}
              className="flex-1 py-3 rounded-xl bg-[var(--foreground)]/10 font-bold text-sm hover:bg-[var(--foreground)]/15 transition-colors"
            >
              Play Again
            </button>
          )}
          <button
            onClick={() => router.push('/games')}
            className="flex-1 game-button text-sm py-3"
          >
            {gameName ? 'Back to Games' : 'Done'}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
