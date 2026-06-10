'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, Heart, Zap, Trophy, RefreshCw, Check, X } from 'lucide-react';
import { ALL_MODULES, getAllVocabulary, type VocabItem } from '@/lib/content/modules';
import { useGameStore } from '@/lib/store';
import { feedbackCorrect, feedbackWrong, feedbackCelebration } from '@/lib/feedback';
import { CharacterGuide } from '@/components/character';

/**
 * Hör und Los! — Listen & Go!
 *
 * A1 Hören prep in game form:
 *   - Play a German vocab audio clip
 *   - Pick the correct meaning from 4 options (1 correct + 3 distractors)
 *   - Speed bonus + combo multiplier
 *   - 10 rounds per game, 3 lives
 *
 * Pedagogical value:
 *   - Forces ear → meaning mapping (the core Hören skill)
 *   - Real audio, not text-visible exercises
 *   - Time pressure mimics real listening (you don't get to re-read in life)
 */

type RoundState = 'ready' | 'playing' | 'answered' | 'timeout';

interface Round {
  target: VocabItem;
  options: VocabItem[]; // 4 options, one is target
}

const ROUND_SECONDS = 7;
const TOTAL_ROUNDS = 10;
const STARTING_LIVES = 3;
const BASE_POINTS = 50;
const TIME_BONUS_MAX = 50;
const COMBO_BONUS = 15;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(pool: VocabItem[], target: VocabItem): Round {
  const distractors = shuffle(pool.filter((v) => v.id !== target.id && v.english !== target.english)).slice(0, 3);
  return {
    target,
    options: shuffle([target, ...distractors]),
  };
}

function audioUrlFor(vocabId: string): string {
  return `/audio/vocab/${vocabId}.mp3`;
}

