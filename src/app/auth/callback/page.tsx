'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/auth-store';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Nivin } from '@/components/character/Nivin';

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
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        {error ? (
          <>
            <div className="flex justify-center mb-4">
              <Nivin mood="sad" size="md" />
            </div>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Aiyyo, that didn&apos;t work</h2>
            <p className="text-sm text-[#c0392b] mb-2">{error}</p>
            <p className="text-xs text-[var(--foreground)]/40">Sending you back to login...</p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <Nivin mood="thinking" size="md" />
            </div>
            <h2 className="text-lg font-bold gradient-text mb-1">Signing you in...</h2>
            <p className="text-sm text-[var(--foreground)]/60 mb-4">One sec, machaa.</p>
            <div className="w-10 h-10 border-[3px] border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin mx-auto" />
          </>
        )}
      </motion.div>
    </div>
  );
}

function CallbackFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="flex justify-center mb-4">
          <Nivin mood="thinking" size="md" />
        </div>
        <h2 className="text-lg font-bold gradient-text mb-1">Signing you in...</h2>
        <p className="text-sm text-[var(--foreground)]/60 mb-4">One sec, machaa.</p>
        <div className="w-10 h-10 border-[3px] border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackHandler />
    </Suspense>
  );
}
