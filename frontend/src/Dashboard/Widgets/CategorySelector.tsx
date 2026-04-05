import { ChevronDown } from "lucide-react";
import { getCategoryStyle } from "./DashboardUI";
import type { Category } from "../../hooks/useExpenses";
import { CATEGORIES } from "../../hooks/useExpenses";

interface CategorySelectorProps {
  selectedCategory: Category | "all";
  onSelect: (category: Category | "all") => void;
  activeCategories: Category[];
  open: boolean;
  onToggle: () => void;
}

const CategorySelector = ({
  selectedCategory,
  onSelect,
  activeCategories,
  open,
  onToggle,
}: CategorySelectorProps) => (
  <div className="relative w-full max-w-xs animate-fade-in-up delay-2 z-[60]">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#111215]/80 border border-white/[0.06] hover:border-white/[0.1] transition-all text-sm font-medium text-zinc-200"
    >
      <div className="flex items-center gap-2.5">
        {selectedCategory !== "all" && (
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: getCategoryStyle(selectedCategory).color,
            }}
          />
        )}
        <span>
          {selectedCategory === "all" ? "All Categories" : selectedCategory}
        </span>
      </div>
      <ChevronDown
        size={16}
        className={`text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>

    {open && (
      <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#141620] border border-white/[0.08] shadow-2xl shadow-black/40 z-50 overflow-hidden">
        <div className="py-1 max-h-64 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => onSelect("all")}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedCategory === "all" ? "bg-emerald-500/10 text-emerald-400" : "text-zinc-300 hover:bg-white/[0.04]"}`}
          >
            All Categories
          </button>
          {CATEGORIES.filter((c) => activeCategories.includes(c)).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2.5 ${selectedCategory === cat ? "bg-emerald-500/10 text-emerald-400" : "text-zinc-300 hover:bg-white/[0.04]"}`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: getCategoryStyle(cat).color,
                  }}
                />
                {cat}
              </button>
            ),
          )}
        </div>
      </div>
    )}
  </div>
);

export default CategorySelector;
