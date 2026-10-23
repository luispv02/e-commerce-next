import clsx from "clsx";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import type { OrderStatus } from "@/features/orders/types/orders";
import { orderStatusConfig } from "../lib/order-formatters";

const icons = { PENDING: FiClock, PAID: FiCheckCircle, CANCELLED: FiXCircle };

export const AdminOrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const Icon = icons[status];
  const config = orderStatusConfig[status];

  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", config.className)}>
      <Icon className="size-3" />{config.label}
    </span>
  )
};
