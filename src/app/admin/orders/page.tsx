import { Pagination } from "@/components/ui/Pagination";
import { OrderFilters } from "@/features/admin/orders/components/OrderFilters";
import { OrdersHeader } from "@/features/admin/orders/components/OrdersHeader";
import { OrdersTable } from "@/features/admin/orders/components/OrdersTable";
import { parseOrderSearchParams } from "@/features/admin/orders/lib/parse-order-search-params";
import { getAdminOrders } from "@/features/admin/orders/services/order.service";
import { Suspense } from "react";

export default async function AdminOrdersPage({ searchParams }: PageProps<"/admin/orders">) {
  const filters = parseOrderSearchParams(await searchParams);

  const { orders, pagination, allOrders, statusCounts } = await getAdminOrders(filters);

  return <div className="mx-auto w-full max-w-350 space-y-5">
    <OrdersHeader />

    <OrderFilters filters={filters} totalOrders={allOrders} counts={statusCounts} />

    <OrdersTable orders={orders} />

    <Suspense fallback={null}>
      <Pagination totalPages={pagination.totalPages} />
    </Suspense>
  </div>;
}
