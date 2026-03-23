'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  BookOpen,
  Gamepad2,
  FileText,
  Mic,
  Home,
  Crown,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Layers,
  GraduationCap,
  MessageSquare,
  CreditCard,
  Info,
  ClipboardList,
  AlertTriangle,
  Eye,
  X,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { useAuthStore, isSupabaseReady } from '@/lib/auth-store';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { createClient } from '@/lib/supabase';

// Unified user shape for admin display
interface AdminUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

interface PaymentRecord {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  plan: string;
  provider: string;
  status: string;
  created_at: string;
}

interface SharingFlagRecord {
  id: string;
  user_id: string;
  flag_type: string;
  severity: 'low' | 'medium' | 'high';
  details: Record<string, unknown>;
  reviewed: boolean;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

// localStorage fallback types
interface StoredUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  password: string;
  isAdmin: boolean;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

function getLocalStorageUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('german-app-users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'plan'>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [supabaseActive, setSupabaseActive] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [planContent, setPlanContent] = useState('');
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [savingPlan, setSavingPlan] = useState(false);
  const [planMessage, setPlanMessage] = useState('');
  const [sharingFlags, setSharingFlags] = useState<SharingFlagRecord[]>([]);
  const [loadingFlags, setLoadingFlags] = useState(true);
  const [analyzingSharing, setAnalyzingSharing] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [selectedFlag, setSelectedFlag] = useState<SharingFlagRecord | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/plan');
      if (res.ok) {
        const data = await res.json();
        setPlanContent(data.content || '');
      }
    } catch {
      // ignore plan loading errors here; UI will show fallback state
    } finally {
      setLoadingPlan(false);
    }

