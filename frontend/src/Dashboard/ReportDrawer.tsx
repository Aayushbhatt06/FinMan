import { useState } from "react";
import { X, Download, FileText, Calendar, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { downloadExpensesCSV } from "../utils/csvExport";
import type { Expense } from "../hooks/useExpenses";

// ─── Props ──────────────────────────────────────────────────
interface ReportDrawerProps {
  open: boolean;
  onClose: () => void;
  expenses: Expense[];
}

// ─── Tiny reusable select ───────────────────────────────────
const SELECT_CLS =
  "w-full bg-white/[0.04] border border-white/[0.06] text-white font-medium rounded-xl py-3.5 pl-10 pr-8 outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 transition-all appearance-none cursor-pointer hover:border-white/[0.1]";

const IconSelect = ({
  icon: Icon,
  value,
  onChange,
  label,
  children,
}: {
  icon: typeof Calendar;
  value: number;
  onChange: (v: number) => void;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
        <Icon size={16} />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={SELECT_CLS}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-600">
        <ChevronDown size={16} />
      </div>
    </div>
  </div>
);

// ─── Constants ──────────────────────────────────────────────
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

// ─── Component ──────────────────────────────────────────────
const ReportDrawer = ({ open, onClose, expenses }: ReportDrawerProps) => {
  const [month, setMonth] = useState(NOW.getMonth() + 1);
  const [year, setYear] = useState(CURRENT_YEAR);

  const handleDownload = () => {
    try {
      const count = downloadExpensesCSV(expenses, month, year);
      if (count === 0) {
        toast.error(`No expenses found for ${MONTHS[month - 1]} ${year}`);
      } else {
        toast.success(`Exported ${count} expense(s) for ${MONTHS[month - 1]} ${year}`);
        onClose();
      }
    } catch (err) {
      console.error("CSV export failed:", err);
      toast.error("Failed to export CSV. Check console for details.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-x-0 bottom-0 z-50 w-full bg-[#0c0d10] border-t border-white/[0.06] rounded-t-3xl shadow-[0_-10px_60px_rgba(0,0,0,0.5)] transform transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-zinc-700 rounded-full" />
        </div>

        <div className="p-6 pb-10 max-w-lg mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                <FileText size={20} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Monthly Statement</h2>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Export your expenses as CSV</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/[0.04] rounded-full hover:bg-white/[0.08] transition text-zinc-400 hover:text-white border border-white/[0.06]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <IconSelect icon={Calendar} value={year} onChange={setYear} label="Year">
                {YEARS.map((y) => <option key={y} value={y} className="bg-[#0c0d10] text-white py-2">{y}</option>)}
              </IconSelect>
              <IconSelect icon={FileText} value={month} onChange={setMonth} label="Month">
                {MONTHS.map((m, i) => <option key={i} value={i + 1} className="bg-[#0c0d10] text-white py-2">{m}</option>)}
              </IconSelect>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3.5 mt-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Download size={18} />
              Download Statement
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDrawer;
