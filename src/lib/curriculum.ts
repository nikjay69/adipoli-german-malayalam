import { ALL_MODULES } from '@/lib/content/modules';
import type { LessonProgress } from '@/lib/store';

export const OPTIONAL_MODULE_IDS = new Set([16]);

function isLessonCompleted(completedLessons: LessonProgress[], lessonId: string) {
  return completedLessons.some((l) => l.lessonId === lessonId);
}

function isModuleCompleted(moduleId: number, completedLessons: LessonProgress[]) {
  const courseModule = ALL_MODULES.find((m) => m.id === moduleId);
  if (!courseModule) return false;
  return courseModule.lessons.every((lesson) => isLessonCompleted(completedLessons, lesson.id));
}

export function isModuleUnlocked(moduleId: number, completedLessons: LessonProgress[]) {
  const moduleIndex = ALL_MODULES.findIndex((m) => m.id === moduleId);
  if (moduleIndex <= 0) return true;

  const previousCoreModules = ALL_MODULES
    .slice(0, moduleIndex)
    .filter((m) => !OPTIONAL_MODULE_IDS.has(m.id));

  const requiredPreviousModule = previousCoreModules[previousCoreModules.length - 1];
  if (!requiredPreviousModule) return true;

  return isModuleCompleted(requiredPreviousModule.id, completedLessons);
}

export function isLessonUnlocked(moduleId: number, lessonId: string, completedLessons: LessonProgress[]) {
  const courseModule = ALL_MODULES.find((m) => m.id === moduleId);
  if (!courseModule) return false;
  if (!isModuleUnlocked(moduleId, completedLessons)) return false;

  const lessonIndex = courseModule.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (lessonIndex === -1) return false;
  if (lessonIndex === 0) return true;

  return isLessonCompleted(completedLessons, courseModule.lessons[lessonIndex - 1].id);
}

export function getNextCoreLesson(completedLessons: LessonProgress[]) {
  const preferredModules = ALL_MODULES.filter((m) => !OPTIONAL_MODULE_IDS.has(m.id));
  for (const courseModule of preferredModules) {
    for (const lesson of courseModule.lessons) {
      if (!isLessonCompleted(completedLessons, lesson.id) && isLessonUnlocked(courseModule.id, lesson.id, completedLessons)) {
        return { module: courseModule, lesson };
      }
    }
  }
  return null;
}
