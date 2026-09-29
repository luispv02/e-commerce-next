
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const DashboardPeriodFilter = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPeriod = searchParams.get("period") ?? "7d";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("period", event.target.value);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="shrink-0">
      <label className="mb-1 block text-xs font-medium text-slate-500" htmlFor="dashboard-period">
        Período
      </label>
      <select
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-950 sm:w-auto"
        id="dashboard-period"
        name="period"
        value={currentPeriod}
        onChange={handleChange}
      >
        <option value="7d">7 días</option>
        <option value="30d">30 días</option>
        <option value="3m">3 meses</option>
        <option value="6m">6 meses</option>
        <option value="1y">1 año</option>
      </select>
    </div>
  );
};
