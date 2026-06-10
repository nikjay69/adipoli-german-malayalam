'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ROLEPLAY_SCENARIOS } from '@/lib/content/roleplay-scenarios';
import { Kuttan } from '@/components/character/Kuttan';

const HOOKS: Record<string, string> = {
  cafe: 'The barista asks "Was darf es sein?" — can you order a Kaffee like you do at the chaayakkada?',
  'berlin-cafe': 'Berlin-Mitte, Sonntag morgen. Order breakfast without pointing.',
  'visa-office': 'Ausländerbehörde, Window 3. Herr Schmidt needs your Termin — German only.',
  'neighbor-smalltalk': 'Uncle Klaus next door just said "Guten Morgen!" — what now?',
  'supermarket': 'REWE checkout. The Kassiererin asks "Tüte?" — don\'t freeze.',
  'doctor': 'Hausarzt visit. Describe the pain — Kopfschmerzen? Bauchschmerzen?',
  'restaurant': 'A proper Abendessen. Order, ask for the bill, tip right.',
  'public-transport': 'U-Bahn to Alexanderplatz. A stranger asks for directions.',
  'apartment-viewing': 'WG-Besichtigung. Convince them you\'re the chill flatmate.',
  'job-interview': 'Your first Vorstellungsgespräch. Stay calm, stay clear.',
};

const LEVEL_COLORS: Record<string, string> = {
  A1: '#27ae60',
  A2: '#d4a520',
  B1: '#e94560',
};

export default function RoleplayIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 safe-top safe-bottom">
      {/* Kuttan hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-start gap-3"
      >
        <Kuttan mood="excited" size="sm" />
        <div className="flex-1 pt-1">
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Speaking Roleplay</span>
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground)]/70 leading-snug">
            Pick a scene, <span className="text-[#d4a520] font-semibold">let&apos;s practice</span>, machaa. Real voices, real mistakes, real corrections — safer than your first day in Berlin.
          </p>
        </div>
      </motion.div>

      {/* Scenario grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {ROLEPLAY_SCENARIOS.map((s, idx) => {
          const hook = HOOKS[s.id] || s.goal;
          const levelColor = LEVEL_COLORS[s.level] || '#d4a520';
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.3 }}
            >
              <Link href={`/learn/roleplay/${s.id}`}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="game-card p-4 cursor-pointer border border-[var(--card-border)] hover:border-[#d4a520]/50 transition-colors h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.4 }}
                      className="text-4xl leading-none"
                    >
                      {s.emoji}
                    </motion.div>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        color: levelColor,
                        backgroundColor: `${levelColor}20`,
                        border: `1px solid ${levelColor}40`,
                      }}
                    >
                      {s.level}
                    </span>
                  </div>

                  <div>
                    <div className="text-base font-bold text-[var(--foreground)]">{s.title}</div>
                    <div className="text-[11px] text-[var(--foreground)]/40 italic">{s.titleMl}</div>
                  </div>

                  <p className="mt-2 text-xs text-[var(--foreground)]/70 leading-relaxed flex-1">
                    {hook}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[var(--card-border)]/50">
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--foreground)]/50">
                      <Clock className="w-3 h-3" />
                      <span>~{s.durationMin} min</span>
                      <span className="text-[var(--foreground)]/20">·</span>
                      <span>with {s.character.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#e94560] group-hover:translate-x-0.5 transition-transform">
                      Start
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center gap-2 text-xs text-[var(--foreground)]/40 justify-center"
      >
        <Sparkles className="w-3 h-3 text-[#d4a520]" />
        Speak slow. Mistakes are free here.
      </motion.div>
    </div>
  );
}
