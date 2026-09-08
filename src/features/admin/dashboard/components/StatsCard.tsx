import { FiBarChart2, FiFileText, FiShoppingCart, FiUsers } from "react-icons/fi";
import type { DashboardStat } from "../types/dashboard";
import { Sparkline } from "./Sparkline";

interface StatsCardProps {
  stat: DashboardStat;
  sparkline: number[];
}

const iconMap = {
  revenue: FiBarChart2,
  sales: FiShoppingCart,
  orders: FiFileText,
  users: FiUsers,
};

const iconStyles = {
  revenue: "bg-blue-50 text-blue-600",
  sales: "bg-sky-50 text-sky-600",
  orders: "bg-violet-50 text-violet-600",
  users: "bg-indigo-50 text-indigo-700",
};

export const StatsCard = ({ stat, sparkline }: StatsCardProps) => {
  const Icon = iconMap[stat.icon];

  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-around md:justify-between gap-3">
        <div>
          <div className={`mb-3 inline-flex size-9 items-center justify-center rounded-lg ${iconStyles[stat.icon]}`} >
            {stat.icon === "revenue" ? (
              <span className="text-sm font-bold">$</span>
            ) : (
              <Icon className="size-4" />
            )}
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-500">{stat.label}</p>
          <p className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-950">
            {stat.value}
          </p>
          <p className="mt-2 text-xs font-medium text-emerald-600">
            +{stat.change.toFixed(1)}%{" "}
          </p>
          <p className="text-xs font-normal text-slate-400">vs. periodo anterior</p>
        </div>

        <Sparkline data={sparkline} color={stat.sparklineColor} />
      </div>
    </article>
  );
};
