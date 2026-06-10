'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff, Loader2, Info } from 'lucide-react';
import type { LiveServerMessage } from '@google/genai';
import Avatar from './Avatar';
import type { RoleplayCharacter } from '@/lib/content/roleplay-scenarios';

type Status = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended' | 'error';

type TranscriptLine = {
  id: number;
  who: 'learner' | 'tutor';
  text: string;
  partial?: boolean;
};

type SessionMeta = {
  id: string;
  title: string;
  titleMl: string;
  goal: string;
  goalMl: string;
  targetPhrases: string[];
  durationMin: number;
  character: RoleplayCharacter;
};

type Props = {
  scenarioId: string;
  onEnd?: (transcript: TranscriptLine[]) => void;
};

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

const PCM_WORKLET_SRC = `
class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0] && inputs[0][0];
    if (input && input.length) {
      this.port.postMessage(input.slice(0));
    }
    return true;
  }
}
registerProcessor('pcm-processor', PCMProcessor);
`;

function float32ToBase64Pcm16(float32: Float32Array): string {
  const len = float32.length;
  const int16 = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64Pcm16ToFloat32(b64: string): Float32Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const int16 = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 0x8000;
  return float32;
}

export default function VoiceChat({ scenarioId, onEnd }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [scenario, setScenario] = useState<SessionMeta | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [amplitude, setAmplitude] = useState(0);
  const [showGoal, setShowGoal] = useState(true);

  const sessionRef = useRef<{ close: () => void; sendRealtimeInput: (chunk: { media: { data: string; mimeType: string } }) => void } | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const playheadRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const mutedRef = useRef(false);
  const nextLineIdRef = useRef(1);
  const timerRef = useRef<number | null>(null);
  const durationCapRef = useRef<number>(8 * 60);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  const appendTranscript = useCallback((who: 'learner' | 'tutor', text: string, partial: boolean) => {
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.who === who && last.partial) {
        const updated = [...prev];
        updated[updated.length - 1] = { ...last, text: partial ? text : last.text + text, partial };
        if (!partial && !last.text) updated[updated.length - 1].text = text;
        return updated;
      }
      return [...prev, { id: nextLineIdRef.current++, who, text, partial }];
    });
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [transcript]);

  const stopAllPlayback = useCallback(() => {
    activeSourcesRef.current.forEach((src) => {
      try { src.stop(); } catch { /* already stopped */ }
    });
    activeSourcesRef.current.clear();
    if (outputCtxRef.current) playheadRef.current = outputCtxRef.current.currentTime;
  }, []);

  const schedulePlayback = useCallback((pcm: Float32Array) => {
    const ctx = outputCtxRef.current;
    if (!ctx) return;
    const buffer = ctx.createBuffer(1, pcm.length, OUTPUT_SAMPLE_RATE);
    buffer.getChannelData(0).set(pcm);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const analyser = analyserRef.current;
    if (analyser) src.connect(analyser);
    else src.connect(ctx.destination);
    const startAt = Math.max(ctx.currentTime, playheadRef.current);
    src.start(startAt);
    playheadRef.current = startAt + buffer.duration;
    activeSourcesRef.current.add(src);
    src.onended = () => activeSourcesRef.current.delete(src);
  }, []);

  const cleanup = useCallback(() => {
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    try { sessionRef.current?.close(); } catch { /* noop */ }
    sessionRef.current = null;
    try { workletNodeRef.current?.disconnect(); } catch { /* noop */ }
    try { sourceNodeRef.current?.disconnect(); } catch { /* noop */ }
    try { analyserRef.current?.disconnect(); } catch { /* noop */ }
    workletNodeRef.current = null;
    sourceNodeRef.current = null;
    analyserRef.current = null;
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    stopAllPlayback();
    setAmplitude(0);
    inputCtxRef.current?.close().catch(() => {});
    outputCtxRef.current?.close().catch(() => {});
    inputCtxRef.current = null;
    outputCtxRef.current = null;
  }, [stopAllPlayback]);

  const endSession = useCallback(() => {
    cleanup();
    setStatus('ended');
    if (onEnd) setTranscript((prev) => { onEnd(prev); return prev; });
  }, [cleanup, onEnd]);

  const start = useCallback(async () => {
    setError(null);
    setStatus('connecting');
    setTranscript([]);

    try {
      const tokenRes = await fetch('/api/live/ephemeral-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId }),
      });
      if (!tokenRes.ok) {
        const body = await tokenRes.json().catch(() => ({}));
        throw new Error(body.error || 'Could not start voice session');
      }
      const { token, model, voice, systemPrompt, scenario: meta } = (await tokenRes.json()) as {
        token: string; model: string; voice: string; systemPrompt: string; scenario: SessionMeta;
      };
      setScenario(meta);

      const { GoogleGenAI, Modality } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: 'v1alpha' } });

      const inputCtx = new AudioContext({ sampleRate: INPUT_SAMPLE_RATE });
      inputCtxRef.current = inputCtx;
      const outputCtx = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE });
      outputCtxRef.current = outputCtx;
      playheadRef.current = outputCtx.currentTime;

      const analyser = outputCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      analyser.connect(outputCtx.destination);
      analyserRef.current = analyser;
      const ampBuf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        const a = analyserRef.current;
        if (!a) return;
        a.getByteFrequencyData(ampBuf);
        let sum = 0;
        for (let i = 0; i < ampBuf.length; i++) sum += ampBuf[i];
        setAmplitude(sum / ampBuf.length / 255);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      const workletBlob = new Blob([PCM_WORKLET_SRC], { type: 'application/javascript' });
      const workletUrl = URL.createObjectURL(workletBlob);
      await inputCtx.audioWorklet.addModule(workletUrl);
      URL.revokeObjectURL(workletUrl);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      micStreamRef.current = stream;

      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => { setStatus('listening'); },
          onmessage: (msg: LiveServerMessage) => {
            const sc = msg.serverContent;
            if (!sc) return;
            if (sc.interrupted) stopAllPlayback();
            const parts = sc.modelTurn?.parts || [];
            for (const part of parts) {
              const data = part.inlineData?.data;
              const mime = part.inlineData?.mimeType;
              if (data && mime && mime.startsWith('audio/')) {
                setStatus('speaking');
                schedulePlayback(base64Pcm16ToFloat32(data));
              }
              if (part.text) appendTranscript('tutor', part.text, true);
            }
            if (sc.outputTranscription?.text) appendTranscript('tutor', sc.outputTranscription.text, true);
            if (sc.inputTranscription?.text) appendTranscript('learner', sc.inputTranscription.text, true);
            if (sc.turnComplete) {
              setStatus('listening');
              setTranscript((prev) => prev.map((l) => ({ ...l, partial: false })));
            }
          },
          onerror: (e: Event) => {
            console.error('Live session error:', e);
            setError('Voice connection error. Please try again.');
            setStatus('error');
            cleanup();
          },
          onclose: (e: CloseEvent) => {
            const wasActive = !!sessionRef.current;
            console.warn('Live session closed', { code: e?.code, reason: e?.reason, wasClean: e?.wasClean });
            if (wasActive) {
              if (e && !e.wasClean && e.reason) { setError(`Connection closed: ${e.reason}`); setStatus('error'); }
              else setStatus('ended');
              cleanup();
            }
          },
        },
      });

      sessionRef.current = session as unknown as typeof sessionRef.current extends null ? never : NonNullable<typeof sessionRef.current>;

      const micSource = inputCtx.createMediaStreamSource(stream);
      sourceNodeRef.current = micSource;
      const worklet = new AudioWorkletNode(inputCtx, 'pcm-processor');
      workletNodeRef.current = worklet;
      micSource.connect(worklet);
      worklet.port.onmessage = (ev: MessageEvent<Float32Array>) => {
        if (mutedRef.current) return;
        const b64 = float32ToBase64Pcm16(ev.data);
        try {
          session.sendRealtimeInput({ media: { data: b64, mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}` } });
        } catch { /* session closed — ignore */ }
      };

      const startedAt = Date.now();
      timerRef.current = window.setInterval(() => {
        const secs = Math.floor((Date.now() - startedAt) / 1000);
        setElapsedSec(secs);
        if (secs >= durationCapRef.current) endSession();
      }, 1000);
    } catch (e) {
      console.error('Voice session start failed:', e);
      const msg = e instanceof Error ? e.message : 'Could not start voice session';
      setError(msg);
      setStatus('error');
      cleanup();
    }
  }, [scenarioId, appendTranscript, schedulePlayback, stopAllPlayback, cleanup, endSession]);

  useEffect(() => () => cleanup(), [cleanup]);

  const toggleMute = () => {
    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
  };

  const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
  const ss = String(elapsedSec % 60).padStart(2, '0');
  const isLive = status === 'listening' || status === 'speaking' || status === 'connecting';

  return (
    <div className="flex min-h-[85vh] flex-col bg-gradient-to-b from-[#0f1a2e] via-[#0a1322] to-[#050a14] text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-xs opacity-70">
          <StatusDot status={status} />
          <span>{statusLabel(status)}</span>
        </div>
        <div className="font-mono text-xs opacity-70">{mm}:{ss}</div>
      </div>

      {scenario && (
        <div className="flex flex-col items-center gap-3 pt-4 pb-6">
          <Avatar
            character={scenario.character}
            amplitude={amplitude}
            status={status}
            size={180}
            emoji={scenarioEmoji(scenario.id)}
          />
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-xl font-semibold tracking-tight">{scenario.character.name}</div>
            <div className="text-xs uppercase tracking-[0.2em] opacity-50">{scenario.title}</div>
          </div>
        </div>
      )}

      {scenario && showGoal && (
        <div className="mx-4 mb-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide opacity-60">
                <Info className="h-3 w-3" /> Your goal
              </div>
              <div className="text-sm font-medium">{scenario.goal}</div>
              <div className="text-xs opacity-60 mt-0.5">{scenario.goalMl}</div>
              {scenario.targetPhrases.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {scenario.targetPhrases.map((p) => (
                    <span key={p} className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{p}</span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowGoal(false)}
              className="text-xs opacity-50 hover:opacity-80"
              aria-label="Hide goal"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mx-4 mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mx-4 mb-4 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 p-4 min-h-[180px]">
        {transcript.length === 0 ? (
          <div className="flex h-full min-h-[140px] items-center justify-center text-center text-sm opacity-60">
            {status === 'connecting' ? (
              <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Connecting to {scenario?.character.name || 'tutor'}…</span>
            ) : isLive ? (
              `Speak in German — ${scenario?.character.name || 'the tutor'} is listening.`
            ) : (
              'Tap the mic to start talking.'
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {transcript.map((line) => (
              <div key={line.id} className={`flex ${line.who === 'learner' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[15px] leading-relaxed ${
                    line.who === 'learner'
                      ? 'rounded-br-sm bg-sky-500/90 text-white'
                      : 'rounded-bl-sm bg-white/10 text-white'
                  } ${line.partial ? 'opacity-80' : ''}`}
                >
                  {line.text || <span className="opacity-60">…</span>}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-[#050a14] via-[#050a14]/95 to-transparent px-4 pt-6 pb-8">
        {status === 'idle' || status === 'ended' || status === 'error' ? (
          <button
            onClick={start}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/40 active:scale-95 transition-transform"
            aria-label="Start conversation"
          >
            <Mic className="h-8 w-8 text-white" />
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              disabled={status === 'connecting'}
              className={`flex h-20 w-20 items-center justify-center rounded-full shadow-2xl active:scale-95 transition-all ${
                muted
                  ? 'bg-white/10 shadow-white/10'
                  : 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-sky-500/40'
              }`}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <MicOff className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
            </button>
            <button
              onClick={endSession}
              className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-2 text-sm text-red-300 hover:bg-white/10"
            >
              <PhoneOff className="h-4 w-4" /> End call
            </button>
          </>
        )}
        <div className="text-[11px] opacity-40">
          {status === 'idle' ? 'Tap mic to begin' : muted ? 'Muted · tap to speak' : isLive ? 'Speak naturally' : ''}
        </div>
      </div>
    </div>
  );
}

function scenarioEmoji(id: string): string {
  const m: Record<string, string> = { cafe: '\u2615' };
  return m[id] || '\uD83D\uDCAC';
}

function StatusDot({ status }: { status: Status }) {
  const cls =
    status === 'listening' ? 'bg-sky-400 animate-pulse' :
    status === 'speaking' ? 'bg-emerald-400 animate-pulse' :
    status === 'connecting' ? 'bg-amber-400 animate-pulse' :
    status === 'error' ? 'bg-red-500' :
    'bg-gray-500';
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function statusLabel(status: Status): string {
  switch (status) {
    case 'idle': return 'Ready';
    case 'connecting': return 'Connecting…';
    case 'listening': return 'Listening';
    case 'speaking': return 'Speaking';
    case 'ended': return 'Call ended';
    case 'error': return 'Error';
  }
}
