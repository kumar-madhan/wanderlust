import { Navigate, Outlet } from 'react-router-dom';
import userState from '@/utils/user-state';

export default function UnprotectedRoute() {
  const user = userState.getUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
