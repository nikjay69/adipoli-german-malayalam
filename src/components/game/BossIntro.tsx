'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import { GameButton } from './GameButton';
import type { BossBattle } from '@/lib/game/boss-battles';
import { feedbackUnlock } from '@/lib/feedback';

interface BossIntroProps {
  boss: BossBattle;
  onStart: () => void;
}

/**
 * Dramatic boss battle introduction screen.
 * Screen darkens, boss name appears with fanfare, Nivin warns you.
 */
export function BossIntro({ boss, onStart }: BossIntroProps) {
  const [phase, setPhase] = useState<'darken' | 'reveal' | 'warn' | 'ready'>('darken');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 800),
      setTimeout(() => { setPhase('warn'); feedbackUnlock(); }, 1800),
      setTimeout(() => setPhase('ready'), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Darkening background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-black"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">
          {/* Boss emoji */}
          {(phase === 'reveal' || phase === 'warn' || phase === 'ready') && (
            <motion.div
              key="boss-emoji"
              initial={{ scale: 5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="text-7xl mb-4"
            >
              {boss.bossEmoji}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {(phase === 'reveal' || phase === 'warn' || phase === 'ready') && (
            <motion.div
              key="boss-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl font-black text-[#c0392b] mb-1 uppercase tracking-wider">
                {boss.bossName}
              </h1>
              <p className="text-sm text-[#d4a520] font-semibold italic mb-3">
                {boss.bossNameGerman}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === 'warn' || phase === 'ready') && (
            <motion.div
              key="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <p className="text-sm text-white/60 max-w-sm mx-auto mb-4">
                {boss.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-4 text-xs text-white/40 mb-4">
                <span>⏱️ {boss.timeLimit}s</span>
                <span>❓ {boss.rounds.length} rounds</span>
                <span>⭐ {boss.xpReward} XP</span>
              </div>

              <CharacterGuide
                messages={boss.peerWarning}
                mood="thinking"
                size="sm"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              key="start-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <GameButton onClick={onStart} variant="primary" size="lg">
                FIGHT! ⚔️
              </GameButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
