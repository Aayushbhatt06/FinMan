import { useState, useEffect, useCallback } from "react";

// ─── Type Definitions (moved from mockData) ──────────────────
export const CATEGORIES = [
  "Food",
  "Travel",
  "Fuel",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Groceries",
  "General",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Payment mode */
export type PaymentMode = "Cash" | "Online";

/** Single expense record */
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  mode: PaymentMode;
  date: string; // ISO date string
}

/** Daily spending aggregate (for the area chart) */
export interface DailyStat {
  _id: string; // formatted as YYYY-MM-DD
  total: number;
}

/** Category spending aggregate (for the pie chart) */
export interface CategoryStat {
  _id: Category;
  total: number;
}

/** Mode spending aggregate */
export interface ModeStat {
  _id: PaymentMode;
  total: number;
}

/** Dashboard summary statistics */
export interface DashboardStats {
  totalExpense: number;
  dailyStats: DailyStat[];
  categoryStats: CategoryStat[];
  modeStats: ModeStat[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// ─── Frontend Aggregation Functions ──────────────────────────

// Compute dashboard stats from the raw expense list
function computeStats(expenses: Expense[]): DashboardStats {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Daily aggregation
  const dailyMap = new Map<string, number>();
  for (const e of expenses) {
    dailyMap.set(e.date, (dailyMap.get(e.date) ?? 0) + e.amount);
  }
  const dailyStats: DailyStat[] = [...dailyMap.entries()]
    .map(([_id, total]) => ({ _id, total }))
    .sort((a, b) => a._id.localeCompare(b._id));

  // Category aggregation
  const catMap = new Map<Category, number>();
  for (const e of expenses) {
    catMap.set(e.category, (catMap.get(e.category) ?? 0) + e.amount);
  }
  const categoryStats: CategoryStat[] = [...catMap.entries()]
    .map(([_id, total]) => ({ _id, total }))
    .sort((a, b) => b.total - a.total);

  // Mode aggregation
  const modeMap = new Map<string, number>();
  for (const e of expenses) {
    modeMap.set(e.mode, (modeMap.get(e.mode) ?? 0) + e.amount);
  }
  const modeStats: ModeStat[] = [
    { _id: "Cash", total: modeMap.get("Cash") ?? 0 },
    { _id: "Online", total: modeMap.get("Online") ?? 0 },
  ];

  return { totalExpense, dailyStats, categoryStats, modeStats };
}

// ─── API Functions ──────────────────────────────────────────

async function fetchExpenses(): Promise<Expense[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`);
    if (!response.ok) throw new Error("Failed to fetch expenses");
    return response.json();
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
}

async function createExpense(expense: Omit<Expense, "id">): Promise<Expense> {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error("Failed to create expense");
    return response.json();
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
}

async function deleteExpenseAPI(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete expense");
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
}

// ─── Custom Hook ────────────────────────────────────────────

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch expenses on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const data = await fetchExpenses();
        setExpenses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const addExpense = useCallback(async (expense: Omit<Expense, "id">) => {
    try {
      const newExpense = await createExpense(expense);
      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add expense");
      throw err;
    }
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await deleteExpenseAPI(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete expense");
      throw err;
    }
  }, []);

  const stats = computeStats(expenses);

  return { expenses, stats, addExpense, deleteExpense, loading, error };
}
