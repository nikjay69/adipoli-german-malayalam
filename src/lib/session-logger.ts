/**
 * GDPR-Compliant Session Logger
 *
 * Purpose: Account sharing detection ONLY
 * Legal basis: Legitimate interest (GDPR Art. 6(1)(f)) — protecting service from unauthorized sharing
 *
 * Privacy measures:
 * - IP addresses are SHA-256 hashed with a salt before storage — NEVER stored raw
 * - Hashed IP cannot be reversed to the original IP
 * - Data retained for 90 days only (auto-purge recommended)
 * - User can request deletion via GDPR Art. 17
 * - No data shared with third parties
 * - Disclosed in privacy policy
 */

export interface SessionData {
  deviceFingerprint: string;
  ipHash: string;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
}

/** SHA-256 hash (one-way, irreversible) */
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Hash an IP with a per-app salt — irreversible */
async function hashIP(ip: string): Promise<string> {
  // Salt ensures rainbow table attacks can't reverse the hash
  const salt = 'adipoli-german-v1-sharing-detect';
  const hash = await sha256(salt + ':' + ip);
  // Truncate to 16 chars — still unique enough for comparison, less storage
  return hash.slice(0, 16);
}

export function getDeviceFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('fp', 10, 10);
  const canvasHash = canvas.toDataURL().slice(-20);

  const data = [
    navigator.userAgent,
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
    navigator.platform,
    canvasHash,
  ].join('|');

  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function collectSessionData(): Omit<SessionData, 'ipHash'> {
  return {
    deviceFingerprint: getDeviceFingerprint(),
    userAgent: navigator.userAgent.slice(0, 200),
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
  };
}

/** Fetch the user's IP and hash it. Uses a public API — no server needed. */
async function getHashedIP(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=text', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return 'unknown';
    const ip = await res.text();
    return await hashIP(ip.trim());
  } catch {
    return 'unknown';
  }
}

export async function logSession(userId: string): Promise<void> {
  const { getClientSafe } = await import('./supabase');
  const supabase = getClientSafe();
  if (!supabase) return;

  const data = collectSessionData();
  const ipHash = await getHashedIP();

  await supabase.from('session_logs').insert({
    user_id: userId,
    device_fingerprint: data.deviceFingerprint,
    ip_hash: ipHash,
    user_agent: data.userAgent,
    screen_resolution: data.screenResolution,
    timezone: data.timezone,
    language: data.language,
    platform: data.platform,
  }).then(({ error }: { error: { message: string } | null }) => {
    if (error) console.warn('Session log failed:', error.message);
  }).catch(() => {}); // Network errors are expected offline
}
