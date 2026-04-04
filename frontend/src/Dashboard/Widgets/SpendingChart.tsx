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
  <BentoCard className="xl:col-span-2 flex flex-col min-h-[380px]">
    <h3 className="text-base font-semibold text-white mb-4">
      Spending Activity
    </h3>

    <div className="flex-1 w-full min-h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1a1f2e"
            vertical={false}
          />
          <XAxis
            dataKey="_id"
            tickFormatter={(str: string) => str.slice(8)}
            stroke="#374151"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#374151"
            fontSize={11}
            tickFormatter={(val: number) => `₹${val / 1000}k`}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#8B5CF6",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8B5CF6"
            strokeWidth={2.5}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </BentoCard>
);

export default SpendingChart;
