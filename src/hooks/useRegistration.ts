import { useState } from 'react';
import { registerUser } from '../services/registration/userRegistration';
import { createCompanion } from '../services/supabase/companions';
import type { AffiliateFormData, CompanionData } from '../types/registration';

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    userData: AffiliateFormData, 
    companions?: CompanionData[]
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register main user first
      const user = await registerUser(userData);
      if (!user) {
        throw new Error('Error al crear el usuario');
      }

      // Register companions if any
      if (companions?.length) {
        const companionPromises = companions.map(companion => 
          createCompanion({
            ...companion,
            user_id: user.id,
            age: parseInt(companion.age)
          })
        );

        try {
          await Promise.all(companionPromises);
        } catch (err) {
          // If companions fail, we should still consider the main registration successful
          console.error('Error registering companions:', err);
          throw new Error('Se registró el usuario pero hubo un error al registrar los acompañantes');
        }
      }

      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error en el registro';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    isLoading,
    error,
    clearError
  };
};