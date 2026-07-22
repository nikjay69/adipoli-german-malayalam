'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, Save, ArrowLeft, Shield, CheckCircle2, Sparkles } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { Nivin } from '@/components/character/Nivin';
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
      setMessage('✨ Plan saved — looking good, machaa!');
      setTimeout(() => setMessage(''), 2800);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save plan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-28 safe-top safe-bottom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-[#d4a520]/15 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-[#d4a520]" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Course Plan</h1>
            </div>
            <p className="text-sm text-[var(--foreground)]/50">
              Your full German A1 roadmap. Every module, every milestone.
            </p>
          </div>
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Nivin greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-4 game-card p-3"
        >
          <Nivin mood="happy" size="sm" />
          <div className="flex-1">
            <p className="text-sm text-[var(--foreground)]/80 leading-snug">
              {canEdit
                ? 'Here\'s the master plan, boss. Edit anything — I\'ll remember.'
                : 'Here\'s the whole journey ahead. Take a peek, then let\'s get back to learning!'}
            </p>
          </div>
          <Sparkles className="w-4 h-4 text-[#d4a520] flex-shrink-0" />
        </motion.div>

        <Card>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="text-xs text-[var(--foreground)]/40 font-mono">docs/COURSE_PLAN_10_10.md</div>
            {canEdit ? (
              <div className="flex items-center gap-2 text-xs text-[#d4a520] font-semibold">
                <Shield className="w-3.5 h-3.5" />
                Admin editing enabled
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[var(--foreground)]/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27ae60]" />
                Read-only mode
              </div>
            )}
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 rounded-xl border border-[#d4a520]/30 bg-[#d4a520]/10 px-3 py-2.5 text-sm font-semibold text-[#d4a520]"
            >
              {message}
            </motion.div>
          )}

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-[#d4a520] border-t-transparent rounded-full"
              />
              <div className="text-xs text-[var(--foreground)]/40">Loading your plan...</div>
            </div>
          ) : canEdit ? (
            <>
              <textarea
                value={planContent}
                onChange={(e) => setPlanContent(e.target.value)}
                className="min-h-[60vh] w-full rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4 font-mono text-xs leading-6 text-[var(--foreground)]/85 outline-none focus:border-[#d4a520]/40 focus:ring-2 focus:ring-[#d4a520]/20 transition-all"
                spellCheck={false}
              />
              <div className="mt-4 flex justify-end">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={savePlan}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d4a520]/30 bg-gradient-to-r from-[#d4a520]/20 to-[#d4a520]/10 px-5 py-2.5 text-sm font-bold text-[#d4a520] hover:border-[#d4a520] hover:shadow-lg hover:shadow-[#d4a520]/20 disabled:opacity-50 transition-all"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Plan'}
                </motion.button>
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
