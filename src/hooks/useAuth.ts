import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../types/auth';
import { getUserByDNI, checkUserExists } from '../services/supabase/users';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (dni: string) => {
        try {
          // First check if user exists to avoid unnecessary queries
          const exists = await checkUserExists(dni);
          if (!exists) {
            return false;
          }

          const user = await getUserByDNI(dni);
          if (!user) {
            return false;
          }

          set({ user, isAuthenticated: true });
          return true;
        } catch (error) {
          console.error('Error signing in:', error);
          return false;
        }
      },
      signOut: () => set({ user: null, isAuthenticated: false })
    }),
    {
      name: 'auth-store'
    }
  )
);