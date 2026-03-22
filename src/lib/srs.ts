// Spaced Repetition System — SM-2 Algorithm (Anki-style)
// Tracks vocabulary review intervals based on user performance

export interface SRSCard {
  vocabId: string;
  nextReview: number;    // timestamp (ms)
  interval: number;      // days until next review
  easeFactor: number;    // 1.3 to 2.5 (starts at 2.5)
  repetitions: number;   // successful reviews in a row
  lastReview: number;    // timestamp of last review
}

export type Rating = 'again' | 'hard' | 'good' | 'easy';

// Map ratings to SM-2 quality scores
const RATING_QUALITY: Record<Rating, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ONE_MINUTE_MS = 60 * 1000;

/**
 * SM-2 Algorithm:
 * - again (q=0): reset repetitions to 0, interval = 1 min (re-show today)
 * - hard  (q=3): interval stays same or slightly increases, ease decreases
 * - good  (q=4): interval * easeFactor
 * - easy  (q=5): interval * easeFactor * 1.3
 *
 * EaseFactor formula: EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
 * Minimum EF: 1.3
 */
export function reviewCard(card: SRSCard, rating: Rating): SRSCard {
  const q = RATING_QUALITY[rating];
  const now = Date.now();

  // Calculate new ease factor using SM-2 formula
  let newEaseFactor = card.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  newEaseFactor = Math.max(MIN_EASE_FACTOR, newEaseFactor);

  let newInterval: number;
  let newRepetitions: number;

  if (rating === 'again') {
    // Failed: reset to beginning, show again in 1 minute
    newRepetitions = 0;
    newInterval = 0; // will use 1 minute for nextReview
    return {
      ...card,
      repetitions: newRepetitions,
      interval: newInterval,
      easeFactor: newEaseFactor,
      lastReview: now,
      nextReview: now + ONE_MINUTE_MS, // re-show in 1 minute
    };
  }

  // Successful review (hard, good, easy)
  newRepetitions = card.repetitions + 1;

  if (newRepetitions === 1) {
    // First successful review: 1 day
    newInterval = 1;
  } else if (newRepetitions === 2) {
    // Second successful review: 6 days
    newInterval = 6;
  } else {
    // Subsequent reviews: previous interval * ease factor
    newInterval = Math.round(card.interval * card.easeFactor);
  }

  // Apply rating modifiers
  if (rating === 'hard') {
    // Hard: interval * 1.2 (slight increase from current), minimum = current interval
    newInterval = Math.max(
      card.interval + 1,
      Math.round(newInterval * 0.8)
    );
  } else if (rating === 'easy') {
    // Easy: bonus multiplier on top of normal calculation
    newInterval = Math.round(newInterval * 1.3);
  }

  // Ensure interval is at least 1 day
  newInterval = Math.max(1, newInterval);

  return {
    ...card,
    repetitions: newRepetitions,
    interval: newInterval,
    easeFactor: newEaseFactor,
    lastReview: now,
    nextReview: now + newInterval * ONE_DAY_MS,
  };
}

/**
 * Create a new SRS card for a vocabulary item.
 * Starts with default ease factor, no reviews.
 */
export function createCard(vocabId: string): SRSCard {
  return {
    vocabId,
    nextReview: Date.now(), // due immediately
    interval: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    repetitions: 0,
    lastReview: 0,
  };
}

/**
 * Get all vocabulary IDs that are due for review (nextReview <= now).
 * Sorted by nextReview ascending (most overdue first).
 */
export function getDueCards(cards: Record<string, SRSCard>): string[] {
  const now = Date.now();
  return Object.values(cards)
    .filter((card) => card.nextReview <= now)
    .sort((a, b) => a.nextReview - b.nextReview)
    .map((card) => card.vocabId);
}

/**
 * Count cards that have never been reviewed (repetitions === 0).
 */
export function getNewCardsCount(cards: Record<string, SRSCard>): number {
  return Object.values(cards).filter((card) => card.repetitions === 0).length;
}

/**
 * Count cards that are currently due for review (nextReview <= now).
 */
export function getDueCount(cards: Record<string, SRSCard>): number {
  const now = Date.now();
  return Object.values(cards).filter((card) => card.nextReview <= now).length;
}

/**
 * Get the next review time formatted as a human-readable string.
 */
export function getNextReviewText(card: SRSCard): string {
  const now = Date.now();
  const diff = card.nextReview - now;

  if (diff <= 0) return 'Now';

  const minutes = Math.floor(diff / ONE_MINUTE_MS);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
}
