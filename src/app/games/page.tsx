'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { Kuttan } from '@/components/character/Kuttan';
import { Appu } from '@/components/character/Appu';
import { SkeletonGrid } from '@/components/ui/Skeleton';

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
    id: 'scene-sort',
    name: 'Scene Sort',
    description: 'Where does this word belong? Kitchen, Bahnhof, or Arztpraxis? Sort by scene!',
    icon: '🎭',
    color: '#d4a520',
    difficulty: 'Easy',
    xpReward: 30,
    timeEstimate: '3-4 min',
    unlockModule: 0,
    tag: 'REBUILT',
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
    name: 'Eavesdrop',
    description: 'Overhear German conversations and figure out what\'s happening. Fly on the wall!',
    icon: '👂',
    color: '#27ae60',
    difficulty: 'Medium',
    xpReward: 40,
    timeEstimate: '4-5 min',
    unlockModule: 0,
    tag: 'REBUILT',
  },
  {
    id: 'fill-the-gap',
    name: 'Fill the Gap',
    description: 'WG notes, WhatsApp texts, landlord emails — type the missing German word!',
    icon: '✏️',
    color: '#8b5cf6',
    difficulty: 'Medium',
    xpReward: 45,
    timeEstimate: '4-5 min',
    unlockModule: 2,
    tag: 'UPGRADED',
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
    description: 'Shopping, cooking, emailing — pick the right article in real situations!',
    icon: '⚡',
    color: '#ec4899',
    difficulty: 'Medium',
    xpReward: 45,
    timeEstimate: '3-4 min',
    unlockModule: 4,
    tag: 'UPGRADED',
  },
  {
    id: 'verb-rush',
    name: 'Verb Rush',
    description: 'Your professor asks, your flatmate says — type the right conjugation!',
    icon: '🔥',
    color: '#ef4444',
    difficulty: 'Hard',
    xpReward: 55,
    timeEstimate: '3-4 min',
    unlockModule: 5,
    tag: 'UPGRADED',
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
    description: 'Cashiers, train platforms, phone numbers — type what you hear in German!',
    icon: '🔢',
    color: '#f59e0b',
    difficulty: 'Medium',
    xpReward: 40,
    timeEstimate: '3 min',
    unlockModule: 3,
    tag: 'UPGRADED',
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
    description: 'Type your responses in real German conversations — café, doctor, train station!',
    icon: '💬',
    color: '#3b82f6',
    difficulty: 'Medium',
    xpReward: 50,
    timeEstimate: '5-6 min',
    unlockModule: 9,
    tag: 'UPGRADED',
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
    name: 'Situation Sprint',
    description: 'Real German situations coming at you fast! Would you survive in Germany?',
    icon: '🇩🇪',
    color: '#c0392b',
    difficulty: 'Hard',
    xpReward: 60,
    timeEstimate: '2-3 min',
    unlockModule: 0,
    tag: 'REBUILT',
  },
  {
    id: 'listen-act',
    name: 'Listen & Act',
    description: 'Hear German instructions, tap the right place on the map! Navigate a German town by ear.',
    icon: '🗺️',
    color: '#3b82f6',
    difficulty: 'Medium',
    xpReward: 45,
    timeEstimate: '3-5 min',
    unlockModule: 0,
    tag: 'NEW',
  },
  {
    id: 'boss/1',
    name: 'Boss: The Border Officer',
    description: 'Prove you can survive your first day in Germany!',
    icon: '👮',
    color: '#9333ea',
    difficulty: 'Hard',
    xpReward: 200,
    timeEstimate: '3-5 min',
    unlockModule: 1,
    tag: 'BOSS',
  },
  {
    id: 'boss/2', name: 'Boss: Die Bürgeramt Dame', description: 'Register at the Bürgeramt — answer every question correctly!',
    icon: '👩‍💼', color: '#9333ea', difficulty: 'Hard', xpReward: 220, timeEstimate: '3-5 min', unlockModule: 2, tag: 'BOSS',
  },
  {
    id: 'boss/3', name: 'Boss: Der Fahrkartenkontrolleur', description: 'Ticket inspector on the train! Numbers and time under pressure!',
    icon: '🎫', color: '#9333ea', difficulty: 'Hard', xpReward: 240, timeEstimate: '3-5 min', unlockModule: 3, tag: 'BOSS',
  },
  {
    id: 'boss/4', name: 'Boss: Die neugierige Nachbarin', description: 'Your nosy neighbor wants to know EVERYTHING about your family!',
    icon: '👵', color: '#9333ea', difficulty: 'Hard', xpReward: 260, timeEstimate: '3-5 min', unlockModule: 4, tag: 'BOSS',
  },
  {
    id: 'boss/5', name: 'Boss: Der strenge Chef', description: 'Job interview! Describe your daily routine perfectly!',
    icon: '👔', color: '#9333ea', difficulty: 'Hard', xpReward: 280, timeEstimate: '3-5 min', unlockModule: 5, tag: 'BOSS',
  },
  {
    id: 'boss/6', name: 'Boss: Der Sternekoch', description: 'Order a full German meal — the chef is judging you!',
    icon: '👨‍🍳', color: '#9333ea', difficulty: 'Hard', xpReward: 300, timeEstimate: '3-5 min', unlockModule: 6, tag: 'BOSS',
  },
  {
    id: 'boss/7', name: 'Boss: Die Kassiererin', description: 'Handle shopping transactions at lightning speed!',
    icon: '🛒', color: '#9333ea', difficulty: 'Hard', xpReward: 320, timeEstimate: '3-5 min', unlockModule: 7, tag: 'BOSS',
  },
  {
    id: 'boss/8', name: 'Boss: Der Vermieter', description: 'Impress the landlord to get the apartment!',
    icon: '🏠', color: '#9333ea', difficulty: 'Hard', xpReward: 340, timeEstimate: '4-5 min', unlockModule: 8, tag: 'BOSS',
  },
  {
    id: 'boss/9', name: 'Boss: Der Busfahrer', description: 'Navigate Berlin public transport — the bus driver tests you!',
    icon: '🚌', color: '#9333ea', difficulty: 'Hard', xpReward: 380, timeEstimate: '4-5 min', unlockModule: 9, tag: 'BOSS',
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
      <div className="min-h-screen px-3 py-3 safe-top safe-bottom">
        <div className="h-5 w-32 bg-[var(--foreground)]/8 rounded mb-3 animate-pulse" />
        <SkeletonGrid count={6} />
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
