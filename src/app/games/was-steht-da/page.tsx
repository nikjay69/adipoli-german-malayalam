'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Trophy, RefreshCw, Check, X, Zap } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { feedbackCorrect, feedbackWrong, feedbackCelebration } from '@/lib/feedback';

/**
 * Was steht da? — What does it say?
 *
 * A1 Lesen trainer in game form. Anti-clutter design:
 *   - ONE visual artifact per screen (WhatsApp bubble / sign / menu / note)
 *   - Short German text inside the artifact (≤10 words)
 *   - Tiny question underneath
 *   - 4 option pills, all above the fold on a 390×844 phone
 *
 * Tests real A1 Lesen skill: signs, notices, messages, schedules.
 */

type Artifact =
  | { kind: 'chat'; sender: string; avatar: string; text: string }
  | { kind: 'sign'; emoji: string; text: string; colorScheme: 'red' | 'blue' | 'yellow' | 'green' }
  | { kind: 'menu'; title: string; items: string[]; highlight?: string }
  | { kind: 'note'; from: string; text: string }
  | { kind: 'schedule'; label: string; rows: { time: string; label: string }[] };

interface Round {
  id: string;
  artifact: Artifact;
  question: string;  // short English question
  options: string[]; // 4 short pills
  correct: number;   // index in options
  reveal?: string;   // optional short reveal after answer
}

const ROUNDS: Round[] = [
  {
    id: 'r1',
    artifact: { kind: 'chat', sender: 'Amma', avatar: '👩🏽', text: 'Ich komme morgen. Bis dann!' },
    question: 'When is Amma coming?',
    options: ['Today', 'Tomorrow', 'Never', 'In a week'],
    correct: 1,
    reveal: 'morgen = tomorrow',
  },
  {
    id: 'r2',
    artifact: { kind: 'sign', emoji: '🅿️', text: 'Kein Parken 9–17 Uhr', colorScheme: 'red' },
    question: 'Can you park here at 10 AM?',
    options: ['Yes', 'No', 'Only on Sunday', 'Only for 5 min'],
    correct: 1,
    reveal: 'Kein Parken = no parking',
  },
  {
    id: 'r3',
    artifact: { kind: 'chat', sender: 'Cousin', avatar: '🧑🏽‍💻', text: 'Hallo! Wie geht es dir?' },
    question: 'What is cousin asking?',
    options: ['Your name', 'How you are', 'Where you live', 'What time it is'],
    correct: 1,
  },
  {
    id: 'r4',
    artifact: { kind: 'menu', title: 'Getränke', items: ['Kaffee — 2,50 €', 'Tee — 2,00 €', 'Apfelsaft — 3,00 €', 'Wasser — 1,50 €'], highlight: 'Kaffee — 2,50 €' },
    question: 'How much is the coffee?',
    options: ['€1.50', '€2.00', '€2.50', '€3.00'],
    correct: 2,
  },
  {
    id: 'r5',
    artifact: { kind: 'sign', emoji: '🏪', text: 'Geschlossen', colorScheme: 'red' },
    question: 'Is the shop open?',
    options: ['Yes', 'No', 'Only at 5', 'Only on weekends'],
    correct: 1,
    reveal: 'geschlossen = closed',
  },
  {
    id: 'r6',
    artifact: { kind: 'chat', sender: 'Akhil', avatar: '🧑🏽', text: 'Wo bist du?' },
    question: 'Akhil wants to know…',
    options: ['Your age', 'Where you are', 'Your name', 'What you eat'],
    correct: 1,
  },
  {
    id: 'r7',
    artifact: { kind: 'schedule', label: 'ICE 812 → München', rows: [
      { time: '08:15', label: 'Kochi' },
      { time: '12:40', label: 'Frankfurt' },
      { time: '15:55', label: 'München' },
    ]},
    question: 'When does the train arrive in Munich?',
    options: ['08:15', '12:40', '15:55', '18:20'],
    correct: 2,
  },
  {
    id: 'r8',
    artifact: { kind: 'note', from: 'Frau Weber', text: 'Hausaufgaben: Seite 12, Übung 3.' },
    question: 'What is the homework?',
    options: ['Page 2, exercise 12', 'Page 12, exercise 3', 'Page 3, exercise 12', 'Page 30, exercise 2'],
    correct: 1,
  },
  {
    id: 'r9',
    artifact: { kind: 'sign', emoji: '🚪', text: 'Bitte leise', colorScheme: 'blue' },
    question: 'What does the sign ask?',
    options: ['Please be quiet', 'Please wait', 'Please leave', 'Please pay'],
    correct: 0,
    reveal: 'leise = quiet',
  },
  {
    id: 'r10',
    artifact: { kind: 'chat', sender: 'Amma', avatar: '👩🏽', text: 'Das Essen ist fertig.' },
    question: 'What does Amma say?',
    options: ['I am hungry', 'The food is ready', 'Come home', 'Go shopping'],
    correct: 1,
    reveal: 'fertig = ready',
  },
];

