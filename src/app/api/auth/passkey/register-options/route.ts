import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey);
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

    // Verify the user via Supabase auth using the anon key + JWT
    const { createClient: createAnonClient } = await import('@supabase/supabase-js');
    const supabaseAnon = createAnonClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: userError } = await supabaseAnon.auth.getUser();
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
    const supabase = getServiceSupabase();
    const { data: existingCreds } = await supabase
      .from('passkey_credentials')
      .select('id, transports')
      .eq('user_id', user.id);

    const excludeCredentials = (existingCreds || []).map((cred) => ({
      id: cred.id,
      transports: cred.transports || [],
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
