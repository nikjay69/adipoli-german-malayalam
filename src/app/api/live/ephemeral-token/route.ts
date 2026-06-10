import { NextRequest, NextResponse } from 'next/server';
import { getScenario } from '@/lib/content/roleplay-scenarios';

const AUTH_TOKEN_URL = 'https://generativelanguage.googleapis.com/v1alpha/auth_tokens';
const LIVE_MODEL = 'gemini-2.5-flash-native-audio-latest';

const TOKEN_LIFETIME_MS = 2 * 60 * 1000;
const SESSION_LIFETIME_MS = 8 * 60 * 1000;

export async function POST(request: NextRequest) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'Voice tutor not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 503 }
    );
  }

  let body: { scenarioId?: string; voice?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const scenario = body.scenarioId ? getScenario(body.scenarioId) : undefined;
  if (!scenario) {
    return NextResponse.json({ error: 'Unknown scenario' }, { status: 400 });
  }

  const now = Date.now();
  const expireTime = new Date(now + SESSION_LIFETIME_MS).toISOString();
  const newSessionExpireTime = new Date(now + TOKEN_LIFETIME_MS).toISOString();

  try {
    const response = await fetch(AUTH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        uses: 1,
        expire_time: expireTime,
        new_session_expire_time: newSessionExpireTime,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Ephemeral token error:', response.status, errText);
      return NextResponse.json(
        { error: 'Could not start voice session. Try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const token = data.name as string | undefined;
    if (!token) {
      console.error('Ephemeral token missing in response:', data);
      return NextResponse.json({ error: 'Invalid token response' }, { status: 502 });
    }

    return NextResponse.json({
      token,
      model: LIVE_MODEL,
      voice: body.voice || 'Aoede',
      systemPrompt: scenario.systemPrompt,
      scenario: {
        id: scenario.id,
        title: scenario.title,
        titleMl: scenario.titleMl,
        goal: scenario.goal,
        goalMl: scenario.goalMl,
        targetPhrases: scenario.targetPhrases,
        durationMin: scenario.durationMin,
        character: scenario.character,
      },
    });
  } catch (error) {
    console.error('Ephemeral token fetch failed:', error);
    return NextResponse.json({ error: 'Voice service unreachable' }, { status: 500 });
  }
}
