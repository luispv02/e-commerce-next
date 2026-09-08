export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  unitsSold: number;
  averageOrderValue: number;
  growth: number;
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
  date: string;
  total: number;
}

export interface TopProduct {
  id: string;
  name: string;
  units: number;
  revenue: number;
  image: string;
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
  change: number;
  icon: "revenue" | "sales" | "orders" | "users";
  sparklineColor: string;
}
