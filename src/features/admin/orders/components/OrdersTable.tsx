
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { formatPrice } from "@/lib/format-price";
import type { AdminOrderListItem } from "../types/orders";
import { formatOrderNumber } from "../lib/order-formatters";
import { AdminOrderStatusBadge } from "./OrderStatusBadge";
import { dateFormatter } from "@/lib/format-date";

interface OrdersTableProps {
  orders: AdminOrderListItem[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {

  if (!orders.length) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
        <h2 className="text-base font-semibold text-slate-950">
          No se encontraron pedidos
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Intenta con otro estado.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Mobile */}
      <div className="divide-y divide-slate-100 lg:hidden">
        {orders.map((order) => (
          <article key={order.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-slate-950">
                  {formatOrderNumber(order.id)}
                </p>

                <p className="mt-1 truncate text-sm text-slate-700">
                  {order.customerName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {dateFormatter(order.createdAt)}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-slate-950">
                  {formatPrice(order.total)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {order.itemCount}{" "}
                  {order.itemCount === 1 ? "producto" : "productos"}
                </p>

                <div className="mt-2">
                  <AdminOrderStatusBadge status={order.status} />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Link
                href={`/admin/orders/${order.id}`}
                className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Ver detalle
                <FiChevronRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-225 text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3 font-semibold">Pedido</th>
              <th className="px-4 py-3 font-semibold">Cliente</th>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-5 py-3 text-right font-semibold">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-100 last:border-0">

                <td className="px-5 py-3">
                  <p className="font-bold text-slate-950">
                    {formatOrderNumber(order.id)}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">
                    {order.customerName}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {order.customerEmail}
                  </p>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {dateFormatter(order.createdAt)}
                </td>

                <td className="px-4 py-3">
                  <p className="font-bold text-slate-950">
                    {formatPrice(order.total)}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {order.itemCount}{" "}{order.itemCount === 1 ? "producto" : "productos"}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <AdminOrderStatusBadge status={order.status} />
                </td>

                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    Ver detalle
                    <FiChevronRight className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
