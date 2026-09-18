const SKELETON_ITEMS = Array.from({ length: 8 });

export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {SKELETON_ITEMS.map((_, index) => (
        <div key={index} className="space-y-3">
          <div className="aspect-square w-full animate-pulse rounded-xl bg-slate-200" />

          <div className="space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  )
}