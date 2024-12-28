import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const dbConfig = {
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_ANON_KEY,
  databaseUrl: DATABASE_URL,
};

export const createSupabaseClient = () => {
  return createClient<Database>(dbConfig.supabaseUrl, dbConfig.supabaseKey, {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
};