import {
  ArrowTrendingUpIcon,
  ChartBarSquareIcon,
  ClockIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/Card";
import EmotionIndicator from "../components/EmotionIndicator";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEmotion } from "../contexts/EmotionContext";

const recentSessions = [
  {
    title: "Managing stress before exams",
    mood: "Happy",
    duration: "34 min",
    date: "Today",
    insight:
      "You shifted from worry to action by listing priorities and setting a realistic evening routine.",
  },
  {
    title: "Confidence in interviews",
    mood: "Neutral",
    duration: "27 min",
    date: "Yesterday",
    insight:
      "You practiced a short confidence script and built two strong examples for common interview questions.",
  },
  {
    title: "Handling conflict calmly",
    mood: "Focused",
    duration: "31 min",
    date: "2 days ago",
    insight:
      "You used pause-and-respond techniques and prepared one respectful boundary statement for future situations.",
  },
];

const moodTrend = [58, 61, 60, 66, 71, 77, 84];
const weeklySessions = [2, 3, 2, 4, 3, 5, 4];

function Dashboard() {
  const { user } = useAuth();
  const { emotion, intensity, keywords } = useEmotion();
  const emotionLabel = emotion.charAt(0).toUpperCase() + emotion.slice(1);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <article className="overflow-hidden rounded-3xl border border-blue-200/70 bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 p-6 text-white shadow-xl shadow-blue-500/30 dark:border-blue-900/60 dark:shadow-blue-950/30">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Real-time Dashboard
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                {user?.name || "Mentor Seeker"}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-blue-100">
                Your emotional growth is moving in the right direction. Review
                this week&apos;s progress, identify what helped most, and
                continue your live mentorship journey with intentional daily
                actions.
              </p>
            </div>
            <Link
              to="/live-session"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Start Live Session
            </Link>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card
            title="Weekly Mood Score"
            value="84%"
            subtitle="+6% from last week"
            icon={ChartBarSquareIcon}
          />
          <Card
            title="Sessions Completed"
            value="18"
            subtitle="This month"
            icon={ClockIcon}
          />
          <Card
            title="Positive Trend"
            value="+12%"
            subtitle="Last 14 days"
            icon={ArrowTrendingUpIcon}
          />
          <Card
            title="Dominant Emotion"
            value={emotionLabel}
            subtitle={`${intensity}% intensity`}
            icon={FaceSmileIcon}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <EmotionIndicator emotion={emotion} />
          <Card
            title="Current Emotion"
            value={emotionLabel}
            subtitle="Live speech emotion"
          />
          <Card
            title="Emotion Keywords"
            value={keywords.length ? keywords.join(", ") : "None"}
            subtitle="Detected from speech"
          />
        </div>

        <article className="glass rounded-3xl p-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Analytics Overview
          </h2>
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-600 dark:bg-slate-700/40">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Mood Trend (7 Days)
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-300">
                  +12% improvement
                </span>
              </div>
              <svg viewBox="0 0 300 120" className="mt-4 h-36 w-full">
                <defs>
                  <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 40, 60, 80, 100].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    y1={line}
                    x2="300"
                    y2={line}
                    stroke="rgba(148,163,184,0.25)"
                    strokeWidth="1"
                  />
                ))}
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  points={moodTrend
                    .map((value, index) => `${index * 50},${110 - value}`)
                    .join(" ")}
                />
                <polygon
                  fill="url(#moodFill)"
                  points={`${moodTrend
                    .map((value, index) => `${index * 50},${110 - value}`)
                    .join(" ")} 300,120 0,120`}
                />
              </svg>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-600 dark:bg-slate-700/40">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Session Activity (Weekly)
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-300">
                  23 total sessions
                </span>
              </div>
              <div className="mt-6 grid grid-cols-7 items-end gap-2 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                {weeklySessions.map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="space-y-2 text-center"
                  >
                    <div
                      className="mx-auto w-6 rounded-md bg-gradient-to-t from-blue-600 to-cyan-400"
                      style={{ height: `${value * 14}px` }}
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-300">
                      {"SMTWTFS"[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="glass rounded-3xl p-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Emotion Distribution
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { label: "Happy", value: "62%", color: "bg-green-400" },
              { label: "Neutral", value: "28%", color: "bg-blue-400" },
              { label: "Angry", value: "10%", color: "bg-red-400" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/70 p-4 dark:bg-slate-700/50"
              >
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="glass rounded-3xl p-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Sessions
          </h2>
          <div className="mt-4 space-y-3">
            {recentSessions.map((session) => (
              <div
                key={`${session.title}-${session.date}`}
                className="grid gap-2 rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:border-blue-300 dark:border-slate-600 dark:bg-slate-700/40 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {session.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                    Mood: {session.mood} • Duration: {session.duration}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {session.insight}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                  {session.date}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
