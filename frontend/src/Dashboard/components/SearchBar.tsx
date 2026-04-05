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
            searchFocused
              ? theme === "dark"
                ? "text-emerald-400"
                : "text-emerald-600"
              : theme === "dark"
                ? "text-zinc-500"
                : "text-gray-400"
          }`}
        >
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => onSearchFocus(true)}
          onBlur={() => setTimeout(() => onSearchFocus(false), 150)}
          placeholder="Search expenses..."
          className={`w-full pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-1 transition-all text-sm ${
            theme === "dark"
              ? "bg-white/[0.04] border-white/[0.06] text-white placeholder-zinc-600 focus:border-emerald-500/40 focus:ring-emerald-500/15 hover:border-white/[0.1]"
              : "bg-gray-100/60 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
          }`}
        />

        {/* Search Results Dropdown */}
        {searchFocused && searchQuery.trim() && filteredExpenses.length > 0 && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 border rounded-xl shadow-2xl backdrop-blur-xl z-50 max-h-[400px] overflow-y-auto custom-scrollbar transition-colors duration-200 ${
              theme === "dark"
                ? "bg-[#141620]/95 border-white/[0.08] shadow-black/40"
                : "bg-white/95 border-gray-200 shadow-gray-400/10"
            }`}
          >
            <div className="p-1.5">
              {filteredExpenses.slice(0, 8).map((expense) => (
                <div
                  key={expense.id}
                  className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "hover:bg-white/[0.04] group"
                      : "hover:bg-gray-100 group"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate transition-colors ${
                          theme === "dark"
                            ? "text-zinc-200 group-hover:text-emerald-300"
                            : "text-gray-900 group-hover:text-emerald-600"
                        }`}
                      >
                        {expense.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
                        >
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded ${
                            theme === "dark"
                              ? "text-zinc-400 bg-white/[0.04]"
                              : "text-gray-600 bg-gray-100"
                          }`}
                        >
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ml-3 shrink-0 tabular-nums ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹{expense.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              {filteredExpenses.length > 8 && (
                <div
                  className={`px-3 py-2 text-center text-xs mt-1 pt-2 border-t ${
                    theme === "dark"
                      ? "text-zinc-500 border-white/[0.05]"
                      : "text-gray-500 border-gray-200"
                  }`}
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
              className={`absolute top-full left-0 right-0 mt-2 border rounded-xl shadow-2xl backdrop-blur-xl z-50 p-3 text-center transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-[#141620]/95 border-white/[0.06]"
                  : "bg-white/95 border-gray-200"
              }`}
            >
              <p
                className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
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
