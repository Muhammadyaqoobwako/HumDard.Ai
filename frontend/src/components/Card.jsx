function Card({ title, value, subtitle, icon: Icon }) {
  return (
    <article className="group bg-white p-5 transition duration-300 hover:bg-blue-50/60 dark:bg-slate-900 dark:hover:bg-slate-800">
      <div className="mb-5 flex items-start justify-between gap-3">
        <h3 className="max-w-[11rem] text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
          {title}
        </h3>
        {Icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:border-cyan-300 dark:bg-blue-500/10 dark:text-cyan-300">
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <p className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white">
        {value}
      </p>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
        {subtitle}
      </p>
    </article>
  );
}

export default Card;
