// Scene Builder
// Transforms lesson data into a sequence of GameMoments
// that play as one continuous game — no passive screens.

import type { Lesson, Exercise, VocabItem } from '@/lib/content/types';
import type { GameMoment, GameChoice } from './types';
import { SCENE_IMAGES, pickGameType, pickDiscoveryGame } from './types';
import { lessonSceneImage } from '@/lib/scene-image';

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

/** Truncate without cutting mid-word */
function trim(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(' ', max);
  return (cut > max * 0.5 ? text.slice(0, cut) : text.slice(0, max)) + '...';
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
  // Per-lesson painterly backdrop (DECISIONS #9); GameRenderer's <img onError>
  // falls back to the sceneType stock image.
  const sceneImage = lessonSceneImage(lesson.id, sceneType, !!scene);
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
    // No autoAdvanceMs — user taps to start
  });

  // ── 2. Vocab discovery — ALL words at once in a scene, not one-by-one ──
  if (shownVocab.length > 0) {
    moments.push({
      id: id(),
      type: 'word-discover',
      sceneImage,
      vocabList: shownVocab,
      kuttan: { mood: 'excited', position: 'left' },
    });
  }

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
          text: trim(dp.moment, 40),
          choices: dp.options.map(opt => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
            response: trim(opt.kuttanReaction, 30),
            kuttanMood: opt.isCorrect ? 'celebrating' as const : 'sad' as const,
          })),
        },
      });
    });
  }

  // ── 4. Exercise games — straight into the action, no filler ──
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);

  shuffled.forEach((exercise, i) => {
    moments.push({
      id: id(),
      type: 'game',
      sceneImage,
      exercise,
      gameType: pickGameType(exercise),
      kuttan: { mood: 'thinking', position: 'left' },
    });

    // Brief celebration every 4 games (not every 3 — less interruption)
    if (i > 0 && i % 4 === 3 && i < shuffled.length - 1) {
      moments.push({
        id: id(),
        type: 'reaction',
        kuttan: { mood: 'celebrating' },
        dialogue: { speaker: 'Kuttan', text: pick(KUTTAN_CELEBRATIONS) },
        autoAdvanceMs: 1000,
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
      text: scene?.narrative.nextTeaser ? trim(scene.narrative.nextTeaser, 50) : 'Level complete! 🎉',
    },
  });

  return moments;
}
