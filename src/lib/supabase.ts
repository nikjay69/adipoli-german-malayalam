import { createBrowserClient } from '@supabase/ssr';

let client: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Check if Supabase environment variables are properly configured.
 * Works on both server and client — reads process.env directly
 * (NEXT_PUBLIC_ vars are inlined by Next.js at build time).
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(
    url &&
    key &&
    url.startsWith('https://') &&
    key.startsWith('eyJ')
  );
}

/**
 * Get or create the Supabase browser client singleton.
 * Returns null (instead of throwing) when Supabase is not configured,
 * so callers can gracefully fall back to demo mode.
 */
export function getClientSafe(): ReturnType<typeof createBrowserClient> | null {
  if (!isSupabaseConfigured()) return null;

  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return client;
}

/**
 * Get or create the Supabase browser client singleton.
 * Throws if Supabase is not configured — use getClientSafe() when
 * a null return is acceptable.
 */
export function createClient(): ReturnType<typeof createBrowserClient> {
  const c = getClientSafe();
  if (!c) {
    throw new Error(
      'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
  return c;
}
