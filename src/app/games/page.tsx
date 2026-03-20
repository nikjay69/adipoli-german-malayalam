'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, Trophy, Lock } from 'lucide-react';
import { useGameStore } from '@/lib/store';

const games = [
  {
    id: 'word-match',
    name: 'Word Match',
    description: 'Match German words to their meanings. Quick and fun.',
    icon: '🎯',
    color: '#d4a520',
    difficulty: 'Easy',
    xpReward: 20,
    timeEstimate: '2-3 min',
    unlocked: true,
  },
  {
    id: 'memory',
    name: 'Memory Cards',
    description: 'Find matching pairs. Brain training with German words.',
    icon: '🃏',
    color: '#27ae60',
    difficulty: 'Medium',
    xpReward: 30,
    timeEstimate: '3-5 min',
    unlocked: true,
  },
  {
    id: 'speed-quiz',
    name: 'Speed Quiz',
    description: 'Answer before time runs out. How many can you get?',
    icon: '⚡',
    color: '#c0392b',
    difficulty: 'Hard',
    xpReward: 50,
    timeEstimate: '1-2 min',
    unlocked: true,
  },
  {
    id: 'greeting-time',
    name: 'Greeting Time',
    description: 'Pick the right German greeting for each situation.',
    icon: '👋',
    color: '#27ae60',
    difficulty: 'Easy',
    xpReward: 15,
    timeEstimate: '1-2 min',
    unlocked: true,
  },
  {
    id: 'sentence-builder',
    name: 'Sentence Builder',
    description: 'Arrange words in the correct German word order.',
    icon: '🧩',
    color: '#d4a520',
    difficulty: 'Medium',
    xpReward: 35,
    timeEstimate: '3-4 min',
    unlocked: false,
    unlockAt: 'Complete Module 2',
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation Battle',
    description: 'Practice saying German words correctly.',
    icon: '🎤',
    color: '#c0392b',
    difficulty: 'Hard',
    xpReward: 60,
    timeEstimate: '2-3 min',
    unlocked: false,
    unlockAt: 'Learn 50 words',
  },
];

const difficultyColors: Record<string, string> = {
  Easy: 'bg-[#27ae60]/15 text-[#27ae60] border border-[#27ae60]/20',
  Medium: 'bg-[#d4a520]/15 text-[#d4a520] border border-[#d4a520]/20',
  Hard: 'bg-[#c0392b]/15 text-[#c0392b] border border-[#c0392b]/20',
};

export default function GamesPage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-5"
      >
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">Games</span>
        </h1>
        <p className="text-[var(--foreground)]/40 text-sm mt-1">
          Practice German while having fun
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-2 mb-5"
      >
        <div className="game-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-4 h-4 text-[#c0392b]" />
            <span className="text-lg font-bold">{userProgress.gamesPlayed}</span>
          </div>
          <div className="text-[10px] text-[var(--foreground)]/40">Played</div>
        </div>
        <div className="game-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 text-[#d4a520] fill-[#d4a520]" />
            <span className="text-lg font-bold">{userProgress.xp}</span>
          </div>
          <div className="text-[10px] text-[var(--foreground)]/40">XP</div>
        </div>
        <div className="game-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-4 h-4 text-[#27ae60]" />
            <span className="text-lg font-bold">{userProgress.learnedVocabulary.length}</span>
          </div>
          <div className="text-[10px] text-[var(--foreground)]/40">Words</div>
        </div>
      </motion.div>

      {/* Games */}
      <div className="space-y-3">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            {game.unlocked ? (
              <Link href={`/games/${game.id}`}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="game-card p-4 cursor-pointer transition-all active:bg-[var(--foreground)]/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: `${game.color}15`, border: `2px solid ${game.color}30` }}
                    >
                      {game.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base leading-tight mb-1">
                        {game.name}
                      </h3>
                      <p className="text-[var(--foreground)]/40 text-xs mb-2 leading-relaxed">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyColors[game.difficulty]}`}>
                          {game.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-[#d4a520] font-bold">
                          <Zap className="w-3 h-3" />
                          +{game.xpReward} XP
                        </span>
                        <span className="text-[10px] text-[var(--foreground)]/30">
                          {game.timeEstimate}
                        </span>
                      </div>
                    </div>

                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${game.color}20` }}
                    >
                      <span className="font-bold text-sm" style={{ color: game.color }}>→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="game-card p-4 opacity-40">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[var(--card-bg)] flex items-center justify-center text-2xl flex-shrink-0">
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base leading-tight mb-1">{game.name}</h3>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-[var(--foreground)]/30" />
                      <span className="text-xs text-[var(--foreground)]/30">{game.unlockAt}</span>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-[var(--foreground)]/20 flex-shrink-0" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-5 game-card p-4 border-[#d4a520]/20"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div className="flex-1">
            <h4 className="font-bold text-[#d4a520] text-sm">Daily Challenge</h4>
            <p className="text-[var(--foreground)]/40 text-xs mt-0.5">
              Play any game today for <span className="text-[#d4a520] font-bold">+50 bonus XP</span>
            </p>
          </div>
          <span className="text-xs text-[var(--foreground)]/30">
            {userProgress.gamesPlayed > 0 ? '✓' : '—'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
