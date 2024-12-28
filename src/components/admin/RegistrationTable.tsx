import React from 'react';
import { Check, X, Users } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/formatters';
import { formatDate } from '../../utils/helpers';
import { PendingRegistration } from '../../types/store';

interface RegistrationTableProps {
  registrations: PendingRegistration[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const RegistrationTable: React.FC<RegistrationTableProps> = ({
  registrations,
  onApprove,
  onReject
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DNI
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(registration.registrationDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${registration.type === 'affiliate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                  <Users className="w-4 h-4 mr-1" />
                  {registration.type === 'affiliate' ? 'Afiliado' : 'Acompañante'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{registration.data.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registration.data.dni}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registration.data.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {registration.data.phone ? formatPhoneNumber(registration.data.phone) : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${registration.status === 'approved' ? 'bg-green-100 text-green-800' :
                    registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {registration.status === 'approved' ? 'Aprobado' :
                   registration.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {registration.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onApprove(registration.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => onReject(registration.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};