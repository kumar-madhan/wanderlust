import { Navigate, Outlet } from 'react-router-dom';
import userState from '@/utils/user-state';

export default function AdminGuard() {
  const user = userState.getUser();

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
