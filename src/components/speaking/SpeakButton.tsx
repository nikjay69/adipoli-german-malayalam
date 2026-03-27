'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2, Check, X, RotateCcw } from 'lucide-react';
import { useSpeechRecognition } from '@/lib/audio/useSpeechRecognition';

type SpeakButtonState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

interface SpeakButtonProps {
  /** Expected German text the user should say */
  expectedText: string;
  /** Called when recognition produces a result */
  onResult?: (transcript: string, confidence: number, isMatch: boolean) => void;
  /** Custom match function. Default: case-insensitive trimmed comparison */
  matchFn?: (expected: string, transcript: string) => boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the waveform animation */
  showWaveform?: boolean;
  /** Label text shown below the button */
  label?: string;
  /** Disable the button */
  disabled?: boolean;
}

const SIZE_MAP = {
  sm: { button: 'w-14 h-14', icon: 'w-5 h-5', wave: 'h-8' },
  md: { button: 'w-20 h-20', icon: 'w-7 h-7', wave: 'h-12' },
  lg: { button: 'w-24 h-24', icon: 'w-9 h-9', wave: 'h-16' },
};

const STATE_COLORS: Record<SpeakButtonState, string> = {
  idle: 'from-[#d4a520] to-[#b8891a]',
  listening: 'from-[#e94560] to-[#c0392b]',
  processing: 'from-[#3b82f6] to-[#2563eb]',
  success: 'from-[#27ae60] to-[#1e8449]',
  error: 'from-[#c0392b] to-[#962d22]',
};

function defaultMatch(expected: string, transcript: string): boolean {
  const normalize = (s: string) => s.toLowerCase().trim().replace(/[.,!?;:]/g, '');
  return normalize(transcript) === normalize(expected);
}

/**
 * Animated speak/record button with waveform visualization.
 * Uses Web Speech API for German speech recognition.
 * Shows visual feedback for listening, processing, success, and error states.
 */
export function SpeakButton({
  expectedText,
  onResult,
  matchFn = defaultMatch,
  size = 'md',
  showWaveform = true,
  label,
  disabled = false,
}: SpeakButtonProps) {
  const [state, setState] = useState<SpeakButtonState>('idle');
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const { start, stop, isListening, transcript, confidence, error, isSupported, reset } =
    useSpeechRecognition({ lang: 'de-DE' });

  const sizes = SIZE_MAP[size];

  // Handle transcript result
  useEffect(() => {
    if (transcript && state === 'listening') {
      setState('processing');
      // Brief delay for visual feedback
      const timer = setTimeout(() => {
        const isMatch = matchFn(expectedText, transcript);
        setState(isMatch ? 'success' : 'error');
        onResult?.(transcript, confidence, isMatch);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [transcript, state, expectedText, matchFn, confidence, onResult]);

  // Handle speech recognition error
  useEffect(() => {
    if (error && state === 'listening') {
      setState('error');
    }
  }, [error, state]);

  // Sync listening state
  useEffect(() => {
    if (!isListening && state === 'listening' && !transcript) {
      // Recognition ended without result (timeout/no speech)
      setState('idle');
    }
  }, [isListening, state, transcript]);

  // Waveform visualization
  const startWaveform = useCallback(async () => {
    if (!showWaveform || !canvasRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        if (!analyserRef.current || !ctx || !canvas) return;
        animFrameRef.current = requestAnimationFrame(draw);

        analyserRef.current.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barCount = 16;
        const barWidth = canvas.width / barCount - 2;
        const step = Math.floor(bufferLength / barCount);

        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i * step] / 255;
          const barHeight = Math.max(value * canvas.height * 0.9, 2);
          const x = i * (barWidth + 2) + 1;
          const y = (canvas.height - barHeight) / 2;

          // Gradient from gold to green
          const hue = 40 + value * 80;
          ctx.fillStyle = `hsl(${hue}, 70%, 55%)`;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
      }
      draw();
    } catch {
      // Mic permission denied — recognition can still work in some browsers
    }
  }, [showWaveform]);

  const stopWaveform = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    analyserRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWaveform();
      stop();
    };
  }, [stopWaveform, stop]);

  const handlePress = useCallback(() => {
    if (disabled || !isSupported) return;

    if (state === 'listening') {
      stop();
      stopWaveform();
      setState('idle');
      return;
    }

    if (state === 'success' || state === 'error') {
      // Reset for retry
      reset();
      setState('idle');
      return;
    }

    // Start listening
    reset();
    setState('listening');
    start();
    startWaveform();
  }, [disabled, isSupported, state, start, stop, reset, startWaveform, stopWaveform]);

  // Stop waveform when listening stops
  useEffect(() => {
    if (!isListening) {
      stopWaveform();
    }
  }, [isListening, stopWaveform]);

  if (!isSupported) {
    return (
      <div className="text-center text-sm text-[var(--foreground)]/40">
        <MicOff className="w-5 h-5 mx-auto mb-1" />
        <p>Speech not supported</p>
      </div>
    );
  }

  const stateIcon = {
    idle: <Mic className={sizes.icon} />,
    listening: <Mic className={`${sizes.icon} animate-pulse`} />,
    processing: <Loader2 className={`${sizes.icon} animate-spin`} />,
    success: <Check className={sizes.icon} />,
    error: state === 'error' && !transcript ? <MicOff className={sizes.icon} /> : <RotateCcw className={sizes.icon} />,
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Waveform */}
      <AnimatePresence>
        {state === 'listening' && showWaveform && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              width={200}
              height={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
              className={`${sizes.wave} w-[200px]`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={state === 'listening' ? { scale: [1, 1.08, 1] } : {}}
        transition={state === 'listening' ? { repeat: Infinity, duration: 1.5 } : {}}
        onClick={handlePress}
        disabled={disabled}
        className={`
          ${sizes.button} rounded-full
          bg-gradient-to-b ${STATE_COLORS[state]}
          text-white shadow-lg
          flex items-center justify-center
          transition-colors duration-300
          disabled:opacity-40 disabled:cursor-not-allowed
          relative
        `}
      >
        {/* Pulse ring when listening */}
        {state === 'listening' && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
        )}
        {stateIcon[state]}
      </motion.button>

      {/* Label */}
      {label && (
        <p className="text-xs text-[var(--foreground)]/50 text-center">{label}</p>
      )}

      {/* State feedback text */}
      <AnimatePresence mode="wait">
        {state === 'listening' && (
          <motion.p
            key="listening"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[#e94560] font-medium"
          >
            Listening... speak now
          </motion.p>
        )}
        {state === 'processing' && (
          <motion.p
            key="processing"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[#3b82f6] font-medium"
          >
            Processing...
          </motion.p>
        )}
        {state === 'success' && transcript && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[#27ae60] font-medium text-center"
          >
            &ldquo;{transcript}&rdquo; — Tap to try again
          </motion.p>
        )}
        {state === 'error' && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[#c0392b] font-medium text-center"
          >
            {transcript ? `Heard: "${transcript}" — Tap to retry` : 'Could not hear you — Tap to retry'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
