import { BentoCard, getCategoryStyle } from "./DashboardUI";
import type { CategoryDetail, Category } from "../../hooks/useExpenses";

interface CategoryOverviewTableProps {
  categoryDetails: CategoryDetail[];
  onCategorySelect: (category: Category) => void;
}

const CategoryOverviewTable = ({
  categoryDetails,
  onCategorySelect,
}: CategoryOverviewTableProps) => (
  <BentoCard className="animate-fade-in-up delay-4">
    <h3 className="text-sm font-semibold text-zinc-300 mb-5 tracking-wide uppercase">
      All Categories Overview
    </h3>

    {categoryDetails.length > 0 ? (
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left py-3 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-right py-3 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Total
              </th>
              <th className="text-right py-3 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Txns
              </th>
              <th className="text-right py-3 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Highest
              </th>
              <th className="text-right py-3 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Average
              </th>
              <th className="text-right py-3 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryDetails.map((detail, index) => {
              const style = getCategoryStyle(detail.category);
              return (
                <tr
                  key={index}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
                  onClick={() => onCategorySelect(detail.category)}
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{
                          backgroundColor: style.color + "18",
                          color: style.color,
                        }}
                      >
                        {detail.category.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-zinc-200">
                        {detail.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right font-semibold text-white tabular-nums">
                    ₹{detail.total.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-right text-zinc-400 tabular-nums">
                    {detail.count}
                  </td>
                  <td className="py-3.5 px-3 text-right text-zinc-400 tabular-nums">
                    ₹{detail.highestPayment.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-right text-zinc-400 tabular-nums">
                    ₹{Math.round(detail.averageAmount).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${detail.percentage}%`,
                            backgroundColor: style.color,
                          }}
                        />
                      </div>
                      <span className="text-zinc-400 tabular-nums text-xs w-10 text-right">
                        {detail.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="py-12 text-center text-zinc-500 text-sm">
        No categories to display. Add some expenses first.
      </div>
    )}
  </BentoCard>
);

export default CategoryOverviewTable;
