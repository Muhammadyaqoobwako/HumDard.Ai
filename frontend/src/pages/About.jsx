function About() {
  return (
    <main className="page-surface mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-8">
        <div className="relative overflow-hidden border-2 border-slate-950 bg-slate-50 shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:border-cyan-200 dark:bg-slate-900 dark:shadow-[8px_8px_0_rgba(8,145,178,0.55)]">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
            <div>
              <p className="page-kicker">
                About HumDard
              </p>
              <h1 className="page-heading">
                Built for psychology, psychiatry, and compassionate care
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                HumDard is an emotion-aware care platform focused on helping people feel supported, understood, and guided during moments of stress, anxiety, emotional overwhelm, or life uncertainty. The experience is designed for psychology and psychiatry workflows with a calm interface, voice-first support, and practical guidance that helps users take meaningful next steps with more confidence.
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
                  className="border border-slate-300 bg-white/85 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5"
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
              className="border border-slate-300 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)] dark:border-slate-800 dark:bg-slate-900"
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

        <div className="border-2 border-slate-950 bg-white p-6 shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:border-cyan-200 dark:bg-slate-900 dark:shadow-[8px_8px_0_rgba(8,145,178,0.55)] sm:p-8">
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
                className="border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950"
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
