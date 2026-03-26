import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are an expert German A1 language teacher and speech evaluator. 
Listen to the student's spoken audio and evaluate it.
Score exactly 0 to 100 based on pronunciation, fluency, and correctness of the requested task.
Provide your response strictly in JSON format without markdown fences.
Schema:
{
  "transcript": "<What the student actually said>",
  "score": <number>,
  "feedback": "<1-2 sentences of encouraging feedback in simple English>",
  "corrections": ["<Specific correction 1>", "<Specific correction 2>"]
}

Important criteria for A1:
- Do not expect native-level fluency.
- Focus on understandable communication.
- Identify major pronunciation errors (e.g., 'w' pronounced as English 'w' instead of 'v').
- Ensure the student fulfilled the context/prompt (e.g., if asked to introduce themselves, did they say their name and age?).
`;

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'AI checker not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const context = formData.get('context') as string || '';
    const expected = formData.get('expected') as string || '';

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Convert audio Blob into base64 string
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString('base64');
    
    // Determine mimeType (usually audio/webm from browsers)
    const mimeType = audioFile.type || 'audio/webm';

    const userPrompt = [
      `Context task: ${context}`,
      expected ? `Expected response or topic: ${expected}` : '',
      `Please transcribe and evaluate the attached audio.`
    ].filter(Boolean).join('\n');

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          {
            role: 'user',
            parts: [
              { text: userPrompt },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Audio
                }
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 400,
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini check-speech error:', err);
      return NextResponse.json(
        { error: 'AI checker is busy or failed to process audio. Try again!' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let result;
    try {
      const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      result = JSON.parse(cleaned);
    } catch {
      console.error('Failed to parse Gemini response:', rawText);
      return NextResponse.json({ 
        transcript: "(Could not confidently transcribe)",
        score: 50, 
        feedback: "We heard your audio but had trouble analyzing it completely.", 
        corrections: [] 
      });
    }

    return NextResponse.json({
      transcript: result.transcript || '(Empty)',
      score: Math.max(0, Math.min(100, Number(result.score) || 0)),
      feedback: String(result.feedback || 'Checked.'),
      corrections: Array.isArray(result.corrections) ? result.corrections.map(String) : [],
    });

  } catch (error) {
    console.error('Check-speech error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing audio.' },
      { status: 500 }
    );
  }
}
