import { BentoCard } from "./DashboardUI";

export interface MiniStatProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
}

const MiniStat = ({ label, value, sub, icon, accent, accentBg }: MiniStatProps) => (
  <BentoCard>
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
          {label}
        </p>
        <p className="text-lg font-bold text-white tracking-tight truncate">
          {value}
        </p>
        {sub && (
          <p className="text-[10px] mt-1 text-zinc-500 truncate">{sub}</p>
        )}
      </div>
      <div className={`p-2 rounded-lg shrink-0 ${accentBg}`}>
        <span className={accent}>{icon}</span>
      </div>
    </div>
  </BentoCard>
);

export default MiniStat;
