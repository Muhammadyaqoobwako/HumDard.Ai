import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../contexts/AuthContext";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};

    if (!formData.fullName.trim())
      nextErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!formData.password) nextErrors.password = "Password is required.";
    if (!formData.confirmPassword)
      nextErrors.confirmPassword = "Confirm Password is required.";
    if (formData.password && formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (requestError) {
      setErrors({ form: requestError.message || "Signup failed. Try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              Start your mentorship journey with a web-first experience.
            </h2>
            <p className="mt-4 text-sm text-blue-100">
              Build better routines, get emotional support, and grow with guided
              AI conversations.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-blue-100/90">
              <li>Create your account in under a minute.</li>
              <li>Get a personalized dashboard after onboarding.</li>
              <li>Use voice or text sessions based on your comfort.</li>
            </ul>
          </div>
          <p className="text-xs text-blue-100/90">
            Secure onboarding • Responsive interface • Dark and light modes
          </p>
        </div>

        <div className="w-full p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-sm space-y-6 lg:p-2">
            <div className="flex flex-col items-center gap-4">
              <BrandLogo size="lg" rounded={false} />
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  HumDard AI
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Create your account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form ? (
                <p className="text-sm text-red-500">{errors.form}</p>
              ) : null}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:text-white"
                  placeholder="Your full name"
                />
                {errors.fullName ? (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:text-white"
                  placeholder="your.email@gmail.com"
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative flex items-center border-b-2 border-slate-200 transition focus-within:border-blue-600 dark:border-slate-600">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                {errors.password ? (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative flex items-center border-b-2 border-slate-200 transition focus-within:border-blue-600 dark:border-slate-600">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-transparent px-0 py-3 text-sm text-gray-900 outline-none dark:text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="ml-2 text-slate-500 transition hover:text-blue-600"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-slate-800"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign In
              </Link>
            </p>

            <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              Your onboarding details help HumDard AI provide more relevant
              support plans, mood insights, and session suggestions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
