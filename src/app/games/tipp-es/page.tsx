'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Trophy, RefreshCw, Check, X, Zap, Send } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { feedbackCorrect, feedbackWrong, feedbackCelebration } from '@/lib/feedback';
import { Kuttan } from '@/components/character/Kuttan';
import { Confetti } from '@/components/game/Confetti';

const vibrate = (ms: number) => { try { navigator.vibrate?.(ms); } catch {} };

/**
 * Tipp es! — Type it!
 *
 * A1 Schreiben trainer. User sees a scene + English prompt, types the German.
 *   - Timer pressure (18 sec / round)
 *   - Accent-tolerant match (ä↔ae, ö↔oe, ü↔ue, ß↔ss)
 *   - Lives, combos, 10 rounds
 *   - Umlaut helper buttons (ä ö ü ß) above the keyboard
 */

interface Round {
  id: string;
  emoji: string;
  context: string;     // short English prompt
  target: string;      // target German phrase
  acceptable: string[]; // alternates accepted
  hint?: string;
}

const POOL: Round[] = [
  { id: 't1', emoji: '🌅', context: 'Say "Good morning" in German.', target: 'Guten Morgen', acceptable: ['guten morgen', 'guten morgen!'] },
  { id: 't2', emoji: '🙏', context: 'Say "Thank you".', target: 'Danke', acceptable: ['danke', 'danke!', 'danke schön', 'danke schoen'] },
  { id: 't3', emoji: '😅', context: 'Apologize briefly (Excuse me).', target: 'Entschuldigung', acceptable: ['entschuldigung', 'entschuldigung!'] },
  { id: 't4', emoji: '🧑', context: 'Say "My name is Kuttan".', target: 'Ich hei\u00DFe Kuttan', acceptable: ['ich heisse kuttan', 'ich hei\u00DFe kuttan'] },
  { id: 't5', emoji: '🌍', context: 'Say "I come from Kerala".', target: 'Ich komme aus Kerala', acceptable: ['ich komme aus kerala'] },
  { id: 't6', emoji: '☕', context: 'Order a coffee politely.', target: 'Einen Kaffee, bitte', acceptable: ['einen kaffee bitte', 'einen kaffee, bitte'] },
  { id: 't7', emoji: '👋', context: 'Say formal goodbye.', target: 'Auf Wiedersehen', acceptable: ['auf wiedersehen', 'auf wiedersehen!'] },
  { id: 't8', emoji: '❓', context: 'Ask "Where is the train station?".', target: 'Wo ist der Bahnhof?', acceptable: ['wo ist der bahnhof', 'wo ist der bahnhof?'] },
  { id: 't9', emoji: '💶', context: 'Ask "How much is this?".', target: 'Was kostet das?', acceptable: ['was kostet das', 'was kostet das?'] },
  { id: 't10', emoji: '🎓', context: 'Say "I am learning German".', target: 'Ich lerne Deutsch', acceptable: ['ich lerne deutsch'] },
  { id: 't11', emoji: '👂', context: 'Say "How are you?" formally.', target: 'Wie geht es Ihnen?', acceptable: ['wie geht es ihnen', 'wie geht es ihnen?'] },
  { id: 't12', emoji: '🏠', context: 'Say "I live in Thrissur".', target: 'Ich wohne in Thrissur', acceptable: ['ich wohne in thrissur'] },
];

const LIVES = 3;
const ROUND_COUNT = 10;
const ROUND_SECONDS = 18;
const BASE_POINTS = 50;
const TIME_BONUS_MAX = 30;
const COMBO_BONUS = 15;

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\.,!?;:]+$/g, '')
    .replace(/\u00DF/g, 'ss')
    .replace(/\u00E4/g, 'ae')
    .replace(/\u00F6/g, 'oe')
    .replace(/\u00FC/g, 'ue')
    .replace(/\s+/g, ' ');
}

function isMatch(input: string, round: Round): boolean {
  const clean = normalize(input);
  if (!clean) return false;
  const targets = [round.target, ...round.acceptable].map(normalize);
  return targets.includes(clean);
}

