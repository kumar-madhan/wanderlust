import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button className="p-4 sm:hidden" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <aside
        className={`absolute z-10 h-full w-64 border bg-[var(--card)] transition-transform sm:relative sm:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="cursor-pointer border-b px-6 py-4 text-xl font-medium"
          onClick={() => navigate('/')}
        >
          WanderLust
        </div>

        <nav className="flex flex-col gap-2 p-6">
          {['users', 'blogs'].map((path) => (
            <NavLink
              key={path}
              to={`/admin/${path}`}
              className={({ isActive }) =>
                `rounded px-3 py-2 transition-colors ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'hover:bg-black/5'
                }`
              }
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
