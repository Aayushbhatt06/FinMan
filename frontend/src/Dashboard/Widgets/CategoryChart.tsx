import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BentoCard, CustomTooltip, getCategoryStyle } from "./DashboardUI";
import type { CategoryStat } from "../../hooks/useExpenses";

interface CategoryChartProps {
  data: CategoryStat[];
  total: number;
}

const CategoryChart = ({ data, total }: CategoryChartProps) => (
  <BentoCard className="flex flex-col min-h-[380px] animate-fade-in-up delay-4">
    <h3 className="text-sm font-semibold text-zinc-300 mb-2 shrink-0 tracking-wide uppercase">
      Breakdown
    </h3>

    {data.length > 0 ? (
      <>
        <div className="h-48 relative w-full shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="total"
                nameKey="_id"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getCategoryStyle(entry._id).color}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-zinc-500 text-[10px] font-medium uppercase tracking-wider">
              Total
            </span>
            <span className="text-xl font-bold text-white tracking-tight">
              ₹{(total / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full overflow-y-auto custom-scrollbar mt-3">
          <div className="flex flex-wrap justify-center content-start gap-2">
            {data.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getCategoryStyle(entry._id).color }}
                />
                <span className="text-[11px] font-medium text-zinc-400 whitespace-nowrap">
                  {entry._id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
        No data yet
      </div>
    )}
  </BentoCard>
);

export default CategoryChart;
