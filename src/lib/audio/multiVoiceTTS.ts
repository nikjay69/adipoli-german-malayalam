// Multi-voice TTS for dialogue characters
// Uses different speechSynthesis voices for male/female speakers

type VoiceGender = 'male' | 'female' | 'neutral';

let cachedVoices: { male: SpeechSynthesisVoice | null; female: SpeechSynthesisVoice | null } = {
  male: null,
  female: null,
};

function loadGermanVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const voices = speechSynthesis.getVoices();
  const german = voices.filter(v => v.lang.startsWith('de'));

  if (german.length === 0) return;

  // Try to find distinctly different voices
  // Common patterns: names like "Anna", "Petra", "Helena" = female; "Hans", "Martin" = male
  const femaleNames = /anna|petra|helena|vicki|marlene|female/i;
  const maleNames = /hans|martin|stefan|male|daniel/i;

  const femaleVoice = german.find(v => femaleNames.test(v.name));
  const maleVoice = german.find(v => maleNames.test(v.name));

  if (femaleVoice && maleVoice) {
    cachedVoices = { male: maleVoice, female: femaleVoice };
  } else if (german.length >= 2) {
    // Just use first two different voices
    cachedVoices = { male: german[0], female: german[1] };
  } else {
    // Only one voice — use pitch to differentiate
    cachedVoices = { male: german[0], female: german[0] };
  }
}

/**
 * Speak text with a specific character voice.
 * Uses different TTS voices or pitch shifts for male/female distinction.
 */
export function speakAsCharacter(text: string, gender: VoiceGender = 'neutral', rate = 0.9): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  // Load voices on first call
  if (!cachedVoices.male && !cachedVoices.female) {
    loadGermanVoices();
    // Voices might load async
    speechSynthesis.addEventListener('voiceschanged', loadGermanVoices, { once: true });
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate;

  if (gender === 'male' && cachedVoices.male) {
    utterance.voice = cachedVoices.male;
    utterance.pitch = 0.85; // slightly lower
  } else if (gender === 'female' && cachedVoices.female) {
    utterance.voice = cachedVoices.female;
    utterance.pitch = 1.15; // slightly higher
  } else {
    // Neutral — use default German voice
    const voices = speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang === 'de-DE');
    if (deVoice) utterance.voice = deVoice;
    utterance.pitch = 1.0;
  }

  speechSynthesis.speak(utterance);
}

/**
 * Speak a dialogue line, auto-detecting gender from common cues.
 * Lines starting with "Frau" or containing female indicators use female voice.
 */
export function speakDialogueLine(text: string, speakerHint?: 'male' | 'female'): void {
  const gender = speakerHint ||
    (/^(Frau|Sie sagt|Kellnerin|Ärztin|Lehrerin|Lisa|Anna|Maria)/i.test(text) ? 'female' : 'male');
  speakAsCharacter(text, gender);
}