    if (isSupabaseReady()) {
      setSupabaseActive(true);
      try {
        const supabase = createClient();

        // Fetch profiles
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (profiles) {
          setUsers(
            profiles.map((p: { id: string; full_name?: string; username?: string; plan?: string; created_at?: string }) => ({
              id: p.id,
              name: p.full_name || 'Unknown',
              username: p.username,
              email: '', // email lives in auth.users, not accessible from client
              plan: (p.plan || 'free') as 'free' | 'pro' | 'premium',
              createdAt: p.created_at ? new Date(p.created_at).getTime() : Date.now(),
            }))
          );
        }

        // Fetch payments
        const { data: paymentData } = await supabase
          .from('payments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (paymentData) {
          setPayments(paymentData as PaymentRecord[]);
        }

        // Fetch sharing flags (unreviewed)
        const { data: flagData } = await supabase
          .from('sharing_flags')
          .select('*')
          .eq('reviewed', false)
          .order('created_at', { ascending: false })
          .limit(100);

        if (flagData) {
          setSharingFlags(flagData as SharingFlagRecord[]);
        }
        setLoadingFlags(false);
      } catch {
        // Fall back to localStorage on error
        const local = getLocalStorageUsers();
        setUsers(
          local.map((u) => ({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            plan: u.plan,
            createdAt: u.createdAt,
          }))
        );
        setLoadingFlags(false);
      }
    } else {
      // localStorage fallback
      const local = getLocalStorageUsers();
      setUsers(
        local.map((u) => ({
          id: u.id,
          name: u.name,
          username: u.username,
          email: u.email,
          plan: u.plan,
          createdAt: u.createdAt,
        }))
      );
      setLoadingFlags(false);
    }
    setLoadingUsers(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (mounted && (!isLoggedIn || !user?.isAdmin)) {
      router.push('/');
    }
  }, [mounted, isLoggedIn, user, router]);

  // Content stats
  const contentStats = useMemo(() => {
    const totalModules = ALL_MODULES.length;
    const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
    const totalExercises = ALL_MODULES.reduce(
      (acc, m) => acc + m.lessons.reduce((la, l) => la + l.exercises.length, 0),
      0
    );
    const totalVocab = getAllVocabulary().length;
    const totalVideos = ALL_MODULES.reduce(
      (acc, m) => acc + m.lessons.reduce((la, l) => la + l.videos.length, 0),
      0
    );
    return { totalModules, totalLessons, totalExercises, totalVocab, totalVideos };
  }, []);

  // Filter & sort users
  const filteredUsers = useMemo(() => {
    let list = [...users];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.username && u.username.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'plan') {
        const order = { free: 0, pro: 1, premium: 2 };
        cmp = order[a.plan] - order[b.plan];
      } else cmp = a.createdAt - b.createdAt;
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [users, searchQuery, sortBy, sortAsc]);

  const planCounts = useMemo(() => {
    const counts = { free: 0, pro: 0, premium: 0 };
    users.forEach((u) => counts[u.plan]++);
    return counts;
  }, [users]);

  const savePlan = async () => {
    setPlanMessage('');
    setSavingPlan(true);
    try {
      const res = await fetch('/api/admin/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: planContent }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not save the plan');
      }

      setPlanMessage('Plan saved successfully.');
    } catch (error) {
      setPlanMessage(error instanceof Error ? error.message : 'Could not save the plan');
    } finally {
      setSavingPlan(false);
    }
  };

  const runSharingAnalysis = async () => {
    setAnalyzingSharing(true);
    setAnalysisMessage('');
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setAnalysisMessage('No active session. Please re-login.');
        return;
      }

      const res = await fetch('/api/analyze-sharing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysisMessage(
        `Analysis complete: ${data.usersAnalyzed} users analyzed, ${data.flagsCreated} new flags created.`
      );

      // Refresh flags
      const { data: flagData } = await supabase
        .from('sharing_flags')
        .select('*')
        .eq('reviewed', false)
        .order('created_at', { ascending: false })
        .limit(100);

      if (flagData) {
        setSharingFlags(flagData as SharingFlagRecord[]);
      }
    } catch (error) {
      setAnalysisMessage(error instanceof Error ? error.message : 'Analysis failed');
    } finally {
      setAnalyzingSharing(false);
    }
  };

  const reviewFlag = async (flagId: string, action: 'dismiss' | 'warn') => {
    try {
      const supabase = createClient();
      await supabase
        .from('sharing_flags')
        .update({
          reviewed: true,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          details: action === 'warn'
            ? { ...(sharingFlags.find((f) => f.id === flagId)?.details || {}), action: 'warned' }
            : { ...(sharingFlags.find((f) => f.id === flagId)?.details || {}), action: 'dismissed' },
        })
        .eq('id', flagId);

      setSharingFlags((prev) => prev.filter((f) => f.id !== flagId));
      setSelectedFlag(null);
    } catch {
      // Silently fail — flag stays in the list
    }
  };

  const getFlagLabel = (flagType: string): string => {
    const labels: Record<string, string> = {
      multiple_devices: 'Multiple Devices',
      multiple_timezones: 'Multiple Timezones',
      concurrent_sessions: 'Concurrent Sessions',
      multiple_platforms: 'Multiple Platforms',
    };
    return labels[flagType] || flagType;
  };

  const severityColors: Record<string, string> = {
    low: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    medium: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const getUserName = (userId: string): string => {
    const found = users.find((u) => u.id === userId);
    return found?.name || found?.username || userId.slice(0, 8) + '...';
  };

  if (!mounted || !isLoggedIn || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4a520] to-[#c0392b] rounded-2xl" />
        </div>
      </div>
    );
  }

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateStr = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const planBadgeColors: Record<string, string> = {
    free: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    pro: 'bg-[#d4a520]/20 text-[#d4a520] border-[#d4a520]/30',
    premium: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };

  const statusColors: Record<string, string> = {
    completed: 'bg-[#27ae60]/20 text-[#27ae60] border-[#27ae60]/30',
    pending: 'bg-[#d4a520]/20 text-[#d4a520] border-[#d4a520]/30',
    failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    refunded: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };

  const quickLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/games', label: 'Games', icon: Gamepad2 },
    { href: '/practice', label: 'Practice', icon: Mic },
    { href: '/tests', label: 'Tests', icon: FileText },
    { href: '/pricing', label: 'Pricing', icon: Crown },
    { href: '/profile', label: 'Profile', icon: Users },
  ];

  const toggleSort = (field: 'name' | 'date' | 'plan') => {
    if (sortBy === field) setSortAsc(!sortAsc);
    else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ field }: { field: 'name' | 'date' | 'plan' }) => {
    if (sortBy !== field) return null;
    return sortAsc ? (
      <ChevronUp className="w-3 h-3 inline ml-0.5" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-0.5" />
    );
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c0392b] to-[#962d22] flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-xs text-[var(--foreground)]/40">
              Logged in as {user.name}
            </p>
          </div>
        </div>

        {/* Data source badge */}
        <div className="flex items-center gap-2 mt-3">
          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${
            supabaseActive
              ? 'bg-[#27ae60]/10 text-[#27ae60] border-[#27ae60]/20'
              : 'bg-[#d4a520]/10 text-[#d4a520] border-[#d4a520]/20'
          }`}>
            <Info className="w-3 h-3" />
            {supabaseActive ? 'Supabase connected' : 'Local storage (demo mode)'}
          </span>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="game-card p-4 text-center">
            <Users className="w-6 h-6 text-[#d4a520] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--foreground)]">
              {loadingUsers ? '-' : users.length}
            </div>
            <div className="text-xs text-[var(--foreground)]/40">Total Users</div>
          </div>
          <div className="game-card p-4 text-center">
            <Crown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--foreground)]">
              {loadingUsers ? '-' : planCounts.pro + planCounts.premium}
            </div>
            <div className="text-xs text-[var(--foreground)]/40">Paid Users</div>
          </div>
          <div className="game-card p-4 text-center">
            <div className="text-xs text-[var(--foreground)]/40 mb-2 flex justify-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-gray-500/20 text-gray-300">Free: {planCounts.free}</span>
            </div>
            <div className="text-xs text-[var(--foreground)]/40 flex justify-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#d4a520]/20 text-[#d4a520]">Pro: {planCounts.pro}</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Prem: {planCounts.premium}</span>
            </div>
            <div className="text-xs text-[var(--foreground)]/40 mt-2">Plan Split</div>
          </div>
          <div className="game-card p-4 text-center">
            <Calendar className="w-6 h-6 text-[#27ae60] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--foreground)]">
              {loadingUsers ? '-' : users.filter((u) => Date.now() - u.createdAt < 7 * 24 * 60 * 60 * 1000).length}
            </div>
            <div className="text-xs text-[var(--foreground)]/40">New (7 days)</div>
          </div>
        </div>
      </motion.div>

      {/* Content Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" /> Content Stats
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          <div className="game-card p-3 text-center">
            <BookOpen className="w-5 h-5 text-[#27ae60] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--foreground)]">{contentStats.totalModules}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Modules</div>
          </div>
          <div className="game-card p-3 text-center">
            <GraduationCap className="w-5 h-5 text-[#d4a520] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--foreground)]">{contentStats.totalLessons}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Lessons</div>
          </div>
          <div className="game-card p-3 text-center">
            <FileText className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--foreground)]">{contentStats.totalExercises}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Exercises</div>
          </div>
          <div className="game-card p-3 text-center">
            <MessageSquare className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--foreground)]">{contentStats.totalVocab}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Vocabulary</div>
          </div>
          <div className="game-card p-3 text-center">
            <Gamepad2 className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--foreground)]">{contentStats.totalVideos}</div>
            <div className="text-[10px] text-[var(--foreground)]/40">Videos</div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4" /> Registered Users
          </h2>
          <span className="text-xs text-[var(--foreground)]/30">{filteredUsers.length} users</span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground)]/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, username, or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 transition-all"
          />
        </div>

        {/* Table */}
        <div className="game-card overflow-hidden">
          {loadingUsers ? (
            <div className="p-8 text-center text-[var(--foreground)]/30 text-sm">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-[var(--foreground)]/30 text-sm">
              {users.length === 0 ? 'No users registered yet' : 'No users match your search'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--foreground)]/10">
                    <th
                      onClick={() => toggleSort('name')}
                      className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)]/70 transition-colors"
                    >
                      Name <SortIcon field="name" />
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                      {supabaseActive ? 'Username' : 'Email'}
                    </th>
                    <th
                      onClick={() => toggleSort('plan')}
                      className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)]/70 transition-colors"
                    >
                      Plan <SortIcon field="plan" />
                    </th>
                    <th
                      onClick={() => toggleSort('date')}
                      className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)]/70 transition-colors"
                    >
                      Joined <SortIcon field="date" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[var(--foreground)]/5 hover:bg-[var(--foreground)]/3 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#d4a520]/20 flex items-center justify-center text-xs font-bold text-[#d4a520]">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-[var(--foreground)]">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--foreground)]/50">
                        {supabaseActive ? (u.username || '-') : u.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${planBadgeColors[u.plan] || planBadgeColors.free}`}
                        >
                          {u.plan.charAt(0).toUpperCase() + u.plan.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--foreground)]/40 text-xs">
                        {formatDate(u.createdAt)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Account Sharing Flags (Supabase only) */}
      {supabaseActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.33 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Account Sharing Flags
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--foreground)]/30">
                {sharingFlags.length} unreviewed
              </span>
              <button
                onClick={runSharingAnalysis}
                disabled={analyzingSharing}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#c0392b]/20 bg-[#c0392b]/10 px-3 py-1.5 text-xs font-bold text-[#c0392b] disabled:opacity-50 transition-all hover:bg-[#c0392b]/20"
              >
                <RefreshCw className={`w-3 h-3 ${analyzingSharing ? 'animate-spin' : ''}`} />
                {analyzingSharing ? 'Analyzing...' : 'Analyze Sessions'}
              </button>
            </div>
          </div>

          {analysisMessage && (
            <div className="mb-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-3 py-2 text-xs text-[var(--foreground)]/60">
              {analysisMessage}
            </div>
          )}

          <div className="game-card overflow-hidden">
            {loadingFlags ? (
              <div className="p-8 text-center text-[var(--foreground)]/30 text-sm">
                Loading flags...
              </div>
            ) : sharingFlags.length === 0 ? (
              <div className="p-8 text-center text-[var(--foreground)]/30 text-sm">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-[#27ae60]/40" />
                No unreviewed sharing flags. Run &quot;Analyze Sessions&quot; to check.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--foreground)]/10">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                        Flag Type
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sharingFlags.map((flag, i) => (
                      <motion.tr
                        key={flag.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-[var(--foreground)]/5 hover:bg-[var(--foreground)]/3 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#c0392b]/20 flex items-center justify-center text-xs font-bold text-[#c0392b]">
                              {getUserName(flag.user_id).charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-[var(--foreground)] text-xs">
                              {getUserName(flag.user_id)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground)]/70 text-xs">
                          {getFlagLabel(flag.flag_type)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${severityColors[flag.severity] || severityColors.low}`}
                          >
                            {flag.severity.charAt(0).toUpperCase() + flag.severity.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground)]/40 text-xs">
                          {formatDateStr(flag.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedFlag(flag)}
                              className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                              title="View details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => reviewFlag(flag.id, 'dismiss')}
                              className="p-1.5 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 transition-colors"
                              title="Dismiss"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => reviewFlag(flag.id, 'warn')}
                              className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"
                              title="Warn user"
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Sharing Flag Detail Modal */}
      {selectedFlag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="game-card w-full max-w-lg p-6 relative"
          >
            <button
              onClick={() => setSelectedFlag(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 transition-colors"
            >
              <X className="w-4 h-4 text-[var(--foreground)]/50" />
            </button>

            <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
              Flag Details
            </h3>
            <p className="text-xs text-[var(--foreground)]/40 mb-4">
              {getFlagLabel(selectedFlag.flag_type)} &middot;{' '}
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${severityColors[selectedFlag.severity]}`}>
                {selectedFlag.severity}
              </span>
            </p>

            <div className="space-y-3 mb-6">
              <div>
                <div className="text-xs font-semibold text-[var(--foreground)]/50 uppercase mb-1">User</div>
                <div className="text-sm text-[var(--foreground)]">{getUserName(selectedFlag.user_id)}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--foreground)]/50 uppercase mb-1">Flagged</div>
                <div className="text-sm text-[var(--foreground)]/70">{formatDateStr(selectedFlag.created_at)}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--foreground)]/50 uppercase mb-1">Details</div>
                <pre className="text-xs text-[var(--foreground)]/70 bg-[var(--foreground)]/5 rounded-xl p-3 overflow-auto max-h-48">
                  {JSON.stringify(selectedFlag.details, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => reviewFlag(selectedFlag.id, 'dismiss')}
                className="flex-1 rounded-xl border border-gray-500/20 bg-gray-500/10 px-4 py-2.5 text-xs font-bold text-gray-300 hover:bg-gray-500/20 transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={() => reviewFlag(selectedFlag.id, 'warn')}
                className="flex-1 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2.5 text-xs font-bold text-orange-400 hover:bg-orange-500/20 transition-colors"
              >
                Warn User
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Payments Table (Supabase only) */}
      {supabaseActive && payments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Recent Payments
            </h2>
            <span className="text-xs text-[var(--foreground)]/30">{payments.length} records</span>
          </div>

          <div className="game-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--foreground)]/10">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[var(--foreground)]/5 hover:bg-[var(--foreground)]/3 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">
                        {p.currency === 'INR' ? '\u20B9' : '\u20AC'}{p.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${planBadgeColors[p.plan] || planBadgeColors.free}`}>
                          {p.plan.charAt(0).toUpperCase() + p.plan.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--foreground)]/50 capitalize">
                        {p.provider}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[p.status] || statusColors.pending}`}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--foreground)]/40 text-xs">
                        {formatDateStr(p.created_at)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Course Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> Course Plan
          </h2>
          <span className="text-xs text-[var(--foreground)]/30">docs/COURSE_PLAN_10_10.md</span>
        </div>

        <div className="game-card overflow-hidden">
          {loadingPlan ? (
            <div className="p-6 text-sm text-[var(--foreground)]/40">Loading plan...</div>
          ) : !planContent ? (
            <div className="p-6 text-sm text-[var(--foreground)]/40">Could not load the plan file.</div>
          ) : (
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs text-[var(--foreground)]/40">
                  Edit the markdown directly here and save when ready.
                </p>
                <button
                  onClick={savePlan}
                  disabled={savingPlan}
                  className="rounded-xl border border-[#d4a520]/20 bg-[#d4a520]/10 px-3 py-2 text-xs font-bold text-[#d4a520] disabled:opacity-50"
                >
                  {savingPlan ? 'Saving...' : 'Save Plan'}
                </button>
              </div>

              {planMessage && (
                <div className="mb-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-3 py-2 text-xs text-[var(--foreground)]/60">
                  {planMessage}
                </div>
              )}

              <textarea
                value={planContent}
                onChange={(e) => setPlanContent(e.target.value)}
                className="min-h-[32rem] w-full rounded-xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4 font-mono text-xs leading-6 text-[var(--foreground)]/85 outline-none focus:border-[#d4a520]/40"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-wider mb-3">
          Quick Links
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="game-card p-3 text-center hover:border-[#d4a520]/30 transition-colors group"
              >
                <Icon className="w-5 h-5 mx-auto mb-1 text-[var(--foreground)]/40 group-hover:text-[#d4a520] transition-colors" />
                <span className="text-xs text-[var(--foreground)]/50 group-hover:text-[var(--foreground)]/80 transition-colors">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
