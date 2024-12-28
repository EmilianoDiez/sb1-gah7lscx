import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/supabase';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];

export const createUser = async (userData: UserInsert): Promise<User | null> => {
  try {
    // First check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('dni', userData.dni)
      .maybeSingle();

    if (existingUser) {
      console.error('User already exists');
      return null;
    }

    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ ...userData, status: 'pending' }])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const getUserByDNI = async (dni: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('dni', dni)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserByDNI:', error);
    throw error;
  }
};

export const checkUserExists = async (dni: string): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('dni', dni);

    if (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }

    return (count ?? 0) > 0;
  } catch (error) {
    console.error('Error in checkUserExists:', error);
    throw error;
  }
};