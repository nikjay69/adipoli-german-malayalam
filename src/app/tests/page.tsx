'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { Kuttan } from '@/components/character/Kuttan';

const tests = [
  { id: 'goethe-a1-test-1', name: 'Übungstest 1', topic: 'Self-intro & Shopping', icon: '🎯' },
  { id: 'goethe-a1-test-2', name: 'Übungstest 2', topic: 'Routine & Appointments', icon: '⏰' },
  { id: 'goethe-a1-test-3', name: 'Übungstest 3', topic: 'Family & Housing', icon: '👨‍👩‍👧' },
  { id: 'goethe-a1-test-4', name: 'Übungstest 4', topic: 'Food & Restaurant', icon: '🍽️' },
  { id: 'goethe-a1-test-5', name: 'Übungstest 5', topic: 'Travel & Transport', icon: '✈️' },
  { id: 'goethe-a1-test-6', name: 'Übungstest 6', topic: 'Health & Doctor', icon: '🏥' },
  { id: 'goethe-a1-test-7', name: 'Übungstest 7', topic: 'Work & Skills', icon: '💼' },
  { id: 'goethe-a1-test-8', name: 'Übungstest 8', topic: 'Culture & Weather', icon: '🇩🇪' },
];

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
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-3 py-3 safe-top safe-bottom max-w-2xl mx-auto">
      {/* Header — compact */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 mb-2">
        <button onClick={() => router.push('/')} className="text-[var(--foreground)]/50 text-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
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
        <Kuttan mood="thinking" size="sm" entrance={false} />
        <p className="text-xs text-[var(--foreground)]/60 leading-snug">
          {completedModules < 4
            ? 'Complete more modules to unlock mock exams. Patience, machaa! 📖'
            : 'Practice exams are like the real Goethe A1. Ready to test? 🎯'}
        </p>
      </motion.div>

      {/* 2-column test grid */}
      <div className="grid grid-cols-2 gap-2">
        {tests.map((test, index) => {
          const unlocked = isTestUnlocked(index);
          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + index * 0.03 }}
            >
              {unlocked ? (
                <Link href={`/tests/${test.id}`}>
                  <motion.div whileTap={{ scale: 0.96 }}
                    className="game-card p-2.5 cursor-pointer transition-colors h-full">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{test.icon}</span>
                      <h3 className="font-bold text-sm leading-tight truncate flex-1">{test.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground)]/40 truncate">{test.topic}</span>
                      <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/30 flex-shrink-0 ml-1">
                        <Clock className="w-3 h-3" />80m
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="game-card p-2.5 opacity-35 h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl grayscale">{test.icon}</span>
                    <h3 className="font-bold text-sm leading-tight truncate flex-1">{test.name}</h3>
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
      </div>

      <p className="text-center text-[var(--foreground)]/30 text-xs mt-3">
        Based on Goethe-Zertifikat A1: Start Deutsch 1
      </p>
    </div>
  );
}
