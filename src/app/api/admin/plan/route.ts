import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const planPath = path.join(process.cwd(), 'docs', 'COURSE_PLAN_10_10.md');

export async function GET() {
  try {
    const content = await fs.readFile(planPath, 'utf8');
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Failed to read plan file:', error);
    return NextResponse.json(
      { error: 'Could not load plan file' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const content = typeof body?.content === 'string' ? body.content : '';

    if (!content.trim()) {
      return NextResponse.json(
        { error: 'Plan content cannot be empty' },
        { status: 400 }
      );
    }

    await fs.writeFile(planPath, content, 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save plan file:', error);
    return NextResponse.json(
      { error: 'Could not save plan file' },
      { status: 500 }
    );
  }
}
