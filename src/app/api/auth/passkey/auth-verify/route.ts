import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Create a Supabase client with the anon key.
 * We rely on:
 * - Anon RLS policy on passkey_credentials for reading
 * - SECURITY DEFINER RPC functions for cross-table lookups
 * - "Anyone can manage" policy on passkey_challenges
 */
function getAnonSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Derive rpID and origin from the request
    const host = request.headers.get('host') || 'localhost';
    const rpID = host.split(':')[0];
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    const supabase = getAnonSupabase();

    // The credential ID from the response tells us which credential was used
    // body.id is already base64url-encoded by the browser
    const credentialId = body.id;

    // Look up the credential in our database
    // RLS: anon can read passkey_credentials
    const { data: credential, error: credError } = await supabase
      .from('passkey_credentials')
      .select('*')
      .eq('id', credentialId)
      .single();

    if (credError || !credential) {
      return NextResponse.json(
        { error: 'Passkey not recognized' },
        { status: 400 }
      );
    }

    // Retrieve the stored challenge (most recent one with null user_id for auth flow)
    const { data: challengeRow, error: challengeError } = await supabase
      .from('passkey_challenges')
      .select('id, challenge')
      .is('user_id', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (challengeError || !challengeRow) {
      return NextResponse.json(
        { error: 'Challenge expired. Please try again.' },
        { status: 400 }
      );
    }

    // Decode the stored public key from base64url
    const publicKeyBytes = Buffer.from(credential.public_key, 'base64url');

    // Build the credential object for verification
    const credentialForVerification = {
      id: credentialId,
      publicKey: new Uint8Array(publicKeyBytes),
      counter: credential.counter,
      transports: credential.transports || [],
    };

    // Verify the authentication response
    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challengeRow.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: credentialForVerification,
    });

    if (!verification.verified) {
      return NextResponse.json(
        { error: 'Verification failed' },
        { status: 400 }
      );
    }

    // Update the credential counter to prevent replay attacks
    // Use RPC function (SECURITY DEFINER) since anon can't UPDATE passkey_credentials
    await supabase.rpc('update_passkey_counter', {
      cred_id: credentialId,
      new_counter: verification.authenticationInfo.newCounter,
    });

    // Clean up the used challenge
    await supabase
      .from('passkey_challenges')
      .delete()
      .eq('id', challengeRow.id);

    // Look up the user's profile and email using RPC (SECURITY DEFINER)
    const { data: userInfo } = await supabase.rpc('get_passkey_user_info', {
      lookup_user_id: credential.user_id,
    });

    // Return user data for manual session (without service role key,
    // we cannot generate a magic link / real Supabase session).
    // The client-side code will set the user in the auth store directly.
    return NextResponse.json({
      verified: true,
      user: {
        id: credential.user_id,
        email: userInfo?.email || '',
        name: userInfo?.full_name || 'User',
        username: userInfo?.username,
        isAdmin: userInfo?.is_admin || false,
        plan: userInfo?.plan || 'free',
      },
      sessionMethod: 'manual',
    });
  } catch (error) {
    console.error('Auth verify error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
