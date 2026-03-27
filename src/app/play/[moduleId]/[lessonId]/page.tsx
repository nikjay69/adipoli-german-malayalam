'use client';

import { use, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Loader2, Bookmark, ChevronLeft } from 'lucide-react';
import { playVocabAudio, playExampleAudio, useGermanTTS } from '@/lib/audio';
import { startAmbience, stopAmbience, duckAmbience, getSceneForModule } from '@/lib/audio/ambience';
import { SpeakButton, PronunciationCompare } from '@/components/speaking';
import { NarrativeIntro, ContextualVocab, DecisionPoint, SceneConclusion } from '@/components/lesson';
import { SceneBackground } from '@/components/visual';
import { GameButton, ChoiceButton, Confetti, Celebration, ModuleComplete } from '@/components/game';
import { CharacterGuide } from '@/components/character';
import { VideoPlayer } from '@/components/media/VideoPlayer';
import { getRandomMessage } from '@/lib/content/dialogue';
import { getVideoScript } from '@/lib/content/video-scripts';
import { createCard } from '@/lib/srs';
import { useGameStore } from '@/lib/store';
import { getLessonById, getModuleById, ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { isLessonUnlocked as checkLessonUnlocked } from '@/lib/curriculum';
import { feedbackCorrect, feedbackWrong, feedbackCelebration, feedbackFlip } from '@/lib/feedback';
import { generateEncounter, type Encounter } from '@/lib/encounters';

// Map modules → relevant games to suggest after vocab learning
const MODULE_GAME_MAP: Record<number, { path: string; name: string; icon: string; description: string } | null> = {
  1: { path: '/games/greeting-time', name: 'Greeting Time', icon: '👋', description: 'Practice the greetings you just learned!' },
  2: { path: '/games/speed-quiz', name: 'Speed Quiz', icon: '⚡', description: 'Quick-fire vocab recall — test your speed!' },
  3: { path: '/games/article-blitz', name: 'Article Blitz', icon: '📝', description: 'der, die, or das? Practice articles!' },
  4: { path: '/games/number-blitz', name: 'Number Blitz', icon: '🔢', description: 'German numbers at the Kochi fish market!' },
  5: { path: '/games/time-attack', name: 'Time Attack', icon: '🕐', description: 'Tell time in German — Wie spät ist es?' },
  6: { path: '/games/food-order', name: 'Food Order', icon: '🍽️', description: 'Order food at a German restaurant!' },
  7: { path: '/games/room-builder', name: 'Room Builder', icon: '🏠', description: 'Furnish your WG room — learn prepositions!' },
  8: { path: '/games/dialogue-dash', name: 'Dialogue Dash', icon: '💬', description: 'Complete real conversations in German!' },
  9: { path: '/games/verb-rush', name: 'Verb Rush', icon: '🏃', description: 'Conjugate verbs under pressure!' },
  10: { path: '/games/sentence-builder', name: 'Sentence Builder', icon: '🧩', description: 'Build correct German sentences!' },
  11: { path: '/games/dialogue-dash', name: 'Dialogue Dash', icon: '💬', description: 'Practice real-world dialogues!' },
  12: { path: '/games/fill-the-gap', name: 'Fill the Gap', icon: '✍️', description: 'Fill in the missing words!' },
  13: { path: '/games/story-builder', name: 'Story Builder', icon: '📖', description: 'Build stories in past tense!' },
  14: { path: '/games/scene-sort', name: 'Scene Sort', icon: '🔗', description: 'Match German words to meanings!' },
  15: { path: '/games/speed-quiz', name: 'Speed Quiz', icon: '⚡', description: 'Test your vocab speed!' },
  16: { path: '/games/sentence-builder', name: 'Sentence Builder', icon: '🧩', description: 'Build complex sentences!' },
  17: { path: '/games/dialogue-dash', name: 'Dialogue Dash', icon: '💬', description: 'Final conversation practice!' },
  18: { path: '/games/speed-quiz', name: 'Speed Quiz', icon: '🏆', description: 'Full vocab speed run!' },
};

type Step =
  | { type: 'intro' }
  | { type: 'scene-intro' }                        // Story: narrative opening
  | { type: 'video'; index: number }
  | { type: 'vocab'; index: number }
  | { type: 'contextual-vocab'; index: number }     // Story: vocab in narrative context
  | { type: 'decision-point'; index: number }        // Story: "what do you say?"
  | { type: 'game-suggest' }
  | { type: 'exercise'; index: number }
  | { type: 'scene-conclusion' }                     // Story: wrap-up + teaser
  | { type: 'complete' };

export default function PlayLesson({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const { addXP, completeLesson, learnVocabulary, addSRSCard, saveCheckpoint, clearCheckpoint, toggleBookmark, userProgress } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [step, setStep] = useState<Step>({ type: 'intro' });
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'incorrect'>('default');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [kuttanMsg, setKuttanMsg] = useState('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showModuleComplete, setShowModuleComplete] = useState(false);
  const [lessonFailed, setLessonFailed] = useState(false);
  // Matching exercise state
  const [matchPairs, setMatchPairs] = useState<Record<number, number>>({}); // left index -> right index
  const [matchSelected, setMatchSelected] = useState<number | null>(null); // selected left index
  const [matchChecked, setMatchChecked] = useState(false);
  // Typing exercise state
  const [typedAnswer, setTypedAnswer] = useState('');
  const [typeAnswerState, setTypeAnswerState] = useState<'default' | 'correct' | 'incorrect'>('default');
  // Speaking exercise state
  const [speakingResult, setSpeakingResult] = useState<{ transcript: string; confidence: number; isMatch: boolean } | null>(null);
  // Vocab teaching: intro (show word) → challenge (mini-encounter to prove recall)
  const [vocabPhase, setVocabPhase] = useState<'intro' | 'challenge'>('intro');
  const [vocabEncounter, setVocabEncounter] = useState<Encounter | null>(null);
  const [vocabSelectedOption, setVocabSelectedOption] = useState<number | null>(null);
  const [vocabAnswerState, setVocabAnswerState] = useState<'default' | 'correct' | 'wrong'>('default');
  const allVocabPool = getAllVocabulary();

  // ── Audio: TTS + Ambient Soundscape ──
  const { speak: speakGerman, stop: stopTTS } = useGermanTTS();

  useEffect(() => { setMounted(true); }, []);

  const module = getModuleById(parseInt(moduleId));
  const lesson = getLessonById(lessonId);

  // Check if lesson is unlocked (computed before hooks to avoid conditional hook calls)
  const isLessonUnlocked = (() => {
    if (!module || !lesson) return true;
    return checkLessonUnlocked(module.id, lesson.id, userProgress.completedLessons);
  })();

  // If locked, redirect (wrapped in effect to avoid calling router during render)
  useEffect(() => {
    if (mounted && !isLessonUnlocked) {
      setIsBlocked(true);
      router.replace('/learn');
    }
  }, [mounted, isLessonUnlocked, router]);

  // Start ambient soundscape based on module context
  useEffect(() => {
    if (mounted && module && userProgress.soundEnabled) {
      const scene = getSceneForModule(module.id);
      startAmbience(scene, 0.3);
    }
    return () => { stopAmbience(800); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, module?.id]);

  // Resume from checkpoint on mount
  useEffect(() => {
    const checkpoint = userProgress.activeLessonCheckpoint;
    if (checkpoint && checkpoint.lessonId === lessonId) {
      setStep({ type: checkpoint.stepType, index: checkpoint.stepIndex });
      setCorrectCount(checkpoint.correctCount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Save checkpoint on step changes
  useEffect(() => {
    if (step.type !== 'intro' && step.type !== 'complete' && step.type !== 'game-suggest' && module && lesson) {
      saveCheckpoint({
        lessonId: lesson.id,
        moduleId: module.id,
        stepType: step.type,
        stepIndex: (step as { type: string; index: number }).index ?? 0,
        correctCount,
        hearts: 3,
        xpEarned: 0,
        vocabLearned: [],
        startedAt: Date.now(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (mounted && step.type === 'intro') {
      setKuttanMsg(getRandomMessage('lesson_start'));
    }
  }, [mounted, step.type]);

  // Auto-play vocab audio when a new vocab card appears
  // Try MP3 first, fall back to TTS. Duck ambience during playback.
  useEffect(() => {
    if (mounted && lesson && (step.type === 'vocab' || step.type === 'contextual-vocab') && shownVocab[step.index]) {
      const vocab = shownVocab[step.index];
      duckAmbience(2000);
      playVocabAudio(vocab.id).catch(() => {
        // MP3 not available — use browser TTS as fallback
        speakGerman(vocab.german);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, step]);

  if (!mounted || isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Helper: highlight German phrases in exercise questions
  // Detects quoted text and common German word patterns
  const highlightGerman = (text: string) => {
    // First try: match quoted phrases (most reliable indicator of German in English questions)
    const quotePattern = /(".*?"|„.*?"|«.*?»)/g;
    const quoteParts = text.split(quotePattern);
    if (quoteParts.length > 1) {
      return (
        <>
          {quoteParts.map((part, i) => {
            if ((part.startsWith('"') && part.endsWith('"')) ||
                (part.startsWith('„') && part.endsWith('"')) ||
                (part.startsWith('«') && part.endsWith('»'))) {
              return (
                <span key={i} className="bg-[#d4a520]/10 text-[#d4a520] font-semibold px-1 rounded">
                  {part}
                </span>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </>
      );
    }
    // Fallback: highlight common German words (case-sensitive to avoid false positives)
    const germanWords = /\b(Ich|Du|Er|Sie|Wir|Ihr|Wie|Was|Wo|Wer|Hallo|Guten|Danke|Bitte|Ja|Nein|Mein|Dein|Haben|Sein|Ist|Sind|Heißt|Heißen|Sprechen|Kommen|Gehe|Morgen|Abend|Tag|Nacht|Tschüss|Entschuldigung|Herr|Frau|Deutsch|Deutschland|Auf Wiedersehen)\b/g;
    const wordParts = text.split(germanWords);
    if (wordParts.length <= 1) return <>{text}</>;
    // Use matchAll to know which parts are German words
    const matches = [...text.matchAll(germanWords)];
    const result: ReactNode[] = [];
    let lastIdx = 0;
    for (const match of matches) {
      const idx = match.index!;
      if (idx > lastIdx) result.push(<span key={`t-${lastIdx}`}>{text.slice(lastIdx, idx)}</span>);
      result.push(
        <span key={`g-${idx}`} className="bg-[#d4a520]/10 text-[#d4a520] px-1 rounded">
          {match[0]}
        </span>
      );
      lastIdx = idx + match[0].length;
    }
    if (lastIdx < text.length) result.push(<span key={`t-${lastIdx}`}>{text.slice(lastIdx)}</span>);
    return <>{result}</>;
  };

  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Lesson not found</h1>
          <GameButton onClick={() => router.push('/')}>Go Home</GameButton>
        </div>
      </div>
    );
  }

  // Auto-generate typing exercises from lesson vocabulary (production practice)
  // Pick up to 3 random vocab words to type — inserted before authored exercises
  const autoTypingExercises: import('@/lib/content/types').Exercise[] = lesson.vocabulary.length > 0
    ? lesson.vocabulary
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3, lesson.vocabulary.length))
        .map((v, i) => ({
          id: `auto-type-${v.id}-${i}`,
          type: 'type-answer' as const,
          question: `Type the German word for "${v.english}"`,
          questionGerman: v.example,
          options: [],
          correctAnswer: v.german,
          explanation: `${v.german} [${v.pronunciation}] = ${v.english} (${v.malayalam})`,
          xpReward: 5,
        }))
    : [];
  const allExercises = [...autoTypingExercises, ...lesson.exercises];

  // Limit vocab cards shown to max 4 — rest are learned through exercises
  const MAX_VOCAB_CARDS = 4;
  const shownVocab = lesson.vocabulary.slice(0, MAX_VOCAB_CARDS);

  const suggestedGameForModule = MODULE_GAME_MAP[module?.id ?? 0] ?? null;
  const hasGameSuggest = suggestedGameForModule && shownVocab.length > 0;
  const hasStory = !!lesson.storyScene;
  const storyDecisionCount = lesson.storyScene?.decisionPoints?.length ?? 0;

  // Step counting — uses shownVocab (capped at 4) not full vocabulary
  const vocabStepCount = shownVocab.length;
  const totalSteps = hasStory
    ? 1 + lesson.videos.length + vocabStepCount + storyDecisionCount + (hasGameSuggest ? 1 : 0) + allExercises.length + 2
    : 1 + lesson.videos.length + vocabStepCount + (hasGameSuggest ? 1 : 0) + allExercises.length + 1;
  const currentStepNumber =
    step.type === 'intro' || step.type === 'scene-intro' ? 1 :
    step.type === 'video' ? 2 + step.index :
    step.type === 'vocab' || step.type === 'contextual-vocab' ? 2 + lesson.videos.length + step.index :
    step.type === 'decision-point' ? 2 + lesson.videos.length + vocabStepCount + step.index :
    step.type === 'game-suggest' ? 2 + lesson.videos.length + vocabStepCount + storyDecisionCount :
    step.type === 'exercise' ? 2 + lesson.videos.length + vocabStepCount + storyDecisionCount + (hasGameSuggest ? 1 : 0) + step.index :
    step.type === 'scene-conclusion' ? totalSteps - 1 :
    totalSteps;
  const progress = (currentStepNumber / totalSteps) * 100;

  const resetVocabChallenge = () => {
    setVocabPhase('intro');
    setVocabEncounter(null);
    setVocabSelectedOption(null);
    setVocabAnswerState('default');
  };

  const suggestedGame = suggestedGameForModule;

  const goToExercises = () => {
    if (allExercises.length > 0) {
      setStep({ type: 'exercise', index: 0 });
      setSelectedAnswer(null); setAnswerState('default'); setMatchPairs({}); setMatchSelected(null); setMatchChecked(false); setTypedAnswer(''); setTypeAnswerState('default');
    } else {
      finishLesson();
    }
  };

  const goPrev = () => {
    if (step.type === 'exercise' && step.index > 0) {
      setStep({ type: 'exercise', index: step.index - 1 });
      setSelectedAnswer(null); setAnswerState('default'); setMatchPairs({}); setMatchSelected(null); setMatchChecked(false);
    } else if (step.type === 'exercise' && step.index === 0) {
      // Go back to last vocab or game-suggest
      if (hasGameSuggest) setStep({ type: 'game-suggest' });
      else if (shownVocab.length > 0) setStep({ type: 'vocab', index: shownVocab.length - 1 });
      else if (lesson.videos.length > 0) setStep({ type: 'video', index: lesson.videos.length - 1 });
      else setStep({ type: 'intro' });
    } else if (step.type === 'game-suggest') {
      if (shownVocab.length > 0) setStep({ type: 'vocab', index: shownVocab.length - 1 });
      else if (lesson.videos.length > 0) setStep({ type: 'video', index: lesson.videos.length - 1 });
      else setStep({ type: 'intro' });
    } else if (step.type === 'vocab' && step.index > 0) {
      setStep({ type: 'vocab', index: step.index - 1 });
      resetVocabChallenge();
    } else if (step.type === 'vocab' && step.index === 0) {
      if (lesson.videos.length > 0) setStep({ type: 'video', index: lesson.videos.length - 1 });
      else setStep({ type: 'intro' });
    } else if (step.type === 'video' && step.index > 0) {
      setStep({ type: 'video', index: step.index - 1 });
    } else if (step.type === 'video' && step.index === 0) {
      setStep({ type: 'intro' });
    }
    // intro has nowhere to go back to
  };

  const canGoPrev = step.type !== 'intro' && step.type !== 'complete';

  const advanceFromVocab = () => {
    learnVocabulary(shownVocab[(step as { type: 'vocab'; index: number }).index].id);
    addSRSCard(createCard(shownVocab[(step as { type: 'vocab'; index: number }).index].id));
    const idx = (step as { type: 'vocab'; index: number }).index;
    if (idx < shownVocab.length - 1) {
      setStep({ type: 'vocab', index: idx + 1 });
      resetVocabChallenge();
    } else if (suggestedGame) {
      // Show game suggestion between vocab and exercises
      setStep({ type: 'game-suggest' });
      resetVocabChallenge();
    } else {
      resetVocabChallenge();
      goToExercises();
    }
  };

  // After decision points, go to game suggest or exercises
  const afterDecisionPoints = () => {
    if (suggestedGame) {
      setStep({ type: 'game-suggest' });
    } else {
      goToExercises();
    }
  };

  const goNext = () => {
    // ── Story flow (when storyScene exists) ──
    if (step.type === 'scene-intro') {
      if (lesson.videos.length > 0) setStep({ type: 'video', index: 0 });
      else if (shownVocab.length > 0) { setStep({ type: 'contextual-vocab', index: 0 }); resetVocabChallenge(); }
      else if (storyDecisionCount > 0) setStep({ type: 'decision-point', index: 0 });
      else goToExercises();
      return;
    }
    if (step.type === 'contextual-vocab') {
      // Same challenge logic as regular vocab
      if (vocabPhase === 'intro') {
        const target = shownVocab[step.index];
        const encounter = generateEncounter(target, allVocabPool);
        setVocabEncounter(encounter);
        setVocabPhase('challenge');
        setVocabSelectedOption(null);
        setVocabAnswerState('default');
        return;
      }
      // Advance contextual vocab
      learnVocabulary(shownVocab[step.index].id);
      addSRSCard(createCard(shownVocab[step.index].id));
      if (step.index < shownVocab.length - 1) {
        setStep({ type: 'contextual-vocab', index: step.index + 1 });
        resetVocabChallenge();
      } else if (storyDecisionCount > 0) {
        setStep({ type: 'decision-point', index: 0 });
        resetVocabChallenge();
      } else {
        resetVocabChallenge();
        afterDecisionPoints();
      }
      return;
    }
    if (step.type === 'decision-point') {
      if (step.index < storyDecisionCount - 1) {
        setStep({ type: 'decision-point', index: step.index + 1 });
      } else {
        afterDecisionPoints();
      }
      return;
    }
    if (step.type === 'scene-conclusion') {
      finishLesson();
      return;
    }

    // ── Regular flow ──
    if (step.type === 'intro') {
      if (hasStory) {
        setStep({ type: 'scene-intro' });
      } else if (lesson.videos.length > 0) {
        setStep({ type: 'video', index: 0 });
      } else if (shownVocab.length > 0) {
        setStep({ type: 'vocab', index: 0 }); resetVocabChallenge();
      } else {
        setStep({ type: 'exercise', index: 0 });
      }
    } else if (step.type === 'video') {
      if (step.index < lesson.videos.length - 1) setStep({ type: 'video', index: step.index + 1 });
      else if (shownVocab.length > 0) {
        setStep({ type: hasStory ? 'contextual-vocab' : 'vocab', index: 0 });
        resetVocabChallenge();
      }
      else if (hasStory && storyDecisionCount > 0) setStep({ type: 'decision-point', index: 0 });
      else setStep({ type: 'exercise', index: 0 });
    } else if (step.type === 'vocab') {
      // Vocab intro phase: generate a challenge encounter
      if (vocabPhase === 'intro') {
        const target = shownVocab[step.index];
        const encounter = generateEncounter(target, allVocabPool);
        setVocabEncounter(encounter);
        setVocabPhase('challenge');
        setVocabSelectedOption(null);
        setVocabAnswerState('default');
        return;
      }
      // After challenge: advance to next word
      advanceFromVocab();
    } else if (step.type === 'game-suggest') {
      // Skip game → go to exercises
      goToExercises();
    } else if (step.type === 'exercise') {
      if (step.index < allExercises.length - 1) { setStep({ type: 'exercise', index: step.index + 1 }); setSelectedAnswer(null); setAnswerState('default'); setMatchPairs({}); setMatchSelected(null); setMatchChecked(false); setTypedAnswer(''); setTypeAnswerState('default'); setSpeakingResult(null); }
      else if (hasStory) setStep({ type: 'scene-conclusion' });
      else finishLesson();
    }
  };

  const finishLesson = () => {
    stopAmbience(1000); // Fade out ambience on lesson completion
    stopTTS();
    const score = allExercises.length > 0 ? Math.round((correctCount / allExercises.length) * 100) : 100;

    if (score < 50 && allExercises.length > 0) {
      // Failed — don't complete, show retry
      setLessonFailed(true);
      clearCheckpoint();
      setStep({ type: 'complete' });
      return;
    }

    // Passed — complete the lesson
    completeLesson(lesson.id, score);
    clearCheckpoint();
    addXP(lesson.xpReward);
    setStep({ type: 'complete' });

    // Check if this was the LAST lesson in the module
    const isLastLesson = lesson.id === module.lessons[module.lessons.length - 1].id;
    const allOtherLessonsDone = module.lessons
      .filter(l => l.id !== lesson.id)
      .every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id));

    if (isLastLesson && allOtherLessonsDone) {
      // Module complete! Award bonus XP
      addXP(100);
      setShowModuleComplete(true);
      feedbackCelebration();
    } else {
      setShowCelebration(true);
      feedbackCelebration();
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (answerState !== 'default') return;
    setSelectedAnswer(answer);
    setTotalAttempted(prev => prev + 1);
    const exercise = allExercises[(step as { type: 'exercise'; index: number }).index];
    const isCorrect = answer === exercise.correctAnswer;

    if (isCorrect) {
      setAnswerState('correct');
      setCorrectCount(prev => prev + 1);
      setKuttanMsg(getRandomMessage('correct'));
      feedbackCorrect();
      setTimeout(() => goNext(), 1400);
    } else {
      setAnswerState('incorrect');
      setKuttanMsg(getRandomMessage('wrong'));
      feedbackWrong();
      // Show correct answer for a moment, then auto-advance
      setTimeout(() => {
        goNext();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      {/* Scene background for story-driven lessons */}
      {hasStory && lesson.storyScene && step.type !== 'complete' && (
        <SceneBackground scene={lesson.storyScene.setting.sceneType} opacity={0.2} />
      )}

      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 mx-4 max-w-sm w-full text-center"
          >
            <p className="text-2xl mb-2">🤔</p>
            <h3 className="font-bold text-lg mb-1">Leave lesson?</h3>
            <p className="text-sm text-[var(--foreground)]/50 mb-4">
              Your progress is saved. You can resume later.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[var(--foreground)]/10 font-medium text-sm"
              >
                Stay
              </button>
              <button
                onClick={() => { stopAmbience(); router.push('/'); }}
                className="flex-1 py-2.5 rounded-xl bg-[#c0392b] text-white font-medium text-sm"
              >
                Leave
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Confetti isActive={answerState === 'correct'} duration={1500} />
      <Celebration
        isVisible={showCelebration}
        title="Lesson Complete!"
        subtitle={lesson.title}
        xpEarned={0}
        onContinue={() => { setShowCelebration(false); router.push('/'); }}
      />

      {/* Module Completion Celebration */}
      {showModuleComplete && (() => {
        const moduleIndex = ALL_MODULES.findIndex(m => m.id === module.id);
        const nextMod = moduleIndex < ALL_MODULES.length - 1 ? ALL_MODULES[moduleIndex + 1] : undefined;
        // Count completed modules (including this one we just finished)
        const completedModuleCount = ALL_MODULES.filter(m =>
          m.lessons.every(l =>
            l.id === lesson.id || userProgress.completedLessons.some(cl => cl.lessonId === l.id)
          )
        ).length;
        // Calculate avg score for this module's lessons
        const moduleLessonScores = module.lessons.map(l => {
          if (l.id === lesson.id) {
            return allExercises.length > 0
              ? Math.round((correctCount / allExercises.length) * 100)
              : 100;
          }
          const progress = userProgress.completedLessons.find(cl => cl.lessonId === l.id);
          return progress?.score ?? 0;
        });
        const avgScore = Math.round(
          moduleLessonScores.reduce((a, b) => a + b, 0) / moduleLessonScores.length
        );
        // Count vocab learned in this module
        const moduleVocabIds = module.lessons.flatMap(l => l.vocabulary.map(v => v.id));
        const vocabLearned = moduleVocabIds.filter(id =>
          userProgress.learnedVocabulary.includes(id)
        ).length;

        return (
          <ModuleComplete
            module={module}
            nextModule={nextMod}
            avgScore={avgScore}
            vocabLearned={vocabLearned}
            completedModuleCount={completedModuleCount}
            onContinue={() => {
              setShowModuleComplete(false);
              if (nextMod) {
                router.push(`/play/${nextMod.id}/${nextMod.lessons[0].id}`);
              } else {
                router.push('/');
              }
            }}
          />
        );
      })()}


      {/* Failed lesson — retry required */}
      {lessonFailed && step.type === 'complete' && !showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 max-w-sm w-full text-center"
          >
            <p className="text-5xl mb-3">😤</p>
            <h2 className="text-xl font-bold text-[#c0392b] mb-2">Not enough to pass</h2>
            <p className="text-sm text-[var(--foreground)]/50 mb-1">
              You scored {allExercises.length > 0 ? Math.round((correctCount / allExercises.length) * 100) : 0}% — need 50% to pass.
            </p>
            <p className="text-xs text-[var(--foreground)]/30 mb-4">
              Review the material and try again!
            </p>
            <div className="flex flex-col gap-2">
              <GameButton
                onClick={() => {
                  setLessonFailed(false);
                  setStep({ type: 'intro' });
                  setCorrectCount(0);
                  setTotalAttempted(0);
                  setSelectedAnswer(null);
                  setAnswerState('default');
                }}
                variant="primary"
              >
                Try Again
              </GameButton>
              <GameButton onClick={() => router.push('/learn')} variant="ghost">
                Back to Lessons
              </GameButton>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowExitConfirm(true)}
              className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-[var(--foreground)]/60" />
            </motion.button>
            {canGoPrev && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--foreground)]/60" />
              </motion.button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-3 h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d4a520] to-[#27ae60] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Score */}
          {totalAttempted > 0 && (
            <span className="text-xs font-bold text-[var(--foreground)]/50 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-2.5 py-1">
              {correctCount}/{totalAttempted}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {step.type === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <CharacterGuide
                messages={kuttanMsg}
                mood="excited"
                size="md"
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <div className="text-4xl mb-3">{module.icon}</div>
                <h1 className="text-2xl font-bold mb-1">{lesson.title}</h1>
                <p className="text-[var(--foreground)]/40 text-base mb-3">{lesson.titleGerman}</p>
                <p className="max-w-md text-sm leading-relaxed text-[var(--foreground)]/60 px-2">
                  {lesson.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/10 px-3 py-1 text-[#93c5fd]">
                    🎬 {lesson.videos.length} video{lesson.videos.length === 1 ? '' : 's'}
                  </span>
                  <span className="rounded-full border border-[#d4a520]/20 bg-[#d4a520]/10 px-3 py-1 text-[#d4a520]">
                    📚 {lesson.vocabulary.length} words
                  </span>
                  <span className="rounded-full border border-[#27ae60]/20 bg-[#27ae60]/10 px-3 py-1 text-[#86efac]">
                    📝 {allExercises.length} exercise{allExercises.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="mt-4 rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4 text-left max-w-md mx-auto">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]/40 mb-2">How this lesson works</p>
                  <ul className="space-y-1.5 text-sm text-[var(--foreground)]/60">
                    <li>• Watch the short teaching videos first</li>
                    <li>• Flip through vocabulary with audio</li>
                    <li>• Finish the exercises to lock it in</li>
                    <li>• Wrong answers show the correct one — learn as you go</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* SCENE INTRO (Story mode) */}
          {step.type === 'scene-intro' && lesson.storyScene && (
            <NarrativeIntro
              scene={lesson.storyScene}
              lessonTitle={lesson.title}
              lessonTitleGerman={lesson.titleGerman}
              moduleIcon={module.icon}
              onContinue={goNext}
            />
          )}

          {/* CONTEXTUAL VOCAB (Story mode) */}
          {step.type === 'contextual-vocab' && lesson.storyScene && vocabPhase === 'intro' && (
            <ContextualVocab
              vocab={shownVocab[step.index]}
              encounter={lesson.storyScene.vocabEncounters[step.index] || {
                vocabId: shownVocab[step.index].id,
                encounterMoment: shownVocab[step.index].example,
                contextSentence: shownVocab[step.index].example,
              }}
              index={step.index}
              total={shownVocab.length}
              isBookmarked={(userProgress.bookmarkedVocab || []).includes(shownVocab[step.index].id)}
              onPlayAudio={() => {
                const vocab = shownVocab[step.index];
                duckAmbience(2000);
                playVocabAudio(vocab.id).catch(() => speakGerman(vocab.german));
              }}
              onBookmark={() => toggleBookmark(shownVocab[step.index].id)}
            />
          )}

          {/* CONTEXTUAL VOCAB — Challenge phase (reuses existing vocab challenge UI) */}
          {step.type === 'contextual-vocab' && vocabPhase === 'challenge' && vocabEncounter && (
            <motion.div
              key={`ctx-vocab-challenge-${step.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-start gap-2 mb-4">
                <CharacterGuide
                  messages={vocabAnswerState === 'correct' ? getRandomMessage('correct')
                    : vocabAnswerState === 'wrong' ? getRandomMessage('wrong')
                    : vocabEncounter.kuttanSays}
                  mood={vocabAnswerState === 'correct' ? 'celebrating' : vocabAnswerState === 'wrong' ? 'sad' : 'thinking'}
                  size="sm"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                {vocabEncounter.contextGerman && (
                  <p className="text-center text-sm text-[var(--foreground)]/50 italic mb-2">{vocabEncounter.contextGerman}</p>
                )}
                <h2 className="text-lg font-bold text-center mb-5">{vocabEncounter.prompt}</h2>
                <div className="space-y-2">
                  {vocabEncounter.options.map((opt, i) => {
                    const isSelected = vocabSelectedOption === i;
                    const isCorrectOpt = i === vocabEncounter.correctIndex;
                    let optState: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                    if (vocabAnswerState === 'correct' && isCorrectOpt) optState = 'correct';
                    else if (vocabAnswerState === 'wrong' && isSelected) optState = 'incorrect';
                    else if (vocabAnswerState === 'wrong' && isCorrectOpt) optState = 'correct';
                    return (
                      <ChoiceButton
                        key={i}
                        onClick={() => {
                          if (vocabAnswerState !== 'default') return;
                          setVocabSelectedOption(i);
                          if (i === vocabEncounter.correctIndex) {
                            setVocabAnswerState('correct');
                            feedbackCorrect();
                            setTimeout(() => goNext(), 1200);
                          } else {
                            setVocabAnswerState('wrong');
                            feedbackWrong();
                            setTimeout(() => goNext(), 2000);
                          }
                        }}
                        state={optState}
                        disabled={vocabAnswerState !== 'default'}
                      >
                        {opt}
                      </ChoiceButton>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* DECISION POINT (Story mode) */}
          {step.type === 'decision-point' && lesson.storyScene && lesson.storyScene.decisionPoints[step.index] && (
            <DecisionPoint
              decision={lesson.storyScene.decisionPoints[step.index]}
              onComplete={(wasCorrect) => {
                if (wasCorrect) setCorrectCount(prev => prev + 1);
                goNext();
              }}
            />
          )}

          {/* SCENE CONCLUSION (Story mode) */}
          {step.type === 'scene-conclusion' && lesson.storyScene && (
            <SceneConclusion
              scene={lesson.storyScene}
              correctCount={correctCount}
              totalExercises={allExercises.length}
              vocabLearned={shownVocab.length}
            />
          )}

          {/* VIDEO */}
          {step.type === 'video' && (
            <motion.div
              key={`video-${step.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col justify-center py-4"
            >
              <VideoPlayer
                title={lesson.videos[step.index].title}
                description={lesson.videos[step.index].description}
                duration={lesson.videos[step.index].duration}
                videoUrl={lesson.videos[step.index].videoUrl}
                learningObjectives={lesson.videos[step.index].learningObjectives?.slice(0, 3)}
                script={getVideoScript(lesson.videos[step.index].id)}
              />
            </motion.div>
          )}

          {/* VOCABULARY — Phase 1: Intro, Phase 2: Challenge */}
          {step.type === 'vocab' && vocabPhase === 'intro' && (
            <motion.div
              key={`vocab-intro-${step.index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <p className="text-[var(--foreground)]/40 text-xs mb-3">
                New word {step.index + 1} of {shownVocab.length}
              </p>

              {/* Word intro card — everything visible, no flipping */}
              <div className="w-full max-w-sm bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-2xl p-6 text-center">
                <span className="text-xl mb-2 block">🇩🇪</span>
                <h2 className="text-3xl font-bold mb-1">
                  {shownVocab[step.index].german}
                </h2>
                <p className="text-[var(--foreground)]/40 text-sm mb-4">/{shownVocab[step.index].pronunciation}/</p>

                <div className="w-10 h-0.5 bg-[var(--foreground)]/10 mx-auto mb-4" />

                <p className="text-xl font-semibold mb-1">
                  {shownVocab[step.index].english}
                </p>
                <p className="text-[#d4a520] text-base mb-4">
                  {shownVocab[step.index].malayalam}
                </p>

                {shownVocab[step.index].example && (
                  <div className="bg-[var(--foreground)]/5 rounded-xl px-4 py-3 text-left">
                    <p className="text-sm text-[var(--foreground)]/60 italic">
                      &ldquo;{shownVocab[step.index].example}&rdquo;
                    </p>
                    {shownVocab[step.index].exampleTranslation && (
                      <p className="text-xs text-[var(--foreground)]/30 mt-1">
                        {shownVocab[step.index].exampleTranslation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Audio + Bookmark */}
              <div className="flex items-center gap-3 mt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const vocab = shownVocab[step.index];
                    duckAmbience(2000);
                    playVocabAudio(vocab.id).catch(() => speakGerman(vocab.german));
                  }}
                  className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
                >
                  <Volume2 className="w-4 h-4 text-[#d4a520]" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleBookmark(shownVocab[step.index].id)}
                  className="w-11 h-11 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
                >
                  <Bookmark className={`w-4 h-4 ${(userProgress.bookmarkedVocab || []).includes(shownVocab[step.index].id) ? 'text-[#e94560] fill-[#e94560]' : 'text-[var(--foreground)]/40'}`} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* VOCABULARY — Challenge phase */}
          {step.type === 'vocab' && vocabPhase === 'challenge' && vocabEncounter && (
            <motion.div
              key={`vocab-challenge-${step.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col"
            >
              {/* Mini Kuttan prompt */}
              <div className="flex items-start gap-2 mb-4">
                <CharacterGuide
                  messages={vocabAnswerState === 'correct' ? getRandomMessage('correct')
                    : vocabAnswerState === 'wrong' ? getRandomMessage('wrong')
                    : vocabEncounter.kuttanSays}
                  mood={vocabAnswerState === 'correct' ? 'celebrating' : vocabAnswerState === 'wrong' ? 'sad' : 'thinking'}
                  size="sm"
                />
              </div>

              {/* Encounter question */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5 mb-4">
                  {vocabEncounter.contextGerman && (
                    <p className="text-lg font-semibold leading-relaxed whitespace-pre-line mb-3">
                      {vocabEncounter.contextGerman}
                    </p>
                  )}
                  <p className="text-sm text-[var(--foreground)]/60">
                    {vocabEncounter.prompt}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {vocabEncounter.options.map((option, idx) => {
                    const isSelected = vocabSelectedOption === idx;
                    const isCorrectOption = idx === vocabEncounter.correctIndex;
                    const showCorrect = vocabAnswerState === 'correct' && isCorrectOption;
                    const showWrong = isSelected && vocabAnswerState === 'wrong';

                    let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                    if (showCorrect) state = 'correct';
                    else if (showWrong) state = 'incorrect';
                    else if (vocabAnswerState === 'wrong' && isCorrectOption) state = 'correct';

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <ChoiceButton
                          onClick={() => {
                            if (vocabAnswerState !== 'default') return;
                            setVocabSelectedOption(idx);
                            if (idx === vocabEncounter.correctIndex) {
                              setVocabAnswerState('correct');
                              feedbackCorrect();
                              playVocabAudio(shownVocab[step.index].id).catch(() => {});
                              // Auto-advance after showing correct
                              setTimeout(() => advanceFromVocab(), 1400);
                            } else {
                              setVocabAnswerState('wrong');
                              feedbackWrong();
                              // Show correct answer, then advance
                              setTimeout(() => advanceFromVocab(), 2000);
                            }
                          }}
                          state={state}
                          disabled={vocabAnswerState !== 'default'}
                        >
                          {option}
                        </ChoiceButton>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Explanation after answering */}
                {vocabAnswerState !== 'default' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 px-4 py-3"
                  >
                    <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                      {vocabEncounter.explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* VOCAB CHALLENGE FALLBACK — when encounter fails to generate, show skip button */}
          {step.type === 'vocab' && vocabPhase === 'challenge' && !vocabEncounter && (
            <motion.div
              key="vocab-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <p className="text-sm text-[var(--foreground)]/50 mb-4">
                Word learned! Moving on...
              </p>
              <GameButton onClick={() => advanceFromVocab()} variant="primary">
                Continue
              </GameButton>
            </motion.div>
          )}

          {/* CONTEXTUAL VOCAB CHALLENGE FALLBACK */}
          {step.type === 'contextual-vocab' && vocabPhase === 'challenge' && !vocabEncounter && (
            <motion.div
              key="ctx-vocab-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <p className="text-sm text-[var(--foreground)]/50 mb-4">
                Word learned! Moving on...
              </p>
              <GameButton onClick={() => goNext()} variant="primary">
                Continue
              </GameButton>
            </motion.div>
          )}

          {/* GAME SUGGESTION — between vocab and exercises */}
          {step.type === 'game-suggest' && suggestedGame && (
            <motion.div
              key="game-suggest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <CharacterGuide
                messages="Vocab done! Want to play a game before exercises? It'll help lock in what you just learned! 🎮"
                mood="excited"
                size="md"
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 w-full max-w-sm"
              >
                <div className="game-card p-6 text-center mb-4">
                  <span className="text-4xl mb-3 block">{suggestedGame.icon}</span>
                  <h3 className="text-xl font-bold mb-1">{suggestedGame.name}</h3>
                  <p className="text-sm text-[var(--foreground)]/50">{suggestedGame.description}</p>
                </div>

                <GameButton
                  onClick={() => router.push(suggestedGame.path)}
                  fullWidth
                  variant="primary"
                  size="lg"
                >
                  Play Now
                </GameButton>

                <button
                  onClick={goToExercises}
                  className="w-full mt-3 py-2.5 text-sm text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors"
                >
                  Skip — go to exercises
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* EXERCISE */}
          {step.type === 'exercise' && (
            <motion.div
              key={`exercise-${step.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col"
            >
              {/* Kuttan feedback */}
              <div className="flex justify-center mb-3">
                <CharacterGuide
                  messages={kuttanMsg || getRandomMessage('encourage')}
                  mood={answerState === 'correct' ? 'celebrating' : answerState === 'incorrect' ? 'sad' : 'thinking'}
                  size="sm"
                  showAppu={answerState === 'correct'}
                  appuMood="celebrating"
                />
              </div>

              {/* Question */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-center mb-6 leading-snug">
                  {highlightGerman(allExercises[step.index].question)}
                </h2>

                {/* TYPE-ANSWER EXERCISE — production practice */}
                {allExercises[step.index].type === 'type-answer' ? (() => {
                  const exercise = allExercises[step.index];
                  const correctAnswer = (typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : exercise.correctAnswer[0]).trim();

                  const handleTypeSubmit = () => {
                    if (typeAnswerState !== 'default' || !typedAnswer.trim()) return;
                    setTotalAttempted(prev => prev + 1);
                    // Flexible matching: case-insensitive, trim whitespace
                    const isCorrect = typedAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
                    if (isCorrect) {
                      setTypeAnswerState('correct');
                      setCorrectCount(prev => prev + 1);
                      setKuttanMsg(getRandomMessage('correct'));
                      feedbackCorrect();
                      setTimeout(() => goNext(), 1400);
                    } else {
                      setTypeAnswerState('incorrect');
                      setKuttanMsg(getRandomMessage('wrong'));
                      feedbackWrong();
                      setTimeout(() => goNext(), 2500);
                    }
                  };

                  return (
                    <div className="space-y-4">
                      {exercise.questionGerman && (
                        <div className="bg-[var(--foreground)]/5 rounded-xl px-4 py-3 text-center">
                          <p className="text-sm text-[var(--foreground)]/50 italic">
                            &ldquo;{exercise.questionGerman}&rdquo;
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={typedAnswer}
                          onChange={(e) => setTypedAnswer(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleTypeSubmit(); }}
                          placeholder="Type the German word..."
                          disabled={typeAnswerState !== 'default'}
                          autoFocus
                          className={`flex-1 px-4 py-3 rounded-xl border-2 text-base bg-[var(--card-bg)] outline-none transition-colors ${
                            typeAnswerState === 'correct' ? 'border-[#27ae60] text-[#27ae60]' :
                            typeAnswerState === 'incorrect' ? 'border-[#c0392b] text-[#c0392b]' :
                            'border-[var(--card-border)] focus:border-[#d4a520]'
                          }`}
                        />
                        <GameButton
                          onClick={handleTypeSubmit}
                          disabled={typeAnswerState !== 'default' || !typedAnswer.trim()}
                          variant="primary"
                        >
                          Check
                        </GameButton>
                      </div>
                      {typeAnswerState === 'incorrect' && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center"
                        >
                          <p className="text-sm text-[var(--foreground)]/50">
                            Correct answer: <span className="font-bold text-[#27ae60]">{correctAnswer}</span>
                          </p>
                        </motion.div>
                      )}
                    </div>
                  );
                })() :

                /* SPEAKING EXERCISE */
                allExercises[step.index].type === 'speaking' ? (() => {
                  const exercise = allExercises[step.index];
                  const expectedAnswer = typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : exercise.correctAnswer[0];

                  const handleSpeakResult = (transcript: string, confidence: number, isMatch: boolean) => {
                    setSpeakingResult({ transcript, confidence, isMatch });
                    setTotalAttempted(prev => prev + 1);
                    if (isMatch) {
                      setCorrectCount(prev => prev + 1);
                      setKuttanMsg(getRandomMessage('correct'));
                      feedbackCorrect();
                      setTimeout(() => goNext(), 2500);
                    } else {
                      setKuttanMsg(getRandomMessage('wrong'));
                      feedbackWrong();
                    }
                  };

                  return (
                    <div className="space-y-4 flex flex-col items-center">
                      {/* Prompt */}
                      <div className="bg-[var(--foreground)]/5 rounded-xl px-4 py-3 text-center w-full max-w-sm">
                        <p className="text-lg font-bold text-[#d4a520]">{expectedAnswer}</p>
                        {exercise.questionGerman && exercise.questionGerman !== expectedAnswer && (
                          <p className="text-xs text-[var(--foreground)]/40 mt-1 italic">{exercise.questionGerman}</p>
                        )}
                      </div>

                      {/* Listen to native button */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { duckAmbience(2000); speakGerman(expectedAnswer); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-sm text-[var(--foreground)]/70"
                      >
                        <Volume2 className="w-4 h-4 text-[#d4a520]" /> Listen first
                      </motion.button>

                      {/* Speak button or comparison */}
                      {!speakingResult ? (
                        <SpeakButton
                          expectedText={expectedAnswer}
                          onResult={handleSpeakResult}
                          size="lg"
                          label="Tap to speak"
                        />
                      ) : (
                        <PronunciationCompare
                          expected={expectedAnswer}
                          transcript={speakingResult.transcript}
                          confidence={speakingResult.confidence}
                          onRetry={() => setSpeakingResult(null)}
                        />
                      )}

                      {/* Skip button for speaking (graceful fallback) */}
                      {!speakingResult && (
                        <button
                          onClick={() => { setTotalAttempted(prev => prev + 1); goNext(); }}
                          className="text-xs text-[var(--foreground)]/30 underline"
                        >
                          Skip speaking exercise
                        </button>
                      )}

                      {/* Continue after failed attempt */}
                      {speakingResult && !speakingResult.isMatch && (
                        <GameButton onClick={goNext} variant="ghost">
                          Continue anyway
                        </GameButton>
                      )}
                    </div>
                  );
                })() :

                /* MATCHING EXERCISE */
                allExercises[step.index].type === 'matching' && Array.isArray(allExercises[step.index].correctAnswer) ? (() => {
                  const exercise = allExercises[step.index];
                  const leftItems = exercise.options || [];
                  const rightItems = exercise.correctAnswer as string[];
                  // Shuffle right side once (use exercise id as stable seed)
                  const shuffledRight = [...rightItems].sort((a, b) => {
                    const ha = a.charCodeAt(0) + exercise.id.charCodeAt(exercise.id.length - 1);
                    const hb = b.charCodeAt(0) + exercise.id.charCodeAt(exercise.id.length - 1);
                    return (ha % 7) - (hb % 7);
                  });

                  const handleMatchLeft = (leftIdx: number) => {
                    if (matchChecked) return;
                    setMatchSelected(leftIdx);
                  };

                  const handleMatchRight = (rightIdx: number) => {
                    if (matchChecked || matchSelected === null) return;
                    setMatchPairs(prev => ({ ...prev, [matchSelected]: rightIdx }));
                    setMatchSelected(null);
                  };

                  const allPaired = Object.keys(matchPairs).length === leftItems.length;

                  const handleCheckMatches = () => {
                    setMatchChecked(true);
                    setTotalAttempted(prev => prev + 1);
                    // Check: for each left index, the paired right item should match correctAnswer[leftIdx]
                    const allCorrect = leftItems.every((_, leftIdx) => {
                      const pairedRightIdx = matchPairs[leftIdx];
                      if (pairedRightIdx === undefined) return false;
                      return shuffledRight[pairedRightIdx] === rightItems[leftIdx];
                    });
                    if (allCorrect) {
                      setAnswerState('correct');
                      setCorrectCount(prev => prev + 1);
                      setKuttanMsg(getRandomMessage('correct'));
                      feedbackCorrect();
                      setTimeout(() => goNext(), 1800);
                    } else {
                      setAnswerState('incorrect');
                      setKuttanMsg(getRandomMessage('wrong'));
                      feedbackWrong();
                      setTimeout(() => goNext(), 2500);
                    }
                  };

                  return (
                    <div>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Left column */}
                        <div className="space-y-2">
                          {leftItems.map((item, i) => {
                            const isPaired = matchPairs[i] !== undefined;
                            const isSelected = matchSelected === i;
                            const isCorrectPair = matchChecked && isPaired && shuffledRight[matchPairs[i]] === rightItems[i];
                            const isWrongPair = matchChecked && isPaired && shuffledRight[matchPairs[i]] !== rightItems[i];
                            return (
                              <motion.button
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => handleMatchLeft(i)}
                                className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                                  isCorrectPair ? 'border-[#27ae60] bg-[#27ae60]/15' :
                                  isWrongPair ? 'border-[#c0392b] bg-[#c0392b]/15' :
                                  isSelected ? 'border-[#d4a520] bg-[#d4a520]/15' :
                                  isPaired ? 'border-[#3b82f6]/50 bg-[#3b82f6]/10' :
                                  'border-[var(--card-border)] bg-[var(--card-bg)]'
                                }`}
                              >
                                {item}
                              </motion.button>
                            );
                          })}
                        </div>
                        {/* Right column */}
                        <div className="space-y-2">
                          {shuffledRight.map((item, i) => {
                            const pairedBy = Object.entries(matchPairs).find(([, v]) => v === i);
                            const isPaired = pairedBy !== undefined;
                            const leftIdx = pairedBy ? parseInt(pairedBy[0]) : -1;
                            const isCorrectPair = matchChecked && isPaired && shuffledRight[i] === rightItems[leftIdx];
                            const isWrongPair = matchChecked && isPaired && shuffledRight[i] !== rightItems[leftIdx];
                            return (
                              <motion.button
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => handleMatchRight(i)}
                                className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                                  isCorrectPair ? 'border-[#27ae60] bg-[#27ae60]/15' :
                                  isWrongPair ? 'border-[#c0392b] bg-[#c0392b]/15' :
                                  isPaired ? 'border-[#3b82f6]/50 bg-[#3b82f6]/10' :
                                  matchSelected !== null ? 'border-[#d4a520]/30 hover:border-[#d4a520] hover:bg-[#d4a520]/10' :
                                  'border-[var(--card-border)] bg-[var(--card-bg)]'
                                }`}
                              >
                                {item}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                      {matchSelected !== null && (
                        <p className="text-center text-xs text-[#d4a520] mt-2">Now tap the matching answer on the right</p>
                      )}
                      {allPaired && !matchChecked && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                          <GameButton onClick={handleCheckMatches} fullWidth variant="primary">
                            Check Answers
                          </GameButton>
                        </motion.div>
                      )}
                    </div>
                  );
                })() : (
                  /* MULTIPLE CHOICE / FILL-BLANK EXERCISE */
                  <div className="space-y-3">
                    {allExercises[step.index].options?.map((option, i) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === allExercises[step.index].correctAnswer;
                      let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                      if (answerState === 'correct' && isCorrect) state = 'correct';
                      else if (answerState === 'incorrect' && isSelected) state = 'incorrect';
                      else if (answerState === 'incorrect' && isCorrect) state = 'correct';
                      else if (isSelected) state = 'selected';

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <ChoiceButton
                            onClick={() => handleAnswerSelect(option)}
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

                {/* Explanation — shown after answering */}
                {answerState !== 'default' && allExercises[step.index].explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 px-4 py-3"
                  >
                    <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                      <span className="font-semibold text-[#d4a520]">Explanation:</span>{' '}
                      {allExercises[step.index].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button — hidden during challenges, exercises, and decision points */}
      {step.type !== 'complete' && step.type !== 'exercise' && step.type !== 'game-suggest'
        && step.type !== 'decision-point'
        && !(step.type === 'vocab' && vocabPhase === 'challenge')
        && !(step.type === 'contextual-vocab' && vocabPhase === 'challenge')
        && (
        <div className="px-4 py-5 relative z-10">
          <GameButton
            onClick={goNext}
            size="lg"
            fullWidth
            variant="primary"
          >
            {step.type === 'intro' ? "Let's Start" :
             step.type === 'scene-intro' ? "Let's Go!" :
             step.type === 'video' ? 'Continue' :
             step.type === 'vocab' ? "Got it — test me!" :
             step.type === 'contextual-vocab' ? "Got it — test me!" :
             step.type === 'scene-conclusion' ? 'Finish Lesson' :
             'Continue'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
