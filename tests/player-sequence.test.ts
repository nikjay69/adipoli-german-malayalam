import assert from 'node:assert/strict';
import { buildGameSequence } from '../src/lib/game-engine/scene-builder';
import type { Lesson } from '../src/lib/content/types';

const lesson: Lesson = {
  id: 'test-1',
  title: 'A deliberate lesson',
  titleGerman: 'Eine Lektion',
  description: 'Prove that the player preserves authored pedagogy.',
  duration: '10 min',
  xpReward: 10,
  videos: [{
    id: 'video-1',
    title: 'Teach the pattern',
    duration: '2:00',
    description: 'The app-native explanation must survive before video recording.',
    scriptOutline: ['Model the line', 'Notice the pattern'],
    keyVocabulary: ['Hallo'],
    learningObjectives: ['Use the line in context'],
    placeholderThumbnail: '/test.png',
  }],
  vocabulary: [{
    id: 'vocab-1',
    german: 'Hallo',
    english: 'hello',
    malayalam: 'നമസ്കാരം',
    pronunciation: 'ha-lo',
    example: 'Hallo, Frau Fischer.',
    exampleTranslation: 'Hello, Ms Weber.',
  }],
  exercises: [
    { id: 'recognise', type: 'multiple-choice', question: 'Choose the greeting.', options: ['Hallo', 'Tschüss'], correctAnswer: 'Hallo', xpReward: 1 },
    { id: 'dictate', type: 'dictation', question: 'Listen and type.', correctAnswer: 'Hallo Frau Fischer', audioUrl: '/audio/test.mp3', xpReward: 1 },
    { id: 'speak', type: 'speaking', question: 'Say the greeting.', correctAnswer: 'Hallo Frau Fischer', xpReward: 1 },
  ],
  storyScene: {
    learnerOwner: 'nivin',
    setting: { name: 'Goethe Kochi', sceneType: 'classroom', timeOfDay: 'morning', description: 'Class begins.' },
    narrative: { currentObjective: 'Greet Frau Fischer.', nextTeaser: 'Introduce yourself next.' },
    peerIntro: ['Ready.'],
    vocabEncounters: [{ vocabId: 'vocab-1', encounterMoment: 'Frau Fischer enters.', contextSentence: 'Hallo.' }],
    decisionPoints: [],
  },
};

const first = buildGameSequence(lesson, lesson.vocabulary, lesson.exercises);
const second = buildGameSequence(lesson, lesson.vocabulary, lesson.exercises);

assert.deepEqual(
  first.map((moment) => [moment.type, moment.exercise?.id]),
  second.map((moment) => [moment.type, moment.exercise?.id]),
  'the same lesson must produce the same sequence every time',
);
assert.deepEqual(
  first.filter((moment) => moment.exercise).map((moment) => moment.exercise?.id),
  lesson.exercises.map((exercise) => exercise.id),
  'exercise order must remain authored',
);
assert.equal(first.filter((moment) => moment.type === 'teach').length, 1, 'video material must become app-native teaching');
assert.equal(first.some((moment) => moment.type === 'reaction'), false, 'filler reactions must not interrupt the lesson');
assert.deepEqual(
  first.filter((moment) => moment.exercise).map((moment) => moment.exercise?.type),
  ['multiple-choice', 'dictation', 'speaking'],
  'production exercise identities must survive the sequence builder',
);

console.log('player sequence: deterministic, authored, teaching-complete, production-safe');
