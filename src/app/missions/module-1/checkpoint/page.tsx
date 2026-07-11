'use client';

import { useCallback } from 'react';
import { AdministeredCheckpoint, type CheckpointAttempt } from '@/components/checkpoint/AdministeredCheckpoint';
import {
  MODULE1_CHECKPOINT_RESULT_STORAGE_KEY,
  module1AdministeredCheckpoint,
} from '@/lib/missions/module1Checkpoint';
import type { CheckpointScore } from '@/lib/spine-checkpoints';

const CHECKPOINT_SCENE = '/images/scenes/hub-goethe-kochi-classroom.jpg';

export default function Module1CheckpointPage() {
  const save = useCallback((score: CheckpointScore, passedItemIds: string[], attempts: CheckpointAttempt[]) => {
    if (typeof window === 'undefined') return;
    const stored = {
      passedItemIds,
      attempts,
      earnedPoints: score.earnedPoints,
      totalPoints: score.totalPoints,
      percent: score.percent,
      state: score.state,
      failedTags: score.failedTags,
      sectionPercents: score.sectionPercents,
      savedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(MODULE1_CHECKPOINT_RESULT_STORAGE_KEY, JSON.stringify(stored));
    window.dispatchEvent(new CustomEvent('module1-checkpoint-scored', { detail: stored }));
  }, []);

  return (
    <AdministeredCheckpoint
      checkpoint={module1AdministeredCheckpoint}
      sceneImage={CHECKPOINT_SCENE}
      onSave={save}
      continueHref="/missions/module-2/self-intro?start=listen"
      continueLabel="Start Module 2"
      railLabel="Module 1 · Closed checkpoint"
    />
  );
}
