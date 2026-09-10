import { Filters } from "@/features/products/components/filters/Filters";
import { ProductSort } from "@/features/products/components/ProductSort";
import { productsResponse } from "@/mocks/products";
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { Pagination } from "@/components/ui/Pagination";
import { MobileFilters } from "@/features/products/components/filters/MobileFilters";
import { ProductsCategory } from "@/types/product";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: ProductsCategory;
  }>;
};

export default async function ProductsPage({ searchParams, }: ProductsPageProps) {

  const params = await searchParams;
  const category = params.category ?? "all";

  const { products, pagination } = productsResponse.data;

  const categoryTitles = {
    all: "Todos los productos",
    clothes: "Productos de ropa",
    technology: "Productos de tecnología",
    others: "Otros productos",
  };

  const title = categoryTitles[category as keyof typeof categoryTitles] ?? categoryTitles.all;


  return (
    <section className="mx-auto w-full max-w-7xl lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

        {/* Filters */}
        <aside className="hidden lg:block">
          <Filters category={category} />
        </aside>

        {/* Products */}
        <div className="min-w-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                {title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                120 resultados
              </p>
            </div>

            <div className="flex justify-between sm:gap-4">
              <div className="lg:hidden">
                <MobileFilters category={category} />
              </div>

              <ProductSort />
            </div>
          </div>

          {/* Product grid */}
          <div className="mt-6">
            <ProductGrid products={products} />

            <Suspense fallback={null}>
              <Pagination totalPages={pagination.totalPages} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
