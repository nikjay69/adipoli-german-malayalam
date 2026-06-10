'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Heart, Trophy, RefreshCw, Check, X, Zap, Volume2 } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { feedbackCorrect, feedbackWrong, feedbackCelebration } from '@/lib/feedback';

/**
 * Sag es! — Say it!
 *
 * A1 Sprechen trainer. No server cost — uses browser Web Speech API.
 *   - Scene prompt + target German phrase
 *   - Tap the mic, say it, browser transcribes
 *   - Fuzzy match against target (accent-tolerant)
 *   - 10 rounds, 3 lives, combos
 *
 * Pedagogical value:
 *   - Forces ACTUAL production of German audio (not pick/tap recognition)
 *   - Real Sprechen preparation
 *   - Fast — no waiting for server round-trips
 */

interface Round {
  id: string;
  context: string;        // English scene setup
  emoji: string;
  target: string;         // target German phrase
  targetClean: string;    // normalized target for matching
  hint?: string;
}

const ROUNDS_POOL: Round[] = [
  { id: 's1', emoji: '☕', context: 'You walk into a café in the morning. Greet the barista.', target: 'Guten Morgen!', targetClean: 'guten morgen' },
  { id: 's2', emoji: '👋', context: 'A classmate at Goethe Kochi says hi. Respond informally.', target: 'Hallo, wie geht\u2019s?', targetClean: 'hallo wie gehts' },
  { id: 's3', emoji: '🆔', context: 'The officer asks your name formally. Answer.', target: 'Ich hei\u00DFe Kuttan.', targetClean: 'ich heisse kuttan' },
  { id: 's4', emoji: '🌍', context: 'Where are you from? Say it simply.', target: 'Ich komme aus Kerala.', targetClean: 'ich komme aus kerala' },
  { id: 's5', emoji: '🙏', context: 'Someone helps you carry a bag. Thank them.', target: 'Vielen Dank!', targetClean: 'vielen dank' },
  { id: 's6', emoji: '☕', context: 'Order a coffee, politely.', target: 'Einen Kaffee, bitte.', targetClean: 'einen kaffee bitte' },
  { id: 's7', emoji: '🤝', context: 'Someone introduced themselves. Say \u201Cnice to meet you\u201D.', target: 'Freut mich!', targetClean: 'freut mich' },
  { id: 's8', emoji: '😅', context: 'You bumped into someone. Apologize briefly.', target: 'Entschuldigung!', targetClean: 'entschuldigung' },
  { id: 's9', emoji: '👋', context: 'Leaving a formal meeting. Say goodbye the proper way.', target: 'Auf Wiedersehen!', targetClean: 'auf wiedersehen' },
  { id: 's10', emoji: '💸', context: 'You want to know the price.', target: 'Was kostet das?', targetClean: 'was kostet das' },
  { id: 's11', emoji: '❓', context: 'Ask politely where the train station is.', target: 'Wo ist der Bahnhof?', targetClean: 'wo ist der bahnhof' },
  { id: 's12', emoji: '🎓', context: 'Say you are learning German.', target: 'Ich lerne Deutsch.', targetClean: 'ich lerne deutsch' },
];

const STARTING_LIVES = 3;
const ROUND_COUNT = 10;
const BASE_POINTS = 60;
const PARTIAL_POINTS = 25;
const COMBO_BONUS = 20;

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function cleanTranscript(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\.,!?;:]/g, '')
    .replace(/\u00DF/g, 'ss')
    .replace(/\u00E4/g, 'ae')
    .replace(/\u00F6/g, 'oe')
    .replace(/\u00FC/g, 'ue')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(a: string, b: string): number {
  // Levenshtein-based similarity, 0..1
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const distance = dp[m][n];
  return 1 - distance / Math.max(m, n);
}

type RoundState = 'ready' | 'listening' | 'scored';
type MatchResult = 'perfect' | 'close' | 'miss';

