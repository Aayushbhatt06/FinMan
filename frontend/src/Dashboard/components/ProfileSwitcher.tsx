import { LogOut } from "lucide-react";

interface ProfileSwitcherProps {
  theme: "dark" | "light";
  userRole: "Admin" | "Viewer";
  onUserRoleChange: (role: "Admin" | "Viewer") => void;
  roleMenuOpen: boolean;
  onRoleMenuToggle: () => void;
}

const ProfileSwitcher = ({
  theme,
  userRole,
  onUserRoleChange,
  roleMenuOpen,
  onRoleMenuToggle,
}: ProfileSwitcherProps) => {
  return (
    <div className="relative">
      <button
        onClick={onRoleMenuToggle}
        className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-xs transition-all duration-300 border ${
          theme === "dark"
            ? "bg-white/[0.06] text-zinc-300 border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.12]"
            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
        }`}
      >
        {userRole === "Admin" ? "A" : "V"}
      </button>

      {/* Dropdown Menu */}
      {roleMenuOpen && (
        <div
          className={`absolute top-full right-0 mt-2 w-52 rounded-xl border shadow-2xl backdrop-blur-xl z-50 ${
            theme === "dark"
              ? "bg-[#141620]/95 border-white/[0.08] shadow-black/40"
              : "bg-white/95 border-gray-200 shadow-gray-300/30"
          }`}
        >
          <div className="p-2">
            {/* Admin Option */}
            <button
              onClick={() => {
                onUserRoleChange("Admin");
                onRoleMenuToggle();
              }}
              className={`w-full p-2.5 rounded-lg text-left mb-1 transition-all border ${
                userRole === "Admin"
                  ? theme === "dark"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-emerald-50 border-emerald-200"
                  : `border-transparent ${
                      theme === "dark"
                        ? "hover:bg-white/[0.04]"
                        : "hover:bg-gray-100"
                    }`
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      userRole === "Admin"
                        ? theme === "dark"
                          ? "text-emerald-400"
                          : "text-emerald-700"
                        : theme === "dark"
                          ? "text-zinc-200"
                          : "text-gray-900"
                    }`}
                  >
                    Admin
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      theme === "dark" ? "text-zinc-500" : "text-gray-500"
                    }`}
                  >
                    Full access
                  </p>
                </div>
                {userRole === "Admin" && (
                  <div
                    className={`w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"
                    }`}
                  />
                )}
              </div>
            </button>

            {/* Viewer Option */}
            <button
              onClick={() => {
                onUserRoleChange("Viewer");
                onRoleMenuToggle();
              }}
              className={`w-full p-2.5 rounded-lg text-left mb-1 transition-all border ${
                userRole === "Viewer"
                  ? theme === "dark"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-emerald-50 border-emerald-200"
                  : `border-transparent ${
                      theme === "dark"
                        ? "hover:bg-white/[0.04]"
                        : "hover:bg-gray-100"
                    }`
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      userRole === "Viewer"
                        ? theme === "dark"
                          ? "text-emerald-400"
                          : "text-emerald-700"
                        : theme === "dark"
                          ? "text-zinc-200"
                          : "text-gray-900"
                    }`}
                  >
                    Viewer
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      theme === "dark" ? "text-zinc-500" : "text-gray-500"
                    }`}
                  >
                    View only
                  </p>
                </div>
                {userRole === "Viewer" && (
                  <div
                    className={`w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"
                    }`}
                  />
                )}
              </div>
            </button>

            {/* Divider */}
            <div
              className={`my-1.5 h-px ${
                theme === "dark" ? "bg-white/[0.05]" : "bg-gray-200"
              }`}
            />

            {/* Logout Button */}
            <button
              className={`w-full p-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                theme === "dark"
                  ? "hover:bg-red-500/10 text-zinc-500 hover:text-red-400"
                  : "hover:bg-red-50 text-gray-500 hover:text-red-600"
              }`}
              onClick={() => onRoleMenuToggle()}
            >
              <LogOut size={14} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitcher;
