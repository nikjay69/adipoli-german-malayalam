// Procedural ambient soundscape engine
// Generates context-appropriate background audio using Web Audio API
// No audio files needed — everything is synthesized from oscillators + noise

import { isSoundEnabled } from '@/lib/feedback';

export type SceneType = 'cafe' | 'bahnhof' | 'street' | 'classroom' | 'kitchen' | 'office' | 'none';

interface AmbienceHandle {
  stop: (fadeMs?: number) => void;
  duck: (durationMs?: number) => void;    // Lower volume briefly (for TTS)
  unduck: () => void;
  setVolume: (v: number) => void;
}

let currentScene: AmbienceHandle | null = null;
let currentSceneType: SceneType = 'none';

// ── Noise buffer generators ─────────────────────────────────────────

function createNoiseBuffer(ctx: AudioContext, durationSec: number, type: 'white' | 'brown' | 'pink' = 'white'): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * durationSec;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  if (type === 'white') {
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === 'brown') {
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  } else {
    // Pink noise approximation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  }

  return buffer;
}

// ── Scheduled event helpers ─────────────────────────────────────────

/** Schedule a short tone at random intervals */
function scheduleRandomTone(
  ctx: AudioContext,
  masterGain: GainNode,
  freq: number,
  duration: number,
  volume: number,
  minIntervalSec: number,
  maxIntervalSec: number,
  type: OscillatorType = 'sine'
): { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout>;
  let stopped = false;

  function schedule() {
    if (stopped) return;
    const delay = (minIntervalSec + Math.random() * (maxIntervalSec - minIntervalSec)) * 1000;
    timeout = setTimeout(() => {
      if (stopped || ctx.state === 'closed') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq + (Math.random() - 0.5) * freq * 0.05; // slight detuning
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      schedule();
    }, delay);
  }

  schedule();
  return { cancel: () => { stopped = true; clearTimeout(timeout); } };
}

/** Create a looping noise source with a filter */
function createFilteredNoise(
  ctx: AudioContext,
  masterGain: GainNode,
  noiseType: 'white' | 'brown' | 'pink',
  filterType: BiquadFilterType,
  filterFreq: number,
  filterQ: number,
  volume: number
): { source: AudioBufferSourceNode; gain: GainNode } {
  const buffer = createNoiseBuffer(ctx, 4, noiseType);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  filter.Q.value = filterQ;

  const gain = ctx.createGain();
  gain.gain.value = volume;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start();

  return { source, gain };
}

// ── Scene Definitions ───────────────────────────────────────────────

function createCafeScene(ctx: AudioContext, masterGain: GainNode): { cancel: () => void } {
  // Low brown noise base (muffled background chatter)
  const chatter = createFilteredNoise(ctx, masterGain, 'brown', 'lowpass', 400, 1, 0.06);

  // Occasional cup clinks (high sine pings)
  const clinks = scheduleRandomTone(ctx, masterGain, 3000, 0.08, 0.03, 3, 8);

  // Espresso machine hiss (filtered white noise burst every 15-30s)
  const espresso = scheduleRandomTone(ctx, masterGain, 2000, 0.4, 0.02, 15, 30);

  // Gentle clock tick
  const tick = scheduleRandomTone(ctx, masterGain, 1800, 0.02, 0.015, 1, 1.2);

  return {
    cancel: () => {
      chatter.source.stop();
      clinks.cancel();
      espresso.cancel();
      tick.cancel();
    }
  };
}

function createBahnhofScene(ctx: AudioContext, masterGain: GainNode): { cancel: () => void } {
  // Wide ambient noise floor (reverberant hall)
  const hall = createFilteredNoise(ctx, masterGain, 'pink', 'lowpass', 800, 0.5, 0.05);

  // Periodic station bell
  const bell = scheduleRandomTone(ctx, masterGain, 1200, 0.3, 0.04, 8, 20);

  // PA system jingle (ascending 3-note pattern)
  let paTimeout: ReturnType<typeof setTimeout>;
  let paStopped = false;
  function schedulePA() {
    if (paStopped) return;
    paTimeout = setTimeout(() => {
      if (paStopped || ctx.state === 'closed') return;
      const notes = [880, 1047, 1319]; // A5, C6, E6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + i * 0.2 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.2 + 0.3);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(ctx.currentTime + i * 0.2);
        osc.stop(ctx.currentTime + i * 0.2 + 0.3);
      });
      schedulePA();
    }, (30 + Math.random() * 30) * 1000);
  }
  schedulePA();

  // Low train rumble (occasional)
  const rumble = createFilteredNoise(ctx, masterGain, 'brown', 'lowpass', 120, 2, 0.03);

  return {
    cancel: () => {
      hall.source.stop();
      bell.cancel();
      paStopped = true;
      clearTimeout(paTimeout);
      rumble.source.stop();
    }
  };
}

