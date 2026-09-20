import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState } from "react";
import avtar1 from "../assets/avtar1.jpg";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "$0",
    annualPrice: "$0",
    period: "/month",
    description: "A simple starting point for exploring HamDard AI.",
    features: [
      "2 live sessions per week",
      "Basic mood tracking",
      "Core AI support",
    ],
    cta: "Get Started",
    to: "/?auth=signup",
    featured: false,
  },
  {
    name: "Growth",
    monthlyPrice: "$19",
    annualPrice: "$180",
    period: "/month",
    description: "For users who want deeper support and consistent progress.",
    features: [
      "Unlimited live sessions",
      "Voice listening",
      "Priority AI responses",
      "Weekly progress insights",
    ],
    cta: "Choose Growth",
    to: "/?auth=signup",
    featured: true,
  },
  {
    name: "Pro Care",
    monthlyPrice: "$49",
    annualPrice: "$468",
    period: "/month",
    description: "For teams, institutions, and advanced reporting needs.",
    features: [
      "Everything in Growth",
      "Team seats",
      "Priority onboarding",
      "Advanced analytics export",
    ],
    cta: "Contact Sales",
    to: "/contact",
    featured: false,
  },
];

const comparison = [
  ["Live AI sessions", "2 per week", "Unlimited", "Unlimited"],
  ["Voice support", "Basic", "Included", "Included"],
  ["Progress insights", "Basic", "Weekly", "Advanced"],
  ["Team seats", "-", "-", "Included"],
  ["Onboarding", "Self-service", "Priority", "Dedicated"],
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade your plan whenever you want without losing your account history.",
  },
  {
    question: "Is there a free option?",
    answer:
      "Yes, the Starter plan is free and gives you a real feel for the platform before you upgrade.",
  },
  {
    question: "Does pricing work for teams?",
    answer:
      "Yes, Pro Care is built for institutions and teams that need broader access and support.",
  },
];

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <main className="bg-slate-50 py-12 text-slate-900 dark:bg-slate-950 dark:text-white sm:py-14 lg:py-16">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
                Real-time Pricing
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Real-time pricing for every growth stage
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                Choose a plan that matches your needs, whether you are exploring
                the product for the first time or scaling support across a team.
                Every tier is designed to keep guidance practical, accessible,
                and easy to adopt.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "No hidden fees",
                  "Dark and light mode",
                  "Voice-ready support",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Billing Toggle */}
              <div className="mt-8 flex items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <span
                  className={`text-sm font-medium ${!isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
                >
                  Monthly
                </span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    isAnnual ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      isAnnual ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
                >
                  Annual
                </span>
                {isAnnual && (
                  <span className="ml-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Save 20%
                  </span>
                )}
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Avatar Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={avtar1}
                  alt="HamDard AI Assistant"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
                  Meet HamDard AI
                </p>
                <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                  Your AI Mentor
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Experience emotion-aware guidance designed to support your
                  growth, offer practical solutions, and help you take
                  actionable next steps.
                </p>

                {/* Features List */}
                <ul className="mt-4 space-y-2">
                  {[
                    "Real-time emotion detection",
                    "Personalized guidance",
                    "Available 24/7",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/?auth=signup"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Start Free
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-[1.75rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                plan.featured
                  ? "border-blue-500 bg-blue-50/90 shadow-blue-200/50 dark:bg-blue-900/15 dark:shadow-blue-950/20"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Popular
                </span>
              )}

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {plan.name}
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                <span className="text-base font-medium text-slate-500 dark:text-slate-300">
                  {isAnnual ? "/year" : "/month"}
                </span>
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {plan.description}
              </p>

              <ul className="mt-5 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.to}
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                }`}
              >
                {plan.cta}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Plan comparison
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Compare the main capabilities across the available plans.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  <th className="px-6 py-4 font-semibold">Starter</th>
                  <th className="px-6 py-4 font-semibold">Growth</th>
                  <th className="px-6 py-4 font-semibold">Pro Care</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {comparison.map(([feature, starter, growth, pro]) => (
                  <tr key={feature}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {feature}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {starter}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {growth}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Need a custom rollout plan?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            If you are deploying HamDard AI for a school, organization, or
            multi-team environment, our team can help with onboarding,
            activation strategy, and adoption support.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Talk to Sales
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Pricing;
