import { useState, useCallback } from 'react';
import { signInWithDNI, createUser } from '../services/supabase/auth';
import type { Database } from '../types/supabase';

type User = Database['public']['Tables']['users']['Row'];

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (dni: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await signInWithDNI(dni);
      setUser(user);
      return user !== null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Database['public']['Tables']['users']['Insert']) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await createUser(userData);
      setUser(user);
      return user !== null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    signIn,
    register,
    signOut,
    isAuthenticated: user !== null
  };
};