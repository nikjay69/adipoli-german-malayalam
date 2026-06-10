'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Lock, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { Kuttan } from '@/components/character/Kuttan';
import { SkeletonGrid } from '@/components/ui/Skeleton';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const tests: {
  id: string;
  name: string;
  topic: string;
  icon: string;
  difficulty: Difficulty;
}[] = [
  { id: 'goethe-a1-test-1', name: 'Übungstest 1', topic: 'Introduce yourself · Order coffee ☕', icon: '🎯', difficulty: 'Easy' },
  { id: 'goethe-a1-test-2', name: 'Übungstest 2', topic: 'Book appointments · Tell time ⏰', icon: '⏰', difficulty: 'Easy' },
  { id: 'goethe-a1-test-3', name: 'Übungstest 3', topic: 'Describe family · Rent a flat 🏠', icon: '👨‍👩‍👧', difficulty: 'Medium' },
  { id: 'goethe-a1-test-4', name: 'Übungstest 4', topic: 'Order at restaurant · Shop groceries 🍽️', icon: '🍽️', difficulty: 'Medium' },
  { id: 'goethe-a1-test-5', name: 'Übungstest 5', topic: 'Buy tickets · Ask directions ✈️', icon: '✈️', difficulty: 'Medium' },
  { id: 'goethe-a1-test-6', name: 'Übungstest 6', topic: 'Visit doctor · Describe symptoms 🏥', icon: '🏥', difficulty: 'Hard' },
  { id: 'goethe-a1-test-7', name: 'Übungstest 7', topic: 'Job interview · Talk skills 💼', icon: '💼', difficulty: 'Hard' },
  { id: 'goethe-a1-test-8', name: 'Übungstest 8', topic: 'Chat weather · Plan weekend 🇩🇪', icon: '🇩🇪', difficulty: 'Hard' },
];

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-[#27ae60]/15 text-[#27ae60]',
  Medium: 'bg-[#d4a520]/15 text-[#d4a520]',
  Hard: 'bg-[#e94560]/15 text-[#e94560]',
};

export default function TestsPage() {
  const router = useRouter();
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const completedModules = mounted ? ALL_MODULES.filter(m =>
    m.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id))
  ).length : 0;

  const getTestUnlockModule = (index: number) => Math.max(0, (Math.floor(index / 2) + 1) * 4);
  const isTestUnlocked = (index: number) => completedModules >= getTestUnlockModule(index) || index < 2;

  if (!mounted) {
    return (
      <div className="min-h-screen px-3 py-3">
        <div className="h-5 w-40 bg-[var(--foreground)]/8 rounded mb-3 animate-pulse" />
        <SkeletonGrid count={8} />
      </div>
    );
  }

  const readinessPct = Math.min(100, Math.round((completedModules / 4) * 100));
  const allUnlocked = completedModules >= 4;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 8 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="min-h-screen px-3 py-3 safe-top safe-bottom max-w-2xl mx-auto">
      {/* Header — compact */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 mb-2">
        <button onClick={() => router.push('/')} className="text-[var(--foreground)]/50 text-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#d4a520]/15 flex-shrink-0">
          <Trophy className="w-4 h-4 text-[#d4a520]" />
        </span>
        <h1 className="text-sm font-bold">
          <span className="gradient-text">Goethe A1 Tests</span>
          <span className="text-[var(--foreground)]/40 font-normal ml-1.5">8 mock exams · ~80 min each</span>
        </h1>
      </motion.div>

      {/* Kuttan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-2.5 game-card px-3 py-2 mb-2"
      >
        <Kuttan mood={allUnlocked ? 'excited' : 'thinking'} size="sm" entrance={false} />
        <p className="text-xs text-[var(--foreground)]/60 leading-snug">
          {allUnlocked
            ? 'All tests unlocked! Crush the Goethe! 🚀'
            : `Complete ${4 - completedModules} more module${4 - completedModules === 1 ? '' : 's'} to unlock tests! You're ${readinessPct}% ready! 🔥`}
        </p>
      </motion.div>

      {/* Test grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {tests.map((test, index) => {
          const unlocked = isTestUnlocked(index);
          return (
            <motion.div key={test.id} variants={cardVariants}>
              {unlocked ? (
                <Link href={`/tests/${test.id}`}>
                  <motion.div whileTap={{ scale: 0.96 }}
                    className="game-card p-3 cursor-pointer h-full border-2 border-[#d4a520]/30 hover:border-[#d4a520] hover:shadow-lg hover:shadow-[#d4a520]/20 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{test.icon}</span>
                      <h3 className="font-bold text-sm leading-tight truncate flex-1">{test.name}</h3>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${difficultyStyles[test.difficulty]}`}>
                        {test.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground)]/50 truncate">{test.topic}</span>
                      <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/30 flex-shrink-0 ml-1">
                        <Clock className="w-3 h-3" />80m
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="game-card p-3 opacity-35 h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl grayscale">{test.icon}</span>
                    <h3 className="font-bold text-sm leading-tight truncate flex-1">{test.name}</h3>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${difficultyStyles[test.difficulty]}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--foreground)]/30">Module {getTestUnlockModule(index)}</span>
                    <Lock className="w-3.5 h-3.5 text-[var(--foreground)]/30 flex-shrink-0" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <p className="text-center text-[var(--foreground)]/30 text-xs mt-3">
        Based on Goethe-Zertifikat A1: Start Deutsch 1
      </p>
    </div>
  );
}
