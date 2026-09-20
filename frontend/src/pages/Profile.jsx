import { CameraIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [preview, setPreview] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass soft-shadow mx-auto w-full max-w-2xl rounded-3xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
          Update your personal details, manage account security, and keep your
          mentorship profile ready for better recommendations.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Profile completeness", "86%"],
            ["Security level", "Good"],
            ["Last updated", "Today"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-600 dark:bg-slate-700/40"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {label}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-blue-300 bg-slate-100 dark:bg-slate-700">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <UserCircleIcon className="h-12 w-12 text-slate-400 dark:text-slate-300" />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <CameraIcon className="h-4 w-4" />
              Upload Picture
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-100">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-100">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-100">
              Update Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-cyan-600"
          >
            Edit Profile
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-600 dark:bg-slate-700/40">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
            Security Tips
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li>
              Use a unique password with at least 8 characters and a number.
            </li>
            <li>
              Update your profile details so AI guidance can stay relevant.
            </li>
            <li>
              Review account activity weekly to maintain consistency and trust.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Profile;
