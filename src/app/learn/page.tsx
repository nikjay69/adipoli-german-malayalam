'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle, Clock, Star, ChevronDown } from 'lucide-react';
import { ProgressBar, Badge } from '@/components/ui';
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
  if (completed.length < moduleLessonIds.length) return 'bronze';

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
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find the current active module (first incomplete unlocked module)
  const activeModuleId = useMemo(() => {
    if (!mounted) return null;
    for (const module of ALL_MODULES) {
      const unlocked = isModuleUnlocked(module.id, userProgress.completedLessons);
      if (!unlocked) continue;
      const allDone = module.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id));
      if (!allDone) return module.id;
    }
    return null;
  }, [mounted, userProgress.completedLessons]);

  // Auto-expand the active module
  useEffect(() => {
    if (activeModuleId !== null && expandedModule === null) {
      setExpandedModule(activeModuleId);
    }
  }, [activeModuleId, expandedModule]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  // Group modules: completed summary + current + upcoming
  const completedModules: typeof ALL_MODULES = [];
  const currentAndUpcoming: typeof ALL_MODULES = [];
  let foundCurrent = false;

  for (const module of ALL_MODULES) {
    const allDone = module.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id));
    if (allDone && !foundCurrent) {
      completedModules.push(module);
    } else {
      foundCurrent = true;
      currentAndUpcoming.push(module);
    }
  }

  return (
    <div className="px-3 py-3 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <h1 className="text-sm font-bold">
          <span className="gradient-text">Learn German</span>
          <span className="text-[var(--foreground)]/40 font-normal ml-1.5">{ALL_MODULES.length} modules</span>
        </h1>
      </motion.div>

      {/* Completed modules summary */}
      {completedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-card p-2.5 mb-2"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#27ae60] flex-shrink-0" />
            <span className="text-sm font-semibold text-[#27ae60]">
              Modules 1-{completedModules[completedModules.length - 1].id} complete
            </span>
            <span className="text-xs text-[var(--foreground)]/40 ml-auto">
              {completedModules.reduce((s, m) => s + m.lessons.length, 0)} lessons
            </span>
          </div>
          {/* Compact icon row of completed modules */}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {completedModules.map(m => {
              const mastery = getModuleMastery(m, userProgress.completedLessons);
              return (
                <Link key={m.id} href={`/learn/${m.id}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${mastery !== 'none' ? MASTERY_CONFIG[mastery].border : ''}`}
                    style={{ backgroundColor: m.color + '20' }}
                    title={`Module ${m.id}: ${m.title}`}>
                    {m.icon}
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Current + upcoming modules */}
      <div className="space-y-2">
        {currentAndUpcoming.map((module, idx) => {
          const moduleLessons = module.lessons.length;
          const completedModuleLessons = userProgress.completedLessons.filter(l =>
            module.lessons.some(ml => ml.id === l.lessonId)
          ).length;
          const moduleProgress = (completedModuleLessons / moduleLessons) * 100;

          const isModuleLocked = !isModuleUnlocked(module.id, userProgress.completedLessons);
          const isOptionalBridge = OPTIONAL_MODULE_IDS.has(module.id);
          const mastery = getModuleMastery(module, userProgress.completedLessons);
          const masteryInfo = MASTERY_CONFIG[mastery];
          const isExpanded = expandedModule === module.id;
          const isCurrent = module.id === activeModuleId;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <div className={`game-card overflow-hidden transition-all duration-500 ${isModuleLocked ? 'opacity-50' : ''} ${isCurrent ? 'border-[#e94560]/30 shadow-[0_0_15px_rgba(233,69,96,0.15)]' : ''} ${!isModuleLocked && completedModuleLessons === 0 && !isCurrent ? 'animate-pulse-once' : ''}`}>
                {/* Module header — tappable to expand */}
                <button
                  onClick={() => !isModuleLocked && setExpandedModule(isExpanded ? null : module.id)}
                  className="w-full text-left p-2.5"
                  disabled={isModuleLocked}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${mastery !== 'none' ? masteryInfo.border : ''}`}
                        style={{ backgroundColor: module.color + '20' }}
                      >
                        {isModuleLocked ? <Lock className="w-4 h-4 text-[var(--foreground)]/40" /> : module.icon}
                      </div>
                      {mastery !== 'none' && (
                        <span className="absolute -top-1.5 -right-1.5 text-xs leading-none">{masteryInfo.emoji}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-[var(--foreground)] truncate">
                          {module.id}. {module.title}
                        </h2>
                        {isOptionalBridge && (
                          <Badge variant="warning" size="sm">Opt</Badge>
                        )}
                        {moduleProgress === 100 && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#27ae60] flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/40">
                        <span>{completedModuleLessons}/{moduleLessons}</span>
                        {moduleProgress > 0 && moduleProgress < 100 && (
                          <div className="flex-1 h-1.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden max-w-[80px]">
                            <div className="h-full rounded-full bg-[#e94560]" style={{ width: `${moduleProgress}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                    {!isModuleLocked && (
                      <ChevronDown className={`w-4 h-4 text-[var(--foreground)]/30 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </button>

                {/* Expanded lesson list */}
                {isExpanded && !isModuleLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-2.5 pb-2.5"
                  >
                    <div className="space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = userProgress.completedLessons.some(
                          l => l.lessonId === lesson.id
                        );
                        const completedLesson = userProgress.completedLessons.find(
                          l => l.lessonId === lesson.id
                        );
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
                            <div
                              className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                                isLessonLocked
                                  ? 'opacity-40'
                                  : isCompleted
                                  ? 'bg-[#27ae60]/10'
                                  : 'hover:bg-[var(--foreground)]/5'
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isLessonLocked
                                  ? 'bg-[var(--foreground)]/10'
                                  : isCompleted
                                  ? 'bg-[#27ae60]'
                                  : 'bg-[#e94560]'
                              }`}>
                                {isLessonLocked ? (
                                  <Lock className="w-3 h-3 text-[var(--foreground)]/40" />
                                ) : isCompleted ? (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                ) : (
                                  <span className="text-white text-xs font-bold">{lessonIndex + 1}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className={`text-sm font-medium truncate ${
                                  isLessonLocked ? 'text-[var(--foreground)]/40' : 'text-[var(--foreground)]'
                                }`}>
                                  {lesson.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="text-xs text-[var(--foreground)]/40">{lesson.duration}</span>
                                {isCompleted && completedLesson && (
                                  <div className="flex items-center gap-0.5 text-amber-500">
                                    <Star className="w-3 h-3 fill-amber-500" />
                                    <span className="text-xs">{completedLesson.score}%</span>
                                  </div>
                                )}
                                {!isLessonLocked && !isCompleted && (
                                  <ChevronRight className="w-3 h-3 text-[var(--foreground)]/30" />
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
