import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

type AuthProtectorProps = { children: React.ReactNode };

export const AuthProtector: React.FC<AuthProtectorProps> = ({ children }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to='/login' />;
};
