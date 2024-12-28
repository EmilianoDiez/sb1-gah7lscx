import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMonitorAuth } from '../../hooks/useMonitorAuth';
import MonitorLogin from '../monitor/MonitorLogin';

interface MonitorProtectedRouteProps {
  children: React.ReactNode;
}

const MonitorProtectedRoute: React.FC<MonitorProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useMonitorAuth();

  if (!isAuthenticated) {
    return <MonitorLogin />;
  }

  return <>{children}</>;
};

export default MonitorProtectedRoute;