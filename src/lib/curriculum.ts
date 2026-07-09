import { ALL_MODULES } from '@/lib/content/modules';
import type { LessonProgress, SpineCheckpointResult } from '@/lib/store';
import { SPINE_SOURCE_MODULE_IDS } from '@/lib/spine-map';

export const OPTIONAL_MODULE_IDS = new Set([16]);

/** Checkpoint context for spine-aware unlocking (client reads these from the store). */
export type SpineUnlockContext = {
  spineCheckpoints: Record<number, SpineCheckpointResult>;
  module1Passed: boolean;
};

function isLessonCompleted(completedLessons: LessonProgress[], lessonId: string) {
  return completedLessons.some((l) => l.lessonId === lessonId);
}

function isModuleCompleted(moduleId: number, completedLessons: LessonProgress[]) {
  const courseModule = ALL_MODULES.find((m) => m.id === moduleId);
  if (!courseModule) return false;
  return courseModule.lessons.every((lesson) => isLessonCompleted(completedLessons, lesson.id));
}

function spineEntryFor(moduleId: number): { spineId: number; sourceIds: number[] } | null {
  for (const [spineIdStr, ids] of Object.entries(SPINE_SOURCE_MODULE_IDS)) {
    if (ids.includes(moduleId)) return { spineId: Number(spineIdStr), sourceIds: ids };
  }
  return null;
}

/**
 * Spine-aware module unlocking. Library modules that are required spine blocks
 * unlock with their spine module: the first source module needs the previous
 * spine module's checkpoint passed, later source modules need the previous
 * source module's lessons done. Modules outside the spine (2, 13, 15, 16) are
 * open practice library — recovery prescriptions link straight into them.
 * Without checkpoint context (spine arg), falls back to the legacy linear rule
 * for spine modules so server/legacy callers stay conservative.
 */
export function isModuleUnlocked(
  moduleId: number,
  completedLessons: LessonProgress[],
  spine?: SpineUnlockContext,
) {
  if (moduleId === 1) return true;

  const entry = spineEntryFor(moduleId);
  if (!entry) return true; // open practice library

  const sourceIndex = entry.sourceIds.indexOf(moduleId);
  if (sourceIndex > 0) return isModuleCompleted(entry.sourceIds[sourceIndex - 1], completedLessons);

  // First source module of its spine module: needs the previous spine
  // module's checkpoint passed.
  if (spine) {
    const prevSpineId = entry.spineId - 1;
    if (prevSpineId < 1) return true;
    if (prevSpineId === 1) return spine.module1Passed;
    return (spine.spineCheckpoints?.[prevSpineId]?.state ?? 'FAIL') !== 'FAIL';
  }

  // Legacy fallback (no checkpoint context): previous core module complete.
  const moduleIndex = ALL_MODULES.findIndex((m) => m.id === moduleId);
  const previousCoreModules = ALL_MODULES.slice(0, moduleIndex).filter((m) => !OPTIONAL_MODULE_IDS.has(m.id));
  const requiredPreviousModule = previousCoreModules[previousCoreModules.length - 1];
  if (!requiredPreviousModule) return true;
  return isModuleCompleted(requiredPreviousModule.id, completedLessons);
}

export function isLessonUnlocked(
  moduleId: number,
  lessonId: string,
  completedLessons: LessonProgress[],
  spine?: SpineUnlockContext,
) {
  const courseModule = ALL_MODULES.find((m) => m.id === moduleId);
  if (!courseModule) return false;
  if (!isModuleUnlocked(moduleId, completedLessons, spine)) return false;

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
