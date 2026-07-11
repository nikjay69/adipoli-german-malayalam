'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { AdministeredCheckpoint } from '@/components/checkpoint/AdministeredCheckpoint';
import { useGameStore } from '@/lib/store';
import {
  getSpineCheckpoint,
  toSpineCheckpointResult,
  type CheckpointScore,
} from '@/lib/spine-checkpoints';
import { SPINE_MODULES } from '@/lib/spine';

const CHECKPOINT_SCENE_DEFAULT = '/images/scenes/hub-exam-hall.jpg';
const CHECKPOINT_SCENES: Record<number, string> = {
  2: '/images/scenes/hub-goethe-kochi-classroom.jpg',
  3: '/images/scenes/hub-thrissur-home.jpg',
  4: '/images/scenes/hub-supermarket.jpg',
  5: '/images/scenes/hub-praxis.jpg',
  6: '/images/scenes/hub-study-desk.jpg',
  7: '/images/scenes/hub-amt-office.jpg',
  8: '/images/scenes/hub-exam-hall.jpg',
};

export default function SpineCheckpointPage() {
  const params = useParams<{ moduleId: string }>();
  const moduleId = Number(params.moduleId);
  const checkpoint = getSpineCheckpoint(moduleId);
  const spineModule = SPINE_MODULES.find((module) => module.id === moduleId);
  const saveSpineCheckpointResult = useGameStore((state) => state.saveSpineCheckpointResult);
  const mockResults = useGameStore((state) => state.userProgress.mockResults) || {};

  const save = useCallback((score: CheckpointScore) => {
    if (!checkpoint) return;
    saveSpineCheckpointResult(toSpineCheckpointResult(checkpoint, score));
  }, [checkpoint, saveSpineCheckpointResult]);

  if (!checkpoint || !spineModule) {
    return (
      <div className="min-h-screen px-4 py-16 text-center">
        <h1 className="text-2xl font-black">No checkpoint here.</h1>
        <Link href={moduleId === 1 ? '/missions/module-1/checkpoint' : '/course'} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#e94560] px-5 py-3 font-black text-white">
          {moduleId === 1 ? 'Open Module 1 checkpoint' : 'Back to course'} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <AdministeredCheckpoint
      checkpoint={checkpoint}
      sceneImage={CHECKPOINT_SCENES[moduleId] ?? CHECKPOINT_SCENE_DEFAULT}
      onSave={save}
      mockResults={mockResults}
      continueHref={moduleId === 8 ? '/tests' : '/learn'}
      continueLabel={moduleId === 8 ? 'Run another timed mock' : 'Continue the course'}
    />
  );
}
