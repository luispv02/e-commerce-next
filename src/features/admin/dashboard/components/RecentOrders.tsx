import { formatPrice } from "@/lib/format-price";
import type { RecentOrder } from "../types/dashboard";
import { formatOrderDate } from "../utils/format-dashboard";

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export const RecentOrders = ({ orders }: RecentOrdersProps) => {

  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-950">Pedidos recientes</h2>
      </div>

      <div className="space-y-3 lg:hidden">
        {orders.map((order) => {
          return (
            <article key={order.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {order.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">{order.customerEmail}</p>
                  <p className="mt-1 text-xs text-slate-400">{formatOrderDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-950">{formatPrice(order.total)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
              <th className="pb-3 pr-3 font-medium"># Pedido</th>
              <th className="pb-3 pr-3 font-medium">Cliente</th>
              <th className="pb-3 pr-3 font-medium">Fecha</th>
              <th className="pb-3 pr-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-3 font-medium">
                    {order.id.slice(0, 8)}
                  </td>
                  <td className="py-3 pr-3 text-slate-600">{order.customerEmail}</td>
                  <td className="py-3 pr-3 whitespace-nowrap text-slate-500">
                    {formatOrderDate(order.date)}
                  </td>
                  <td className="py-3 pr-3 font-semibold text-slate-950">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
