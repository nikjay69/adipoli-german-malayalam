'use client';

import { useMemo } from 'react';
import type { LessonProgress } from '@/lib/store';

interface StreakCalendarProps {
  completedLessons: LessonProgress[];
  weeks?: number;
}

export function StreakCalendar({ completedLessons, weeks = 12 }: StreakCalendarProps) {
  // Build a map of dates to activity count
  const activityMap = useMemo(() => {
    const map: Record<string, number> = {};
    completedLessons.forEach(l => {
      if (l.completedAt) {
        const date = new Date(l.completedAt).toISOString().split('T')[0];
        map[date] = (map[date] || 0) + 1;
      }
    });
    return map;
  }, [completedLessons]);

  // Generate grid data: last N weeks
  const grid = useMemo(() => {
    const today = new Date();
    const days: { date: string; count: number; dayOfWeek: number }[] = [];
    const totalDays = weeks * 7;

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        count: activityMap[dateStr] || 0,
        dayOfWeek: d.getDay(),
      });
    }
    return days;
  }, [activityMap, weeks]);

  // Group by weeks
  const weekColumns = useMemo(() => {
    const cols: typeof grid[] = [];
    for (let i = 0; i < grid.length; i += 7) {
      cols.push(grid.slice(i, i + 7));
    }
    return cols;
  }, [grid]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-[var(--foreground)]/6';
    if (count === 1) return 'bg-[#27ae60]/30';
    if (count <= 3) return 'bg-[#27ae60]/50';
    return 'bg-[#27ae60]/80';
  };

  const activeDays = grid.filter(d => d.count > 0).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[var(--foreground)]/40">{weeks} weeks</span>
        <span className="text-xs text-[var(--foreground)]/50">
          <strong className="text-[var(--foreground)]">{activeDays}</strong> active days
        </span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weekColumns.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-[10px] h-[10px] rounded-sm ${getColor(day.count)}`}
                title={`${day.date}: ${day.count} lesson${day.count !== 1 ? 's' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-[var(--foreground)]/30">
        <span>Less</span>
        <div className="w-[10px] h-[10px] rounded-sm bg-[var(--foreground)]/6" />
        <div className="w-[10px] h-[10px] rounded-sm bg-[#27ae60]/30" />
        <div className="w-[10px] h-[10px] rounded-sm bg-[#27ae60]/50" />
        <div className="w-[10px] h-[10px] rounded-sm bg-[#27ae60]/80" />
        <span>More</span>
      </div>
    </div>
  );
}
