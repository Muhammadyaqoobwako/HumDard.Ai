function Contact() {
  return (
    <main className="page-surface mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="border-2 border-slate-950 bg-blue-600 p-8 text-white shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:border-cyan-200 dark:bg-blue-700 dark:shadow-[8px_8px_0_rgba(8,145,178,0.55)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Talk to the HumDard team
            </h1>
            <p className="mt-4 text-base leading-7 text-blue-50/90">
              Need onboarding help, a demo, or educational access? Use the form
              or reach out directly and we will get back to you. Share your
              goals and team size so we can guide you to the right setup.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Email", "hello@humDard.ai"],
              ["Response", "Within 1 business day"],
              ["Coverage", "Pakistan and global remote users"],
            ].map(([title, text]) => (
              <article
                key={title}
                className="border border-slate-300 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)] dark:border-slate-800 dark:bg-slate-900"
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

        <form className="border-2 border-slate-950 bg-white p-6 shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:border-cyan-200 dark:bg-slate-900 dark:shadow-[8px_8px_0_rgba(8,145,178,0.55)] sm:p-8">
          <div className="mb-5 border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
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
                className="w-full border-b-2 border-slate-300 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                type="email"
                className="w-full border-b-2 border-slate-300 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:text-white"
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
              className="w-full min-h-36 border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Tell us what you need help with..."
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="border-2 border-slate-950 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[4px_4px_0_rgba(15,23,42,0.85)] transition hover:bg-blue-700 dark:border-cyan-200"
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
