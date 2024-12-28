import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useAdminAuth } from './useAdminAuth';
import { useMonitorAuth } from './useMonitorAuth';
import { signOut } from '../services/supabase/auth';

export const useLogout = () => {
  const navigate = useNavigate();
  const { signOut: userSignOut } = useAuth();
  const { logout: adminLogout } = useAdminAuth();
  const { logout: monitorLogout } = useMonitorAuth();

  const logout = async () => {
    try {
      // Sign out from Supabase
      await signOut();
      
      // Clear all auth states
      userSignOut();
      adminLogout();
      monitorLogout();

      // Clear any stored session data
      sessionStorage.clear();
      localStorage.removeItem('admin-auth');
      localStorage.removeItem('monitor-auth');
      
      // Redirect to home
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return { logout };
};