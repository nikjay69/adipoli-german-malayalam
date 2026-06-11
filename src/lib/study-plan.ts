// Adaptive Daily Scheduling System
// Calculates daily tasks based on user's available study time and progress

import type { Module } from './content/types';
import type { LessonProgress } from './store';
import type { SRSCard } from './srs';

// ── Types ──────────────────────────────────────────────────────────────

export interface StudyPlan {
  dailyHours: number;           // 0.5 to 3
  totalDays: number;            // calculated: TOTAL_COURSE_HOURS / dailyHours
  startDate: string;            // ISO date (YYYY-MM-DD)
  currentDay: number;           // 1-based
  completedDays: number[];      // array of day numbers completed
  checkpointResults: Record<number, { passed: boolean; score: number; date: string }>;
}

export interface DailySchedule {
  dayNumber: number;
  totalDays: number;
  percentComplete: number;
  tasks: DailyTask[];
  isCheckpoint: boolean;
  estimatedMinutes: number;
}

export interface DailyTask {
  id: string;
  type: 'lesson' | 'review' | 'practice' | 'game' | 'checkpoint';
  title: string;
  titleGerman?: string;
  description: string;
  estimatedMinutes: number;
  moduleId?: number;
  lessonId?: string;
  route: string;
  completed: boolean;
  xpReward: number;
}

// ── Constants ──────────────────────────────────────────────────────────

export const TOTAL_COURSE_HOURS = 120;

export const HOUR_OPTIONS = [
  { value: 1,   label: '1 hour', sublabel: '4 months · steady pace' },
  { value: 1.5, label: '1.5 hours', sublabel: '~3 months · focused' },
  { value: 2,   label: '2 hours', sublabel: '2 months · committed' },
  { value: 3,   label: '3 hours', sublabel: '40 days · intensive' },
] as const;

// ── Plan Creation ──────────────────────────────────────────────────────

export function createStudyPlan(dailyHours: number): StudyPlan {
  return {
    dailyHours,
    totalDays: Math.ceil(TOTAL_COURSE_HOURS / dailyHours),
    startDate: new Date().toISOString().split('T')[0],
    currentDay: 1,
    completedDays: [],
    checkpointResults: {},
  };
}

export function getEstimatedDays(dailyHours: number): number {
  return Math.ceil(TOTAL_COURSE_HOURS / dailyHours);
}

