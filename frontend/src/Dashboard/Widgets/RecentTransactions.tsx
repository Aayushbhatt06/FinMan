import { Trash2 } from "lucide-react";
import { BentoCard, getCategoryStyle } from "./DashboardUI";
import type { Expense } from "../../hooks/useExpenses";

interface RecentTransactionsProps {
  expenses: Expense[];
  onDelete: (id: string) => Promise<void>;
}

const RecentTransactions = ({
  expenses,
  onDelete,
}: RecentTransactionsProps) => {
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <BentoCard className="min-h-[420px] animate-fade-in-up delay-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/[0.05]">
        <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase">
          Recent Transactions
        </h3>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold bg-white/[0.04] px-2.5 py-1 rounded-full">
          {expenses.length} Records
        </span>
      </div>

      {/* Transaction List */}
      <div className="overflow-y-auto pr-1 custom-scrollbar flex flex-col gap-1.5 max-h-[340px]">
        {sortedExpenses.length === 0 ? (
          <div className="py-16 flex items-center justify-center text-zinc-500 text-sm">
            No transactions found.
          </div>
        ) : (
          sortedExpenses.map((expense) => {
            const catStyle = getCategoryStyle(expense.category);

            return (
              <div
                key={expense.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all duration-150 group"
              >
                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold"
                    style={{
                      backgroundColor: catStyle.color + "18",
                      color: catStyle.color,
                    }}
                  >
                    {expense.category.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-zinc-200 text-sm truncate">
                      {expense.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-zinc-500">
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="text-[8px] text-zinc-600">•</span>
                      <span className="text-[10px] uppercase tracking-wide text-zinc-500 font-semibold bg-white/[0.04] px-1.5 py-0.5 rounded">
                        {expense.mode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="font-semibold text-white text-sm tabular-nums">
                    −₹{expense.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this expense?")) {
                        try {
                          await onDelete(expense.id);
                        } catch {
                          alert("Failed to delete expense");
                        }
                      }
                    }}
                    className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BentoCard>
  );
};

export default RecentTransactions;
