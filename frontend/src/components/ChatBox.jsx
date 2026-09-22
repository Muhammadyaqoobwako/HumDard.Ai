import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function ChatBox({
  conversationBubble,
  messages = [],
  onSendMessage,
  sampleQuestions = [],
  onSampleQuestion,
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const clean = input.trim();
    if (!clean) return;
    onSendMessage(clean);
    setInput("");
  };

  return (
    <section className="flex flex-col min-h-[260px] rounded-lg p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-300">
        AI Assistant
      </h3>

      <div className="flex-1 overflow-hidden rounded-lg bg-slate-100 p-3 dark:bg-slate-950/60 flex flex-col">
        {conversationBubble && (
          <div
            className={`mx-auto max-w-[85%] rounded-3xl border px-4 py-3 text-sm shadow-lg transition duration-500 ${
              conversationBubble.speaker === "user"
                ? "border-blue-200 bg-blue-600 text-white shadow-blue-200/40"
                : "border-slate-200 bg-white text-slate-900 shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            }`}
          >
            <p className="mb-2 text-[10px] font-semibold uppercase opacity-70">
              {conversationBubble.speaker === "user" ? "You" : "AI"}
            </p>
            <p className="break-words whitespace-pre-wrap">
              {conversationBubble.text}
            </p>
          </div>
        )}

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-3xl border px-4 py-3 text-sm shadow-sm transition ${
                  message.sender === "user"
                    ? "ml-auto border-blue-200 bg-blue-600 text-white shadow-blue-200/20"
                    : "mr-auto border-slate-200 bg-white text-slate-900 shadow-slate-200/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                <p className="mb-2 text-[10px] font-semibold uppercase opacity-70">
                  {message.sender === "user" ? "You" : "AI"}
                </p>
                <p className="break-words whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-400">
              Conversations appear here and will stay until you refresh the
              page.
            </div>
          )}
        </div>
      </div>

      {sampleQuestions.length > 0 && (
        <div className="mt-4 mb-3 rounded-3xl border border-slate-200 bg-white/80 p-3 shadow-sm shadow-slate-200/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950/20">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Sample questions
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => onSampleQuestion?.(question)}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:bg-blue-950"
              >
                {question.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the AI..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 dark:hover:bg-blue-700"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}

export default ChatBox;
