import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import BrandLogo from "./BrandLogo";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  const publicLinks = [
    { name: "Home", to: "/" },
    { name: "Features", to: "/features" },
    { name: "About", to: "/about" },
    { name: "Pricing", to: "/pricing" },
    { name: "Contact", to: "/contact" },
  ];

  const appLinks = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Live Session", to: "/live-session" },
    { name: "Profile", to: "/profile" },
  ];

  const navLinks = isAuthenticated ? appLinks : publicLinks;

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-slate-950/80 bg-slate-50/90 backdrop-blur-md transition-colors dark:border-cyan-200/70 dark:bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="brand-lockup flex items-center gap-2 text-lg font-bold uppercase tracking-tight text-slate-900 dark:text-white sm:gap-3 sm:text-xl"
          onClick={closeMobile}
        >
          <BrandLogo />
          <span className="brand-name truncate">
            HumDard AI
          </span>
        </Link>

        <div className="hidden items-center gap-1 border-2 border-slate-950 bg-white/85 p-1 shadow-[4px_4px_0_rgba(15,23,42,0.8)] dark:border-cyan-200 dark:bg-slate-900/70 dark:shadow-[4px_4px_0_rgba(8,145,178,0.5)] md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3.5 py-1.5 text-sm font-medium uppercase tracking-[0.08em] transition ${
                location.pathname === item.to
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!isAuthenticated && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/?auth=login"
                className="border-2 border-slate-950 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700 dark:border-slate-300 dark:bg-slate-900 dark:text-slate-100"
              >
                Login
              </Link>
              <Link
                to="/?auth=signup"
                className="border-2 border-slate-950 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[4px_4px_0_rgba(15,23,42,0.8)] transition hover:bg-blue-700 dark:border-cyan-200 dark:shadow-[4px_4px_0_rgba(8,145,178,0.5)]"
              >
                Signup
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <span className="hidden border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 lg:inline-flex">
              {user?.name || "HumDard User"}
            </span>
          )}

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden border-2 border-slate-300 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-red-900/20 sm:inline-flex"
            >
              Logout
            </button>
          )}

          <button
            type="button"
            onClick={toggleDarkMode}
            className="border-2 border-slate-950 bg-white/90 p-2 text-slate-700 shadow-[3px_3px_0_rgba(15,23,42,0.65)] transition hover:border-blue-600 dark:border-cyan-200 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="border-2 border-slate-950 bg-white/90 p-2 text-slate-700 shadow-[3px_3px_0_rgba(15,23,42,0.65)] transition hover:border-blue-600 dark:border-cyan-200 dark:bg-slate-900 dark:text-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-3 shadow-inner dark:border-slate-700 dark:bg-slate-950/95 md:hidden">
          <nav className="space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobile}
                className={`block border px-3 py-2 text-sm font-medium uppercase tracking-[0.08em] transition ${
                  location.pathname === item.to
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="space-y-2 pt-2">
                <Link
                  to="/?auth=login"
                  onClick={closeMobile}
                  className="block border-2 border-slate-950 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700 dark:border-slate-300 dark:bg-slate-800 dark:text-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/?auth=signup"
                  onClick={closeMobile}
                  className="block border-2 border-slate-950 bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 dark:border-cyan-200"
                >
                  Signup
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 w-full border-2 border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-red-900/20"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
