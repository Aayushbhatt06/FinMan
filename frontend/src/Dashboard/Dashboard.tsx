import { useState } from "react";
import { FileText } from "lucide-react";

import Sidebar from "./Sidebar";
import AddExpenseDrawer from "./AddExpenseDrawer";
import ReportDrawer from "./ReportDrawer";

import StatsGrid from "./Widgets/StatsGrid";
import SpendingChart from "./Widgets/SpendingChart";
import CategoryChart from "./Widgets/CategoryChart";
import RecentTransactions from "./Widgets/RecentTransactions";

import { useExpenses } from "../hooks/useExpenses";
const DEMO_USER_NAME = "Aayush";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  // All expense state + computed stats from localStorage-backed hook
  const { expenses, stats, addExpense, deleteExpense } = useExpenses();

  const currentMonthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    // bg-[#050505]
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#050505] text-white overflow-hidden">
      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "linear-gradient(transparent 0, rgba(255,255,255,0.035) 2px), linear-gradient(90deg, transparent 0, rgba(255,255,255,0.035) 2px)",
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onAddExpenseClick={() => setAddExpenseOpen(true)}
        onReportClick={() => setReportOpen(true)}
        userName={DEMO_USER_NAME}
      />

      {/* Main Content */}
      <main
        className={` relative z-20 min-h-screen flex flex-col transition-[margin] duration-300 ease-out
          ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Header */}
        <header className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 lg:px-12 sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 -ml-1 rounded-xl text-gray-400 hover:text-white transition
                ${sidebarOpen ? "opacity-0 pointer-events-none" : ""}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-linear-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                {DEMO_USER_NAME}'s Dashboard
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                Overview for {currentMonthYear}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setReportOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <FileText size={16} />
              Reports
            </button>

            <button
              onClick={() => setAddExpenseOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              + Add Expense
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-8">
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
        <footer className="mt-auto border-t border-white/5 py-6 text-center text-xs text-gray-600">
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
