// Barrel export for all course modules
// Types are defined in ./types.ts, modules in ./modules/module-XX.ts

export type { Video, Exercise, Lesson, VocabItem, Module } from './types';
import type { Module, Lesson, VocabItem } from './types';

import { MODULE_1 } from './modules/module-01';
import { MODULE_2 } from './modules/module-02';
import { MODULE_3 } from './modules/module-03';
import { MODULE_4 } from './modules/module-04';
import { MODULE_5 } from './modules/module-05';
import { MODULE_6 } from './modules/module-06';
import { MODULE_7 } from './modules/module-07';
import { MODULE_8 } from './modules/module-08';
import { MODULE_9 } from './modules/module-09';
import { MODULE_10 } from './modules/module-10';
import { MODULE_11 } from './modules/module-11';
import { MODULE_12 } from './modules/module-12';
import { MODULE_13 } from './modules/module-13';
import { MODULE_14 } from './modules/module-14';
import { MODULE_15 } from './modules/module-15';
import { MODULE_16 } from './modules/module-16';
import { MODULE_17 } from './modules/module-17';
import { MODULE_18 } from './modules/module-18';

// All modules in order
export const ALL_MODULES: Module[] = [
  MODULE_1, MODULE_2, MODULE_3, MODULE_4,
  MODULE_5, MODULE_6, MODULE_7, MODULE_8,
  MODULE_9, MODULE_10, MODULE_11, MODULE_12,
  MODULE_13, MODULE_14, MODULE_15, MODULE_16,
  MODULE_17, MODULE_18,
];

// Helper function to get all vocabulary from all modules
export const getAllVocabulary = (): VocabItem[] => {
  const vocab: VocabItem[] = [];
  ALL_MODULES.forEach(module => {
    module.lessons.forEach(lesson => {
      vocab.push(...lesson.vocabulary);
    });
  });
  return vocab;
};

// Helper function to get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const module of ALL_MODULES) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

// Helper function to get module by ID
export const getModuleById = (moduleId: number): Module | undefined => {
  return ALL_MODULES.find(m => m.id === moduleId);
};

// Re-export individual modules for direct access
export {
  MODULE_1, MODULE_2, MODULE_3, MODULE_4,
  MODULE_5, MODULE_6, MODULE_7, MODULE_8,
  MODULE_9, MODULE_10, MODULE_11, MODULE_12,
  MODULE_13, MODULE_14, MODULE_15, MODULE_16,
  MODULE_17, MODULE_18,
};
