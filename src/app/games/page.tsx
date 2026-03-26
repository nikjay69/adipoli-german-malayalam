'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { Kuttan } from '@/components/character/Kuttan';
import { Appu } from '@/components/character/Appu';

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
];

const diffBadge: Record<string, string> = {
  Easy: 'text-[#27ae60] bg-[#27ae60]/15',
  Medium: 'text-[#d4a520] bg-[#d4a520]/15',
  Hard: 'text-[#c0392b] bg-[#c0392b]/15',
};

export default function GamesPage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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

  return (
    <div className="min-h-screen px-3 py-3 safe-top safe-bottom">
      {/* Header — single compact line */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-2"
      >
        <h1 className="text-sm font-bold">
          <span className="gradient-text">Games</span>
          <span className="text-[var(--foreground)]/40 font-normal ml-1.5">{unlockedGames.length} of {games.length} unlocked</span>
        </h1>
      </motion.div>

      {/* Characters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-2.5 game-card px-3 py-2 mb-2"
      >
        <div className="flex items-center gap-1 flex-shrink-0">
          <Kuttan mood={unlockedGames.length > 8 ? 'excited' : 'happy'} size="sm" entrance={false} />
          <Appu mood="encouraging" size="xs" entrance={false} />
        </div>
        <p className="text-xs text-[var(--foreground)]/60 leading-snug">
          {lockedGames.length === 0
            ? 'All games unlocked! Adipoli! Play any game you want! 🔥'
            : `Complete more lessons to unlock ${lockedGames.length} more games! 🎮`}
        </p>
      </motion.div>

      {/* 2-column game grid */}
      <div className="grid grid-cols-2 gap-2">
        {unlockedGames.map((game, index) => (
          <motion.div
            key={`${game.id}-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + index * 0.03 }}
          >
            <Link href={`/games/${game.id}`}>
              <motion.div
                whileTap={{ scale: 0.96 }}
                className="game-card p-2.5 cursor-pointer transition-all h-full"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: `${game.color}15`, border: `1.5px solid ${game.color}30` }}
                  >
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-tight truncate">{game.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${diffBadge[game.difficulty]}`}>
                    {game.difficulty}
                  </span>
                  <span className="text-xs text-[var(--foreground)]/40">{game.timeEstimate}</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}

        {/* Locked games in grid */}
        {lockedGames.map((game, index) => (
          <motion.div
            key={`locked-${game.id}-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.03 }}
          >
            <div className="game-card p-2.5 opacity-35 h-full">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-lg bg-[var(--card-bg)] flex items-center justify-center text-lg flex-shrink-0 grayscale relative">
                  {game.icon}
                  <Lock className="w-3 h-3 text-[var(--foreground)]/50 absolute -bottom-0.5 -right-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">{game.name}</h3>
                </div>
              </div>
              <span className="text-xs text-[var(--foreground)]/30">Module {game.unlockModule}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
