function Card({ title, value, subtitle, icon: Icon }) {
  return (
    <article className="glass soft-shadow rounded-3xl p-5 transition hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          {title}
        </h3>
        {Icon ? (
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        ) : null}
      </div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
        {subtitle}
      </p>
    </article>
  );
}

export default Card;