export default function TippEsGame() {
  const { addXP } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const roundStartRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

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
    setTyped('');
    setAnswered(false);
    setCorrect(false);
    setTimeLeft(ROUND_SECONDS);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [currentIdx, rounds.length, lives, score, addXP]);

  const submitAnswer = useCallback((forced = false) => {
    if (answered) return;
    const round = rounds[currentIdx];
    if (!round) return;
    stopTimer();

    const isRight = !forced && isMatch(typed, round);
    setAnswered(true);
    setCorrect(isRight);

    if (isRight) {
      const elapsedMs = Date.now() - roundStartRef.current;
      const timeBonus = Math.max(0, Math.round(TIME_BONUS_MAX * (1 - elapsedMs / (ROUND_SECONDS * 1000))));
      const newCombo = combo + 1;
      const pts = BASE_POINTS + timeBonus + (newCombo - 1) * COMBO_BONUS;
      setScore((s) => s + pts);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);
      feedbackCorrect();
      vibrate(20);
    } else {
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      feedbackWrong();
      vibrate(40);
    }
    window.setTimeout(advanceOrEnd, 1500);
  }, [answered, rounds, currentIdx, typed, combo, stopTimer, advanceOrEnd]);

  // Timer per round
  useEffect(() => {
    if (!started || gameOver || answered) return;
    roundStartRef.current = Date.now();
    setTimeLeft(ROUND_SECONDS);
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          submitAnswer(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => stopTimer();
  }, [started, currentIdx, answered, gameOver, stopTimer, submitAnswer]);

  const begin = () => {
    setRounds(shuffle(POOL).slice(0, ROUND_COUNT));
    setCurrentIdx(0);
    setTyped('');
    setAnswered(false);
    setCorrect(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(LIVES);
    setCorrectCount(0);
    setGameOver(false);
    setStarted(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const insertChar = (ch: string) => {
    setTyped((t) => t + ch);
    inputRef.current?.focus();
  };

  if (!mounted) return null;

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a14] via-[#0d2a20] to-[#0a1a14] px-6">
        <div className="max-w-md w-full text-center">
          <Link href="/games" className="absolute top-6 left-6 text-white/60 hover:text-white text-sm flex items-center gap-1 min-h-[44px] min-w-[44px]">
            <ArrowLeft className="h-4 w-4" /> Games
          </Link>
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="mb-3 flex justify-center">
            <Kuttan mood="excited" size="md" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-4 inline-block rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
          >
            &ldquo;Type cheyyu machaa — umlauts okke pedikkaanda!&rdquo;
          </motion.div>
          <h1 className="mb-2 text-4xl font-extrabold text-white">Tipp es!</h1>
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-emerald-400">Type it! — A1 Schreiben trainer</p>
          <button
            onClick={begin}
            className="w-full min-h-[52px] rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 py-4 text-lg font-bold text-[#0a1a14] shadow-xl shadow-emerald-500/30 transition-transform hover:scale-[1.02] active:scale-[0.96]"
          >
            Los geht&rsquo;s!
          </button>
          <p className="mt-4 text-[11px] text-white/40">
            Tip: ä, ö, ü, ß accepted — or type ae, oe, ue, ss instead.
          </p>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const pct = rounds.length > 0 ? (correctCount / rounds.length) * 100 : 0;
    const stars = correctCount >= 8 ? 3 : correctCount >= 5 ? 2 : correctCount >= 3 ? 1 : 0;
    const endMood: 'excited' | 'happy' | 'thinking' = pct >= 80 ? 'excited' : pct >= 50 ? 'happy' : 'thinking';
    const endMsg = pct >= 80 ? 'ADIPOLI machaa! Typing-il nee full pro aanu!'
      : pct >= 50 ? 'Kollaam! Keep tippen — improvements verunnu!'
      : 'Paravaala da — oru round koodi try cheyyu!';
    const earnedXp = Math.round(score / 10);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a14] via-[#0d2a20] to-[#0a1a14] px-6">
        <Confetti isActive={pct >= 50} duration={2500} />
        <div className="max-w-md w-full text-center">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.45 }} className="mb-3 flex justify-center">
            <Kuttan mood={endMood === 'excited' ? 'celebrating' : endMood} size="md" />
          </motion.div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: 'spring', bounce: 0.45 }} className="mb-2 text-5xl">
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '👍' : '⌨️'}
          </motion.div>
          <h2 className="mb-1 text-3xl font-extrabold text-white">
            {stars === 3 ? 'Perfekt geschrieben!' : stars >= 2 ? 'Sehr gut!' : stars === 1 ? 'Weiter tippen!' : 'Noch einmal!'}
          </h2>
          <p className="mb-2 text-sm text-white/60">{correctCount} / {rounds.length} correct</p>
          <p className="mb-5 text-xs italic text-emerald-300">{endMsg}</p>
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, type: 'spring', bounce: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4a520]/40 bg-[#d4a520]/10 px-4 py-2 text-sm font-bold text-[#d4a520]"
          >
            <Zap className="h-4 w-4" /> +{earnedXp} XP
          </motion.div>
          <div className="mb-8 grid grid-cols-3 gap-3">
            <Stat label="Score" value={score} accent="#10b981" />
            <Stat label="Max combo" value={maxCombo} accent="#d4a520" />
            <Stat label="XP" value={`+${earnedXp}`} accent="#8b5cf6" />
          </div>
          <div className="flex gap-3">
            <button onClick={begin} className="flex-1 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 py-3 text-sm font-bold text-[#0a1a14] transition-transform hover:scale-[1.02] active:scale-[0.96]">
              <RefreshCw className="h-4 w-4" /> Play again
            </button>
            <Link href="/games" className="flex-1 flex min-h-[48px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.96]">
              Back to games
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a14] via-[#0d2a20] to-[#0a1a14] px-5 py-6">
      <Confetti isActive={answered && correct} duration={900} />
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/games" className="text-white/60 hover:text-white min-h-[44px] min-w-[44px] flex items-center">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: LIVES }).map((_, i) => (
                <Heart key={i} className={`h-4 w-4 ${i < lives ? 'fill-red-500 text-red-500' : 'text-white/20'}`} />
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5">
              <Trophy className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">{score}</span>
            </div>
          </div>
        </div>

        <div className="mb-5 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#d4a520]" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>

        {combo > 1 && (
          <div className="mb-3 flex items-center justify-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5 rounded-full border border-[#d4a520]/40 bg-[#d4a520]/10 px-3 py-1 text-xs font-bold text-[#d4a520]">
              <Zap className="h-3.5 w-3.5" />
              {combo}× combo
            </motion.div>
          </div>
        )}

        {/* Scene */}
        <div className="mb-4 flex flex-col items-center">
          <div className="text-6xl">{round.emoji}</div>
          <div className="mt-1 max-w-[300px] text-center text-sm text-white/70">{round.context}</div>
        </div>

        {/* Input */}
        <motion.div
          className="relative mb-3"
          animate={answered && !correct ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <input
            ref={inputRef}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submitAnswer(); }}
            disabled={answered}
            placeholder="type in German…"
            autoFocus
            autoCapitalize="sentences"
            className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-4 text-center text-xl font-semibold text-white placeholder:text-white/30 focus:outline-none ${
              answered && correct ? 'border-emerald-400 bg-emerald-400/10' :
              answered && !correct ? 'border-red-500 bg-red-500/10' :
              'border-white/15 focus:border-emerald-400/50'
            }`}
          />
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono ${timeLeft <= 5 ? 'text-red-400' : 'text-white/40'}`}>
            {timeLeft}s
          </div>
        </motion.div>

        {/* Umlaut helper buttons */}
        {!answered && (
          <div className="mb-3 flex items-center justify-center gap-2">
            {['\u00E4', '\u00F6', '\u00FC', '\u00DF'].map((ch) => (
              <button
                key={ch}
                onClick={() => insertChar(ch)}
                className="min-h-[44px] min-w-[44px] rounded-lg border border-white/10 bg-white/5 text-base font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.96]"
              >
                {ch}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => submitAnswer()}
          disabled={answered || !typed.trim()}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 py-3 text-sm font-bold text-[#0a1a14] transition-transform hover:scale-[1.01] active:scale-[0.96] disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> Submit
        </button>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 rounded-2xl border p-4 text-center ${correct ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-red-500/30 bg-red-500/10'}`}
            >
              {correct ? (
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-400">
                  <Check className="h-4 w-4" /> Perfekt!
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-red-400">
                    <X className="h-4 w-4" /> {timeLeft === 0 ? 'Time out!' : 'Not quite.'}
                  </div>
                  <div className="mt-2 text-xs text-white/60">The answer was</div>
                  <div className="mt-0.5 text-lg font-bold text-white">{round.target}</div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
