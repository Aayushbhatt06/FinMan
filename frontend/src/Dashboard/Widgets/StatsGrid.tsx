import {
  TrendingUp,
  ArrowUpDown,
  Banknote,
  Crown,
  Calculator,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { BentoCard } from "./DashboardUI";
import type { DashboardStats } from "../../hooks/useExpenses";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  accentColor: string;
  accentBg: string;
  delay: number;
}

const StatCard = ({
  title,
  value,
  subValue,
  icon: Icon,
  accentColor,
  accentBg,
  delay,
}: StatCardProps) => (
  <BentoCard className={`animate-fade-in-up delay-${delay}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
          {value}
        </h3>
        {subValue && (
          <p className="text-[11px] mt-1.5 font-medium text-zinc-500">
            {subValue}
          </p>
        )}
      </div>
      <div
        className={`p-2.5 rounded-xl shrink-0 ${accentBg}`}
      >
        <Icon size={18} className={accentColor} />
      </div>
    </div>
  </BentoCard>
);

interface StatsGridProps {
  stats: DashboardStats;
  expensesCount: number;
}

const StatsGrid = ({ stats, expensesCount }: StatsGridProps) => {
  const cashTotal = stats.modeStats.find((s) => s._id === "Cash")?.total ?? 0;
  const onlineTotal =
    stats.modeStats.find((s) => s._id === "Online")?.total ?? 0;

  const topCategory =
    stats.categoryStats.length > 0
      ? [...stats.categoryStats].sort((a, b) => b.total - a.total)[0]._id
      : "—";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      <StatCard
        title="Total Spent"
        value={`₹${stats.totalExpense.toLocaleString()}`}
        icon={TrendingUp}
        accentColor="text-emerald-400"
        accentBg="bg-emerald-500/10"
        delay={1}
      />
      <StatCard
        title="Transactions"
        value={expensesCount}
        subValue="This Month"
        icon={ArrowUpDown}
        accentColor="text-blue-400"
        accentBg="bg-blue-500/10"
        delay={2}
      />
      <StatCard
        title="Cash / Online"
        value={`₹${cashTotal.toLocaleString()}`}
        subValue={`₹${onlineTotal.toLocaleString()} online`}
        icon={Banknote}
        accentColor="text-violet-400"
        accentBg="bg-violet-500/10"
        delay={3}
      />
      <StatCard
        title="Top Category"
        value={topCategory}
        subValue="Most Active"
        icon={Crown}
        accentColor="text-amber-400"
        accentBg="bg-amber-500/10"
        delay={4}
      />
      <StatCard
        title="Avg / Txn"
        value={`₹${Math.round(stats.averageExpense).toLocaleString()}`}
        subValue="Per transaction"
        icon={Calculator}
        accentColor="text-cyan-400"
        accentBg="bg-cyan-500/10"
        delay={5}
      />
      <StatCard
        title="Highest"
        value={
          stats.highestExpense
            ? `₹${stats.highestExpense.amount.toLocaleString()}`
            : "—"
        }
        subValue={stats.highestExpense?.title ?? ""}
        icon={Zap}
        accentColor="text-rose-400"
        accentBg="bg-rose-500/10"
        delay={6}
      />
    </div>
  );
};

export default StatsGrid;
