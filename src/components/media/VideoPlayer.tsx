'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, ChevronDown } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  description?: string;
  duration?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  learningObjectives?: string[];
  script?: string;
  onComplete?: () => void;
  className?: string;
}

export function VideoPlayer({
  title,
  description,
  duration,
  videoUrl,
  thumbnailUrl,
  learningObjectives,
  script,
  onComplete,
  className = '',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handlePlay = () => {
    if (videoUrl) setIsPlaying(true);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Video area — compact, not full aspect-video */}
      <div className="w-full rounded-xl overflow-hidden relative bg-[#0d1f0d] border border-[var(--card-border)]"
        style={{ aspectRatio: isPlaying && videoUrl ? '16/9' : undefined, height: isPlaying && videoUrl ? undefined : '180px' }}
      >
        {isPlaying && videoUrl ? (
          videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? (
            <iframe
              src={videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay onEnded={onComplete} />
          )
        ) : (
          <motion.div
            className="w-full h-full flex items-center justify-center cursor-pointer gap-4 px-4"
            onClick={handlePlay}
            whileTap={videoUrl ? { scale: 0.98 } : undefined}
          >
            {/* Play button */}
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                videoUrl ? 'bg-[#d4a520]' : 'bg-[var(--foreground)]/10 border-2 border-dashed border-[var(--foreground)]/20'
              }`}
            >
              <Play className={`w-5 h-5 ml-0.5 ${videoUrl ? 'text-[#1b2d1b]' : 'text-[var(--foreground)]/30'}`} />
            </motion.div>

            {/* Title + info inline */}
            <div className="text-left flex-1 min-w-0">
              <p className="text-[var(--foreground)]/80 text-sm font-semibold leading-tight truncate">{title}</p>
              {!videoUrl && <p className="text-[var(--foreground)]/30 text-[10px] mt-0.5">Video coming soon</p>}
              {duration && (
                <div className="flex items-center gap-1 mt-1 text-[var(--foreground)]/30 text-[10px]">
                  <Clock className="w-2.5 h-2.5" /> {duration}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Collapsible details — hidden by default to save space */}
      {(description || learningObjectives || script) && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-between px-3 py-2 mt-1.5 rounded-lg bg-[var(--foreground)]/5 text-[10px] text-[var(--foreground)]/40"
        >
          <span>{showMore ? 'Hide details' : 'Show details'}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showMore ? 'rotate-180' : ''}`} />
        </button>
      )}

      {showMore && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
          <div className="game-card p-3 mt-1">
            {description && <p className="text-[var(--foreground)]/50 text-xs mb-2 leading-relaxed">{description}</p>}
            {learningObjectives && learningObjectives.length > 0 && (
              <div className="text-[10px] text-[var(--foreground)]/40">
                <p className="font-semibold text-[#d4a520] mb-1">You&apos;ll learn:</p>
                <ul className="space-y-0.5">
                  {learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#27ae60]">•</span> {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {script && (
              <details className="mt-2">
                <summary className="text-[10px] text-[var(--foreground)]/30 cursor-pointer">Script Preview</summary>
                <pre className="text-[10px] text-[var(--foreground)]/40 whitespace-pre-wrap font-sans leading-relaxed mt-1 max-h-[200px] overflow-y-auto">
                  {script}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
