import type { SalesPoint } from "../types/dashboard";

export function parseIsoWeek(value: string): { year: number; week: number } {
  const [year, week] = value.split("-W");

  return {
    year: Number(year),
    week: Number(week),
  };
}

export function isoWeekToDate(year: number, week: number): Date {
  const januaryFourth = new Date(Date.UTC(year, 0, 4));
  const day = januaryFourth.getUTCDay() || 7;
  const monday = new Date(januaryFourth);

  monday.setUTCDate(januaryFourth.getUTCDate() - day + 1 + (week - 1) * 7);

  return monday;
}

export function formatWeekLabel(weekKey: string): string {
  const { year, week } = parseIsoWeek(weekKey);
  const date = isoWeekToDate(year, week);

  const month = date.toLocaleDateString("es-MX", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return `${month} · W${week}`;
}

export function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("es-MX", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatOrderDate(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function aggregateSalesByMonth(sales: SalesPoint[]): SalesPoint[] {
  const totals = new Map<string, { label: string; revenue: number }>();

  for (const point of sales) {
    const { year, week } = parseIsoWeek(point.date);
    const date = isoWeekToDate(year, week);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    const current = totals.get(key);

    totals.set(key, {
      label: formatMonthLabel(date),
      revenue: (current?.revenue ?? 0) + point.revenue,
    });
  }

  return [...totals.values()].map((item) => ({
    date: item.label,
    revenue: item.revenue,
  }));
}
