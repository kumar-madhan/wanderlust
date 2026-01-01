import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import userState from '@/utils/user-state';

export default function Header() {
  const user = userState.getUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const logout = () => {
    userState.removeUser();
    window.location.href = '/signin';
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between border-b px-8 py-4 backdrop-blur bg-white/80 dark:bg-black/60"
      style={{ borderColor: 'var(--border)' }}
    >
      <a href="/" className="text-lg font-semibold tracking-wide">
        WanderLust
      </a>

      <div className="relative flex items-center gap-4" ref={menuRef}>
        <ThemeToggle />

        {!user ? (
          <a
            href="/signin"
            className="rounded-full border px-4 py-1 text-sm transition hover:bg-black/5 dark:hover:bg-white/10"
          >
            Login
          </a>
        ) : (
          <>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-sm"
            >
              {user.name?.[0]?.toUpperCase() || 'U'}
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-44 rounded-xl border bg-[var(--card)] shadow-lg">
                <a
                  href="/add-blog"
                  className="block px-4 py-2 text-sm hover:bg-black/5"
                >
                  Write Blog
                </a>

                {user.role === 'ADMIN' && (
                  <a
                    href="/admin/users"
                    className="block px-4 py-2 text-sm hover:bg-black/5"
                  >
                    Admin
                  </a>
                )}

                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
