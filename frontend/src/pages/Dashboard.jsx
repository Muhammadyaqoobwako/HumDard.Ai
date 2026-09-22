import {
  ArrowTrendingUpIcon,
  ChartBarSquareIcon,
  ClockIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Card from "../components/Card";
import EmotionIndicator from "../components/EmotionIndicator";
import brainImage from "../assets/brain.png";
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
const trendViews = {
  "7D": { values: moodTrend, label: "+12% improvement" },
  "14D": { values: [52, 57, 55, 61, 63, 68, 66], label: "+8% improvement" },
  "30D": { values: [44, 48, 51, 49, 57, 63, 71], label: "+15% improvement" },
};

function Dashboard() {
  const { user } = useAuth();
  const { emotion, intensity, keywords } = useEmotion();
  const [trendView, setTrendView] = useState("7D");
  const [selectedEmotion, setSelectedEmotion] = useState("Happy");
  const [sessionFilter, setSessionFilter] = useState("All");
  const emotionLabel = emotion.charAt(0).toUpperCase() + emotion.slice(1);
  const visibleSessions = sessionFilter === "All"
    ? recentSessions
    : recentSessions.filter((session) => session.mood === sessionFilter);
  const activeTrend = trendViews[trendView];

  return (
    <main className="page-surface mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="space-y-8">
        <article className="overflow-hidden rounded-2xl border border-blue-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
            <div className="max-w-2xl p-6 sm:p-8 lg:p-10">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-300">
                Care intelligence dashboard
              </p>
              <h1 className="dashboard-display mt-4 text-4xl font-bold leading-[0.94] tracking-[-0.055em] text-black dark:text-white sm:text-6xl">
                {user?.name || "Welcome back"}
              </h1>
              <p className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
                Review your emotional patterns, stay consistent with care routines, and continue your mental-health journey with clarity.
              </p>
            </div>
            <div className="dashboard-brain-panel group relative min-h-[19rem] overflow-hidden border-l border-cyan-300 bg-slate-950 p-6 text-white sm:p-8">
              <img src={brainImage} alt="Animated mind visualization" className="dashboard-brain absolute right-[-7%] top-1/2 h-[125%] w-auto max-w-none -translate-y-1/2 object-contain opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-cyan-300">Today&apos;s focus</p><p className="dashboard-display mt-3 text-4xl font-bold tracking-[-0.055em]">{emotionLabel}</p><p className="mt-1 text-sm text-slate-300">Current emotional signal</p></div>
                  <span className="border border-cyan-300/70 bg-slate-950/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{intensity}%</span>
                </div>
                <div className="mt-8">
                  <div className="dashboard-brain-message border-t border-slate-700 pt-4"><span className="dashboard-brain-message-default text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">12-day streak · mind at a glance</span><span className="dashboard-brain-message-hover text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">Your mind is ready to be heard</span></div>
                  <div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs text-slate-400">Hover to explore your signal</span><Link to="/live-session" className="inline-flex items-center justify-center border-2 border-cyan-200 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Start session</Link></div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div><p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">At a glance</p><h2 className="dashboard-display mt-1 text-2xl font-bold tracking-[-0.045em] text-black dark:text-white">Your care momentum</h2></div>
            <p className="hidden text-xs text-slate-600 dark:text-slate-400 sm:block">Updated from your latest activity</p>
          </div>
          <div className="grid gap-px overflow-hidden border-2 border-slate-950 bg-slate-950 dark:border-cyan-200 dark:bg-cyan-200 md:grid-cols-2 xl:grid-cols-4">
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
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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

        <article className="border-y-2 border-slate-950 bg-white/80 p-6 dark:border-cyan-200 dark:bg-slate-900/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Patterns over time</p>
              <h2 className="dashboard-display mt-1 text-2xl font-bold tracking-[-0.04em] text-black dark:text-white">Analytics overview</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                {Object.keys(trendViews).map((view) => (
                  <button key={view} type="button" onClick={() => setTrendView(view)} className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] transition ${trendView === view ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-blue-600 dark:text-slate-300"}`}>
                    {view}
                  </button>
                ))}
              </div>
              <span className="hidden border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700 dark:border-cyan-300 dark:bg-blue-500/10 dark:text-cyan-200 sm:inline-flex">Live insights</span>
            </div>
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Mood trend (7 days)
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-300">
                  {activeTrend.label}
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
                  points={activeTrend.values
                    .map((value, index) => `${index * 50},${110 - value}`)
                    .join(" ")}
                />
                <polygon
                  fill="url(#moodFill)"
                  points={`${activeTrend.values
                    .map((value, index) => `${index * 50},${110 - value}`)
                    .join(" ")} 300,120 0,120`}
                />
              </svg>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Session activity (weekly)
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-300">
                  23 total sessions
                </span>
              </div>
              <div className="mt-6 grid grid-cols-7 items-end gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/70">
                {weeklySessions.map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="space-y-2 text-center"
                  >
                    <div
                      className="mx-auto w-6 bg-blue-600 transition-all duration-500 hover:bg-cyan-500"
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

        <article className="border-y border-slate-300 bg-white/70 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h2 className="dashboard-display text-2xl font-bold tracking-[-0.04em] text-black dark:text-white">
            Emotional mix
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
              { label: "Happy", value: "62%", color: "bg-green-400" },
              { label: "Neutral", value: "28%", color: "bg-slate-400" },
              { label: "Angry", value: "10%", color: "bg-red-400" },
            ].map((item) => (
              <div
                key={item.label}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedEmotion(item.label)}
                onKeyDown={(event) => event.key === "Enter" && setSelectedEmotion(item.label)}
                className={`cursor-pointer rounded-xl border p-4 transition dark:bg-slate-800/60 ${selectedEmotion === item.label ? (item.label === "Neutral" ? "border-slate-400 bg-slate-100 shadow-sm dark:border-slate-500 dark:bg-slate-800" : "border-blue-400 bg-blue-50 shadow-sm dark:border-cyan-300") : "border-slate-200 bg-slate-50 hover:border-blue-400 dark:border-slate-700"}`}
              >
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <div className="mt-3 h-2 w-full bg-slate-200 dark:bg-slate-600">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="border-y border-slate-300 bg-white/70 py-6 dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex flex-col justify-between gap-4 px-1 sm:flex-row sm:items-end sm:px-0">
            <div><p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Keep the momentum</p><h2 className="dashboard-display mt-1 text-2xl font-bold tracking-[-0.04em] text-black dark:text-white">Reflection history</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Small conversations can create meaningful progress.</p></div>
            <div className="flex w-fit rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
              {["All", "Happy", "Neutral", "Focused"].map((filter) => <button key={filter} type="button" onClick={() => setSessionFilter(filter)} className={`rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] transition ${sessionFilter === filter ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-blue-600 dark:text-slate-300"}`}>{filter}</button>)}
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {visibleSessions.map((session) => (
              <div
                key={`${session.title}-${session.date}`}
                className="group grid gap-4 border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-400 hover:bg-white dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <div className="flex min-w-0 gap-3">
                  <span className={`mt-1 h-10 w-1 shrink-0 ${session.mood === "Happy" ? "bg-green-400" : session.mood === "Neutral" ? "bg-slate-400" : "bg-blue-500"}`} />
                  <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                    {session.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400"><span className="border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900">{session.mood}</span><span>{session.duration}</span></div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {session.insight}
                  </p>
                  </div>
                </div>
                <span className="inline-flex w-fit text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 dark:text-cyan-300 sm:justify-self-end">
                  {session.date}
                </span>
              </div>
            ))}
            {!visibleSessions.length ? <p className="border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-300">No sessions match this filter yet.</p> : null}
          </div>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
