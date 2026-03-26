'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Kuttan } from '@/components/character/Kuttan';
import { Appu } from '@/components/character/Appu';
import { useGameStore } from '@/lib/store';
import { JOURNEY_LOCATIONS } from '@/lib/journey';

type Scene = 'title' | 'meet' | 'why' | 'journey' | 'start';
const SCENES: Scene[] = ['title', 'meet', 'why', 'journey', 'start'];

export default function IntroPage() {
  const router = useRouter();
  const { markIntroSeen, userProgress } = useGameStore();
  const [currentScene, setCurrentScene] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && userProgress.hasSeenIntro) {
      router.replace('/');
    }
  }, [mounted, userProgress.hasSeenIntro, router]);

  const nextScene = useCallback(() => {
    if (currentScene < SCENES.length - 1) {
      setCurrentScene(prev => prev + 1);
    }
  }, [currentScene]);

  const navigateAfterIntro = useCallback(() => {
    markIntroSeen();
    // If no study plan, send to onboarding; otherwise go home
    if (!userProgress.studyPlan) {
      router.replace('/onboarding');
    } else {
      router.replace('/');
    }
  }, [markIntroSeen, userProgress.studyPlan, router]);

  const skip = useCallback(() => {
    navigateAfterIntro();
  }, [navigateAfterIntro]);

  const startJourney = useCallback(() => {
    navigateAfterIntro();
  }, [navigateAfterIntro]);

  if (!mounted) return null;

  const scene = SCENES[currentScene];

  return (
    <div className="fixed inset-0 bg-[#111f11] overflow-hidden z-50">
      {/* Skip */}
      {scene !== 'start' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={skip}
          className="fixed top-6 right-6 z-50 text-[var(--foreground)]/30 hover:text-[var(--foreground)]/60 text-sm px-4 py-2 rounded-full border border-[var(--foreground)]/10 transition-colors"
        >
          Skip
        </motion.button>
      )}

      {/* Progress dots */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {SCENES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentScene ? 'bg-[#d4a520] w-6' : i < currentScene ? 'bg-[#27ae60] w-1.5' : 'bg-[var(--foreground)]/15 w-1.5'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* SCENE 1: Title */}
        {scene === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={nextScene}
            className="h-full flex flex-col items-center justify-center px-8 cursor-pointer"
          >
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl font-black text-center mb-3"
            >
              <span className="gradient-text">Adipoli</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl font-semibold text-[var(--foreground)]/70 text-center"
            >
              Learn German, Kerala Style
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16 flex items-center gap-3"
            >
              <div className="w-8 h-px bg-[var(--foreground)]/20" />
              <span className="text-[var(--foreground)]/30 text-sm">tap anywhere</span>
              <div className="w-8 h-px bg-[var(--foreground)]/20" />
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 2: Meet Kuttan & Appu */}
        {scene === 'meet' && (
          <motion.div
            key="meet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={nextScene}
            className="h-full flex flex-col items-center justify-center px-8 cursor-pointer"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex items-end gap-3 mb-6 animate-palm"
            >
              <Kuttan mood="waving" size="lg" />
              <Appu mood="happy" size="sm" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="speech-bubble speech-bubble-arrow-bottom max-w-[300px] text-center"
            >
              <p className="text-sm font-medium leading-relaxed">
                Namaskaram! Njan <strong>Kuttan</strong>, ith ente koottukaaran <strong>Appu</strong>.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Njangal ninne Kerala-il ninnu Germany-lekku kondu pokum.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 mt-5"
            >
              <span className="text-[#d4a520] text-xs font-semibold px-3 py-1 rounded-full border border-[#d4a520]/30 bg-[#d4a520]/10">
                Kuttan — Your Guide
              </span>
              <span className="text-[var(--foreground)]/50 text-xs font-semibold px-3 py-1 rounded-full border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
                Appu — Sidekick
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 3: Why Germany */}
        {scene === 'why' && (
          <motion.div
            key="why"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={nextScene}
            className="h-full flex flex-col items-center justify-center px-6 cursor-pointer"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--foreground)]/40 text-xs mb-8 tracking-widest uppercase"
            >
              Why Germany?
            </motion.p>

            <div className="space-y-3 w-full max-w-sm">
              {[
                { icon: '🎓', title: 'Free Education', sub: 'World-class universities, no tuition fees', delay: 0.2 },
                { icon: '💼', title: 'Great Careers', sub: 'Engineers, IT, healthcare — high demand', delay: 0.4 },
                { icon: '🌍', title: 'Gateway to Europe', sub: 'Travel 27 countries freely', delay: 0.6 },
                { icon: '🏡', title: 'Quality of Life', sub: 'Safe, clean, excellent public systems', delay: 0.8 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: card.delay }}
                  className="game-card p-4 flex items-center gap-4"
                >
                  <span className="text-2xl w-10 text-center">{card.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm">{card.title}</h3>
                    <p className="text-[var(--foreground)]/40 text-xs">{card.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* SCENE 4: Journey Preview */}
        {scene === 'journey' && (
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={nextScene}
            className="h-full flex flex-col items-center justify-center px-6 cursor-pointer"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--foreground)]/40 text-xs mb-6 tracking-widest uppercase"
            >
              Your Journey
            </motion.p>

            <div className="w-full max-w-xs space-y-1">
              {JOURNEY_LOCATIONS.map((loc, i) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.2 }}
                  className="flex items-center gap-3 py-2"
                >
                  {/* Line connector */}
                  <div className="flex flex-col items-center w-8">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                      ${i === 0
                        ? 'bg-[#27ae60]/20 border-2 border-[#27ae60] animate-boat'
                        : i === JOURNEY_LOCATIONS.length - 1
                        ? 'bg-[#d4a520]/20 border-2 border-[#d4a520] animate-takeoff'
                        : 'bg-[var(--card-bg)] border border-[var(--card-border)]'
                      }`}
                    >
                      {loc.icon}
                    </div>
                    {i < JOURNEY_LOCATIONS.length - 1 && (
                      <div className="w-px h-4 bg-[var(--foreground)]/10 mt-1" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm">{loc.name}</h3>
                    <p className="text-[var(--foreground)]/35 text-xs">{loc.nameManglish}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-4"
            >
              <Kuttan mood="pointing" size="sm" />
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 5: Start */}
        {scene === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center px-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="flex items-end gap-2 mb-8"
            >
              <Kuttan mood="excited" size="lg" />
              <Appu mood="celebrating" size="sm" />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-center mb-2"
            >
              Ready?
            </motion.h2>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[var(--foreground)]/50 text-center mb-10 max-w-[260px] text-sm"
            >
              Your first lesson takes 5 minutes. No pressure, just fun.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startJourney}
              className="game-button text-lg px-10 py-4"
            >
              START
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
