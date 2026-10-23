import type { OrderStatus } from "@/features/orders/types/orders";
import type { AdminOrderFilters } from "../types/orders";

type SearchParams = Record<string, string | string[] | undefined>;

const validStatuses: OrderStatus[] = ["PENDING", "PAID", "CANCELLED"];

export const parseOrderSearchParams = (params: SearchParams): AdminOrderFilters => {

  const pageValue = Number(params.page)
  const statusValue = String(params.status).toUpperCase() as OrderStatus | undefined;

  return {
    page: Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1,
    ...(statusValue && validStatuses.includes(statusValue) ? { status: statusValue } : {}),
  };
};
