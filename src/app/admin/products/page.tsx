import { Pagination } from "@/components/ui/Pagination";
import { ProductsHeader } from "@/features/admin/products/components/list/ProductsHeader";
import { ProductsTable } from "@/features/admin/products/components/list/ProductsTable";
import { productsResponse } from "@/mocks/products";
import { Suspense } from "react";


export default async function AdminProductsPage() {
  const { products, pagination } = productsResponse.data;

  return (
    <div className="mx-auto w-full max-w-350 space-y-6">
      <ProductsHeader />

      <ProductsTable
        products={products}
        shownCount={products.length}
        totalCount={pagination.totalProducts}
      />

      <Suspense fallback={null}>
        <Pagination totalPages={pagination.totalPages} />
      </Suspense>
    </div>
  );
}
