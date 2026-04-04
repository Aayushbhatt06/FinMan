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

// ─── Helper: generate a date string for the current month ────
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");

const makeDate = (day: number): string =>
  `${year}-${month}-${String(day).padStart(2, "0")}`;

// ─── Sample Expenses ─────────────────────────────────────────
export let MOCK_EXPENSES: Expense[] = [
  { id: "e1",  title: "Starbucks Coffee",    amount: 450,  category: "Food",          mode: "Online", date: makeDate(1)  },
  { id: "e2",  title: "Uber Ride",           amount: 320,  category: "Travel",        mode: "Online", date: makeDate(2)  },
  { id: "e3",  title: "Shell Petrol",        amount: 2500, category: "Fuel",          mode: "Cash",   date: makeDate(3)  },
  { id: "e4",  title: "Amazon Order",        amount: 1899, category: "Shopping",      mode: "Online", date: makeDate(5)  },
  { id: "e5",  title: "Netflix Subscription",amount: 649,  category: "Entertainment", mode: "Online", date: makeDate(5)  },
  { id: "e6",  title: "Electricity Bill",    amount: 1200, category: "Bills",         mode: "Online", date: makeDate(7)  },
  { id: "e7",  title: "Gym Membership",      amount: 1500, category: "Health",        mode: "Online", date: makeDate(8)  },
  { id: "e8",  title: "Udemy Course",        amount: 499,  category: "Education",     mode: "Online", date: makeDate(10) },
  { id: "e9",  title: "BigBasket Groceries", amount: 3200, category: "Groceries",     mode: "Online", date: makeDate(12) },
  { id: "e10", title: "Subway Lunch",        amount: 380,  category: "Food",          mode: "Cash",   date: makeDate(13) },
  { id: "e11", title: "Movie Tickets",       amount: 700,  category: "Entertainment", mode: "Online", date: makeDate(15) },
  { id: "e12", title: "Zara T-Shirt",        amount: 1299, category: "Shopping",      mode: "Online", date: makeDate(17) },
  { id: "e13", title: "Auto Rickshaw",       amount: 150,  category: "Travel",        mode: "Cash",   date: makeDate(18) },
  { id: "e14", title: "Dominos Pizza",       amount: 599,  category: "Food",          mode: "Online", date: makeDate(20) },
  { id: "e15", title: "Medicines",           amount: 850,  category: "Health",        mode: "Cash",   date: makeDate(22) },
  { id: "e16", title: "Internet Bill",       amount: 999,  category: "Bills",         mode: "Online", date: makeDate(24) },
  { id: "e17", title: "Ola Cab",             amount: 275,  category: "Travel",        mode: "Online", date: makeDate(25) },
  { id: "e18", title: "Grocery Store",       amount: 1450, category: "Groceries",     mode: "Cash",   date: makeDate(26) },
];

// ─── Daily Stats (for SpendingChart) ─────────────────────────
export const MOCK_DAILY_STATS: DailyStat[] = [
  { _id: makeDate(1),  total: 450  },
  { _id: makeDate(2),  total: 320  },
  { _id: makeDate(3),  total: 2500 },
  { _id: makeDate(5),  total: 2548 },
  { _id: makeDate(7),  total: 1200 },
  { _id: makeDate(8),  total: 1500 },
  { _id: makeDate(10), total: 499  },
  { _id: makeDate(12), total: 3200 },
  { _id: makeDate(13), total: 380  },
  { _id: makeDate(15), total: 700  },
  { _id: makeDate(17), total: 1299 },
  { _id: makeDate(18), total: 150  },
  { _id: makeDate(20), total: 599  },
  { _id: makeDate(22), total: 850  },
  { _id: makeDate(24), total: 999  },
  { _id: makeDate(25), total: 275  },
  { _id: makeDate(26), total: 1450 },
];

// ─── Category Stats (for CategoryChart) ──────────────────────
export const MOCK_CATEGORY_STATS: CategoryStat[] = [
  { _id: "Food",          total: 1429 },
  { _id: "Travel",        total: 745  },
  { _id: "Fuel",          total: 2500 },
  { _id: "Shopping",      total: 3198 },
  { _id: "Entertainment", total: 1349 },
  { _id: "Bills",         total: 2199 },
  { _id: "Health",        total: 2350 },
  { _id: "Education",     total: 499  },
  { _id: "Groceries",     total: 4650 },
];

// ─── Mode Stats (Cash vs Online) ────────────────────────────
export const MOCK_MODE_STATS: ModeStat[] = [
  { _id: "Cash",   total: 5130  },
  { _id: "Online", total: 13789 },
];

// ─── Combined Dashboard Stats Object ─────────────────────────
export const MOCK_STATS: DashboardStats = {
  totalExpense: 18919,
  dailyStats: MOCK_DAILY_STATS,
  categoryStats: MOCK_CATEGORY_STATS,
  modeStats: MOCK_MODE_STATS,
};

/** Demo user name */
export const DEMO_USER_NAME = "Aayush";
