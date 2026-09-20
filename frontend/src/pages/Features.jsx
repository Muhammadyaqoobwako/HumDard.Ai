import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  MicrophoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: HeartIcon,
    title: "Emotion Detection",
    text: "HamDard reads emotional context and helps users respond with clarity through calm, practical prompts.",
  },
  {
    icon: AcademicCapIcon,
    title: "AI Psychologist",
    text: "Structured, supportive conversations for stress, focus, and growth with scenario-aware responses.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Live AI Interaction",
    text: "Fast, natural interaction through chat for continuous support and better conversation continuity.",
  },
  {
    icon: MicrophoneIcon,
    title: "Voice Support",
    text: "Speak naturally and let the assistant understand you hands-free, especially when typing feels difficult.",
  },
];

function Features() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-10">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
                Features
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Everything you need for emotionally aware AI support
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                HamDard AI combines empathy, voice input, and guided support in
                one clean experience. Every feature is built to move users from
                confusion toward calm, measurable progress.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {[
                  "Real-time emotion signals",
                  "Voice-first support",
                  "Accessible interfaces",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [SparklesIcon, "Adaptive responses"],
                [ShieldCheckIcon, "Privacy-first support"],
                [MicrophoneIcon, "Voice ready"],
                [ChatBubbleLeftRightIcon, "Live interaction"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.text}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Best for users who want actionable guidance instead of vague
                  motivation.
                </p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "For students",
              "Manage exam stress, confidence dips, and daily routines with short guided sessions.",
            ],
            [
              "For professionals",
              "Handle pressure, communication challenges, and career decisions with clearer thinking.",
            ],
            [
              "For teams",
              "Scale emotional support and mentoring access across members with consistent quality.",
            ],
          ].map(([title, text]) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Features;
