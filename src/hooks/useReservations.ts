import { useState } from 'react';
import { useAuth } from './useAuth';
import { 
  createReservation, 
  cancelReservation, 
  getUserReservations 
} from '../services/supabase/reservations';
import { sendReservationConfirmationEmail } from '../services/email';

export const useReservations = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (date: string, companionIds: string[]) => {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { id } = await createReservation(user.id, date, companionIds);
      
      // Enviar email de confirmación
      await sendReservationConfirmationEmail(
        user.email,
        user.name,
        date,
        companionIds.map(id => ({
          name: 'Nombre Acompañante', // TODO: Obtener nombres reales
          dni: 'DNI Acompañante'
        }))
      );

      return id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la reserva';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = async (reservationId: string) => {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    setIsLoading(true);
    setError(null);

    try {
      await cancelReservation(reservationId, user.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cancelar la reserva';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    create,
    cancel,
    isLoading,
    error
  };
};