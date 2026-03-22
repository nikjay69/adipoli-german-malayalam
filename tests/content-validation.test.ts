/**
 * Comprehensive content validation tests for the German-Malayalam course
 * Run with: npx tsx tests/content-validation.test.ts
 */

import { ALL_MODULES, getAllVocabulary, getLessonById, getModuleById } from '../src/lib/content/modules';
import type { Module, Lesson, Exercise, VocabItem, Video } from '../src/lib/content/types';
import { JOURNEY_LOCATIONS, getCurrentLocation, getJourneyProgress, getLocationForModule } from '../src/lib/journey';

let passed = 0;
let failed = 0;
const errors: string[] = [];

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    errors.push(`FAIL: ${message}`);
  }
}

function section(name: string) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${name}`);
  console.log('='.repeat(60));
}

// ============================================================
// 1. MODULE STRUCTURE TESTS
// ============================================================
section('1. MODULE STRUCTURE');

assert(ALL_MODULES.length === 18, `Expected 18 modules, got ${ALL_MODULES.length}`);

for (const mod of ALL_MODULES) {
  assert(typeof mod.id === 'number' && mod.id >= 1 && mod.id <= 18,
    `Module ${mod.id}: invalid id`);
  assert(mod.title.length > 0, `Module ${mod.id}: empty title`);
  assert(mod.titleGerman.length > 0, `Module ${mod.id}: empty German title`);
  assert(mod.description.length > 10, `Module ${mod.id}: description too short`);
  assert(mod.icon.length > 0, `Module ${mod.id}: missing icon`);
  assert(mod.color.match(/^#[0-9a-fA-F]{6}$/) !== null,
    `Module ${mod.id}: invalid color "${mod.color}"`);
  assert(mod.totalHours > 0, `Module ${mod.id}: totalHours should be > 0`);
  assert(mod.lessons.length >= 4, `Module ${mod.id}: needs at least 4 lessons, has ${mod.lessons.length}`);
}

// Check sequential IDs
for (let i = 0; i < ALL_MODULES.length; i++) {
  assert(ALL_MODULES[i].id === i + 1,
    `Module at index ${i} has id ${ALL_MODULES[i].id}, expected ${i + 1}`);
}

// Unlock requirements
assert(!ALL_MODULES[0].unlockRequirement, 'Module 1 should have no unlock requirement');
for (let i = 1; i < ALL_MODULES.length; i++) {
  assert(ALL_MODULES[i].unlockRequirement !== undefined && ALL_MODULES[i].unlockRequirement!.length > 0,
    `Module ${ALL_MODULES[i].id}: should have unlock requirement`);
}

console.log(`  Modules: ${passed} passed`);

// ============================================================
// 2. LESSON TESTS
// ============================================================
section('2. LESSONS');

const allLessonIds = new Set<string>();
let totalLessons = 0;

for (const mod of ALL_MODULES) {
  for (const lesson of mod.lessons) {
    totalLessons++;

    // Unique IDs
    assert(!allLessonIds.has(lesson.id),
      `Duplicate lesson ID: ${lesson.id}`);
    allLessonIds.add(lesson.id);

    // ID format: "moduleId-lessonNum"
    assert(lesson.id.startsWith(`${mod.id}-`),
      `Lesson ${lesson.id}: ID should start with "${mod.id}-"`);

    // Required fields
    assert(lesson.title.length > 0, `Lesson ${lesson.id}: empty title`);
    assert(lesson.titleGerman.length > 0, `Lesson ${lesson.id}: empty German title`);
    assert(lesson.description.length > 10, `Lesson ${lesson.id}: description too short (${lesson.description.length} chars)`);
    assert(lesson.duration.length > 0, `Lesson ${lesson.id}: missing duration`);
    assert(lesson.xpReward > 0, `Lesson ${lesson.id}: xpReward should be > 0`);
    assert(lesson.xpReward <= 500, `Lesson ${lesson.id}: xpReward ${lesson.xpReward} seems too high`);

    // Content minimums
    assert(lesson.videos.length >= 1, `Lesson ${lesson.id}: needs at least 1 video, has ${lesson.videos.length}`);
    assert(lesson.exercises.length >= 2, `Lesson ${lesson.id}: needs at least 2 exercises, has ${lesson.exercises.length}`);
  }
}

assert(totalLessons >= 85, `Expected 85+ lessons, got ${totalLessons}`);
console.log(`  Total lessons: ${totalLessons}`);

// ============================================================
// 3. EXERCISE TESTS
// ============================================================
section('3. EXERCISES');

const allExerciseIds = new Set<string>();
let totalExercises = 0;
const exerciseTypes: Record<string, number> = {};

for (const mod of ALL_MODULES) {
  for (const lesson of mod.lessons) {
    for (const ex of lesson.exercises) {
      totalExercises++;

      // Unique IDs
      assert(!allExerciseIds.has(ex.id),
        `Duplicate exercise ID: ${ex.id}`);
      allExerciseIds.add(ex.id);

      // Valid type
      const validTypes = ['multiple-choice', 'fill-blank', 'matching', 'ordering', 'speaking'];
      assert(validTypes.includes(ex.type),
        `Exercise ${ex.id}: invalid type "${ex.type}"`);
      exerciseTypes[ex.type] = (exerciseTypes[ex.type] || 0) + 1;

      // Required fields
      assert(ex.question.length > 5, `Exercise ${ex.id}: question too short`);
      assert(ex.xpReward > 0, `Exercise ${ex.id}: xpReward should be > 0`);

      // Type-specific validation
      if (ex.type === 'multiple-choice') {
        assert(Array.isArray(ex.options) && ex.options.length >= 3,
          `Exercise ${ex.id}: MC needs 3+ options, has ${ex.options?.length}`);
        assert(typeof ex.correctAnswer === 'string',
          `Exercise ${ex.id}: MC correctAnswer should be string`);
        if (ex.options && typeof ex.correctAnswer === 'string') {
          assert(ex.options.includes(ex.correctAnswer),
            `Exercise ${ex.id}: correctAnswer "${ex.correctAnswer}" not in options`);
        }
      }

      if (ex.type === 'fill-blank') {
        assert(typeof ex.correctAnswer === 'string',
          `Exercise ${ex.id}: fill-blank correctAnswer should be string`);
      }

      if (ex.type === 'matching') {
        assert(Array.isArray(ex.options) && ex.options.length >= 2,
          `Exercise ${ex.id}: matching needs 2+ items`);
        assert(Array.isArray(ex.correctAnswer),
          `Exercise ${ex.id}: matching correctAnswer should be array`);
        if (Array.isArray(ex.correctAnswer) && Array.isArray(ex.options)) {
          assert(ex.options.length === ex.correctAnswer.length,
            `Exercise ${ex.id}: matching options (${ex.options.length}) and answers (${ex.correctAnswer.length}) count mismatch`);
        }
      }

      if (ex.type === 'ordering') {
        assert(Array.isArray(ex.options) && ex.options.length >= 3,
          `Exercise ${ex.id}: ordering needs 3+ items`);
        assert(Array.isArray(ex.correctAnswer),
          `Exercise ${ex.id}: ordering correctAnswer should be array`);
      }
    }
  }
}

assert(totalExercises >= 560, `Expected 560+ exercises, got ${totalExercises}`);
console.log(`  Total exercises: ${totalExercises}`);
console.log(`  By type: ${JSON.stringify(exerciseTypes)}`);

// ============================================================
// 4. VOCABULARY TESTS
// ============================================================
section('4. VOCABULARY');

const allVocabIds = new Set<string>();
let totalVocab = 0;
let vocabWithMalayalam = 0;
let vocabWithPronunciation = 0;
let vocabWithExample = 0;

for (const mod of ALL_MODULES) {
  for (const lesson of mod.lessons) {
    for (const vocab of lesson.vocabulary) {
      totalVocab++;

      // Unique IDs
      assert(!allVocabIds.has(vocab.id),
        `Duplicate vocab ID: ${vocab.id}`);
      allVocabIds.add(vocab.id);

      // Required fields
      assert(vocab.german.length > 0, `Vocab ${vocab.id}: empty german`);
      assert(vocab.english.length > 0, `Vocab ${vocab.id}: empty english`);
      assert(vocab.pronunciation.length > 0, `Vocab ${vocab.id}: empty pronunciation`);
      assert(vocab.example.length > 0, `Vocab ${vocab.id}: empty example`);
      assert(vocab.exampleTranslation.length > 0, `Vocab ${vocab.id}: empty exampleTranslation`);

      // Malayalam should be actual Malayalam script (Unicode range 0D00-0D7F)
      if (vocab.malayalam && vocab.malayalam.length > 0) {
        vocabWithMalayalam++;
        const hasMalayalamScript = /[\u0D00-\u0D7F]/.test(vocab.malayalam);
        if (!hasMalayalamScript) {
          // Not a hard fail, but flag it
          assert(false, `Vocab ${vocab.id}: malayalam "${vocab.malayalam}" doesn't contain Malayalam script`);
        }
      }

      if (vocab.pronunciation.length > 0) vocabWithPronunciation++;
      if (vocab.example.length > 0) vocabWithExample++;
    }
  }
}