export function getEstimatedCompletionDate(dailyHours: number): Date {
  const days = getEstimatedDays(dailyHours);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function formatEstimatedDuration(totalDays: number): string {
  if (totalDays <= 60) return `~${totalDays} days (~${Math.round(totalDays / 7)} weeks)`;
  const months = Math.round((totalDays / 30) * 10) / 10;
  return `~${totalDays} days (~${months} months)`;
}

// ── Daily Schedule Generation ──────────────────────────────────────────

interface ScheduleInput {
  completedLessons: LessonProgress[];
  srsCards: Record<string, SRSCard>;
  completedTaskIds?: string[];   // tasks completed today
}

export function getDailySchedule(
  plan: StudyPlan,
  allModules: Module[],
  userProgress: ScheduleInput,
): DailySchedule {
  const dayNumber = plan.currentDay;
  const totalDays = plan.totalDays;
  const dailyMinutes = plan.dailyHours * 60;
  const percentComplete = Math.round((plan.completedDays.length / totalDays) * 100);
  const isCheckpoint = dayNumber % 5 === 0;

  const tasks: DailyTask[] = [];
  let minutesLeft = dailyMinutes;
  const completedTaskIds = new Set(userProgress.completedTaskIds || []);

  // 1. SRS review if cards are due (always first)
  const now = Date.now();
  const dueCards = Object.values(userProgress.srsCards || {}).filter(
    (c) => c.nextReview <= now,
  );
  if (dueCards.length > 0 && minutesLeft >= 10) {
    const reviewMinutes = Math.min(15, Math.max(5, Math.ceil(dueCards.length * 0.5)));
    const taskId = `day-${dayNumber}-review`;
    tasks.push({
      id: taskId,
      type: 'review',
      title: 'Daily Review',
      description: `${dueCards.length} card${dueCards.length === 1 ? '' : 's'} due`,
      estimatedMinutes: reviewMinutes,
      route: '/practice/review',
      completed: completedTaskIds.has(taskId),
      xpReward: dueCards.length * 2,
    });
    minutesLeft -= reviewMinutes;
  }

  // 2. Main lessons — 60-80% of remaining time
  const completedLessonIds = new Set(
    userProgress.completedLessons.map((l) => l.lessonId),
  );

  // Calculate how many lessons to assign based on daily hours
  // At 0.5h/day: 1 lesson, at 1h: 1, at 1.5h: 1-2, at 2h: 2, at 3h: 2-3
  const maxLessonsPerDay = plan.dailyHours <= 1 ? 1 : plan.dailyHours <= 2 ? 2 : 3;
  let lessonsAdded = 0;

  for (const courseModule of allModules) {
    if (lessonsAdded >= maxLessonsPerDay) break;
    for (const lesson of courseModule.lessons) {
      if (lessonsAdded >= maxLessonsPerDay) break;
      if (completedLessonIds.has(lesson.id)) continue;

      const lessonMinutes = parseDuration(lesson.duration);
      if (minutesLeft < Math.min(20, lessonMinutes)) break;

      const taskId = `day-${dayNumber}-lesson-${lesson.id}`;
      tasks.push({
        id: taskId,
        type: 'lesson',
        title: lesson.title,
        titleGerman: lesson.titleGerman,
        description: `Module ${courseModule.id}: ${courseModule.title}`,
        estimatedMinutes: lessonMinutes,
        moduleId: courseModule.id,
        lessonId: lesson.id,
        route: `/play/${courseModule.id}/${lesson.id}`,
        completed: completedTaskIds.has(taskId),
        xpReward: lesson.xpReward,
      });
      minutesLeft -= lessonMinutes;
      lessonsAdded++;
    }
  }

  // 3. Practice activity (if >= 10 min remaining)
  if (minutesLeft >= 10) {
    const practiceOptions = [
      { title: 'Pronunciation Check', route: '/practice/pronunciation', desc: 'Practice speaking German words' },
      { title: 'Speak & Check', route: '/practice/speak', desc: 'Listen and repeat phrases' },
      { title: 'Shadowing', route: '/practice/shadowing', desc: 'Shadow native German speech' },
      { title: 'Conversation', route: '/practice/conversation', desc: 'Practice real conversations' },
      { title: 'Writing', route: '/practice/write', desc: 'Practice writing in German' },
    ];
    const practice = practiceOptions[dayNumber % practiceOptions.length];
    const taskId = `day-${dayNumber}-practice`;
    tasks.push({
      id: taskId,
      type: 'practice',
      title: practice.title,
      description: practice.desc,
      estimatedMinutes: 10,
      route: practice.route,
      completed: completedTaskIds.has(taskId),
      xpReward: 20,
    });
    minutesLeft -= 10;
  }

  // 4. Game every other day (if >= 5 min remaining)
  if (minutesLeft >= 5 && dayNumber % 2 === 0) {
    const gameOptions = [
      { title: 'Article Blitz', route: '/games/article-blitz', desc: 'der/die/das speed drill' },
      { title: 'Verb Rush', route: '/games/verb-rush', desc: 'Conjugation combos' },
      { title: 'Scene Sort', route: '/games/scene-sort', desc: 'Which place does each word belong to?' },
      { title: 'Fill the Gap', route: '/games/fill-the-gap', desc: 'Complete the sentence' },
      { title: 'Speed Quiz', route: '/games/speed-quiz', desc: 'Quick-fire vocabulary' },
      { title: 'Memory', route: '/games/memory', desc: 'Card matching game' },
    ];
    const game = gameOptions[Math.floor(dayNumber / 2) % gameOptions.length];
    const taskId = `day-${dayNumber}-game`;
    tasks.push({
      id: taskId,
      type: 'game',
      title: game.title,
      description: game.desc,
      estimatedMinutes: 5,
      route: game.route,
      completed: completedTaskIds.has(taskId),
      xpReward: 30,
    });
    minutesLeft -= 5;
  }

  // 5. Checkpoint every 5 days
  if (isCheckpoint) {
    const taskId = `day-${dayNumber}-checkpoint`;
    tasks.push({
      id: taskId,
      type: 'checkpoint',
      title: `Day ${dayNumber} Checkpoint`,
      description: 'Review everything from the last 5 days',
      estimatedMinutes: 15,
      route: '/tests/goethe-a1-test-1',
      completed: completedTaskIds.has(taskId),
      xpReward: 50,
    });
  }

  // Calculate actual estimated time from tasks
  const totalEstimated = tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0);

  return {
    dayNumber,
    totalDays,
    percentComplete,
    tasks,
    isCheckpoint,
    estimatedMinutes: totalEstimated,
  };
}

// ── Helpers ────────────────────────────────────────────────────────────

function parseDuration(duration: string): number {
  // Parse strings like "45 min", "1 hour", "30m", etc.
  const match = duration.match(/(\d+)/);
  if (!match) return 45;
  const num = parseInt(match[1], 10);
  if (duration.toLowerCase().includes('hour')) return num * 60;
  return num;
}

/**
 * Check if the user should advance to the next day.
 * A day is considered "done" when all non-optional tasks are completed.
 */
export function isDayComplete(schedule: DailySchedule): boolean {
  // At minimum, all lessons must be done. Review/practice/game are bonus.
  const lessonTasks = schedule.tasks.filter((t) => t.type === 'lesson');
  const checkpointTasks = schedule.tasks.filter((t) => t.type === 'checkpoint');

  const lessonsComplete = lessonTasks.every((t) => t.completed);
  const checkpointsComplete = checkpointTasks.every((t) => t.completed);

  return lessonsComplete && checkpointsComplete;
}

/**
 * Calculate which day the user should be on based on their start date.
 * If they've been away, they stay on the same currentDay — no auto-advance.
 */
export function getCalendarDay(plan: StudyPlan): number {
  const start = new Date(plan.startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays + 1; // 1-based
}
