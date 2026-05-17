export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`} />
);

export const CardSkeleton = () => (
  <div className="glass rounded-2xl p-6 space-y-4">
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);
