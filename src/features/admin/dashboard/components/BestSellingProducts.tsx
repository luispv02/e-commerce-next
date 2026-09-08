import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import type { TopProduct } from "../types/dashboard";

interface BestSellingProductsProps {
  products: TopProduct[];
}

export const BestSellingProducts = ({ products }: BestSellingProductsProps) => {

  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h2 className="mb-4 text-base font-semibold text-slate-950">Productos más vendidos</h2>

      <div className="space-y-3 lg:hidden">
        {products.map((product) => (
          <article key={product.id} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-950">{product.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatPrice(product.revenue)} · {product.percentage}% · {product.units} ventas
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
              <th className="pb-3 pr-3 font-medium">Producto</th>
              <th className="pb-3 pr-3 font-medium">Ingresos</th>
              <th className="pb-3 pr-3 font-medium">% del total</th>
              <th className="pb-3 text-right font-medium">Ventas</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-100 last:border-0">
                <td className="py-3 pr-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <span className="truncate font-medium text-slate-950">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-3 font-semibold text-slate-950">
                  {formatPrice(product.revenue)}
                </td>
                <td className="py-3 pr-3 text-slate-500">{product.percentage}%</td>
                <td className="py-3 text-right font-medium text-slate-950">{product.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
