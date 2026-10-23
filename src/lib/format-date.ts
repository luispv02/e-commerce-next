export const dateFormatter = (date?: string | Date, includeTime = false) => {
  if (!date) return "-";

  const value = new Date(date);

  const formattedDate = value.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = value.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();

  return includeTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
}