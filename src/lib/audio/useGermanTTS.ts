'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TTSOptions {
  rate?: number;    // 0.1 - 10, default 1
  pitch?: number;   // 0 - 2, default 1
  volume?: number;  // 0 - 1, default 1
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseGermanTTSReturn {
  /** Speak German text using the best available de-DE voice */
  speak: (text: string, options?: TTSOptions) => void;
  /** Speak at a slower rate for learners (rate 0.7) */
  speakSlow: (text: string, options?: TTSOptions) => void;
  /** Stop any current speech */
  stop: () => void;
  /** Whether speech is currently playing */
  isSpeaking: boolean;
  /** Whether the browser supports speech synthesis */
  isSupported: boolean;
  /** Available German voices */
  voices: SpeechSynthesisVoice[];
}

/**
 * Hook for German text-to-speech using the Web Speech API.
 * Automatically selects the best available de-DE voice.
 * Falls back gracefully if TTS is unavailable.
 */
export function useGermanTTS(): UseGermanTTSReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const selectedVoice = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize and find German voices
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      const germanVoices = allVoices.filter(v => v.lang.startsWith('de'));
      setVoices(germanVoices);

      // Pick the best German voice
      // Priority: de-DE > de-AT > de-CH, prefer non-network voices for speed
      if (germanVoices.length > 0) {
        const deDE = germanVoices.filter(v => v.lang === 'de-DE');
        const local = deDE.filter(v => v.localService);
        selectedVoice.current = local[0] || deDE[0] || germanVoices[0];
      }
    };

    // Voices may load asynchronously
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string, options?: TTSOptions) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = options?.rate ?? 1;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;

    if (selectedVoice.current) {
      utterance.voice = selectedVoice.current;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      options?.onEnd?.();
    };
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      // 'canceled' is not a real error — it happens when we call cancel() before speaking new text
      if (event.error !== 'canceled') {
        options?.onError?.(event.error);
      }
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, []);

  const speakSlow = useCallback((text: string, options?: TTSOptions) => {
    speak(text, { ...options, rate: options?.rate ?? 0.7 });
  }, [speak]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, speakSlow, stop, isSpeaking, isSupported, voices };
}

/**
 * Non-hook utility to speak German text once (fire-and-forget).
 * Useful outside of React components.
 */
export function speakGerman(text: string, rate = 1): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate;

  const voices = speechSynthesis.getVoices();
  const germanVoice = voices.find(v => v.lang === 'de-DE') || voices.find(v => v.lang.startsWith('de'));
  if (germanVoice) utterance.voice = germanVoice;

  speechSynthesis.speak(utterance);
}
