'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, Trophy, Lock, BookOpen } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';

interface GameDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  timeEstimate: string;
  unlockModule: number; // 0 = always unlocked
  tag?: string;
}

const games: GameDef[] = [
  {
    id: 'word-match',
    name: 'Word Match',
    description: 'Match German words to their meanings. Quick and fun.',
    icon: '🎯',
    color: '#d4a520',
    difficulty: 'Easy',
    xpReward: 20,
    timeEstimate: '2-3 min',
    unlockModule: 0,
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
    unlockModule: 0,
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
    unlockModule: 0,
  },
  {
    id: 'fill-the-gap',
    name: 'Fill the Gap',
    description: 'Complete German sentences with the missing word. No timer pressure!',
    icon: '✏️',
    color: '#8b5cf6',
    difficulty: 'Medium',
    xpReward: 35,
    timeEstimate: '3-4 min',
    unlockModule: 2,
    tag: 'NEW',
  },
  {
    id: 'sentence-builder',
    name: 'Sentence Builder',
    description: 'Arrange words in the correct German word order. Tap to build!',
    icon: '🧩',
    color: '#d4a520',
    difficulty: 'Medium',
    xpReward: 35,
    timeEstimate: '3-4 min',
    unlockModule: 3,
    tag: 'NEW',
  },
  {
    id: 'article-blitz',
    name: 'Article Blitz',
    description: 'der, die, or das? The ultimate article speed challenge!',
    icon: '⚡',
    color: '#ec4899',
    difficulty: 'Medium',
    xpReward: 40,
    timeEstimate: '2-3 min',
    unlockModule: 4,
    tag: 'NEW',
  },
  {
    id: 'verb-rush',
    name: 'Verb Rush',
    description: 'Conjugate verbs at lightning speed. Build combos for bonus XP!',
    icon: '🔥',
    color: '#ef4444',
    difficulty: 'Hard',
    xpReward: 50,
    timeEstimate: '2-3 min',
    unlockModule: 5,
    tag: 'NEW',
  },
  {
    id: 'time-attack',
    name: 'Time Attack',
    description: "Kuttan's watch is broken! Read the clock and tell the time in German.",
    icon: '🕐',
    color: '#06b6d4',
    difficulty: 'Easy',
    xpReward: 25,
    timeEstimate: '2-3 min',
    unlockModule: 3,
    tag: 'NEW',
  },
  {
    id: 'number-blitz',
    name: 'Number Blitz',
    description: 'Match German number words to digits at the Kochi fish market!',
    icon: '🔢',
    color: '#f59e0b',
    difficulty: 'Medium',
    xpReward: 30,
    timeEstimate: '2 min',
    unlockModule: 3,
    tag: 'NEW',
  },
  {
    id: 'food-order',
    name: 'Food Order',
    description: 'Help Kuttan order food at a German restaurant. Tap the right items!',
    icon: '🍽️',
    color: '#ef4444',
    difficulty: 'Medium',
    xpReward: 40,
    timeEstimate: '3 min',
    unlockModule: 6,
    tag: 'NEW',
  },
  {
    id: 'room-builder',
    name: 'Room Builder',
    description: "Furnish Kuttan's WG in Berlin and answer preposition questions!",
    icon: '🏠',
    color: '#a855f7',
    difficulty: 'Medium',
    xpReward: 35,
    timeEstimate: '3-4 min',
    unlockModule: 8,
    tag: 'NEW',
  },
  {
    id: 'dialogue-dash',
    name: 'Dialogue Dash',
    description: 'Complete real German conversations at the Bahnhof, doctor, and more!',
    icon: '💬',
    color: '#3b82f6',
    difficulty: 'Medium',
    xpReward: 40,
    timeEstimate: '3-4 min',
    unlockModule: 9,
    tag: 'NEW',
  },
  {
    id: 'story-builder',
    name: 'Story Builder',
    description: 'Help Kuttan tell stories in past tense! Arrange Perfekt sentences.',
    icon: '📖',
    color: '#7c3aed',
    difficulty: 'Hard',
    xpReward: 45,
    timeEstimate: '4-5 min',
    unlockModule: 13,
    tag: 'NEW',
  },
  {
    id: 'speed-quiz',
    name: 'Speed Quiz',
    description: 'Answer before time runs out. How many can you get?',
    icon: '🏆',
    color: '#c0392b',
    difficulty: 'Hard',
    xpReward: 50,
    timeEstimate: '1-2 min',
    unlockModule: 0,
  },
  {
    id: 'food-order',
    name: 'Food Order',
    description: 'Order food at a German restaurant. Tap the right items before time runs out!',
    icon: '🍽️',
    color: '#ff6b9d',
    difficulty: 'Easy',
    xpReward: 40,
    timeEstimate: '2-3 min',
    unlockModule: 0,
    tag: 'NEW',
  },
  {
    id: 'room-builder',
    name: 'Room Builder',
    description: 'Furnish Kuttan\'s Berlin apartment and master German prepositions!',
    icon: '🏠',
    color: '#00d9a5',
    difficulty: 'Medium',
    xpReward: 48,
    timeEstimate: '3-5 min',
    unlockModule: 2,
    tag: 'NEW',
  },
  {
    id: 'dialogue-dash',
    name: 'Dialogue Dash',
    description: 'Complete real German conversations. From train stations to doctor visits!',
    icon: '💬',
    color: '#a855f7',
    difficulty: 'Medium',
    xpReward: 60,
    timeEstimate: '4-6 min',
    unlockModule: 3,
    tag: 'NEW',
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

  // Calculate completed modules
  const completedModules = mounted ? ALL_MODULES.filter(m =>
    m.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id))
  ).length : 0;

  const isGameUnlocked = (game: GameDef) => {
    if (game.unlockModule === 0) return true;
    return completedModules >= game.unlockModule;
  };

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

  const unlockedGames = games.filter(g => isGameUnlocked(g));
  const lockedGames = games.filter(g => !isGameUnlocked(g));
  const recommendedGame = unlockedGames[unlockedGames.length - 1] || unlockedGames[0];

  return (
    <div className="min-h-screen px-4 py-4 safe-top safe-bottom">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-3"
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
      >
        <div className="flex items-center justify-center gap-4 mb-3 text-sm">
          <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-[#c0392b]" />{userProgress.gamesPlayed}</span>
          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#d4a520]" />{userProgress.xp} XP</span>
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-[#27ae60]" />{userProgress.learnedVocabulary.length}</span>
        </div>
      </motion.div>

      {/* Unlocked Games */}
      <div className="space-y-2">
        {unlockedGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link href={`/games/${game.id}`}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="game-card p-3 cursor-pointer transition-all active:bg-[var(--foreground)]/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${game.color}15`, border: `2px solid ${game.color}30` }}
                  >
                    {game.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base leading-tight">
                        {game.name}
                      </h3>
                      {game.tag && (
                        <span className={`text-xs font-bold bg-[#ff6b9d]/20 text-[#ff6b9d] px-1.5 py-0.5 rounded-full${game.tag === 'NEW' ? ' animate-rickshaw' : ''}`}>
                          {game.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--foreground)]/40 text-xs mb-2 leading-relaxed line-clamp-1">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${difficultyColors[game.difficulty]}`}>
                        {game.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#d4a520] font-bold">
                        <Zap className="w-3 h-3" />
                        +{game.xpReward} XP
                      </span>
                      <span className="text-xs text-[var(--foreground)]/40">
                        {game.timeEstimate}
                      </span>
                    </div>
                  </div>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${game.color}20` }}
                  >
                    <span className="font-bold text-sm" style={{ color: game.color }}>→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Locked Games */}
      {lockedGames.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mt-3 mb-3"
          >
            <Lock className="w-4 h-4 text-[var(--foreground)]/30" />
            <span className="text-sm font-medium text-[var(--foreground)]/40">Unlock by learning</span>
          </motion.div>
          <div className="space-y-2">
            {lockedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.05 }}
              >
                <div className="game-card p-3 opacity-40">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--card-bg)] flex items-center justify-center text-2xl flex-shrink-0 grayscale">
                      {game.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base leading-tight mb-1">{game.name}</h3>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-[var(--foreground)]/30" />
                        <span className="text-xs text-[var(--foreground)]/30">Complete Module {game.unlockModule}</span>
                      </div>
                    </div>
                    <Lock className="w-5 h-5 text-[var(--foreground)]/40 flex-shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 game-card p-3 border-[#d4a520]/20"
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

      {/* Games count */}
      <p className="text-center text-[var(--foreground)]/40 text-xs mt-4">
        {unlockedGames.length} of {games.length} games unlocked
      </p>
    </div>
  );
}
