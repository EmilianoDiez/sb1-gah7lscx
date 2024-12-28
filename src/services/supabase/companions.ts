import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/supabase';

type CompanionInsert = Database['public']['Tables']['companions']['Insert'];

export const createCompanion = async (companionData: CompanionInsert): Promise<{ id: string }> => {
  try {
    // Validate required data
    if (!companionData.user_id || !companionData.name || !companionData.dni) {
      throw new Error('Faltan datos requeridos del acompañante');
    }

    // Check for existing companion
    const { data: existingCompanion } = await supabase
      .from('companions')
      .select('id')
      .eq('dni', companionData.dni)
      .eq('user_id', companionData.user_id)
      .maybeSingle();

    if (existingCompanion) {
      throw new Error(`Ya existe un acompañante registrado con el DNI ${companionData.dni}`);
    }

    // Create companion
    const { data, error } = await supabase
      .from('companions')
      .insert([{
        ...companionData,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Error al registrar acompañante. Por favor, intenta nuevamente.');
    }

    return { id: data.id };
  } catch (error) {
    console.error('Error in createCompanion:', error);
    throw error;
  }
};

export const getApprovedCompanions = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('companions')
      .select('id, name, dni')
      .eq('user_id', userId)
      .eq('status', 'approved');

    if (error) {
      console.error('Error fetching companions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getApprovedCompanions:', error);
    throw error;
  }
};