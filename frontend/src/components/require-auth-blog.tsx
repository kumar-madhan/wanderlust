// src/components/require-auth-blog.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { AddBlogPostSkeleton } from './skeletons/add-blog-post-skeleton';
import useAuthData from '@/hooks/useAuthData';

interface RequireAuthBlogProps {
  allowedRole?: string[];
}

function RequireAuthBlog({ allowedRole }: RequireAuthBlogProps) {
  const { role, token, loading } = useAuthData();

  if (loading) {
    return <AddBlogPostSkeleton />;
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

export default RequireAuthBlog;
