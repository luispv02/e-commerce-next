import Link from "next/link";
import type { AdminOrderFilters } from "../types/orders";
import { OrderStatus } from "@/features/orders/types/orders";

interface OrderFiltersProps {
  filters: AdminOrderFilters;
  totalOrders: number;
  counts: Record<OrderStatus, number>;
}

const statusOptions = [
  {
    value: undefined,
    label: "Todos"
  },
  {
    value: "PENDING",
    label: "Pendientes"
  },
  {
    value: "PAID",
    label: "Pagados"
  },
  {
    value: "CANCELLED",
    label: "Cancelados"
  },
] as const;

export const OrderFilters = ({ filters, totalOrders, counts }: OrderFiltersProps) => {
  
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusOptions.map(({ value, label }) => {
          
          const active = filters.status === value;
          const count = value ? counts[value] : totalOrders;
          const params = new URLSearchParams();
          if (value) params.set("status", value.toLowerCase());

          return (
            <Link
              key={label}
              href={`/admin/orders${params.size ? `?${params}` : ""}`}
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
              {label} ({count})
            </Link>
          );
        })}
      </div>
    </div>
  );
}
