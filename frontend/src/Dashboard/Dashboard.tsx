import { useState } from "react";
import { FileText, User, Search } from "lucide-react";

import Sidebar from "./Sidebar";
import AddExpenseDrawer from "./AddExpenseDrawer";
import ReportDrawer from "./ReportDrawer";

import StatsGrid from "./Widgets/StatsGrid";
import SpendingChart from "./Widgets/SpendingChart";
import CategoryChart from "./Widgets/CategoryChart";
import RecentTransactions from "./Widgets/RecentTransactions";

import { useExpenses } from "../hooks/useExpenses";
const DEMO_USER_NAME = "Aayush";

type UserRole = "Admin" | "Viewer";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("Admin");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // All expense state + computed stats from localStorage-backed hook
  const { expenses, stats, addExpense, deleteExpense } = useExpenses();

  // Filter expenses based on search query
  const filteredExpenses = searchQuery.trim()
    ? expenses.filter(
        (expense) =>
          expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.amount.toString().includes(searchQuery)
      )
    : [];

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
        userRole={userRole}
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

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-400/60 transition-colors" style={{ color: searchFocused ? 'rgb(168, 85, 247)' : undefined }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                placeholder="Search expenses..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gradient-to-r from-slate-800/40 to-slate-900/40 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/15 transition-all backdrop-blur-md shadow-lg shadow-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/35"
              />
              
              {/* Search Results Dropdown */}
              {searchFocused && searchQuery.trim() && filteredExpenses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-purple-500/30 rounded-lg shadow-2xl shadow-purple-500/10 backdrop-blur-md z-50 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="p-2">
                    {filteredExpenses.slice(0, 8).map((expense) => (
                      <div
                        key={expense.id}
                        className="px-3 py-2.5 rounded-md hover:bg-slate-800/50 cursor-pointer transition-colors border border-transparent hover:border-purple-500/30 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate group-hover:text-purple-300 transition-colors">
                              {expense.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {new Date(expense.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="text-[10px] text-purple-400/70 uppercase tracking-wide font-semibold bg-purple-500/10 px-1.5 rounded">
                                {expense.category}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-white ml-3 shrink-0">
                            ₹{expense.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {filteredExpenses.length > 8 && (
                      <div className="px-3 py-2 text-center text-xs text-gray-500 border-t border-slate-700/50 mt-2 pt-2">
                        +{filteredExpenses.length - 8} more results
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* No results message */}
              {searchFocused && searchQuery.trim() && filteredExpenses.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-purple-500/20 rounded-lg shadow-2xl shadow-purple-500/5 backdrop-blur-md z-50 p-3 text-center">
                  <p className="text-sm text-gray-400">No expenses found</p>
                </div>
              )}
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

            {/* Add Expense Button - Only visible for Admin */}
            {userRole === "Admin" && (
              <button
                onClick={() => setAddExpenseOpen(true)}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
              >
                + Add Expense
              </button>
            )}

            {/* Profile Role Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all active:scale-95"
                title={`Current Role: ${userRole}`}
              >
                <User size={20} className="text-gray-300" />
              </button>

              {/* Role Switcher Dropdown */}
              {roleMenuOpen && (
                <div className="absolute right-0 top-12 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-44">
                  {/* Current Role */}
                  <div className="px-3 py-2 border-b border-slate-700">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      Role
                    </p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {userRole}
                    </p>
                  </div>

                  {/* Role Options */}
                  <div className="p-2 space-y-1">
                    {(["Admin", "Viewer"] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setUserRole(role);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all
                          ${
                            userRole === role
                              ? "bg-slate-700 text-white"
                              : "text-gray-400 hover:bg-slate-700/50 hover:text-gray-200"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              userRole === role ? "bg-gray-300" : "bg-slate-600"
                            }`}
                          />
                          {role}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Role Description */}
                  <div className="px-3 py-2 border-t border-slate-700 bg-slate-900/50">
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {userRole === "Admin"
                        ? "Can view and add expenses"
                        : "Can only view expenses"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className={`flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-8 transition-all duration-200 ${searchFocused && searchQuery.trim() ? "blur-sm opacity-40 pointer-events-none" : ""}`}>
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
        <footer className={`mt-auto border-t border-white/5 py-6 text-center text-xs text-gray-600 transition-all duration-200 ${searchFocused && searchQuery.trim() ? "blur-sm opacity-40 pointer-events-none" : ""}`}>
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
