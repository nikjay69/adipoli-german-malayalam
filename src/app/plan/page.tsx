'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, Save, ArrowLeft, Shield } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuthStore } from '@/lib/auth-store';

export default function PlanPage() {
  const { user, isLoggedIn } = useAuthStore();
  const [planContent, setPlanContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPlan = async () => {
      try {
        const res = await fetch('/api/admin/plan');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not load plan');
        setPlanContent(data.content || '');
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'Could not load plan');
      } finally {
        setLoading(false);
      }
    };

    loadPlan();
  }, []);

  const canEdit = isLoggedIn && !!user?.isAdmin;

  const savePlan = async () => {
    setMessage('');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: planContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save plan');
      setMessage('Plan saved successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save plan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList className="w-5 h-5 text-[#d4a520]" />
              <h1 className="text-2xl font-bold gradient-text">Course Plan</h1>
            </div>
            <p className="text-sm text-[var(--foreground)]/50">
              Read the project roadmap here. Admins can edit it directly.
            </p>
          </div>
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        <Card>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="text-xs text-[var(--foreground)]/40">docs/COURSE_PLAN_10_10.md</div>
            {canEdit ? (
              <div className="flex items-center gap-2 text-xs text-[#d4a520]">
                <Shield className="w-3.5 h-3.5" />
                Admin editing enabled
              </div>
            ) : (
              <div className="text-xs text-[var(--foreground)]/35">Read-only mode</div>
            )}
          </div>

          {message && (
            <div className="mb-4 rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-3 py-2 text-xs text-[var(--foreground)]/60">
              {message}
            </div>
          )}

          {loading ? (
            <div className="py-10 text-sm text-[var(--foreground)]/40">Loading plan...</div>
          ) : canEdit ? (
            <>
              <textarea
                value={planContent}
                onChange={(e) => setPlanContent(e.target.value)}
                className="min-h-[60vh] w-full rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4 font-mono text-xs leading-6 text-[var(--foreground)]/85 outline-none focus:border-[#d4a520]/40"
                spellCheck={false}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={savePlan}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d4a520]/20 bg-[#d4a520]/10 px-4 py-2 text-sm font-bold text-[#d4a520] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Plan'}
                </button>
              </div>
            </>
          ) : (
            <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-[var(--foreground)]/80 font-mono overflow-auto max-h-[70vh] rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4">
              {planContent}
            </pre>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
