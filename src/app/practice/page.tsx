'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, MessageCircle, Headphones, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { getDueCount } from '@/lib/srs';

const practices = [
  {
    id: 'pronunciation',
    name: 'Pronunciation Check',
    description: 'Say German words and phrases — get instant feedback on your pronunciation',
    icon: '🎙️',
    color: '#ef4444',
    badge: 'FREE',
    badgeColor: '#27ae60',
    detail: 'Uses your microphone · No limits',
    href: '/practice/pronunciation',
  },
  {
    id: 'speak',
    name: 'Speak & Check',
    description: 'Pimsleur-style: Listen to German → Repeat → Get scored. Builds real speaking confidence.',
    icon: '🗣️',
    color: '#8b5cf6',
    badge: 'FREE',
    badgeColor: '#27ae60',
    detail: '10 rounds · 3 difficulty levels',
    href: '/practice/speak',
  },
  {
    id: 'review',
    name: 'Daily Review',
    description: 'Spaced repetition flashcards. Review vocab at the perfect time to lock it in forever.',
    icon: '🧠',
    color: '#d4a520',
    badge: 'SRS',
    badgeColor: '#d4a520',
    detail: 'SM-2 algorithm · Anki-style intervals',
    href: '/practice/review',
  },
  {
    id: 'write',
    name: 'Schreiben (Writing)',
    description: 'Practice Goethe A1 writing: fill forms, write messages, and get AI feedback on your German.',
    icon: '✍️',
    color: '#ec4899',
    badge: 'AI',
    badgeColor: '#d4a520',
    detail: 'Form filling · Message writing · Free write',
    href: '/practice/write',
  },
  {
    id: 'intro',
    name: 'Sich Vorstellen',
    description: 'Goethe Sprechen Teil 1: Introduce yourself in German on 6 topics with a 2-minute timer.',
    icon: '🎤',
    color: '#f59e0b',
    badge: 'EXAM',
    badgeColor: '#c0392b',
    detail: '6 topics · 2 min timer · Speech recognition',
    href: '/practice/intro',
  },
  {
    id: 'chat',
    name: 'Ask Kuttan',
    description: 'Chat with your AI German tutor. Ask grammar questions, practice sentences, clear doubts.',
    icon: '💬',
    color: '#3b82f6',
    badge: 'AI',
    badgeColor: '#d4a520',
    detail: '20 messages per session · Powered by Gemini',
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
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-bold mb-1">
          <span className="gradient-text">Practice</span>
        </h1>
        <p className="text-[var(--foreground)]/40 text-sm mb-6">
          Two-way practice — speak, listen, and get feedback
        </p>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="game-card p-4 mb-6"
      >
        <h3 className="font-bold text-sm mb-2">How Practice Works</h3>
        <div className="space-y-2 text-xs text-[var(--foreground)]/50">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
            <span><strong>Listen</strong> — Hear native German pronunciation</span>
          </div>
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-[#ef4444] flex-shrink-0" />
            <span><strong>Speak</strong> — Say it into your microphone</span>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#27ae60] flex-shrink-0" />
            <span><strong>Check</strong> — Get instant pronunciation score</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
            <span><strong>Ask</strong> — Chat with Kuttan for explanations</span>
          </div>
        </div>
      </motion.div>

      {/* Practice modes */}
      <div className="space-y-3">
        {practices.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            <Link href={p.href}>
              <motion.div whileTap={{ scale: 0.98 }}
                className="game-card p-4 cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${p.color}15`, border: `2px solid ${p.color}30` }}>
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-sm">{p.name}</h3>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${p.badgeColor}20`, color: p.badgeColor }}>
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground)]/40 leading-relaxed mb-1">{p.description}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-[var(--foreground)]/25">{p.detail}</p>
                      {p.id === 'review' && dueCount > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#c0392b]/20 text-[#c0392b]">
                          {dueCount} due
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center text-[var(--foreground)]/20 text-xs"
      >
        Pronunciation uses your browser's speech recognition (no data sent to servers)
      </motion.div>
    </div>
  );
}
