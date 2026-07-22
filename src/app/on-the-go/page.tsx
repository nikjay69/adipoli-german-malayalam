'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Gauge,
  Download,
  Clock,
  Headphones,
  Lock,
} from 'lucide-react';
import { Nivin } from '@/components/character/Nivin';

/**
 * On-the-Go — Pimsleur-style audio companion.
 * Minimal text, player-first. Episodes accumulate over time.
 */

type Episode = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  sizeLabel: string;
  src: string;
  status: 'live' | 'coming';
  tags: string[];
};

const EPISODES: Episode[] = [
  {
    id: 'ep-01',
    number: 1,
    title: 'First German Greetings',
    subtitle: 'Hallo \u00B7 Guten Tag \u00B7 Ich hei\u00DFe \u00B7 Auf Wiedersehen',
    duration: '4:40',
    sizeLabel: '2.2 MB',
    src: '/audio/pimsleur/episode-01.mp3',
    status: 'live',
    tags: ['Greetings', 'Self-intro', 'M1'],
  },
  { id: 'ep-02', number: 2, title: 'How are you? and the Magic Words', subtitle: 'Wie geht\u2019s \u00B7 Und dir \u00B7 Danke \u00B7 Bitte \u00B7 Entschuldigung', duration: '4:48', sizeLabel: '2.2 MB', src: '/audio/pimsleur/episode-02.mp3', status: 'live', tags: ['Greetings', 'Politeness', 'M1'] },
  { id: 'ep-03', number: 3, title: 'Who are you? Name, Origin, Job', subtitle: 'Ich hei\u00DFe \u00B7 Ich komme aus \u00B7 Ich bin Student', duration: '4:49', sizeLabel: '2.3 MB', src: '/audio/pimsleur/episode-03.mp3', status: 'live', tags: ['Self-intro', 'M2'] },
  { id: 'ep-04', number: 4, title: 'Numbers 0\u201320', subtitle: 'Null bis zwanzig \u00B7 Preis fragen', duration: '6:00', sizeLabel: '\u2014', src: '', status: 'coming', tags: ['M3'] },
  { id: 'ep-05', number: 5, title: 'Telling time', subtitle: 'Wie sp\u00E4t ist es? \u00B7 Der Halb-Trap', duration: '6:30', sizeLabel: '\u2014', src: '', status: 'coming', tags: ['M3'] },
  { id: 'ep-06', number: 6, title: 'Family & people', subtitle: 'Mutter \u00B7 Vater \u00B7 Geschwister', duration: '6:00', sizeLabel: '\u2014', src: '', status: 'coming', tags: ['M3'] },
];

const SPEEDS: number[] = [0.75, 1, 1.25, 1.5];

export default function OnTheGoPage() {
  const [mounted, setMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const startEpisode = (ep: Episode) => {
    if (ep.status !== 'live' || !ep.src) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ep.src;
      audioRef.current.playbackRate = speed;
      audioRef.current.play().catch(() => {});
      setPlayingId(ep.id);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !playingId) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seek = (deltaSeconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration || 0, audioRef.current.currentTime + deltaSeconds));
  };

  const seekToPct = (pct: number) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = pct * duration;
  };

  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(speed);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const formatTime = (s: number): string => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (!mounted) return null;

  const activeEp = EPISODES.find((e) => e.id === playingId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1420] via-[#0d1a2e] to-[#0a1420]">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
        onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="mx-auto max-w-2xl px-5 py-6 pb-40">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-white/60 hover:text-white text-sm inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white/60">
            <Headphones className="h-3 w-3" /> On the Go
          </div>
        </div>

        {/* Hero */}
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <Nivin mood={isPlaying ? 'happy' : 'waving'} size="sm" />
            <div className="text-6xl">🎧</div>
          </div>
          <h1 className="mb-1 text-3xl font-extrabold text-white">On the Go</h1>
          <p className="text-sm text-white/60">
            Audio episodes for your commute. Listen, repeat, build reflexes.
          </p>
        </div>

        {/* Episode list */}
        <div className="space-y-3">
          {EPISODES.map((ep) => {
            const isActive = playingId === ep.id;
            const locked = ep.status !== 'live';
            return (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-4 transition-all ${
                  isActive
                    ? 'border-sky-400/40 bg-sky-400/5'
                    : locked
                    ? 'border-white/5 bg-white/2 opacity-60'
                    : 'border-white/10 bg-white/5 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Play / locked icon */}
                  <button
                    onClick={() => !locked && (isActive ? togglePlay() : startEpisode(ep))}
                    disabled={locked}
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                      locked
                        ? 'bg-white/5 text-white/30'
                        : isActive && isPlaying
                        ? 'bg-sky-400 text-[#0a1420]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    aria-label={locked ? 'Locked' : isActive && isPlaying ? 'Pause' : 'Play'}
                  >
                    {locked ? (
                      <Lock className="h-4 w-4" />
                    ) : isActive && isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                        Ep {ep.number}
                      </span>
                      {locked && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300">
                          <Lock className="h-3 w-3" />
                          Unlock by reaching Module 3
                        </span>
                      )}
                    </div>
                    <div className="truncate text-sm font-semibold text-white">{ep.title}</div>
                    <div className="truncate text-xs text-white/50">{ep.subtitle}</div>
                  </div>

                  <div className="flex-shrink-0 text-right text-[11px] text-white/40">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ep.duration}
                    </div>
                    <div className="mt-0.5">{ep.sizeLabel}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* About / Why */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">
            About On the Go
          </h2>
          <p className="text-sm leading-relaxed text-white/70">
            Pimsleur-style audio lessons — multi-voice, pause-and-repeat, spaced recall. Designed
            for when your eyes are busy: commute, cooking, gym, between meetings.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            These are the <strong>companion</strong> to the main course, not a replacement. Use them
            to burn phrases into muscle memory once you&rsquo;ve learned them in a lesson.
          </p>
        </div>
      </div>

      {/* Sticky player — only visible while an episode is active */}
      <AnimatePresence>
        {activeEp && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a1420]/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-2xl px-4 pb-5 pt-3">
              {/* Progress bar (tappable) */}
              <div
                className="mb-2 h-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  seekToPct(pct);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">
                    Ep {activeEp.number} — {activeEp.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/50">
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => seek(-10)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10"
                    aria-label="Back 10 seconds"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400 text-[#0a1420] hover:bg-sky-300"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                  </button>
                  <button
                    onClick={() => seek(10)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10"
                    aria-label="Forward 10 seconds"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                  <button
                    onClick={cycleSpeed}
                    className="flex h-9 items-center gap-1 rounded-full border border-white/10 px-2 text-[11px] font-bold text-white/70 hover:bg-white/10"
                    aria-label="Change speed"
                  >
                    <Gauge className="h-3 w-3" />
                    {speed}×
                  </button>
                  {activeEp.src && (
                    <a
                      href={activeEp.src}
                      download={`adipoli-ep-${String(activeEp.number).padStart(2, '0')}.mp3`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10"
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
