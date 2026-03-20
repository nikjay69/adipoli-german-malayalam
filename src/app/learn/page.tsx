'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle, Clock, Star } from 'lucide-react';
import { Card, ProgressBar, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';

export default function LearnPage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learn German</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Master German A1 step by step
        </p>
      </motion.div>

      <div className="space-y-6">
        {ALL_MODULES.map((module, moduleIndex) => {
          const moduleLessons = module.lessons.length;
          const completedModuleLessons = userProgress.completedLessons.filter(l =>
            module.lessons.some(ml => ml.id === l.lessonId)
          ).length;
          const moduleProgress = (completedModuleLessons / moduleLessons) * 100;

          // Check if previous module is complete
          const isPreviousModuleComplete = moduleIndex === 0 ||
            ALL_MODULES[moduleIndex - 1].lessons.every(
              l => userProgress.completedLessons.some(cl => cl.lessonId === l.id)
            );

          const isModuleLocked = !isPreviousModuleComplete;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIndex * 0.1 }}
            >
              <Card className={`${isModuleLocked ? 'opacity-60' : ''}`}>
                {/* Module Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: module.color + '20' }}
                  >
                    {isModuleLocked ? <Lock className="w-6 h-6 text-gray-400" /> : module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Module {module.id}: {module.title}
                      </h2>
                      {moduleProgress === 100 && (
                        <Badge variant="success" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" /> Complete
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {module.totalHours} hours
                      </span>
                      <span>{module.lessons.length} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {completedModuleLessons}/{moduleLessons} lessons
                    </span>
                  </div>
                  <ProgressBar
                    progress={moduleProgress}
                    color={moduleProgress === 100 ? 'success' : 'primary'}
                    size="md"
                  />
                </div>

                {/* Lessons List */}
                {!isModuleLocked && (
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = userProgress.completedLessons.some(
                        l => l.lessonId === lesson.id
                      );
                      const completedLesson = userProgress.completedLessons.find(
                        l => l.lessonId === lesson.id
                      );

                      // Check if previous lesson is complete
                      const isPreviousLessonComplete = lessonIndex === 0 ||
                        userProgress.completedLessons.some(
                          l => l.lessonId === module.lessons[lessonIndex - 1].id
                        );

                      const isLessonLocked = !isPreviousLessonComplete;

                      return (
                        <Link
                          key={lesson.id}
                          href={isLessonLocked ? '#' : `/learn/${module.id}/${lesson.id}`}
                        >
                          <motion.div
                            whileHover={!isLessonLocked ? { x: 4 } : undefined}
                            className={`p-3 rounded-xl border transition-all ${
                              isLessonLocked
                                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-50'
                                : isCompleted
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#e94560]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isLessonLocked
                                  ? 'bg-gray-200 dark:bg-gray-700'
                                  : isCompleted
                                  ? 'bg-emerald-500'
                                  : 'bg-[#e94560]'
                              }`}>
                                {isLessonLocked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <span className="text-white text-sm font-bold">{lessonIndex + 1}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className={`font-medium ${
                                  isLessonLocked ? 'text-gray-400' : 'text-gray-900 dark:text-white'
                                }`}>
                                  {lesson.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {lesson.titleGerman}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {lesson.duration}
                                </span>
                                {isCompleted && completedLesson && (
                                  <div className="flex items-center gap-0.5 text-amber-500">
                                    <Star className="w-3 h-3 fill-amber-500" />
                                    <span className="text-xs font-medium">{completedLesson.score}%</span>
                                  </div>
                                )}
                                {!isLessonLocked && !isCompleted && (
                                  <Badge variant="success" size="sm">+{lesson.xpReward} XP</Badge>
                                )}
                              </div>
                              <ChevronRight className={`w-4 h-4 ${
                                isLessonLocked ? 'text-gray-300' : 'text-gray-400'
                              }`} />
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Locked Module Message */}
                {isModuleLocked && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Complete Module {moduleIndex} to unlock</p>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
