import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import FormField from '../common/FormField';
import { useAuth } from '../../hooks/useAuth';

interface SignInFormData {
  dni: string;
}

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const { formData, errors, handleChange, handleSubmit } = useForm<SignInFormData>({
    initialData: { dni: '' },
    validationRules: {
      dni: (value) => {
        if (!value.trim()) return 'El DNI es obligatorio';
        if (!/^\d{7,8}$/.test(value)) return 'DNI inválido (7-8 dígitos)';
        return '';
      }
    },
    onSubmit: async (data) => {
      const success = await signIn(data.dni);
      if (success) {
        navigate('/reservations');
      } else {
        // Show error message - user not found
        alert('Usuario no encontrado. Por favor, registrate primero.');
        navigate('/register');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingresar</h2>
      
      <div className="space-y-6">
        <FormField
          label="DNI"
          name="dni"
          value={formData.dni}
          error={errors.dni}
          onChange={handleChange}
          placeholder="Ingresá tu DNI"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Ingresar
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿No estás registrado?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-700"
          >
            Registrate aquí
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;