'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle, Clock, Star } from 'lucide-react';
import { Card, ProgressBar, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import type { LessonProgress } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import type { Module } from '@/lib/content/modules';
import { isModuleUnlocked, OPTIONAL_MODULE_IDS } from '@/lib/curriculum';

// ─── Mastery Calculation ────────────────────────────────────────
function getModuleMastery(module: Module, completedLessons: LessonProgress[]): 'none' | 'bronze' | 'silver' | 'gold' {
  const moduleLessonIds = module.lessons.map(l => l.id);
  const completed = completedLessons.filter(cl => moduleLessonIds.includes(cl.lessonId));

  if (completed.length === 0) return 'none';
  if (completed.length < moduleLessonIds.length) return 'bronze'; // started but not finished

  const avgScore = completed.reduce((sum, cl) => sum + cl.score, 0) / completed.length;
  if (avgScore >= 90) return 'gold';
  if (avgScore >= 70) return 'silver';
  return 'bronze';
}

const MASTERY_CONFIG = {
  none:   { emoji: '',   label: '',       border: '' },
  bronze: { emoji: '\uD83E\uDD49', label: 'Bronze', border: 'ring-2 ring-amber-700/50' },
  silver: { emoji: '\uD83E\uDD48', label: 'Silver', border: 'ring-2 ring-gray-400/50' },
  gold:   { emoji: '\uD83E\uDD47', label: 'Gold',   border: 'ring-2 ring-yellow-400/50' },
} as const;

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
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Learn German</h1>
        <p className="text-[var(--foreground)]/50 mt-1">
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

          const isModuleLocked = !isModuleUnlocked(module.id, userProgress.completedLessons);
          const isOptionalBridge = OPTIONAL_MODULE_IDS.has(module.id);
          const mastery = getModuleMastery(module, userProgress.completedLessons);
          const masteryInfo = MASTERY_CONFIG[mastery];

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
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl${moduleProgress === 100 ? ' animate-lamp' : ''} ${mastery !== 'none' ? masteryInfo.border : ''}`}
                      style={{ backgroundColor: module.color + '20' }}
                    >
                      {isModuleLocked ? <Lock className="w-6 h-6 text-[var(--foreground)]/40" /> : module.icon}
                    </div>
                    {mastery !== 'none' && (
                      <span
                        className="absolute -top-2 -right-2 text-base leading-none drop-shadow-md"
                        title={`${masteryInfo.label} mastery`}
                      >
                        {masteryInfo.emoji}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Module {module.id}: {module.title}
                      </h2>
                      {isOptionalBridge && (
                        <Badge variant="warning" size="sm">Optional bridge</Badge>
                      )}
                      {moduleProgress === 100 && (
                        <Badge variant="success" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" /> Complete
                        </Badge>
                      )}
                      {mastery !== 'none' && mastery !== 'bronze' && (
                        <Badge variant={mastery === 'gold' ? 'warning' : 'info'} size="sm">
                          {masteryInfo.emoji} {masteryInfo.label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--foreground)]/50 line-clamp-2">
                      {module.description}
                    </p>
                    {isOptionalBridge && (
                      <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                        Helpful after A1 basics — not required before exam-prep modules.
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-[var(--foreground)]/50">
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
                    <span className="text-[var(--foreground)]/50">Progress</span>
                    <span className="font-medium text-[var(--foreground)]/80">
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
                                ? 'bg-[var(--foreground)]/5 border-[var(--card-border)] opacity-50'
                                : isCompleted
                                ? 'bg-[#27ae60]/10 border-[#27ae60]/30'
                                : 'border-[var(--card-border)] hover:border-[#e94560]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isLessonLocked
                                  ? 'bg-[var(--foreground)]/10'
                                  : isCompleted
                                  ? 'bg-[#27ae60]'
                                  : 'bg-[#e94560]'
                              }`}>
                                {isLessonLocked ? (
                                  <Lock className="w-4 h-4 text-[var(--foreground)]/40" />
                                ) : isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <span className={`text-white text-sm font-bold${lessonIndex === 0 || isPreviousLessonComplete ? ' animate-unlock' : ''}`}>{lessonIndex + 1}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className={`font-medium ${
                                  isLessonLocked ? 'text-[var(--foreground)]/40' : 'text-[var(--foreground)]'
                                }`}>
                                  {lesson.title}
                                </h3>
                                <p className="text-xs text-[var(--foreground)]/50">
                                  {lesson.titleGerman}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--foreground)]/50">
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
                                isLessonLocked ? 'text-[var(--foreground)]/30' : 'text-[var(--foreground)]/40'
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
                  <div className="text-center py-4 text-[var(--foreground)]/50">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-[var(--foreground)]/40" />
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
