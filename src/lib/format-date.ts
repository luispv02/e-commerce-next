export const dateFormatter = (date?: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}