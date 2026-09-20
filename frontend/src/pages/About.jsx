function About() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-blue-950 dark:shadow-slate-950/30">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.16),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.16),_transparent_30%)]" />
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
                About
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                Designed for Pakistan, built for accessible support
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                HamDard AI is an emotion-aware mentoring platform focused on
                helping people feel supported, understood, and ready to take the
                next step. The experience is designed to work well across
                Pakistan with strong contrast, responsive layouts, and
                voice-first interaction. Our goal is to blend empathy and
                practical guidance so users can take meaningful action after
                every session.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Local-first design",
                  "Made for users in Pakistan and similar contexts.",
                ],
                [
                  "Accessibility",
                  "Built with readable layouts and voice support.",
                ],
                ["Privacy aware", "Focused on calm, trust, and user comfort."],
                ["Modern UI", "Clean SaaS styling with dark and light modes."],
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "Emotional clarity",
              "We turn emotion signals into practical guidance.",
            ],
            [
              "02",
              "Accessible support",
              "Clear layouts and voice-first interaction for everyone.",
            ],
            [
              "03",
              "Continuous growth",
              "Sessions and insights that help people move forward.",
            ],
          ].map(([number, title, text]) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">
                {number}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {text}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Our approach
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              [
                "Empathy with structure",
                "We combine emotionally aware responses with practical frameworks so users can move from feeling to action.",
              ],
              [
                "Local relevance",
                "Language, tone, and interaction patterns are shaped for users in Pakistan and similar contexts.",
              ],
              [
                "Inclusive by design",
                "Readable layouts, contrast-aware UI, and voice input improve support access across devices.",
              ],
              [
                "Continuous improvement",
                "Session outcomes and user patterns guide product improvements for more useful mentorship over time.",
              ],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/50"
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
        </div>
      </section>
    </main>
  );
}

export default About;
