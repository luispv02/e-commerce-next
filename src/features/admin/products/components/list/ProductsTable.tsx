import type { Product } from "@/types/product";
import { ProductListCard } from "./ProductListCard";
import { ProductsTableRow } from "./ProductsTableRow";

interface ProductsTableProps {
  products: Product[];
  shownCount: number;
  totalCount: number;
}

export const ProductsTable = ({ products, shownCount, totalCount }: ProductsTableProps) => {

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <p className="mb-4 text-right text-xs text-slate-500 hidden">
        Mostrando {shownCount} de {totalCount} productos
      </p>

      {/* Mobile */}
      <div className="space-y-3 lg:hidden">
        {products.map((product) => (
          <ProductListCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop  */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-200 text-left">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="pb-3 pr-4 font-semibold">Producto</th>
              <th className="pb-3 pr-4 font-semibold text-center">Categoría</th>
              <th className="pb-3 pr-4 font-semibold text-center">Stock</th>
              <th className="pb-3 pr-4 font-semibold text-center">Precio</th>
              <th className="pb-3 pr-4 font-semibold text-center">Estado</th>
              <th className="pb-3 font-semibold text-end">Acción</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductsTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
