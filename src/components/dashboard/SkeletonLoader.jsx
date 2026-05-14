export function SkeletonLoader() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-44 animate-pulse rounded-[28px] bg-slate-100" />
      <div className="grid gap-5 md:grid-cols-3">
        <div className="h-52 animate-pulse rounded-[28px] bg-slate-100" />
        <div className="h-52 animate-pulse rounded-[28px] bg-slate-100" />
        <div className="h-52 animate-pulse rounded-[28px] bg-slate-100" />
      </div>
    </div>
  );
}
