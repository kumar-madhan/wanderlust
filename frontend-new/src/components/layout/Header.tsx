import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between border-b px-8 py-4 backdrop-blur bg-white/80 dark:bg-black/60"
      style={{
        borderColor: 'var(--border)',
      }}
    >
      <strong className="text-lg tracking-wide">WanderLust</strong>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          className="rounded-full border px-4 py-1 text-sm transition-all hover:bg-black/5 dark:hover:bg-white/10"
          style={{ borderColor: 'var(--border)' }}
        >
          Login
        </button>
      </div>
    </header>
  );
}
