import { MicrophoneIcon, StopCircleIcon } from "@heroicons/react/24/solid";

function VoiceInput({ isListening, onToggle }) {
  return (
    <section className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Voice Waveform
        </h3>
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          }`}
        >
          {isListening ? (
            <StopCircleIcon className="h-5 w-5" />
          ) : (
            <MicrophoneIcon className="h-5 w-5" />
          )}
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>

      <div className="flex h-16 items-end justify-center gap-2">
        {Array.from({ length: 30 }).map((_, index) => (
          <span
            key={index}
            className={`w-1.5 rounded-full bg-blue-500/80 ${isListening ? "animate-pulse" : "opacity-40"}`}
            style={{
              height: `${12 + ((index * 7) % 42)}px`,
              animationDelay: `${index * 0.04}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default VoiceInput;
