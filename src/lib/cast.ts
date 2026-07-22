export const LEARNER_PEER_IDS = ['nivin', 'meera'] as const;

export type LearnerPeerId = (typeof LEARNER_PEER_IDS)[number];
export type FixedCastId = LearnerPeerId | 'frauFischer' | 'appu';

export type FixedCastMember = {
  id: FixedCastId;
  displayName: string;
  role: 'learner-peer' | 'teacher' | 'silent-mascot';
};

export const FIXED_CAST: Record<FixedCastId, FixedCastMember> = {
  nivin: { id: 'nivin', displayName: 'Nivin', role: 'learner-peer' },
  meera: { id: 'meera', displayName: 'Meera', role: 'learner-peer' },
  frauFischer: { id: 'frauFischer', displayName: 'Frau Fischer', role: 'teacher' },
  appu: { id: 'appu', displayName: 'Appu', role: 'silent-mascot' },
};

/**
 * Temporary implementation aliases for assets/routes that pre-date the fixed cast.
 * These values are never learner-facing character names.
 */
export const CAST_COMPATIBILITY_IDS = {
  kuttan: 'nivin',
  frauWeber: 'frauFischer',
} as const satisfies Record<string, FixedCastId>;

export const CAST_COMPATIBILITY_ROUTES = {
  missionId: { greetFrauWeber: { canonicalLabel: 'greetFrauFischer', retainedForSavedProgress: true } },
  route: { '/missions/module-1/greet-frau-weber': { cast: 'frauFischer', retainedForExistingLinks: true } },
} as const;

export function learnerPeerForLessonIndex(lessonIndex: number): LearnerPeerId {
  return LEARNER_PEER_IDS[Math.abs(lessonIndex) % LEARNER_PEER_IDS.length];
}

export function learnerPeerName(id: LearnerPeerId): string {
  return FIXED_CAST[id].displayName;
}
