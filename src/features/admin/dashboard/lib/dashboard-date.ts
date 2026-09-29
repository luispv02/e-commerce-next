
// Returns a date in UTC adjusted to the start of the day (00:00:00)
export const startOfUtcDay = (date: Date) => {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
};

// Subtract an amount of time (days, months, years) from a date
export const subtractPeriod = (date: Date, period: { amount: number; unit: "day" | "month" | "year"; }) => {
  const result = new Date(date);

  if (period.unit === "day") {
    result.setUTCDate(result.getUTCDate() - period.amount);
  }

  if (period.unit === "month") {
    result.setUTCMonth(result.getUTCMonth() - period.amount);
  }

  if (period.unit === "year") {
    result.setUTCFullYear(result.getUTCFullYear() - period.amount);
  }

  return result;
};

// returns the date in "YYYY-MM-DD" format
export const getDateKey = (date: Date) => {
  return date.toISOString().slice(0, 10)
};

// Calculate the ISO(1-52/53) week number of a date in UTC
export const getISOWeek = (date: Date) => {
  const tmp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  const dayNum = tmp.getUTCDay() || 7;
  
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  

  return Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
};