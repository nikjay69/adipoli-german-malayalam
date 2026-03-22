import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are a German A1 language teacher. Check the student's German text.
Be encouraging but accurate. Score 0-100.
- 100: Perfect German, matches expected meaning
- 80-99: Minor errors (capitalization, small typo) but correct meaning
- 50-79: Some grammar errors but understandable
- 20-49: Significant errors, hard to understand
- 0-19: Incomprehensible or completely wrong

Return ONLY valid JSON with no markdown formatting, no code fences:
{ "score": <number>, "feedback": "<1 sentence>", "corrections": ["<specific fix 1>", "<specific fix 2>"], "isCorrect": <true if score >= 70> }

Important:
- For form-filling exercises, check that the answer fits the field (e.g., "Vorname" should be a first name)
- For message writing, check Anrede (greeting), all content points addressed, Grußformel (closing)
- Award partial credit for understandable German even with errors
- Corrections should be specific: "Change 'ich gehe' to 'Ich gehe' (capitalize first word)"
- Keep feedback in simple English so A1 learners understand`;

interface CheckRequest {
  expected: string;
  userInput: string;
  context: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'AI checker not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 503 }
    );
  }

  let body: CheckRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { expected, userInput, context } = body;

  if (!userInput || typeof userInput !== 'string') {
    return NextResponse.json({ error: 'userInput is required' }, { status: 400 });
  }

  if (userInput.trim().length === 0) {
    return NextResponse.json({
      score: 0,
      feedback: 'You didn\'t write anything. Give it a try!',
      corrections: [],
      isCorrect: false,
    });
  }

  const userPrompt = [
    `Context: ${context || 'General German A1 writing exercise'}`,
    expected ? `Expected answer / topic: ${expected}` : '',
    `Student wrote: "${userInput}"`,
    '',
    'Evaluate the student\'s German and return JSON.',
  ].filter(Boolean).join('\n');

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          maxOutputTokens: 400,
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini check-german error:', err);
      return NextResponse.json(
        { error: 'AI checker is busy. Try again!' },
        { status: 502 }
      );
    }

    const data: GeminiResponse = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse the JSON response from Gemini
    let result: { score: number; feedback: string; corrections: string[]; isCorrect: boolean };
    try {
      // Strip possible markdown code fences
      const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      result = JSON.parse(cleaned);
    } catch {
      console.error('Failed to parse Gemini response:', rawText);
      // Fallback: do a basic comparison
      const normalizedExpected = (expected || '').toLowerCase().trim();
      const normalizedInput = userInput.toLowerCase().trim();
      const isMatch = normalizedExpected === normalizedInput;
      result = {
        score: isMatch ? 100 : 40,
        feedback: isMatch
          ? 'Looks correct!'
          : 'Could not fully analyze your answer. Please try again.',
        corrections: [],
        isCorrect: isMatch,
      };
    }

    // Ensure valid shape
    return NextResponse.json({
      score: Math.max(0, Math.min(100, Number(result.score) || 0)),
      feedback: String(result.feedback || 'Checked.'),
      corrections: Array.isArray(result.corrections) ? result.corrections.map(String) : [],
      isCorrect: Boolean(result.isCorrect),
    });
  } catch (error) {
    console.error('Check-german error:', error);
    return NextResponse.json(
      { error: 'Connection error. Check your internet!' },
      { status: 500 }
    );
  }
}
