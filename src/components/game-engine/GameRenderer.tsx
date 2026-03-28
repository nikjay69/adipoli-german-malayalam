'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { KuttanImage } from '@/components/character/KuttanImage';
import type { KuttanMoodImage } from '@/components/character/KuttanImage';
import { GameButton } from '@/components/game';
import { Confetti } from '@/components/game';
import { ComboMeter } from '@/components/game/ComboMeter';
import { SwipeCards, WordScramble, WordBank, FallingWords, BubblePop, ArticleSort, MemoryFlip, QuizShow, SpeedRound } from '@/components/exercise-games';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import { feedbackCombo, feedbackComboBreak, feedbackWrong, feedbackCelebration } from '@/lib/feedback';
import type { GameMoment, GameChoice } from '@/lib/game-engine/types';
import { VocabDiscoveryGame } from './VocabDiscoveryGame';

interface GameRendererProps {
  moments: GameMoment[];
  onComplete: (score: number, total: number, maxCombo: number) => void;
  onExit: () => void;
}

/**
 * The Game Renderer — visual novel style lesson player.
 * Every screen is either a brief scene moment or an interactive game.
 * No passive reading. No "Next" buttons on content screens.
 */
export function GameRenderer({ moments, onComplete, onExit }: GameRendererProps) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [choiceResult, setChoiceResult] = useState<{ correct: boolean; response: string; mood: string } | null>(null);

  const m = moments[idx];
  const progress = ((idx + 1) / moments.length) * 100;

  const advance = useCallback(() => {
    setChoiceResult(null);
    if (idx >= moments.length - 1) {
      onComplete(score, total, maxCombo);
    } else {
      setIdx(p => p + 1);
    }
  }, [idx, moments.length, score, total, maxCombo, onComplete]);

  const handleCorrect = useCallback(() => {
    setTotal(p => p + 1);
    const c = combo + 1;
    setCombo(c);
    setMaxCombo(p => Math.max(p, c));
    setScore(p => p + 1);
    feedbackCombo(c);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 800);
    setTimeout(advance, 1000);
  }, [combo, advance]);

  const handleWrong = useCallback(() => {
    setTotal(p => p + 1);
    if (combo > 2) feedbackComboBreak(); else feedbackWrong();
    setCombo(0);
    setTimeout(advance, 1500);
  }, [combo, advance]);

  const handleGameResult = useCallback((correct: boolean) => {
    if (correct) handleCorrect(); else handleWrong();
  }, [handleCorrect, handleWrong]);

  const handleChoice = useCallback((choice: GameChoice) => {
    setTotal(p => p + 1);
    if (choice.isCorrect) {
      setScore(p => p + 1);
      const c = combo + 1;
      setCombo(c);
      setMaxCombo(p => Math.max(p, c));
      feedbackCombo(c);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 800);
    } else {
      if (combo > 2) feedbackComboBreak(); else feedbackWrong();
      setCombo(0);
    }
    setChoiceResult({ correct: choice.isCorrect, response: choice.response, mood: choice.kuttanMood });
    setTimeout(advance, 1800);
  }, [combo, advance]);

  // Auto-advance for reaction moments
  useEffect(() => {
    if (m?.type === 'reaction' && m.autoAdvanceMs) {
      const t = setTimeout(advance, m.autoAdvanceMs);
      return () => clearTimeout(t);
    }
  }, [idx, m, advance]);

  // Auto-advance for scene moments (tap anywhere)
  useEffect(() => {
    if (m?.type === 'scene' && m.autoAdvanceMs) {
      const t = setTimeout(advance, m.autoAdvanceMs);
      return () => clearTimeout(t);
    }
  }, [idx, m, advance]);

  // Auto-speak vocab
  useEffect(() => {
    if (m?.type === 'word-discover' && m.vocab) {
      setTimeout(() => { try { speakGerman(m.vocab!.german, 0.85); } catch {} }, 500);
    }
  }, [idx, m]);

  if (!m) return null;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0d1a0d] overflow-hidden">
      <Confetti isActive={confetti} duration={800} />

      {/* Scene background — full screen */}
      {m.sceneImage && (
        <div className="absolute inset-0">
          <img src={m.sceneImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>
      )}

      {/* Top bar — minimal, over the scene */}
      <div className="relative z-20 px-4 pt-3 pb-1 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onExit}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <X className="w-4 h-4 text-white/70" />
        </motion.button>
        <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-[#d4a520] to-[#27ae60] rounded-full"
            animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
        {combo > 1 && (
          <motion.span initial={{ scale: 1.5 }} animate={{ scale: 1 }}
            className="text-xs font-black text-[#d4a520]">{combo}x🔥</motion.span>
        )}
      </div>

      {/* Main content area — bottom half */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="px-4 pb-6"
          >
            {/* ═══ SCENE — brief moment, auto-advances or tap ═══ */}
            {m.type === 'scene' && (
              <div className="flex items-end gap-3 cursor-pointer" onClick={advance}>
                <KuttanImage mood={m.kuttan?.mood || 'waving'} size="md" animate={true} grounded enterFrom="left" />
                <div className="bg-black/50 backdrop-blur-md rounded-2xl rounded-bl-sm px-4 py-3 flex-1 max-w-[250px]">
                  <p className="text-xs text-white/40 mb-0.5">{m.dialogue?.speaker}</p>
                  <p className="text-sm text-white font-medium">{m.dialogue?.text}</p>
                </div>
              </div>
            )}

            {/* ═══ REACTION — auto-advances ═══ */}
            {m.type === 'reaction' && (
              <div className="flex items-end gap-3">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.4 }}>
                  <KuttanImage mood={m.kuttan?.mood || 'happy'} size="sm" animate={true} grounded />
                </motion.div>
                <div className="bg-black/40 backdrop-blur-md rounded-2xl rounded-bl-sm px-3 py-2">
                  <p className="text-sm text-[#d4a520] font-bold">{m.dialogue?.text}</p>
                </div>
              </div>
            )}

            {/* ═══ WORD DISCOVER — learn through interaction, not reading ═══ */}
            {m.type === 'word-discover' && m.vocab && (
              <VocabDiscoveryGame vocab={m.vocab} onComplete={advance} onCorrect={handleCorrect} onWrong={handleWrong} />
            )}

            {/* ═══ DIALOGUE — choices (the game IS the learning) ═══ */}
            {m.type === 'dialogue' && m.dialogue && (
              <div className="flex flex-col">
                <div className="flex items-end gap-3 mb-3">
                  <KuttanImage mood={choiceResult ? (choiceResult.mood as KuttanMoodImage) : (m.kuttan?.mood || 'thinking')} size="sm" animate={true} grounded />
                  <div className="bg-black/50 backdrop-blur-md rounded-2xl rounded-bl-sm px-4 py-3 flex-1 max-w-[260px]">
                    <p className="text-sm text-white">{choiceResult?.response || m.dialogue.text}</p>
                  </div>
                </div>
                {!choiceResult && m.dialogue.choices && (
                  <div className="space-y-2 ml-14">
                    {m.dialogue.choices.map((choice, i) => (
                      <motion.button key={i}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleChoice(choice)}
                        className="w-full text-left px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white font-medium">
                        {choice.text}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═══ GAME — exercise rendered as game component ═══ */}
            {m.type === 'game' && m.exercise && (
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-4">
                <p className="text-sm text-white font-medium text-center mb-3">
                  {(() => {
                    const q = m.exercise!.question;
                    // Strip long narrative text, keep just the question
                    const cleaned = q.replace(/^.*?[.!][\s]*/,'').trim() || q;
                    if (cleaned.length <= 80) return cleaned;
                    return cleaned.slice(0, cleaned.lastIndexOf(' ', 80)) + '...';
                  })()}
                </p>
                {renderGame(m, handleGameResult)}
              </div>
            )}

            {/* ═══ VICTORY — #40 Enhanced with XP and treasures ═══ */}
            {m.type === 'victory' && (() => {
              const pct = total > 0 ? Math.round((score / total) * 100) : 0;
              const xpEarned = score * 10 + (maxCombo >= 5 ? 25 : 0);
              const vocabCount = moments.filter(mm => mm.type === 'word-discover').length;
              return (
                <div className="flex flex-col items-center text-center">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <KuttanImage mood="celebrating" size="xl" animate={true} grounded />
                  </motion.div>
                  <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="text-2xl font-black text-white mt-4">Level Complete!</motion.p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3 mt-4 w-full max-w-[300px]">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10">
                      <p className="text-lg font-black text-[#d4a520]">{pct}%</p>
                      <p className="text-[9px] text-white/40 uppercase font-bold">Accuracy</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                      className="bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10">
                      <p className="text-lg font-black text-[#27ae60]">+{xpEarned}</p>
                      <p className="text-[9px] text-white/40 uppercase font-bold">XP Earned</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                      className="bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10">
                      <p className="text-lg font-black text-[#a855f7]">{maxCombo}x</p>
                      <p className="text-[9px] text-white/40 uppercase font-bold">Best Combo</p>
                    </motion.div>
                  </div>

                  {/* Treasures (new words) found */}
                  {vocabCount > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                      className="mt-3 flex items-center gap-2 text-xs text-white/40">
                      <span className="text-sm">{'\uD83D\uDC8E'}</span>
                      <span>{vocabCount} new {vocabCount === 1 ? 'word' : 'words'} discovered</span>
                    </motion.div>
                  )}

                  <div className="mt-4 w-full max-w-[280px]">
                    <GameButton onClick={() => onComplete(score, total, maxCombo)} fullWidth variant="primary">
                      Continue Journey
                    </GameButton>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Game component selector ──────────────────────────────────

function renderGame(m: GameMoment, onResult: (correct: boolean) => void) {
  if (!m.exercise) return null;
  const ex = m.exercise;
  const correct = typeof ex.correctAnswer === 'string' ? ex.correctAnswer : ex.correctAnswer[0];

  switch (m.gameType) {
    case 'word-bank':
      return ex.options?.length
        ? <WordBank sentence={ex.question} options={ex.options} correctAnswer={correct} onResult={onResult} />
        : <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
    case 'falling': {
      const d = (ex.options || []).filter(o => o !== correct).slice(0, 3);
      return <FallingWords correctWord={correct} distractors={d.length >= 2 ? d : ['Hallo', 'Danke', 'Bitte']} hint="Catch it!" onResult={onResult} />;
    }
    case 'bubble':
      return Array.isArray(ex.correctAnswer)
        ? <BubblePop leftItems={ex.options || []} rightItems={ex.correctAnswer as string[]} onResult={onResult} />
        : <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
    case 'article-sort': {
      // Extract article from correct answer (e.g. "der Tisch" → article="der", noun="Tisch")
      const match = correct.match(/^(der|die|das)\s+(.+)$/i);
      if (match) {
        return <ArticleSort noun={match[2]} correctArticle={match[1].toLowerCase() as 'der' | 'die' | 'das'} onResult={onResult} />;
      }
      return ex.options?.length
        ? <QuizShow question="" options={ex.options} correctAnswer={correct} onResult={onResult} />
        : <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
    }
    case 'memory-flip': {
      if (Array.isArray(ex.correctAnswer) && ex.options?.length) {
        const pairs: [string, string][] = ex.options.map((opt, i) => [opt, (ex.correctAnswer as string[])[i] || opt]);
        return <MemoryFlip pairs={pairs} onResult={onResult} />;
      }
      return <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
    }
    case 'quiz-show':
      return ex.options?.length
        ? <QuizShow question="" options={ex.options} correctAnswer={correct} onResult={onResult} />
        : <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
    case 'scramble':
      return <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
    case 'swipe':
    default:
      return ex.options?.length
        ? <SwipeCards question="" options={ex.options} correctAnswer={correct} onResult={onResult} />
        : <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
  }
}
