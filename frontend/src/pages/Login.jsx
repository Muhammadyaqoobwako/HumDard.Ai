import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({ email, password });
      navigate(from, { replace: true });
    } catch (requestError) {
      setError("Authentication failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-surface min-h-[calc(100vh-78px)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden border-2 border-slate-950 bg-white/80 shadow-[8px_8px_0_rgba(15,23,42,0.9)] backdrop-blur dark:border-cyan-200 dark:bg-slate-800/70 dark:shadow-[8px_8px_0_rgba(8,145,178,0.55)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 to-cyan-600 p-10 text-white lg:flex lg:p-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
              HumDard AI
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">
              Your web mentorship hub for calm, focused growth.
            </h2>
            <p className="mt-4 text-sm text-blue-100">
              Continue your sessions, track emotional progress, and talk to your
              assistant in real time.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-blue-100/90">
              <li>Track your mood trends and session outcomes over time.</li>
              <li>Resume previous conversations without losing context.</li>
              <li>Access voice and chat support in one focused workspace.</li>
            </ul>
          </div>
          <p className="text-xs text-blue-100/90">
            Private by design • Built for students, professionals, and teams
          </p>
        </div>

        <div className="w-full p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-sm space-y-6 lg:p-2">
            <div className="flex flex-col items-center gap-4">
              <BrandLogo size="lg" rounded={false} className="rounded-full" />
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  HumDard AI
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Sign in to your account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:text-white"
                  placeholder="official.expert@gmail.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative flex items-center border-b-2 border-slate-200 transition focus-within:border-blue-600 dark:border-slate-600">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-transparent px-0 py-3 text-sm text-gray-900 outline-none dark:text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-2 text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-slate-800"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              By signing in, you can continue your previous guidance history,
              saved goals, and personalized support recommendations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
