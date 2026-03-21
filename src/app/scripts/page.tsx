'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ALL_MODULES } from '@/lib/content/modules';

export default function ScriptsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-bold mb-1">
          <span className="gradient-text">Lesson Scripts</span>
        </h1>
        <p className="text-[var(--foreground)]/40 text-sm mb-6">
          Download complete lesson scripts as PDF for offline study
        </p>
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
        {ALL_MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.03 }}
          >
            <Link href={`/scripts/${mod.id}`}>
              <div className="game-card p-3 cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm truncate">{mod.title}</h3>
                      <span className="text-[10px] text-[var(--foreground)]/30">({mod.titleGerman})</span>
                    </div>
                    <p className="text-[10px] text-[var(--foreground)]/40">
                      {mod.lessons.length} lessons · {mod.lessons.reduce((s, l) => s + l.vocabulary.length, 0)} vocab · {mod.lessons.reduce((s, l) => s + l.exercises.length, 0)} exercises
                    </p>
                  </div>
                  <FileText className="w-4 h-4 text-[var(--foreground)]/20 flex-shrink-0" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