export default function HorUndLosGame() {
  const { addXP } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [state, setState] = useState<RoundState>('ready');
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const roundStartRef = useRef<number>(0);

  useEffect(() => { setMounted(true); }, []);

  const pool = useMemo(() => {
    if (!mounted) return [] as VocabItem[];
    // Draw from modules 1-5 to keep difficulty A1-friendly for v1
    const modules = ALL_MODULES.slice(0, 5);
    const all: VocabItem[] = [];
    for (const m of modules) for (const l of m.lessons) for (const v of l.vocabulary) all.push(v);
    return all;
  }, [mounted]);

  const buildRounds = useCallback((): Round[] => {
    if (pool.length < 4) return [];
    const picks = shuffle(pool).slice(0, TOTAL_ROUNDS);
    return picks.map((t) => buildRound(pool, t));
  }, [pool]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const playAudio = useCallback((vocabId: string) => {
    try {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(audioUrlFor(vocabId));
      audioRef.current = audio;
      audio.play().catch(() => {});
    } catch {
      // swallow — audio may be missing in dev
    }
  }, []);

  const startGame = () => {
    const rs = buildRounds();
    setRounds(rs);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(STARTING_LIVES);
    setCorrectCount(0);
    setGameOver(false);
    setStarted(true);
  };

  const advanceOrEnd = useCallback(() => {
    setShowCorrect(false);
    const next = currentIdx + 1;
    if (next >= rounds.length || lives <= 0) {
      finishGame();
      return;
    }
    setCurrentIdx(next);
    setState('ready');
    setSelected(null);
  }, [currentIdx, rounds.length, lives]); // eslint-disable-line react-hooks/exhaustive-deps

  const finishGame = useCallback(() => {
    stopTimer();
    setGameOver(true);
    const earned = Math.round(score / 10);
    if (earned > 0) addXP(earned);
    feedbackCelebration();
  }, [stopTimer, score, addXP]);

  // Begin-of-round: play audio + start timer
  useEffect(() => {
    if (!started || gameOver || rounds.length === 0) return;
    if (state !== 'ready') return;

    const round = rounds[currentIdx];
    if (!round) return;

    setTimeLeft(ROUND_SECONDS);
    setState('playing');
    roundStartRef.current = Date.now();

    // Short delay to let UI settle, then play
    const t = window.setTimeout(() => playAudio(round.target.id), 250);

    stopTimer();
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { window.clearTimeout(t); stopTimer(); };
  }, [state, started, currentIdx, rounds, gameOver]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTimeout = () => {
    setState('timeout');
    setShowCorrect(true);
    setCombo(0);
    setLives((l) => Math.max(0, l - 1));
    feedbackWrong();
    setTimeout(() => advanceOrEnd(), 1700);
  };

  const handleSelect = (optionId: string) => {
    if (state !== 'playing') return;
    stopTimer();
    setSelected(optionId);

    const round = rounds[currentIdx];
    const correct = optionId === round.target.id;

    setState('answered');

    if (correct) {
      const timeUsedMs = Date.now() - roundStartRef.current;
      const timeBonus = Math.max(0, Math.round(TIME_BONUS_MAX * (1 - timeUsedMs / (ROUND_SECONDS * 1000))));
      const newCombo = combo + 1;
      const comboBonus = (newCombo - 1) * COMBO_BONUS;
      const pts = BASE_POINTS + timeBonus + comboBonus;
      setScore((s) => s + pts);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);
      feedbackCorrect();
      setTimeout(() => advanceOrEnd(), 900);
    } else {
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      setShowCorrect(true);
      feedbackWrong();
      setTimeout(() => advanceOrEnd(), 1600);
    }
  };

  const replay = () => {
    const round = rounds[currentIdx];
    if (round && state === 'playing') playAudio(round.target.id);
  };

  if (!mounted) return null;

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1a0d] via-[#1b2d1b] to-[#0d1a0d] px-6">
        <div className="max-w-md w-full text-center">
          <Link href="/games" className="absolute top-6 left-6 text-white/60 hover:text-white text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Games
          </Link>
          <div className="mb-4 flex justify-center">
            <CharacterGuide
              messages="Chevi koorippich kelkuka, machaa! German audio play aakum — correct meaning ethrayum fast pick cheyyuka!"
              mood="excited"
              size="md"
            />
          </div>
          <h1 className="mb-2 text-4xl font-extrabold text-white">Hör &amp; Los!</h1>
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#d4a520]">Listen &amp; Go — A1 Hören trainer</p>
          <div className="mb-8 space-y-3 text-left text-sm text-white/70">
            <Rule icon="👂" text="German audio plays. Pick what you heard." />
            <Rule icon="⚡" text="Faster answers = more points. Build combos." />
            <Rule icon="❤️" text="3 lives. 10 rounds. Real Hören prep." />
          </div>
          <button
            onClick={startGame}
            className="w-full rounded-2xl bg-gradient-to-br from-[#d4a520] to-[#b8891a] py-4 text-lg font-bold text-[#0d1a0d] shadow-xl shadow-[#d4a520]/30 hover:scale-[1.02] transition-transform"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1a0d] via-[#1b2d1b] to-[#0d1a0d] px-6">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.45 }}
            className="mb-4 text-7xl"
          >
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '👍' : '🎧'}
          </motion.div>
          <h2 className="mb-1 text-3xl font-extrabold text-white">
            {stars === 3 ? 'Wunderbar!' : stars >= 2 ? 'Sehr gut!' : stars === 1 ? 'Weiter so!' : 'Noch einmal!'}
          </h2>
          <p className="mb-6 text-sm text-white/60">{correctCount} / {rounds.length} correct</p>

          <div className="mb-8 grid grid-cols-3 gap-3">
            <StatBox label="Score" value={score} accent="#d4a520" />
            <StatBox label="Max Combo" value={maxCombo} accent="#27ae60" />
            <StatBox label="XP" value={`+${Math.round(score / 10)}`} accent="#8b5cf6" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#d4a520] to-[#b8891a] py-3 text-sm font-bold text-[#0d1a0d] hover:scale-[1.02] transition-transform"
            >
              <RefreshCw className="h-4 w-4" /> Play again
            </button>
            <Link
              href="/games"
              className="flex-1 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              More games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const round = rounds[currentIdx];
  if (!round) return null;

  const progress = ((currentIdx + (state === 'answered' ? 1 : 0)) / rounds.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1a0d] via-[#1b2d1b] to-[#0d1a0d] px-5 py-6">
      <div className="mx-auto max-w-md">
        {/* Top HUD */}
        <div className="mb-5 flex items-center justify-between">
          <Link href="/games" className="text-white/60 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: STARTING_LIVES }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-4 w-4 ${i < lives ? 'fill-red-500 text-red-500' : 'text-white/20'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[#d4a520]/20 px-2.5 py-0.5">
              <Trophy className="h-3.5 w-3.5 text-[#d4a520]" />
              <span className="text-xs font-bold text-[#d4a520]">{score}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#d4a520] to-[#27ae60]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Combo */}
        {combo > 1 && (
          <div className="mb-3 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 rounded-full border border-[#27ae60]/40 bg-[#27ae60]/10 px-3 py-1 text-xs font-bold text-[#27ae60]"
            >
              <Zap className="h-3.5 w-3.5" />
              {combo}× combo
            </motion.div>
          </div>
        )}

        {/* Round indicator */}
        <div className="mb-2 text-center text-xs uppercase tracking-[0.25em] text-white/40">
          Round {currentIdx + 1} of {rounds.length}
        </div>

        {/* Big play button + timer */}
        <div className="mb-6 flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={replay}
            className="relative mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a520] to-[#b8891a] shadow-2xl shadow-[#d4a520]/40"
            aria-label="Replay audio"
          >
            <Volume2 className="h-12 w-12 text-[#0d1a0d]" />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#d4a520]/50"
              animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </motion.button>
          <div className="text-xs text-white/50">Tap to replay</div>
          <div className={`mt-3 text-xl font-mono font-bold ${timeLeft <= 3 ? 'text-red-400' : 'text-white/70'}`}>
            {timeLeft}s
          </div>
        </div>

        {/* 4 option buttons */}
        <div className="grid grid-cols-2 gap-3">
          {round.options.map((opt) => {
            const isSelected = selected === opt.id;
            const isCorrect = opt.id === round.target.id;
            const showAsRight = state !== 'playing' && isCorrect;
            const showAsWrong = state !== 'playing' && isSelected && !isCorrect;

            return (
              <motion.button
                key={opt.id}
                whileTap={state === 'playing' ? { scale: 0.96 } : {}}
                onClick={() => handleSelect(opt.id)}
                disabled={state !== 'playing'}
                className={`relative rounded-2xl border-2 p-4 text-left transition-colors ${
                  showAsRight
                    ? 'border-[#27ae60] bg-[#27ae60]/15'
                    : showAsWrong
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-sm font-bold text-white">{opt.english}</div>
                {opt.malayalam && (
                  <div className="mt-0.5 text-[11px] text-white/50">{opt.malayalam}</div>
                )}
                {showAsRight && <Check className="absolute right-2 top-2 h-4 w-4 text-[#27ae60]" />}
                {showAsWrong && <X className="absolute right-2 top-2 h-4 w-4 text-red-500" />}
              </motion.button>
            );
          })}
        </div>

        {/* Reveal the German word after answer */}
        <AnimatePresence>
          {showCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <div className="text-xs uppercase tracking-widest text-white/50">You heard</div>
              <div className="mt-1 text-2xl font-extrabold text-[#d4a520]">{round.target.german}</div>
              <div className="text-sm text-white/60">{round.target.english}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Rule({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <span className="text-xl">{icon}</span>
      <span className="text-sm text-white/80">{text}</span>
    </div>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-0.5 text-xl font-extrabold" style={{ color: accent }}>{value}</div>
    </div>
  );
}
