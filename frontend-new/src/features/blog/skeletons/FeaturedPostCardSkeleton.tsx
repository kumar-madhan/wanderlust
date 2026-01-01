export default function FeaturedPostCardSkeleton() {
  return (
    <div className="card-base flex h-auto flex-col gap-2 sm:h-48 sm:flex-row animate-pulse">
      <div className="h-48 w-full rounded-lg bg-slate-200 dark:bg-slate-700 sm:h-full sm:w-1/3" />

      <div className="flex w-full flex-col gap-3 p-3 sm:w-2/3">
        <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />

        <div className="flex gap-2">
          <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="mt-auto h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
