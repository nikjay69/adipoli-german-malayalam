import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeSessionLogs } from '@/lib/sharing-detector';
import type { SessionLog } from '@/lib/sharing-detector';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // Extract the user's JWT from the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authorization' },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);

    // Create a Supabase client authenticated as the calling user
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    // Verify the caller is an admin by checking their profile
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin, username')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin && profile?.username !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Fetch all session logs (RLS will ensure only admins can read)
    const { data: allLogs, error: logsError } = await supabase
      .from('session_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5000);

    if (logsError) {
      return NextResponse.json(
        { error: 'Failed to fetch session logs: ' + logsError.message },
        { status: 500 }
      );
    }

    if (!allLogs || allLogs.length === 0) {
      return NextResponse.json({
        message: 'No session logs found',
        flagsCreated: 0,
        usersAnalyzed: 0,
      });
    }

    // Group logs by user_id
    const logsByUser = new Map<string, SessionLog[]>();
    for (const log of allLogs as SessionLog[]) {
      const existing = logsByUser.get(log.user_id) || [];
      existing.push(log);
      logsByUser.set(log.user_id, existing);
    }

    // Analyze each user's sessions
    let totalFlagsCreated = 0;
    const flaggedUsers: string[] = [];

    for (const [userId, userLogs] of logsByUser) {
      const flags = analyzeSessionLogs(userLogs);

      if (flags.length === 0) continue;

      // Check if we already have unreviewed flags for this user to avoid duplicates
      const { data: existingFlags } = await supabase
        .from('sharing_flags')
        .select('flag_type')
        .eq('user_id', userId)
        .eq('reviewed', false);

      const existingTypes = new Set(
        (existingFlags || []).map((f: { flag_type: string }) => f.flag_type)
      );

      // Only insert flags that don't already exist as unreviewed
      const newFlags = flags.filter((f) => !existingTypes.has(f.flagType));

      if (newFlags.length > 0) {
        const rows = newFlags.map((f) => ({
          user_id: userId,
          flag_type: f.flagType,
          severity: f.severity,
          details: f.details,
        }));

        const { error: insertError } = await supabase
          .from('sharing_flags')
          .insert(rows);

        if (!insertError) {
          totalFlagsCreated += newFlags.length;
          flaggedUsers.push(userId);
        }
      }
    }

    return NextResponse.json({
      message: 'Analysis complete',
      usersAnalyzed: logsByUser.size,
      flagsCreated: totalFlagsCreated,
      flaggedUsers: flaggedUsers.length,
    });
  } catch (error) {
    console.error('Sharing analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
