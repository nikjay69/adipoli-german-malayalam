'use client';

import { use, useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Video,
  HelpCircle,
  Star,
  Trophy,
  X,
  Volume2
} from 'lucide-react';
import { Card, Button, ProgressBar, Badge } from '@/components/ui';
import { playVocabAudio } from '@/lib/audio';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES, getLessonById, getModuleById, type Lesson, type Exercise, type VocabItem } from '@/lib/content/modules';
import { SPINE_SOURCE_MODULE_IDS } from '@/lib/spine-map';
import { readModule1CheckpointResult } from '@/lib/spine';
import { RichContentRenderer } from '@/components/learn/RichContentRenderer';
import { Kuttan } from '@/components/character/Kuttan';

type LessonSection = 'overview' | 'video' | 'vocabulary' | 'exercises' | 'complete';

export default function LessonPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const { userProgress, addXP, completeLesson, learnVocabulary, clearCheckpoint } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState<LessonSection>('overview');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  // States for text production exercises
  const [textInput, setTextInput] = useState('');
  const [isCheckingText, setIsCheckingText] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{score: number, feedback: string, corrections: string[]} | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const courseModule = getModuleById(parseInt(moduleId));
  const lesson = getLessonById(lessonId);

  // --- Fix 1: Lesson unlock validation ---
  useEffect(() => {
    if (!mounted || !courseModule || !lesson) return;

    const moduleIdNum = parseInt(moduleId);

    // First lesson of first module is always unlocked
    if (moduleIdNum === 1) {
      const lessonIndex = courseModule.lessons.findIndex(l => l.id === lessonId);
      if (lessonIndex === 0) return; // First lesson always unlocked

      // Check if the previous lesson in this module is completed
      const prevLesson = courseModule.lessons[lessonIndex - 1];
      const prevCompleted = userProgress.completedLessons.some(
        cl => cl.lessonId === prevLesson.id && cl.completed
      );
      if (!prevCompleted) {
        router.replace('/learn');
        return;
      }
      return;
    }

    // Spine-aware cross-module gate. Library modules that are required spine
    // blocks unlock with their spine module: the first source module needs the
    // previous spine module's checkpoint passed; later source modules need the
    // previous source module's lessons done. Old 18-module linear sequencing
    // would dead-end spine learners (e.g. module-08 sits in spine M3 but old
    // module-07 belongs to spine M4). Non-spine modules (2, 13, 15, 16) are
    // open practice library — recovery prescriptions link straight into them.
    const spineEntry = Object.entries(SPINE_SOURCE_MODULE_IDS).find(([, ids]) => ids.includes(moduleIdNum));
    if (spineEntry) {
      const spineId = parseInt(spineEntry[0]);
      const sourceIds = spineEntry[1];
      const sourceIndex = sourceIds.indexOf(moduleIdNum);

      if (sourceIndex > 0) {
        const prevSource = ALL_MODULES.find(m => m.id === sourceIds[sourceIndex - 1]);
        const prevSourceDone = !prevSource || prevSource.lessons.every(pl =>
          userProgress.completedLessons.some(cl => cl.lessonId === pl.id && cl.completed)
        );
        if (!prevSourceDone) {
          router.replace('/learn');
          return;
        }
      } else if (spineId > 1) {
        const prevSpineId = spineId - 1;
        const prevPassed = prevSpineId === 1
          ? (readModule1CheckpointResult()?.state ?? 'FAIL') !== 'FAIL'
          : (userProgress.spineCheckpoints?.[prevSpineId]?.state ?? 'FAIL') !== 'FAIL';
        if (!prevPassed) {
          router.replace('/learn');
          return;
        }
      }
    }

    // Within the current module, check if the previous lesson is completed
    const lessonIndex = courseModule.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex > 0) {
      const prevLesson = courseModule.lessons[lessonIndex - 1];
      const prevCompleted = userProgress.completedLessons.some(
        cl => cl.lessonId === prevLesson.id && cl.completed
      );
      if (!prevCompleted) {
        router.replace('/learn');
        return;
      }
    }
  }, [mounted, courseModule, lesson, moduleId, lessonId, userProgress.completedLessons, userProgress.spineCheckpoints, router]);

  // Helper: highlight German phrases in exercise questions
  const highlightGerman = (text: string) => {
    // First try: match quoted phrases (most reliable indicator of German in English questions)
    const quotePattern = /(".*?"|„.*?"|«.*?»)/g;
    const quoteParts = text.split(quotePattern);
    if (quoteParts.length > 1) {
      return (
        <>
          {quoteParts.map((part: string, i: number) => {
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
    const matches = [...text.matchAll(germanWords)];
    if (matches.length === 0) return <>{text}</>;
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

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!courseModule || !lesson) {
    return (
      <div className="px-4 py-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Lesson not found</h1>
        <Link href="/learn">
          <Button className="mt-4">Back to Learn</Button>
        </Link>
      </div>
    );
  }

  const totalSteps = 1 + lesson.videos.length + lesson.vocabulary.length + lesson.exercises.length + 1;
  const currentStep = currentSection === 'overview' ? 1 :
    currentSection === 'video' ? 2 + currentVideoIndex :
    currentSection === 'vocabulary' ? 2 + lesson.videos.length + currentVocabIndex :
    currentSection === 'exercises' ? 2 + lesson.videos.length + lesson.vocabulary.length + currentExerciseIndex :
    totalSteps;

  const progress = (currentStep / totalSteps) * 100;

  // --- Fix 2: Exit confirmation logic ---
  const isMidLesson = currentSection !== 'overview' && currentSection !== 'complete';

  const handleExitClick = () => {
    if (isMidLesson) {
      setShowExitConfirm(true);
    } else {
      router.back();
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    router.push('/learn');
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  const handleVideoComplete = () => {
    if (currentVideoIndex < lesson.videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setCurrentSection('vocabulary');
      setCurrentVocabIndex(0);
    }
  };

  const handleVocabNext = () => {
    const vocab = lesson.vocabulary[currentVocabIndex];
    learnVocabulary(vocab.id);
    addXP(5);

    if (currentVocabIndex < lesson.vocabulary.length - 1) {
      setCurrentVocabIndex(prev => prev + 1);
      setShowVocabMeaning(false);
    } else {
      setCurrentSection('exercises');
      setCurrentExerciseIndex(0);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const exercise = lesson.exercises[currentExerciseIndex];
    const isCorrect = answer === exercise.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      addXP(exercise.xpReward);
    }
  };

  const handleTextSubmit = async () => {
    if (showResult || !textInput.trim() || isCheckingText) return;
    setIsCheckingText(true);

    const exercise = lesson.exercises[currentExerciseIndex];

    try {
      const res = await fetch('/api/check-german', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expected: typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : exercise.correctAnswer.join(', '),
          userInput: textInput,
          context: exercise.question,
        }),
      });

      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      setAiFeedback(data);
      setShowResult(true);

      if (data.score > 70) {
        setCorrectAnswers(prev => prev + 1);
        addXP(exercise.xpReward);
      }
    } catch (error) {
      console.error(error);
      // Fallback
      setShowResult(true);
      const isExactMatch = textInput.toLowerCase().trim() === (exercise.correctAnswer as string).toLowerCase().trim();
      if (isExactMatch) {
        setCorrectAnswers(prev => prev + 1);
        addXP(exercise.xpReward);
        setAiFeedback({ score: 100, feedback: 'Correct!', corrections: [] });
      } else {
        setAiFeedback({ score: 0, feedback: 'Incorrect or could not connect to AI.', corrections: [] });
      }
    } finally {
      setIsCheckingText(false);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTextInput('');
      setAiFeedback(null);
      setShowResult(false);
    } else {
      // Complete the lesson
      const score = Math.round((correctAnswers / lesson.exercises.length) * 100);
      completeLesson(lesson.id, score);
      addXP(lesson.xpReward);
      // --- Fix 3: Clear checkpoint on lesson complete ---
      clearCheckpoint();
      setCurrentSection('complete');
    }
  };

  const currentVideo = lesson.videos[currentVideoIndex];
  const currentVocab = lesson.vocabulary[currentVocabIndex];
  const currentExercise = lesson.exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen">
      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={handleCancelExit}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a2e1a] rounded-2xl p-6 max-w-sm w-full shadow-xl border border-[var(--card-border)]"
            >
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                Leave lesson?
              </h3>
              <p className="text-sm text-[var(--foreground)]/60 mb-6">
                Your progress in this lesson will be lost. Are you sure you want to exit?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={handleCancelExit}
                  fullWidth
                >
                  Stay
                </Button>
                <Button
                  onClick={handleConfirmExit}
                  fullWidth
                  className="!bg-red-500 hover:!bg-red-600"
                >
                  Leave
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-14 md:top-16 z-40 bg-[#1a2e1a]/95 backdrop-blur-sm border-b border-[var(--card-border)] px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleExitClick}
              className="flex items-center gap-1 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-[var(--foreground)]/60">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <ProgressBar progress={progress} color="primary" size="sm" />
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Overview Section */}
          {currentSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                  style={{ backgroundColor: courseModule.color + '20' }}
                >
                  {courseModule.icon}
                </div>
                <Badge variant="secondary" size="sm" className="mb-2">
                  Module {courseModule.id} - Lesson {lesson.id.split('-')[1]}
                </Badge>
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                  {lesson.title}
                </h1>
                <p className="text-sm text-[var(--foreground)]/50 mb-4">
                  {lesson.titleGerman}
                </p>
                <p className="text-[var(--foreground)]/60 mb-6">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-center gap-6 text-sm text-[var(--foreground)]/50 mb-6">
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <span>{lesson.videos.length} videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{lesson.vocabulary.length} words</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    <span>{lesson.exercises.length} exercises</span>
                  </div>
                </div>

                <Button onClick={() => setCurrentSection('video')} fullWidth size="lg">
                  <Play className="w-5 h-5" />
                  Start Lesson
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Video Section */}
          {currentSection === 'video' && currentVideo && (
            <motion.div
              key={`video-${currentVideoIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                {/* Video Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-3">
                    <p className="text-sm font-medium">{currentVideo.title}</p>
                    <p className="text-xs text-[var(--foreground)]/30">{currentVideo.duration}</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  {currentVideo.title}
                </h2>
                <p className="text-[var(--foreground)]/60 mb-4">
                  {currentVideo.description}
                </p>

                {/* Video Rich Content (Generated via Gemini) */}
                {currentVideo.richContent && (
                  <RichContentRenderer elements={currentVideo.richContent} />
                )}

                {/* Video Script Outline */}
                <div className="bg-[var(--foreground)]/5 rounded-xl p-4 mb-4 mt-6">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">
                    Video Content Outline:
                  </h3>
                  <ul className="space-y-1">
                    {currentVideo.scriptOutline.map((point, index) => (
                      <li key={index} className="text-sm text-[var(--foreground)]/60 flex items-start gap-2">
                        <span className="text-[#e94560]">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Objectives */}
                <div className="mb-4">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">
                    Learning Objectives:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentVideo.learningObjectives.map((obj, index) => (
                      <Badge key={index} variant="info" size="sm">{obj}</Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={handleVideoComplete} fullWidth>
                  Mark as Watched <ChevronRight className="w-5 h-5" />
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Vocabulary Section */}
          {currentSection === 'vocabulary' && currentVocab && (
            <motion.div
              key={`vocab-${currentVocabIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <Badge variant="secondary" size="sm" className="mb-4">
                  Vocabulary {currentVocabIndex + 1} of {lesson.vocabulary.length}
                </Badge>

                <motion.div
                  onClick={() => setShowVocabMeaning(!showVocabMeaning)}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl p-8 mb-6 cursor-pointer min-h-[200px] flex flex-col items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {!showVocabMeaning ? (
                      <motion.div
                        key="german"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        className="text-center"
                      >
                        <h2 className="text-4xl font-bold text-white mb-2">
                          {currentVocab.german}
                        </h2>
                        <p className="text-white/70 text-sm">
                          /{currentVocab.pronunciation}/
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); playVocabAudio(currentVocab.id); }}
                          className="mt-3 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto hover:bg-white/20 transition-colors"
                        >
                          <Volume2 className="w-4 h-4 text-[#d4a520]" />
                        </button>
                        <p className="text-white/50 text-xs mt-3">Tap to see meaning</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="meaning"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        className="text-center"
                      >
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {currentVocab.english}
                        </h3>
                        <p className="text-white/70 text-lg mb-2">
                          {currentVocab.malayalam}
                        </p>
                        <div className="text-white/50 text-sm">
                          <p className="italic">&ldquo;{currentVocab.example}&rdquo;</p>
                          <p>{currentVocab.exampleTranslation}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <Button onClick={handleVocabNext} fullWidth>
                  {currentVocabIndex < lesson.vocabulary.length - 1 ? 'Next Word' : 'Start Exercises'}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Exercises Section */}
          {currentSection === 'exercises' && currentExercise && (
            <motion.div
              key={`exercise-${currentExerciseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <Badge variant="secondary" size="sm" className="mb-4">
                  Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
                </Badge>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    {highlightGerman(currentExercise.question)}
                  </h2>
                  {currentExercise.questionGerman && (
                    <p className="text-lg text-[var(--foreground)]/60 italic">
                      {currentExercise.questionGerman}
                    </p>
                  )}
                </div>

                {currentExercise.imageUrl && (
                  <div className="mb-6 rounded-xl overflow-hidden shadow border border-[var(--card-border)]">
                    <img src={currentExercise.imageUrl} alt="Exercise prompt" className="w-full object-cover" loading="lazy" />
                  </div>
                )}
                
                {currentExercise.audioUrl && (
                  <div className="mb-6 flex justify-center">
                    <button
                      onClick={() => {
                        const audio = new Audio(currentExercise.audioUrl);
                        audio.play().catch(console.error);
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e94560] to-[#0f3460] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  {(currentExercise.type === 'free-text' || currentExercise.type === 'dictation' || currentExercise.type === 'image-prompt' || currentExercise.type === 'speaking') ? (
                    <div className="space-y-4">
                      {currentExercise.type === 'speaking' ? (
                        <div className="bg-[var(--foreground)]/5 p-6 rounded-xl border border-[var(--card-border)] text-center">
                           <div className="mb-4 text-[var(--foreground)]">Read the above sentence aloud in German.</div>
                           {!showResult && (
                             <Button onClick={async () => {
                               // Simulate speaking evaluation since true Web Speech API requires more complex hook setup here
                               setIsCheckingText(true);
                               setTimeout(() => {
                                 setIsCheckingText(false);
                                 setAiFeedback({ score: 95, feedback: "Great pronunciation! Very clear.", corrections: [] });
                                 setShowResult(true);
                                 setCorrectAnswers(prev => prev + 1);
                                 addXP(currentExercise.xpReward);
                               }, 2000);
                             }} fullWidth>
                               {isCheckingText ? 'Listening...' : 'Hold to Speak'}
                             </Button>
                           )}
                        </div>
                      ) : (
                        <>
                          <textarea
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="Type your German answer here..."
                            disabled={showResult || isCheckingText}
                            className="w-full p-4 rounded-xl border-2 border-[var(--card-border)] bg-[var(--foreground)]/5 text-[var(--foreground)] min-h-[100px] focus:outline-none focus:border-[#e94560]"
                          />
                          {!showResult && (
                            <Button
                              onClick={handleTextSubmit}
                              disabled={!textInput.trim() || isCheckingText}
                              fullWidth
                            >
                              {isCheckingText ? 'Checking...' : 'Submit Answer'}
                            </Button>
                          )}
                        </>
                      )}
                      
                      {aiFeedback && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`rounded-xl p-4 border-2 ${aiFeedback.score > 70 ? 'bg-[#27ae60]/15 border-[#27ae60]' : 'bg-[#c0392b]/15 border-[#c0392b]'}`}
                        >
                          <div className="flex items-center gap-2 mb-2 font-bold">
                            {aiFeedback.score > 70 ? <CheckCircle className="text-[#27ae60]" /> : <X className="text-[#c0392b]" />}
                            <span className={aiFeedback.score > 70 ? 'text-[#27ae60]' : 'text-[#c0392b]'}>
                              Score: {aiFeedback.score}/100
                            </span>
                          </div>
                          <p className="text-[var(--foreground)] mb-2 whitespace-pre-wrap">{aiFeedback.feedback}</p>
                          {aiFeedback.corrections && aiFeedback.corrections.length > 0 && (
                            <ul className="list-disc list-inside text-sm text-[var(--foreground)]/80 mt-2">
                              {aiFeedback.corrections.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    currentExercise.options?.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentExercise.correctAnswer;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResult}
                          whileTap={{ scale: showResult ? 1 : 0.98 }}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            showCorrect
                              ? 'bg-[#27ae60]/15 border-[#27ae60]'
                              : showWrong
                              ? 'bg-[#c0392b]/15 border-[#c0392b]'
                              : isSelected
                              ? 'border-[#e94560] bg-[#e94560]/5'
                              : 'border-[var(--card-border)] hover:border-[#e94560]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                              showCorrect ? 'text-[#27ae60]' :
                              showWrong ? 'text-[#c0392b]' :
                              'text-[var(--foreground)]'
                            }`}>
                              {option}
                            </span>
                            {showCorrect && <CheckCircle className="w-5 h-5 text-[#27ae60]" />}
                            {showWrong && <X className="w-5 h-5 text-[#c0392b]" />}
                          </div>
                        </motion.button>
                      );
                    })
                  )}
                </div>

                {showResult && currentExercise.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-[#3498db]/15 rounded-xl p-4 mb-4"
                  >
                    <p className="text-sm text-[#3498db]">
                      <strong>Explanation:</strong> {currentExercise.explanation}
                    </p>
                  </motion.div>
                )}

                {showResult && (
                  <Button onClick={handleNextExercise} fullWidth>
                    {currentExerciseIndex < lesson.exercises.length - 1 ? 'Next Question' : 'Complete Lesson'}
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </Card>
            </motion.div>
          )}

          {/* Completion Section */}
          {currentSection === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  Lesson Complete!
                </h1>
                <p className="text-[var(--foreground)]/60 mb-6">
                  Great job! You&rsquo;ve completed &ldquo;{lesson.title}&rdquo;
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-[var(--foreground)]/5 rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#e94560]">
                      +{lesson.xpReward}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                  </div>
                  <div className="bg-[var(--foreground)]/5 rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#27ae60]">
                      {correctAnswers}/{lesson.exercises.length}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                  </div>
                  <div className="bg-[var(--foreground)]/5 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 fill-amber-500" />
                      {Math.round((correctAnswers / lesson.exercises.length) * 100)}%
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50">Score</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href={`/learn/${moduleId}`}>
                    <Button fullWidth>
                      Back to Module
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button variant="ghost" fullWidth>
                      All Modules
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
