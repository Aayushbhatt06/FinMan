import { Home, PlusCircle, FileText, X } from "lucide-react";

// ─── Props ──────────────────────────────────────────────────
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddExpenseClick: () => void;
  onReportClick: () => void;
  userName: string;
}

/** Slide-out sidebar with navigation actions. */
const Sidebar = ({
  open,
  setOpen,
  onAddExpenseClick,
  onReportClick,
  userName,
}: SidebarProps) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen w-64
        bg-slate-900/95 backdrop-blur-xl
        border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="p-10 flex items-center justify-between px-4 h-16 border-b border-slate-800">
        <span className=" ml-2 text-2xl font-bold bg-linear-to-r from-blue-300 to-purple-600 bg-clip-text text-transparent">
          FinMan
        </span>
        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <X size={18} color="white" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="p-3 space-y-1 text-slate-300">
        <MenuItem icon={<Home size={18} />} label="Home" onClick={() => setOpen(false)} />

        <MenuItem
          icon={<PlusCircle size={18} />}
          label="Add Expense"
          onClick={() => {
            setOpen(false);
            onAddExpenseClick();
          }}
        />

        <MenuItem
          icon={<FileText size={18} />}
          label="Reports"
          onClick={() => {
            setOpen(false);
            onReportClick();
          }}
        />
      </nav>

      {/* Bottom User Card */}
      <div className="absolute bottom-4 left-0 w-full px-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 space-y-2">
          <div className="px-3 py-2 rounded-lg border border-slate-800">
            <p className="text-sm font-semibold text-white">
              {userName ? `${userName}'s` : "User's"}
            </p>
            <p className="text-xs text-slate-400">Personal Dashboard</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ─── Menu Item ──────────────────────────────────────────────
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MenuItem = ({ icon, label, onClick }: MenuItemProps) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer"
  >
    {icon}
    {label}
  </div>
);

export default Sidebar;
