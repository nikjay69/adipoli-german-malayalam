'use client';

import { motion } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import type { StoryScene } from '@/lib/content/types';

interface SceneConclusionProps {
  scene: StoryScene;
  correctCount: number;
  totalExercises: number;
  vocabLearned: number;
}

const CONCLUSION_MESSAGES = [
  "Adipoli machane! Scene complete! 🎬",
  "Wunderbar! You survived that scene! 💪",
  "Nice one! Kuttan is proud of you! 🌟",
  "Scene cleared! Your German is growing! 🇩🇪",
  "Machane, you're becoming a real Berliner! 🐻",
];

/**
 * Wraps up a story scene — narrative bridge to next lesson.
 */
export function SceneConclusion({
  scene,
  correctCount,
  totalExercises,
  vocabLearned,
}: SceneConclusionProps) {
  const message = CONCLUSION_MESSAGES[Math.floor(Math.random() * CONCLUSION_MESSAGES.length)];
  const accuracy = totalExercises > 0 ? Math.round((correctCount / totalExercises) * 100) : 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-2"
    >
      <CharacterGuide
        messages={message}
        mood="celebrating"
        size="md"
        showAppu={accuracy >= 80}
        appuMood="celebrating"
      />

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-5 flex items-center gap-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-[#d4a520]">{vocabLearned}</p>
          <p className="text-xs text-[var(--foreground)]/40">Words learned</p>
        </div>
        <div className="w-px h-8 bg-[var(--foreground)]/10" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[#27ae60]">{accuracy}%</p>
          <p className="text-xs text-[var(--foreground)]/40">Accuracy</p>
        </div>
      </motion.div>

      {/* Next teaser */}
      {scene.narrative.nextTeaser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-sm"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/30 mb-1">
            Coming up next
          </p>
          <p className="text-sm text-[var(--foreground)]/60 italic">
            {scene.narrative.nextTeaser}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
