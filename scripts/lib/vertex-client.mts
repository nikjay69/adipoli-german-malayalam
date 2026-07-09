// Vertex AI client for the credit-burn batches. Auths with the owner's
// service account (gemini-runner@adipoli-german) so all spend bills the
// adipoli-german project where the expiring credits live.
//
// Set GOOGLE_APPLICATION_CREDENTIALS in .env.local (path to the SA JSON;
// the file stays outside the repo).

import * as fs from 'fs';
import * as path from 'path';
import { GoogleAuth } from 'google-auth-library';

const PROJECT = 'adipoli-german';

function loadEnvLocal() {
  const envPath = path.resolve('.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnvLocal();

const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

export async function getToken(): Promise<string> {
  const client = await auth.getClient();
  const t = await client.getAccessToken();
  if (!t.token) throw new Error('Failed to mint access token — check GOOGLE_APPLICATION_CREDENTIALS');
  return t.token;
}

async function post(url: string, body: unknown, extraHeaders: Record<string, string> = {}) {
  const token = await getToken();
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...extraHeaders },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

/** Imagen predict — returns array of base64 PNG strings. Retries once on transient failure. */
export async function generateImages(
  model: string,
  prompt: string,
  params: { sampleCount?: number; aspectRatio?: string } = {},
): Promise<string[]> {
  const url = `https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/${model}:predict`;
  const body = {
    instances: [{ prompt }],
    parameters: { sampleCount: params.sampleCount ?? 1, aspectRatio: params.aspectRatio ?? '9:16' },
  };
  for (let attempt = 1; ; attempt++) {
    try {
      const json = await post(url, body);
      return (json.predictions ?? [])
        .map((p: { bytesBase64Encoded?: string }) => p.bytesBase64Encoded)
        .filter(Boolean);
    } catch (err) {
      if (attempt >= 2) throw err;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

/** Cloud Text-to-Speech — returns MP3 buffer. */
export async function synthesizeTts(
  text: string,
  opts: { voiceName?: string; speakingRate?: number } = {},
): Promise<Buffer> {
  const json = await post(
    'https://texttospeech.googleapis.com/v1/text:synthesize',
    {
      input: { text },
      voice: { languageCode: 'de-DE', name: opts.voiceName ?? 'de-DE-Chirp3-HD-Kore' },
      audioConfig: { audioEncoding: 'MP3', speakingRate: opts.speakingRate ?? 0.95 },
    },
    { 'x-goog-user-project': PROJECT },
  );
  if (!json.audioContent) throw new Error('No audioContent in TTS response');
  return Buffer.from(json.audioContent, 'base64');
}

/** Veo long-running generation — submits and polls; returns base64 mp4(s). */
export async function generateVideo(
  model: string,
  prompt: string,
  opts: { durationSeconds?: number; aspectRatio?: string } = {},
): Promise<string[]> {
  const base = `https://aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/${model}`;
  const start = await post(`${base}:predictLongRunning`, {
    instances: [{ prompt }],
    parameters: {
      durationSeconds: opts.durationSeconds ?? 6,
      aspectRatio: opts.aspectRatio ?? '9:16',
      sampleCount: 1,
      generateAudio: false,
    },
  });
  const opName = start.name as string;
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const op = await post(`${base}:fetchPredictOperation`, { operationName: opName });
    if (op.done) {
      if (op.error) throw new Error(`Veo error: ${JSON.stringify(op.error).slice(0, 300)}`);
      const videos = op.response?.videos ?? [];
      return videos.map((v: { bytesBase64Encoded?: string }) => v.bytesBase64Encoded).filter(Boolean);
    }
  }
  throw new Error(`Veo operation timed out: ${opName}`);
}
