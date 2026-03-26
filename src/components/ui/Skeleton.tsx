'use client';

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`game-card p-2.5 animate-pulse ${className}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-9 h-9 rounded-lg bg-[var(--foreground)]/8" />
        <div className="flex-1">
          <div className="h-3.5 bg-[var(--foreground)]/8 rounded w-3/4" />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-5 w-12 bg-[var(--foreground)]/6 rounded-full" />
        <div className="h-3 w-10 bg-[var(--foreground)]/5 rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
