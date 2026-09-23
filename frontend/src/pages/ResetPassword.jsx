import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (password.length < 6 || password !== confirmPassword) {
      setError("Use at least 6 characters and make both passwords match.");
      return;
    }
    try {
      await resetPassword(searchParams.get("token"), password);
      setMessage("Password reset successfully. You can now log in.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (requestError) {
      setError(requestError.message || "This reset link is invalid or expired.");
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <form onSubmit={submit} className="w-full space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reset password</h1>
        <input required type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        <input required type="password" minLength="6" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">Update password</button>
      </form>
    </main>
  );
}

export default ResetPassword;
