export const DashboardPeriodFilter = () => {

  return (
    <div className="shrink-0">
      <label className="mb-1 block text-xs font-medium text-slate-500" htmlFor="dashboard-period">
        Período
      </label>
      <select
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-950 sm:w-auto"
        defaultValue="7d"
        id="dashboard-period"
        name="period"
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
