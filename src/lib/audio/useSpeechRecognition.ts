'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// SpeechRecognition types are declared globally in src/types/speech-recognition.d.ts

// ─── Hook ───────────────────────────────────────────────────────────

interface UseSpeechRecognitionOptions {
  /** Language code, default 'de-DE' */
  lang?: string;
  /** Keep listening after results, default false */
  continuous?: boolean;
  /** Receive interim results while speaking, default true */
  interimResults?: boolean;
}

interface UseSpeechRecognitionReturn {
  /** Start listening */
  start: () => void;
  /** Stop listening */
  stop: () => void;
  /** Whether currently recording */
  isListening: boolean;
  /** Latest recognized transcript */
  transcript: string;
  /** Interim (not yet final) transcript */
  interimTranscript: string;
  /** Confidence score 0-1 of the last final result */
  confidence: number;
  /** Last error message, null if none */
  error: string | null;
  /** Whether the browser supports speech recognition */
  isSupported: boolean;
  /** Reset transcript and error state */
  reset: () => void;
}

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/**
 * Shared hook for browser speech recognition.
 * Default language is German (de-DE).
 * Consolidates the duplicated SpeechRecognition logic from practice pages.
 */
export function useSpeechRecognition(
  options?: UseSpeechRecognitionOptions
): UseSpeechRecognitionReturn {
  const lang = options?.lang ?? 'de-DE';
  const continuous = options?.continuous ?? false;
  const interimResults = options?.interimResults ?? true;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const stoppingRef = useRef(false);

  useEffect(() => {
    setIsSupported(getSpeechRecognitionConstructor() !== null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* noop */ }
        recognitionRef.current = null;
      }
    };
  }, []);

  const start = useCallback(() => {
    const SR = getSpeechRecognitionConstructor();
    if (!SR) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    // Stop any existing instance
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* noop */ }
    }

    setError(null);
    setInterimTranscript('');
    stoppingRef.current = false;

    const recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = '';
      let interimText = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
          setConfidence(result[0].confidence);
        } else {
          interimText += result[0].transcript;
        }
      }

      if (finalText) {
        setTranscript(finalText.trim());
        setInterimTranscript('');
      } else {
        setInterimTranscript(interimText);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // 'no-speech' and 'aborted' are not real errors from the user's perspective
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setError(event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start recognition');
      setIsListening(false);
    }
  }, [lang, continuous, interimResults]);

  const stop = useCallback(() => {
    stoppingRef.current = true;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* noop */ }
    }
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  return {
    start,
    stop,
    isListening,
    transcript,
    interimTranscript,
    confidence,
    error,
    isSupported,
    reset,
  };
}
