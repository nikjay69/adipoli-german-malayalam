import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  isAdmin: boolean;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

interface StoredUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  password: string; // btoa encoded (localStorage fallback only)
  isAdmin: boolean;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, username?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  upgradePlan: (plan: 'pro' | 'premium') => void;
  initAuth: () => Promise<void>;
}

const USERS_STORAGE_KEY = 'german-app-users';

// Export for UI components to show demo mode badge
export function isSupabaseReady(): boolean {
  return isSupabaseConfigured();
}

// ─── localStorage Fallback Helpers ─────────────────────────────────────────

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function encodePassword(password: string): string {
  return btoa(password);
}

function verifyPassword(password: string, encoded: string): boolean {
  return btoa(password) === encoded;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// Admin credentials (hardcoded for localStorage fallback)
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'Admin123';

// Track whether onAuthStateChange has been set up
let authListenerActive = false;

// Helper: build a User object from a Supabase session + profile
function buildUser(sessionUser: { id: string; email?: string; created_at: string; user_metadata?: Record<string, string> }, profile: Record<string, unknown> | null): User {
  return {
    id: sessionUser.id,
    name: (profile?.full_name as string) || sessionUser.user_metadata?.full_name || 'User',
    username: (profile?.username as string) || sessionUser.user_metadata?.username,
    email: sessionUser.email || '',
    isAdmin: !!(profile?.is_admin) || (profile?.username === 'admin'),
    plan: ((profile?.plan as string) || 'free') as 'free' | 'pro' | 'premium',
    createdAt: new Date(sessionUser.created_at).getTime(),
  };
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: true,

      // ── Initialize auth (call on app mount) ────────────────────────────
      initAuth: async () => {
        if (!isSupabaseConfigured()) {
          // In demo mode, keep the persisted user from localStorage (zustand persist).
          // Just clear the loading flag.
          set({ isLoading: false });
          return;
        }

        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const user = buildUser(session.user, profile);
            set({ user, isLoggedIn: true, isLoading: false });
          } else {
            // No active session — clear any stale persisted state
            set({ user: null, isLoggedIn: false, isLoading: false });
          }

          // Set up the auth state change listener (only once)
          if (!authListenerActive) {
            authListenerActive = true;

            supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
              if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
                // Avoid re-fetching if the user hasn't changed
                const currentUser = get().user;
                if (currentUser?.id === session.user.id && event === 'TOKEN_REFRESHED') {
                  return;
                }

                const { data: profile } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

                const user = buildUser(session.user, profile);
                set({ user, isLoggedIn: true, isLoading: false });
              } else if (event === 'SIGNED_OUT') {
                set({ user: null, isLoggedIn: false, isLoading: false });
              }
            });
          }
        } catch {
          set({ isLoading: false });
        }
      },

      // ── Login ──────────────────────────────────────────────────────────
      login: async (emailOrUsername: string, password: string) => {
        if (!isSupabaseConfigured()) {
          // localStorage fallback
          if (emailOrUsername === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser: User = {
              id: 'admin-001',
              name: 'Admin',
              username: 'admin',
              email: ADMIN_EMAIL,
              isAdmin: true,
              plan: 'premium',
              createdAt: Date.now(),
            };
            set({ user: adminUser, isLoggedIn: true });
            return { success: true };
          }

          const users = getStoredUsers();
          const found = users.find(
            (u) => u.email === emailOrUsername || u.username === emailOrUsername
          );

          if (!found) {
            return { success: false, error: 'No account found with this email or username' };
          }

          if (!verifyPassword(password, found.password)) {
            return { success: false, error: 'Incorrect password' };
          }

          const user: User = {
            id: found.id,
            name: found.name,
            username: found.username,
            email: found.email,
            isAdmin: found.isAdmin || found.username === 'admin',
            plan: found.plan,
            createdAt: found.createdAt,
          };

          set({ user, isLoggedIn: true });
          return { success: true };
        }

        // Supabase auth
        try {
          const supabase = createClient();
          let email = emailOrUsername.trim();

          // Resolve username -> email through a safe DB function
          if (!email.includes('@')) {
            const { data: resolvedEmail, error: resolveError } = await supabase.rpc('get_login_email', {
              lookup_username: email,
            });

            if (resolveError) {
              console.error('Username resolve error:', resolveError);
              return { success: false, error: 'Could not resolve username. Please try your email instead.' };
            }

            if (!resolvedEmail) {
              return { success: false, error: 'No account found with this username' };
            }

            email = resolvedEmail;
          }

          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            // Map common Supabase error messages to user-friendly ones
            if (error.message.includes('Invalid login credentials')) {
              return { success: false, error: 'Incorrect email or password' };
            }
            if (error.message.includes('Email not confirmed')) {
              return { success: false, error: 'Please check your email and confirm your account first' };
            }
            return { success: false, error: error.message };
          }

          // Auth state change listener will update the store
          // But also fetch immediately for faster UX
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const user = buildUser(session.user, profile);
            set({ user, isLoggedIn: true });
          }

          return { success: true };
        } catch {
          return { success: false, error: 'Login failed. Please try again.' };
        }
      },

      // ── Signup ─────────────────────────────────────────────────────────
      signup: async (name: string, email: string, password: string, username?: string) => {
        if (!isSupabaseConfigured()) {
          // localStorage fallback
          const users = getStoredUsers();

          if (users.find((u) => u.email === email)) {
            return { success: false, error: 'An account with this email already exists' };
          }

          if (username && users.find((u) => u.username === username)) {
            return { success: false, error: 'This username is already taken' };
          }

          if (email === ADMIN_EMAIL || username === 'admin') {
            return { success: false, error: 'This name is reserved' };
          }

          const newUser: StoredUser = {
            id: generateId(),
            name,
            username,
            email,
            password: encodePassword(password),
            isAdmin: false,
            plan: 'free',
            createdAt: Date.now(),
          };

          users.push(newUser);
          saveStoredUsers(users);

          const user: User = {
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            isAdmin: false,
            plan: 'free',
            createdAt: newUser.createdAt,
          };

          set({ user, isLoggedIn: true });
          return { success: true };
        }

        // Supabase signup
        try {
          const supabase = createClient();

          // Check if username is already taken
          if (username) {
            const { data: existing } = await supabase
              .from('profiles')
              .select('id')
              .eq('username', username)
              .maybeSingle();

            if (existing) {
              return { success: false, error: 'This username is already taken' };
            }
          }

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
                username: username,
              },
            },
          });

          if (error) {
            if (error.message.includes('already registered')) {
              return { success: false, error: 'An account with this email already exists' };
            }
            return { success: false, error: error.message };
          }

          // If email confirmation is required, Supabase returns a user but no session
          if (data.user && !data.session) {
            return { success: true };
          }

          // If auto-confirm is on, we get a session immediately
          if (data.session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.session.user.id)
              .single();

            const user = buildUser(data.session.user, profile);
            set({ user, isLoggedIn: true });
          }

          return { success: true };
        } catch {
          return { success: false, error: 'Signup failed. Please try again.' };
        }
      },

      // ── Google OAuth ───────────────────────────────────────────────────
      loginWithGoogle: async () => {
        if (!isSupabaseConfigured()) {
          return { success: false, error: 'Google login requires Supabase configuration' };
        }

        try {
          const supabase = createClient();
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) {
            return { success: false, error: error.message };
          }

          return { success: true };
        } catch {
          return { success: false, error: 'Google login failed. Please try again.' };
        }
      },

      // ── Logout ─────────────────────────────────────────────────────────
      logout: () => {
        if (isSupabaseConfigured()) {
          try {
            const supabase = createClient();
            // Fire and forget — the onAuthStateChange listener handles state
            supabase.auth.signOut();
          } catch {
            // Fall through to local cleanup
          }
        }

        set({ user: null, isLoggedIn: false });
      },

      // ── Upgrade Plan ───────────────────────────────────────────────────
      upgradePlan: (plan: 'pro' | 'premium') => {
        set((state) => {
          if (!state.user) return state;

          if (!isSupabaseConfigured()) {
            // Update in localStorage
            const users = getStoredUsers();
            const idx = users.findIndex((u) => u.id === state.user!.id);
            if (idx !== -1) {
              users[idx].plan = plan;
              saveStoredUsers(users);
            }
          } else {
            // Update in Supabase (fire and forget)
            const supabase = createClient();
            supabase
              .from('profiles')
              .update({ plan, updated_at: new Date().toISOString() })
              .eq('id', state.user!.id)
              .then();
          }

          return {
            user: { ...state.user, plan },
          };
        });
      },
    }),
    {
      name: 'german-app-auth',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
