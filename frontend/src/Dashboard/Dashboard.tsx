import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import AddExpenseDrawer from "./AddExpenseDrawer";
import ReportDrawer from "./ReportDrawer";
import DashboardHeader from "./components/DashboardHeader";

import StatsGrid from "./Widgets/StatsGrid";
import SpendingChart from "./Widgets/SpendingChart";
import CategoryChart from "./Widgets/CategoryChart";
import PaymentModeChart from "./Widgets/PaymentModeChart";
import RecentTransactions from "./Widgets/RecentTransactions";
import CategoryAnalysis from "./Widgets/CategoryAnalysis";

import { useExpenses } from "../hooks/useExpenses";
const DEMO_USER_NAME = "Aayush";

type UserRole = "Admin" | "Viewer";
type Theme = "dark" | "light";
type Page = "dashboard" | "categories";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("Admin");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [theme, setThemeState] = useState<Theme>("dark");
  const [activePage, setActivePage] = useState<Page>("dashboard");

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

  // All expense state + computed stats from API-backed hook
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
          ? "bg-[#09090b] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 backdrop-blur-sm z-30 transition-colors duration-200 ${
            theme === "dark" ? "bg-black/70" : "bg-black/30"
          }`}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onAddExpenseClick={() => setAddExpenseOpen(true)}
        onReportClick={() => setReportOpen(true)}
        onCategoryClick={() => {
          setActivePage("categories");
        }}
        userName={DEMO_USER_NAME}
        userRole={userRole}
        theme={theme}
        onThemeChange={setTheme}
        activePage={activePage}
      />

      {/* Main Content */}
      <main
        className={`relative z-20 min-h-screen flex flex-col transition-[margin] duration-300 ease-out
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
          activePage={activePage}
          onPageChange={setActivePage}
        />

        {/* Page Content */}
        {activePage === "categories" ? (
          <CategoryAnalysis
            stats={stats}
            onBack={() => setActivePage("dashboard")}
          />
        ) : (
          <div
            className={`flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-6 transition-all duration-200 ${searchFocused && searchQuery.trim() ? "blur-sm opacity-40 pointer-events-none" : ""}`}
          >
            <StatsGrid stats={stats} expensesCount={expenses.length} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 min-h-[400px]">
              <SpendingChart data={stats.dailyStats} />
              <CategoryChart
                data={stats.categoryStats}
                total={stats.totalExpense}
              />
            </div>

            {/* New Payment Mode Chart */}
            <PaymentModeChart expenses={expenses} />

            <RecentTransactions expenses={expenses} onDelete={deleteExpense} />
          </div>
        )}

        {/* Footer */}
        <footer
          className={`mt-auto border-t py-5 text-center text-xs transition-all duration-200 ${
            theme === "dark"
              ? "border-white/[0.04] text-zinc-600"
              : "border-gray-200 text-gray-400"
          } ${searchFocused && searchQuery.trim() ? "blur-sm opacity-30 pointer-events-none" : ""}`}
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
      <ReportDrawer open={reportOpen} onClose={() => setReportOpen(false)} expenses={expenses} />
    </div>
  );
};

export default Dashboard;
