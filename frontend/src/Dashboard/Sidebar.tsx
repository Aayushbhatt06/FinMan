import {
  Home,
  PlusCircle,
  FileText,
  BarChart3,
  X,
  Sun,
  Moon,
} from "lucide-react";

// ─── Props ──────────────────────────────────────────────────
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddExpenseClick: () => void;
  onReportClick: () => void;
  onCategoryClick: () => void;
  userName: string;
  userRole?: "Admin" | "Viewer";
  theme?: "dark" | "light";
  onThemeChange?: (theme: "dark" | "light") => void;
  activePage?: "dashboard" | "categories";
}

/** Slide-out sidebar with navigation actions. */
const Sidebar = ({
  open,
  setOpen,
  onAddExpenseClick,
  onReportClick,
  onCategoryClick,
  userName,
  userRole = "Admin",
  theme = "dark",
  onThemeChange,
  activePage = "dashboard",
}: SidebarProps) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen w-64
        backdrop-blur-xl
        border-r
        transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        ${
          theme === "dark"
            ? "bg-[#0c0d10]/95 border-white/[0.06]"
            : "bg-white/90 border-gray-200"
        }
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-5 h-16 border-b transition-colors duration-200 ${
          theme === "dark" ? "border-white/[0.06]" : "border-gray-200"
        }`}
      >
        <span className="text-xl font-bold text-emerald-400 tracking-tight">
          FinMan
        </span>
        <button
          onClick={() => setOpen(false)}
          className={`p-2 rounded-lg transition ${
            theme === "dark"
              ? "hover:bg-white/[0.05] text-zinc-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <nav
        className={`p-3 space-y-0.5 ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
      >
        <MenuItem
          icon={<Home size={17} />}
          label="Dashboard"
          onClick={() => setOpen(false)}
          theme={theme}
          active={activePage === "dashboard"}
        />

        <MenuItem
          icon={<BarChart3 size={17} />}
          label="Categories"
          onClick={() => {
            setOpen(false);
            onCategoryClick();
          }}
          theme={theme}
          active={activePage === "categories"}
        />

        {/* Add Expense - Only for Admin */}
        {userRole === "Admin" && (
          <MenuItem
            icon={<PlusCircle size={17} />}
            label="Add Expense"
            onClick={() => {
              setOpen(false);
              onAddExpenseClick();
            }}
            theme={theme}
          />
        )}

        <MenuItem
          icon={<FileText size={17} />}
          label="Reports"
          onClick={() => {
            setOpen(false);
            onReportClick();
          }}
          theme={theme}
        />

        {/* Theme Switcher */}
        <div
          className={`mt-6 pt-6 border-t ${theme === "dark" ? "border-white/[0.06]" : "border-gray-200"}`}
        >
          <p
            className={`text-[10px] font-semibold uppercase tracking-wider mb-3 px-3 ${
              theme === "dark" ? "text-zinc-600" : "text-gray-400"
            }`}
          >
            Appearance
          </p>
          <div className="space-y-0.5">
            <button
              onClick={() => onThemeChange?.("dark")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                theme === "dark"
                  ? "bg-white/[0.05] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Moon size={15} />
              Dark
            </button>
            <button
              onClick={() => onThemeChange?.("light")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                theme === "light"
                  ? "bg-gray-200 text-gray-900"
                  : theme === "dark"
                    ? "text-zinc-400 hover:bg-white/[0.04]"
                    : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Sun size={15} />
              Light
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom User Card */}
      <div className="absolute bottom-4 left-0 w-full px-3">
        <div
          className={`rounded-xl border p-3 space-y-2 transition-colors duration-200 ${
            theme === "dark"
              ? "border-white/[0.06] bg-white/[0.02]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div
            className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
              theme === "dark" ? "border-white/[0.05]" : "border-gray-200"
            }`}
          >
            <p
              className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {userName ? `${userName}'s` : "User's"}
            </p>
            <p
              className={`text-[11px] ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              Personal Dashboard
            </p>
          </div>
          <div
            className={`px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
              theme === "dark"
                ? "bg-white/[0.02] border-white/[0.05]"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <p
              className={`text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}
            >
              Role
            </p>
            <p
              className={`text-sm font-semibold ${
                userRole === "Admin"
                  ? theme === "dark"
                    ? "text-emerald-400"
                    : "text-emerald-700"
                  : theme === "dark"
                    ? "text-zinc-400"
                    : "text-gray-600"
              }`}
            >
              {userRole}
            </p>
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
  theme?: "dark" | "light";
  active?: boolean;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  theme = "dark",
  active = false,
}: MenuItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-all ${
      active
        ? theme === "dark"
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-emerald-50 text-emerald-700"
        : theme === "dark"
          ? "hover:bg-white/[0.04] hover:text-white"
          : "hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    {icon}
    {label}
  </div>
);

export default Sidebar;