const STARTING_LIVES = 3;
const BASE_POINTS = 40;
const COMBO_BONUS = 15;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function WasStehtDaGame() {
  const { addXP } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const begin = () => {
    setRounds(shuffle(ROUNDS).slice(0, 10));
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(STARTING_LIVES);
    setCorrectCount(0);
    setGameOver(false);
    setStarted(true);
  };

  const advanceOrEnd = useCallback(() => {
    const next = currentIdx + 1;
    if (next >= rounds.length || lives <= 0) {
      setGameOver(true);
      feedbackCelebration();
      const earned = Math.round(score / 10);
      if (earned > 0) addXP(earned);
      return;
    }
    setCurrentIdx(next);
    setSelected(null);
    setAnswered(false);
  }, [currentIdx, rounds.length, lives, score, addXP]);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const round = rounds[currentIdx];
    if (idx === round.correct) {
      const newCombo = combo + 1;
      const pts = BASE_POINTS + (newCombo - 1) * COMBO_BONUS;
      setScore((s) => s + pts);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);
      feedbackCorrect();
    } else {
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      feedbackWrong();
    }
    window.setTimeout(advanceOrEnd, 1400);
  };

  if (!mounted) return null;

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1420] via-[#0f1f30] to-[#0a1420] px-6">
        <div className="max-w-md w-full text-center">
          <Link href="/games" className="absolute top-6 left-6 text-white/60 hover:text-white text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Games
          </Link>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="mb-6 text-7xl">
            📖
          </motion.div>
          <h1 className="mb-2 text-4xl font-extrabold text-white">Was steht da?</h1>
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-sky-400">What&rsquo;s it say? — A1 Lesen trainer</p>
          <button
            onClick={begin}
            className="w-full rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 py-4 text-lg font-bold text-white shadow-xl shadow-sky-500/30 hover:scale-[1.02] transition-transform"
          >
            Los geht&rsquo;s!
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const stars = correctCount >= 8 ? 3 : correctCount >= 5 ? 2 : correctCount >= 3 ? 1 : 0;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1420] via-[#0f1f30] to-[#0a1420] px-6">
        <div className="max-w-md w-full text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.45 }} className="mb-4 text-7xl">
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '👍' : '📖'}
          </motion.div>
          <h2 className="mb-1 text-3xl font-extrabold text-white">
            {stars === 3 ? 'Perfekt!' : stars >= 2 ? 'Sehr gut!' : stars === 1 ? 'Weiter lesen!' : 'Noch einmal!'}
          </h2>
          <p className="mb-6 text-sm text-white/60">{correctCount} / {rounds.length} correct</p>
          <div className="mb-8 grid grid-cols-3 gap-3">
            <Stat label="Score" value={score} accent="#38bdf8" />
            <Stat label="Max combo" value={maxCombo} accent="#27ae60" />
            <Stat label="XP" value={`+${Math.round(score / 10)}`} accent="#8b5cf6" />
          </div>
          <div className="flex gap-3">
            <button onClick={begin} className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 py-3 text-sm font-bold text-white hover:scale-[1.02] transition-transform">
              <RefreshCw className="h-4 w-4" /> Play again
            </button>
            <Link href="/games" className="flex-1 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              More games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const round = rounds[currentIdx];
  if (!round) return null;
  const progress = ((currentIdx + (answered ? 1 : 0)) / rounds.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1420] via-[#0f1f30] to-[#0a1420] px-5 py-6">
      <div className="mx-auto max-w-md">
        {/* Compact HUD */}
        <div className="mb-4 flex items-center justify-between">
          <Link href="/games" className="text-white/60 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: STARTING_LIVES }).map((_, i) => (
                <Heart key={i} className={`h-4 w-4 ${i < lives ? 'fill-red-500 text-red-500' : 'text-white/20'}`} />
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-sky-400/20 px-2.5 py-0.5">
              <Trophy className="h-3.5 w-3.5 text-sky-400" />
              <span className="text-xs font-bold text-sky-400">{score}</span>
            </div>
          </div>
        </div>

        {/* Thin progress bar */}
        <div className="mb-5 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>

        {combo > 1 && (
          <div className="mb-3 flex items-center justify-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              {combo}× combo
            </motion.div>
          </div>
        )}

        {/* ARTIFACT — dominates the screen */}
        <div className="mb-6 flex min-h-[180px] items-center justify-center">
          <ArtifactView artifact={round.artifact} />
        </div>

        {/* Tiny question */}
        <div className="mb-3 text-center text-[15px] font-medium text-white/85">
          {round.question}
        </div>

        {/* Compact option pills — 2x2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {round.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === round.correct;
            const showAsRight = answered && isCorrect;
            const showAsWrong = answered && isSelected && !isCorrect;
            return (
              <motion.button
                key={idx}
                whileTap={!answered ? { scale: 0.96 } : {}}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`relative rounded-xl border-2 px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                  showAsRight
                    ? 'border-emerald-400 bg-emerald-400/15 text-white'
                    : showAsWrong
                    ? 'border-red-500 bg-red-500/15 text-white'
                    : 'border-white/10 bg-white/5 text-white hover:border-white/25'
                }`}
              >
                {opt}
                {showAsRight && <Check className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-emerald-400" />}
                {showAsWrong && <X className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-red-500" />}
              </motion.button>
            );
          })}
        </div>

        {/* Short reveal after answer */}
        <AnimatePresence>
          {answered && round.reveal && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center text-xs text-white/60"
            >
              💡 {round.reveal}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Visual artifact components — the anti-clutter  */
/* ─────────────────────────────────────────────── */

function ArtifactView({ artifact }: { artifact: Artifact }) {
  switch (artifact.kind) {
    case 'chat':
      return <ChatBubble sender={artifact.sender} avatar={artifact.avatar} text={artifact.text} />;
    case 'sign':
      return <Sign emoji={artifact.emoji} text={artifact.text} colorScheme={artifact.colorScheme} />;
    case 'menu':
      return <MenuCard title={artifact.title} items={artifact.items} highlight={artifact.highlight} />;
    case 'note':
      return <StickyNote from={artifact.from} text={artifact.text} />;
    case 'schedule':
      return <ScheduleCard label={artifact.label} rows={artifact.rows} />;
  }
}

function ChatBubble({ sender, avatar, text }: { sender: string; avatar: string; text: string }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center gap-2 px-2">
        <span className="text-2xl">{avatar}</span>
        <span className="text-xs font-semibold text-white/70">{sender}</span>
      </div>
      <div className="relative max-w-[90%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 text-white backdrop-blur-sm">
        <div className="text-xl font-semibold leading-snug">{text}</div>
        <div className="absolute -bottom-1 left-3 text-[10px] text-white/40">
          {new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

function Sign({ emoji, text, colorScheme }: { emoji: string; text: string; colorScheme: 'red' | 'blue' | 'yellow' | 'green' }) {
  const theme = {
    red: { bg: 'bg-red-500', border: 'border-red-300', ring: 'ring-red-500/30' },
    blue: { bg: 'bg-sky-500', border: 'border-sky-300', ring: 'ring-sky-500/30' },
    yellow: { bg: 'bg-yellow-500', border: 'border-yellow-300', ring: 'ring-yellow-500/30' },
    green: { bg: 'bg-emerald-500', border: 'border-emerald-300', ring: 'ring-emerald-500/30' },
  }[colorScheme];
  return (
    <div className={`flex flex-col items-center rounded-2xl ${theme.bg} px-6 py-5 text-white shadow-2xl ring-4 ${theme.ring} border-4 ${theme.border}`}>
      <div className="mb-1 text-4xl">{emoji}</div>
      <div className="text-center text-2xl font-black uppercase tracking-wide">{text}</div>
    </div>
  );
}

function MenuCard({ title, items, highlight }: { title: string; items: string[]; highlight?: string }) {
  return (
    <div className="w-full rounded-2xl border border-white/15 bg-[#1a1208] p-5 font-serif text-[#e8d9a8] shadow-2xl">
      <div className="mb-3 text-center text-lg font-bold uppercase tracking-[0.15em]">{title}</div>
      <div className="h-px bg-[#e8d9a8]/30 mb-3" />
      <div className="space-y-1.5 text-sm">
        {items.map((it) => (
          <div key={it} className={`${highlight === it ? 'font-bold text-white' : ''}`}>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

function StickyNote({ from, text }: { from: string; text: string }) {
  return (
    <div className="relative max-w-[85%] rotate-[-1.5deg] rounded-sm bg-yellow-300 px-5 py-4 text-[#2a2200] shadow-2xl">
      <div className="mb-1 text-[10px] uppercase tracking-wider opacity-70">From: {from}</div>
      <div className="text-lg font-medium leading-snug">{text}</div>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-10 bg-white/40 rotate-3 rounded-sm shadow-sm" />
    </div>
  );
}

function ScheduleCard({ label, rows }: { label: string; rows: { time: string; label: string }[] }) {
  return (
    <div className="w-full rounded-2xl border border-white/15 bg-gradient-to-br from-[#0f2a44] to-[#0a1f33] p-4 shadow-2xl">
      <div className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-sky-300">{label}</div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5">
            <span className="font-mono text-sm font-bold text-white">{r.time}</span>
            <span className="text-sm text-white/80">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-0.5 text-xl font-extrabold" style={{ color: accent }}>{value}</div>
    </div>
  );
}
