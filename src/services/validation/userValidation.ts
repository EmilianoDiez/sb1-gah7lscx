import { supabase } from '../../lib/supabase';

export const checkExistingUser = async (email: string, dni: string): Promise<{ 
  exists: boolean; 
  field?: 'email' | 'dni';
}> => {
  try {
    // Check email
    const { data: emailExists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (emailExists) {
      return { exists: true, field: 'email' };
    }

    // Check DNI
    const { data: dniExists } = await supabase
      .from('users')
      .select('id')
      .eq('dni', dni)
      .maybeSingle();

    if (dniExists) {
      return { exists: true, field: 'dni' };
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking existing user:', error);
    throw error;
  }
};