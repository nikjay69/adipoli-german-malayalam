import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
  4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17300,
  19200, 21200, 23300, 25500, 27800, 30200, 32700, 35300, 38000, 41000
];

// Kerala-themed level names
export const LEVEL_NAMES = [
  "Theyyam Beginner", "Kathakali Novice", "Mohiniyattam Student",
  "Onam Learner", "Vishu Explorer", "Backwater Traveler",
  "Munnar Climber", "Periyar Adventurer", "Alleppey Voyager",
  "Cochin Navigator", "Kozhikode Scholar", "Thrissur Achiever",
  "Wayanad Wanderer", "Kovalam Surfer", "Varkala Seeker",
  "Athirapally Explorer", "Thekkady Tracker", "Kumarakom Cruiser",
  "Bekal Champion", "Ponmudi Pioneer", "Idukki Climber",
  "Poovar Pro", "Marari Master", "Cherai Champion",
  "Fort Kochi Expert", "Mattancherry Maven", "Jew Town Genius",
  "Sabarimala Sage", "Guruvayur Guide", "Kathakali Master"
];

// Achievements data
export const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: 'first_chai', name: 'First Chai', description: 'Complete your first lesson', icon: '☕' },
  { id: 'backwater_explorer', name: 'Backwater Explorer', description: 'Complete Module 1', icon: '🚣' },
  { id: 'sadya_scholar', name: 'Sadya Scholar', description: 'Learn 50 vocabulary words', icon: '🍛' },
  { id: 'munnar_master', name: 'Munnar Master', description: 'Achieve a 7-day streak', icon: '🏔️' },
  { id: 'onam_champion', name: 'Onam Champion', description: 'Complete all modules', icon: '🎉' },
  { id: 'malayali_pro', name: 'Malayali German Pro', description: '100% course completion', icon: '🏆' },
  { id: 'word_wizard', name: 'Word Wizard', description: 'Learn 100 vocabulary words', icon: '📚' },
  { id: 'game_guru', name: 'Game Guru', description: 'Play 50 games', icon: '🎮' },
  { id: 'quiz_king', name: 'Quiz King', description: 'Score 100% on 10 quizzes', icon: '👑' },
  { id: 'streak_star', name: 'Streak Star', description: 'Achieve a 30-day streak', icon: '⭐' },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete a lesson before 8 AM', icon: '🌅' },
  { id: 'night_owl', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉' },
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
  resetProgress: () => void;
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
          if (!achievements.includes('first_chai') && completedLessons.length === 1) {
            achievements.push('first_chai');
          }

          return {
            userProgress: {
              ...state.userProgress,
              completedLessons,
              achievements,
            },
          };
        });
      },

      learnVocabulary: (vocabId: string) => {
        set((state) => {
          if (state.userProgress.learnedVocabulary.includes(vocabId)) {
            return state;
          }

          const learnedVocabulary = [...state.userProgress.learnedVocabulary, vocabId];
          const achievements = [...state.userProgress.achievements];

          // Check vocabulary achievements
          if (learnedVocabulary.length >= 50 && !achievements.includes('sadya_scholar')) {
            achievements.push('sadya_scholar');
          }
          if (learnedVocabulary.length >= 100 && !achievements.includes('word_wizard')) {
            achievements.push('word_wizard');
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
          if (newStreak >= 7 && !achievements.includes('munnar_master')) {
            achievements.push('munnar_master');
          }
          if (newStreak >= 30 && !achievements.includes('streak_star')) {
            achievements.push('streak_star');
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

          if (gamesPlayed >= 50 && !achievements.includes('game_guru')) {
            achievements.push('game_guru');
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
    }
  )
);