function hasSpeechRecognition(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition
    || !!(window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
}

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

export default function SagEsGame() {
  const { addXP } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [hasASR, setHasASR] = useState(false);
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [state, setState] = useState<RoundState>('ready');
  const [transcript, setTranscript] = useState<string>('');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setMounted(true);
    setHasASR(hasSpeechRecognition());
  }, []);

  const begin = () => {
    setRounds(shuffle(ROUNDS_POOL).slice(0, ROUND_COUNT));
    setCurrentIdx(0);
    setState('ready');
    setTranscript('');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(STARTING_LIVES);
    setCorrectCount(0);
    setGameOver(false);
    setMatchResult(null);
    setStarted(true);
  };

  const stopRec = useCallback(() => {
    const r = recognitionRef.current;
    if (r) {
      try { r.stop(); } catch { /* noop */ }
      r.onresult = null;
      r.onerror = null;
      r.onend = null;
      recognitionRef.current = null;
    }
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
    setState('ready');
    setTranscript('');
    setMatchResult(null);
  }, [currentIdx, rounds.length, lives, score, addXP]);

  const scoreAttempt = useCallback((said: string) => {
    const round = rounds[currentIdx];
    if (!round) return;

    const clean = cleanTranscript(said);
    const sim = similarity(clean, round.targetClean);

    let result: MatchResult;
    if (sim >= 0.85) result = 'perfect';
    else if (sim >= 0.6) result = 'close';
    else result = 'miss';

    setMatchResult(result);
    setState('scored');

    if (result === 'perfect') {
      const newCombo = combo + 1;
      const pts = BASE_POINTS + (newCombo - 1) * COMBO_BONUS;
      setScore((s) => s + pts);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);
      feedbackCorrect();
    } else if (result === 'close') {
      setScore((s) => s + PARTIAL_POINTS);
      setCombo(0);
    } else {
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      feedbackWrong();
    }
    window.setTimeout(advanceOrEnd, 1700);
  }, [rounds, currentIdx, combo, advanceOrEnd]);

  const startListening = useCallback(() => {
    if (!hasASR) {
      // Fallback: show a "tap when said" button path — but for now just show unsupported
      return;
    }
    const Ctor = (window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    });
    const SR = Ctor.SpeechRecognition || Ctor.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = 'de-DE';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 3;

    rec.onresult = (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
      const first = e.results[0];
      const best = first && first[0] ? first[0].transcript : '';
      setTranscript(best);
      scoreAttempt(best);
    };
    rec.onerror = () => {
      setTranscript('');
      setState('ready');
    };
    rec.onend = () => {
      setState((s) => (s === 'listening' ? 'ready' : s));
    };

    recognitionRef.current = rec;
    setState('listening');
    setTranscript('');
    setMatchResult(null);
    try { rec.start(); } catch { /* already started */ }
  }, [hasASR, scoreAttempt]);

  // Cleanup on unmount
  useEffect(() => () => stopRec(), [stopRec]);

  if (!mounted) return null;

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0d1a] via-[#2a1a2a] to-[#1a0d1a] px-6">
        <div className="max-w-md w-full text-center">
          <Link href="/games" className="absolute top-6 left-6 text-white/60 hover:text-white text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Games
          </Link>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="mb-6 text-7xl">
            🎙️
          </motion.div>
          <h1 className="mb-2 text-4xl font-extrabold text-white">Sag es!</h1>
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-pink-400">Say it! — A1 Sprechen trainer</p>
          {!hasASR && (
            <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs text-amber-300">
              Your browser doesn&rsquo;t support speech recognition. Try Chrome / Edge / Safari.
            </div>
          )}
          <button
            onClick={begin}
            disabled={!hasASR}
            className="w-full rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 py-4 text-lg font-bold text-white shadow-xl shadow-pink-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0d1a] via-[#2a1a2a] to-[#1a0d1a] px-6">
        <div className="max-w-md w-full text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.45 }} className="mb-4 text-7xl">
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '👍' : '🎙️'}
          </motion.div>
          <h2 className="mb-1 text-3xl font-extrabold text-white">
            {stars === 3 ? 'Ausgezeichnet!' : stars >= 2 ? 'Sehr gut!' : stars === 1 ? 'Weiter sprechen!' : 'Noch einmal!'}
          </h2>
          <p className="mb-6 text-sm text-white/60">{correctCount} / {rounds.length} perfect</p>
          <div className="mb-8 grid grid-cols-3 gap-3">
            <Stat label="Score" value={score} accent="#ec4899" />
            <Stat label="Max combo" value={maxCombo} accent="#27ae60" />
            <Stat label="XP" value={`+${Math.round(score / 10)}`} accent="#8b5cf6" />
          </div>
          <div className="flex gap-3">
            <button onClick={begin} className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 py-3 text-sm font-bold text-white hover:scale-[1.02] transition-transform">
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
  const progress = ((currentIdx + (state === 'scored' ? 1 : 0)) / rounds.length) * 100;

  const playTarget = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(round.target);
    u.lang = 'de-DE';
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0d1a] via-[#2a1a2a] to-[#1a0d1a] px-5 py-6">
      <div className="mx-auto max-w-md">
        {/* HUD */}
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
            <div className="flex items-center gap-1 rounded-full bg-pink-500/20 px-2.5 py-0.5">
              <Trophy className="h-3.5 w-3.5 text-pink-400" />
              <span className="text-xs font-bold text-pink-400">{score}</span>
            </div>
          </div>
        </div>

        <div className="mb-5 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>

        {combo > 1 && (
          <div className="mb-3 flex items-center justify-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              {combo}× combo
            </motion.div>
          </div>
        )}

        {/* Scene emoji + tiny context */}
        <div className="mb-3 flex flex-col items-center">
          <div className="text-6xl">{round.emoji}</div>
          <div className="mt-1 max-w-[280px] text-center text-[13px] text-white/60">{round.context}</div>
        </div>

        {/* Target phrase — dominant */}
        <div className="mb-6 flex flex-col items-center">
          <div className="text-center text-3xl font-extrabold leading-tight text-white">
            {round.target}
          </div>
          <button onClick={playTarget} className="mt-2 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 hover:bg-white/10">
            <Volume2 className="h-3 w-3" /> Hear it
          </button>
        </div>

        {/* Big mic button */}
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={state === 'listening' ? stopRec : startListening}
            disabled={state === 'scored'}
            className={`relative flex h-28 w-28 items-center justify-center rounded-full shadow-2xl transition-colors ${
              state === 'listening'
                ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/50'
                : matchResult === 'perfect'
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/40'
                : matchResult === 'close'
                ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/40'
                : matchResult === 'miss'
                ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/40'
                : 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-500/40'
            }`}
            aria-label="Press to speak"
          >
            {state === 'listening' ? <MicOff className="h-12 w-12 text-white" /> : matchResult === 'perfect' ? <Check className="h-12 w-12 text-white" /> : matchResult === 'miss' ? <X className="h-12 w-12 text-white" /> : <Mic className="h-12 w-12 text-white" />}
            {state === 'listening' && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-red-300/60"
                animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>
          <div className="mt-3 min-h-[20px] text-center text-xs text-white/50">
            {state === 'listening' ? 'Listening…' : state === 'ready' ? 'Tap, then speak.' : ''}
          </div>
        </div>

        {/* Result reveal */}
        <AnimatePresence>
          {state === 'scored' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
            >
              {matchResult === 'perfect' && <div className="text-sm font-bold text-emerald-400">Perfekt! Exactly right.</div>}
              {matchResult === 'close' && <div className="text-sm font-bold text-amber-400">Close! Try it once more.</div>}
              {matchResult === 'miss' && <div className="text-sm font-bold text-red-400">Not quite — keep practicing.</div>}
              {transcript && (
                <div className="mt-1 text-xs text-white/50">
                  You said: <span className="italic">&ldquo;{transcript}&rdquo;</span>
                </div>
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
