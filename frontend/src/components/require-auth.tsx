// src/components/require-auth.tsx

import { Navigate, Outlet } from 'react-router-dom';
import useAuthData from '@/hooks/useAuthData';
import Loader from './skeletons/loader';

interface RequireAuthProps {
  allowedRole?: string[];
}

function RequireAuth({ allowedRole }: RequireAuthProps) {
  const { role, token, loading } = useAuthData();

  if (loading) {
    return <Loader />;
  }

  const isAuthenticated = Boolean(token);
  const isAuthorized =
    !allowedRole || allowedRole.length === 0 || allowedRole.includes(role);

  return isAuthenticated && isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default RequireAuth;
