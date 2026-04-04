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
    <BentoCard className="min-h-[420px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/5">
        <h3 className="text-base font-semibold text-white">
          Recent Transactions
        </h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
          {expenses.length} Records
        </span>
      </div>

      {/* Transaction List */}
      <div className="overflow-y-auto pr-1 custom-scrollbar flex flex-col gap-2 max-h-[340px]">
        {sortedExpenses.length === 0 ? (
          <div className="py-16 flex items-center justify-center text-gray-500 text-sm">
            No transactions found.
          </div>
        ) : (
          sortedExpenses.map((expense) => {
            const catStyle = getCategoryStyle(expense.category);

            return (
              <div
                key={expense.id}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] transition-colors duration-150"
              >
                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${catStyle.bg}`}
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-200 text-sm truncate">
                      {expense.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-gray-500">
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="text-[8px] text-gray-600">•</span>
                      <span className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold bg-white/5 px-1.5 py-0.5 rounded">
                        {expense.mode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="font-semibold text-white text-sm tabular-nums">
                    −₹{expense.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this expense?")) {
                        try {
                          await onDelete(expense.id);
                        } catch (error) {
                          alert("Failed to delete expense");
                        }
                      }
                    }}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
