import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SRSCard } from './srs';
import type { StudyPlan } from './study-plan';
import { syncProgressToSupabase } from './progress-sync';
import { useAuthStore } from './auth-store';

// Types
export interface VocabularyItem {
  id: string;
  german: string;
  english: string;
  malayalam: string;
  pronunciation: string;
  example?: string;
  learned: boolean;
  lastReviewed?: number;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface SpineCheckpointResult {
  moduleId: number;
  percent: number;
  state: 'PASS' | 'WEAK' | 'FAIL';
  failedTags: string[];
  /** skill section id (hoeren/sprechen/lesen/schreiben/grammarVocab) -> percent 0-100 */
  sectionPercents: Record<string, number>;
  savedAt: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: LessonProgress[];
  learnedVocabulary: string[];
  achievements: string[];
  totalTimeSpent: number; // in minutes
  gamesPlayed: number;
  quizzesTaken: number;
  // Journey state
  hasSeenIntro: boolean;
  currentJourneyLocation: string;
  journeyMilestones: string[];
  soundEnabled: boolean;
  ambienceEnabled: boolean;
  activeLessonCheckpoint?: {
    lessonId: string;
    moduleId: number;
    stepType: 'intro' | 'scene-intro' | 'video' | 'vocab' | 'contextual-vocab' | 'decision-point' | 'mini-game' | 'exercise' | 'scene-conclusion' | 'complete';
    stepIndex: number;
    correctCount: number;
    hearts: number;
    xpEarned: number;
    vocabLearned: string[];
    startedAt: number;
  };
  srsCards: Record<string, SRSCard>;
  studyPlan?: StudyPlan;
  completedTaskIds: string[];   // task IDs completed today
  bookmarkedVocab: string[];    // vocab IDs bookmarked for review
  bossesDefeated: string[];     // module IDs where boss was beaten
  /** spine module id (2-8) -> latest closed-checkpoint result; module 1 keeps its own storage */
  spineCheckpoints: Record<number, SpineCheckpointResult>;
}

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
  4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17300,
  19200, 21200, 23300, 25500, 27800, 30200, 32700, 35300, 38000, 41000
];

// Level names — clean, no forced cultural cringe
export const LEVEL_NAMES = [
  "Beginner", "Starter", "Learner",
  "Explorer", "Builder", "Speaker",
  "Communicator", "Achiever", "Adventurer",
  "Navigator", "Scholar", "Practitioner",
  "Performer", "Expert", "Specialist",
  "Advanced", "Professional", "Champion",
  "Master", "Pioneer", "Virtuoso",
  "Elite", "Legend", "Prodigy",
  "Wizard", "Sage", "Guru",
  "Genius", "Titan", "Grandmaster"
];

// Milestones — clear, motivating, not cringe
export const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: 'first_lesson', name: 'First Step', description: 'Complete your first lesson', icon: '🎯' },
  { id: 'module_1', name: 'Module 1 Done', description: 'Complete Module 1', icon: '✅' },
  { id: 'vocab_50', name: '50 Words', description: 'Learn 50 vocabulary words', icon: '📖' },
  { id: 'streak_7', name: '7-Day Streak', description: 'Learn 7 days in a row', icon: '🔥' },
  { id: 'all_modules', name: 'Course Complete', description: 'Complete all 18 modules', icon: '🏆' },
  { id: 'perfect_course', name: 'Perfect Score', description: '100% on every lesson', icon: '💎' },
  { id: 'vocab_100', name: '100 Words', description: 'Learn 100 vocabulary words', icon: '📚' },
  { id: 'games_50', name: '50 Games', description: 'Play 50 games', icon: '🎮' },
  { id: 'accuracy_90', name: 'Sharp Mind', description: 'Average 90%+ accuracy', icon: '🎯' },
  { id: 'streak_30', name: '30-Day Streak', description: 'Learn 30 days straight', icon: '⭐' },
  { id: 'vocab_300', name: '300 Words', description: 'Learn 300 vocabulary words', icon: '🧠' },
  { id: 'halfway', name: 'Halfway There', description: 'Complete 9 of 18 modules', icon: '⚡' },
  { id: 'exam_ready', name: 'Exam Ready', description: 'Reach 60% readiness score', icon: '📝' },
];

