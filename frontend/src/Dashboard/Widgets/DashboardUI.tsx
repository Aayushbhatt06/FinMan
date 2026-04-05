import type { ReactNode } from "react";
import type { Category } from "../../hooks/useExpenses";

interface CategoryStyle {
  color: string;
  bg: string;
  shadow: string;
}

const CATEGORY_STYLES: Record<Category | "General", CategoryStyle> = {
  Food: { color: "#3b82f6", bg: "bg-blue-500", shadow: "shadow-blue-500/30" },
  Travel: {
    color: "#a78bfa",
    bg: "bg-violet-400",
    shadow: "shadow-violet-400/30",
  },
  Fuel: {
    color: "#34d399",
    bg: "bg-emerald-400",
    shadow: "shadow-emerald-400/30",
  },
  Shopping: {
    color: "#f472b6",
    bg: "bg-pink-400",
    shadow: "shadow-pink-400/30",
  },
  Entertainment: {
    color: "#fbbf24",
    bg: "bg-amber-400",
    shadow: "shadow-amber-400/30",
  },
  Bills: {
    color: "#f87171",
    bg: "bg-red-400",
    shadow: "shadow-red-400/30",
  },
  Health: {
    color: "#22d3ee",
    bg: "bg-cyan-400",
    shadow: "shadow-cyan-400/30",
  },
  Education: {
    color: "#38bdf8",
    bg: "bg-sky-400",
    shadow: "shadow-sky-400/30",
  },
  Groceries: {
    color: "#a3e635",
    bg: "bg-lime-400",
    shadow: "shadow-lime-400/30",
  },
  General: {
    color: "#71717a",
    bg: "bg-zinc-500",
    shadow: "shadow-zinc-500/30",
  },
};

export const getCategoryStyle = (cat: string): CategoryStyle =>
  CATEGORY_STYLES[cat as keyof typeof CATEGORY_STYLES] ??
  CATEGORY_STYLES.General;

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export const BentoCard = ({ children, className = "" }: BentoCardProps) => (
  <div
    className={`relative overflow-hidden
      bg-[#111215]/80 backdrop-blur-xl
      border border-white/[0.06] rounded-2xl p-5 sm:p-6
      transition-all duration-300 ease-out
      hover:border-white/[0.1] hover:bg-[#131518]/90
      hover:translate-y-[-1px] hover:shadow-lg hover:shadow-black/20
      ${className}`}
  >
    <div className="relative z-10 flex-1 flex flex-col w-full">{children}</div>
  </div>
);

interface TooltipPayloadItem {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#1a1b1f] border border-white/10 px-3.5 py-2.5 rounded-xl shadow-2xl shadow-black/40">
      <p className="text-zinc-500 text-[11px] font-medium mb-0.5">{label}</p>
      <p className="text-white font-bold text-sm tracking-tight">
        ₹{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};
