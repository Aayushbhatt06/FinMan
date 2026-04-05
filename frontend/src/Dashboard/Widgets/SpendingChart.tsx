import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BentoCard, CustomTooltip } from "./DashboardUI";
import type { DailyStat } from "../../hooks/useExpenses";

interface SpendingChartProps {
  data: DailyStat[];
}

const SpendingChart = ({ data }: SpendingChartProps) => (
  <BentoCard className="xl:col-span-2 flex flex-col min-h-[380px] animate-fade-in-up delay-3">
    <h3 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wide uppercase">
      Spending Activity
    </h3>

    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="_id"
            tickFormatter={(str: string) => str.slice(8)}
            stroke="#3f3f46"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
            fontFamily="Inter"
          />
          <YAxis
            stroke="#3f3f46"
            fontSize={11}
            tickFormatter={(val: number) => `₹${val / 1000}k`}
            tickLine={false}
            axisLine={false}
            fontFamily="Inter"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#10b981",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </BentoCard>
);

export default SpendingChart;
