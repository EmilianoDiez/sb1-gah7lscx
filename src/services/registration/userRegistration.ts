import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/supabase';
import { checkExistingUser } from '../validation/userValidation';

type UserInsert = Database['public']['Tables']['users']['Insert'];

export const registerUser = async (userData: UserInsert): Promise<{ id: string }> => {
  try {
    // Use the safe registration function
    const { data, error } = await supabase
      .rpc('register_user_safely', {
        name_param: userData.name,
        email_param: userData.email,
        dni_param: userData.dni,
        phone_param: userData.phone || null
      });

    if (error) {
      if (error.message.includes('Ya existe un usuario')) {
        throw new Error(error.message);
      }
      console.error('Registration error:', error);
      throw new Error('Error al registrar usuario. Por favor, intenta nuevamente.');
    }

    return { id: data };
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};