import { supabase } from '../../lib/supabase';

export interface PendingRegistration {
  type: 'user' | 'companion';
  id: string;
  name: string;
  email?: string;
  dni: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_at?: string;
  approved_by_name?: string;
}

export const getPendingRegistrations = async () => {
  try {
    const { data, error } = await supabase.rpc('get_pending_registrations');

    if (error) throw error;

    // Separate users and companions
    const users = data.filter(item => item.type === 'user') as PendingRegistration[];
    const companions = data.filter(item => item.type === 'companion') as PendingRegistration[];

    return { users, companions };
  } catch (error) {
    console.error('Error fetching pending registrations:', error);
    throw error;
  }
};

export const approveUser = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('admin_approve_user', { user_id_param: userId });
    if (error) throw error;
  } catch (error) {
    console.error('Error approving user:', error);
    throw error;
  }
};

export const rejectUser = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('admin_reject_user', { user_id_param: userId });
    if (error) throw error;
  } catch (error) {
    console.error('Error rejecting user:', error);
    throw error;
  }
};

export const approveCompanion = async (companionId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('admin_approve_companion', { companion_id_param: companionId });
    if (error) throw error;
  } catch (error) {
    console.error('Error approving companion:', error);
    throw error;
  }
};

export const rejectCompanion = async (companionId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('admin_reject_companion', { companion_id_param: companionId });
    if (error) throw error;
  } catch (error) {
    console.error('Error rejecting companion:', error);
    throw error;
  }
};