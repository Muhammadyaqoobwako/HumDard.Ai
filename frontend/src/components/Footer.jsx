import { Link } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import BrandLogo from "./BrandLogo";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/90 px-4 py-12 backdrop-blur dark:border-slate-700 dark:bg-slate-950/85 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-[1.35fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo />
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              HumDard AI
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
            Emotion-aware mentorship for students, professionals, and teams.
            Built with privacy, clarity, and progress in mind.
          </p>

          <div className="mt-5 flex items-center gap-3">
            {[GlobeAltIcon, EnvelopeIcon, ChatBubbleLeftRightIcon].map(
              (Icon, index) => (
                <span
                  key={index}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  <Icon className="h-5 w-5" />
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Product
          </p>
          <div className="mt-2 space-y-2">
            <Link
              to="/features"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Account
          </p>
          <div className="mt-2 space-y-2">
            <Link
              to="/login"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Sign up
            </Link>
            <Link
              to="/profile"
              className="block transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-7xl border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p>Copyright {year} HumDard AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy-first</span>
            <span>Secure by default</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
