import { BestSellingProducts } from "@/features/admin/dashboard/components/BestSellingProducts";
import { DashboardHeader } from "@/features/admin/dashboard/components/DashboardHeader";
import { DashboardPeriodFilter } from "@/features/admin/dashboard/components/DashboardPeriodFilter";
import { RecentOrders } from "@/features/admin/dashboard/components/RecentOrders";
import { RevenueChart } from "@/features/admin/dashboard/components/RevenueChart";
import { StatsCard } from "@/features/admin/dashboard/components/StatsCard";
import { getDashboardData } from "@/features/admin/dashboard/services/dashboard.service";
import type { DashboardPeriod, DashboardStat } from "@/features/admin/dashboard/types/dashboard";
import { formatPrice } from "@/lib/format-price";

interface AdminPageProps {
  searchParams: Promise<{
    period?: DashboardPeriod;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {

  const params = await searchParams;

  const period = params.period ?? "7d";

  const { summary, sales, recentOrders, topProducts, } = await getDashboardData(period);

  const stats: DashboardStat[] = [
    {
      id: "revenue",
      label: "Ingresos totales",
      value: formatPrice(summary.totalRevenue),
      icon: "revenue",
      sparklineColor: "#2563EB",
    },
    {
      id: "sales",
      label: "Ventas (unidades)",
      value: String(summary.unitsSold),
      icon: "sales",
      sparklineColor: "#10B981",
    },
    {
      id: "orders",
      label: "Número de pedidos",
      value: String(summary.totalOrders),
      icon: "orders",
      sparklineColor: "#8B5CF6",
    },
    {
      id: "users",
      label: "Usuarios registrados",
      value: String(summary.newUsers),
      icon: "users",
      sparklineColor: "#F59E0B",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-350 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <DashboardHeader />
        <DashboardPeriodFilter />
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </section>

      <RevenueChart sales={sales} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 items-start">
        <RecentOrders orders={recentOrders} />
        <BestSellingProducts products={topProducts} />
      </div>
    </div>
  );
}
