'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Star } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { SkeletonGrid } from '@/components/ui/Skeleton';

type Skill = 'hoeren' | 'lesen' | 'sprechen' | 'schreiben' | 'numbers' | 'grammar' | 'scenario' | 'boss';
type Tier = 'flagship' | 'standard';

interface GameDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  timeEstimate: string;
  unlockModule: number;
  tag?: string;
  skill: Skill;
  tier: Tier;
}

const SKILL_META: Record<Skill | 'all', { label: string; icon: string; accent: string }> = {
  all: { label: 'All', icon: '✨', accent: '#d4a520' },
  hoeren: { label: 'H\u00F6ren', icon: '🎧', accent: '#d4a520' },
  lesen: { label: 'Lesen', icon: '📖', accent: '#38bdf8' },
  sprechen: { label: 'Sprechen', icon: '🎙️', accent: '#ec4899' },
  schreiben: { label: 'Schreiben', icon: '⌨️', accent: '#10b981' },
  numbers: { label: 'Numbers', icon: '🔢', accent: '#f59e0b' },
  grammar: { label: 'Grammar', icon: '🧩', accent: '#8b5cf6' },
  scenario: { label: 'Scenario', icon: '💬', accent: '#3b82f6' },
  boss: { label: 'Boss', icon: '👹', accent: '#9333ea' },
};

