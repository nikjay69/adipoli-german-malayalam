/**
 * Account Sharing Detector — GDPR Compliant
 *
 * Analyzes hashed session data to detect suspicious patterns.
 * No raw IPs stored — only SHA-256 hashes (irreversible).
 * Flags are for admin review only, never auto-blocks.
 */

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

  if (logs.length < 3) return flags;

  // 1. Multiple devices (3+ unique fingerprints)
  const uniqueFingerprints = new Set(logs.map(l => l.device_fingerprint));
  if (uniqueFingerprints.size >= 3) {
    flags.push({
      flagType: 'multiple_devices',
      severity: uniqueFingerprints.size >= 5 ? 'high' : 'medium',
      details: {
        deviceCount: uniqueFingerprints.size,
        message: `${uniqueFingerprints.size} different devices used`,
      },
    });
  }

  // 2. Multiple IP locations (hashed IPs — different hash = different network)
  const uniqueIPs = new Set(logs.map(l => l.ip_hash).filter(h => h && h !== 'unknown'));
  if (uniqueIPs.size >= 3) {
    flags.push({
      flagType: 'multiple_networks',
      severity: uniqueIPs.size >= 5 ? 'high' : 'medium',
      details: {
        networkCount: uniqueIPs.size,
        message: `${uniqueIPs.size} different networks detected (hashed, not raw IPs)`,
      },
    });
  }

  // 3. Multiple timezones
  const timezones = new Set(logs.map(l => l.timezone));
  if (timezones.size >= 2) {
    flags.push({
      flagType: 'multiple_timezones',
      severity: timezones.size >= 3 ? 'high' : 'low',
      details: {
        timezones: [...timezones],
        message: `Sessions from ${timezones.size} timezones: ${[...timezones].join(', ')}`,
      },
    });
  }

  // 4. Concurrent sessions (different devices within 5 minutes)
  const sorted = [...logs].sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  let concurrentCount = 0;
  const concurrentPairs: string[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const timeDiff = new Date(sorted[i].created_at).getTime() - new Date(sorted[i - 1].created_at).getTime();
    const diffDevice = sorted[i].device_fingerprint !== sorted[i - 1].device_fingerprint;
    const diffIP = sorted[i].ip_hash !== sorted[i - 1].ip_hash;
    if (timeDiff < 5 * 60 * 1000 && diffDevice) {
      concurrentCount++;
      if (diffIP) {
        concurrentPairs.push(`${sorted[i].timezone} + ${sorted[i - 1].timezone}`);
      }
    }
  }
  if (concurrentCount >= 2) {
    flags.push({
      flagType: 'concurrent_sessions',
      severity: concurrentCount >= 5 ? 'high' : 'medium',
      details: {
        concurrentCount,
        fromDifferentNetworks: concurrentPairs.length,
        message: `${concurrentCount} near-simultaneous sessions from different devices`,
      },
    });
  }

  // 5. Multiple platforms (Win + Mac + Linux + mobile = very suspicious)
  const platforms = new Set(logs.map(l => l.platform));
  if (platforms.size >= 3) {
    flags.push({
      flagType: 'multiple_platforms',
      severity: platforms.size >= 4 ? 'high' : 'medium',
      details: {
        platforms: [...platforms],
        message: `${platforms.size} different OS platforms: ${[...platforms].join(', ')}`,
      },
    });
  }

  // 6. Rapid location changes (different IP hash within 30 min — impossible travel)
  for (let i = 1; i < sorted.length; i++) {
    const timeDiff = new Date(sorted[i].created_at).getTime() - new Date(sorted[i - 1].created_at).getTime();
    const diffIP = sorted[i].ip_hash && sorted[i - 1].ip_hash &&
      sorted[i].ip_hash !== sorted[i - 1].ip_hash &&
      sorted[i].ip_hash !== 'unknown' && sorted[i - 1].ip_hash !== 'unknown';
    const diffTZ = sorted[i].timezone !== sorted[i - 1].timezone;

    if (timeDiff < 30 * 60 * 1000 && diffIP && diffTZ) {
      flags.push({
        flagType: 'impossible_travel',
        severity: 'high',
        details: {
          message: `Timezone changed from ${sorted[i - 1].timezone} to ${sorted[i].timezone} in ${Math.round(timeDiff / 60000)} minutes`,
          from: sorted[i - 1].timezone,
          to: sorted[i].timezone,
          minutesApart: Math.round(timeDiff / 60000),
        },
      });
      break; // One flag is enough
    }
  }

  return flags;
}
