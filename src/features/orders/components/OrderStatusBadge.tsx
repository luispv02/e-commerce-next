import clsx from "clsx";
import type { OrderStatus } from "../types/orders";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700",
  },
  PAID: {
    label: "Pagada",
    className: "bg-emerald-50 text-emerald-700",
  },
  CANCELLED: {
    label: "Cancelada",
    className: "bg-red-50 text-red-700",
  },
};

export const OrderStatusBadge = ({ status, className }: OrderStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span className={clsx("inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", config.className, className)}>
      {config.label}
    </span>
  );
};
