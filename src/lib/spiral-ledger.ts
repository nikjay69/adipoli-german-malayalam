import { ALL_MODULES } from '@/lib/content/modules';

type SpineModuleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SpineLessonNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type SpineLessonId = `M${SpineModuleNumber}L${SpineLessonNumber}`;

export const SPINE_LESSON_IDS = Array.from(
  { length: 8 },
  (_, moduleIndex) =>
    Array.from(
      { length: 7 },
      (_, lessonIndex) => `M${moduleIndex + 1}L${lessonIndex + 1}`,
    ),
).flat() as SpineLessonId[];
export type SpiralReturnId = SpineLessonId | 'exam-day-srs';

const SOURCE_LESSONS_BY_SPINE_ROW: Record<SpineLessonId, string[]> = {
  M1L1: ['1-3'],
  M1L2: ['1-1'],
  M1L3: ['1-2'],
  M1L4: ['1-3', '1-6'],
  M1L5: ['1-4'],
  M1L6: ['1-4'],
  M1L7: ['1-5'],
  M2L1: ['2-1'],
  M2L2: ['2-2'],
  M2L3: ['2-3', '2-4'],
  M2L4: ['3-1', '3-2'],
  M2L5: ['3-3', '3-4'],
  M2L6: ['3-5', '3-6'],
  M2L7: ['2-5'],
  M3L1: ['4-1', '4-5'],
  M3L2: ['4-2'],
  M3L3: ['4-4'],
  M3L4: ['4-3'],
  M3L5: ['8-1', '8-2', '8-3'],
  M3L6: ['5-1', '5-2'],
  M3L7: ['5-3', '5-4', '5-5'],
  M4L1: ['6-1', '6-2'],
  M4L2: ['6-3'],
  M4L3: ['6-4'],
  M4L4: ['7-1'],
  M4L5: ['7-2'],
  M4L6: ['7-3', '7-4', '7-5'],
  M4L7: ['6-5'],
  M5L1: ['9-1', '9-2'],
  M5L2: ['9-3'],
  M5L3: ['9-4'],
  M5L4: ['9-5'],
  M5L5: ['3-6', '10-3'],
  M5L6: ['10-1', '10-2'],
  M5L7: ['10-3', '10-4', '10-5'],
  M6L1: ['11-1'],
  M6L2: ['11-2'],
  M6L3: ['11-4', '11-5'],
  M6L4: ['12-1'],
  M6L5: ['12-2'],
  M6L6: ['12-3', '12-4'],
  M6L7: ['11-3', '12-4'],
  M7L1: ['14-1'],
  M7L2: ['14-1', '17-2', '17-3'],
  M7L3: ['14-2'],
  M7L4: ['14-3'],
  M7L5: ['17-4'],
  M7L6: ['17-5'],
  M7L7: ['17-5'],
  M8L1: ['17-1'],
  M8L2: ['17-2', '17-3', '17-6'],
  M8L3: ['17-4', '17-5', '17-6'],
  M8L4: ['18-1', '18-2'],
  M8L5: ['18-3'],
  M8L6: ['18-4', '18-5'],
  M8L7: ['18-6', '18-7'],
};

const vocabularyIdsBySourceLesson = new Map(
  ALL_MODULES.flatMap((courseModule) =>
    courseModule.lessons.map(
      (lesson) =>
        [
          lesson.id,
          lesson.vocabulary.map((item) => item.id),
        ] as const,
    ),
  ),
);

function getLaterReturns(lessonId: SpineLessonId): SpiralReturnId[] {
  const match = /^M(\d)L(\d)$/.exec(lessonId);
  if (!match) return [];
  const moduleId = Number(match[1]);
  const lessonNumber = Number(match[2]);

  if (moduleId < 7) {
    return [`M${moduleId + 1}L${lessonNumber}` as SpineLessonId, 'M8L7'];
  }
  if (moduleId === 7) {
    return lessonNumber === 7
      ? ['M8L7']
      : [`M8L${lessonNumber}` as SpineLessonId, 'M8L7'];
  }
  return lessonNumber === 7 ? ['exam-day-srs'] : ['M8L7'];
}

export type SpiralLedgerRow = {
  lessonId: SpineLessonId;
  sourceLessonIds: string[];
  srsVocabIds: string[];
  laterReturns: SpiralReturnId[];
};

export const SPIRAL_LEDGER: SpiralLedgerRow[] = SPINE_LESSON_IDS.map(
  (lessonId) => {
    const sourceLessonIds = SOURCE_LESSONS_BY_SPINE_ROW[lessonId];
    const srsVocabIds = [
      ...new Set(
        sourceLessonIds.flatMap(
          (sourceLessonId) =>
            vocabularyIdsBySourceLesson.get(sourceLessonId) ?? [],
        ),
      ),
    ];
    return {
      lessonId,
      sourceLessonIds,
      srsVocabIds,
      laterReturns: getLaterReturns(lessonId),
    };
  },
);

export function getSpineRowForSourceLesson(
  sourceLessonId: string,
): SpineLessonId | undefined {
  return SPIRAL_LEDGER.find((row) =>
    row.sourceLessonIds.includes(sourceLessonId),
  )?.lessonId;
}
