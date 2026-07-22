export const PEER_SIZE_MAP = {
  xs: 'h-10 w-10',
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
  xl: 'h-40 w-40',
} as const;

export type PeerSize = keyof typeof PEER_SIZE_MAP;
