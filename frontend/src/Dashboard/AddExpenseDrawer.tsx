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
      // Build the new expense without ID (backend will generate it)
      const newExpenseData: Omit<Expense, "id"> = {
        title,
        amount: Number(amount),
        category,
        mode: mode,
        date,
      };

      // Call the async onAdd function
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-50 w-full h-[85vh]
          bg-[#0F1219] border-t border-white/10
          rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.6)]
          transform transition-transform duration-300 ease-out flex flex-col
          ${open ? "translate-y-0 pointer-events-auto" : "translate-y-[120%] pointer-events-none"}
        `}
      >
        {/* Drag indicator */}
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-12 h-1.5 bg-linear-to-r from-blue-300 to-purple-500 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/5">
              <PlusCircle size={24} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Add Expense
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Manually or via Receipt Scan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white border border-transparent hover:border-white/10"
          >
            <X size={20} />
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
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Amount
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors">
                      <IndianRupee size={16} />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 bg-[#1A1F2E] border border-white/10 text-white font-medium rounded-xl py-3.5 px-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Date
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors">
                      <Calendar size={16} />
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 bg-[#1A1F2E] border border-white/10 text-white font-medium rounded-xl py-3.5 px-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all dark:[color-scheme:dark] text-sm"
                    />
                  </div>
                </div>
              </div>
              {/* Item Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Item Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors">
                    <ShoppingBag size={16} />
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Starbucks, Uber, Movie"
                    className="w-full pl-10 bg-[#1A1F2E] border border-white/10 text-white font-medium rounded-xl py-3.5 px-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
              {/* Category */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Category
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors">
                    <Tag size={16} />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full pl-10 bg-[#1A1F2E] border border-white/10 text-white font-medium rounded-xl py-3.5 px-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-[#0F1219] text-white py-2"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              {/* Mode (Cash/Online) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Payment Mode
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors">
                    <Tag size={16} />
                  </div>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "Cash" | "Online")
                    }
                    className="w-full pl-10 bg-[#1A1F2E] border border-white/10 text-white font-medium rounded-xl py-3.5 px-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option
                      value="Online"
                      className="bg-[#0F1219] text-white py-2"
                    >
                      Online
                    </option>
                    <option
                      value="Cash"
                      className="bg-[#0F1219] text-white py-2"
                    >
                      Cash
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Submit Button */}
        <div className="p-3 border-t border-white/5 shrink-0 bg-[#0F1219]">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-white/10"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
