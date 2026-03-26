'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Confetti } from './Confetti';
import { GameButton } from './GameButton';
import type { Module } from '@/lib/content/types';
import { JOURNEY_LOCATIONS, getLocationForModule, getCurrentLocation } from '@/lib/journey';

export interface ModuleCompleteProps {
  module: Module;
  nextModule?: Module;
  avgScore: number;
  vocabLearned: number;
  onContinue: () => void;
  completedModuleCount: number;
}

export function ModuleComplete({
  module,
  nextModule,
  avgScore,
  vocabLearned,
  onContinue,
  completedModuleCount,
}: ModuleCompleteProps) {
  const [phase, setPhase] = useState<'trophy' | 'stats' | 'journey' | 'ready'>(
    'trophy'
  );
  const [showConfetti, setShowConfetti] = useState(true);

  const currentLocation = getCurrentLocation(completedModuleCount);
  const previousLocation = getCurrentLocation(completedModuleCount - 1);
  const locationChanged = currentLocation.id !== previousLocation.id;
  const nextLocation = nextModule
    ? getLocationForModule(nextModule.id)
    : null;

  // Phase progression
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('stats'), 2000));
    timers.push(setTimeout(() => setPhase('journey'), 4500));
    timers.push(setTimeout(() => setPhase('ready'), 7000));
    timers.push(setTimeout(() => setShowConfetti(false), 5000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const totalLessons = module.lessons.length;

  const stats = [
    { label: 'Lessons Done', value: totalLessons, icon: '📖' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: '🎯' },
    { label: 'Vocab Learned', value: vocabLearned, icon: '📚' },
    { label: 'Bonus XP', value: '+100', icon: '⭐' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <Confetti isActive={showConfetti} duration={5000} />

      <div className="w-full max-w-md mx-4 py-8">
        {/* Trophy Phase */}
        <AnimatePresence>
          {(phase === 'trophy' || phase === 'stats' || phase === 'journey' || phase === 'ready') && (
            <motion.div className="text-center">
              {/* Animated Trophy */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
                className="relative inline-block mb-4"
              >
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-8xl"
                >
                  🏆
                </motion.div>
                {/* Gold glow ring */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(212,165,32,0.3) 0%, transparent 70%)',
                    width: '150%',
                    height: '150%',
                    top: '-25%',
                    left: '-25%',
                  }}
                />
              </motion.div>

              {/* Module Title */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-white mb-1">
                  Module Complete!
                </h1>
                <p className="text-lg text-[#d4a520] font-semibold">
                  {module.icon} Module {module.id}: {module.title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Phase */}
        <AnimatePresence>
          {(phase === 'stats' || phase === 'journey' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.15 * i,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 text-center"
                >
                  <span className="text-2xl block mb-1">{stat.icon}</span>
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journey Phase */}
        <AnimatePresence>
          {(phase === 'journey' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6"
            >
              {locationChanged ? (
                <motion.div className="rounded-2xl bg-gradient-to-br from-[#d4a520]/20 to-[#27ae60]/20 border border-[#d4a520]/30 p-5 text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold uppercase tracking-widest text-[#d4a520] mb-3"
                  >
                    New Location Unlocked!
                  </motion.p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-5xl mb-2"
                  >
                    {currentLocation.icon}
                  </motion.div>
                  <motion.h3
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl font-bold text-white"
                  >
                    You&apos;ve reached {currentLocation.name}!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm text-white/50 mt-1"
                  >
                    {currentLocation.description}
                  </motion.p>

                  {/* Mini journey path */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-2 mt-4"
                  >
                    <span className="text-lg opacity-40">
                      {previousLocation.icon}
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 60 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="h-0.5 bg-gradient-to-r from-white/20 to-[#d4a520]"
                    />
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="text-2xl"
                    >
                      {currentLocation.icon}
                    </motion.span>
                    {nextLocation && nextLocation.id !== currentLocation.id && (
                      <>
                        <div className="h-0.5 w-8 bg-white/10" />
                        <span className="text-lg opacity-20">
                          {nextLocation.icon}
                        </span>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                  <div className="text-3xl mb-2">{currentLocation.icon}</div>
                  <p className="text-sm text-white/60">
                    Journey: <span className="text-white font-semibold">{currentLocation.name}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Keep going to unlock the next location!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <GameButton
                onClick={onContinue}
                size="lg"
                fullWidth
                variant="primary"
                pulse
              >
                {nextModule
                  ? `Continue to Module ${nextModule.id}`
                  : 'Back to Home'}
              </GameButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
