// Unified feedback system: sound effects + haptics
// Respects user's soundEnabled preference from store
// Upgraded with richer, layered musical sounds and combo system

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

function ensureResumed(ctx: AudioContext) {
  if (ctx.state === 'suspended') ctx.resume();
}

// ── Low-level tone helpers ──────────────────────────────────────────

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;
  ensureResumed(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

/** Play a note with soft attack (fade in) for a warmer sound */
function playWarmTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.12) {
  const ctx = getAudioContext();
  if (!ctx) return;
  ensureResumed(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  // Soft attack: fade in over 30ms
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.03);
  // Gentle release
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

/** Play a layered chord (multiple frequencies at once) for richness */
function playChord(frequencies: number[], duration: number, type: OscillatorType = 'sine', volume = 0.06) {
  frequencies.forEach(freq => playWarmTone(freq, duration, type, volume));
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// ── Note frequencies (for reference) ────────────────────────────────
// C4=262, D4=294, E4=330, F4=349, G4=392, A4=440, B4=494
// C5=523, D5=587, E5=659, F5=698, G5=784, A5=880, B5=988, C6=1047

// ── Public API ──────────────────────────────────────────────────────

/** Rising major arpeggio (C5-E5-G5) — warm, rewarding correct answer */
export function playCorrect() {
  playWarmTone(523, 0.2, 'sine', 0.1);       // C5
  setTimeout(() => playWarmTone(659, 0.2, 'sine', 0.1), 80);   // E5
  setTimeout(() => playWarmTone(784, 0.25, 'sine', 0.12), 160); // G5
  vibrate(50);
}

/** Soft descending minor second — gentle, non-punishing wrong answer */
export function playWrong() {
  playWarmTone(370, 0.25, 'sine', 0.08);  // F#4
  setTimeout(() => playWarmTone(349, 0.3, 'sine', 0.06), 120);  // F4 (half step down)
  vibrate([30, 50, 30]);
}

/** Full celebration: ascending major scale into a chord */
export function playCelebration() {
  const notes = [523, 587, 659, 784, 1047]; // C5 D5 E5 G5 C6
  notes.forEach((freq, i) => {
    setTimeout(() => playWarmTone(freq, 0.18, 'sine', 0.1), i * 100);
  });
  // Final shimmer chord
  setTimeout(() => playChord([1047, 1319, 1568], 0.5, 'sine', 0.05), 550); // C6-E6-G6
  vibrate(100);
}

/** Soft tap for button presses */
export function playTap() {
  playTone(600, 0.05, 'sine', 0.06);
  vibrate(10);
}

/** Card flip sound — two quick tones */
export function playFlip() {
  playTone(400, 0.08, 'sine', 0.07);
  setTimeout(() => playTone(520, 0.06, 'sine', 0.06), 40);
}

/** Soft bell tone for vocab/card reveals */
export function playReveal() {
  const ctx = getAudioContext();
  if (!ctx) return;
  ensureResumed(ctx);

  // Bell = sine + quiet harmonic overtone
  playWarmTone(880, 0.4, 'sine', 0.08);
  playWarmTone(1760, 0.25, 'sine', 0.03); // octave overtone
}

/** Fanfare for achievement/level unlocks */
export function playUnlock() {
  // Brass-like: sawtooth with soft attack
  const fanfare = [523, 659, 784, 1047]; // C-E-G-C
  fanfare.forEach((freq, i) => {
    setTimeout(() => {
      playWarmTone(freq, 0.2, 'sawtooth', 0.04);
      playWarmTone(freq, 0.2, 'sine', 0.06);
    }, i * 120);
  });
  // Final sustain chord
  setTimeout(() => {
    playChord([1047, 1319, 1568], 0.6, 'sine', 0.04);
  }, 500);
  vibrate([50, 30, 50, 30, 100]);
}

/**
 * Combo sound: pitch escalates with each consecutive correct answer.
 * Each combo level raises the base note by a half-step.
 * Creates an ascending musical phrase as the user chains correct answers.
 */
export function playCombo(streak: number) {
  // Base note C5 (523Hz), each combo raises by a semitone
  // Semitone ratio = 2^(1/12) ≈ 1.0595
  const semitoneRatio = Math.pow(2, 1 / 12);
  const capped = Math.min(streak, 20); // cap at 20 semitones (almost 2 octaves)
  const baseFreq = 523 * Math.pow(semitoneRatio, capped);

  // Single note for low streaks, richer sound for higher
  playWarmTone(baseFreq, 0.2, 'sine', 0.1);

  if (streak >= 5) {
    // Add major third harmony
    setTimeout(() => playWarmTone(baseFreq * 1.26, 0.15, 'sine', 0.06), 40);
  }
  if (streak >= 10) {
    // Add fifth harmony for full chord
    setTimeout(() => playWarmTone(baseFreq * 1.5, 0.15, 'sine', 0.05), 60);
  }

  vibrate(30 + Math.min(streak * 5, 50));
}

/** Deflating sound when combo breaks */
export function playComboBreak() {
  playWarmTone(600, 0.15, 'sine', 0.08);
  setTimeout(() => playWarmTone(400, 0.2, 'sine', 0.06), 80);
  setTimeout(() => playWarmTone(300, 0.3, 'sine', 0.04), 160);
}

/** Subtle ambient ping — for notifications, hints appearing */
export function playPing() {
  playWarmTone(1200, 0.15, 'sine', 0.05);
  setTimeout(() => playWarmTone(1600, 0.1, 'sine', 0.03), 60);
}

/** Whoosh sound for transitions / slide-ins */
export function playWhoosh() {
  const ctx = getAudioContext();
  if (!ctx) return;
  ensureResumed(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
  filter.Q.value = 2;

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
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
export function feedbackReveal() { if (isSoundEnabled()) playReveal(); }
export function feedbackUnlock() { if (isSoundEnabled()) playUnlock(); }
export function feedbackCombo(streak: number) { if (isSoundEnabled()) playCombo(streak); }
export function feedbackComboBreak() { if (isSoundEnabled()) playComboBreak(); }
export function feedbackPing() { if (isSoundEnabled()) playPing(); }
export function feedbackWhoosh() { if (isSoundEnabled()) playWhoosh(); }
