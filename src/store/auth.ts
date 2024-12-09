import { create } from 'zustand';
import type { AuthState, User } from '../types/auth';

const DEMO_USER: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'client',
  createdAt: new Date('2024-01-01'),
};

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Demo authentication
      if (email === 'demo@example.com' && password === 'demo123') {
        set({ user: DEMO_USER });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    set({ user: null });
  },
}));