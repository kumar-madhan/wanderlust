import AdminSidebar from '@/components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

export default function AdminContainer() {
  return (
    <div className="relative flex flex-grow flex-col sm:flex-row">
      <AdminSidebar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
