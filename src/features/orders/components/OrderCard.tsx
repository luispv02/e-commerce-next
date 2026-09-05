import { formatPrice } from "@/lib/format-price";
import { FiBox, FiCalendar } from "react-icons/fi";
import type { Order } from "../types/orders";
import { OrderItem } from "./OrderItem";
import { dateFormatter } from "@/lib/format-date";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-3 py-2 md:items-center bg-slate-50 md:py-3">
        <div className="flex min-w-0 items-start gap-3 md:items-center">
          <FiBox className="size-7 shrink-0 text-slate-600 md:mt-0 md:size-6 mt-2" aria-hidden="true" />

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 md:text-xs md:font-medium md:text-slate-900">
              Pedido
            </p>
            <p className="text-xs text-slate-500 md:text-sm md:text-slate-700">
              {order.id.slice(0, 8)}
            </p>
            <p className="text-xs text-slate-500 md:hidden">
              {dateFormatter(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <FiCalendar className="size-7 shrink-0 text-slate-600 md:mt-0 md:size-6 mt-2" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-slate-900 md:text-xs md:font-medium md:text-slate-900">Fecha de compra</p>
            <p className="text-sm text-slate-700">{dateFormatter(order.createdAt)}</p>
          </div>
        </div>
      </header>

      <div className="divide-y divide-slate-200 px-2 md:px-6">
        {order.items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>

      <footer className="flex items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 p-2 md:py-3 md:px-4">
        <p className="text-sm font-bold text-slate-950 md:text-base">
          Total del pedido
        </p>
        <p className="text-lg font-bold text-slate-950 md:text-xl">
          {formatPrice(order.total)}
        </p>
      </footer>
    </article>
  );
};
