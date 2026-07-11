'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { getDueCount } from '@/lib/srs';
import { Kuttan } from '@/components/character/Kuttan';
import { SkeletonGrid } from '@/components/ui/Skeleton';

const practices = [
  {
    id: 'simulator',
    name: 'Speaking Simulator',
    icon: '🎧',
    color: '#e94560',
    badge: 'EXAM',
    badgeColor: '#c0392b',
    href: '/practice/simulator',
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation',
    icon: '🎙️',
    color: '#ef4444',
    badge: 'FREE',
    badgeColor: '#27ae60',
    href: '/practice/pronunciation',
  },
  {
    id: 'speak',
    name: 'Speak & Check',
    icon: '🗣️',
    color: '#8b5cf6',
    badge: 'FREE',
    badgeColor: '#27ae60',
    href: '/practice/speak',
  },
  {
    id: 'review',
    name: 'Daily Review',
    icon: '🧠',
    color: '#d4a520',
    badge: 'SRS',
    badgeColor: '#d4a520',
    href: '/practice/review',
  },
  {
    id: 'write',
    name: 'Schreiben',
    icon: '✍️',
    color: '#ec4899',
    badge: 'AI',
    badgeColor: '#d4a520',
    href: '/practice/write',
  },
  {
    id: 'intro',
    name: 'Sich Vorstellen',
    icon: '🎤',
    color: '#f59e0b',
    badge: 'EXAM',
    badgeColor: '#c0392b',
    href: '/practice/intro',
  },
  {
    id: 'chat',
    name: 'Ask Kuttan',
    icon: '💬',
    color: '#3b82f6',
    badge: 'AI',
    badgeColor: '#d4a520',
    href: '/practice/chat',
  },
];

export default function PracticePage() {
  const router = useRouter();
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const dueCount = useMemo(() => {
    if (!mounted) return 0;
    return getDueCount(userProgress.srsCards);
  }, [mounted, userProgress.srsCards]);

  if (!mounted) return (
    <div className="min-h-screen px-3 py-3">
      <div className="h-5 w-32 bg-[var(--foreground)]/8 rounded mb-3 animate-pulse" />
      <SkeletonGrid count={6} />
    </div>
  );

  return (
    <div className="min-h-screen px-3 py-3 safe-top safe-bottom max-w-2xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 mb-2">
        <button onClick={() => router.push('/')} className="text-[var(--foreground)]/50 text-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-bold">
          <span className="gradient-text">Practice</span>
          <span className="text-[var(--foreground)]/40 font-normal ml-1.5">{practices.length} modes</span>
        </h1>
      </motion.div>

      {/* Kuttan encouragement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-2.5 items-center text-center md:flex-row md:text-left md:gap-2.5 game-card p-3.5 md:p-4 mb-2"
      >
        <Kuttan mood="pointing" size="sm" entrance={false} />
        <p className="text-xs text-[var(--foreground)]/60 leading-snug">
          {dueCount > 0
            ? `Machaa, ${dueCount} words due for review! Brain use cheyyuka! 🧠`
            : 'Practice makes permanent! Pick a mode and start. 💪'}
        </p>
      </motion.div>

      {/* 2-column practice grid */}
      <div className="grid grid-cols-2 gap-2">
        {practices.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.04 }}
          >
            <Link href={p.href}>
              <motion.div whileTap={{ scale: 0.96 }}
                className={`relative game-card p-2.5 cursor-pointer h-full border border-transparent hover:border-[#d4a520]/40 hover:-translate-y-0.5 transition-all ${
                  p.id === 'review' && dueCount > 5 ? 'animate-pulse-glow' : ''
                }`}>
                {p.id === 'review' && dueCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#c0392b] rounded-full animate-ping" />
                )}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: `${p.color}15`, border: `1.5px solid ${p.color}30` }}>
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-tight truncate">{p.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${p.badgeColor}20`, color: p.badgeColor }}>
                    {p.badge}
                  </span>
                  {p.id === 'review' && dueCount > 0 && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#c0392b]/20 text-[#c0392b]">
                      {dueCount} due
                    </span>
                  )}
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
