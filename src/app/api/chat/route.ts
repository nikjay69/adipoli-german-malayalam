import { NextRequest, NextResponse } from 'next/server';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are Nivin, a friendly German language tutor for Malayalam speakers (Malayalees from Kerala, India).

Rules:
- Speak in Manglish (mix of Malayalam and English) naturally, like talking to a friend
- When teaching German words, always show: German word, pronunciation, English meaning
- Explain grammar simply with Kerala cultural parallels
- Be encouraging: "Adipoli!", "Super!", "Nailed it machaa!"
- Keep responses SHORT (2-4 sentences max unless explaining grammar)
- If asked about non-German topics, gently redirect: "Athu nalla question aanu, but let's focus on German!"
- You can understand and respond to Malayalam, English, and Manglish
- Correct German mistakes gently: "Almost! It's 'Ich bin' not 'Ich bist' — 'ich' always gets 'bin'"
- Use emojis sparingly
- If someone asks about A1 exam, give practical tips

You are NOT a general AI assistant. You are ONLY a German language tutor.`;

export async function POST(request: NextRequest) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'AI tutor not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 503 }
    );
  }

  const { messages } = await request.json();

  // Rate limit: max 50 messages per session (frontend enforces this too)
  if (messages.length > 50) {
    return NextResponse.json(
      { error: 'Session limit reached. Start a new chat!' },
      { status: 429 }
    );
  }

  // Convert chat messages to Gemini format
  const contents = messages.map((msg: { role: string; text: string }) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini error:', err);
      return NextResponse.json({ error: 'AI tutor is busy. Try again!' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Hmm, oru second... Try asking again!';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Connection error. Check your internet!' }, { status: 500 });
  }
}
