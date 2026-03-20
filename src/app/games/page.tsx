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
    nameML: 'Vaakku Kalikkam! 🎯',
    description: 'German words Malayalam-il match cheyyuka! Ninte speed kandolam!',
    icon: '🎯',
    gradient: 'from-[#ff6b9d] to-[#c44569]',
    shadow: 'shadow-[#ff6b9d]/30',
    glow: 'rgba(255,107,157,0.4)',
    difficulty: 'Easy',
    difficultyML: 'Easy! Perfect to start!',
    xpReward: 20,
    timeEstimate: '2-3 min',
    unlocked: true,
  },
  {
    id: 'memory',
    name: 'Memory Cards',
    nameML: 'Memory Game! 🃏',
    description: 'Pairs kandupidikkuka! Brain use cheyyuka! Ithu rambam fun!',
    icon: '🃏',
    gradient: 'from-[#a855f7] to-[#7c3aed]',
    shadow: 'shadow-[#a855f7]/30',
    glow: 'rgba(168,85,247,0.4)',
    difficulty: 'Medium',
    difficultyML: 'Oru cheer challenge!',
    xpReward: 30,
    timeEstimate: '3-5 min',
    unlocked: true,
  },
  {
    id: 'speed-quiz',
    name: 'Speed Quiz',
    nameML: 'Speed Round! ⚡',
    description: 'Time out aakumbol! Engana many correct aakam? Pressure test!',
    icon: '⚡',
    gradient: 'from-[#f59e0b] to-[#d97706]',
    shadow: 'shadow-[#f59e0b]/30',
    glow: 'rgba(245,158,11,0.4)',
    difficulty: 'Hard',
    difficultyML: 'Hard aayi kanikkan!',
    xpReward: 50,
    timeEstimate: '1-2 min',
    unlocked: true,
  },
  {
    id: 'greeting-time',
    name: 'Greeting Time',
    nameML: 'Greeting Challenge! 👋',
    description: 'Samayam nokki correct German greeting parayam! Easy annu!',
    icon: '👋',
    gradient: 'from-[#00d9a5] to-[#00b388]',
    shadow: 'shadow-[#00d9a5]/30',
    glow: 'rgba(0,217,165,0.4)',
    difficulty: 'Easy',
    difficultyML: 'Perfect for beginners!',
    xpReward: 15,
    timeEstimate: '1-2 min',
    unlocked: true,
  },
  {
    id: 'sentence-builder',
    name: 'Sentence Builder',
    nameML: 'Sentence Undo! 🧩',
    description: 'Vaakkukal correct order-il arrange cheyyuka! Puzzle aanu ithum!',
    icon: '🧩',
    gradient: 'from-[#3b82f6] to-[#1d4ed8]',
    shadow: 'shadow-[#3b82f6]/30',
    glow: 'rgba(59,130,246,0.4)',
    difficulty: 'Medium',
    difficultyML: 'Oru cheer think cheyyam!',
    xpReward: 35,
    timeEstimate: '3-4 min',
    unlocked: false,
    unlockAt: 'Module 2 complete cheyyuka',
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation Battle',
    nameML: 'Parayan Pattuo? 🎤',
    description: 'German words correct ayi parayanam! Malayali accent adjust cheyyam!',
    icon: '🎤',
    gradient: 'from-[#ec4899] to-[#be185d]',
    shadow: 'shadow-[#ec4899]/30',
    glow: 'rgba(236,72,153,0.4)',
    difficulty: 'Hard',
    difficultyML: 'Real challenge ithanu!',
    xpReward: 60,
    timeEstimate: '2-3 min',
    unlocked: false,
    unlockAt: '50 vaakkukal padikkuka',
  },
];

const difficultyColors: Record<string, string> = {
  Easy: 'bg-[#00d9a5]/20 text-[#00d9a5]',
  Medium: 'bg-[#f59e0b]/20 text-[#f59e0b]',
  Hard: 'bg-[#ff6b9d]/20 text-[#ff6b9d]',
};

export default function GamesPage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#ff6b9d] border-t-transparent rounded-full"
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
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-white">
          <span className="gradient-text">Games</span> 🎮
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Games kalichh German padikkam! Fun guaranteed! 🔥
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="glass-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xl font-bold text-white">{userProgress.gamesPlayed}</span>
          </div>
          <div className="text-xs text-white/50">Games Played</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-bold text-white">{userProgress.xp}</span>
          </div>
          <div className="text-xs text-white/50">Total XP</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-4 h-4 text-[#00d9a5]" />
            <span className="text-xl font-bold text-white">{userProgress.learnedVocabulary.length}</span>
          </div>
          <div className="text-xs text-white/50">Words Learned</div>
        </div>
      </motion.div>

      {/* Games Grid */}
      <div className="space-y-4">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.07 }}
          >
            {game.unlocked ? (
              <Link href={`/games/${game.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card p-4 cursor-pointer hover:border-white/30 transition-all"
                  style={{
                    boxShadow: `0 4px 20px ${game.glow}`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg ${game.shadow}`}>
                      {game.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-white text-lg leading-tight">
                          {game.nameML}
                        </h3>
                      </div>
                      <p className="text-white/60 text-xs mb-2 leading-relaxed">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${difficultyColors[game.difficulty]}`}>
                          {game.difficultyML}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#ffd93d] font-bold">
                          <Zap className="w-3 h-3" />
                          +{game.xpReward} XP
                        </span>
                        <span className="text-xs text-white/40">
                          ⏱ {game.timeEstimate}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${game.gradient} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm font-bold">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <motion.div
                className="glass-card p-4 opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl flex-shrink-0`}>
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white/60 text-lg leading-tight mb-1">
                      {game.nameML}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-white/40" />
                      <span className="text-xs text-white/40">{game.unlockAt}</span>
                    </div>
                  </div>
                  <Lock className="w-6 h-6 text-white/30 flex-shrink-0" />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Daily Challenge Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 glass-card p-4"
        style={{ boxShadow: '0 4px 20px rgba(255,217,61,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">🏆</div>
          <div>
            <h4 className="font-bold text-[#ffd93d] text-sm">Daily Challenge!</h4>
            <p className="text-white/70 text-xs mt-0.5">
              Innu oru game kalichhal extra <span className="text-[#ffd93d] font-bold">+50 XP</span> kittum! Let's do it! 🚀
            </p>
          </div>
          <div className="ml-auto">
            <span className="text-xs text-white/40">
              {userProgress.gamesPlayed > 0 ? '✅ Done!' : 'Undone'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tip Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-4 glass-card p-4"
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-medium text-white text-sm mb-1">Pro Tip by Gopi!</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              Everyday games kalichhal words automatic ayi memory-il kayarum! Spaced repetition enna oru super technique aanu ithu! 🧠
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
