// Audio playback utility for vocabulary pronunciation

let currentAudio: HTMLAudioElement | null = null;

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
      // Silently reject — callers should fall back to TTS
      reject(new Error(`Audio unavailable: ${url}`));
    };

    audio.play().catch((err) => {
      // Silently reject — no toast spam, TTS fallback handles it
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
