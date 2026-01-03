// src/components/unprotected-route.tsx

import { Navigate, Outlet } from 'react-router-dom';
import useAuthData from '@/hooks/useAuthData';

function UnprotectedRoute() {
  const { token, loading } = useAuthData();

  if (loading) {
    return null; // or a small spinner if you prefer
  }

  return token ? <Navigate to="/" replace /> : <Outlet />;
}

export default UnprotectedRoute;
