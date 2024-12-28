import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export const checkConnection = async () => {
  try {
    // First check if we can connect to Supabase
    const { error: authError } = await supabase.auth.getSession();
    if (authError) throw authError;

    // Then check if tables exist by trying to count users
    const { error: dbError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // During initial setup, table not existing is expected
    if (dbError?.code === '42P01') {
      console.info('Database tables not initialized yet');
      return true;
    }

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    // In development, allow continuing even with errors
    return process.env.NODE_ENV === 'development';
  }
};