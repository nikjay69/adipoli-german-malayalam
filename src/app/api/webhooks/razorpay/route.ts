/**
 * Razorpay webhook handler.
 *
 * Events we care about:
 *   - subscription.activated   → insert into subscriptions, set profile.plan
 *   - subscription.charged     → insert payment row
 *   - subscription.cancelled   → status = canceled
 *   - subscription.paused      → status = paused
 *   - subscription.halted      → status = past_due
 *   - subscription.pending     → status = trialing
 *   - payment.failed           → mark payment failed
 *
 * Security: verify `x-razorpay-signature` header using RAZORPAY_WEBHOOK_SECRET.
 *
 * Env vars required:
 *   RAZORPAY_WEBHOOK_SECRET
 *   SUPABASE_SERVICE_ROLE_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

function verifyRazorpaySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

type RazorpayEvent = {
  event: string;
  account_id: string;
  created_at: number;
  payload: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Razorpay webhook not configured' },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature');
  if (!verifyRazorpaySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: RazorpayEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // TODO: wire Supabase service-role client and dispatch on event.event.
  console.log('[razorpay webhook]', event.event, event.created_at);

  return NextResponse.json({ received: true });
}

export function GET() {
  return NextResponse.json({ ok: true, webhook: 'razorpay' });
}
