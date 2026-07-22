'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ALL_MODULES } from '@/lib/content/modules';
import { Nivin } from '@/components/character/Nivin';
import { useGameStore } from '@/lib/store';

export default function ScriptsPage() {
  const router = useRouter();
  const { userProgress } = useGameStore();
  const done = userProgress?.completedLessons || [];

  const moduleCompletion = (mod: typeof ALL_MODULES[number]) => {
    const total = mod.lessons.length;
    const doneCount = mod.lessons.filter(l => done.some(cl => cl.lessonId === l.id && cl.completed)).length;
    return { doneCount, total, pct: total ? Math.round((doneCount / total) * 100) : 0 };
  };

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <button onClick={() => router.push('/profile')} className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-start gap-3 mb-5">
          <Nivin mood="happy" size="sm" />
          <div className="flex-1 pt-2">
            <h1 className="text-2xl font-bold mb-1">
              <span className="gradient-text">Lesson Scripts</span>
            </h1>
            <p className="text-[var(--foreground)]/60 text-sm leading-snug">
              <span className="text-[#d4a520] font-semibold">Peek behind the scenes</span> at every lesson script, machaa. Read along, print, or keep one on your phone for the Bangalore-to-Berlin flight.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Download All */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Link href="/scripts/all">
          <div className="game-card p-4 border-[#d4a520]/20 cursor-pointer hover:border-[#d4a520]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#d4a520]/10 flex items-center justify-center">
                <Download className="w-6 h-6 text-[#d4a520]" />
              </div>
              <div>
                <h3 className="font-bold text-[#d4a520]">Complete Course Script</h3>
                <p className="text-xs text-[var(--foreground)]/40">All 18 modules · ~90 lessons · Print or save as PDF</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Individual Modules */}
      <div className="space-y-2">
        {ALL_MODULES.map((mod, i) => {
          const { doneCount, total, pct } = moduleCompletion(mod);
          return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.03 }}
          >
            <Link href={`/scripts/${mod.id}`}>
              <div className="game-card p-3 cursor-pointer hover:border-[#d4a520]/40 border border-transparent transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm truncate">{mod.title}</h3>
                      <span className="text-[10px] text-[var(--foreground)]/30">({mod.titleGerman})</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          pct === 100
                            ? 'bg-[#27ae60]/15 text-[#27ae60]'
                            : pct > 0
                            ? 'bg-[#d4a520]/15 text-[#d4a520]'
                            : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/40'
                        }`}
                      >
                        {doneCount}/{total} · {pct}%
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--foreground)]/40">
                      {mod.lessons.reduce((s, l) => s + l.vocabulary.length, 0)} vocab · {mod.lessons.reduce((s, l) => s + l.exercises.length, 0)} exercises
                    </p>
                    <div className="mt-1.5 h-1 rounded-full bg-[var(--foreground)]/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.2 + i * 0.03, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ background: pct === 100 ? '#27ae60' : '#d4a520' }}
                      />
                    </div>
                  </div>
                  <FileText className="w-4 h-4 text-[#d4a520]/40 flex-shrink-0" />
                </div>
              </div>
            </Link>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
