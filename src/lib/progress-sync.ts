import { getClientSafe } from './supabase';

export interface ProgressData {
  xp: number;
  level: number;
  streak: number;
  completed_lessons: { lessonId: string; score: number; completedAt: string }[];
  learned_vocabulary: string[];
  games_played: number;
  quizzes_taken: number;
  srs_cards: Record<string, unknown>;
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounced sync of progress data to Supabase.
 * Saves at most once per 30 seconds to avoid excessive writes.
 */
export function syncProgressToSupabase(userId: string, progress: ProgressData) {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    const supabase = getClientSafe();
    if (!supabase) return;
    await supabase
      .from('profiles')
      .update({ progress_data: progress })
      .eq('id', userId)
      .then(() => {});
  }, 30000); // Debounce: save at most once per 30 seconds
}

/**
 * Load progress data from Supabase for a given user.
 * Returns null if Supabase is not configured or no data found.
 */
export async function loadProgressFromSupabase(userId: string): Promise<ProgressData | null> {
  const supabase = getClientSafe();
  if (!supabase) return null;
  const { data } = await supabase
    .from('profiles')
    .select('progress_data')
    .eq('id', userId)
    .single();
  return (data?.progress_data as ProgressData) || null;
}
