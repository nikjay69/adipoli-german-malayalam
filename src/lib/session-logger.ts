// Collects device fingerprint and logs sessions
// Called on login and periodically (every 30 min while active)

export interface SessionData {
  deviceFingerprint: string;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
}

export function getDeviceFingerprint(): string {
  // Create a simple fingerprint from available browser data
  // NOT tracking — just detecting if same account used on very different devices
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('fingerprint', 10, 10);
  const canvasHash = canvas.toDataURL().slice(-20);

  const data = [
    navigator.userAgent,
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
    navigator.platform,
    canvasHash,
  ].join('|');

  // Simple hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function collectSessionData(): SessionData {
  return {
    deviceFingerprint: getDeviceFingerprint(),
    userAgent: navigator.userAgent.slice(0, 200),
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
  };
}

export async function logSession(userId: string): Promise<void> {
  // Import supabase lazily to avoid SSR issues
  const { getClientSafe } = await import('./supabase');
  const supabase = getClientSafe();
  if (!supabase) return;

  const data = collectSessionData();

  await supabase.from('session_logs').insert({
    user_id: userId,
    device_fingerprint: data.deviceFingerprint,
    user_agent: data.userAgent,
    screen_resolution: data.screenResolution,
    timezone: data.timezone,
    language: data.language,
    platform: data.platform,
  });
}
