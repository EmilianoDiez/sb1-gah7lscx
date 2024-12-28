import React, { useState, useEffect } from 'react';
import { Check, X, Users, Clock } from 'lucide-react';
import { 
  getPendingRegistrations, 
  approveUser, 
  rejectUser,
  approveCompanion,
  rejectCompanion,
  type PendingRegistration 
} from '../../services/supabase/admin';
import { formatDate } from '../../utils/formatters';

const RegistrationApprovals = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingRegistration[]>([]);
  const [pendingCompanions, setPendingCompanions] = useState<PendingRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPendingRegistrations = async () => {
    try {
      setIsLoading(true);
      const { users, companions } = await getPendingRegistrations();
      setPendingUsers(users);
      setPendingCompanions(companions);
    } catch (err) {
      setError('Error loading pending registrations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingRegistrations();
  }, []);

  const handleApproveUser = async (userId: string) => {
    try {
      await approveUser(userId);
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error approving user');
      console.error(err);
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(userId);
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error rejecting user');
      console.error(err);
    }
  };

  const handleApproveCompanion = async (companionId: string) => {
    try {
      await approveCompanion(companionId);
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error approving companion');
      console.error(err);
    }
  };

  const handleRejectCompanion = async (companionId: string) => {
    try {
      await rejectCompanion(companionId);
      await loadPendingRegistrations();
    } catch (err) {
      setError('Error rejecting companion');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const renderApprovalStatus = (registration: PendingRegistration) => {
    if (registration.approved_by_name) {
      return (
        <div className="text-sm text-gray-500">
          <Clock className="inline-block w-4 h-4 mr-1" />
          Aprobado por {registration.approved_by_name}
          <br />
          <span className="text-xs">
            {formatDate(registration.approved_at!)}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Pending Users */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Afiliados Pendientes</h2>
        {pendingUsers.length === 0 ? (
          <p className="text-gray-500">No hay afiliados pendientes de aprobación</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderApprovalStatus(user)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => handleRejectUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pending Companions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Acompañantes Pendientes</h2>
        {pendingCompanions.length === 0 ? (
          <p className="text-gray-500">No hay acompañantes pendientes de aprobación</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingCompanions.map((companion) => (
                  <tr key={companion.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{companion.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{companion.dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(companion.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderApprovalStatus(companion)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveCompanion(companion.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => handleRejectCompanion(companion.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationApprovals;