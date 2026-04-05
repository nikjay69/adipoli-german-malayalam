import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const IMAGEN_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict';

const CACHE_DIR = path.join(process.cwd(), 'public', 'generated');

// Simple hash for cache keys
function hashPrompt(prompt: string): string {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    const char = prompt.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
  }

  try {
    const { prompt, type = 'scene' } = await request.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Check filesystem cache first
    const cacheKey = hashPrompt(prompt);
    const subDir = type === 'vocab' ? 'vocab' : 'scenes';
    const cacheDir = path.join(CACHE_DIR, subDir);
    const cachePath = path.join(cacheDir, `${cacheKey}.png`);
    const publicPath = `/generated/${subDir}/${cacheKey}.png`;

    // Return cached if exists
    if (fs.existsSync(cachePath)) {
      return NextResponse.json({ url: publicPath, cached: true });
    }

    // Build the style-optimized prompt
    const styledPrompt = type === 'vocab'
      ? `Simple, clear illustration of ${prompt}. Flat design style, warm colors, no text, white background, centered object, suitable for a learning app.`
      : `${prompt}. Illustrated style, warm colors, no text, suitable as a background for a language learning app. Atmospheric, slightly blurred for readability.`;

    // Call Imagen API
    const response = await fetch(IMAGEN_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        instances: [{ prompt: styledPrompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: type === 'vocab' ? '1:1' : '16:9',
          safetyFilterLevel: 'block_few',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Imagen API error:', errorText);
      return NextResponse.json({ error: 'Image generation failed', details: errorText }, { status: 502 });
    }

    const data = await response.json();
    const imageB64 = data?.predictions?.[0]?.bytesBase64Encoded;

    if (!imageB64) {
      return NextResponse.json({ error: 'No image in response' }, { status: 502 });
    }

    // Save to cache
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(cachePath, Buffer.from(imageB64, 'base64'));

    return NextResponse.json({ url: publicPath, cached: false });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Internal error', message: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
