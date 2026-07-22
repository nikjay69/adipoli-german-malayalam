'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BookOpen, Calendar, CheckCircle2, ArrowRight, Map, Sparkles } from 'lucide-react';
import { Nivin } from '@/components/character/Nivin';
import { Confetti } from '@/components/game/Confetti';
import { feedbackCelebration } from '@/lib/feedback';
import { useGameStore } from '@/lib/store';
import {
  createStudyPlan,
  getEstimatedDays,
  getEstimatedCompletionDate,
  formatEstimatedDuration,
  HOUR_OPTIONS,
} from '@/lib/study-plan';

type Step = 'welcome' | 'hours' | 'ready';

export default function OnboardingPage() {
  const router = useRouter();
  const { userProgress, setStudyPlan, markIntroSeen } = useGameStore();
  const [step, setStep] = useState<Step>('welcome');
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // If study plan already exists, go to Today (the one home)
  useEffect(() => {
    if (mounted && userProgress.studyPlan) {
      router.replace('/learn');
    }
  }, [mounted, userProgress.studyPlan, router]);

  const handleSelectHours = useCallback((hours: number) => {
    setSelectedHours(hours);
  }, []);

  const handleConfirmPlan = useCallback(() => {
    if (selectedHours === null) return;
    const plan = createStudyPlan(selectedHours);
    setStudyPlan(plan);
    if (!userProgress.hasSeenIntro) {
      markIntroSeen();
    }
    setStep('ready');
    feedbackCelebration();
  }, [selectedHours, setStudyPlan, markIntroSeen, userProgress.hasSeenIntro]);

  const handleStart = useCallback(() => {
    router.replace('/learn');
  }, [router]);

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
    <div className="fixed inset-0 z-50 overflow-auto bg-[#102018] text-[#fff8ea]">
      {/* Warm Kerala-green backdrop — matches the mission shell (green/gold radials) */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(63,191,117,0.20),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(241,210,122,0.18),transparent_30%),linear-gradient(135deg,#102018_0%,#17341f_42%,#0b1727_100%)]" />
      <div className="pointer-events-none fixed -left-28 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full bg-[#3fbf75]/18 blur-3xl" />
      <div className="pointer-events-none fixed -right-28 top-20 h-[31rem] w-[31rem] rounded-full bg-[#d7b35a]/16 blur-3xl" />
      {/* Progress indicator */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {(['welcome', 'hours', 'ready'] as Step[]).map((s, i) => {
          const stepIndex = ['welcome', 'hours', 'ready'].indexOf(step);
          return (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === stepIndex ? 'bg-[#d4a520] w-8' : i < stepIndex ? 'bg-[#27ae60] w-1.5' : 'bg-white/15 w-1.5'
              }`}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 1: Welcome ── */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-8"
            >
              <Nivin mood="waving" size="lg" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-black text-center mb-3"
            >
              <span className="gradient-text">Set Up Your Plan</span>
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/50 text-center mb-3 max-w-[300px] text-sm leading-relaxed"
            >
              We&apos;ll build a daily schedule that fits your life.
              Study at your pace, and we&apos;ll keep you on track.
            </motion.p>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-3 text-white/30 text-xs mb-10"
            >
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>56 dense lessons</span>
              </div>
              <span>-</span>
              <div className="flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5" />
                <span>8 guided modules</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep('hours')}
              className="game-button text-base px-10 py-4 flex items-center gap-2"
            >
              Let&apos;s Go
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* ── Step 2: Choose Hours ── */}
        {step === 'hours' && (
          <motion.div
            key="hours"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-2"
            >
              <Nivin mood="thinking" size="sm" />
            </motion.div>

            <motion.h2
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-xl font-bold text-center mb-1 text-white"
            >
              How much time per day?
            </motion.h2>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-white/40 text-sm text-center mb-8 max-w-[280px]"
            >
              Pick what fits your schedule. You can change this later.
            </motion.p>

            <div className="w-full max-w-sm space-y-3">
              {HOUR_OPTIONS.map((option, i) => {
                const days = getEstimatedDays(option.value);
                const completionDate = getEstimatedCompletionDate(option.value);
                const dateStr = completionDate.toLocaleDateString('en-IN', {
                  month: 'short',
                  year: 'numeric',
                });
                const isSelected = selectedHours === option.value;

                return (
                  <motion.button
                    key={option.value}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectHours(option.value)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#f1d27a]/14 border-[#f1d27a]/80 shadow-[0_0_22px_rgba(241,210,122,0.28)]'
                        : 'bg-[#0f1d14]/72 border-white/12 hover:border-white/28 hover:bg-[#0f1d14]/85'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                          isSelected
                            ? 'bg-[#f1d27a]/20 text-[#f1d27a]'
                            : 'bg-white/10 text-white/60'
                        }`}>
                          {option.label.split(' ')[0]}
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-white/80'}`}>
                            {option.label}/day
                          </div>
                          <div className="text-xs text-white/40">
                            {option.sublabel}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm font-semibold ${isSelected ? 'text-[#f1d27a]' : 'text-white/50'}`}>
                          {days} days
                        </div>
                        <div className="text-xs text-white/30">
                          Done by {dateStr}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-3 pt-3 border-t border-[#f1d27a]/20"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/50">{formatEstimatedDuration(days)}</span>
                          <span className="text-[#f1d27a] font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selected
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Confirm button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedHours !== null ? 1 : 0 }}
              className="mt-8 w-full max-w-sm"
            >
              <motion.button
                whileHover={selectedHours !== null ? { scale: 1.03 } : undefined}
                whileTap={selectedHours !== null ? { scale: 0.97 } : undefined}
                onClick={handleConfirmPlan}
                disabled={selectedHours === null}
                className="game-button w-full text-base py-4 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Confirm Plan
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ── Step 3: Plan Ready ── */}
        {step === 'ready' && selectedHours !== null && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <Confetti isActive={true} duration={2500} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="mb-6"
            >
              <Nivin mood="excited" size="lg" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-black mb-2">
                <span className="gradient-text">Your Plan is Ready!</span>
              </h2>
              <p className="text-white/40 text-sm">
                Here&apos;s what your journey looks like
              </p>
            </motion.div>

            {/* Plan summary card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="w-full max-w-sm rounded-2xl bg-[#0f1d14]/72 border border-white/12 p-5 mb-6"
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#f1d27a]">
                    {getEstimatedDays(selectedHours)}
                  </div>
                  <div className="text-xs text-white/40 mt-1">Total days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#3fbf75]">
                    {selectedHours}h
                  </div>
                  <div className="text-xs text-white/40 mt-1">Per day</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2.5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#3fbf75]">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-white/70">56 dense lessons across 8 guided modules</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#3fbf75]">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <span className="text-white/70">
                    Done by{' '}
                    {getEstimatedCompletionDate(selectedHours).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#f1d27a]">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <span className="text-white/70">Progress checkpoints through the course</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="game-button text-lg px-12 py-4 flex items-center gap-2"
            >
              Start Day 1
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
