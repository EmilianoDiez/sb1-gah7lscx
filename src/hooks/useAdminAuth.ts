import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signInAsAdmin } from '../services/supabase/auth';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const success = await signInAsAdmin(username, password);
          if (!success) {
            throw new Error('Credenciales inválidas');
          }
          set({ isAuthenticated: true });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Error de autenticación';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => set({ isAuthenticated: false, error: null })
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated })
    }
  )
);