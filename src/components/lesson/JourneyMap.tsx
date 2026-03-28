'use client';

import { motion } from 'framer-motion';
import type { Module } from '@/lib/content/types';

interface JourneyMapProps {
  module: Module;
  completedLessonIds: string[];
  currentLessonId?: string;
  onLessonTap?: (lessonId: string) => void;
}

/**
 * Board-game style journey path showing lesson progress within a module.
 * Completed = filled, current = pulsing, locked = dimmed.
 */
export function JourneyMap({ module, completedLessonIds, currentLessonId, onLessonTap }: JourneyMapProps) {
  const lessons = module.lessons;
  const totalLessons = lessons.length;

  return (
    <div className="w-full max-w-sm mx-auto py-2">
      {/* Module header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{module.icon}</span>
        <div>
          <h3 className="text-sm font-bold leading-tight">{module.title}</h3>
          <p className="text-[10px] text-[var(--foreground)]/40">{module.titleGerman}</p>
        </div>
      </div>

      {/* Journey path */}
      <div className="relative flex flex-col gap-0">
        {lessons.map((lesson, i) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isCurrent = lesson.id === currentLessonId;
          const isLocked = !isCompleted && !isCurrent && i > 0 && !completedLessonIds.includes(lessons[i - 1].id);
          const isFirst = i === 0;
          const isLast = i === totalLessons - 1;

          return (
            <div key={lesson.id} className="flex items-start gap-3">
              {/* Vertical path line + node */}
              <div className="flex flex-col items-center flex-shrink-0" style={{ width: '28px' }}>
                {/* Connector line from previous */}
                {!isFirst && (
                  <div className={`w-0.5 h-3 ${isCompleted || isCurrent ? 'bg-[#27ae60]' : 'bg-[var(--foreground)]/10'}`} />
                )}

                {/* Node */}
                <motion.button
                  whileTap={!isLocked ? { scale: 0.85 } : undefined}
                  onClick={() => !isLocked && onLessonTap?.(lesson.id)}
                  disabled={isLocked}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCompleted
                      ? 'bg-[#27ae60] border-[#27ae60] text-white'
                      : isCurrent
                      ? 'bg-[#d4a520] border-[#d4a520] text-[#1b2d1b]'
                      : isLocked
                      ? 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10 text-[var(--foreground)]/20'
                      : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--foreground)]/50'
                  }`}
                  animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                  transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                >
                  {isCompleted ? '✓' : i + 1}
                </motion.button>

                {/* Connector line to next */}
                {!isLast && (
                  <div className={`w-0.5 h-3 ${isCompleted ? 'bg-[#27ae60]' : 'bg-[var(--foreground)]/10'}`} />
                )}
              </div>

              {/* Lesson info */}
              <div className={`flex-1 pb-1 pt-0.5 ${isFirst ? '' : 'pt-3'} ${isLocked ? 'opacity-40' : ''}`}>
                <p className={`text-xs font-semibold leading-tight ${
                  isCurrent ? 'text-[#d4a520]' : isCompleted ? 'text-[#27ae60]' : ''
                }`}>
                  {lesson.title}
                </p>
                <p className="text-[10px] text-[var(--foreground)]/30">{lesson.titleGerman}</p>
              </div>
            </div>
          );
        })}

        {/* Boss node at the end */}
        <div className="flex items-start gap-3 mt-1">
          <div className="flex flex-col items-center flex-shrink-0" style={{ width: '28px' }}>
            <div className={`w-0.5 h-3 ${completedLessonIds.length === totalLessons ? 'bg-[#d4a520]' : 'bg-[var(--foreground)]/10'}`} />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 ${
              completedLessonIds.length === totalLessons
                ? 'bg-[#9333ea] border-[#9333ea] text-white'
                : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10 text-[var(--foreground)]/20'
            }`}>
              👮
            </div>
          </div>
          <div className={`flex-1 pt-3 ${completedLessonIds.length < totalLessons ? 'opacity-40' : ''}`}>
            <p className="text-xs font-bold text-[#9333ea]">Boss Battle</p>
            <p className="text-[10px] text-[var(--foreground)]/30">Complete all lessons to unlock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
