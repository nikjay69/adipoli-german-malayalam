/**
 * Normalize a German answer for tolerant matching:
 * - lowercase
 * - strip punctuation
 * - collapse whitespace
 * - accept ae/oe/ue/ss in place of ä/ö/ü/ß
 */
function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[!?.,:;'"„"«»]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ');
}

/**
 * Returns true if `input` matches `expected` (string or array of accepted strings)
 * under normalization rules. Used for fill-blank, free-text, type-answer,
 * speaking, and MCQ validation.
 */
export function matchesAnswer(input: string, expected: string | string[] | readonly string[]): boolean {
  const norm = normalize(input);
  if (Array.isArray(expected)) {
    return expected.some((e) => normalize(e) === norm);
  }
  return normalize(expected as string) === norm;
}

/**
 * Canonical string form of `correctAnswer` for display purposes (the first
 * accepted answer for arrays, or the string itself).
 */
export function primaryAnswer(expected: string | string[] | readonly string[]): string {
  return Array.isArray(expected) ? expected[0] : (expected as string);
}
