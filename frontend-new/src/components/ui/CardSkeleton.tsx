export default function CardSkeleton() {
  return (
    <div className="card-base p-3 animate-pulse">
      <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}
