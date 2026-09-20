import {
  FaceFrownIcon,
  FaceSmileIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";

const emotionConfig = {
  happy: {
    label: "Happy",
    tone: "bg-green-500",
    icon: FaceSmileIcon,
    iconColor: "text-green-500",
  },
  neutral: {
    label: "Neutral",
    tone: "bg-slate-400",
    icon: MinusCircleIcon,
    iconColor: "text-slate-500",
  },
  sad: {
    label: "Sad",
    tone: "bg-blue-500",
    icon: FaceFrownIcon,
    iconColor: "text-blue-500",
  },
  angry: {
    label: "Angry",
    tone: "bg-red-500",
    icon: FaceFrownIcon,
    iconColor: "text-red-500",
  },
};

function EmotionIndicator({ emotion = "neutral" }) {
  const current = emotionConfig[emotion] || emotionConfig.neutral;
  const EmotionIcon = current.icon;

  return (
    <div className="glass inline-flex items-center gap-3 rounded-xl px-3 py-2 sm:px-4">
      <EmotionIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${current.iconColor}`} />
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">
          Emotion
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {current.label}
        </p>
      </div>
      <span
        className={`h-2.5 w-2.5 rounded-full ${current.tone} animate-pulse`}
      />
    </div>
  );
}

export default EmotionIndicator;
