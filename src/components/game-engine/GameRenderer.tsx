'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BookOpen, Headphones, RotateCcw, Volume2, X } from 'lucide-react';
import { PeerImage } from '@/components/character/PeerImage';
import type { NivinMoodImage } from '@/components/character/NivinImage';
import { BubblePop, FreeTextInput, QuizShow, WordBank } from '@/components/exercise-games';
import { Confetti, GameButton } from '@/components/game';
import { SpeakButton } from '@/components/speaking';
import { RichContentRenderer } from '@/components/learn/RichContentRenderer';
import { playAudio } from '@/lib/audio';
import { matchesAnswer, primaryAnswer } from '@/lib/answer-match';
import { feedbackCombo, feedbackComboBreak, feedbackWrong } from '@/lib/feedback';
import type { Exercise } from '@/lib/content/types';
import type { GameChoice, GameMoment } from '@/lib/game-engine/types';
import { VocabDiscoveryGame } from './VocabDiscoveryGame';

interface GameRendererProps {
  moments: GameMoment[];
  onComplete: (score: number, total: number, maxCombo: number) => void;
  onExit: () => void;
}

/**
 * The spine lesson renderer. It preserves the author-written order and keeps
 * production exercises as production: learners type dictation, write answers,
 * and speak aloud instead of receiving an unrelated arcade reskin.
 */
