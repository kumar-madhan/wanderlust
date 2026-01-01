import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '@/features/blog/pages/home-page';
import DetailsPage from '@/features/blog/pages/details-page';
import AddBlog from '@/features/blog/pages/add-blog';
import EditBlog from '@/features/blog/pages/edit-blog';

import SignIn from '@/features/auth/pages/signin-page';
import SignUp from '@/features/auth/pages/signup-page';

import AdminUsers from '@/features/admin/pages/AdminUsers';
import AdminBlogs from '@/features/admin/pages/AdminBlogs';

import ScrollToTop from '@/components/ScrollToTop';
import UnprotectedRoute from '@/components/guards/UnprotectedRoute';
import RequireAuth from '@/components/guards/RequireAuth';
import RequireAuthBlog from '@/components/guards/RequireAuthBlog';
import AdminContainer from '@/components/layout/AdminContainer';

import { Role } from '@/types/role-type';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="details-page/:title/:postId" element={<DetailsPage />} />

        <Route element={<UnprotectedRoute />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route
          element={
            <RequireAuthBlog allowedRole={[Role.Admin, Role.User]} />
          }
        >
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:postId" element={<EditBlog />} />
        </Route>

        <Route
          path="admin"
          element={<RequireAuth allowedRole={[Role.Admin]} />}
        >
          <Route element={<AdminContainer />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
