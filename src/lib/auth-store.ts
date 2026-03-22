import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FEATURE_FLAGS, getAuthStatusMessage } from './app-config';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // demo-only, never for production use
  isAdmin: boolean;
  plan: 'free' | 'pro' | 'premium';
  createdAt: number;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  upgradePlan: (plan: 'pro' | 'premium') => void;
}

const USERS_STORAGE_KEY = 'german-app-demo-users';

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined' || !FEATURE_FLAGS.demoAuthEnabled) return [];
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined' || !FEATURE_FLAGS.demoAuthEnabled) return;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        if (!FEATURE_FLAGS.canCreateAccounts) {
          return { success: false, error: getAuthStatusMessage() };
        }

        if (!FEATURE_FLAGS.demoAuthEnabled) {
          return { success: false, error: 'Real auth is not configured yet.' };
        }

        const users = getStoredUsers();
        const found = users.find((u) => u.email === email);

        if (!found) {
          return { success: false, error: 'No demo account found with this email' };
        }

        if (!verifyPassword(password, found.password)) {
          return { success: false, error: 'Incorrect password' };
        }

        const user: User = {
          id: found.id,
          name: found.name,
          email: found.email,
          isAdmin: false,
          plan: found.plan,
          createdAt: found.createdAt,
        };

        set({ user, isLoggedIn: true });
        return { success: true };
      },

      signup: async (name: string, email: string, password: string) => {
        if (!FEATURE_FLAGS.canCreateAccounts) {
          return { success: false, error: getAuthStatusMessage() };
        }

        if (!FEATURE_FLAGS.demoAuthEnabled) {
          return { success: false, error: 'Real auth is not configured yet.' };
        }

        const users = getStoredUsers();
        if (users.find((u) => u.email === email)) {
          return { success: false, error: 'An account with this email already exists' };
        }

        const newUser: StoredUser = {
          id: generateId(),
          name,
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
          email: newUser.email,
          isAdmin: false,
          plan: newUser.plan,
          createdAt: newUser.createdAt,
        };

        set({ user, isLoggedIn: true });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      upgradePlan: (plan: 'pro' | 'premium') => {
        set((state) => {
          if (!state.user) return state;

          if (!FEATURE_FLAGS.demoAuthEnabled) {
            return state;
          }

          const users = getStoredUsers();
          const idx = users.findIndex((u) => u.id === state.user!.id);
          if (idx !== -1) {
            users[idx].plan = plan;
            saveStoredUsers(users);
          }

          return {
            user: { ...state.user, plan },
          };
        });
      },
    }),
    {
      name: 'german-app-auth',
    }
  )
);
