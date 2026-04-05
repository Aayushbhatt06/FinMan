import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import AddExpenseDrawer from "./AddExpenseDrawer";
import ReportDrawer from "./ReportDrawer";
import DashboardHeader from "./components/DashboardHeader";

import StatsGrid from "./Widgets/StatsGrid";
import SpendingChart from "./Widgets/SpendingChart";
import CategoryChart from "./Widgets/CategoryChart";
import RecentTransactions from "./Widgets/RecentTransactions";

import { useExpenses } from "../hooks/useExpenses";
const DEMO_USER_NAME = "Aayush";

type UserRole = "Admin" | "Viewer";
type Theme = "dark" | "light";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("Admin");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [theme, setThemeState] = useState<Theme>("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    }
  }, []);

  // Wrapper function to update both state and localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("app-theme", newTheme);
  };

  // All expense state + computed stats from localStorage-backed hook
  const { expenses, stats, addExpense, deleteExpense } = useExpenses();

  // Filter expenses based on search query
  const filteredExpenses = searchQuery.trim()
    ? expenses.filter(
        (expense) =>
          expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.amount.toString().includes(searchQuery),
      )
    : [];

  const currentMonthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a0a0a] to-[#050505] text-white"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            theme === "dark"
              ? "linear-gradient(transparent 0, rgba(255,255,255,0.035) 2px), linear-gradient(90deg, transparent 0, rgba(255,255,255,0.035) 2px)"
              : "linear-gradient(transparent 0, rgba(0,0,0,0.02) 2px), linear-gradient(90deg, transparent 0, rgba(0,0,0,0.02) 2px)",
          backgroundSize: "48px 48px",
          mixBlendMode: "overlay",
          opacity: 0.9,
        }}
        aria-hidden="true"
      />

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 backdrop-blur-sm z-30 transition-colors duration-200 ${
            theme === "dark" ? "bg-black/80" : "bg-black/40"
          }`}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onAddExpenseClick={() => setAddExpenseOpen(true)}
        onReportClick={() => setReportOpen(true)}
        userName={DEMO_USER_NAME}
        userRole={userRole}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Main Content */}
      <main
        className={` relative z-20 min-h-screen flex flex-col transition-[margin] duration-300 ease-out
          ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Header */}
        <DashboardHeader
          theme={theme}
          sidebarOpen={sidebarOpen}
          userName={DEMO_USER_NAME}
          currentMonthYear={currentMonthYear}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          userRole={userRole}
          onUserRoleChange={setUserRole}
          roleMenuOpen={roleMenuOpen}
          onRoleMenuToggle={() => setRoleMenuOpen(!roleMenuOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchFocused={searchFocused}
          onSearchFocus={setSearchFocused}
          filteredExpenses={filteredExpenses}
          onReportClick={() => setReportOpen(true)}
          onAddExpenseClick={() => setAddExpenseOpen(true)}
        />

        {/* Dashboard Content */}
        <div
          className={`flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-8 transition-all duration-200 ${searchFocused && searchQuery.trim() ? "blur-sm opacity-40 pointer-events-none" : ""}`}
        >
          <StatsGrid stats={stats} expensesCount={expenses.length} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 min-h-[400px]">
            <SpendingChart data={stats.dailyStats} />
            <CategoryChart
              data={stats.categoryStats}
              total={stats.totalExpense}
            />
          </div>

          <RecentTransactions expenses={expenses} onDelete={deleteExpense} />
        </div>

        {/* Footer */}
        <footer
          className={`mt-auto border-t py-6 text-center text-xs transition-all duration-200 ${theme === "dark" ? "border-white/5 text-gray-600" : "border-gray-200 text-gray-500"} ${searchFocused && searchQuery.trim() ? "blur-sm opacity-30 pointer-events-none" : ""}`}
        >
          Built with ♥ by {DEMO_USER_NAME} · Demo Mode
        </footer>
      </main>

      {/* Drawers */}
      <AddExpenseDrawer
        open={addExpenseOpen}
        onClose={() => setAddExpenseOpen(false)}
        onAdd={addExpense}
      />
      <ReportDrawer open={reportOpen} onClose={() => setReportOpen(false)} />
    </div>
  );
};

export default Dashboard;
