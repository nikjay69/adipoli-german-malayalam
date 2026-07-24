'use client';

import { useEffect, useMemo, useState } from 'react';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';
import { readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { type Module2MissionId } from '@/lib/missions/module2';
import {
  getActiveRecovery,
  getNextBlock,
  getSpineModules,
  readModule1CheckpointResult,
  type Module1CheckpointStored,
  type SpineInputs,
} from '@/lib/spine';
import { useGameStore } from '@/lib/store';

export function useSpineProgress() {
  const userProgress = useGameStore((state) => state.userProgress);
  const [mounted, setMounted] = useState(false);
  const [module1Missions, setModule1Missions] = useState<Module1MissionId[]>([]);
  const [module2Missions, setModule2Missions] = useState<Module2MissionId[]>([]);
  const [module1Checkpoint, setModule1Checkpoint] = useState<Module1CheckpointStored | null>(null);

  useEffect(() => {
    const refresh = () => {
      setModule1Missions(readCompletedModule1Missions());
      setModule2Missions(readCompletedModule2Missions());
      setModule1Checkpoint(readModule1CheckpointResult());
    };
    const timer = window.setTimeout(() => {
      refresh();
      setMounted(true);
    }, 0);

    window.addEventListener('module1-mission-completed', refresh);
    window.addEventListener('module2-mission-completed', refresh);
    window.addEventListener('module1-checkpoint-scored', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('module1-mission-completed', refresh);
      window.removeEventListener('module2-mission-completed', refresh);
      window.removeEventListener('module1-checkpoint-scored', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const inputs: SpineInputs = useMemo(() => ({
    completedLessons: userProgress.completedLessons,
    spineCheckpoints: userProgress.spineCheckpoints || {},
    module1MissionIds: module1Missions,
    module2MissionIds: module2Missions,
    module1Checkpoint,
    mockResults: userProgress.mockResults || {},
  }), [
    userProgress.completedLessons,
    userProgress.spineCheckpoints,
    userProgress.mockResults,
    module1Missions,
    module2Missions,
    module1Checkpoint,
  ]);

  const modules = useMemo(() => (mounted ? getSpineModules(inputs) : []), [inputs, mounted]);
  const next = useMemo(() => getNextBlock(modules), [modules]);
  const recovery = useMemo(() => (mounted ? getActiveRecovery(inputs) : null), [inputs, mounted]);

  return {
    mounted,
    inputs,
    modules,
    next,
    recovery,
  };
}
