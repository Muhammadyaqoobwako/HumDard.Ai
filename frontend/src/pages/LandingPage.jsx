import {
  AcademicCapIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  GlobeAltIcon,
  HeartIcon,
  LockClosedIcon,
  MicrophoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import Career1 from "../images/Career1.png";
import Career4 from "../images/Career4.jfif";
import Career3 from "../images/Career3.png";
import ph1 from "../images/ph1.png";
import ph2 from "../images/ph2.png";
import ph3 from "../images/ph3.png";

const features = [
  {
    icon: HeartIcon,
    title: "Emotion Detection",
    text: "Identify emotional signals in real time so each response is grounded, relevant, and actionable.",
  },
  {
    icon: AcademicCapIcon,
    title: "Guided AI Mentorship",
    text: "Deliver structured coaching flows that help users move from stress to practical next steps.",
  },
  {
    icon: UserGroupIcon,
    title: "Career Guidance",
    text: "Support students and professionals with decision frameworks for confidence, communication, and growth.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Live AI Interaction",
    text: "Voice and chat channels keep sessions natural, immediate, and easy to continue across devices.",
  },
];

const steps = [
  {
    title: "User speaks",
    text: "Users share context through text or voice, including goals, concerns, and current emotional state.",
  },
  {
    title: "AI detects emotion",
    text: "HamDard interprets tone and intent, then maps inputs to an empathetic, structured response path.",
  },
  {
    title: "AI responds",
    text: "The platform returns clear guidance with measurable next actions and session continuity.",
  },
];

function LandingPage({ initialAuthMode = null }) {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentMode = searchParams.get("auth") || initialAuthMode;

  const [slideIndex, setSlideIndex] = useState(0);
  const slideshowImages = [Career1, ph1, Career4, ph2, Career3, ph3];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slideshowImages.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [slideshowImages.length]);

  const openModal = (mode) => {
    setSearchParams(mode ? { auth: mode } : {}, { replace: true });
  };

  const closeModal = () => {
    setSearchParams({}, { replace: true });
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  };

  const switchModal = (mode) => {
    openModal(mode);
  };

  const handleTryDemo = () => {
    if (isAuthenticated) {
      navigate("/live-session");
      return;
    }

    openModal("login");
  };

  // Hero illustration removed — expert card positioned next to heading

  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.1),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),_transparent_35%)]" />

        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* LEFT: Main Content */}
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-900/30 dark:text-blue-300">
                Professional AI Mentorship Platform
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Emotion-aware guidance for modern digital support
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                HamDard AI helps organizations and individuals deliver calm,
                structured, and practical support through real-time emotional
                context, voice-ready interactions, and measurable action
                guidance.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openModal("signup")}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
                >
                  Get Started
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleTryDemo}
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-blue-300"
                >
                  Request Demo
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <MicrophoneIcon className="h-4 w-4 text-blue-500" />
                  Voice-ready workflows
                </span>
                <span className="inline-flex items-center gap-2">
                  <GlobeAltIcon className="h-4 w-4 text-cyan-500" />
                  Accessibility-focused UX
                </span>
                <span className="inline-flex items-center gap-2">
                  <LockClosedIcon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                  Privacy-first architecture
                </span>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["24/7", "AI assistance"],
                  ["Multi-audience", "students to teams"],
                  ["Actionable", "guided next steps"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Stylish Video Card */}
            <div className="flex items-center justify-center">
              <div className="group relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Slideshow hero card */}
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
                  <img
                    key={slideIndex}
                    src={slideshowImages[slideIndex]}
                    alt={`Slide ${slideIndex + 1}`}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    {/* <div className="rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-white/80 backdrop-blur-sm">
                      Trusted, emotion-aware support for personal and
                      professional success.
                    </div> */}
                  </div>
                </div>

                {/* Info Card Below Video */}
                <div className="rounded-b-3xl border-2 border-t-0 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:border-blue-800/50 dark:from-blue-950/30 dark:to-cyan-950/30">
                  <p className="text-center text-sm font-medium text-slate-700 dark:text-slate-200">
                    Trusted, emotion-aware support for personal and professional
                    success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-3 sm:p-6">
          {[
            [
              BriefcaseIcon,
              "Institution-ready",
              "Supports educational and professional rollout scenarios.",
            ],
            [
              UserGroupIcon,
              "Human-centered",
              "Built around empathy, clarity, and practical outcomes.",
            ],
            [
              CpuChipIcon,
              "Scalable AI core",
              "Consistent support quality across high session volumes.",
            ],
          ].map(([Icon, title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/50"
            >
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Built for operational clarity and real user outcomes
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  0{index + 1}
                </p>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="how-it-works"
        className="bg-white/70 py-16 dark:bg-slate-900/55"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Simple process, consistent guidance quality
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
              About
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              Built for regional relevance and inclusive access
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              HamDard AI is made to feel local, clear, and approachable for
              users across Pakistan. It supports better digital access with
              clean contrast, responsive layouts, voice interaction, and a calm
              experience that works well on mobile and desktop.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Accessible design",
              "Voice interaction",
              "Mobile-first layout",
              "Emotion-aware guidance",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
                Contact
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Need onboarding, consulting, or platform support?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Reach out to the HamDard team if you want onboarding help,
                educational access, or a guided demonstration of the platform.
                We also support product walkthroughs for institutions and teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href="mailto:hello@hamdard.ai"
                className="rounded-full bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
              >
                Email Us
              </a>
              <a
                href="#home"
                className="rounded-full border border-slate-300 px-5 py-3 text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {currentMode ? (
        <AuthModal
          mode={currentMode}
          onClose={closeModal}
          onSwitchMode={switchModal}
        />
      ) : null}
    </main>
  );
}

export default LandingPage;
