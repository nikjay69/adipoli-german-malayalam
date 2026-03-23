// Analyzes session logs to detect potential account sharing
// Runs server-side or in admin panel

export interface SharingFlag {
  flagType: string;
  severity: 'low' | 'medium' | 'high';
  details: Record<string, unknown>;
}

export interface SessionLog {
  id: string;
  user_id: string;
  device_fingerprint: string;
  ip_hash: string | null;
  user_agent: string;
  screen_resolution: string;
  timezone: string;
  language: string;
  platform: string;
  created_at: string;
}

export function analyzeSessionLogs(logs: SessionLog[]): SharingFlag[] {
  const flags: SharingFlag[] = [];

  if (logs.length < 3) return flags; // Not enough data

  // 1. Multiple devices in short time
  const uniqueFingerprints = new Set(logs.map((l) => l.device_fingerprint));
  if (uniqueFingerprints.size >= 3) {
    flags.push({
      flagType: 'multiple_devices',
      severity: uniqueFingerprints.size >= 5 ? 'high' : 'medium',
      details: {
        deviceCount: uniqueFingerprints.size,
        fingerprints: [...uniqueFingerprints],
      },
    });
  }

  // 2. Multiple timezones
  const timezones = new Set(logs.map((l) => l.timezone));
  if (timezones.size >= 2) {
    // Check if they're far apart (not just travel)
    flags.push({
      flagType: 'multiple_timezones',
      severity: timezones.size >= 3 ? 'high' : 'low',
      details: { timezones: [...timezones] },
    });
  }

  // 3. Concurrent sessions (sessions within 5 min from different devices)
  const sorted = [...logs].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  let concurrentCount = 0;
  for (let i = 1; i < sorted.length; i++) {
    const timeDiff =
      new Date(sorted[i].created_at).getTime() -
      new Date(sorted[i - 1].created_at).getTime();
    if (
      timeDiff < 5 * 60 * 1000 &&
      sorted[i].device_fingerprint !== sorted[i - 1].device_fingerprint
    ) {
      concurrentCount++;
    }
  }
  if (concurrentCount >= 2) {
    flags.push({
      flagType: 'concurrent_sessions',
      severity: concurrentCount >= 5 ? 'high' : 'medium',
      details: { concurrentCount },
    });
  }

  // 4. Multiple platforms (e.g. Win32, Linux, MacIntel all for one user)
  const platforms = new Set(logs.map((l) => l.platform));
  if (platforms.size >= 3) {
    flags.push({
      flagType: 'multiple_platforms',
      severity: platforms.size >= 4 ? 'high' : 'medium',
      details: { platforms: [...platforms], platformCount: platforms.size },
    });
  }

  return flags;
}
