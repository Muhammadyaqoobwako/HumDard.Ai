function Contact() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white shadow-xl shadow-blue-500/25 dark:border-slate-800">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Talk to the HamDard team
            </h1>
            <p className="mt-4 text-base leading-7 text-blue-50/90">
              Need onboarding help, a demo, or educational access? Use the form
              or reach out directly and we will get back to you. Share your
              goals and team size so we can guide you to the right setup.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Email", "hello@hamdard.ai"],
              ["Response", "Within 1 business day"],
              ["Coverage", "Pakistan and global remote users"],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {title}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <form className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20 sm:p-8">
          <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/50">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Tell us about your request
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Include whether you need a product demo, onboarding support,
              pricing guidance, or a partnership conversation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Message
            </label>
            <textarea
              rows="6"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Tell us what you need help with..."
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Send Message
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We usually respond within one business day with the next best
              action.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Contact;
