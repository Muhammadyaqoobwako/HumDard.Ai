import { CpuChipIcon } from "@heroicons/react/24/solid";

const avatarStates = {
  idle: {
    ring: "ring-slate-300 dark:ring-slate-600",
    glow: "shadow-slate-400/35",
    text: "Idle",
  },
  listening: {
    ring: "ring-cyan-300 dark:ring-cyan-500",
    glow: "shadow-cyan-400/45",
    text: "Listening",
  },
  speaking: {
    ring: "ring-blue-300 dark:ring-blue-500",
    glow: "shadow-blue-400/50",
    text: "Speaking",
  },
};

function Avatar({ state = "idle", imageSrc, name, title, mode }) {
  const current = avatarStates[state] || avatarStates.idle;

  return (
    <section className="glass relative flex h-full min-h-[220px] flex-col items-center justify-center rounded-3xl p-5 text-center sm:p-6">
      <div
        className={`mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-4 sm:h-32 sm:w-32 ${current.ring} ${current.glow} bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-700 shadow-2xl transition`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name || "avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <CpuChipIcon className="h-10 w-10 text-white sm:h-14 sm:w-14" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {name || "AI Mentor Avatar"}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
        {title || `State: ${current.text}`}
      </p>
      {mode === "speaking" ? (
        <span className="mt-3 h-2 w-20 animate-pulse rounded-full bg-blue-500" />
      ) : null}
    </section>
  );
}

export default Avatar;
