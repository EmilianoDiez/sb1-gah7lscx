import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateDNI } from '../utils/validation';

const SignIn = () => {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();

  const { formData, errors, handleChange, handleSubmit } = useForm({
    initialData: { dni: '' },
    validationRules: {
      dni: validateDNI
    },
    onSubmit: async (data) => {
      const success = await signIn(data.dni);
      if (!success) {
        alert('Usuario no encontrado o no autorizado. Por favor, registrate primero.');
        navigate('/register');
      }
    }
  });

  if (isAuthenticated) {
    return <Navigate to="/reservations" replace />;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingresar</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.dni ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Ingresá tu DNI"
            />
            {errors.dni && (
              <p className="mt-1 text-sm text-red-500">{errors.dni}</p>
            )}
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default SignIn;