function createStreetScene(ctx: AudioContext, masterGain: GainNode): { cancel: () => void } {
  // Wind (filtered white noise with slow LFO modulation)
  const wind = createFilteredNoise(ctx, masterGain, 'white', 'bandpass', 600, 0.8, 0.03);

  // LFO to modulate wind volume
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.15; // very slow
  lfoGain.gain.value = 0.015;
  lfo.connect(lfoGain);
  lfoGain.connect(wind.gain.gain);
  lfo.start();

  // Distant traffic (low brown noise)
  const traffic = createFilteredNoise(ctx, masterGain, 'brown', 'lowpass', 200, 1, 0.04);

  // Bird chirps (high sine, random)
  const birds = scheduleRandomTone(ctx, masterGain, 4000, 0.06, 0.02, 2, 6);

  // Footsteps (periodic clicks)
  const steps = scheduleRandomTone(ctx, masterGain, 150, 0.03, 0.02, 0.5, 0.8);

  return {
    cancel: () => {
      wind.source.stop();
      lfo.stop();
      traffic.source.stop();
      birds.cancel();
      steps.cancel();
    }
  };
}

function createClassroomScene(ctx: AudioContext, masterGain: GainNode): { cancel: () => void } {
  // Near-silence base (very quiet pink noise)
  const silence = createFilteredNoise(ctx, masterGain, 'pink', 'lowpass', 300, 1, 0.01);

  // Clock tick
  const tick = scheduleRandomTone(ctx, masterGain, 1500, 0.02, 0.02, 0.95, 1.05);

  // Pen scratching (high-freq noise bursts)
  const pen = scheduleRandomTone(ctx, masterGain, 5000, 0.04, 0.008, 4, 10);

  // Page turn (occasional)
  const page = scheduleRandomTone(ctx, masterGain, 800, 0.15, 0.01, 10, 25);

  return {
    cancel: () => {
      silence.source.stop();
      tick.cancel();
      pen.cancel();
      page.cancel();
    }
  };
}

function createKitchenScene(ctx: AudioContext, masterGain: GainNode): { cancel: () => void } {
  // Fridge hum (low sine)
  const hum = ctx.createOscillator();
  const humGain = ctx.createGain();
  hum.type = 'sine';
  hum.frequency.value = 60;
  humGain.gain.value = 0.02;
  hum.connect(humGain);
  humGain.connect(masterGain);
  hum.start();

  // Clock tick
  const tick = scheduleRandomTone(ctx, masterGain, 1400, 0.02, 0.02, 0.9, 1.1);

  // Pot clanks
  const clank = scheduleRandomTone(ctx, masterGain, 2500, 0.05, 0.025, 5, 15);

  // Water drip
  const drip = scheduleRandomTone(ctx, masterGain, 3500, 0.03, 0.015, 3, 8);

  return {
    cancel: () => {
      hum.stop();
      tick.cancel();
      clank.cancel();
      drip.cancel();
    }
  };
}

function createOfficeScene(ctx: AudioContext, masterGain: GainNode): { cancel: () => void } {
  // Quiet HVAC hum
  const hvac = createFilteredNoise(ctx, masterGain, 'brown', 'lowpass', 150, 1, 0.02);

  // Keyboard typing (random clicks at varying intervals)
  const typing = scheduleRandomTone(ctx, masterGain, 2200, 0.02, 0.012, 0.1, 0.4);

  // Mouse click (occasional)
  const mouse = scheduleRandomTone(ctx, masterGain, 1800, 0.015, 0.015, 2, 5);

  // Printer (rare)
  const printer = scheduleRandomTone(ctx, masterGain, 300, 0.5, 0.008, 20, 45);

  return {
    cancel: () => {
      hvac.source.stop();
      typing.cancel();
      mouse.cancel();
      printer.cancel();
    }
  };
}

