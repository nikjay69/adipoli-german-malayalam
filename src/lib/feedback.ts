// Unified feedback system: sound effects + haptics
// Respects user's soundEnabled preference from store

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    try {
      audioContext = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Resume context if suspended (autoplay policy)
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// ── Public API ──────────────────────────────────────────────────

/** Pleasant ding for correct answers */
export function playCorrect() {
  playTone(880, 0.15, 'sine', 0.12);
  setTimeout(() => playTone(1100, 0.2, 'sine', 0.1), 100);
  vibrate(50);
}

/** Short buzz for wrong answers */
export function playWrong() {
  playTone(200, 0.2, 'square', 0.08);
  vibrate([30, 50, 30]);
}

/** Celebration chime for completion */
export function playCelebration() {
  playTone(523, 0.15, 'sine', 0.1);  // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 120);  // E5
  setTimeout(() => playTone(784, 0.15, 'sine', 0.1), 240);  // G5
  setTimeout(() => playTone(1047, 0.3, 'sine', 0.12), 360); // C6
  vibrate(100);
}

/** Soft tap for button presses */
export function playTap() {
  playTone(600, 0.05, 'sine', 0.06);
  vibrate(10);
}

/** Card flip sound */
export function playFlip() {
  playTone(400, 0.08, 'sine', 0.08);
  setTimeout(() => playTone(500, 0.06, 'sine', 0.06), 40);
}

/**
 * Check if sound is enabled in the store.
 * Import and use: if (isSoundEnabled()) playCorrect();
 */
export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem('german-malayali-progress');
    if (!stored) return true;
    const data = JSON.parse(stored);
    return data?.state?.userProgress?.soundEnabled !== false;
  } catch {
    return true;
  }
}

// Convenience wrappers that check sound setting
export function feedbackCorrect() { if (isSoundEnabled()) playCorrect(); }
export function feedbackWrong() { if (isSoundEnabled()) playWrong(); }
export function feedbackCelebration() { if (isSoundEnabled()) playCelebration(); }
export function feedbackTap() { if (isSoundEnabled()) playTap(); }
export function feedbackFlip() { if (isSoundEnabled()) playFlip(); }
