import {
  Wallet,
  Activity,
  CreditCard,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { BentoCard } from "./DashboardUI";
import type { DashboardStats } from "../../hooks/useExpenses";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  color: string;
}

const StatCard = ({
  title,
  value,
  subValue,
  icon: Icon,
  color,
}: StatCardProps) => (
  <BentoCard>
    <div className="flex flex-col h-full gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg bg-white/5 border border-white/5 ${color}`}
        >
          <Icon size={18} />
        </div>
        <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
          {title}
        </p>
      </div>

      <div className="mt-auto pt-1">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {value}
        </h3>
        {subValue && (
          <p className="text-[11px] mt-1 font-medium text-gray-500">
            {subValue}
          </p>
        )}
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
      : "-";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <StatCard
        title="Total Spent"
        value={`₹${stats.totalExpense.toLocaleString()}`}
        icon={Wallet}
        color="text-blue-400"
      />
      <StatCard
        title="Transactions"
        value={expensesCount}
        subValue="This Month"
        icon={Activity}
        color="text-purple-400"
      />
      <StatCard
        title="Cash / Online"
        value={`₹${cashTotal.toLocaleString()} / ₹${onlineTotal.toLocaleString()}`}
        subValue="Split"
        icon={CreditCard}
        color="text-emerald-400"
      />
      <StatCard
        title="Top Category"
        value={topCategory}
        subValue="Most Active"
        icon={Layers}
        color="text-pink-400"
      />
    </div>
  );
};

export default StatsGrid;
