// Scene Builder
// Transforms lesson data into a sequence of GameMoments
// that play as one continuous game — no passive screens.

import type { Lesson, Exercise, VocabItem } from '@/lib/content/types';
import type { GameMoment, GameChoice } from './types';
import { SCENE_IMAGES, pickGameType, pickDiscoveryGame } from './types';

// Short Kuttan lines — max 50 chars. Punchy, not paragraphs.
const KUTTAN_INTROS = [
  "Ready? Let's do this! 💪",
  "New adventure! Come on! 🚀",
  "This is gonna be fun! ✨",
  "Let's learn together! 🤝",
  "Ooh, I'm excited! 🔥",
];

const KUTTAN_VOCAB_REACT = [
  "Ooh, nice word! 🧠",
  "Remember this one! ⭐",
  "Easy! Next one! 😎",
  "I like this word! 💛",
  "We got this! 💪",
];

const KUTTAN_GAME_INTROS = [
  "Your turn! 🎮",
  "Show me what you got! ⚡",
  "Quick challenge! 🎯",
  "Can you do this? 🤔",
  "Let's test ourselves! 🔥",
];

const KUTTAN_CELEBRATIONS = [
  "We're killing it! 🔥",
  "Unstoppable! 💪",
  "Team Kuttan FTW! 🏆",
  "Wunderbar! ✨",
  "ADIPOLI! 🎉",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Build the game sequence for a lesson.
 * Every moment is interactive — zero passive reading screens.
 */
export function buildGameSequence(
  lesson: Lesson,
  shownVocab: VocabItem[],
  exercises: Exercise[],
): GameMoment[] {
  const moments: GameMoment[] = [];
  const scene = lesson.storyScene;
  const sceneType = scene?.setting.sceneType || 'classroom';
  const sceneImage = SCENE_IMAGES[sceneType] || SCENE_IMAGES.classroom;
  let momentId = 0;
  const id = () => `m-${momentId++}`;

  // ── 1. Opening scene — Kuttan + scene image + 1 line ──
  moments.push({
    id: id(),
    type: 'scene',
    sceneImage,
    kuttan: { mood: 'waving', position: 'center' },
    dialogue: {
      speaker: 'Kuttan',
      text: pick(KUTTAN_INTROS),
    },
    autoAdvanceMs: 2500,
  });

  // ── 2. Vocab discovery — each word is a game ──
  shownVocab.forEach((vocab, i) => {
    // Word discovery game — different type each time
    moments.push({
      id: id(),
      type: 'word-discover',
      sceneImage,
      vocab,
      discoveryGame: pickDiscoveryGame(i),
      kuttan: { mood: 'pointing', position: 'left' },
    });

    // Brief Kuttan reaction (auto-advances)
    if (i < shownVocab.length - 1) {
      moments.push({
        id: id(),
        type: 'reaction',
        kuttan: { mood: i % 2 === 0 ? 'thumbsup' : 'happy' },
        dialogue: { speaker: 'Kuttan', text: pick(KUTTAN_VOCAB_REACT) },
        autoAdvanceMs: 1200,
      });
    }
  });

  // ── 3. Decision points from story (if any) ──
  if (scene?.decisionPoints) {
    scene.decisionPoints.forEach((dp) => {
      moments.push({
        id: id(),
        type: 'dialogue',
        sceneImage,
        kuttan: { mood: 'thinking', position: 'left' },
        dialogue: {
          speaker: 'Kuttan',
          text: dp.moment.slice(0, 80),
          choices: dp.options.map(opt => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
            response: opt.kuttanReaction.slice(0, 40),
            kuttanMood: opt.isCorrect ? 'celebrating' as const : 'sad' as const,
          })),
        },
      });
    });
  }

  // ── 4. Mid-celebration ──
  moments.push({
    id: id(),
    type: 'reaction',
    kuttan: { mood: 'celebrating' },
    dialogue: { speaker: 'Kuttan', text: pick(KUTTAN_CELEBRATIONS) },
    autoAdvanceMs: 1500,
  });

  // ── 5. Exercise games — each one a different game type ──
  // Shuffle exercises for variety
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);

  shuffled.forEach((exercise, i) => {
    // Kuttan intro for first game
    if (i === 0) {
      moments.push({
        id: id(),
        type: 'reaction',
        kuttan: { mood: 'excited' },
        dialogue: { speaker: 'Kuttan', text: pick(KUTTAN_GAME_INTROS) },
        autoAdvanceMs: 1200,
      });
    }

    // The game itself
    moments.push({
      id: id(),
      type: 'game',
      sceneImage,
      exercise,
      gameType: pickGameType(exercise),
      kuttan: { mood: 'thinking', position: 'left' },
    });

    // Celebration every 3 games
    if (i > 0 && i % 3 === 2 && i < shuffled.length - 1) {
      moments.push({
        id: id(),
        type: 'reaction',
        kuttan: { mood: 'celebrating' },
        dialogue: { speaker: 'Kuttan', text: pick(KUTTAN_CELEBRATIONS) },
        autoAdvanceMs: 1500,
      });
    }
  });

  // ── 6. Victory ──
  moments.push({
    id: id(),
    type: 'victory',
    sceneImage,
    kuttan: { mood: 'celebrating', position: 'center' },
    dialogue: {
      speaker: 'Kuttan',
      text: scene?.narrative.nextTeaser?.slice(0, 50) || 'Adventure complete! 🎉',
    },
  });

  return moments;
}