assert(totalVocab >= 660, `Expected 660+ vocab items, got ${totalVocab}`);
console.log(`  Total vocabulary: ${totalVocab}`);
console.log(`  With Malayalam: ${vocabWithMalayalam} (${Math.round(vocabWithMalayalam / totalVocab * 100)}%)`);
console.log(`  With pronunciation: ${vocabWithPronunciation} (${Math.round(vocabWithPronunciation / totalVocab * 100)}%)`);
console.log(`  With examples: ${vocabWithExample} (${Math.round(vocabWithExample / totalVocab * 100)}%)`);

// getAllVocabulary helper
const allVocab = getAllVocabulary();
assert(allVocab.length === totalVocab,
  `getAllVocabulary() returned ${allVocab.length}, expected ${totalVocab}`);

// ============================================================
// 5. VIDEO TESTS
// ============================================================
section('5. VIDEOS');

const allVideoIds = new Set<string>();
let totalVideos = 0;

for (const mod of ALL_MODULES) {
  for (const lesson of mod.lessons) {
    for (const video of lesson.videos) {
      totalVideos++;

      // Unique IDs
      assert(!allVideoIds.has(video.id),
        `Duplicate video ID: ${video.id}`);
      allVideoIds.add(video.id);

      // Required fields
      assert(video.title.length > 0, `Video ${video.id}: empty title`);
      assert(video.duration.length > 0, `Video ${video.id}: empty duration`);
      assert(video.description.length > 5, `Video ${video.id}: description too short`);

      // Script outline should have substance
      assert(Array.isArray(video.scriptOutline), `Video ${video.id}: scriptOutline should be array`);
      assert(video.scriptOutline.length >= 3,
        `Video ${video.id}: scriptOutline needs 3+ items, has ${video.scriptOutline.length}`);

      // Key vocabulary
      assert(Array.isArray(video.keyVocabulary), `Video ${video.id}: keyVocabulary should be array`);

      // Learning objectives
      assert(Array.isArray(video.learningObjectives), `Video ${video.id}: learningObjectives should be array`);
      assert(video.learningObjectives.length >= 2,
        `Video ${video.id}: needs 2+ learning objectives, has ${video.learningObjectives.length}`);
    }
  }
}

