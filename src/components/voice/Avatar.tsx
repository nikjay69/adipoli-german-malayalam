'use client';

import type { RoleplayCharacter } from '@/lib/content/roleplay-scenarios';

type Status = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended' | 'error';

type Props = {
  character: RoleplayCharacter;
  amplitude: number;
  status: Status;
  size?: number;
  emoji?: string;
};

const GRADIENT: Record<Status, string> = {
  idle: 'from-slate-600 via-slate-700 to-slate-800',
  connecting: 'from-amber-300 via-amber-500 to-orange-600',
  listening: 'from-sky-300 via-indigo-500 to-violet-700',
  speaking: 'from-emerald-300 via-teal-500 to-sky-700',
  ended: 'from-slate-600 via-slate-700 to-slate-800',
  error: 'from-red-400 via-rose-600 to-red-800',
};

const GLOW: Record<Status, string> = {
  idle: 'bg-white/0',
  connecting: 'bg-amber-400/40',
  listening: 'bg-indigo-400/50',
  speaking: 'bg-emerald-400/60',
  ended: 'bg-white/0',
  error: 'bg-red-500/40',
};

export default function Avatar({ amplitude, status, size = 180, emoji }: Props) {
  const clamped = Math.max(0, Math.min(1, amplitude));
  const orbScale =
    status === 'speaking' ? 1 + clamped * 0.22 :
    status === 'listening' ? 1.04 :
    status === 'connecting' ? 1.02 : 1;
  const glowScale =
    status === 'speaking' ? 1.3 + clamped * 0.5 :
    status === 'listening' ? 1.25 : 1;
  const glowOpacity =
    status === 'speaking' ? 0.5 + clamped * 0.5 :
    status === 'listening' ? 0.4 :
    status === 'connecting' ? 0.5 : 0;

  const morphR = status === 'speaking'
    ? `${45 + clamped * 10}% ${55 - clamped * 10}% ${52 - clamped * 6}% ${48 + clamped * 6}% / ${50 - clamped * 6}% ${50 + clamped * 6}% ${48 + clamped * 6}% ${52 - clamped * 6}%`
    : '50%';

  const isAnimating = status === 'listening' || status === 'connecting' || status === 'speaking';

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className={`pointer-events-none absolute inset-[-30%] rounded-full blur-3xl ${GLOW[status]} transition-all duration-100`}
          style={{ transform: `scale(${glowScale})`, opacity: glowOpacity }}
        />
        <div
          className={`pointer-events-none absolute inset-[-6%] rounded-full blur-md ${GLOW[status]} transition-all duration-100`}
          style={{ transform: `scale(${1 + clamped * 0.15})`, opacity: glowOpacity * 0.7 }}
        />

        <div
          className={`relative h-full w-full bg-gradient-to-br ${GRADIENT[status]} shadow-2xl transition-all ${isAnimating ? 'shadow-emerald-500/20' : ''}`}
          style={{
            borderRadius: morphR,
            transform: `scale(${orbScale})`,
            transition: 'border-radius 120ms ease-out, transform 60ms linear',
          }}
        >
          <div
            className="absolute inset-0 rounded-[inherit] opacity-40 mix-blend-overlay"
            style={{
              background:
                'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 30%, transparent 55%)',
            }}
          />

          <div
            className="absolute inset-[14%] rounded-full opacity-60 mix-blend-overlay"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.2) 25%, transparent 50%, rgba(255,255,255,0.15) 75%, transparent 100%)',
              animation: isAnimating ? 'spin 12s linear infinite' : 'none',
            }}
          />

          {emoji && (
            <div
              className="absolute inset-0 flex items-center justify-center text-5xl"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.35)',
                transform: status === 'speaking' ? `scale(${1 + clamped * 0.08})` : 'scale(1)',
                transition: 'transform 60ms linear',
              }}
            >
              {emoji}
            </div>
          )}
        </div>

        {status === 'speaking' && (
          <div className="pointer-events-none absolute inset-[-12%] rounded-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-emerald-300/40"
                style={{
                  animation: `orb-ripple 1.8s ease-out ${i * 0.6}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes orb-ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
