import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '@/types/role-type';
import userState from '@/utils/user-state';

interface RequireAuthProps {
  allowedRole: Role[];
}

export default function RequireAuth({ allowedRole }: RequireAuthProps) {
  const user = userState.getUser();

  if (!user || !allowedRole.includes(user.role)) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
