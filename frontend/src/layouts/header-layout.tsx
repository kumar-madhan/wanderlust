// src/layouts/header-layout.tsx

import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import LogOutIcon from '@/assets/svg/logout-icon.svg';
import AppIcon from '@/assets/svg/app-icon.svg';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '@/components/hero';
import Loader from '@/components/skeletons/loader';
import useAuthData from '@/hooks/useAuthData';
import userState from '@/utils/user-state';
import { Role } from '@/types/role-type';

function Header() {
  const navigate = useNavigate();
  const { token, loading, role } = useAuthData();

  const handleLogout = () => {
    userState.removeUser();          // ✅ clears token + user
    navigate('/signin');             // ✅ redirect
  };

  return (
    <div className="relative -mt-2 h-[460px] bg-[url('./assets/wanderlustbg.webp')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex flex-col px-8 py-8 text-slate-50 sm:px-16">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Link to="/">
              <img src={AppIcon} className="h-10 w-10" />
            </Link>
            <Link to="/">WanderLust</Link>
          </div>

          <div className="flex items-center">
            <div className="px-4 sm:px-20">
              <ThemeToggle />
            </div>

            {loading ? (
              <Loader />
            ) : token ? (
              <div className="flex gap-2">
                {role === Role.Admin && (
                  <button
                    className="hidden rounded border px-4 py-2 md:inline-block"
                    onClick={() => navigate('/admin/blogs')}
                  >
                    Dashboard
                  </button>
                )}

                <button
                  className="hidden rounded border px-4 py-2 md:inline-block"
                  onClick={() => navigate('/add-blog')}
                >
                  Create post
                </button>

                <button
                  className="hidden rounded border px-4 py-2 md:inline-block"
                  onClick={handleLogout}
                >
                  Logout
                </button>

                {/* Mobile */}
                <button className="md:hidden" onClick={() => navigate('/add-blog')}>
                  <img src={AddIcon} className="h-10 w-10" />
                </button>

                <button className="md:hidden" onClick={handleLogout}>
                  <img src={LogOutIcon} className="h-9 w-9" />
                </button>
              </div>
            ) : (
              <button
                className="hidden rounded border px-4 py-2 md:inline-block"
                onClick={() => navigate('/signin')}
              >
                Login
              </button>
            )}
          </div>
        </div>

        <Hero />
      </div>
    </div>
  );
}

export default Header;
