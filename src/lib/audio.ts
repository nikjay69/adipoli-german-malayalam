// Audio playback utility for vocabulary pronunciation
import { showToast } from '@/components/ui/Toast';

let currentAudio: HTMLAudioElement | null = null;
let lastToastTime = 0;

export function playAudio(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      currentAudio = null;
      resolve();
    };

    audio.onerror = () => {
      currentAudio = null;
      // Show toast max once per 5 seconds to avoid spam
      const now = Date.now();
      if (now - lastToastTime > 5000) {
        lastToastTime = now;
        showToast('Audio not available — check your connection', 'error');
      }
      reject(new Error(`Failed to play audio: ${url}`));
    };

    audio.play().catch((err) => {
      const now = Date.now();
      if (now - lastToastTime > 5000) {
        lastToastTime = now;
        showToast('Audio not available — check your connection', 'error');
      }
      reject(err);
    });
  });
}

export function playVocabAudio(vocabId: string) {
  return playAudio(`/audio/vocab/${vocabId}.mp3`);
}

export function playExampleAudio(vocabId: string) {
  return playAudio(`/audio/examples/${vocabId}.mp3`);
}

export function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}
