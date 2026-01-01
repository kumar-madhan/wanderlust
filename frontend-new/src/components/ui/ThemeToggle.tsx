import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}, [theme]);

  return (
    <button
      className="rounded-full border px-3 py-1 text-sm"
      onClick={() =>
        setTheme((t) => (t === 'light' ? 'dark' : 'light'))
      }
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
