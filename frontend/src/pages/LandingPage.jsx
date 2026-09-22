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
    title: "Emotional Risk Awareness",
    text: "Identify emotional patterns in real time so clinicians and care teams can respond with greater empathy and precision.",
  },
  {
    icon: AcademicCapIcon,
    title: "Psychology Support",
    text: "Deliver structured, supportive conversations that help users move from distress toward reflective action and healthier coping.",
  },
  {
    icon: UserGroupIcon,
    title: "Psychiatry Support Pathways",
    text: "Support clinicians, counselors, and mental health teams with consistent, clinically relevant session flow and escalation logic.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Live Care Conversations",
    text: "Voice and chat channels keep conversations natural, private, and easy to continue across devices.",
  },
];

const steps = [
  {
    title: "User shares context",
    text: "Patients, students, or clients describe mood, stress, triggers, and daily challenges through voice or chat.",
  },
  {
    title: "HumDard reads emotional cues",
    text: "The system interprets tone, language, and intensity to understand emotional state and care needs with more context.",
  },
  {
    title: "Supportive next step",
    text: "HumDard offers calm guidance, reflection prompts, and practical coping actions designed for psychological care.",
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

  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section id="home" className="landing-section relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-slate-950" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-36 lg:pt-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="max-w-3xl">
              <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-cyan-300">HumDard / psychology + psychiatry</p>
              <h1 className="hero-display animate-fade-up animation-delay-100 mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl lg:text-[6.4rem]">
                <span className="hero-word hero-word-one">Care that</span>
                <span className="hero-word hero-word-two hero-accent">makes people</span>
                <span className="hero-word hero-word-three">feel heard.</span>
              </h1>
            </div>
            <div className="max-w-lg pb-2 lg:pb-4">
              <p className="hero-support animate-fade-up animation-delay-200 max-w-md text-lg leading-8 text-slate-700 dark:text-slate-300 sm:text-xl">
                HumDard helps people and care teams turn emotional signals into calmer conversations, clearer next steps, and more human support.
              </p>
              <div className="animate-fade-up animation-delay-300 mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => openModal("signup")} className="inline-flex items-center gap-2 border-2 border-slate-950 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(15,23,42,0.95)] transition hover:-translate-y-0.5 hover:bg-blue-700 dark:border-cyan-200 dark:shadow-[5px_5px_0_rgba(8,145,178,0.65)]">
                  Start with HumDard <ArrowRightIcon className="h-4 w-4" />
                </button>
                <button type="button" onClick={handleTryDemo} className="border-2 border-slate-950 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 dark:border-slate-300 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">Book a live session</button>
              </div>
            </div>
          </div>
          <div className="hero-media relative mt-16 min-h-[25rem] border-2 border-slate-950 bg-slate-900 shadow-[6px_6px_0_rgba(15,23,42,0.85)] dark:border-cyan-200 dark:shadow-[6px_6px_0_rgba(8,145,178,0.55)] sm:min-h-[38rem]">
            <img key={slideIndex} src={slideshowImages[slideIndex]} alt="HumDard emotional care" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-blue-950/20" />
            <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/50 bg-slate-950/70 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:left-8 sm:top-8"><span className="h-2 w-2 bg-cyan-300" /> live emotional context</div>
            <div className="absolute bottom-6 left-5 max-w-xl sm:bottom-10 sm:left-10"><p className="text-3xl font-semibold leading-tight text-white sm:text-5xl">A better care journey starts with listening.</p></div>
            <div className="absolute bottom-6 right-5 hidden border-2 border-slate-950 bg-cyan-400 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-950 sm:flex sm:items-center sm:gap-3"><MicrophoneIcon className="h-4 w-4" /> Speak with HumDard</div>
          </div>
        </div>
      </section>

      <section className="landing-section mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div><p className="page-kicker">Does this feel familiar?</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl">Support should not depend on someone having the perfect words.</h2></div>
          <div className="divide-y divide-slate-300 border-y-2 border-slate-950 dark:divide-slate-700 dark:border-slate-300">
            {[
              ["People wait until they are overwhelmed", "When support arrives too late, stress has already shaped the whole conversation."],
              ["Care teams lose the context between sessions", "Important emotional signals disappear when every check-in starts from zero."],
              ["Digital support feels generic", "People need responses that reflect tone, intent, and the reality of their situation."],
              ["Good guidance is hard to scale", "Clinicians and counsellors need a thoughtful layer of continuity around their work."],
            ].map(([title, text], index) => <article key={title} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6"><span className="text-sm font-semibold text-blue-600 dark:text-cyan-300">0{index + 1}</span><div><h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="features" className="landing-section border-y border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/45">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="page-kicker">The HumDard care system</p><h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl">One connected layer for more human care.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">Designed for psychology, psychiatry, counselling, student wellbeing, and the moments in between.</p></div>
          <div className="landing-card-grid mt-14 grid gap-px overflow-hidden border-2 border-slate-950 bg-slate-950 dark:border-slate-300 dark:bg-slate-300 md:grid-cols-2 xl:grid-cols-4">
            {[[MicrophoneIcon, "Voice-first support", "Let people speak naturally when typing is not enough."], [HeartIcon, "Emotional context", "Recognize tone, stress, intent, and hesitation."], [LockClosedIcon, "Continuity", "Carry useful context forward across care journeys."], [UserGroupIcon, "Team pathways", "Give care teams a clearer, more consistent support layer."]].map(([Icon, title, text]) => <article key={title} className="bg-white p-6 dark:bg-slate-950 sm:p-8"><div className="flex h-12 w-12 items-center justify-center border-2 border-blue-600 bg-blue-50 text-blue-600 dark:border-cyan-300 dark:bg-blue-500/10 dark:text-cyan-300"><Icon className="h-6 w-6" /></div><h3 className="mt-10 text-xl font-semibold text-slate-950 dark:text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="landing-section mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36"><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="page-kicker">From signal to support</p><h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl">A calmer flow for every conversation.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-300">HumDard helps transform what people say, how they say it, and what they need next into a care experience that feels clear and continuous.</p><button type="button" onClick={() => navigate("/features")} className="mt-8 inline-flex items-center gap-2 border-b-2 border-blue-600 pb-2 text-sm font-semibold text-blue-700 dark:text-cyan-300">Explore the system <ArrowRightIcon className="h-4 w-4" /></button></div><div className="border-2 border-slate-950 bg-blue-600 p-5 shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:border-cyan-200 dark:shadow-[8px_8px_0_rgba(8,145,178,0.6)] sm:p-8">{steps.map((step, index) => <div key={step.title} className="border-b border-blue-300/50 py-5 last:border-b-0"><div className="flex gap-4"><span className="text-sm font-bold text-cyan-200">0{index + 1}</span><div><h3 className="text-xl font-semibold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-blue-50">{step.text}</p></div></div></div>)}</div></div></section>

      <section className="landing-section bg-slate-950 text-white dark:bg-black"><div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Built for meaningful outcomes</p><h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">Support that stays with people.</h2></div><div className="landing-card-grid grid gap-4 sm:grid-cols-2">{[["For individuals", "A private, approachable place to reflect, regulate, and take the next step."], ["For clinicians", "More context around sessions and a consistent support layer between touchpoints."], ["For institutions", "A thoughtful pathway for students, teams, and communities that need accessible care."], ["For better continuity", "Less repetition. More signal. More room for human expertise to matter."]].map(([title, text]) => <article key={title} className="border border-slate-700 bg-slate-900 p-6 dark:bg-slate-950"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{text}</p></article>)}</div></div></div></section>

      <section id="contact" className="landing-section mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36"><div className="border-2 border-slate-950 bg-cyan-400 p-8 shadow-[8px_8px_0_rgba(15,23,42,0.9)] dark:border-cyan-200 dark:shadow-[8px_8px_0_rgba(8,145,178,0.6)] sm:p-12 lg:p-16"><p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-950">Ready when you are</p><div className="mt-6 flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><h2 className="max-w-3xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-slate-950 sm:text-7xl">Make the next conversation a better one.</h2><div className="flex shrink-0 flex-wrap gap-3"><button type="button" onClick={() => openModal("signup")} className="border-2 border-slate-950 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Start with HumDard</button><button type="button" onClick={handleTryDemo} className="border-2 border-slate-950 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50">Talk to us</button></div></div></div></section>

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
