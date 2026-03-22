'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Trophy,
  Star,
  Flame,
  Clock,
  Target,
  BookOpen,
  Gamepad2,
  Award,
  RefreshCw,
  FileText,
  Download
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { useGameStore, LEVEL_NAMES, LEVEL_THRESHOLDS, ACHIEVEMENTS_DATA } from '@/lib/store';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { calculateExamReadiness } from '@/lib/exam-readiness';

export default function ProfilePage() {
  const { userProgress, resetProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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

  const currentLevelXP = LEVEL_THRESHOLDS[userProgress.level - 1] || 0;
  const nextLevelXP = LEVEL_THRESHOLDS[userProgress.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progressToNextLevel = nextLevelXP > currentLevelXP ? ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;

  const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = userProgress.completedLessons.length;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        {/* Profile Card */}
        <Card className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            German Learner
          </h1>

          <Badge variant="secondary" size="md" className="mb-4">
            Level {userProgress.level}: {LEVEL_NAMES[userProgress.level - 1]}
          </Badge>

          {/* Level Progress */}
          <div className="max-w-xs mx-auto">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500 dark:text-gray-400">Progress to Level {userProgress.level + 1}</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {userProgress.xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
              </span>
            </div>
            <ProgressBar progress={progressToNextLevel} color="primary" size="lg" />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="text-center">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{userProgress.xp}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total XP</div>
          </Card>

          <Card className="text-center">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{userProgress.streak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
          </Card>

          <Card className="text-center">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedLessons}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Lessons Done</div>
          </Card>

          <Card className="text-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{userProgress.learnedVocabulary.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Words Learned</div>
          </Card>
        </div>

        {/* More Stats */}
        <Card className="mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Activity Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{userProgress.gamesPlayed}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Games Played</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{formatTime(userProgress.totalTimeSpent)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Time Spent</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{userProgress.quizzesTaken}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Quizzes Taken</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{userProgress.achievements.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Achievements</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white">Achievements</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userProgress.achievements.length}/{ACHIEVEMENTS_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {ACHIEVEMENTS_DATA.map((achievement) => {
              const isUnlocked = userProgress.achievements.includes(achievement.id);
              return (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center p-3 rounded-xl transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-2 border-amber-200 dark:border-amber-700'
                      : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                  }`}
                >
                  <div className={`text-3xl mb-1${isUnlocked ? ' animate-unlock' : ''}`}>{isUnlocked ? achievement.icon : '🔒'}</div>
                  <h3 className={`text-xs font-medium ${
                    isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Course Progress */}
        <Card className="mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Course Progress</h2>
          <div className="space-y-3">
            {ALL_MODULES.map(module => {
              const moduleLessons = module.lessons.length;
              const completedModuleLessons = userProgress.completedLessons.filter(l =>
                module.lessons.some(ml => ml.id === l.lessonId)
              ).length;
              const progress = (completedModuleLessons / moduleLessons) * 100;

              return (
                <div key={module.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {module.icon} Module {module.id}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {completedModuleLessons}/{moduleLessons}
                    </span>
                  </div>
                  <ProgressBar
                    progress={progress}
                    color={progress === 100 ? 'success' : 'primary'}
                    size="sm"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Levels Reference */}
        <Card className="mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Level Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {LEVEL_NAMES.slice(0, 12).map((name, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  userProgress.level === index + 1
                    ? 'bg-[#e94560]/10 border-2 border-[#e94560]'
                    : userProgress.level > index + 1
                    ? 'bg-emerald-50 dark:bg-emerald-900/20'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">Lv.{index + 1}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs block">{name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Exam Readiness */}
        {userProgress.completedLessons.length > 0 && (() => {
          const totalLessons = ALL_MODULES.reduce((s, m) => s + m.lessons.length, 0);
          const totalVocab = getAllVocabulary().length;
          const readiness = calculateExamReadiness({
            completedLessons: userProgress.completedLessons,
            totalLessons,
            learnedVocabulary: userProgress.learnedVocabulary.length,
            totalVocabulary: totalVocab,
            streak: userProgress.streak,
            gamesPlayed: userProgress.gamesPlayed,
            quizzesTaken: userProgress.quizzesTaken,
          });
          return (
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5" style={{ color: readiness.color }} />
                  A1 Exam Readiness
                </h2>
                <span className={`text-2xl font-bold${readiness.score >= 60 ? ' animate-shimmer' : ''}`} style={{ color: readiness.color }}>{readiness.score}%</span>
              </div>
              <ProgressBar progress={readiness.score} color={readiness.score >= 60 ? 'success' : 'warning'} size="md" />
              <p className="text-xs text-gray-500 mt-1 mb-4">{readiness.label} · 60% needed to pass Goethe A1</p>

              {/* Course vs Supplementary */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold" style={{ color: readiness.color }}>{readiness.courseScore}/80</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Course Path</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {[
                      { label: 'Lessons', value: readiness.breakdown.lessons, max: 35 },
                      { label: 'Vocab', value: readiness.breakdown.vocabulary, max: 20 },
                      { label: 'Accuracy', value: readiness.breakdown.accuracy, max: 25 },
                    ].map(item => (
                      <div key={item.label} className="text-center">
                        <div className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.value}</div>
                        <div className="text-[8px] text-gray-400">/{item.max}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold" style={{ color: readiness.color, opacity: 0.7 }}>{readiness.supplementaryScore}/20</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Extras</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {[
                      { label: 'Games', value: readiness.breakdown.games, max: 8 },
                      { label: 'Tests', value: readiness.breakdown.tests, max: 7 },
                      { label: 'Streak', value: readiness.breakdown.streak, max: 5 },
                    ].map(item => (
                      <div key={item.label} className="text-center">
                        <div className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.value}</div>
                        <div className="text-[8px] text-gray-400">/{item.max}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next action + tips */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">💡 Next step:</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{readiness.nextAction}</p>
                {readiness.tips.length > 0 && readiness.tips.map((tip, i) => (
                  <p key={i} className="text-[10px] text-gray-400">• {tip}</p>
                ))}
              </div>
            </Card>
          );
        })()}

        {/* Lesson Scripts */}
        <Card>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#d4a520]" />
            Lesson Scripts
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Download complete lesson scripts as PDF for offline study.
          </p>
          <a href="/scripts" className="inline-flex items-center gap-2 bg-[#d4a520]/10 text-[#d4a520] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4a520]/20 transition-colors">
            <Download className="w-4 h-4" />
            View & Download Scripts
          </a>
        </Card>

        {/* Reset Progress */}
        <Card className="border-red-200 dark:border-red-800">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Reset all your progress including XP, completed lessons, and achievements.
          </p>

          {!showResetConfirm ? (
            <Button variant="ghost" onClick={() => setShowResetConfirm(true)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
              <RefreshCw className="w-4 h-4" />
              Reset Progress
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setShowResetConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="warning"
                onClick={handleReset}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Confirm Reset
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
