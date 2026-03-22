import { NextRequest, NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Create a Supabase client authenticated with the user's JWT.
 */
function getUserSupabase(token: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Get the user's JWT from the Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify the user via Supabase auth
    const supabase = getUserSupabase(token);
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Derive rpID and origin from the request
    const host = request.headers.get('host') || 'localhost';
    const rpID = host.split(':')[0];
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    // Retrieve the stored challenge
    // RLS: "Anyone can manage challenges" allows this
    const { data: challengeRow, error: challengeError } = await supabase
      .from('passkey_challenges')
      .select('challenge')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (challengeError || !challengeRow) {
      return NextResponse.json(
        { error: 'Challenge not found. Please try again.' },
        { status: 400 }
      );
    }

    // Verify the registration response
    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: challengeRow.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json(
        { error: 'Verification failed' },
        { status: 400 }
      );
    }

    const { credential, credentialDeviceType, credentialBackedUp } =
      verification.registrationInfo;

    // Store the credential using the base64url-encoded credential ID
    const credentialIdBase64 = Buffer.from(credential.id).toString('base64url');
    const publicKeyBase64 = Buffer.from(credential.publicKey).toString('base64url');

    // RLS: "Users create passkeys" allows INSERT where auth.uid() = user_id
    const { error: insertError } = await supabase
      .from('passkey_credentials')
      .insert({
        id: credentialIdBase64,
        user_id: user.id,
        public_key: publicKeyBase64,
        counter: credential.counter,
        device_type: credentialDeviceType,
        backed_up: credentialBackedUp,
        transports: credential.transports || [],
      });

    if (insertError) {
      console.error('Failed to store credential:', insertError);
      return NextResponse.json(
        { error: 'Failed to save passkey' },
        { status: 500 }
      );
    }

    // Clean up used challenges for this user
    await supabase
      .from('passkey_challenges')
      .delete()
      .eq('user_id', user.id);

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error('Register verify error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