interface GameState {
  userProgress: UserProgress;
  currentModule: number;
  currentLesson: number;

  // Actions
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, score: number) => void;
  learnVocabulary: (vocabId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: () => void;
  incrementGamesPlayed: () => void;
  incrementQuizzesTaken: () => void;
  addTimeSpent: (minutes: number) => void;
  setCurrentModule: (moduleId: number) => void;
  setCurrentLesson: (lessonId: number) => void;
  markIntroSeen: () => void;
  setJourneyLocation: (locationId: string) => void;
  unlockMilestone: (milestoneId: string) => void;
  toggleSound: () => void;
  resetProgress: () => void;
  saveCheckpoint: (checkpoint: UserProgress['activeLessonCheckpoint']) => void;
  clearCheckpoint: () => void;
  updateSRSCard: (vocabId: string, card: SRSCard) => void;
  addSRSCard: (card: SRSCard) => void;
  setStudyPlan: (plan: StudyPlan) => void;
  completeDay: (dayNumber: number) => void;
  advanceDay: () => void;
  completeTask: (taskId: string) => void;
  resetDailyTasks: () => void;
  toggleBookmark: (vocabId: string) => void;
  saveSpineCheckpointResult: (result: SpineCheckpointResult) => void;
}

const getInitialProgress = (): UserProgress => ({
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: '',
  completedLessons: [],
  learnedVocabulary: [],
  achievements: [],
  totalTimeSpent: 0,
  gamesPlayed: 0,
  quizzesTaken: 0,
  hasSeenIntro: false,
  currentJourneyLocation: 'kerala-village',
  journeyMilestones: [],
  soundEnabled: true,
  ambienceEnabled: true,
  activeLessonCheckpoint: undefined,
  srsCards: {},
  studyPlan: undefined,
  completedTaskIds: [],
  bookmarkedVocab: [],
  bossesDefeated: [],
  spineCheckpoints: {},
});

