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
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ring-1 ${
          theme === "dark"
            ? "bg-gradient-to-br from-purple-600 to-purple-800 text-white ring-purple-400/30 hover:ring-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
            : "bg-gradient-to-br from-purple-500 to-purple-600 text-white ring-purple-400/40 hover:ring-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20"
        } transform hover:scale-105`}
      >
        {userRole === "Admin" ? "A" : "V"}
      </button>

      {/* Dropdown Menu */}
      {roleMenuOpen && (
        <div
          className={`absolute top-full right-0 mt-3 w-56 rounded-xl border shadow-2xl backdrop-blur-md z-50 transform transition-all duration-200 origin-top-right ${
            theme === "dark"
              ? "bg-slate-900/95 border-purple-500/30 shadow-purple-500/15"
              : "bg-white/95 border-purple-400/40 shadow-purple-400/10"
          }`}
        >
          <div className="p-3">
            {/* Admin Option */}
            <button
              onClick={() => {
                onUserRoleChange("Admin");
                onRoleMenuToggle();
              }}
              className={`w-full p-3 rounded-lg text-left mb-2 transition-all border ${
                userRole === "Admin"
                  ? theme === "dark"
                    ? "bg-purple-600/30 border-purple-500/50"
                    : "bg-purple-500/20 border-purple-400/50"
                  : `border-transparent ${
                      theme === "dark"
                        ? "hover:bg-slate-800/50"
                        : "hover:bg-gray-100"
                    }`
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-purple-200" : "text-purple-700"
                    }`}
                  >
                    Admin
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Full access to all features
                  </p>
                </div>
                {userRole === "Admin" && (
                  <div
                    className={`w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-purple-400" : "bg-purple-600"
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
              className={`w-full p-3 rounded-lg text-left mb-2 transition-all border ${
                userRole === "Viewer"
                  ? theme === "dark"
                    ? "bg-purple-600/30 border-purple-500/50"
                    : "bg-purple-500/20 border-purple-400/50"
                  : `border-transparent ${
                      theme === "dark"
                        ? "hover:bg-slate-800/50"
                        : "hover:bg-gray-100"
                    }`
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-purple-200" : "text-purple-700"
                    }`}
                  >
                    Viewer
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    View expenses only
                  </p>
                </div>
                {userRole === "Viewer" && (
                  <div
                    className={`w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-purple-400" : "bg-purple-600"
                    }`}
                  />
                )}
              </div>
            </button>

            {/* Divider */}
            <div
              className={`my-2 h-px ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0"
                  : "bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0"
              }`}
            />

            {/* Logout Button */}
            <button
              className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-transparent ${
                theme === "dark"
                  ? "hover:bg-red-600/20 hover:border-red-500/30 text-red-400 hover:text-red-300"
                  : "hover:bg-red-500/10 hover:border-red-400/20 text-red-600 hover:text-red-700"
              }`}
              onClick={() => {
                // Just close the menu for now - logout logic can be added later
                onRoleMenuToggle();
              }}
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitcher;
