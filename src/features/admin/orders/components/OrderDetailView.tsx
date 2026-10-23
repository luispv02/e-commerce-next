import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiBox, FiMapPin, FiUser } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { RiShoppingBag4Line } from "react-icons/ri";
import type { IconType } from "react-icons";
import { formatPrice } from "@/lib/format-price";
import { dateFormatter } from "@/lib/format-date";
import type { AdminOrderDetail } from "../types/orders";
import { formatOrderNumber } from "../lib/order-formatters";
import { AdminOrderStatusBadge } from "./OrderStatusBadge";

interface OrderDetailViewProps {
  order: AdminOrderDetail;
}

export const OrderDetailView = ({ order }: OrderDetailViewProps) => {
  const address = order.shippingAddress;
  const subtotal = order.items.reduce((sum, item) => sum + item.pricePaid * item.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-350 space-y-5">
      <header>
        <Link href="/admin/orders" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-950">
          <FiArrowLeft className="size-4" />
          Pedidos
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            Pedido {formatOrderNumber(order.id)}
          </h1>

          <AdminOrderStatusBadge status={order.status} />
        </div>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Realizado el {dateFormatter(order.createdAt)}
        </p>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        {/* Left column */}
        <div className="space-y-4">
          <DetailSection icon={FiUser} title="Información del cliente">
            <div className="space-y-2">
              <p className="wrap-break-word text-sm font-semibold text-slate-950">
                {order.customerName}
              </p>

              <p className="break-all text-sm text-slate-600">
                {order.customerEmail}
              </p>

              <p className="text-sm text-slate-600">
                {address.phone}
              </p>
            </div>
          </DetailSection>

          <DetailSection icon={FiMapPin} title="Dirección de envío">
            <address className="space-y-1 wrap-break-word text-sm leading-5 text-slate-600 not-italic">
              <p>{address.street}</p>
              <p>{address.neighborhood}</p>
              <p>
                {address.city}, {address.state}
              </p>
              <p>C.P. {address.postalCode}</p>

              {address.references && (
                <p className="border-t border-slate-100 pt-2 text-slate-500">
                  <span className="font-medium text-slate-700">
                    Referencias:
                  </span>{" "}
                  {address.references}
                </p>
              )}
            </address>
          </DetailSection>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <DetailSection icon={RiShoppingBag4Line} title={`Productos (${order.itemCount})`}>
            <div className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <article key={item.id} className="flex gap-3 py-4 first:pt-0 last:pb-0" >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-50 sm:size-20">
                    {item.images[0]?.url && (
                      <Image
                        fill
                        sizes="(min-width: 640px) 80px, 64px"
                        src={item.images[0].url}
                        alt={item.title}
                        className="object-contain p-1"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="wrap-break-word text-sm font-semibold text-slate-950">
                      {item.title}
                    </p>

                    {item.variants && (
                      <p className="mt-1 text-xs text-slate-500">
                        {item.variants.size && `Talla: ${item.variants.size}`}
                        {item.variants.size && item.variants.color && " | "}
                        {item.variants.color && `Color: ${item.variants.color}`}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-slate-500">
                      {item.quantity}{" "}
                      {item.quantity === 1 ? "unidad" : "unidades"}
                      {" · "}
                      {formatPrice(item.pricePaid)} c/u
                    </p>
                  </div>

                  <p className="shrink-0 text-right text-sm font-bold text-slate-950">
                    {formatPrice(item.pricePaid * item.quantity)}
                  </p>
                </article>
              ))}
            </div>
          </DetailSection>

          <DetailSection icon={FiBox} title="Resumen del pedido">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-slate-600">
                <dt>Subtotal ({order.itemCount} productos)</dt>
                <dd className="shrink-0 font-medium text-slate-900">
                  {formatPrice(subtotal)}
                </dd>
              </div>

              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3 font-bold text-slate-950">
                <dt>Total</dt>
                <dd className="shrink-0 text-base">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-950">
                <BsCreditCard className="size-4" />
                Información del pago
              </h3>

              <dl className="space-y-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <dt className="text-slate-600">Estado</dt>
                  <dd>
                    <AdminOrderStatusBadge status={order.status} />
                  </dd>
                </div>

                {order.paidAt && (
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <dt className="text-slate-600">
                      Fecha de pago
                    </dt>

                    <dd className="text-right text-slate-900">
                      {dateFormatter(order.paidAt, true)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </DetailSection>
        </div>
      </div>
    </div>
  );
};

const DetailSection = ({ icon: Icon, title, children }: { icon: IconType; title: string; children: React.ReactNode; }) => (
  <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="mb-4 flex items-center gap-2">
      <Icon className="size-4 shrink-0 text-slate-700" />

      <h2 className="text-sm font-bold text-slate-950">
        {title}
      </h2>
    </div>

    {children}
  </section>
);