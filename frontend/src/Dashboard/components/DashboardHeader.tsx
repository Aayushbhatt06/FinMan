import { FileText, BarChart3 } from "lucide-react";
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
  activePage: "dashboard" | "categories";
  onPageChange: (page: "dashboard" | "categories") => void;
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
  activePage,
  onPageChange,
}: DashboardHeaderProps) => {
  return (
    <header
      className={`h-16 sm:h-[72px] flex items-center justify-between px-4 sm:px-8 lg:px-12 sticky top-0 z-30 backdrop-blur-xl shrink-0 transition-colors duration-200 border-b ${
        theme === "dark"
          ? "bg-[#09090b]/80 border-white/[0.05]"
          : "bg-white/60 border-gray-200/50"
      }`}
    >
      {/* Left Section: Hamburger & Title */}
      <div className="flex items-center gap-4 sm:gap-5">
        <button
          onClick={onSidebarToggle}
          className={`p-2 -ml-1 rounded-xl transition ${
            theme === "dark"
              ? "text-zinc-500 hover:text-white hover:bg-white/[0.05]"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } ${sidebarOpen ? "opacity-0 pointer-events-none" : ""}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            className={`text-lg sm:text-xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {userName}'s Dashboard
          </h1>
          <p
            className={`text-[11px] font-medium ${
              theme === "dark" ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            {currentMonthYear}
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
      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={() => onPageChange("categories")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium text-sm transition-all ${
            activePage === "categories"
              ? theme === "dark"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : theme === "dark"
                ? "text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
          }`}
        >
          <BarChart3 size={15} />
          Categories
        </button>

        <button
          onClick={onReportClick}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium text-sm transition-all border ${
            theme === "dark"
              ? "text-zinc-400 hover:text-white hover:bg-white/[0.05] border-transparent"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent"
          }`}
        >
          <FileText size={15} />
          Reports
        </button>

        {userRole === "Admin" && (
          <button
            onClick={onAddExpenseClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              theme === "dark"
                ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            + Add
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
