'use client';

import { use, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { GameButton, ChoiceButton, Confetti, Celebration } from '@/components/game';
import { ComboMeter } from '@/components/game/ComboMeter';
import { BossIntro } from '@/components/game/BossIntro';
import { SceneBackground } from '@/components/visual';
import { CharacterGuide } from '@/components/character';
import { useGameStore } from '@/lib/store';
import { useGameEngine } from '@/lib/game/useGameEngine';
import { getBossBattle } from '@/lib/game/boss-battles';
import { startAmbience, stopAmbience } from '@/lib/audio/ambience';
import { feedbackCelebration } from '@/lib/feedback';
import { getRandomMessage } from '@/lib/content/dialogue';
import type { SceneType } from '@/lib/audio/ambience';

export default function BossBattlePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const router = useRouter();
  const { addXP, userProgress } = useGameStore();

  const boss = getBossBattle(parseInt(moduleId));
  const [phase, setPhase] = useState<'intro' | 'battle' | 'victory' | 'defeat'>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'incorrect'>('default');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [kuttanMsg, setKuttanMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(boss?.timeLimit ?? 120);

  const engine = useGameEngine({
    totalRounds: boss?.rounds.length ?? 10,
    comboEnabled: true,
    livesEnabled: true,
    startingLives: 3,
    xpPerCorrect: 10,
    xpBonusCombo: 5,
  });

  // Timer
  useEffect(() => {
    if (phase !== 'battle' || engine.isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPhase('defeat');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, engine.isGameOver]);

  // Start ambience
  useEffect(() => {
    if (boss && phase === 'battle') {
      startAmbience(boss.sceneType as SceneType, 0.2);
    }
    return () => { stopAmbience(500); };
  }, [boss, phase]);

  // Check game over
  useEffect(() => {
    if (engine.isGameOver && phase === 'battle') {
      if (engine.accuracy >= (boss?.passingScore ?? 70)) {
        setPhase('victory');
        addXP(boss?.xpReward ?? 100);
        feedbackCelebration();
      } else {
        setPhase('defeat');
      }
    }
  }, [engine.isGameOver, engine.accuracy, phase, boss, addXP]);

  const handleAnswer = useCallback((answer: string) => {
    if (answerState !== 'default' || !boss) return;
    setSelectedAnswer(answer);

    const exercise = boss.rounds[currentRound];
    const correct = typeof exercise.correctAnswer === 'string'
      ? answer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()
      : exercise.correctAnswer.some(a => answer.toLowerCase().trim() === a.toLowerCase().trim());

    if (correct) {
      setAnswerState('correct');
      engine.recordCorrect();
      setKuttanMsg(getRandomMessage('correct'));
    } else {
      setAnswerState('incorrect');
      engine.recordWrong();
      setKuttanMsg(getRandomMessage('wrong'));
    }

    setTimeout(() => {
      if (currentRound < boss.rounds.length - 1) {
        setCurrentRound(prev => prev + 1);
        engine.nextRound();
      } else {
        engine.endGame();
      }
      setSelectedAnswer(null);
      setAnswerState('default');
      setTypedAnswer('');
    }, 1200);
  }, [answerState, boss, currentRound, engine]);

  if (!boss) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Boss not found</h1>
          <GameButton onClick={() => router.push('/games')}>Back to Games</GameButton>
        </div>
      </div>
    );
  }

  // INTRO
  if (phase === 'intro') {
    return <BossIntro boss={boss} onStart={() => setPhase('battle')} />;
  }

  // VICTORY
  if (phase === 'victory') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Confetti isActive duration={3000} />
        <Celebration
          isVisible
          title="Boss Defeated!"
          subtitle={`${boss.bossName} is vanquished!`}
          xpEarned={boss.xpReward}
          onContinue={() => router.push('/games')}
        />
      </div>
    );
  }

  // DEFEAT
  if (phase === 'defeat') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <p className="text-5xl mb-4">😤</p>
          <h2 className="text-2xl font-bold text-[#c0392b] mb-2">Defeated!</h2>
          <p className="text-sm text-[var(--foreground)]/50 mb-1">
            {engine.accuracy}% accuracy — need {boss.passingScore}% to win
          </p>
          <p className="text-sm text-[var(--foreground)]/50 mb-6">
            {engine.state.totalCorrect}/{boss.rounds.length} correct • Max combo: {engine.state.maxCombo}x
          </p>
          <CharacterGuide
            messages="Paravaala machane! Practice cheythu thirich varuka — next time jeyikkum!"
            mood="sad"
            size="sm"
          />
          <div className="flex gap-2 mt-6">
            <GameButton onClick={() => { engine.reset(); setCurrentRound(0); setTimeLeft(boss.timeLimit); setPhase('intro'); }} variant="primary">
              Try Again
            </GameButton>
            <GameButton onClick={() => router.push('/games')} variant="ghost">
              Back
            </GameButton>
          </div>
        </motion.div>
      </div>
    );
  }

  // BATTLE
  const exercise = boss.rounds[currentRound];
  const bossHealth = 100 - ((currentRound + (answerState === 'correct' ? 1 : 0)) / boss.rounds.length) * 100;

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      <SceneBackground scene={boss.sceneType} opacity={0.15} />
      <Confetti isActive={answerState === 'correct'} duration={800} />

      {/* Boss header */}
      <div className="px-4 pt-4 pb-2 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => router.push('/games')} className="text-[var(--foreground)]/50">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--foreground)]/50">⏱️ {timeLeft}s</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart key={i} className={`w-4 h-4 ${i < engine.state.lives ? 'text-[#e94560] fill-[#e94560]' : 'text-[var(--foreground)]/20'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Boss health bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold">{boss.bossEmoji} {boss.bossName}</span>
            <span className="text-[var(--foreground)]/40">{currentRound + 1}/{boss.rounds.length}</span>
          </div>
          <div className="h-3 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#c0392b] to-[#e94560] rounded-full"
              animate={{ width: `${Math.max(bossHealth, 0)}%` }}
              transition={{ type: 'spring', damping: 15 }}
            />
          </div>
        </div>

        {/* Combo meter */}
        <ComboMeter combo={engine.state.combo} maxCombo={engine.state.maxCombo} />
      </div>

      {/* Battle content */}
      <div className="flex-1 px-4 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRound}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex-1 flex flex-col"
          >
            {/* Kuttan */}
            {kuttanMsg && (
              <div className="flex justify-center mb-3">
                <CharacterGuide
                  messages={kuttanMsg}
                  mood={answerState === 'correct' ? 'celebrating' : answerState === 'incorrect' ? 'sad' : 'thinking'}
                  size="sm"
                />
              </div>
            )}

            {/* Question */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-bold text-center mb-5 leading-snug">
                {exercise.question}
              </h2>

              {/* Type answer exercises */}
              {(exercise.type === 'type-answer' || exercise.type === 'fill-blank') && !exercise.options?.length ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={e => setTypedAnswer(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && typedAnswer.trim()) handleAnswer(typedAnswer); }}
                    placeholder="Type your answer..."
                    disabled={answerState !== 'default'}
                    autoFocus
                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-base bg-[var(--card-bg)] outline-none transition-colors ${
                      answerState === 'correct' ? 'border-[#27ae60] text-[#27ae60]' :
                      answerState === 'incorrect' ? 'border-[#c0392b] text-[#c0392b]' :
                      'border-[var(--card-border)] focus:border-[#d4a520]'
                    }`}
                  />
                  <GameButton
                    onClick={() => handleAnswer(typedAnswer)}
                    disabled={answerState !== 'default' || !typedAnswer.trim()}
                    variant="primary"
                  >
                    Go
                  </GameButton>
                </div>
              ) : (
                /* Multiple choice / fill-blank with options */
                <div className="space-y-2.5">
                  {exercise.options?.map((option, i) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === exercise.correctAnswer || (Array.isArray(exercise.correctAnswer) && exercise.correctAnswer.includes(option));
                    let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                    if (answerState === 'correct' && isCorrect) state = 'correct';
                    else if (answerState === 'incorrect' && isSelected) state = 'incorrect';
                    else if (answerState === 'incorrect' && isCorrect) state = 'correct';
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <ChoiceButton
                          onClick={() => handleAnswer(option)}
                          state={state}
                          disabled={answerState !== 'default'}
                        >
                          {option}
                        </ChoiceButton>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Explanation on wrong */}
              {answerState === 'incorrect' && exercise.explanation && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-[var(--foreground)]/50 text-center mt-3"
                >
                  {exercise.explanation}
                </motion.p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
