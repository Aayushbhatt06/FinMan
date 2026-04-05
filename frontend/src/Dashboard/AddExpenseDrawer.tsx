import { useEffect, useState } from "react";
import {
  X,
  PlusCircle,
  Calendar,
  IndianRupee,
  Tag,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { CATEGORIES, type Category, type Expense } from "../hooks/useExpenses";

// ─── Props ──────────────────────────────────────────────────
interface AddExpenseDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (expense: Omit<Expense, "id">) => Promise<Expense>;
}

/** Bottom sheet drawer for adding a new expense. */
const AddExpenseDrawer = ({ open, onClose, onAdd }: AddExpenseDrawerProps) => {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [mode, setMode] = useState<"Cash" | "Online">("Online");
  const [loading, setLoading] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // Reset form when drawer closes
  useEffect(() => {
    if (!open) {
      setAmount("");
      setTitle("");
      setCategory("Food");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [open]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!amount || !title) {
      toast.error("Please enter Amount & Item Name");
      return;
    }

    setLoading(true);

    try {
      const newExpenseData: Omit<Expense, "id"> = {
        title,
        amount: Number(amount),
        category,
        mode: mode,
        date,
      };

      await onAdd(newExpenseData);

      toast.success("Expense added successfully!");
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add expense",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 bg-white/[0.04] border border-white/[0.06] text-white font-medium rounded-xl py-3.5 px-4 outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 transition-all placeholder:text-zinc-600 hover:border-white/[0.1]";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-50 w-full h-[85vh]
          bg-[#0c0d10] border-t border-white/[0.06]
          rounded-t-3xl shadow-[0_-10px_60px_rgba(0,0,0,0.5)]
          transform transition-transform duration-300 ease-out flex flex-col
          ${open ? "translate-y-0 pointer-events-auto" : "translate-y-[120%] pointer-events-none"}
        `}
      >
        {/* Drag indicator */}
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-zinc-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
              <PlusCircle size={20} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Add Expense
              </h2>
              <p className="text-[11px] text-zinc-500 font-medium mt-0.5">
                Track your spending
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/[0.04] rounded-full hover:bg-white/[0.08] transition text-zinc-400 hover:text-white border border-white/[0.06]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            {/* Manual Fields */}
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
                    Amount
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      <IndianRupee size={16} />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
                    Date
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      <Calendar size={16} />
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${inputClass} dark:[color-scheme:dark] text-sm`}
                    />
                  </div>
                </div>
              </div>
              {/* Item Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Item Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    <ShoppingBag size={16} />
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Starbucks, Uber, Movie"
                    className={inputClass}
                  />
                </div>
              </div>
              {/* Category */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Category
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    <Tag size={16} />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    {CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-[#0c0d10] text-white py-2"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-600">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              {/* Mode (Cash/Online) */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Payment Mode
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    <Tag size={16} />
                  </div>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "Cash" | "Online")
                    }
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option
                      value="Online"
                      className="bg-[#0c0d10] text-white py-2"
                    >
                      Online
                    </option>
                    <option
                      value="Cash"
                      className="bg-[#0c0d10] text-white py-2"
                    >
                      Cash
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-600">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Submit Button */}
        <div className="p-3 border-t border-white/[0.05] shrink-0 bg-[#0c0d10]">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Expense"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseDrawer;
