export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}