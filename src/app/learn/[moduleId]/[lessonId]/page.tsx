'use client';

import { use, useState, useEffect } from 'react';
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
  X
} from 'lucide-react';
import { Card, Button, ProgressBar, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES, getLessonById, getModuleById, type Lesson, type Exercise, type VocabItem } from '@/lib/content/modules';

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const module = getModuleById(parseInt(moduleId));
  const lesson = getLessonById(lessonId);

  // --- Fix 1: Lesson unlock validation ---
  useEffect(() => {
    if (!mounted || !module || !lesson) return;

    const moduleIdNum = parseInt(moduleId);

    // First lesson of first module is always unlocked
    if (moduleIdNum === 1) {
      const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
      if (lessonIndex === 0) return; // First lesson always unlocked

      // Check if the previous lesson in this module is completed
      const prevLesson = module.lessons[lessonIndex - 1];
      const prevCompleted = userProgress.completedLessons.some(
        cl => cl.lessonId === prevLesson.id && cl.completed
      );
      if (!prevCompleted) {
        router.replace('/learn');
        return;
      }
      return;
    }

    // For modules after the first: check if previous module is fully complete
    const prevModule = ALL_MODULES.find(m => m.id === moduleIdNum - 1);
    if (prevModule) {
      const allPrevLessonsDone = prevModule.lessons.every(pl =>
        userProgress.completedLessons.some(cl => cl.lessonId === pl.id && cl.completed)
      );
      if (!allPrevLessonsDone) {
        router.replace('/learn');
        return;
      }
    }

    // Within the current module, check if the previous lesson is completed
    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex > 0) {
      const prevLesson = module.lessons[lessonIndex - 1];
      const prevCompleted = userProgress.completedLessons.some(
        cl => cl.lessonId === prevLesson.id && cl.completed
      );
      if (!prevCompleted) {
        router.replace('/learn');
        return;
      }
    }
  }, [mounted, module, lesson, moduleId, lessonId, userProgress.completedLessons, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!module || !lesson) {
    return (
      <div className="px-4 py-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lesson not found</h1>
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

  const handleNextExercise = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedAnswer(null);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Leave lesson?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
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
      <div className="sticky top-14 md:top-16 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleExitClick}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
                  style={{ backgroundColor: module.color + '20' }}
                >
                  {module.icon}
                </div>
                <Badge variant="secondary" size="sm" className="mb-2">
                  Module {module.id} - Lesson {lesson.id.split('-')[1]}
                </Badge>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {lesson.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {lesson.titleGerman}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
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
                    <p className="text-xs text-gray-300">{currentVideo.duration}</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentVideo.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {currentVideo.description}
                </p>

                {/* Video Script Outline */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Video Content Outline:
                  </h3>
                  <ul className="space-y-1">
                    {currentVideo.scriptOutline.map((point, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-[#e94560]">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Objectives */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
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
                        <p className="text-white/50 text-xs mt-4">Tap to see meaning</p>
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
                          <p className="italic">"{currentVocab.example}"</p>
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

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentExercise.question}
                </h2>

                <div className="space-y-3 mb-6">
                  {currentExercise.options?.map((option, index) => {
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
                            ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20'
                            : showWrong
                            ? 'bg-red-50 border-red-500 dark:bg-red-900/20'
                            : isSelected
                            ? 'border-[#e94560] bg-[#e94560]/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#e94560]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            showCorrect ? 'text-emerald-700 dark:text-emerald-300' :
                            showWrong ? 'text-red-700 dark:text-red-300' :
                            'text-gray-900 dark:text-white'
                          }`}>
                            {option}
                          </span>
                          {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                          {showWrong && <X className="w-5 h-5 text-red-500" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {showResult && currentExercise.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4"
                  >
                    <p className="text-sm text-blue-800 dark:text-blue-200">
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

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Lesson Complete!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Great job! You've completed "{lesson.title}"
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#e94560]">
                      +{lesson.xpReward}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">XP Earned</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-emerald-500">
                      {correctAnswers}/{lesson.exercises.length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 fill-amber-500" />
                      {Math.round((correctAnswers / lesson.exercises.length) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
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
