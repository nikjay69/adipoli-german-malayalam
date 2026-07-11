// Scene Builder
// Transforms lesson data into a sequence of GameMoments
// that play as one continuous game — no passive screens.

import type { Lesson, Exercise, VocabItem } from '@/lib/content/types';
import type { GameMoment } from './types';
import { pickGameType } from './types';
import { lessonSceneImage } from '@/lib/scene-image';

/**
 * Build the game sequence for a lesson.
 * Authored order is preserved because it carries the pedagogy.
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
      speaker: scene?.setting.name || lesson.title,
      text: scene?.narrative.currentObjective || lesson.description,
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
      dialogue: {
        speaker: scene?.setting.name || 'Scene',
        text: 'Hear these useful chunks before you use them.',
      },
    });
  }

  // The app must teach even before the owner-recorded video is available.
  // Preserve each authored video's explanation, objectives, and visual aids.
  lesson.videos.forEach((video) => {
    moments.push({
      id: id(),
      type: 'teach',
      sceneImage,
      video,
      dialogue: {
        speaker: 'Learn the pattern',
        text: video.title,
      },
    });
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
          text: dp.moment,
          choices: dp.options.map(opt => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
            response: opt.response || opt.kuttanReaction,
            kuttanMood: opt.isCorrect ? 'celebrating' as const : 'sad' as const,
          })),
        },
      });
    });
  }

  // ── 4. Exercise games — straight into the action, no filler ──
  exercises.forEach((exercise) => {
    moments.push({
      id: id(),
      type: 'game',
      sceneImage,
      exercise,
      gameType: pickGameType(exercise),
      kuttan: { mood: 'thinking', position: 'left' },
    });

  });

  // ── 6. Victory ──
  moments.push({
    id: id(),
    type: 'victory',
    sceneImage,
    kuttan: { mood: 'celebrating', position: 'center' },
    dialogue: {
      speaker: 'Kuttan',
      text: scene?.narrative.nextTeaser || 'You proved the lesson ability. Keep going.',
    },
  });

  return moments;
}
