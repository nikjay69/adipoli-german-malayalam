import { NextRequest, NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Create a Supabase client with the anon key (no user auth).
 * We use RPC functions with SECURITY DEFINER to access data across users.
 * For passkey_credentials and passkey_challenges, RLS policies allow anon access.
 */
function getAnonSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    // Derive rpID from the request
    const host = request.headers.get('host') || 'localhost';
    const rpID = host.split(':')[0];

    const supabase = getAnonSupabase();

    // If an email is provided, look up the user's credentials to narrow down
    let allowCredentials: { id: string; transports?: AuthenticatorTransportFuture[] }[] | undefined;

    if (email) {
      // Use RPC to resolve email -> user_id (SECURITY DEFINER bypasses RLS)
      const { data: userId, error: resolveError } = await supabase.rpc('get_user_id_by_email', {
        lookup_email: email,
      });

      if (resolveError || !userId) {
        return NextResponse.json(
          { error: 'No account found with this email' },
          { status: 404 }
        );
      }

      // Read credentials — anon RLS policy allows reading
      const { data: creds } = await supabase
        .from('passkey_credentials')
        .select('id, transports')
        .eq('user_id', userId);

      if (creds && creds.length > 0) {
        allowCredentials = creds.map((c: { id: string; transports?: string[] }) => ({
          id: c.id,
          transports: (c.transports || []) as AuthenticatorTransportFuture[],
        }));
      } else {
        return NextResponse.json(
          { error: 'No passkeys registered for this email' },
          { status: 404 }
        );
      }
    }

    // Generate authentication options
    // If no email provided, allowCredentials is undefined = discoverable credential (resident key) flow
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
      ...(allowCredentials ? { allowCredentials } : {}),
    });

    // Store the challenge for verification lookup later
    // RLS: "Anyone can manage challenges" allows this
    await supabase
      .from('passkey_challenges')
      .insert({
        challenge: options.challenge,
        user_id: null, // Auth flow: user not yet identified
      });

    return NextResponse.json(options);
  } catch (error) {
    console.error('Auth options error:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication options' },
      { status: 500 }
    );
  }
}
