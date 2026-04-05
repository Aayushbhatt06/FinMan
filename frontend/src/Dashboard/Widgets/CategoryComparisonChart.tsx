import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BentoCard, getCategoryStyle } from "./DashboardUI";
import type { CategoryDetail, Category } from "../../hooks/useExpenses";

interface CategoryComparisonChartProps {
  categoryDetails: CategoryDetail[];
  selectedCategory: Category | "all";
}

const CategoryComparisonChart = ({
  categoryDetails,
  selectedCategory,
}: CategoryComparisonChartProps) => (
  <BentoCard className="min-h-[400px] flex flex-col animate-fade-in-up delay-3">
    <h3 className="text-sm font-semibold text-zinc-300 mb-4 tracking-wide uppercase">
      Category Comparison
    </h3>
    {categoryDetails.length > 0 ? (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={categoryDetails}
            margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
            barCategoryGap="18%"
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
              angle={-30}
              textAnchor="end"
              height={55}
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
              labelStyle={{
                color: "#71717a",
                fontSize: "11px",
                fontWeight: 500,
              }}
              itemStyle={{ color: "#f4f4f5", fontSize: "13px" }}
              formatter={(value): [string, string] => {
                const num = Number(value || 0);
                return [`₹${num.toLocaleString()}`, "Total"];
              }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {categoryDetails.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getCategoryStyle(entry.category).color}
                  opacity={
                    selectedCategory === "all" ||
                      selectedCategory === entry.category
                      ? 1
                      : 0.2
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
        No data yet
      </div>
    )}
  </BentoCard>
);

export default CategoryComparisonChart;
