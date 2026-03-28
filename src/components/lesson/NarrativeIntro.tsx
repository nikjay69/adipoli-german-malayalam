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

export function NarrativeIntro({
  scene,
  lessonTitle,
  lessonTitleGerman,
  moduleIcon,
}: NarrativeIntroProps) {
  const kuttanText = scene.kuttanIntro[Math.floor(Math.random() * scene.kuttanIntro.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-3"
    >
      {/* Location + title — compact header */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-lg">{moduleIcon}</span>
        <span className="text-xs font-semibold text-[#d4a520]">{scene.setting.name}</span>
        <span className="text-xs">{TIME_EMOJI[scene.setting.timeOfDay] || '🕐'}</span>
      </div>
      <h1 className="text-lg font-bold">{lessonTitle}</h1>
      <p className="text-[var(--foreground)]/40 text-xs mb-3">{lessonTitleGerman}</p>

      {/* Kuttan — compact */}
      <CharacterGuide messages={kuttanText} mood="excited" size="sm" />

      {/* Scene description — the main content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 w-full max-w-sm"
      >
        <div className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--foreground)]/5 border border-[var(--card-border)] rounded-xl p-4">
          <p className="text-sm leading-relaxed text-[var(--foreground)]/70 italic">
            {scene.setting.description}
          </p>
        </div>

        {/* Mission — inline */}
        <div className="mt-2 flex items-center gap-1.5 justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)]/30">Mission:</span>
          <span className="text-xs font-semibold text-[#27ae60]">{scene.narrative.currentObjective}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
