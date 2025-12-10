/**
 *
 * @description Change the format of the dates to dd/mm/yyyy
 * @param date - The date to format
 * @returns The formatted date
 *
 * */
export function formatDate(stringDate: string) {
  const date = new Date(stringDate);

  if (date?.toISOString() === "Invalid Date") {
    console.info("Invalid date", stringDate);
    return date;
  }

  return new Date(date)?.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
