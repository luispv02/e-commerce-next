export type DashboardPeriod = "7d" | "30d" | "3m" | "6m" | "1y";

export type DashboardGroupBy = "day" | "week" | "month";

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  unitsSold: number;
  averageOrderValue: number;
  growth: number | null;
  newUsers: number;
}

export interface SalesPoint {
  date: string;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customerEmail: string;
  customerName: string;
  date: Date;
  total: number;
}

export interface TopProduct {
  id: string;
  name: string;
  units: number;
  revenue: number;
  image: string | null;
  percentage: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  sales: SalesPoint[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
}


export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  icon: "revenue" | "sales" | "orders" | "users";
  sparklineColor: string;
}
