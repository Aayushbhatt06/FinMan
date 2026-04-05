import type { Expense } from "../hooks/useExpenses";

/** Escape a CSV field – wrap in quotes if it contains comma, quote, or newline */
const escapeField = (value: string): string =>
  /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

/**
 * Converts an array of expenses into a downloadable CSV file.
 * Filters by the given month/year, builds the CSV string, and triggers a
 * browser download.
 *
 * @returns The number of matching rows (0 means nothing was exported).
 */
export function downloadExpensesCSV(
  expenses: Expense[],
  month: number,
  year: number,
): number {
  // Filter expenses for the selected month & year
  const filtered = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() + 1 === month && d.getFullYear() === year;
  });

  if (filtered.length === 0) return 0;

  const headers = ["Title", "Amount (₹)", "Category", "Payment Mode", "Date"];

  const rows = filtered.map((e) =>
    [
      escapeField(e.title),
      e.amount.toFixed(2),
      e.category,
      e.mode,
      new Date(e.date).toLocaleDateString("en-IN"),
    ].join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `expenses_${year}_${String(month).padStart(2, "0")}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return filtered.length;
}
