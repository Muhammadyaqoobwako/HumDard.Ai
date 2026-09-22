import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function AuthModal({ mode, onClose, onSwitchMode }) {
  const { login, signup } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = mode === "login";

  const close = () => {
    setError("");
    onClose();
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!loginData.email.trim() || !loginData.password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: loginData.email, password: loginData.password });
      close();
    } catch (requestError) {
      setError(requestError.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!signupData.name.trim() || !signupData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        fullName: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });
      close();
    } catch (requestError) {
      setError(requestError.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        role="button"
        tabIndex={0}
        aria-label="Close modal overlay"
        onClick={close}
        onKeyDown={(event) => event.key === "Enter" && close()}
      />

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
              HumDard AI
            </p>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isLogin ? "Login" : "Create Account"}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(event) =>
                    setLoginData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(event) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={loginData.remember}
                    onChange={(event) =>
                      setLoginData((prev) => ({
                        ...prev,
                        remember: event.target.checked,
                      }))
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-semibold text-blue-600 hover:underline dark:text-blue-300"
                >
                  Forgot password?
                </button>
              </div>

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(event) =>
                    setSignupData((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(event) =>
                    setSignupData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="password"
                  value={signupData.password}
                  onChange={(event) =>
                    setSignupData((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Password"
                />
                <input
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(event) =>
                    setSignupData((prev) => ({
                      ...prev,
                      confirmPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Confirm"
                />
              </div>

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
              >
                {isLoading ? "Creating account..." : "Signup"}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => onSwitchMode(isLogin ? "signup" : "login")}
            className="mt-4 w-full text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
          >
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default AuthModal;
