import { Pagination } from "@/components/ui/Pagination";
import { ProductsHeader } from "@/features/admin/products/components/list/ProductsHeader";
import { ProductsTable } from "@/features/admin/products/components/list/ProductsTable";
import { parseProductSearchParams } from "@/features/products/lib/parse-product-search-params";
import { getProducts } from "@/features/products/services/product.service";
import { ProductSearchParams } from "@/features/products/types/filters";
import Link from "next/link";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa";

interface AdminProductsPageProps {
  searchParams: Promise<ProductSearchParams>;
};


export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {

  const params = await searchParams;

  const filters = parseProductSearchParams(params);

  const productResponse = await getProducts({ filters });
  const { products, pagination } = productResponse.data;

  return (
    <div className="mx-auto w-full max-w-350 space-y-6">
      <ProductsHeader />

      {products.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:py-8 mt-10 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No se encontraron productos.
          </h2>

          <p className="text-sm md:text-base mt-3">Aún no has agregado ningún producto. Comienza creando tu primer producto para que aparezca en esta sección.</p>

          <Link
            href={'/admin/products/new'}
            type="button"
            className=" mt-6 cursor-pointer inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FaPlus className="size-3" />
            Agregar producto
          </Link>
        </div>
      ) : (
        <>
          <ProductsTable
            products={products}
            shownCount={products.length}
            totalCount={pagination.totalProducts}
          />

          <Suspense fallback={null}>
            <Pagination totalPages={pagination.totalPages} />
          </Suspense>
        </>
      )}
    </div>
  );
}
