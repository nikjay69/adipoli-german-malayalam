/**
 * Exam Readiness Score — intelligent A1 readiness estimator
 *
 * Design: Linear course → 80% max, Supplementary resources → 20%
 *
 * COURSE PATH (80% of score):
 * - Lesson progress (35%): lessons completed / total
 * - Vocabulary (20%): words learned through lessons
 * - Exercise accuracy (25%): avg score — drops with mistakes
 *
 * SUPPLEMENTARY (20% of score):
 * - Games & practice (8%): games played + quizzes taken
 * - Mock tests (7%): Goethe tests attempted
 * - Daily consistency (5%): streak bonus
 *
 * A user who completes the full course with decent accuracy
 * hits ~80%. The remaining 20% comes from games, tests, streaks.
 */

import type { LessonProgress } from './store';

interface ReadinessInput {
  completedLessons: LessonProgress[];
  totalLessons: number;
  learnedVocabulary: number;
  totalVocabulary: number;
  streak: number;
  gamesPlayed: number;
  quizzesTaken: number;
}

export interface ReadinessResult {
  score: number;
  courseScore: number;      // 0-80 (from linear course)
  supplementaryScore: number; // 0-20 (from extras)
  label: string;
  color: string;
  breakdown: {
    lessons: number;
    vocabulary: number;
    accuracy: number;
    games: number;
    tests: number;
    streak: number;
  };
  tips: string[];
  nextAction: string;       // Most impactful next step
}

export function calculateExamReadiness(input: ReadinessInput): ReadinessResult {
  const {
    completedLessons,
    totalLessons,
    learnedVocabulary,
    totalVocabulary,
    streak,
    gamesPlayed,
    quizzesTaken,
  } = input;

  // === COURSE PATH (max 80 points) ===

  // Lesson progress (35 points max)
  const lessonPct = totalLessons > 0 ? completedLessons.length / totalLessons : 0;
  const lessons = Math.min(35, Math.round(lessonPct * 35));

  // Vocabulary strength (20 points max)
  const vocabPct = totalVocabulary > 0 ? learnedVocabulary / totalVocabulary : 0;
  const vocabulary = Math.min(20, Math.round(vocabPct * 20));

  // Exercise accuracy (25 points max) — penalizes low scores
  let accuracy = 0;
  if (completedLessons.length > 0) {
    const avgScore = completedLessons.reduce((sum, l) => sum + l.score, 0) / completedLessons.length;
    // Scale: 50% avg → 10pts, 70% → 17pts, 90% → 23pts, 100% → 25pts
    accuracy = Math.min(25, Math.round((avgScore / 100) * 25));
  }

  const courseScore = lessons + vocabulary + accuracy;

  // === SUPPLEMENTARY (max 20 points) ===

  // Games & practice (8 points max) — caps at 50 games
  const gamesPct = Math.min(1, (gamesPlayed + quizzesTaken) / 50);
  const games = Math.round(gamesPct * 8);

  // Mock tests (7 points max) — caps at 8 tests
  const testsPct = Math.min(1, quizzesTaken / 8);
  const tests = Math.round(testsPct * 7);

  // Streak consistency (5 points max) — caps at 14 days
  const streakPct = Math.min(1, streak / 14);
  const streakScore = Math.round(streakPct * 5);

  const supplementaryScore = games + tests + streakScore;

  // === TOTAL ===
  const score = Math.min(100, courseScore + supplementaryScore);

  // Label and color
  let label: string;
  let color: string;
  if (score === 0) { label = 'Not Started'; color = '#6b7280'; }
  else if (score < 15) { label = 'Just Beginning'; color = '#ef4444'; }
  else if (score < 30) { label = 'Building Basics'; color = '#f97316'; }
  else if (score < 45) { label = 'Making Progress'; color = '#f59e0b'; }
  else if (score < 60) { label = 'Getting There'; color = '#d4a520'; }
  else if (score < 75) { label = 'Almost Ready'; color = '#84cc16'; }
  else if (score < 90) { label = 'Exam Ready'; color = '#27ae60'; }
  else { label = 'A1 Master'; color = '#10b981'; }

  // Smart tips — suggest the most impactful next step
  const tips: string[] = [];
  let nextAction = '';

  if (lessons < 10) {
    nextAction = 'Continue your lessons — each one builds your foundation';
    tips.push('Focus on completing lessons first');
  } else if (accuracy < 15 && completedLessons.length > 3) {
    nextAction = 'Review past lessons to improve your accuracy';
    tips.push('Your accuracy needs work — replay lessons you scored low on');
  } else if (vocabulary < 10) {
    nextAction = 'Learn more vocabulary in your lessons';
    tips.push('Vocabulary is key — review the Words tab');
  } else if (lessons < 25) {
    nextAction = 'Keep going with lessons — you\'re making great progress!';
  } else if (games < 4) {
    nextAction = 'Try some games to reinforce what you\'ve learned';
    tips.push('Games help you practice without pressure');
  } else if (tests < 3 && lessonPct > 0.5) {
    nextAction = 'Take a Goethe mock test to check your level';
    tips.push('Mock tests show you the real exam format');
  } else if (streakScore < 3) {
    nextAction = 'Build a daily habit — even 10 minutes helps';
    tips.push('A consistent streak improves retention');
  } else if (score >= 60) {
    nextAction = 'You\'re exam ready! Take the full Goethe simulation';
    tips.push('Practice mock tests to build confidence');
  } else {
    nextAction = 'Keep going — every lesson counts!';
  }

  if (lessonPct > 0.8 && accuracy >= 17) tips.push('Try the Goethe mock tests — you\'re close!');
  if (gamesPlayed < 10) tips.push('Games are a fun way to boost your score');

  return {
    score,
    courseScore,
    supplementaryScore,
    label,
    color,
    breakdown: {
      lessons,
      vocabulary,
      accuracy,
      games,
      tests,
      streak: streakScore,
    },
    tips: tips.slice(0, 3),
    nextAction,
  };
}
