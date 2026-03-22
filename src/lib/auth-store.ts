import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  password: string; // btoa encoded (MVP only)
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

const USERS_STORAGE_KEY = 'german-app-users';

// Admin credentials (hardcoded for MVP)
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'Admin123';

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
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        // Check admin credentials
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const adminUser: User = {
            id: 'admin-001',
            name: 'Admin',
            email: ADMIN_EMAIL,
            isAdmin: true,
            plan: 'premium',
            createdAt: Date.now(),
          };
          set({ user: adminUser, isLoggedIn: true });
          return { success: true };
        }

        // Check stored users
        const users = getStoredUsers();
        const found = users.find((u) => u.email === email);

        if (!found) {
          return { success: false, error: 'No account found with this email' };
        }

        if (!verifyPassword(password, found.password)) {
          return { success: false, error: 'Incorrect password' };
        }

        const user: User = {
          id: found.id,
          name: found.name,
          email: found.email,
          isAdmin: found.isAdmin,
          plan: found.plan,
          createdAt: found.createdAt,
        };

        set({ user, isLoggedIn: true });
        return { success: true };
      },

      signup: async (name: string, email: string, password: string) => {
        const users = getStoredUsers();

        // Check if email already exists
        if (users.find((u) => u.email === email)) {
          return { success: false, error: 'An account with this email already exists' };
        }

        // Block 'admin' email from signup
        if (email === ADMIN_EMAIL) {
          return { success: false, error: 'This email is reserved' };
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
          isAdmin: newUser.isAdmin,
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

          // Also update in stored users
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
