import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Create a Supabase client authenticated with the user's JWT.
 * This respects RLS policies — the user can only access their own data.
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

    // Derive rpID and origin from the request
    const host = request.headers.get('host') || 'localhost';
    const rpID = host.split(':')[0]; // Remove port for localhost:3000
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    // Fetch existing credentials for this user (to exclude them)
    // RLS policy: "Users read own passkeys" allows this
    const { data: existingCreds } = await supabase
      .from('passkey_credentials')
      .select('id, transports')
      .eq('user_id', user.id);

    const excludeCredentials = (existingCreds || []).map((cred: { id: string; transports?: string[] }) => ({
      id: cred.id,
      transports: (cred.transports || []) as AuthenticatorTransportFuture[],
    }));

    // Generate registration options
    const options = await generateRegistrationOptions({
      rpName: 'Adipoli German',
      rpID,
      userName: user.email || user.id,
      userDisplayName: user.user_metadata?.full_name || user.email || 'User',
      attestationType: 'none',
      excludeCredentials,
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });

    // Store the challenge for verification
    // RLS policy: "Anyone can manage challenges" allows this
    await supabase
      .from('passkey_challenges')
      .insert({
        challenge: options.challenge,
        user_id: user.id,
      });

    return NextResponse.json(options);
  } catch (error) {
    console.error('Register options error:', error);
    return NextResponse.json(
      { error: 'Failed to generate registration options' },
      { status: 500 }
    );
  }
}
