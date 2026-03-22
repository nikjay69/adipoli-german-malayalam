'use client';

import { useState, useEffect, useMemo } from 'react';
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
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { FEATURE_FLAGS } from '@/lib/app-config';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined' || !FEATURE_FLAGS.demoAuthEnabled) return [];
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
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    setMounted(true);
    setUsers(getStoredUsers());
  }, []);

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
          u.email.toLowerCase().includes(q)
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

  if (!FEATURE_FLAGS.demoAuthEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6 text-center">
          <h1 className="mb-2 text-xl font-bold">Admin disabled</h1>
          <p className="text-sm text-[var(--foreground)]/70">
            The public app does not ship with a client-side admin panel. Enable demo auth only for local testing, or wire real server-side admin access first.
          </p>
        </div>
      </div>
    );
  }

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

  const planBadgeColors = {
    free: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    pro: 'bg-[#d4a520]/20 text-[#d4a520] border-[#d4a520]/30',
    premium: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
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
            <div className="text-2xl font-bold text-[var(--foreground)]">{users.length}</div>
            <div className="text-xs text-[var(--foreground)]/40">Total Users</div>
          </div>
          <div className="game-card p-4 text-center">
            <Crown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--foreground)]">{planCounts.pro + planCounts.premium}</div>
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
              {users.filter((u) => Date.now() - u.createdAt < 7 * 24 * 60 * 60 * 1000).length}
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
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 transition-all"
          />
        </div>

        {/* Table */}
        <div className="game-card overflow-hidden">
          {filteredUsers.length === 0 ? (
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
                      Email
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
                      <td className="px-4 py-3 text-[var(--foreground)]/50">{u.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${planBadgeColors[u.plan]}`}
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

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