const calculateLevel = (xp: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userProgress: getInitialProgress(),
      currentModule: 1,
      currentLesson: 1,

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.userProgress.xp + amount;
          const newLevel = calculateLevel(newXP);
          return {
            userProgress: {
              ...state.userProgress,
              xp: newXP,
              level: newLevel,
            },
          };
        });
      },

      completeLesson: (lessonId: string, score: number) => {
        set((state) => {
          const existingLesson = state.userProgress.completedLessons.find(
            (l) => l.lessonId === lessonId
          );

          let completedLessons;
          if (existingLesson) {
            completedLessons = state.userProgress.completedLessons.map((l) =>
              l.lessonId === lessonId
                ? { ...l, score: Math.max(l.score, score), completedAt: Date.now() }
                : l
            );
          } else {
            completedLessons = [
              ...state.userProgress.completedLessons,
              { lessonId, completed: true, score, completedAt: Date.now() },
            ];
          }

          // Check for first lesson achievement
          const achievements = [...state.userProgress.achievements];
          if (!achievements.includes('first_lesson') && completedLessons.length === 1) {
            achievements.push('first_lesson');
          }

          return {
            userProgress: {
              ...state.userProgress,
              completedLessons,
              achievements,
            },
          };
        });

        // Sync progress to Supabase (debounced)
        const state = get();
        const authUser = useAuthStore.getState().user;
        if (state.userProgress && authUser?.id) {
          syncProgressToSupabase(authUser.id, {
            xp: state.userProgress.xp,
            level: state.userProgress.level,
            streak: state.userProgress.streak,
            completed_lessons: state.userProgress.completedLessons.map(cl => ({
              lessonId: cl.lessonId,
              score: cl.score,
              completedAt: cl.completedAt ? new Date(cl.completedAt).toISOString() : new Date().toISOString(),
            })),
            learned_vocabulary: state.userProgress.learnedVocabulary,
            games_played: state.userProgress.gamesPlayed,
            quizzes_taken: state.userProgress.quizzesTaken,
            srs_cards: state.userProgress.srsCards || {},
          });
        }
      },

      learnVocabulary: (vocabId: string) => {
        set((state) => {
          if (state.userProgress.learnedVocabulary.includes(vocabId)) {
            return state;
          }

          const learnedVocabulary = [...state.userProgress.learnedVocabulary, vocabId];
          const achievements = [...state.userProgress.achievements];

          // Check vocabulary achievements
          if (learnedVocabulary.length >= 50 && !achievements.includes('vocab_50')) {
            achievements.push('vocab_50');
          }
          if (learnedVocabulary.length >= 100 && !achievements.includes('vocab_100')) {
            achievements.push('vocab_100');
          }

          return {
            userProgress: {
              ...state.userProgress,
              learnedVocabulary,
              achievements,
            },
          };
        });
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          if (state.userProgress.achievements.includes(achievementId)) {
            return state;
          }
          return {
            userProgress: {
              ...state.userProgress,
              achievements: [...state.userProgress.achievements, achievementId],
            },
          };
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toDateString();
          const lastActive = state.userProgress.lastActiveDate;

          let newStreak = state.userProgress.streak;

          if (lastActive === today) {
            return state; // Already active today
          }

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (lastActive === yesterday.toDateString()) {
            newStreak += 1;
          } else if (lastActive !== today) {
            newStreak = 1; // Reset streak
          }

          const achievements = [...state.userProgress.achievements];
          if (newStreak >= 7 && !achievements.includes('streak_7')) {
            achievements.push('streak_7');
          }
          if (newStreak >= 30 && !achievements.includes('streak_30')) {
            achievements.push('streak_30');
          }

          return {
            userProgress: {
              ...state.userProgress,
              streak: newStreak,
              lastActiveDate: today,
              achievements,
            },
          };
        });
      },

      incrementGamesPlayed: () => {
        set((state) => {
          const gamesPlayed = state.userProgress.gamesPlayed + 1;
          const achievements = [...state.userProgress.achievements];

          if (gamesPlayed >= 50 && !achievements.includes('games_50')) {
            achievements.push('games_50');
          }

          return {
            userProgress: {
              ...state.userProgress,
              gamesPlayed,
              achievements,
            },
          };
        });
      },

      incrementQuizzesTaken: () => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            quizzesTaken: state.userProgress.quizzesTaken + 1,
          },
        }));
      },

      addTimeSpent: (minutes: number) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            totalTimeSpent: state.userProgress.totalTimeSpent + minutes,
          },
        }));
      },

      setCurrentModule: (moduleId: number) => {
        set({ currentModule: moduleId });
      },

      setCurrentLesson: (lessonId: number) => {
        set({ currentLesson: lessonId });
      },

      markIntroSeen: () => {
        set((state) => ({
          userProgress: { ...state.userProgress, hasSeenIntro: true },
        }));
      },

      setJourneyLocation: (locationId: string) => {
        set((state) => ({
          userProgress: { ...state.userProgress, currentJourneyLocation: locationId },
        }));
      },

      unlockMilestone: (milestoneId: string) => {
        set((state) => {
          if (state.userProgress.journeyMilestones.includes(milestoneId)) return state;
          return {
            userProgress: {
              ...state.userProgress,
              journeyMilestones: [...state.userProgress.journeyMilestones, milestoneId],
            },
          };
        });
      },

      toggleSound: () => {
        set((state) => ({
          userProgress: { ...state.userProgress, soundEnabled: !state.userProgress.soundEnabled },
        }));
      },

      saveCheckpoint: (checkpoint) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            activeLessonCheckpoint: checkpoint,
          },
        }));
      },

      clearCheckpoint: () => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            activeLessonCheckpoint: undefined,
          },
        }));
      },

      updateSRSCard: (vocabId: string, card: SRSCard) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            srsCards: {
              ...state.userProgress.srsCards,
              [vocabId]: card,
            },
          },
        }));
      },

      addSRSCard: (card: SRSCard) => {
        set((state) => {
          // Don't overwrite existing cards
          if (state.userProgress.srsCards[card.vocabId]) return state;
          return {
            userProgress: {
              ...state.userProgress,
              srsCards: {
                ...state.userProgress.srsCards,
                [card.vocabId]: card,
              },
            },
          };
        });
      },

      setStudyPlan: (plan: StudyPlan) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            studyPlan: plan,
          },
        }));
      },

      completeDay: (dayNumber: number) => {
        set((state) => {
          const plan = state.userProgress.studyPlan;
          if (!plan) return state;
          if (plan.completedDays.includes(dayNumber)) return state;
          return {
            userProgress: {
              ...state.userProgress,
              studyPlan: {
                ...plan,
                completedDays: [...plan.completedDays, dayNumber],
              },
            },
          };
        });
      },

      advanceDay: () => {
        set((state) => {
          const plan = state.userProgress.studyPlan;
          if (!plan) return state;
          return {
            userProgress: {
              ...state.userProgress,
              studyPlan: {
                ...plan,
                currentDay: Math.min(plan.currentDay + 1, plan.totalDays),
              },
              completedTaskIds: [], // reset daily tasks on advance
            },
          };
        });
      },

      completeTask: (taskId: string) => {
        set((state) => {
          if (state.userProgress.completedTaskIds.includes(taskId)) return state;
          return {
            userProgress: {
              ...state.userProgress,
              completedTaskIds: [...state.userProgress.completedTaskIds, taskId],
            },
          };
        });
      },

      resetDailyTasks: () => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            completedTaskIds: [],
          },
        }));
      },

      saveSpineCheckpointResult: (result: SpineCheckpointResult) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            spineCheckpoints: {
              ...state.userProgress.spineCheckpoints,
              [result.moduleId]: result,
            },
          },
        }));
      },

      toggleBookmark: (vocabId: string) => {
        set((state) => {
          const bookmarks = state.userProgress.bookmarkedVocab || [];
          const isBookmarked = bookmarks.includes(vocabId);
          return {
            userProgress: {
              ...state.userProgress,
              bookmarkedVocab: isBookmarked
                ? bookmarks.filter(id => id !== vocabId)
                : [...bookmarks, vocabId],
            },
          };
        });
      },

      resetProgress: () => {
        set({
          userProgress: getInitialProgress(),
          currentModule: 1,
          currentLesson: 1,
        });
      },
    }),
    {
      name: 'german-malayali-progress',
      merge: (persistedState: unknown, currentState: GameState): GameState => {
        const persisted = (persistedState || {}) as Partial<GameState>;
        // Deep merge persisted state with defaults so new fields get default values
        const merged = { ...currentState, ...persisted };
        if (merged.userProgress) {
          merged.userProgress = {
            ...getInitialProgress(),
            ...merged.userProgress,
            // Ensure arrays/objects never undefined
            completedLessons: merged.userProgress.completedLessons || [],
            learnedVocabulary: merged.userProgress.learnedVocabulary || [],
            achievements: merged.userProgress.achievements || [],
            journeyMilestones: merged.userProgress.journeyMilestones || [],
            srsCards: merged.userProgress.srsCards || {},
            completedTaskIds: merged.userProgress.completedTaskIds || [],
            bookmarkedVocab: merged.userProgress.bookmarkedVocab || [],
            spineCheckpoints: merged.userProgress.spineCheckpoints || {},
          };
        }
        return merged;
      },
    }
  )
);
