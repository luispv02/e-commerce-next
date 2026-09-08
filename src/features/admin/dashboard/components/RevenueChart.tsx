"use client";

import { formatPrice } from "@/lib/format-price";
import { useMemo } from "react";
import { FiActivity } from "react-icons/fi";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import type { SalesPoint } from "../types/dashboard";
import { formatWeekLabel } from "../utils/format-dashboard";

interface RevenueChartProps {
  sales: SalesPoint[];
}

export const RevenueChart = ({ sales }: RevenueChartProps) => {

  const chartData = useMemo(() => {
    return sales.map((point) => ({
      label: formatWeekLabel(point.date),
      revenue: point.revenue,
    }));
  }, [sales]);

  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-slate-950">Ingresos en el tiempo</h2>

        <span className="hidden size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 sm:inline-flex">
          <FiActivity className="size-4" />
        </span>
      </div>

      <div className="mt-6 h-64 w-full min-w-0 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={28}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(value: number) =>
                value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)
              }
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

const ChartTooltip = ({ active, payload, }: { active?: boolean; payload?: { payload: { label: string; revenue: number } }[]; }) => {
  if (!active || !payload?.[0]) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      <p className="text-xs text-slate-500">{point.label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-950">
        {formatPrice(point.revenue)}
      </p>
    </div>
  );
}