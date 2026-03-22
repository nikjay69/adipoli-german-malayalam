import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Derive rpID and origin from the request
    const host = request.headers.get('host') || 'localhost';
    const rpID = host.split(':')[0];
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    const supabase = getServiceSupabase();

    // The credential ID from the response tells us which credential was used
    // body.id is already base64url-encoded by the browser
    const credentialId = body.id;

    // Look up the credential in our database
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
    await supabase
      .from('passkey_credentials')
      .update({ counter: verification.authenticationInfo.newCounter })
      .eq('id', credentialId);

    // Clean up the used challenge
    await supabase
      .from('passkey_challenges')
      .delete()
      .eq('id', challengeRow.id);

    // Look up the user's profile to return user data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', credential.user_id)
      .single();

    // Get the user's email from Supabase auth
    const { data: { user: authUser } } = await supabase.auth.admin.getUserById(
      credential.user_id
    );

    // Generate a magic link / session token for the user
    // Since we can't directly create a session, we generate a magic link token
    // that the client can use to sign in
    const { data: magicLink, error: magicLinkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: authUser?.email || '',
    });

    if (magicLinkError) {
      // Fallback: return user data and let client handle session differently
      console.error('Magic link generation failed:', magicLinkError);
      return NextResponse.json({
        verified: true,
        user: {
          id: credential.user_id,
          email: authUser?.email || '',
          name: profile?.full_name || authUser?.user_metadata?.full_name || 'User',
          username: profile?.username || authUser?.user_metadata?.username,
          isAdmin: profile?.is_admin || false,
          plan: profile?.plan || 'free',
        },
        // No session token available — client must handle this
        sessionMethod: 'manual',
      });
    }

    // Extract the token hash and type from the generated link properties
    const tokenHash = magicLink.properties?.hashed_token;
    const emailRedirectTo = magicLink.properties?.redirect_to;

    return NextResponse.json({
      verified: true,
      user: {
        id: credential.user_id,
        email: authUser?.email || '',
        name: profile?.full_name || authUser?.user_metadata?.full_name || 'User',
        username: profile?.username || authUser?.user_metadata?.username,
        isAdmin: profile?.is_admin || false,
        plan: profile?.plan || 'free',
      },
      sessionMethod: 'otp',
      tokenHash,
      email: authUser?.email || '',
    });
  } catch (error) {
    console.error('Auth verify error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
