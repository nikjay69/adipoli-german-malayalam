/**
 * Paddle webhook handler.
 *
 * Events we care about:
 *   - subscription.created   → insert into subscriptions, set profile.plan
 *   - subscription.updated   → update status / period
 *   - subscription.canceled  → set status = canceled
 *   - subscription.paused    → set status = paused
 *   - transaction.completed  → insert into payments (receipt)
 *   - transaction.payment_failed → mark payment failed
 *
 * Security: verify `paddle-signature` header using PADDLE_WEBHOOK_SECRET.
 *
 * Env vars required:
 *   PADDLE_WEBHOOK_SECRET
 *   SUPABASE_SERVICE_ROLE_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

function verifyPaddleSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;
  // Paddle signature format: "ts=...;h1=<hmac>"
  const parts = Object.fromEntries(
    signatureHeader.split(';').map((p) => p.split('=')),
  );
  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) return false;

  const signedPayload = `${ts}:${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(h1, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

type PaddleEvent = {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    // Not configured yet — return 503 so Paddle retries after we wire it up.
    return NextResponse.json(
      { error: 'Paddle webhook not configured' },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get('paddle-signature');
  if (!verifyPaddleSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: PaddleEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // TODO: wire Supabase service-role client and dispatch on event.event_type.
  // For now, just log and 200 so Paddle doesn't retry.
  console.log('[paddle webhook]', event.event_type, event.event_id);

  return NextResponse.json({ received: true, event_id: event.event_id });
}

export function GET() {
  return NextResponse.json({ ok: true, webhook: 'paddle' });
}
