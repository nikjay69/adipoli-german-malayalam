'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { isSupabaseConfigured } from '@/lib/supabase';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initAuth } = useAuthStore();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      if (!isSupabaseConfigured()) {
        router.push('/');
        return;
      }

      try {
        // Dynamically import to avoid issues when Supabase isn't configured
        const { createClient } = await import('@/lib/supabase');
        const supabase = createClient();

        // Check for error in URL params (OAuth can redirect with error)
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        if (errorParam) {
          setError(errorDescription || errorParam);
          setTimeout(() => router.push('/auth/login'), 3000);
          return;
        }

        // For PKCE flow: exchange the code for a session
        const code = searchParams.get('code');
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error('Code exchange error:', exchangeError);
            setError('Failed to complete sign in. Please try again.');
            setTimeout(() => router.push('/auth/login'), 3000);
            return;
          }
        }

        // For implicit flow: the hash fragment is handled automatically
        // by @supabase/ssr's createBrowserClient.

        // Re-initialize auth state to pick up the new session
        await initAuth();
        router.push('/');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Something went wrong during sign in.');
        setTimeout(() => router.push('/auth/login'), 3000);
      }
    };

    handleCallback();
  }, [initAuth, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-sm text-red-400 mb-2">{error}</p>
            <p className="text-xs text-[var(--foreground)]/30">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 border-3 border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[var(--foreground)]/50">Signing you in...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[var(--foreground)]/50">Signing you in...</p>
          </div>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
