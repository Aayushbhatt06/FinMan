import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BentoCard } from "./DashboardUI";
import type { Expense } from "../../hooks/useExpenses";

interface PaymentModeChartProps {
  expenses: Expense[];
}

interface ChartDataItem {
  category: string;
  Cash: number;
  Online: number;
}

const PaymentModeChart = ({ expenses }: PaymentModeChartProps) => {
  // Build per-category cash vs online data
  const catModeMap = new Map<string, { Cash: number; Online: number }>();

  for (const e of expenses) {
    const existing = catModeMap.get(e.category) || { Cash: 0, Online: 0 };
    existing[e.mode] += e.amount;
    catModeMap.set(e.category, existing);
  }

  const data: ChartDataItem[] = [...catModeMap.entries()]
    .map(([category, modes]) => ({
      category,
      Cash: modes.Cash,
      Online: modes.Online,
    }))
    .sort((a, b) => b.Cash + b.Online - (a.Cash + a.Online));

  if (data.length === 0) {
    return (
      <BentoCard className="xl:col-span-3 flex flex-col min-h-[380px] animate-fade-in-up delay-5">
        <h3 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wide uppercase">
          Cash vs Online by Category
        </h3>
        <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
          No data yet
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard className="xl:col-span-3 flex flex-col min-h-[380px] animate-fade-in-up delay-5">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wide uppercase">
        Cash vs Online by Category
      </h3>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              stroke="#3f3f46"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={8}
              fontFamily="Inter"
              interval={0}
              angle={-35}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#3f3f46"
              fontSize={11}
              tickFormatter={(val: number) =>
                val >= 1000 ? `₹${val / 1000}k` : `₹${val}`
              }
              tickLine={false}
              axisLine={false}
              fontFamily="Inter"
            />
            <Tooltip
              contentStyle={{
                background: "#1a1b1f",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                fontFamily: "Inter",
              }}
              itemStyle={{ color: "#f4f4f5", fontSize: "13px" }}
              labelStyle={{
                color: "#71717a",
                fontSize: "11px",
                marginBottom: "4px",
                fontWeight: 500,
              }}
              formatter={(value: number) => `₹${value.toLocaleString()}`}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", fontFamily: "Inter" }}
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-zinc-400 ml-1">{value}</span>
              )}
            />
            <Bar
              dataKey="Cash"
              fill="#a78bfa"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="Online"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BentoCard>
  );
};

export default PaymentModeChart;
