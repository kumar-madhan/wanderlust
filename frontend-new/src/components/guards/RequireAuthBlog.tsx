import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '@/types/role-type';
import userState from '@/utils/user-state';

interface RequireAuthBlogProps {
  allowedRole: Role[];
}

export default function RequireAuthBlog({
  allowedRole,
}: RequireAuthBlogProps) {
  const user = userState.getUser();

  if (!user || !allowedRole.includes(user.role)) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