assert(totalVideos >= 130, `Expected 130+ videos, got ${totalVideos}`);
console.log(`  Total videos: ${totalVideos}`);

// ============================================================
// 6. HELPER FUNCTION TESTS
// ============================================================
section('6. HELPER FUNCTIONS');

// getModuleById
for (let i = 1; i <= 18; i++) {
  const mod = getModuleById(i);
  assert(mod !== undefined, `getModuleById(${i}) returned undefined`);
  assert(mod?.id === i, `getModuleById(${i}) returned module with id ${mod?.id}`);
}
assert(getModuleById(0) === undefined, 'getModuleById(0) should be undefined');
assert(getModuleById(19) === undefined, 'getModuleById(19) should be undefined');

// getLessonById
const firstLesson = getLessonById('1-1');
assert(firstLesson !== undefined, 'getLessonById("1-1") should find lesson');
assert(firstLesson?.title === 'Why Learn German?', `Lesson 1-1 title: "${firstLesson?.title}"`);

const lastLesson = getLessonById('18-6');
assert(lastLesson !== undefined, 'getLessonById("18-6") should find lesson');

assert(getLessonById('999-999') === undefined, 'getLessonById("999-999") should be undefined');

console.log(`  Helper functions: all tested`);

// ============================================================
// 7. JOURNEY MAP TESTS
// ============================================================
section('7. JOURNEY MAP');

