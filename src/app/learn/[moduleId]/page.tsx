'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Lock, CheckCircle, Clock, Star, Play } from 'lucide-react';
import { Card, Button, ProgressBar, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { getModuleById } from '@/lib/content/modules';

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const router = useRouter();
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const module = getModuleById(parseInt(moduleId));

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="px-4 py-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Module not found</h1>
        <Link href="/learn">
          <Button className="mt-4">Back to Learn</Button>
        </Link>
      </div>
    );
  }

  const completedModuleLessons = userProgress.completedLessons.filter(l =>
    module.lessons.some(ml => ml.id === l.lessonId)
  ).length;
  const moduleProgress = (completedModuleLessons / module.lessons.length) * 100;

  // Find next incomplete lesson
  const nextLesson = module.lessons.find(
    lesson => !userProgress.completedLessons.some(l => l.lessonId === lesson.id)
  );

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </motion.div>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="overflow-hidden">
          <div
            className="h-32 -m-5 mb-4 flex items-center justify-center text-6xl"
            style={{ backgroundColor: module.color + '30' }}
          >
            {module.icon}
          </div>
          <div className="pt-2">
            <Badge variant="secondary" size="sm" className="mb-2">Module {module.id}</Badge>
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
              {module.title}
            </h1>
            <p className="text-sm text-[var(--foreground)]/50 mb-1">
              {module.titleGerman}
            </p>
            <p className="text-[var(--foreground)]/60 mb-4">
              {module.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-[var(--foreground)]/50 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {module.totalHours} hours
              </span>
              <span>{module.lessons.length} lessons</span>
              <span>{module.lessons.reduce((acc, l) => acc + l.vocabulary.length, 0)} words</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[var(--foreground)]/50">Progress</span>
                <span className="font-medium text-[var(--foreground)]/80">
                  {completedModuleLessons}/{module.lessons.length} lessons ({Math.round(moduleProgress)}%)
                </span>
              </div>
              <ProgressBar
                progress={moduleProgress}
                color={moduleProgress === 100 ? 'success' : 'primary'}
                size="lg"
              />
            </div>

            {nextLesson && (
              <Link href={`/learn/${module.id}/${nextLesson.id}`}>
                <Button fullWidth>
                  <Play className="w-5 h-5" />
                  {completedModuleLessons === 0 ? 'Start Module' : 'Continue Learning'}
                </Button>
              </Link>
            )}

            {moduleProgress === 100 && (
              <div className="text-center py-2">
                <Badge variant="success">
                  <CheckCircle className="w-4 h-4 mr-1" /> Module Completed!
                </Badge>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Lessons List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">Lessons</h2>
        <div className="space-y-3">
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
                <Card
                  hover={!isLessonLocked}
                  className={`${
                    isLessonLocked
                      ? 'opacity-50 cursor-not-allowed'
                      : isCompleted
                      ? 'border-2 border-[#27ae60]/30'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isLessonLocked
                        ? 'bg-[var(--foreground)]/10'
                        : isCompleted
                        ? 'bg-[#27ae60]'
                        : 'bg-[#e94560]'
                    }`}>
                      {isLessonLocked ? (
                        <Lock className="w-5 h-5 text-[var(--foreground)]/40" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white text-lg font-bold">{lessonIndex + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${
                        isLessonLocked ? 'text-[var(--foreground)]/40' : 'text-[var(--foreground)]'
                      }`}>
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-[var(--foreground)]/50 line-clamp-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-[var(--foreground)]/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lesson.duration}
                        </span>
                        <span className="text-xs text-[var(--foreground)]/50">
                          {lesson.videos.length} video{lesson.videos.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-xs text-[var(--foreground)]/50">
                          {lesson.vocabulary.length} words
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {isCompleted && completedLesson && (
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span className="text-sm font-medium">{completedLesson.score}%</span>
                        </div>
                      )}
                      {!isLessonLocked && !isCompleted && (
                        <Badge variant="success" size="sm">+{lesson.xpReward} XP</Badge>
                      )}
                      <ChevronRight className={`w-5 h-5 ${
                        isLessonLocked ? 'text-[var(--foreground)]/30' : 'text-[var(--foreground)]/40'
                      }`} />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
