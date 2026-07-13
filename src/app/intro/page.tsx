'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FrauWeber } from '@/components/character/FrauWeber';
import { KUTTAN_MOOD_IMAGES } from '@/components/character/KuttanImage';
import { useGameStore } from '@/lib/store';
import { ArrowRight } from 'lucide-react';

const FIRST_MISSION_HREF = '/missions/module-1/greet-frau-weber';

export default function IntroPage() {
  const router = useRouter();
  const { markIntroSeen, userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [isLeavingIntro, setIsLeavingIntro] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && userProgress.hasSeenIntro && !isLeavingIntro) {
      router.replace('/learn');
    }
  }, [mounted, userProgress.hasSeenIntro, isLeavingIntro, router]);

  const startJourney = useCallback(() => {
    setIsLeavingIntro(true);
    markIntroSeen();
    router.replace(FIRST_MISSION_HREF);
    window.setTimeout(() => {
      if (window.location.pathname === '/intro') {
        window.location.assign(FIRST_MISSION_HREF);
      }
    }, 120);
  }, [markIntroSeen, router]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#f7ead0]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_12%,rgba(212,165,32,0.28),transparent_30%),radial-gradient(circle_at_78%_86%,rgba(39,174,96,0.16),transparent_28%)]" />
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: 'easeOut' }}
        className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col justify-center px-5 py-4 text-center text-[#1a2e1a]"
      >
        <p className="text-[0.72rem] font-black uppercase tracking-[0.32em] text-[#176a39]">
          Adipoli German
        </p>
        <p className="mx-auto mt-1.5 mb-5 max-w-[20rem] text-sm font-bold leading-snug text-[#35502c]">
          The Goethe A1 course for Malayalis.
        </p>

        <div className="mx-auto mb-5 w-full max-w-[21rem]">
          <div className="relative h-48 overflow-hidden rounded-[1.55rem] border border-[#1a2e1a]/12 shadow-[0_22px_60px_-42px_rgba(17,31,17,0.95)]">
            <img
              src="/images/scenes/hub-goethe-kochi-classroom.jpg"
              alt="The Goethe-Kochi A1 classroom where your course begins"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d1a0d]/14 via-transparent to-[#0d1a0d]/58" />
            <div className="absolute inset-x-3 top-2.5 flex justify-center">
              <span className="rounded-xl bg-[#0d1a0d]/82 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#f1d27a] shadow-lg backdrop-blur-sm">
                Goethe-Kochi · A1
              </span>
            </div>
            <FrauWeber mood="greeting" className="absolute bottom-0 left-1 h-[8.75rem] w-auto" />
            <motion.img
              src={KUTTAN_MOOD_IMAGES.waving}
              alt="Kuttan, your study buddy, waving hello"
              className="absolute bottom-0 right-1 h-[8.25rem] w-auto object-contain object-bottom drop-shadow-lg scale-x-[-1]"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-[#0d1a0d]/78 px-2 py-0.5 text-[0.6rem] font-black text-white/85">Frau Weber</span>
            <span className="absolute bottom-2 right-2 rounded-full bg-[#0d1a0d]/78 px-2 py-0.5 text-[0.6rem] font-black text-white/85">Kuttan</span>
          </div>
        </div>

        <h1 className="text-[2.35rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl">
          Your first German moment.
        </h1>

        <p className="mx-auto mt-3 max-w-[20rem] text-sm font-bold leading-snug text-[#35502c]">
          Hear a real greeting. Say it aloud. Two minutes.
        </p>

        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.28 }}
          whileTap={{ y: 2, scale: 0.98 }}
          onClick={startJourney}
          className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f9d55] px-8 py-4 text-base font-black uppercase tracking-wide text-white transition-all hover:bg-[#24ad61]"
          style={{ boxShadow: '0 5px 0 0 #11602f, 0 8px 20px -4px rgba(31,157,85,0.34)' }}
        >
          Begin lesson 1 <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.section>
    </div>
  );
}
