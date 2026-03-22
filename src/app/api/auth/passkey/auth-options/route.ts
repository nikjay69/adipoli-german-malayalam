import { NextRequest, NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    // Derive rpID from the request
    const host = request.headers.get('host') || 'localhost';
    const rpID = host.split(':')[0];

    const supabase = getServiceSupabase();

    // If an email is provided, look up the user's credentials to narrow down
    let allowCredentials: { id: string; transports?: AuthenticatorTransportFuture[] }[] | undefined;

    if (email) {
      // Look up the user by email using Supabase admin API
      const { data: usersData } = await supabase.auth.admin.listUsers();
      const matchedUser = usersData?.users?.find(
        (u) => u.email === email
      );

      if (matchedUser) {
        const { data: creds } = await supabase
          .from('passkey_credentials')
          .select('id, transports')
          .eq('user_id', matchedUser.id);

        if (creds && creds.length > 0) {
          allowCredentials = creds.map((c) => ({
            id: c.id,
            transports: (c.transports || []) as AuthenticatorTransportFuture[],
          }));
        } else {
          return NextResponse.json(
            { error: 'No passkeys registered for this email' },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'No account found with this email' },
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
