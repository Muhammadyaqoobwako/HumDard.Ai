import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { name: "Home", to: "/dashboard", icon: HomeIcon },
  { name: "Profile", to: "/profile", icon: UserCircleIcon },
  { name: "Live Session", to: "/live-session", icon: ChatBubbleLeftRightIcon },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="glass soft-shadow h-full w-full rounded-3xl p-3 sm:p-4 lg:sticky lg:top-24">
      <nav className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-700/60"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-red-900/20 lg:mt-6 lg:justify-start"
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
