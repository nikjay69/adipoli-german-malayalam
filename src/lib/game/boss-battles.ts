// Boss Battle System
// End-of-module challenges that mix exercise types with dramatic presentation

import type { Exercise } from '@/lib/content/types';

export interface BossBattle {
  moduleId: number;
  bossName: string;
  bossNameGerman: string;
  bossEmoji: string;
  description: string;
  kuttanWarning: string;
  /** Exercises mixed from the module */
  rounds: Exercise[];
  /** Total seconds for the entire battle */
  timeLimit: number;
  /** Minimum score % to win */
  passingScore: number;
  /** XP reward for winning */
  xpReward: number;
  /** Scene type for ambience + background */
  sceneType: string;
  /** Optional cosmetic unlock on victory */
  unlockReward?: { id: string; name: string; emoji: string };
}

// ── Boss definitions ──────────────────────────────────────────

export const BOSS_BATTLES: Record<number, BossBattle> = {
  1: {
    moduleId: 1,
    bossName: 'The Border Officer',
    bossNameGerman: 'Der Grenzbeamte',
    bossEmoji: '👮',
    description: 'Prove you can survive your first day in Germany! Answer the officer\'s questions correctly to enter the country!',
    kuttanWarning: 'Machane... border officer ninnod chodikunnu! Ellaam correct-aayi answer cheythal maatre Germany-il keraan pattoo! Ready aano?!',
    sceneType: 'bahnhof',
    timeLimit: 120,
    passingScore: 70,
    xpReward: 200,
    unlockReward: { id: 'passport-stamp', name: 'Passport Stamp', emoji: '📕' },
    rounds: [
      { id: 'boss1-1', type: 'multiple-choice', question: 'The officer says "Guten Tag." It\'s 3 PM. What is the correct response?', options: ['Guten Morgen!', 'Guten Tag!', 'Gute Nacht!', 'Moin!'], correctAnswer: 'Guten Tag!', explanation: 'Guten Tag is correct for afternoon. Morgen = morning, Nacht = night.', xpReward: 10 },
      { id: 'boss1-2', type: 'type-answer', question: 'The officer asks: "Wie heißen Sie?" Type your response starting with "Ich heiße..."', correctAnswer: 'Ich heiße', explanation: '"Ich heiße..." means "My name is..." — the standard formal self-introduction.', xpReward: 15 },
      { id: 'boss1-3', type: 'multiple-choice', question: '"Ihren Pass, bitte." What does the officer want?', options: ['Your phone', 'Your passport', 'Your ticket', 'Your bag'], correctAnswer: 'Your passport', explanation: 'Pass = passport, bitte = please. "Ihren Pass, bitte" = "Your passport, please."', xpReward: 10 },
      { id: 'boss1-4', type: 'fill-blank', question: 'You hand over your passport: "_____, bitte."', options: ['Hier', 'Dort', 'Wo', 'Nein'], correctAnswer: 'Hier', explanation: '"Hier, bitte" = "Here, please" — the most natural way to hand something over.', xpReward: 10 },
      { id: 'boss1-5', type: 'multiple-choice', question: 'The officer says "Willkommen in Deutschland!" What does this mean?', options: ['Welcome to Germany!', 'Goodbye from Germany!', 'Where are you from?', 'How long will you stay?'], correctAnswer: 'Welcome to Germany!', explanation: 'Willkommen = welcome, Deutschland = Germany.', xpReward: 10 },
      { id: 'boss1-6', type: 'type-answer', question: 'How do you say "Thank you!" in German?', correctAnswer: 'Danke', explanation: '"Danke" or "Danke schön" = Thank you. Essential survival word!', xpReward: 10 },
      { id: 'boss1-7', type: 'multiple-choice', question: 'A student says "Hey, wie heißt du?" vs the officer said "Wie heißen Sie?" What\'s the difference?', options: ['du = informal, Sie = formal', 'du = formal, Sie = informal', 'No difference', 'du = plural, Sie = singular'], correctAnswer: 'du = informal, Sie = formal', explanation: '"du" is informal (friends, peers), "Sie" is formal (officials, strangers, older people).', xpReward: 15 },
      { id: 'boss1-8', type: 'fill-blank', question: 'It\'s 8 PM. You arrive at the hotel. The receptionist greets you: "Guten _____!"', options: ['Morgen', 'Tag', 'Abend', 'Nacht'], correctAnswer: 'Abend', explanation: '"Guten Abend" = Good evening. Used from about 6 PM until bedtime.', xpReward: 10 },
      { id: 'boss1-9', type: 'multiple-choice', question: 'You want to say goodbye formally. Which is the safest option?', options: ['Tschüss!', 'Auf Wiedersehen!', 'Moin!', 'Ciao!'], correctAnswer: 'Auf Wiedersehen!', explanation: '"Auf Wiedersehen" is the safest formal goodbye. "Tschüss" is more casual.', xpReward: 10 },
      { id: 'boss1-10', type: 'type-answer', question: 'How do you say "Excuse me" / "Sorry" in German? (the polite version)', correctAnswer: 'Entschuldigung', explanation: '"Entschuldigung" = Excuse me / I\'m sorry. Used to get attention or apologize.', xpReward: 15 },
    ],
  },
};

export function getBossBattle(moduleId: number): BossBattle | undefined {
  return BOSS_BATTLES[moduleId];
}

export function isBossUnlocked(moduleId: number, completedLessons: { lessonId: string }[], allLessons: { id: string }[]): boolean {
  return allLessons.every(lesson => completedLessons.some(cl => cl.lessonId === lesson.id));
}
