// Spine module -> old library modules whose lessons are required spine blocks.
// Dependency-free so audit scripts can import it without pulling in the store.
// Keep in sync with SPINE_MODULES in src/lib/spine.ts (which imports this map).

export const SPINE_SOURCE_MODULE_IDS: Record<number, number[]> = {
  1: [],
  2: [3],
  3: [4, 5, 8],
  4: [6, 7],
  5: [9, 10],
  6: [11, 12],
  7: [14, 17],
  8: [18],
};