const games: GameDef[] = [
  // ─── FLAGSHIP: 4 core-skill games (new) ────────────────────────────────
  { id: 'hor-und-los', name: 'H\u00F6r & Los!', description: 'Listen to a German word, pick what you heard. Real A1 H\u00F6ren prep — fast reflexes + combos.', icon: '🎧', color: '#d4a520', difficulty: 'Medium', xpReward: 50, timeEstimate: '2-3 min', unlockModule: 0, tag: 'NEW', skill: 'hoeren', tier: 'flagship' },
  { id: 'was-steht-da', name: 'Was steht da?', description: 'Read a WhatsApp, a sign, a menu. What does it say? Real A1 Lesen prep.', icon: '📖', color: '#38bdf8', difficulty: 'Easy', xpReward: 40, timeEstimate: '2-3 min', unlockModule: 0, tag: 'NEW', skill: 'lesen', tier: 'flagship' },
  { id: 'sag-es', name: 'Sag es!', description: 'Say the German phrase out loud. Browser scores your pronunciation.', icon: '🎙️', color: '#ec4899', difficulty: 'Medium', xpReward: 60, timeEstimate: '3-4 min', unlockModule: 0, tag: 'NEW', skill: 'sprechen', tier: 'flagship' },
  { id: 'tipp-es', name: 'Tipp es!', description: 'Type the German phrase under time pressure. \u00E4\u00F6\u00FC\u00DF accepted.', icon: '⌨️', color: '#10b981', difficulty: 'Medium', xpReward: 50, timeEstimate: '3-4 min', unlockModule: 0, tag: 'NEW', skill: 'schreiben', tier: 'flagship' },

  // ─── FLAGSHIP: existing strong games ───────────────────────────────────
  { id: 'listen-act', name: 'Listen & Act', description: 'Hear German instructions, tap the right place on the map.', icon: '🗺️', color: '#3b82f6', difficulty: 'Medium', xpReward: 45, timeEstimate: '3-5 min', unlockModule: 0, skill: 'hoeren', tier: 'flagship' },
  { id: 'memory', name: 'Eavesdrop', description: 'Overhear German conversations and figure out what\'s happening.', icon: '👂', color: '#27ae60', difficulty: 'Medium', xpReward: 40, timeEstimate: '4-5 min', unlockModule: 0, tag: 'REBUILT', skill: 'hoeren', tier: 'flagship' },
  { id: 'time-attack', name: 'Time Attack', description: "Kuttan's watch is broken! Read the clock and tell the time in German.", icon: '🕐', color: '#06b6d4', difficulty: 'Easy', xpReward: 25, timeEstimate: '2-3 min', unlockModule: 3, skill: 'numbers', tier: 'flagship' },
  { id: 'number-blitz', name: 'Number Blitz', description: 'Cashiers, train platforms, phone numbers — type what you hear.', icon: '🔢', color: '#f59e0b', difficulty: 'Medium', xpReward: 40, timeEstimate: '3 min', unlockModule: 3, tag: 'UPGRADED', skill: 'numbers', tier: 'flagship' },
  { id: 'dialogue-dash', name: 'Dialogue Dash', description: 'Type your responses in real German conversations.', icon: '💬', color: '#3b82f6', difficulty: 'Medium', xpReward: 50, timeEstimate: '5-6 min', unlockModule: 9, tag: 'UPGRADED', skill: 'scenario', tier: 'flagship' },

  // ─── STANDARD: solid but not flagship ──────────────────────────────────
  { id: 'greeting-time', name: 'Greeting Time', description: 'Pick the right German greeting for each situation.', icon: '👋', color: '#27ae60', difficulty: 'Easy', xpReward: 15, timeEstimate: '1-2 min', unlockModule: 0, skill: 'scenario', tier: 'standard' },
  { id: 'scene-sort', name: 'Scene Sort', description: 'Where does this word belong? Kitchen, Bahnhof, or Arztpraxis?', icon: '🎭', color: '#d4a520', difficulty: 'Easy', xpReward: 30, timeEstimate: '3-4 min', unlockModule: 0, tag: 'REBUILT', skill: 'scenario', tier: 'standard' },
  { id: 'speed-quiz', name: 'Situation Sprint', description: 'Real German situations coming at you fast!', icon: '🇩🇪', color: '#c0392b', difficulty: 'Hard', xpReward: 60, timeEstimate: '2-3 min', unlockModule: 0, tag: 'REBUILT', skill: 'scenario', tier: 'standard' },
  { id: 'food-order', name: 'Food Order', description: 'Help Kuttan order food at a German restaurant.', icon: '🍽️', color: '#ef4444', difficulty: 'Medium', xpReward: 40, timeEstimate: '3 min', unlockModule: 6, skill: 'scenario', tier: 'standard' },
  { id: 'room-builder', name: 'Room Builder', description: 'Furnish your future WG and answer preposition questions.', icon: '🏠', color: '#a855f7', difficulty: 'Medium', xpReward: 35, timeEstimate: '3-4 min', unlockModule: 8, skill: 'grammar', tier: 'standard' },
  { id: 'fill-the-gap', name: 'Fill the Gap', description: 'WG notes, WhatsApp texts, landlord emails — type the missing word.', icon: '✏️', color: '#8b5cf6', difficulty: 'Medium', xpReward: 45, timeEstimate: '4-5 min', unlockModule: 2, tag: 'UPGRADED', skill: 'schreiben', tier: 'standard' },
  { id: 'sentence-builder', name: 'Sentence Builder', description: 'Arrange words in the correct German word order.', icon: '🧩', color: '#d4a520', difficulty: 'Medium', xpReward: 35, timeEstimate: '3-4 min', unlockModule: 3, skill: 'schreiben', tier: 'standard' },
  { id: 'article-blitz', name: 'Article Blitz', description: 'der / die / das — pick the right article in real situations.', icon: '⚡', color: '#ec4899', difficulty: 'Medium', xpReward: 45, timeEstimate: '3-4 min', unlockModule: 4, tag: 'UPGRADED', skill: 'grammar', tier: 'standard' },
  { id: 'verb-rush', name: 'Verb Rush', description: 'Type the right German conjugation under pressure.', icon: '🔥', color: '#ef4444', difficulty: 'Hard', xpReward: 55, timeEstimate: '3-4 min', unlockModule: 5, tag: 'UPGRADED', skill: 'grammar', tier: 'standard' },
  { id: 'story-builder', name: 'Story Builder', description: 'Arrange Perfekt past-tense sentences to tell a story.', icon: '📖', color: '#7c3aed', difficulty: 'Hard', xpReward: 45, timeEstimate: '4-5 min', unlockModule: 13, skill: 'grammar', tier: 'standard' },

  // ─── BOSS: scenarios ────────────────────────────────────────────────────
  { id: 'boss/1', name: 'Boss: Border Officer', description: 'Prove you can survive your first day in Germany!', icon: '👮', color: '#9333ea', difficulty: 'Hard', xpReward: 200, timeEstimate: '3-5 min', unlockModule: 1, tag: 'BOSS', skill: 'boss', tier: 'flagship' },
  { id: 'boss/2', name: 'Boss: Die B\u00FCrgeramt Dame', description: 'Register at the B\u00FCrgeramt — answer every question correctly.', icon: '👩‍💼', color: '#9333ea', difficulty: 'Hard', xpReward: 220, timeEstimate: '3-5 min', unlockModule: 2, tag: 'BOSS', skill: 'boss', tier: 'flagship' },
  { id: 'boss/3', name: 'Boss: Der Fahrkartenkontrolleur', description: 'Ticket inspector on the train! Numbers + time under pressure.', icon: '🎫', color: '#9333ea', difficulty: 'Hard', xpReward: 240, timeEstimate: '3-5 min', unlockModule: 3, tag: 'BOSS', skill: 'boss', tier: 'flagship' },
  { id: 'boss/4', name: 'Boss: Die neugierige Nachbarin', description: 'Your nosy neighbor wants to know EVERYTHING about your family.', icon: '👵', color: '#9333ea', difficulty: 'Hard', xpReward: 260, timeEstimate: '3-5 min', unlockModule: 4, tag: 'BOSS', skill: 'boss', tier: 'standard' },
  { id: 'boss/5', name: 'Boss: Der strenge Chef', description: 'Job interview! Describe your daily routine perfectly.', icon: '👔', color: '#9333ea', difficulty: 'Hard', xpReward: 280, timeEstimate: '3-5 min', unlockModule: 5, tag: 'BOSS', skill: 'boss', tier: 'standard' },
  { id: 'boss/6', name: 'Boss: Der Sternekoch', description: 'Order a full German meal — the chef is judging you.', icon: '👨‍🍳', color: '#9333ea', difficulty: 'Hard', xpReward: 300, timeEstimate: '3-5 min', unlockModule: 6, tag: 'BOSS', skill: 'boss', tier: 'standard' },
  { id: 'boss/7', name: 'Boss: Die Kassiererin', description: 'Handle shopping transactions at lightning speed.', icon: '🛒', color: '#9333ea', difficulty: 'Hard', xpReward: 320, timeEstimate: '3-5 min', unlockModule: 7, tag: 'BOSS', skill: 'boss', tier: 'standard' },
  { id: 'boss/8', name: 'Boss: Der Vermieter', description: 'Impress the landlord to get the apartment.', icon: '🏠', color: '#9333ea', difficulty: 'Hard', xpReward: 340, timeEstimate: '4-5 min', unlockModule: 8, tag: 'BOSS', skill: 'boss', tier: 'standard' },
  { id: 'boss/9', name: 'Boss: Der Busfahrer', description: 'Navigate public transport — the bus driver tests you.', icon: '🚌', color: '#9333ea', difficulty: 'Hard', xpReward: 380, timeEstimate: '4-5 min', unlockModule: 9, tag: 'BOSS', skill: 'boss', tier: 'standard' },
];

