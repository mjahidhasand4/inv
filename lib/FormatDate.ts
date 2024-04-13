import { format } from "date-fns";

export const formatDate = (date: Date | string): string => {
  try {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate ? format(parsedDate, "dd MMMM, yyyy") : "";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};