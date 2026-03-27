'use client';

import { motion } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import type { StoryScene } from '@/lib/content/types';

interface NarrativeIntroProps {
  scene: StoryScene;
  lessonTitle: string;
  lessonTitleGerman: string;
  moduleIcon: string;
  onContinue: () => void;
}

const TIME_EMOJI: Record<string, string> = {
  morning: '🌅',
  afternoon: '☀️',
  evening: '🌆',
};

/**
 * Story-based lesson opener.
 * Replaces the flat intro with a narrative scene + Kuttan narration.
 */
export function NarrativeIntro({
  scene,
  lessonTitle,
  lessonTitleGerman,
  moduleIcon,
  onContinue,
}: NarrativeIntroProps) {
  const kuttanText = scene.kuttanIntro[Math.floor(Math.random() * scene.kuttanIntro.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-2"
    >
      {/* Scene recap */}
      {scene.narrative.previousRecap && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-[var(--foreground)]/40 italic mb-3 max-w-sm"
        >
          Previously: {scene.narrative.previousRecap}
        </motion.p>
      )}

      {/* Kuttan narration */}
      <CharacterGuide
        messages={kuttanText}
        mood="excited"
        size="md"
      />

      {/* Scene card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-5 w-full max-w-sm"
      >
        {/* Location badge */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">{moduleIcon}</span>
          <span className="text-sm font-semibold text-[#d4a520]">{scene.setting.name}</span>
          <span className="text-sm">{TIME_EMOJI[scene.setting.timeOfDay] || '🕐'}</span>
        </div>

        {/* Scene description */}
        <div className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--foreground)]/5 border border-[var(--card-border)] rounded-2xl p-5">
          <p className="text-sm leading-relaxed text-[var(--foreground)]/70 italic">
            {scene.setting.description}
          </p>
        </div>

        {/* Objective */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center gap-2 justify-center"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/30">Mission</span>
          <span className="text-sm font-semibold text-[#27ae60]">{scene.narrative.currentObjective}</span>
        </motion.div>

        {/* Lesson title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-3"
        >
          <h1 className="text-xl font-bold">{lessonTitle}</h1>
          <p className="text-[var(--foreground)]/40 text-sm">{lessonTitleGerman}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