assert(JOURNEY_LOCATIONS.length === 8, `Expected 8 journey locations, got ${JOURNEY_LOCATIONS.length}`);

const locationIds = new Set<string>();
for (const loc of JOURNEY_LOCATIONS) {
  assert(!locationIds.has(loc.id), `Duplicate location ID: ${loc.id}`);
  locationIds.add(loc.id);

  assert(loc.name.length > 0, `Location ${loc.id}: empty name`);
  assert(loc.nameManglish.length > 0, `Location ${loc.id}: empty nameManglish`);
  assert(loc.icon.length > 0, `Location ${loc.id}: empty icon`);
  assert(loc.moduleRange[0] <= loc.moduleRange[1],
    `Location ${loc.id}: invalid moduleRange [${loc.moduleRange}]`);
}

// All modules should be covered by journey locations
const coveredModules = new Set<number>();
for (const loc of JOURNEY_LOCATIONS) {
  for (let m = loc.moduleRange[0]; m <= loc.moduleRange[1]; m++) {
    coveredModules.add(m);
  }
}
for (let m = 1; m <= 18; m++) {
  assert(coveredModules.has(m), `Module ${m} not covered by any journey location`);
}

// getCurrentLocation
assert(getCurrentLocation(0).id === 'home', 'Start location should be Home');
assert(getCurrentLocation(18).id === 'gate', 'After 18 modules should be at Gate');

// getJourneyProgress
assert(getJourneyProgress(0) === 0, 'Progress at 0 modules should be 0%');
assert(getJourneyProgress(18) === 100, 'Progress at 18 modules should be 100%');
assert(getJourneyProgress(9) === 50, 'Progress at 9 modules should be 50%');

// getLocationForModule
assert(getLocationForModule(1).id === 'basics', 'Module 1 should be in Basics');
assert(getLocationForModule(17).id === 'gate', 'Module 17 should be at Gate');

console.log(`  Journey map: all tested`);

// ============================================================
// 8. CONTENT QUALITY CHECKS
// ============================================================
section('8. CONTENT QUALITY');

// Check German content has actual German words
const germanPatterns = [/[äöüß]/i, /sch/i, /ch/i, /ei/i];
let modulesWithGerman = 0;
for (const mod of ALL_MODULES) {
  const allText = mod.lessons.flatMap(l =>
    l.vocabulary.map(v => v.german)
  ).join(' ');
  const hasGerman = germanPatterns.some(p => p.test(allText));
  if (hasGerman) modulesWithGerman++;
}
assert(modulesWithGerman >= 16, `At least 16 modules should have German umlauts/sounds, got ${modulesWithGerman}`);

// Check exercise variety per module (not all same type)
for (const mod of ALL_MODULES) {
  const types = new Set<string>();
  for (const lesson of mod.lessons) {
    for (const ex of lesson.exercises) {
      types.add(ex.type);
    }
  }
  assert(types.size >= 2, `Module ${mod.id}: needs 2+ exercise types, has ${types.size} (${[...types].join(', ')})`);
}

// Check XP progression makes sense
let prevModXP = 0;
for (const mod of ALL_MODULES) {
  const modXP = mod.lessons.reduce((sum, l) => sum + l.xpReward, 0);
  // Each module should offer reasonable XP
  assert(modXP >= 400, `Module ${mod.id}: total XP ${modXP} seems too low`);
}

// Goethe exam modules (17, 18) should have more exercises
const mod17 = getModuleById(17)!;
const mod18 = getModuleById(18)!;
const mod17exercises = mod17.lessons.reduce((s, l) => s + l.exercises.length, 0);
const mod18exercises = mod18.lessons.reduce((s, l) => s + l.exercises.length, 0);
assert(mod17exercises >= 40, `Module 17 (exam): needs 40+ exercises, has ${mod17exercises}`);
assert(mod18exercises >= 40, `Module 18 (exam): needs 40+ exercises, has ${mod18exercises}`);

console.log(`  Content quality: checked`);

// ============================================================
// 9. CURRICULUM COVERAGE (A1 TOPICS)
// ============================================================
section('9. A1 CURRICULUM COVERAGE');

