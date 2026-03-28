'use client';

import { use, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Loader2, Bookmark, ChevronLeft, Trophy } from 'lucide-react';
import { playVocabAudio, playExampleAudio, useGermanTTS } from '@/lib/audio';
import { startAmbience, stopAmbience, duckAmbience, getSceneForModule } from '@/lib/audio/ambience';
import { SpeakButton, PronunciationCompare } from '@/components/speaking';
import { NarrativeIntro, ContextualVocab, DecisionPoint, SceneConclusion } from '@/components/lesson';
import { AdventurePlayer } from '@/components/lesson/AdventurePlayer';
import { buildAdventure } from '@/lib/adventure-engine';
import { SceneBackground } from '@/components/visual';
import { SwipeCards, WordScramble, WordBank, FallingWords, BubblePop } from '@/components/exercise-games';
import { GameButton, ChoiceButton, Confetti, Celebration, ModuleComplete } from '@/components/game';
import { CharacterGuide, KuttanSpeech, mapMoodToImage } from '@/components/character';
import { VideoPlayer } from '@/components/media/VideoPlayer';
import { getRandomMessage } from '@/lib/content/dialogue';
import { getVideoScript } from '@/lib/content/video-scripts';
import { createCard } from '@/lib/srs';
import { useGameStore } from '@/lib/store';
import { getLessonById, getModuleById, ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { isLessonUnlocked as checkLessonUnlocked } from '@/lib/curriculum';
import { feedbackCorrect, feedbackWrong, feedbackCelebration, feedbackFlip, feedbackCombo, feedbackComboBreak } from '@/lib/feedback';
import { ComboMeter } from '@/components/game/ComboMeter';
import { MiniGameEmbed } from '@/components/game/MiniGameEmbed';
import { generateEncounter, type Encounter } from '@/lib/encounters';
import { checkForSurprise, type SurpriseEvent } from '@/lib/engagement/surprise-engine';

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
  | { type: 'mini-game' }                            // Quick game break before exercises
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
  // Ordering exercise state
  const [orderPlaced, setOrderPlaced] = useState<string[]>([]);
  const [orderChecked, setOrderChecked] = useState(false);
  const [orderCorrect, setOrderCorrect] = useState(false);
  // Vocab teaching: intro (show word) → challenge (mini-encounter to prove recall)
  const [vocabPhase, setVocabPhase] = useState<'intro' | 'challenge'>('intro');
  const [vocabEncounter, setVocabEncounter] = useState<Encounter | null>(null);
  const [vocabSelectedOption, setVocabSelectedOption] = useState<number | null>(null);
  const [vocabAnswerState, setVocabAnswerState] = useState<'default' | 'correct' | 'wrong'>('default');
  const allVocabPool = getAllVocabulary();
  // Combo tracking for exercises
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  // Surprise events
  const [surprise, setSurprise] = useState<SurpriseEvent | null>(null);

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

  // Start ambient soundscape for every lesson — creates atmosphere
  useEffect(() => {
    if (mounted && module) {
      try {
        const scene = lesson?.storyScene?.setting.sceneType || getSceneForModule(module.id);
        startAmbience(scene as import('@/lib/audio/ambience').SceneType, 0.25);
      } catch { /* AudioContext may fail on some browsers — non-critical */ }
    }
    return () => { try { stopAmbience(800); } catch { /* noop */ } };
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
      try {
        const vocab = shownVocab[step.index];
        duckAmbience(2000);
        playVocabAudio(vocab.id).catch(() => {
          try { speakGerman(vocab.german); } catch { /* TTS unavailable */ }
        });
      } catch { /* non-critical audio error */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, step]);

  // Auto-speak dictation exercises when they appear
  useEffect(() => {
    if (mounted && step.type === 'exercise' && allExercises[(step as {index: number}).index]?.type === 'dictation') {
      const answer = allExercises[(step as {index: number}).index].correctAnswer;
      const text = typeof answer === 'string' ? answer : answer[0];
      const timer = setTimeout(() => { try { duckAmbience(2000); speakGerman(text, { rate: 0.85 }); } catch {} }, 500);
      return () => clearTimeout(timer);
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
  // Shuffle exercises so order varies each time — prevents predictability
  // Keep auto-typing at front (warm-up), shuffle the rest
  const shuffledLessonExercises = [...lesson.exercises].sort(() => Math.random() - 0.5);
  const allExercises = [...autoTypingExercises, ...shuffledLessonExercises];

  // Limit vocab cards shown to max 6 — rest are learned through exercises
  const MAX_VOCAB_CARDS = 6;
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

  // After decision points/vocab → mini-game → game suggest → exercises
  const hasMiniGame = shownVocab.length >= 3;
  const afterDecisionPoints = () => {
    if (hasMiniGame) {
      setStep({ type: 'mini-game' });
    } else if (suggestedGame) {
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
    } else if (step.type === 'mini-game') {
      // After mini-game → game suggest or exercises
      if (suggestedGame) setStep({ type: 'game-suggest' });
      else goToExercises();
    } else if (step.type === 'game-suggest') {
      goToExercises();
    } else if (step.type === 'exercise') {
      if (step.index < allExercises.length - 1) { setStep({ type: 'exercise', index: step.index + 1 }); setSelectedAnswer(null); setAnswerState('default'); setMatchPairs({}); setMatchSelected(null); setMatchChecked(false); setTypedAnswer(''); setTypeAnswerState('default'); setSpeakingResult(null); setOrderPlaced([]); setOrderChecked(false); setOrderCorrect(false); }
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
    // Mark ALL vocab in this lesson as learned (not just the shown cards)
    lesson.vocabulary.forEach(v => {
      learnVocabulary(v.id);
      addSRSCard(createCard(v.id));
    });
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
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setAnswerState('correct');
      setCorrectCount(prev => prev + 1);
      setKuttanMsg(getRandomMessage('correct'));
      feedbackCombo(newCombo);
      // Check for surprise on correct answer
      const surpriseEvent = checkForSurprise('correct_answer');
      if (surpriseEvent) { setSurprise(surpriseEvent); setTimeout(() => setSurprise(null), 4000); }
      setTimeout(() => goNext(), 1400);
    } else {
      if (combo > 2) feedbackComboBreak();
      else feedbackWrong();
      setCombo(0);
      setAnswerState('incorrect');
      setKuttanMsg(getRandomMessage('wrong'));
      setTimeout(() => goNext(), 2000);
    }
  };

  // ═══ ADVENTURE MODE — the new seamless co-learning flow ═══
  // When lesson has storyScene, use the AdventurePlayer instead of step-by-step
  if (hasStory && lesson.storyScene) {
    const adventureMoments = buildAdventure(lesson, shownVocab, allExercises);
    return (
      <AdventurePlayer
        moments={adventureMoments}
        module={module}
        lesson={lesson}
        allVocab={allVocabPool}
        shownVocab={shownVocab}
        onComplete={(adventureScore, adventureTotal, adventureCombo) => {
          const score = adventureTotal > 0 ? Math.round((adventureScore / adventureTotal) * 100) : 100;
          if (score >= 50 || adventureTotal === 0) {
            completeLesson(lesson.id, score);
            clearCheckpoint();
            addXP(lesson.xpReward);
            lesson.vocabulary.forEach(v => { learnVocabulary(v.id); addSRSCard(createCard(v.id)); });
            feedbackCelebration();
          }
          router.push('/');
        }}
        onExit={() => router.push('/')}
      />
    );
  }

  // ═══ LEGACY STEP-BY-STEP MODE — for lessons without storyScene ═══
  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      {/* Scene background for ALL lessons — uses story scene type or module default */}
      {step.type !== 'complete' && module && (
        <SceneBackground
          scene={lesson.storyScene?.setting.sceneType || getSceneForModule(module.id)}
          opacity={0.2}
        />
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
      <div className="relative z-20 px-4 pt-4 pb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9, rotate: -90 }}
              onClick={() => setShowExitConfirm(true)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg"
            >
              <X className="w-5 h-5 text-white/60" />
            </motion.button>
            {canGoPrev && (
              <motion.button
                whileTap={{ scale: 0.9, x: -4 }}
                onClick={goPrev}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-white/60" />
              </motion.button>
            )}
          </div>

          {/* Progress Bar — with glow and gradient */}
          <div className="flex-1 relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d4a520] via-[#ffd93d] to-[#27ae60] rounded-full shadow-[0_0_12px_rgba(212,165,32,0.4)]"
              initial={{ width: 0 }}
              animate={{ 
                width: `${progress}%`,
              }}
              transition={{ duration: 0.8, ease: 'circOut' }}
            />
          </div>

          {/* Score / Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-lg">
             <Trophy className="w-3.5 h-3.5 text-[#d4a520]" />
             <span className="text-xs font-black text-white/80 tabular-nums">
                {correctCount}
             </span>
          </div>
        </div>

        {/* Combo meter — shows during exercises */}
        <AnimatePresence>
          {step.type === 'exercise' && (combo > 0 || maxCombo > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-2"
            >
              <ComboMeter combo={combo} maxCombo={maxCombo} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Surprise event overlay */}
      <AnimatePresence>
        {surprise && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setSurprise(null)}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-[90] cursor-pointer"
          >
            <div className="bg-gradient-to-r from-[#d4a520]/20 to-[#27ae60]/20 border border-[#d4a520]/30 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg max-w-[300px]">
              <span className="text-2xl">{surprise.emoji}</span>
              <div>
                <p className="text-xs font-bold text-[#d4a520]">{surprise.title}</p>
                <p className="text-[11px] text-[var(--foreground)]/60">{surprise.message}</p>
                {surprise.xpBonus && <p className="text-[10px] text-[#27ae60] font-bold">+{surprise.xpBonus} XP</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 px-4 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {step.type === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <CharacterGuide messages={kuttanMsg} mood="excited" size="sm" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3"
              >
                <div className="text-3xl mb-2">{module.icon}</div>
                <h1 className="text-xl font-bold mb-0.5">{lesson.title}</h1>
                <p className="text-[var(--foreground)]/40 text-sm mb-2">{lesson.titleGerman}</p>
                <p className="max-w-sm text-xs leading-relaxed text-[var(--foreground)]/50 px-2">
                  {lesson.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
                  <span className="rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/10 px-2.5 py-0.5 text-[#93c5fd]">
                    🎬 {lesson.videos.length}
                  </span>
                  <span className="rounded-full border border-[#d4a520]/20 bg-[#d4a520]/10 px-2.5 py-0.5 text-[#d4a520]">
                    📚 {lesson.vocabulary.length}
                  </span>
                  <span className="rounded-full border border-[#27ae60]/20 bg-[#27ae60]/10 px-2.5 py-0.5 text-[#86efac]">
                    📝 {allExercises.length}
                  </span>
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
                playVocabAudio(vocab.id).catch(() => { try { speakGerman(vocab.german); } catch {} });
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center py-4"
            >
              <VideoPlayer
                title={lesson.videos[step.index].title}
                description={lesson.videos[step.index].description}
                duration={lesson.videos[step.index].duration}
                videoUrl={lesson.videos[step.index].videoUrl}
                learningObjectives={lesson.videos[step.index].learningObjectives?.slice(0, 3)}
                richContent={lesson.videos[step.index].richContent}
                script={getVideoScript(lesson.videos[step.index].id)}
              />
            </motion.div>
          )}

          {/* VOCABULARY — Phase 1: Intro, Phase 2: Challenge */}
          {step.type === 'vocab' && vocabPhase === 'intro' && (
            <motion.div
              key={`vocab-intro-${step.index}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 1.1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="flex-1 flex flex-col items-center justify-center p-4"
            >
              <div className="w-full max-w-md relative">
                {/* Decorative glow behind the card */}
                <div className="absolute inset-0 bg-[#d4a520]/10 blur-[100px] rounded-full" />
                
                <div className="relative bg-[#162416]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <span className="text-8xl font-black">{step.index + 1}</span>
                  </div>
                  
                  <div className="text-center mb-8">
                    <p className="text-[10px] font-black text-[#d4a520] uppercase tracking-[0.3em] mb-4">
                      New Vocabulary learned
                    </p>
                    <h2 className="text-5xl font-black text-white mb-2 tracking-tight">
                      {shownVocab[step.index].german}
                    </h2>
                    <p className="text-sm font-medium text-white/30 italic">
                      /{shownVocab[step.index].pronunciation}/
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">English</p>
                      <p className="text-lg font-bold text-white">{shownVocab[step.index].english}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Malayalam</p>
                      <p className="text-lg font-bold text-[#d4a520]">{shownVocab[step.index].malayalam}</p>
                    </div>
                  </div>

                  {shownVocab[step.index].example && (
                    <div className="bg-black/20 rounded-2xl p-5 border border-white/5 mb-2">
                       <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#d4a520]/10 flex items-center justify-center flex-shrink-0">
                             <Volume2 className="w-3.5 h-3.5 text-[#d4a520]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white/80 leading-relaxed italic">
                              &ldquo;{shownVocab[step.index].example}&rdquo;
                            </p>
                            {shownVocab[step.index].exampleTranslation && (
                              <p className="text-[11px] font-medium text-white/30 mt-1">
                                {shownVocab[step.index].exampleTranslation}
                              </p>
                            )}
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Interaction Row */}
                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { const v = shownVocab[step.index]; try { duckAmbience(2000); } catch {} playVocabAudio(v.id).catch(() => { try { speakGerman(v.german); } catch {} }); }}
                    className="w-16 h-16 rounded-[1.5rem] bg-[#d4a520] text-[#1b2d1b] flex items-center justify-center shadow-[0_0_20px_rgba(212,165,32,0.4)]"
                  >
                    <Volume2 className="w-7 h-7" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleBookmark(shownVocab[step.index].id)}
                    className="w-14 h-14 rounded-[1.2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl"
                  >
                    <Bookmark className={`w-6 h-6 ${(userProgress.bookmarkedVocab || []).includes(shownVocab[step.index].id) ? 'text-[#e94560] fill-[#e94560]' : 'text-white/40'}`} />
                  </motion.button>
                </div>
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

              {/* Encounter question — compact, game-like */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Type badge */}
                {vocabEncounter.type && (
                  <div className="flex justify-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d4a520]/10 text-[#d4a520] border border-[#d4a520]/20">
                      {vocabEncounter.type === 'type-it' ? '⌨️ Type It' :
                       vocabEncounter.type === 'listen-type' ? '👂 Listen' :
                       vocabEncounter.type === 'how-do-you-say' ? '🗣️ Say It' :
                       vocabEncounter.type === 'spot-the-error' ? '🔍 Find Error' :
                       vocabEncounter.type === 'mini-dialogue' ? '💬 Dialogue' :
                       '🧠 Quick Check'}
                    </span>
                  </div>
                )}

                <p className="text-base font-bold text-center mb-3 leading-snug">
                  {vocabEncounter.prompt}
                </p>

                {vocabEncounter.contextGerman && (
                  <div className="bg-[#d4a520]/10 border border-[#d4a520]/20 rounded-xl px-4 py-2.5 mb-3 text-center">
                    <p className="text-base font-semibold text-[#d4a520]">{vocabEncounter.contextGerman}</p>
                  </div>
                )}

                {/* Encounter input — typing or MCQ depending on type */}
                {(vocabEncounter.type === 'type-it' || vocabEncounter.type === 'listen-type') ? (
                  <div className="space-y-3">
                    {vocabEncounter.type === 'listen-type' && (
                      <div className="flex justify-center">
                        <motion.button whileTap={{ scale: 0.95 }}
                          onClick={() => { try { speakGerman(vocabEncounter.correctText || shownVocab[step.index].german); } catch {} }}
                          className="w-12 h-12 rounded-full bg-gradient-to-b from-[#d4a520] to-[#b8891a] text-white flex items-center justify-center text-lg">
                          🔊
                        </motion.button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text" value={typedAnswer} onChange={e => setTypedAnswer(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && typedAnswer.trim() && vocabAnswerState === 'default') {
                            const correct = (vocabEncounter.correctText || shownVocab[step.index].german).toLowerCase().trim();
                            const isRight = typedAnswer.toLowerCase().trim() === correct;
                            if (isRight) {
                              setVocabAnswerState('correct'); feedbackCorrect();
                              setTimeout(() => { setTypedAnswer(''); advanceFromVocab(); }, 1400);
                            } else {
                              setVocabAnswerState('wrong'); feedbackWrong();
                              setTimeout(() => { setTypedAnswer(''); advanceFromVocab(); }, 2000);
                            }
                          }
                        }}
                        placeholder={vocabEncounter.type === 'listen-type' ? 'Type what you heard...' : 'Type the German word...'}
                        disabled={vocabAnswerState !== 'default'} autoFocus
                        className={`flex-1 px-4 py-3 rounded-xl border-2 text-base bg-[var(--card-bg)] outline-none ${
                          vocabAnswerState === 'correct' ? 'border-[#27ae60]' : vocabAnswerState === 'wrong' ? 'border-[#c0392b]' : 'border-[var(--card-border)] focus:border-[#d4a520]'
                        }`}
                      />
                      <GameButton onClick={() => {
                        if (!typedAnswer.trim() || vocabAnswerState !== 'default') return;
                        const correct = (vocabEncounter.correctText || shownVocab[step.index].german).toLowerCase().trim();
                        const isRight = typedAnswer.toLowerCase().trim() === correct;
                        if (isRight) {
                          setVocabAnswerState('correct'); feedbackCorrect();
                          setTimeout(() => { setTypedAnswer(''); advanceFromVocab(); }, 1400);
                        } else {
                          setVocabAnswerState('wrong'); feedbackWrong();
                          setTimeout(() => { setTypedAnswer(''); advanceFromVocab(); }, 2000);
                        }
                      }} disabled={vocabAnswerState !== 'default' || !typedAnswer.trim()} variant="primary">Go</GameButton>
                    </div>
                    {vocabAnswerState === 'wrong' && (
                      <p className="text-xs text-center text-[var(--foreground)]/50">
                        Answer: <span className="text-[#27ae60] font-bold">{vocabEncounter.correctText || shownVocab[step.index].german}</span>
                      </p>
                    )}
                  </div>
                ) : (
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
                              setTimeout(() => advanceFromVocab(), 1400);
                            } else {
                              setVocabAnswerState('wrong');
                              feedbackWrong();
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
                )}

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

          {/* MINI-GAME — quick vocab reinforcement before exercises */}
          {step.type === 'mini-game' && (
            <motion.div
              key="mini-game"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: 'spring', damping: 18 }}
              className="flex-1 flex flex-col justify-center"
            >
              {(() => {
                // Theme-based mini-game per module
                const mid = module?.id || 1;
                const lessonIdx = parseInt(lessonId.split('-')[1] || '1');
                // Rotate within module: each lesson gets a different type
                const types: ('speed-tap' | 'listen-pick' | 'quick-sort')[] = ['speed-tap', 'listen-pick', 'quick-sort'];
                const gameType = types[(mid + lessonIdx) % types.length];

                // Theme-based categories for quick-sort
                const categoryMap: Record<number, [string, string]> = {
                  1: ['Formal', 'Informal'],       // Greetings
                  2: ['Persönlich', 'Beruflich'],   // Personal vs Professional
                  3: ['Zahlen', 'Zeit'],            // Numbers vs Time
                  4: ['Familie', 'Freunde'],        // Family vs Friends
                  5: ['Morgens', 'Abends'],         // Morning vs Evening
                  6: ['Essen', 'Trinken'],          // Food vs Drink
                  7: ['Teuer', 'Günstig'],          // Expensive vs Cheap
                  8: ['Küche', 'Wohnzimmer'],       // Kitchen vs Living room
                  9: ['Bus', 'Zug'],                // Bus vs Train
                };
                const categories = categoryMap[mid] || ['A-L', 'M-Z'];

                // Assign categories based on vocab index (odd/even)
                const items = shownVocab.map((v, i) => ({
                  german: v.german,
                  english: v.english,
                  category: i % 2 === 0 ? categories[0] : categories[1],
                }));

                return (
                  <MiniGameEmbed
                    type={gameType}
                    items={items}
                    categories={categories}
                    onComplete={(score) => {
                      if (score > 0) addXP(score * 3);
                      setTimeout(() => goNext(), 1500);
                    }}
                    timeLimit={25}
                  />
                );
              })()}
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
              animate={
                answerState === 'incorrect' ? { opacity: 1, x: [0, -8, 8, -4, 4, 0] } :
                answerState === 'correct' ? { opacity: 1, x: 0, scale: [1, 1.02, 1] } :
                { opacity: 1, x: 0 }
              }
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

              {/* Question with visual type identity */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Exercise type badge */}
                {(() => {
                  const typeThemes: Record<string, { icon: string; label: string; color: string }> = {
                    'multiple-choice': { icon: '📝', label: 'Pick One', color: '#d4a520' },
                    'fill-blank': { icon: '✏️', label: 'Fill In', color: '#d4a520' },
                    'dictation': { icon: '🎧', label: 'Listen & Type', color: '#3b82f6' },
                    'ordering': { icon: '🧩', label: 'Build It', color: '#27ae60' },
                    'free-text': { icon: '✍️', label: 'Write It', color: '#9333ea' },
                    'matching': { icon: '🔗', label: 'Match Up', color: '#06b6d4' },
                    'speaking': { icon: '🎤', label: 'Say It', color: '#e94560' },
                    'type-answer': { icon: '⌨️', label: 'Type It', color: '#f59e0b' },
                  };
                  const theme = typeThemes[allExercises[step.index].type] || typeThemes['multiple-choice'];
                  return (
                    <div className="flex justify-center mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: `${theme.color}15`, color: theme.color, border: `1px solid ${theme.color}30` }}>
                        {theme.icon} {theme.label}
                      </span>
                    </div>
                  );
                })()}

                {/* Question — chat bubble style for dialogues, card style for others */}
                {allExercises[step.index].question.includes('🧑') || allExercises[step.index].question.includes('Person') ? (
                  <div className="mb-4 space-y-2 max-w-sm mx-auto w-full">
                    {allExercises[step.index].question.split('\n').filter(Boolean).map((line, i) => {
                      const isQuestion = line.includes('🧑') || line.includes('Person A') || line.includes('says');
                      return (
                        <div key={i} className={`flex ${isQuestion ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                            isQuestion
                              ? 'bg-[var(--foreground)]/8 rounded-bl-sm'
                              : 'bg-[#d4a520]/15 border border-[#d4a520]/20 rounded-br-sm'
                          }`}>
                            {highlightGerman(line.replace(/🧑‍?🦱?/g, '').replace(/Person [AB]:?\s*/g, '').trim())}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h2 className="text-lg font-bold text-center mb-4 leading-snug px-2">
                    {highlightGerman(allExercises[step.index].question)}
                  </h2>
                )}

                {/* ═══ GAME-BASED EXERCISE RENDERING ═══ */}
                {(() => {
                  const exercise = allExercises[step.index];
                  const correctStr = typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : exercise.correctAnswer[0];
                  const correctArr = Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer : [exercise.correctAnswer];

                  const handleGameResult = (correct: boolean) => {
                    setTotalAttempted(prev => prev + 1);
                    if (correct) {
                      const newCombo = combo + 1;
                      setCombo(newCombo);
                      setMaxCombo(prev => Math.max(prev, newCombo));
                      setCorrectCount(prev => prev + 1);
                      setAnswerState('correct');
                      setKuttanMsg(getRandomMessage('correct'));
                      feedbackCombo(newCombo);
                      const surpriseEvent = checkForSurprise('correct_answer');
                      if (surpriseEvent) { setSurprise(surpriseEvent); setTimeout(() => setSurprise(null), 4000); }
                      setTimeout(() => goNext(), 1000);
                    } else {
                      if (combo > 2) feedbackComboBreak(); else feedbackWrong();
                      setCombo(0);
                      setAnswerState('incorrect');
                      setKuttanMsg(getRandomMessage('wrong'));
                      setTimeout(() => goNext(), 1800);
                    }
                  };

                  // TYPE-ANSWER & FREE-TEXT → WordScramble
                  if (exercise.type === 'type-answer' || exercise.type === 'free-text') {
                    return <WordScramble hint={exercise.questionGerman || ''} answer={correctStr.trim()} onResult={handleGameResult} />;
                  }

                  // DICTATION → FallingWords
                  if (exercise.type === 'dictation') {
                    const distractors = (exercise.options || []).filter(o => o !== correctStr).slice(0, 3);
                    // If no options, create from other exercise answers in this lesson
                    const fallbackDistractors = distractors.length >= 2 ? distractors :
                      allExercises.filter(e => e.id !== exercise.id).map(e => typeof e.correctAnswer === 'string' ? e.correctAnswer : e.correctAnswer[0]).filter(Boolean).slice(0, 3);
                    return <FallingWords correctWord={correctStr.trim()} distractors={fallbackDistractors} hint={exercise.question} onResult={handleGameResult} />;
                  }

                  // ORDERING → WordScramble (spell from scrambled letters) or tap-to-order
                  if (exercise.type === 'ordering') {
                    const sentence = correctArr.join(' ');
                    return <WordScramble hint="Build the correct sentence:" answer={sentence} onResult={handleGameResult} />;
                  }

                  // MATCHING → BubblePop
                  if (exercise.type === 'matching' && Array.isArray(exercise.correctAnswer)) {
                    return <BubblePop leftItems={exercise.options || []} rightItems={exercise.correctAnswer as string[]} onResult={handleGameResult} />;
                  }

                  // FILL-BLANK → WordBank
                  if (exercise.type === 'fill-blank' && exercise.options?.length) {
                    return <WordBank sentence={exercise.question} options={exercise.options} correctAnswer={correctStr} onResult={handleGameResult} />;
                  }

                  // SPEAKING → keep SpeakButton (already game-like)
                  if (exercise.type === 'speaking') {
                    return (
                      <div className="space-y-4 flex flex-col items-center">
                        <div className="bg-[#d4a520]/10 border border-[#d4a520]/20 rounded-xl px-4 py-3 text-center">
                          <p className="text-lg font-bold text-[#d4a520]">{correctStr}</p>
                        </div>
                        <SpeakButton expectedText={correctStr} onResult={(_, __, isMatch) => handleGameResult(isMatch)} size="lg" label="Say it!" />
                        <button onClick={() => handleGameResult(false)} className="text-xs text-[var(--foreground)]/30 underline">Skip</button>
                      </div>
                    );
                  }

                  // MCQ / DEFAULT → SwipeCards
                  if (exercise.options?.length) {
                    return <SwipeCards question={exercise.question} options={exercise.options} correctAnswer={correctStr} onResult={handleGameResult} />;
                  }

                  // Ultimate fallback — WordBank style
                  return <WordScramble hint={exercise.question} answer={correctStr.trim()} onResult={handleGameResult} />;
                })()}



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
        && step.type !== 'decision-point' && step.type !== 'mini-game'
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
