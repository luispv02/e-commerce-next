import { formatPrice } from "@/lib/format-price";
import { dateFormatter } from "@/lib/format-date";
import Link from "next/link";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";
import type { Order } from "../types/orders";
import { OrderItem } from "./OrderItem";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PayOrderButton } from "./PayOrderButton";
import { TestPaymentNotice } from "@/components/ui/TestPaymentNotice";

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail = ({ order }: OrderDetailProps) => {
  const address = order.shippingAddress;

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        <FiArrowLeft className="size-4" />
        Volver a mis compras
      </Link>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Pedido
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-1 break-all text-sm text-slate-500">{order.id}</p>
          <p className="mt-1 text-sm text-slate-500">
            {dateFormatter(order.createdAt, true)}
          </p>
        </div>

        {order.status === "PENDING" && (
          <div className="hidden sm:block">
            <PayOrderButton orderId={order.id} />
          </div>
        )}
      </header>

      {order.status === "PENDING" && (
        <div className="flex justify-end">
          <div className="w-full max-w-md">
            <TestPaymentNotice />
          </div>
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-950">Productos</h2>
        </div>
        <div className="divide-y divide-slate-200 px-3 md:px-5">
          {order.items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-bold text-slate-950">Total del pedido</p>
          <p className="text-lg font-bold text-slate-950">{formatPrice(order.total)}</p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <FiMapPin className="size-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-950">Dirección de envío</h2>
        </div>

        <address className="not-italic text-sm leading-6 text-slate-600">
          <p className="font-medium text-slate-950">{address.fullName}</p>
          <p>{address.street}</p>
          <p>
            {address.neighborhood}, {address.postalCode}
          </p>
          <p>
            {address.city}, {address.state}
          </p>
          <p>{address.phone}</p>
          {address.references && (
            <p className="mt-1 text-slate-500">Referencias: {address.references}</p>
          )}
        </address>
      </section>


      {order.status === "PENDING" && (
        <div className="sm:hidden">
          <PayOrderButton orderId={order.id} />
        </div>
      )}
    </section>
  );
};
