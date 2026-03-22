'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { initAuth } = useAuthStore();

  useEffect(() => {
    // After OAuth redirect, re-initialize auth to pick up the session
    initAuth().then(() => {
      router.push('/');
    });
  }, [initAuth, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[var(--foreground)]/50">Signing you in...</p>
      </div>
    </div>
  );
}
