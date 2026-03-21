'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Clock, Award, CheckCircle, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';

const tests = [
  { id: 'test-1', name: 'Übungstest 1', topic: 'Self-introduction, Personal Info & Shopping', icon: '🎯' },
  { id: 'test-2', name: 'Übungstest 2', topic: 'Daily Routine, Time & Appointments', icon: '⏰' },
  { id: 'test-3', name: 'Übungstest 3', topic: 'Family, Descriptions & Housing', icon: '👨‍👩‍👧' },
  { id: 'test-4', name: 'Übungstest 4', topic: 'Food, Restaurant & Preferences', icon: '🍽️' },
  { id: 'test-5', name: 'Übungstest 5', topic: 'Travel, Directions & Transport', icon: '✈️' },
  { id: 'test-6', name: 'Übungstest 6', topic: 'Health, Body & Doctor Visits', icon: '🏥' },
  { id: 'test-7', name: 'Übungstest 7', topic: 'Work, Study & Skills', icon: '💼' },
  { id: 'test-8', name: 'Übungstest 8', topic: 'Culture, Weather & Free Time', icon: '🇩🇪' },
];

export default function TestsPage() {
  const router = useRouter();
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Unlock tests based on module progress
  const completedModules = mounted ? ALL_MODULES.filter(m =>
    m.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id))
  ).length : 0;

  // Tests unlock progressively: test 1-2 after module 4, test 3-4 after module 8, etc.
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
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-bold mb-1">
          <span className="gradient-text">Goethe A1 Tests</span>
        </h1>
        <p className="text-[var(--foreground)]/40 text-sm mb-2">
          8 full simulation tests — Hören, Lesen, Schreiben, Sprechen
        </p>
        <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/30 mb-6">
          <Clock className="w-3 h-3" /> ~80 min per test
          <span>·</span>
          <FileText className="w-3 h-3" /> ~45 questions each
          <span>·</span>
          <Award className="w-3 h-3" /> Official Goethe format
        </div>
      </motion.div>

      {/* Goethe Format Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="game-card p-4 mb-6"
      >
        <h3 className="font-bold text-sm mb-2">Start Deutsch 1 Format</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#3b82f6]/10">
            <span>🎧</span>
            <div><div className="font-semibold text-[#3b82f6]">Hören</div><div className="text-[var(--foreground)]/40">20 min · 15 Fragen</div></div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#27ae60]/10">
            <span>📖</span>
            <div><div className="font-semibold text-[#27ae60]">Lesen</div><div className="text-[var(--foreground)]/40">25 min · 15 Fragen</div></div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#d4a520]/10">
            <span>✍️</span>
            <div><div className="font-semibold text-[#d4a520]">Schreiben</div><div className="text-[var(--foreground)]/40">20 min · 2 Aufgaben</div></div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#e94560]/10">
            <span>🗣️</span>
            <div><div className="font-semibold text-[#e94560]">Sprechen</div><div className="text-[var(--foreground)]/40">15 min · 3 Aufgaben</div></div>
          </div>
        </div>
      </motion.div>

      {/* Test List */}
      <div className="space-y-2">
        {tests.map((test, index) => {
          const unlocked = isTestUnlocked(index);
          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.04 }}
            >
              {unlocked ? (
                <Link href={`/tests/${test.id}`}>
                  <motion.div whileTap={{ scale: 0.98 }}
                    className="game-card p-4 cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{test.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm">{test.name}</h3>
                        <p className="text-xs text-[var(--foreground)]/40">{test.topic}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/30">
                        <Clock className="w-3 h-3" /> 80 min
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="game-card p-4 opacity-40">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl grayscale">{test.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{test.name}</h3>
                      <p className="text-xs text-[var(--foreground)]/30">
                        Complete Module {getTestUnlockModule(index)} to unlock
                      </p>
                    </div>
                    <Lock className="w-4 h-4 text-[var(--foreground)]/20" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Link from profile */}
      <p className="text-center text-[var(--foreground)]/20 text-xs mt-6">
        Based on official Goethe-Zertifikat A1: Start Deutsch 1 format
      </p>
    </div>
  );
}
