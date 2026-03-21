/**
 * Exam Readiness Score — intelligent A1 readiness estimator
 *
 * Score: 0-100%, representing likelihood of passing Goethe A1
 *
 * Factors (weighted):
 * - Course progress (40%): lessons completed / total lessons
 * - Vocabulary strength (20%): words learned / total words
 * - Exercise accuracy (20%): average score across completed lessons
 * - Consistency (10%): streak bonus
 * - Practice volume (10%): games + quizzes played
 *
 * The score naturally increases as users progress and decreases
 * if accuracy drops (many wrong answers = lower average score).
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
  score: number;          // 0-100
  label: string;          // "Not Started" | "Beginning" | "Developing" | "Approaching" | "Ready" | "Strong"
  color: string;          // CSS color
  breakdown: {
    progress: number;     // 0-100
    vocabulary: number;   // 0-100
    accuracy: number;     // 0-100
    consistency: number;  // 0-100
    practice: number;     // 0-100
  };
  tips: string[];         // Improvement suggestions
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

  // 1. Course Progress (40%)
  const progressRaw = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;
  const progress = Math.min(100, progressRaw);

  // 2. Vocabulary Strength (20%)
  const vocabRaw = totalVocabulary > 0 ? (learnedVocabulary / totalVocabulary) * 100 : 0;
  const vocabulary = Math.min(100, vocabRaw);

  // 3. Exercise Accuracy (20%) — average score, penalizes low scores
  let accuracy = 0;
  if (completedLessons.length > 0) {
    const totalScore = completedLessons.reduce((sum, l) => sum + l.score, 0);
    accuracy = totalScore / completedLessons.length;
  }

  // 4. Consistency (10%) — streak bonus (caps at 30 days)
  const consistency = Math.min(100, (streak / 30) * 100);

  // 5. Practice Volume (10%) — games + quizzes (caps at 100 total)
  const practiceRaw = gamesPlayed + quizzesTaken;
  const practice = Math.min(100, (practiceRaw / 100) * 100);

  // Weighted score
  const score = Math.round(
    progress * 0.40 +
    vocabulary * 0.20 +
    accuracy * 0.20 +
    consistency * 0.10 +
    practice * 0.10
  );

  // Label and color
  let label: string;
  let color: string;
  if (score === 0) { label = 'Not Started'; color = '#6b7280'; }
  else if (score < 20) { label = 'Beginning'; color = '#ef4444'; }
  else if (score < 40) { label = 'Developing'; color = '#f59e0b'; }
  else if (score < 60) { label = 'Approaching'; color = '#d4a520'; }
  else if (score < 80) { label = 'Ready'; color = '#27ae60'; }
  else { label = 'Strong'; color = '#10b981'; }

  // Tips
  const tips: string[] = [];
  if (progress < 50) tips.push('Complete more lessons to cover A1 topics');
  if (vocabulary < 40) tips.push('Learn more vocabulary — aim for 300+ words');
  if (accuracy < 70 && completedLessons.length > 5) tips.push('Review lessons where you scored below 70%');
  if (streak < 7) tips.push('Build a daily streak for better retention');
  if (practiceRaw < 20) tips.push('Play more games to reinforce learning');
  if (progress > 80 && accuracy > 70) tips.push('Try the Goethe mock tests!');

  return {
    score,
    label,
    color,
    breakdown: {
      progress: Math.round(progress),
      vocabulary: Math.round(vocabulary),
      accuracy: Math.round(accuracy),
      consistency: Math.round(consistency),
      practice: Math.round(practice),
    },
    tips,
  };
}
