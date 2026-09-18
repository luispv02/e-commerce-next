import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";


export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-7xl lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
        </aside>

        <div className="min-w-0">
          <div className="mb-6">
            <div className="h-9 w-64 animate-pulse rounded bg-slate-200" />

            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
          </div>

          <ProductGridSkeleton />
        </div>
      </div>
    </section>
  );
}