// Key A1 topics that should be covered
const a1Topics = [
  { name: 'Greetings', pattern: /Hallo|Guten (Morgen|Tag|Abend)/i },
  { name: 'Self-introduction', pattern: /Ich heiße|Ich bin|Wie heißt/i },
  { name: 'Numbers', pattern: /Zahlen|eins|zwei|drei/i },
  { name: 'Family', pattern: /Familie|Mutter|Vater|Bruder/i },
  { name: 'Food & Drink', pattern: /Essen|Trinken|Brot|Kaffee/i },
  { name: 'Daily routine', pattern: /aufstehen|frühstück|Routine/i },
  { name: 'Shopping', pattern: /Einkaufen|kaufen|Preis|Euro/i },
  { name: 'Housing', pattern: /Wohnung|Zimmer|Miete/i },
  { name: 'Transportation', pattern: /Bus|Bahn|Zug|Fahrkarte/i },
  { name: 'Health', pattern: /Arzt|Schmerzen|krank|Apotheke/i },
  { name: 'Work', pattern: /Arbeit|Beruf|Büro/i },
  { name: 'Past tense', pattern: /Perfekt|gemacht|gegangen|haben.*Partizip/i },
  { name: 'Modal verbs', pattern: /können|müssen|dürfen|wollen/i },
  { name: 'Accusative', pattern: /Akkusativ|einen|eine|ein.*Kaffee/i },
  { name: 'Dative', pattern: /Dativ|dem|der.*Dativ|mir|dir/i },
];

for (const topic of a1Topics) {
  const allContent = ALL_MODULES.flatMap(m =>
    m.lessons.flatMap(l => [
      l.title, l.titleGerman, l.description,
      ...l.vocabulary.map(v => v.german),
      ...l.exercises.map(e => e.question),
      ...l.videos.flatMap(v => v.scriptOutline),
    ])
  ).join(' ');

  const covered = topic.pattern.test(allContent);
  assert(covered, `A1 topic "${topic.name}" not found in content`);
}

console.log(`  A1 topics: all verified`);

// ============================================================
// 10. GOETHE EXAM FORMAT VALIDATION
// ============================================================
section('10. GOETHE A1 EXAM FORMAT');

// Module 17: Hören & Lesen
assert(mod17.lessons.length === 6, `Module 17 should have 6 lessons, has ${mod17.lessons.length}`);

// Module 18: Schreiben & Sprechen
assert(mod18.lessons.length === 6, `Module 18 should have 6 lessons, has ${mod18.lessons.length}`);

// Check mock exam lessons exist
const mockHorenLesen = getLessonById('17-6');
assert(mockHorenLesen !== undefined, 'Mock exam lesson 17-6 should exist');
assert(mockHorenLesen!.exercises.length >= 10,
  `Mock exam 17-6 should have 10+ exercises, has ${mockHorenLesen?.exercises.length}`);

const mockFull = getLessonById('18-6');
assert(mockFull !== undefined, 'Full mock exam lesson 18-6 should exist');
assert(mockFull!.exercises.length >= 10,
  `Full mock exam 18-6 should have 10+ exercises, has ${mockFull?.exercises.length}`);

console.log(`  Goethe format: validated`);

// ============================================================
// FINAL REPORT
// ============================================================
section('FINAL REPORT');

console.log(`\n  Total tests:  ${passed + failed}`);
console.log(`  Passed:       ${passed}`);
console.log(`  Failed:       ${failed}`);

if (errors.length > 0) {
  console.log(`\n  FAILURES:`);
  for (const err of errors) {
    console.log(`    ${err}`);
  }
}

console.log(`\n  CONTENT SUMMARY:`);
console.log(`    Modules:    ${ALL_MODULES.length}`);
console.log(`    Lessons:    ${totalLessons}`);
console.log(`    Exercises:  ${totalExercises}`);
console.log(`    Vocabulary: ${totalVocab}`);
console.log(`    Videos:     ${totalVideos}`);
console.log(`    Locations:  ${JOURNEY_LOCATIONS.length}`);

const totalXP = ALL_MODULES.flatMap(m => m.lessons).reduce((s, l) => s + l.xpReward, 0);
const totalHours = ALL_MODULES.reduce((s, m) => s + m.totalHours, 0);
console.log(`    Total XP:   ${totalXP}`);
console.log(`    Total hours: ${totalHours}`);

process.exit(failed > 0 ? 1 : 0);
