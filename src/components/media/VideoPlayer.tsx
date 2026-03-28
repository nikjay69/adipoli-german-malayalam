'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, ChevronDown, BookOpen } from 'lucide-react';
import { RichContentRenderer } from '@/components/learn/RichContentRenderer';
import type { RichElement } from '@/lib/content/types';

interface VideoPlayerProps {
  title: string;
  description?: string;
  duration?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  learningObjectives?: string[];
  richContent?: RichElement[];
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
  richContent,
  script,
  onComplete,
  className = '',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const hasRichContent = richContent && richContent.length > 0;

  const handlePlay = () => {
    if (videoUrl) setIsPlaying(true);
  };

  // When no video but richContent exists — show visual walkthrough
  if (!videoUrl && hasRichContent) {
    return (
      <div className={`w-full ${className}`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#d4a520]/15 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-[#d4a520]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">{title}</p>
            {duration && (
              <div className="flex items-center gap-1 text-[var(--foreground)]/30 text-[10px]">
                <Clock className="w-2.5 h-2.5" /> {duration} read
              </div>
            )}
          </div>
        </div>

        {/* Learning objectives — compact */}
        {learningObjectives && learningObjectives.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {learningObjectives.slice(0, 3).map((obj, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[#27ae60]/10 text-[#27ae60] border border-[#27ae60]/20">
                {obj.length > 40 ? obj.slice(0, 40) + '...' : obj}
              </span>
            ))}
          </div>
        )}

        {/* Rich content — the actual visual aids */}
        <div className="space-y-3">
          <RichContentRenderer elements={richContent} />
        </div>
      </div>
    );
  }

  // Video exists or no richContent — show player
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full rounded-xl overflow-hidden relative bg-[#0d1f0d] border border-[var(--card-border)]"
        style={{ aspectRatio: isPlaying && videoUrl ? '16/9' : undefined, height: isPlaying && videoUrl ? undefined : '120px' }}
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
            className="w-full h-full flex items-center justify-center cursor-pointer gap-3 px-4"
            onClick={handlePlay}
            whileTap={videoUrl ? { scale: 0.98 } : undefined}
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                videoUrl ? 'bg-[#d4a520]' : 'bg-[var(--foreground)]/10 border-2 border-dashed border-[var(--foreground)]/20'
              }`}
            >
              <Play className={`w-4 h-4 ml-0.5 ${videoUrl ? 'text-[#1b2d1b]' : 'text-[var(--foreground)]/30'}`} />
            </motion.div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-[var(--foreground)]/80 text-xs font-semibold leading-tight truncate">{title}</p>
              {!videoUrl && <p className="text-[var(--foreground)]/30 text-[10px] mt-0.5">Video coming soon</p>}
              {duration && (
                <div className="flex items-center gap-1 mt-0.5 text-[var(--foreground)]/30 text-[10px]">
                  <Clock className="w-2.5 h-2.5" /> {duration}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {(description || learningObjectives || script) && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-between px-3 py-1.5 mt-1 rounded-lg bg-[var(--foreground)]/5 text-[10px] text-[var(--foreground)]/40"
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
          </div>
        </motion.div>
      )}
    </div>
  );
}
