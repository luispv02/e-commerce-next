import type { OrderStatus } from "@/features/orders/types/orders";

export const formatOrderNumber = (id: string) => `#ORD-${id.slice(-6).toUpperCase()}`;

export const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-700"
  },
  PAID: {
    label: "Pagado",
    className: "bg-emerald-100 text-emerald-700"
  },
  CANCELLED: {
    label: "Cancelado",
    className: "bg-rose-100 text-rose-700"
  }
};
