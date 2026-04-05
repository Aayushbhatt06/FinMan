import { useState } from "react";
import {
  TrendingUp,
  Hash,
  Zap,
  Calculator,
  PieChart as PieChartIcon,
  ArrowLeft,
} from "lucide-react";
import type { Category, DashboardStats } from "../../hooks/useExpenses";

import MiniStat from "./MiniStat";
import CategorySelector from "./CategorySelector";
import CategoryComparisonChart from "./CategoryComparisonChart";
import CategoryOverviewTable from "./CategoryOverviewTable";

interface CategoryAnalysisProps {
  stats: DashboardStats;
  onBack: () => void;
}

const CategoryAnalysis = ({ stats, onBack }: CategoryAnalysisProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedDetail =
    selectedCategory === "all"
      ? undefined
      : stats.categoryDetails.find((d) => d.category === selectedCategory);

  const activeCategories = stats.categoryDetails.map((d) => d.category);

  return (
    <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center gap-4 animate-fade-in-up delay-1">
        <button
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Category Analysis
          </h2>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Deep dive into spending by category
          </p>
        </div>
      </div>

      {/* Category Selector */}
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setDropdownOpen(false);
        }}
        activeCategories={activeCategories}
        open={dropdownOpen}
        onToggle={() => setDropdownOpen(!dropdownOpen)}
      />

      {/* Selected Category Detail Cards */}
      {selectedDetail && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 animate-scale-in">
          <MiniStat
            label="Total Spent"
            value={`₹${selectedDetail.total.toLocaleString()}`}
            icon={<TrendingUp size={16} />}
            accent="text-emerald-400"
            accentBg="bg-emerald-500/10"
          />
          <MiniStat
            label="Transactions"
            value={selectedDetail.count.toString()}
            icon={<Hash size={16} />}
            accent="text-blue-400"
            accentBg="bg-blue-500/10"
          />
          <MiniStat
            label="Highest Payment"
            value={`₹${selectedDetail.highestPayment.toLocaleString()}`}
            sub={selectedDetail.highestPaymentTitle}
            icon={<Zap size={16} />}
            accent="text-amber-400"
            accentBg="bg-amber-500/10"
          />
          <MiniStat
            label="Average"
            value={`₹${Math.round(selectedDetail.averageAmount).toLocaleString()}`}
            icon={<Calculator size={16} />}
            accent="text-cyan-400"
            accentBg="bg-cyan-500/10"
          />
          <MiniStat
            label="% of Total"
            value={`${selectedDetail.percentage.toFixed(1)}%`}
            icon={<PieChartIcon size={16} />}
            accent="text-violet-400"
            accentBg="bg-violet-500/10"
          />
        </div>
      )}

      {/* Bar Chart */}
      <CategoryComparisonChart
        categoryDetails={stats.categoryDetails}
        selectedCategory={selectedCategory}
      />

      {/* Detail Table */}
      <CategoryOverviewTable
        categoryDetails={stats.categoryDetails}
        onCategorySelect={setSelectedCategory}
      />
    </div>
  );
};

export default CategoryAnalysis;
