import { Home, PlusCircle, FileText, X, Sun, Moon } from "lucide-react";

// ─── Props ──────────────────────────────────────────────────
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddExpenseClick: () => void;
  onReportClick: () => void;
  userName: string;
  userRole?: "Admin" | "Viewer";
  theme?: "dark" | "light";
  onThemeChange?: (theme: "dark" | "light") => void;
}

/** Slide-out sidebar with navigation actions. */
const Sidebar = ({
  open,
  setOpen,
  onAddExpenseClick,
  onReportClick,
  userName,
  userRole = "Admin",
  theme = "dark",
  onThemeChange,
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
            ? "bg-slate-900/95 border-slate-800"
            : "bg-white/90 border-gray-200"
        }
      `}
    >
      {/* Header */}
      <div
        className={`p-10 flex items-center justify-between px-4 h-16 border-b transition-colors duration-200 ${
          theme === "dark" ? "border-slate-800" : "border-gray-200"
        }`}
      >
        <span className="ml-2 text-2xl font-bold bg-linear-to-r from-blue-300 to-purple-600 bg-clip-text text-transparent">
          FinMan
        </span>
        <button
          onClick={() => setOpen(false)}
          className={`p-2 rounded-lg transition ${
            theme === "dark"
              ? "hover:bg-slate-800 text-white"
              : "hover:bg-gray-200 text-gray-900"
          }`}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <nav
        className={`p-3 space-y-1 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}
      >
        <MenuItem
          icon={<Home size={18} />}
          label="Home"
          onClick={() => setOpen(false)}
          theme={theme}
        />

        {/* Add Expense - Only for Admin */}
        {userRole === "Admin" && (
          <MenuItem
            icon={<PlusCircle size={18} />}
            label="Add Expense"
            onClick={() => {
              setOpen(false);
              onAddExpenseClick();
            }}
            theme={theme}
          />
        )}

        <MenuItem
          icon={<FileText size={18} />}
          label="Reports"
          onClick={() => {
            setOpen(false);
            onReportClick();
          }}
          theme={theme}
        />

        {/* Theme Switcher */}
        <div
          className={`mt-6 pt-6 border-t ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-wide mb-3 ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}
          >
            Theme
          </p>
          <div className="space-y-1">
            <button
              onClick={() => onThemeChange?.("dark")}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                theme === "dark"
                  ? theme === "dark"
                    ? "bg-slate-800 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  : `text-gray-700 hover:bg-gray-100 ${theme === "light" ? "bg-gray-100" : ""}`
              }`}
            >
              <Moon size={16} />
              Dark Mode
            </button>
            <button
              onClick={() => onThemeChange?.("light")}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                theme === "light"
                  ? "bg-gray-200 text-gray-900"
                  : theme === "dark"
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Sun size={16} />
              Light Mode
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom User Card */}
      <div className="absolute bottom-4 left-0 w-full px-3">
        <div
          className={`rounded-lg border p-3 space-y-2 transition-colors duration-200 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-900/50"
              : "border-gray-200 bg-gray-100/50"
          }`}
        >
          <div
            className={`px-3 py-2 rounded-md border transition-colors duration-200 ${
              theme === "dark" ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <p
              className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {userName ? `${userName}'s` : "User's"}
            </p>
            <p
              className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}
            >
              Personal Dashboard
            </p>
          </div>
          <div
            className={`px-3 py-1.5 rounded-md border transition-colors duration-200 ${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-700"
                : "bg-gray-200/50 border-gray-300"
            }`}
          >
            <p
              className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}
            >
              Role
            </p>
            <p
              className={`text-sm font-semibold ${
                userRole === "Admin"
                  ? theme === "dark"
                    ? "text-slate-300"
                    : "text-gray-900"
                  : theme === "dark"
                    ? "text-gray-400"
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
}

const MenuItem = ({ icon, label, onClick, theme = "dark" }: MenuItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
      theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
    }`}
  >
    {icon}
    {label}
  </div>
);

export default Sidebar;
