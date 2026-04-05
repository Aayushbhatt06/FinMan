import { FileText } from "lucide-react";
import SearchBar from "./SearchBar";
import ProfileSwitcher from "./ProfileSwitcher";
import type { Expense } from "../../hooks/useExpenses";

interface DashboardHeaderProps {
  theme: "dark" | "light";
  sidebarOpen: boolean;
  userName: string;
  currentMonthYear: string;
  onSidebarToggle: () => void;
  userRole: "Admin" | "Viewer";
  onUserRoleChange: (role: "Admin" | "Viewer") => void;
  roleMenuOpen: boolean;
  onRoleMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchFocused: boolean;
  onSearchFocus: (focused: boolean) => void;
  filteredExpenses: Expense[];
  onReportClick: () => void;
  onAddExpenseClick: () => void;
}

const DashboardHeader = ({
  theme,
  sidebarOpen,
  userName,
  currentMonthYear,
  onSidebarToggle,
  userRole,
  onUserRoleChange,
  roleMenuOpen,
  onRoleMenuToggle,
  searchQuery,
  onSearchChange,
  searchFocused,
  onSearchFocus,
  filteredExpenses,
  onReportClick,
  onAddExpenseClick,
}: DashboardHeaderProps) => {
  return (
    <header
      className={`h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 lg:px-12 sticky top-0 z-30 backdrop-blur-xl shrink-0 transition-colors duration-200 border-b ${
        theme === "dark"
          ? "bg-[#050505]/80 border-white/5"
          : "bg-white/60 border-gray-200/50"
      }`}
    >
      {/* Left Section: Hamburger & Title */}
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={onSidebarToggle}
          className={`p-2 -ml-1 rounded-xl transition ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          } ${sidebarOpen ? "opacity-0 pointer-events-none" : ""}`}
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
          <h1
            className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${
              theme === "dark"
                ? "bg-linear-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
                : "text-purple-700"
            }`}
          >
            {userName}'s Dashboard
          </h1>
          <p
            className={`text-[11px] sm:text-xs font-medium ${
              theme === "dark" ? "text-gray-500" : "text-gray-600"
            }`}
          >
            Overview for {currentMonthYear}
          </p>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <SearchBar
        theme={theme}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchFocused={searchFocused}
        onSearchFocus={onSearchFocus}
        filteredExpenses={filteredExpenses}
      />

      {/* Right Section: Action Buttons */}
      <div className="hidden sm:flex items-center gap-3">
        <button
          onClick={onReportClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all active:scale-95 ${
            theme === "dark"
              ? "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              : "bg-gray-900 text-white hover:bg-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.15)]"
          }`}
        >
          <FileText size={16} />
          Reports
        </button>

        {userRole === "Admin" && (
          <button
            onClick={onAddExpenseClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all active:scale-95 ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : "bg-gray-900 text-white hover:bg-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            }`}
          >
            + Add Expense
          </button>
        )}

        <ProfileSwitcher
          theme={theme}
          userRole={userRole}
          onUserRoleChange={onUserRoleChange}
          roleMenuOpen={roleMenuOpen}
          onRoleMenuToggle={onRoleMenuToggle}
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