const diffBadge: Record<string, string> = {
  Easy: 'text-[#27ae60] bg-[#27ae60]/15',
  Medium: 'text-[#d4a520] bg-[#d4a520]/15',
  Hard: 'text-[#c0392b] bg-[#c0392b]/15',
};

type Filter = 'all' | 'flagship' | Skill;

const FILTERS: Filter[] = ['all', 'flagship', 'hoeren', 'lesen', 'sprechen', 'schreiben', 'numbers', 'grammar', 'scenario', 'boss'];

export default function GamesPage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => { setMounted(true); }, []);

  const completedModules = mounted ? ALL_MODULES.filter((m) =>
    m.lessons.every((l) => userProgress.completedLessons.some((cl) => cl.lessonId === l.id))
  ).length : 0;

  const isGameUnlocked = (game: GameDef) => {
    if (game.unlockModule === 0) return true;
    return completedModules >= game.unlockModule;
  };

  const filteredGames = useMemo(() => {
    if (filter === 'all') return games;
    if (filter === 'flagship') return games.filter((g) => g.tier === 'flagship');
    return games.filter((g) => g.skill === filter);
  }, [filter]);

  const unlockedGames = filteredGames.filter((g) => isGameUnlocked(g));
  const lockedGames = filteredGames.filter((g) => !isGameUnlocked(g));

  if (!mounted) {
    return (
      <div className="min-h-screen px-3 py-3 safe-top safe-bottom">
        <div className="h-5 w-32 bg-[var(--foreground)]/8 rounded mb-3 animate-pulse" />
        <SkeletonGrid count={6} />
      </div>
    );
  }

  const filterLabel = (f: Filter): string => {
    if (f === 'all') return 'All';
    if (f === 'flagship') return '★ Flagship';
    return SKILL_META[f].label;
  };
  const filterIcon = (f: Filter): string => {
    if (f === 'all') return '✨';
    if (f === 'flagship') return '★';
    return SKILL_META[f].icon;
  };

  return (
    <div className="min-h-screen px-3 py-3 safe-top safe-bottom">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-2 flex items-center justify-between">
        <h1 className="text-sm font-bold">
          <span className="gradient-text">Games</span>
          <span className="ml-1.5 font-normal text-[var(--foreground)]/40">
            {filteredGames.length} total \u00B7 {unlockedGames.length} unlocked
          </span>
        </h1>
      </motion.div>

      {/* Filter pills */}
      <div className="mb-3 -mx-3 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {FILTERS.map((f) => {
            const active = filter === f;
            const isFlagship = f === 'flagship';
            const flagshipGlow = isFlagship && !active ? 'shadow-[0_0_12px_rgba(212,165,32,0.3)] border-[#d4a520]/30 bg-[#d4a520]/10 text-[#d4a520]' : '';
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? 'border-[#d4a520]/40 bg-[#d4a520]/20 text-[#d4a520]'
                    : isFlagship
                    ? flagshipGlow
                    : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <span className="mr-1">{filterIcon(f)}</span>
                {filterLabel(f)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-column game grid */}
      <motion.div
        className="grid grid-cols-2 gap-2.5 md:gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } },
        }}
      >
        {unlockedGames.map((game, index) => (
          <motion.div
            key={`${game.id}-${index}`}
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Link href={`/games/${game.id}`}>
              <motion.div whileTap={{ scale: 0.96 }} className="game-card h-full cursor-pointer p-2.5 transition-all relative">
                {game.tier === 'flagship' && (
                  <div className="absolute right-1.5 top-1.5">
                    <Star className="h-3 w-3 fill-[#d4a520] text-[#d4a520]" />
                  </div>
                )}
                <div className="mb-1.5 flex items-center gap-2">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                    style={{ backgroundColor: `${game.color}15`, border: `1.5px solid ${game.color}30` }}
                  >
                    {game.icon}
                  </div>
                  <div className="min-w-0 flex-1 pr-4">
                    <h3 className="truncate text-sm font-bold leading-tight">{game.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${diffBadge[game.difficulty]}`}>
                    {game.difficulty}
                  </span>
                  <span className="text-xs text-[var(--foreground)]/40">{game.timeEstimate}</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}

        {lockedGames.map((game, index) => (
          <motion.div
            key={`locked-${game.id}-${index}`}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="game-card h-full p-2.5 opacity-55">
              <div className="mb-1.5 flex items-center gap-2">
                <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--card-bg)] text-lg grayscale">
                  {game.icon}
                  <Lock className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-[var(--foreground)]/50" />
                </div>
                <div className="min-w-0 flex-1 pr-1">
                  <h3 className="truncate text-sm font-bold leading-tight">{game.name}</h3>
                </div>
              </div>
              <span className="text-xs text-[var(--foreground)]/60">Module {game.unlockModule}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredGames.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/50">
          No games in this category yet.
        </div>
      )}
    </div>
  );
}
