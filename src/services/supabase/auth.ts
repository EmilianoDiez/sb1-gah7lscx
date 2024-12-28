import { supabase } from '../../lib/supabase';

export const signInAsAdmin = async (username: string, password: string): Promise<boolean> => {
  // Fixed credentials check
  if (username !== 'FADIUNC' || password !== 'Lamadrid725') {
    return false;
  }

  return true;
};

export const signOut = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};