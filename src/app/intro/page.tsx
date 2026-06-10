'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { KeralaClassroomScene } from '@/components/course/KeralaClassroomScene';
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
      router.replace('/');
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
        <div className="mx-auto mb-5 w-full max-w-[17rem]">
          <KeralaClassroomScene className="h-40" variant="kochi-room" />
        </div>

        <h1 className="whitespace-nowrap text-[2.15rem] font-black leading-[0.96] tracking-[-0.045em] sm:text-5xl">
          Your first German moment.
        </h1>

        <p className="mx-auto mt-4 max-w-[20rem] text-sm font-bold leading-snug text-[#35502c]">
          Meet Frau Weber, hear a real classroom greeting, then say one useful A1 line aloud.
        </p>

        <div className="mx-auto mt-4 grid w-full max-w-[20rem] gap-2 text-left text-xs font-black uppercase tracking-[0.08em] text-[#176a39]">
          <div className="rounded-2xl bg-white/55 px-4 py-3">Listen first</div>
          <div className="rounded-2xl bg-white/55 px-4 py-3">Answer aloud</div>
          <div className="rounded-2xl bg-white/55 px-4 py-3">Fix one common mistake</div>
        </div>

        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.28 }}
          whileTap={{ y: 2, scale: 0.98 }}
          onClick={startJourney}
          className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f9d55] px-8 py-4 text-base font-black uppercase tracking-wide text-white transition-all hover:bg-[#24ad61]"
          style={{ boxShadow: '0 5px 0 0 #11602f, 0 8px 20px -4px rgba(31,157,85,0.34)' }}
        >
          Begin lesson 1 <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.section>
    </div>
  );
}