// ── Scene factory map ───────────────────────────────────────────────

const SCENE_FACTORIES: Record<Exclude<SceneType, 'none'>, (ctx: AudioContext, gain: GainNode) => { cancel: () => void }> = {
  cafe: createCafeScene,
  bahnhof: createBahnhofScene,
  street: createStreetScene,
  classroom: createClassroomScene,
  kitchen: createKitchenScene,
  office: createOfficeScene,
};

// ── Public API ──────────────────────────────────────────────────────

/**
 * Start an ambient soundscape for a scene.
 * Automatically stops any currently playing scene.
 * Fades in over 1 second for a smooth transition.
 */
export function startAmbience(scene: SceneType, volume = 0.5): AmbienceHandle | null {
  // Stop any current scene
  stopAmbience(500);

  if (scene === 'none' || !isSoundEnabled()) {
    currentSceneType = 'none';
    return null;
  }

  const factory = SCENE_FACTORIES[scene];
  if (!factory) return null;

  let ctx: AudioContext;
  try {
    ctx = new AudioContext();
  } catch {
    return null;
  }
  if (ctx.state === 'suspended') ctx.resume();

  // Master gain with fade-in
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1);
  masterGain.connect(ctx.destination);

  const sceneInstance = factory(ctx, masterGain);

  const handle: AmbienceHandle = {
    stop(fadeMs = 500) {
      const fadeSec = fadeMs / 1000;
      try {
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + fadeSec);
        setTimeout(() => {
          sceneInstance.cancel();
          ctx.close().catch(() => {});
        }, fadeMs + 100);
      } catch {
        sceneInstance.cancel();
        ctx.close().catch(() => {});
      }
    },
    duck(durationMs = 2000) {
      // Lower volume during TTS
      try {
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(volume * 0.2, ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
            masterGain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.5);
          } catch { /* context may be closed */ }
        }, durationMs);
      } catch { /* noop */ }
    },
    unduck() {
      try {
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.5);
      } catch { /* noop */ }
    },
    setVolume(v: number) {
      try {
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(Math.max(v, 0.001), ctx.currentTime + 0.3);
      } catch { /* noop */ }
    },
  };

  currentScene = handle;
  currentSceneType = scene;
  return handle;
}

/** Stop the currently playing ambient scene */
export function stopAmbience(fadeMs = 500) {
  if (currentScene) {
    currentScene.stop(fadeMs);
    currentScene = null;
    currentSceneType = 'none';
  }
}

/** Get the currently playing scene type */
export function getCurrentScene(): SceneType {
  return currentSceneType;
}

/** Duck the current ambience (e.g., during TTS playback) */
export function duckAmbience(durationMs = 2000) {
  currentScene?.duck(durationMs);
}

/** Restore ambience volume after ducking */
export function unduckAmbience() {
  currentScene?.unduck();
}

// ── Module-to-scene mapping ─────────────────────────────────────────
// Maps module IDs to the most appropriate ambient scene

export const MODULE_SCENE_MAP: Record<number, SceneType> = {
  1: 'classroom',   // First Steps — learning environment
  2: 'classroom',   // Who Are You — introductions
  3: 'office',      // Numbers & Time — formal context
  4: 'kitchen',     // My Family — home setting
  5: 'kitchen',     // Daily Routine — morning at home
  6: 'cafe',        // Food & Drink — café/restaurant
  7: 'street',      // Shopping & Money — out and about
  8: 'kitchen',     // My Home — domestic setting
  9: 'bahnhof',     // Travel & Directions — train station
  10: 'office',     // Health & Body — doctor's office vibe
  11: 'office',     // Work & Study — professional
  12: 'street',     // Hobbies & Free Time — outdoors
  13: 'cafe',       // Talking About the Past — café chat
  14: 'office',     // Formal Life in Germany — official
  15: 'street',     // German Culture — exploring
  16: 'cafe',       // A1+ Bonus Bridge — relaxed
  17: 'classroom',  // Goethe Exam — Hören & Lesen
  18: 'classroom',  // Goethe Exam — Schreiben & Sprechen
};

/** Get the recommended ambient scene for a module */
export function getSceneForModule(moduleId: number): SceneType {
  return MODULE_SCENE_MAP[moduleId] || 'classroom';
}
