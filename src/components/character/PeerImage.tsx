'use client';

import type { LearnerPeerId } from '@/lib/cast';
import { Meera } from './Meera';
import { NivinImage, type NivinMoodImage } from './NivinImage';
import type { PeerSize } from './peerSizing';

export function PeerImage({
  peer,
  mood = 'happy',
  size = 'md',
  className = '',
  animate = true,
}: {
  peer: LearnerPeerId;
  mood?: NivinMoodImage;
  size?: PeerSize;
  className?: string;
  animate?: boolean;
}) {
  if (peer === 'meera') {
    return <Meera size={size} className={className} animate={animate} />;
  }

  return <NivinImage mood={mood} size={size} className={className} animate={animate} />;
}