export function GameRenderer({ moments, onComplete, onExit }: GameRendererProps) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [repairCount, setRepairCount] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [attemptKey, setAttemptKey] = useState(0);
  const [gameResult, setGameResult] = useState<'wrong' | null>(null);
  const [choiceResult, setChoiceResult] = useState<{ correct: boolean; response: string; mood: string } | null>(null);
  const countedMoments = useRef(new Set<string>());
  const masteredMoments = useRef(new Set<string>());

  const moment = moments[idx];
  const progress = moments.length > 0 ? ((idx + 1) / moments.length) * 100 : 0;

  const resetMomentState = useCallback(() => {
    setChoiceResult(null);
    setGameResult(null);
    setAttemptKey((value) => value + 1);
  }, []);

  const advance = useCallback(() => {
    resetMomentState();
    if (idx >= moments.length - 1) {
      onComplete(score, total, maxCombo);
    } else {
      setIdx((value) => value + 1);
    }
  }, [idx, maxCombo, moments.length, onComplete, resetMomentState, score, total]);

  const countMomentOnce = useCallback(() => {
    if (!moment || countedMoments.current.has(moment.id)) return;
    countedMoments.current.add(moment.id);
    setTotal((value) => value + 1);
  }, [moment]);

  const handleCorrect = useCallback(() => {
    if (!moment) return;
    countMomentOnce();
    if (!masteredMoments.current.has(moment.id)) {
      masteredMoments.current.add(moment.id);
      setScore((value) => value + 1);
    }
    const nextCombo = combo + 1;
    setCombo(nextCombo);
    setMaxCombo((value) => Math.max(value, nextCombo));
    feedbackCombo(nextCombo);
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 700);
    window.setTimeout(advance, 900);
  }, [advance, combo, countMomentOnce, moment]);

  const handleWrong = useCallback(() => {
    countMomentOnce();
    if (combo > 2) feedbackComboBreak();
    else feedbackWrong();
    setCombo(0);
    setRepairCount((value) => value + 1);
    setGameResult('wrong');
  }, [combo, countMomentOnce]);

  const handleGameResult = useCallback((correct: boolean) => {
    if (correct) handleCorrect();
    else handleWrong();
  }, [handleCorrect, handleWrong]);

  const handleChoice = useCallback((choice: GameChoice) => {
    if (!moment) return;
    countMomentOnce();
    if (choice.isCorrect) {
      if (!masteredMoments.current.has(moment.id)) {
        masteredMoments.current.add(moment.id);
        setScore((value) => value + 1);
      }
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((value) => Math.max(value, nextCombo));
      feedbackCombo(nextCombo);
      setConfetti(true);
      window.setTimeout(() => setConfetti(false), 700);
      setChoiceResult({ correct: true, response: choice.response, mood: choice.peerMood });
      window.setTimeout(advance, 1100);
      return;
    }

    if (combo > 2) feedbackComboBreak();
    else feedbackWrong();
    setCombo(0);
    setRepairCount((value) => value + 1);
    setChoiceResult({ correct: false, response: choice.response, mood: choice.peerMood });
  }, [advance, combo, countMomentOnce, moment]);

  useEffect(() => {
    if (moment?.type !== 'reaction' || !moment.autoAdvanceMs) return;
    const timer = window.setTimeout(advance, moment.autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [advance, moment]);

  if (!moment) return null;

  const sceneLabel = moment.dialogue?.speaker || 'Adipoli German';

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#0d1a0d]">
      <Confetti isActive={confetti} duration={700} />

      {moment.sceneImage && (
        <div className="absolute inset-0">
          <img
            src={moment.sceneImage}
            alt=""
            onError={(event) => {
              const image = event.currentTarget;
              if (!image.dataset.fellBack) {
                image.dataset.fellBack = '1';
                image.src = '/images/university_library.png';
              }
            }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071107] via-black/55 to-black/30" />
        </div>
      )}

      {moment.type === 'victory' && (
        <div className="absolute inset-0">
          <video
            src="/videos/scenes/celebration-lights.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />
        </div>
      )}

      <header className="relative z-20 flex items-center gap-3 px-4 pb-2 pt-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onExit}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 backdrop-blur-md"
          aria-label="Leave lesson"
        >
          <X className="h-4 w-4 text-white/75" />
        </motion.button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#d4a520] to-[#27ae60]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="min-w-10 text-right text-[11px] font-bold text-white/55">
          {idx + 1}/{moments.length}
        </span>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col justify-end overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.section
            key={moment.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.24 }}
            className="px-4 pb-6 pt-12"
          >
            {moment.type === 'scene' && (
              <div className="mx-auto max-w-md rounded-[1.75rem] border border-white/15 bg-black/55 p-5 shadow-2xl backdrop-blur-xl">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d4a520]">{sceneLabel}</p>
                <h1 className="mt-2 text-2xl font-black leading-tight text-white">{moment.dialogue?.text}</h1>
                <GameButton onClick={advance} fullWidth variant="primary">
                  Enter the scene <ArrowRight className="h-4 w-4" />
                </GameButton>
              </div>
            )}

            {moment.type === 'reaction' && (
              <div className="mx-auto flex max-w-md items-end gap-3">
                <PeerImage peer={moment.peer?.id ?? 'nivin'} mood={moment.peer?.mood || 'happy'} size="sm" animate />
                <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl">
                  <p className="text-sm font-bold text-[#d4a520]">{moment.dialogue?.text}</p>
                </div>
              </div>
            )}

            {moment.type === 'word-discover' && moment.vocabList && moment.vocabList.length > 0 && (
              <VocabDiscoveryGame
                vocabList={moment.vocabList}
                sceneHint={moment.dialogue?.text}
                onComplete={(vocabScore, vocabTotal) => {
                  setScore((value) => value + vocabScore);
                  setTotal((value) => value + vocabTotal);
                  setMaxCombo((value) => Math.max(value, vocabScore));
                  advance();
                }}
              />
            )}

            {moment.type === 'teach' && moment.video && (
              <div className="mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0c180c]/92 shadow-2xl backdrop-blur-xl">
                <div className="border-b border-white/10 bg-gradient-to-br from-[#d4a520]/18 to-transparent p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4a520]/15">
                      <BookOpen className="h-5 w-5 text-[#e8c85c]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d4a520]">Learn the pattern</p>
                      <h2 className="mt-0.5 text-xl font-black leading-tight text-white">{moment.video.title}</h2>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-white/68">{moment.video.description}</p>
                </div>

                <div className="max-h-[48vh] space-y-4 overflow-y-auto p-5">
                  {moment.video.learningObjectives.length > 0 && (
                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/40">After this, you can</p>
                      <ul className="space-y-2">
                        {moment.video.learningObjectives.slice(0, 3).map((objective) => (
                          <li key={objective} className="flex gap-2 text-sm font-semibold leading-snug text-white/75">
                            <span className="mt-0.5 text-[#7ee2a8]">✓</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {moment.video.richContent && moment.video.richContent.length > 0 ? (
                    <RichContentRenderer elements={moment.video.richContent} />
                  ) : moment.video.scriptOutline.length > 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#e8c85c]">Key ideas</p>
                      <ul className="space-y-2">
                        {moment.video.scriptOutline.slice(0, 5).map((idea) => (
                          <li key={idea} className="text-sm leading-relaxed text-white/68">• {idea}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-white/10 p-4">
                  <GameButton onClick={advance} fullWidth variant="primary">
                    Use it in the scene <ArrowRight className="h-4 w-4" />
                  </GameButton>
                </div>
              </div>
            )}

            {moment.type === 'dialogue' && moment.dialogue && (
              <div className="mx-auto max-w-md">
                <div className="mb-4 flex items-end gap-3">
                  <PeerImage
                    peer={moment.peer?.id ?? 'nivin'}
                    mood={choiceResult ? choiceResult.mood as NivinMoodImage : moment.peer?.mood || 'thinking'}
                    size="sm"
                    animate
                  />
                  <div className="max-h-40 flex-1 overflow-y-auto rounded-2xl rounded-bl-sm border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
                    <p className="text-sm leading-relaxed text-white">{choiceResult?.response || moment.dialogue.text}</p>
                  </div>
                </div>
                {!choiceResult && moment.dialogue.choices && (
                  <div className="space-y-2 pl-12">
                    {moment.dialogue.choices.map((choice, choiceIndex) => (
                      <motion.button
                        key={`${choice.text}-${choiceIndex}`}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: choiceIndex * 0.08 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice(choice)}
                        className="w-full rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-left text-sm font-semibold leading-snug text-white backdrop-blur-md"
                      >
                        {choice.text}
                      </motion.button>
                    ))}
                  </div>
                )}
                {choiceResult && !choiceResult.correct && (
                  <div className="pl-12">
                    <button
                      onClick={() => {
                        setChoiceResult(null);
                        setAttemptKey((value) => value + 1);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4a520] px-4 py-3 text-sm font-black text-[#182218]"
                    >
                      <RotateCcw className="h-4 w-4" /> Choose again
                    </button>
                  </div>
                )}
              </div>
            )}

            {moment.type === 'game' && moment.exercise && (
              <div className="mx-auto max-w-md rounded-[1.75rem] border border-white/12 bg-[#0c180c]/88 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#d4a520]/25 bg-[#d4a520]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#e8c85c]">
                    {exerciseLabel(moment.exercise)}
                  </span>
                  {combo > 1 && <span className="text-xs font-black text-[#d4a520]">{combo}x</span>}
                </div>
                <h2 className="mb-5 text-center text-lg font-black leading-snug text-white">
                  {moment.exercise.question}
                </h2>

                {gameResult === 'wrong' ? (
                  <RepairPanel
                    exercise={moment.exercise}
                    onRetry={() => {
                      setGameResult(null);
                      setAttemptKey((value) => value + 1);
                    }}
                  />
                ) : (
                  <div key={`${moment.id}-${attemptKey}`}>
                    <ExerciseInteraction exercise={moment.exercise} onResult={handleGameResult} />
                  </div>
                )}
              </div>
            )}

            {moment.type === 'victory' && (() => {
              const mastery = total > 0 ? Math.round((score / total) * 100) : 100;
              const vocabCount = moments.reduce((count, item) => count + (item.vocabList?.length || 0), 0);
              return (
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                  <PeerImage peer={moment.peer?.id ?? 'nivin'} mood="celebrating" size="xl" animate />
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#d4a520]">Ability unlocked</p>
                  <h2 className="mt-1 text-3xl font-black text-white">Lesson proved.</h2>
                  <p className="mt-2 max-w-sm text-sm font-semibold leading-relaxed text-white/70">{moment.dialogue?.text}</p>

                  <div className="mt-5 grid w-full grid-cols-3 gap-2">
                    <ResultStat value={`${mastery}%`} label="Mastery" color="text-[#d4a520]" />
                    <ResultStat value={String(repairCount)} label="Repairs" color="text-[#7ee2a8]" />
                    <ResultStat value={String(vocabCount)} label="Chunks" color="text-[#c4a7ff]" />
                  </div>

                  <div className="mt-5 w-full">
                    <GameButton onClick={() => onComplete(score, total, maxCombo)} fullWidth variant="primary">
                      Continue the course <ArrowRight className="h-4 w-4" />
                    </GameButton>
                  </div>
                </div>
              );
            })()}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}

function exerciseLabel(exercise: Exercise) {
  switch (exercise.type) {
    case 'dictation': return 'Listen · write';
    case 'speaking': return 'Listen · speak';
    case 'free-text': return 'Produce · write';
    case 'type-answer': return 'Recall · type';
    case 'ordering': return 'Build the line';
    case 'matching': return 'Connect meaning';
    case 'fill-blank': return 'Complete the line';
    default: return 'Understand · choose';
  }
}

function RepairPanel({ exercise, onRetry }: { exercise: Exercise; onRetry: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="rounded-2xl border border-[#e9a23b]/30 bg-[#e9a23b]/10 p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f1c36d]">Repair before moving on</p>
        <p className="mt-2 text-base font-black text-white">{primaryAnswer(exercise.correctAnswer)}</p>
        {exercise.explanation && <p className="mt-2 text-sm leading-relaxed text-white/68">{exercise.explanation}</p>}
      </div>
      <button
        onClick={onRetry}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4a520] px-4 py-3 text-sm font-black text-[#182218]"
      >
        <RotateCcw className="h-4 w-4" /> Try the repaired answer
      </button>
    </motion.div>
  );
}

function ExerciseInteraction({ exercise, onResult }: { exercise: Exercise; onResult: (correct: boolean) => void }) {
  const correct = primaryAnswer(exercise.correctAnswer);

  if (exercise.type === 'dictation') {
    return (
      <div className="space-y-4">
        <AudioPrompt audioUrl={exercise.audioUrl} label="Play the sentence" />
        <FreeTextInput answer={exercise.correctAnswer} onResult={onResult} placeholder="Type exactly what you hear" />
      </div>
    );
  }

  if (exercise.type === 'speaking') {
    return (
      <div className="flex flex-col items-center gap-4">
        {exercise.audioUrl && <AudioPrompt audioUrl={exercise.audioUrl} label="Hear the model" />}
        <div className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
          <p className="text-lg font-black text-[#e7c95d]">{correct}</p>
        </div>
        <SpeakButton
          expectedText={correct}
          matchFn={(expected, transcript) => matchesAnswer(transcript, expected)}
          onResult={(_, __, isMatch) => onResult(isMatch)}
          size="lg"
          label="Say the full line"
        />
      </div>
    );
  }

  if (exercise.type === 'free-text' || exercise.type === 'type-answer') {
    return (
      <FreeTextInput
        hint={exercise.questionGerman}
        answer={exercise.correctAnswer}
        onResult={onResult}
        placeholder={exercise.type === 'free-text' ? 'Write your German answer' : 'Type from memory'}
      />
    );
  }

  if (exercise.type === 'ordering') {
    return <OrderingExercise exercise={exercise} onResult={onResult} />;
  }

  if (exercise.type === 'matching' && Array.isArray(exercise.correctAnswer)) {
    return <BubblePop leftItems={exercise.options || []} rightItems={exercise.correctAnswer as string[]} onResult={onResult} />;
  }

  if (exercise.type === 'fill-blank' && exercise.options?.length) {
    return <WordBank sentence={exercise.question} options={exercise.options} correctAnswer={correct} onResult={onResult} />;
  }

  if (exercise.options?.length) {
    return <QuizShow question="" options={exercise.options} correctAnswer={correct} onResult={onResult} />;
  }

  return <FreeTextInput answer={exercise.correctAnswer} onResult={onResult} placeholder="Type your answer" />;
}

function AudioPrompt({ audioUrl, label }: { audioUrl?: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = async () => {
    if (!audioUrl || playing) return;
    setPlaying(true);
    setFailed(false);
    try {
      await playAudio(audioUrl);
    } catch {
      setFailed(true);
    } finally {
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={play}
      disabled={!audioUrl || playing}
      className="mx-auto flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#d4a520]/30 bg-[#d4a520]/10 px-5 py-3 text-sm font-black text-[#efd26d] disabled:opacity-45"
    >
      {playing ? <Headphones className="h-5 w-5 animate-pulse" /> : <Volume2 className="h-5 w-5" />}
      {playing ? 'Listening…' : failed ? 'Model audio is still pending' : label}
    </button>
  );
}

function OrderingExercise({ exercise, onResult }: { exercise: Exercise; onResult: (correct: boolean) => void }) {
  const expected = Array.isArray(exercise.correctAnswer)
    ? [...exercise.correctAnswer]
    : exercise.correctAnswer.split(/\s+/).filter(Boolean);
  const source = exercise.options?.length
    ? exercise.options
    : expected.length > 1
      ? [...expected.slice(1), expected[0]]
      : expected;
  const [selected, setSelected] = useState<number[]>([]);
  const remaining = source.map((text, index) => ({ text, index })).filter((item) => !selected.includes(item.index));
  const built = selected.map((index) => source[index]);

  return (
    <div className="space-y-4">
      <div className="min-h-16 rounded-2xl border border-[#d4a520]/25 bg-[#d4a520]/8 p-3">
        {built.length === 0 ? (
          <p className="py-2 text-center text-sm text-white/40">Tap the parts in order</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {built.map((text, index) => (
              <button
                key={`${text}-${index}`}
                onClick={() => setSelected((items) => items.filter((_, itemIndex) => itemIndex !== index))}
                className="rounded-lg bg-[#d4a520] px-3 py-2 text-sm font-black text-[#182218]"
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {remaining.map((item) => (
          <button
            key={`${item.text}-${item.index}`}
            onClick={() => setSelected((items) => [...items, item.index])}
            className="rounded-lg border border-white/15 bg-white/8 px-3 py-2 text-sm font-bold text-white"
          >
            {item.text}
          </button>
        ))}
      </div>
      <button
        onClick={() => onResult(built.length === expected.length && built.every((item, index) => item === expected[index]))}
        disabled={built.length !== expected.length}
        className="w-full rounded-xl bg-[#d4a520] px-4 py-3 text-sm font-black text-[#182218] disabled:opacity-35"
      >
        Check the order
      </button>
    </div>
  );
}

function ResultStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 p-3 backdrop-blur-md">
      <p className={`text-xl font-black ${color}`}>{value}</p>
      <p className="mt-0.5 text-[9px] font-black uppercase tracking-wider text-white/45">{label}</p>
    </div>
  );
}
