export const dateFormatter = (date?: string | Date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}