'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  description?: string;
  duration?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  learningObjectives?: string[];
  /** Full script text for preview */
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
  const [showScript, setShowScript] = useState(false);

  const handlePlay = () => {
    if (videoUrl) {
      setIsPlaying(true);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Video area */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-[#0d1f0d] border border-[var(--card-border)]">
        {isPlaying && videoUrl ? (
          // Actual video (YouTube embed or native)
          videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? (
            <iframe
              src={videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
              onEnded={onComplete}
            />
          )
        ) : (
          // Placeholder
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer group"
            onClick={handlePlay}
            whileTap={videoUrl ? { scale: 0.98 } : undefined}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-4xl">🎬</div>
              <div className="absolute bottom-4 right-4 text-3xl">🇩🇪</div>
            </div>

            {/* Play button */}
            <motion.div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                videoUrl
                  ? 'bg-[#d4a520] group-hover:bg-[#e8b82a]'
                  : 'bg-[var(--foreground)]/10 border-2 border-dashed border-[var(--foreground)]/20'
              }`}
              whileHover={videoUrl ? { scale: 1.1 } : undefined}
            >
              <Play className={`w-7 h-7 ml-1 ${videoUrl ? 'text-[#1b2d1b]' : 'text-[var(--foreground)]/30'}`} />
            </motion.div>

            <p className="text-[var(--foreground)]/60 text-sm font-medium">{title}</p>
            {!videoUrl && (
              <p className="text-[var(--foreground)]/30 text-xs mt-1">Video coming soon</p>
            )}
            {duration && (
              <div className="flex items-center gap-1 mt-2 text-[var(--foreground)]/30 text-xs">
                <Clock className="w-3 h-3" />
                {duration}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Video info card */}
      {(description || learningObjectives) && (
        <div className="game-card p-4 mt-3">
          <h3 className="font-bold text-sm mb-1">{title}</h3>
          {description && (
            <p className="text-[var(--foreground)]/50 text-xs mb-3 leading-relaxed">{description}</p>
          )}
          {learningObjectives && learningObjectives.length > 0 && (
            <div className="text-xs text-[var(--foreground)]/40">
              <p className="font-semibold text-[#d4a520] mb-1">You'll learn:</p>
              <ul className="space-y-1">
                {learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#27ae60] mt-0.5">•</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Script preview (for development/recording) */}
      {script && (
        <div className="mt-3">
          <button
            onClick={() => setShowScript(!showScript)}
            className="w-full game-card p-3 text-left flex items-center justify-between"
          >
            <span className="text-xs font-semibold text-[var(--foreground)]/40">
              📝 Script Preview
            </span>
            <span className="text-[var(--foreground)]/30 text-xs">
              {showScript ? '▲' : '▼'}
            </span>
          </button>
          {showScript && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="game-card mt-1 p-4 max-h-[300px] overflow-y-auto"
            >
              <pre className="text-xs text-[var(--foreground)]/50 whitespace-pre-wrap font-sans leading-relaxed">
                {script}
              </pre>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
