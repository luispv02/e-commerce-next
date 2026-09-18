export default function Loading() {
  return (
    <div className="rounded-3xl bg-white py-4 md:p-8 lg:p-10">
      {/* Back link */}
      <div className="mb-8 flex items-center gap-3">
        <div className="size-5 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.84fr)] lg:gap-12">
        {/* Gallery */}

        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-5">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square w-full animate-pulse rounded-xl bg-slate-200"
              />
            ))}
          </div>

          <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />
        </div>

        {/* Product information */}
        <div className="space-y-6">
          <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />

          <div className="h-7 w-32 animate-pulse rounded bg-slate-200" />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />

          <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}