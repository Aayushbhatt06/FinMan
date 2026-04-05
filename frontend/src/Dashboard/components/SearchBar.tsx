import { Search } from "lucide-react";
import type { Expense } from "../../hooks/useExpenses";

interface SearchBarProps {
  theme: "dark" | "light";
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchFocused: boolean;
  onSearchFocus: (focused: boolean) => void;
  filteredExpenses: Expense[];
}

const SearchBar = ({
  theme,
  searchQuery,
  onSearchChange,
  searchFocused,
  onSearchFocus,
  filteredExpenses,
}: SearchBarProps) => {
  return (
    <div className="hidden md:flex flex-1 max-w-xs mx-8">
      <div className="relative w-full">
        <div
          className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors ${
            theme === "dark" ? "text-purple-400/60" : "text-purple-600/60"
          }`}
          style={{
            color: searchFocused
              ? theme === "dark"
                ? "rgb(168, 85, 247)"
                : "rgb(147, 51, 234)"
              : undefined,
          }}
        >
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => onSearchFocus(true)}
          onBlur={() => setTimeout(() => onSearchFocus(false), 150)}
          placeholder="Search expenses..."
          className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all backdrop-blur-md shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-r from-slate-800/40 to-slate-900/40 border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500/40 focus:ring-purple-500/15 shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-500/35"
              : "bg-gradient-to-r from-white/40 to-gray-100/40 border-purple-400/30 text-gray-900 placeholder-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20 shadow-purple-400/10 hover:shadow-purple-400/15 hover:border-purple-500/40"
          }`}
        />

        {/* Search Results Dropdown */}
        {searchFocused && searchQuery.trim() && filteredExpenses.length > 0 && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 border rounded-lg shadow-2xl backdrop-blur-md z-50 max-h-[400px] overflow-y-auto custom-scrollbar transition-colors duration-200 ${theme === "dark" ? "bg-slate-900/95 border-purple-500/30 shadow-purple-500/10" : "bg-white/95 border-purple-400/40 shadow-purple-400/5"}`}
          >
            <div className="p-2">
              {filteredExpenses.slice(0, 8).map((expense) => (
                <div
                  key={expense.id}
                  className={`px-3 py-2.5 rounded-md cursor-pointer transition-colors border border-transparent ${theme === "dark" ? "hover:bg-slate-800/50 hover:border-purple-500/30 group" : "hover:bg-gray-100 hover:border-purple-400/30 group"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate transition-colors ${theme === "dark" ? "group-hover:text-purple-300" : "text-gray-900 group-hover:text-purple-600"}`}
                      >
                        {expense.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}
                        >
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 rounded ${theme === "dark" ? "text-purple-400/70 bg-purple-500/10" : "text-purple-600/70 bg-purple-500/10"}`}
                        >
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ml-3 shrink-0 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      ₹{expense.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              {filteredExpenses.length > 8 && (
                <div
                  className={`px-3 py-2 text-center text-xs mt-2 pt-2 border-t ${theme === "dark" ? "text-gray-500 border-slate-700/50" : "text-gray-600 border-gray-200"}`}
                >
                  +{filteredExpenses.length - 8} more results
                </div>
              )}
            </div>
          </div>
        )}

        {/* No results message */}
        {searchFocused &&
          searchQuery.trim() &&
          filteredExpenses.length === 0 && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 border rounded-lg shadow-2xl backdrop-blur-md z-50 p-3 text-center transition-colors duration-200 ${theme === "dark" ? "bg-slate-900/95 border-purple-500/20 shadow-purple-500/5" : "bg-white/95 border-purple-400/20 shadow-purple-400/5"}`}
            >
              <p
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                No expenses found
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchBar;
