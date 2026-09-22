import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  HeartIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
import ChatBox from "../components/ChatBox";
import { useAuth } from "../contexts/AuthContext";
import { useEmotion } from "../contexts/EmotionContext";
import avtar1 from "../assets/avtar1.jpg";
import helloVideo from "../videos/hello.mp4";
import listeningVideo from "../videos/Listening.mp4";
import welcomeVideo from "../videos/Welcome.mp4";
import nothingVideo from "../videos/nothing.mp4";
import stressVideo from "../videos/Stress.mp4";
import realisticVideo from "../videos/realistic.mp4";
import feelingVideo from "../videos/feeling.mp4";
import motivationVideo from "../videos/motivation.mp4";
import smallVideo from "../videos/small.mp4";
import noticeVideo from "../videos/notice.mp4";
import mentalVideo from "../videos/mental.mp4";
import sorryVideo from "../videos/sorry.mp4";

const sampleQuestions = [
  {
    id: 1,
    text: "Assalam-u-Alikum / Hello",
    answer:
      "Walaikum assalam. Welcome to HumDard AI. How can I support you today?",
    video: welcomeVideo,
    keywords: [
      "hello",
      "hi",
      "hey",
      "assalam-u-alikum",
      "assalamualaikum",
      "assalamu alaikum",
      "salam",
      "assalam",
      "walaikum",
    ],
  },
  {
    id: 2,
    text: "I feel anxious, what should I do?",
    answer:
      "Take a few deep breaths, notice the feeling without judgment, and focus on one small step you can control.",
    video: stressVideo,
    keywords: [
      "i feel anxious",
      "feeling anxious",
      "anxious",
      "anxiety",
      "ghabi",
      "pareshani",
      "tension",
    ],
  },
  {
    id: 3,
    text: "How can I manage stress?",
    answer:
      "Try scheduling a short break, move your body, and set one realistic priority for the next hour.",
    video: realisticVideo,
    keywords: [
      "manage stress",
      "stress",
      "handle stress",
      "stressed",
      "tanao",
      "dab",
      "dar",
    ],
  },
  {
    id: 4,
    text: "Why do I feel sad or low?",
    answer:
      "Feeling low can come from many things; acknowledge your emotions, be kind to yourself, and reach out if you need support.",
    video: feelingVideo,
    keywords: [
      "feel sad",
      "sad",
      "low",
      "feeling low",
      "udaas",
      "ghussa",
      "neeche",
    ],
  },
  {
    id: 5,
    text: "Tell me how to stay motivated.",
    answer:
      "Break your goal into smaller pieces, celebrate progress, and remind yourself why it matters to you.",
    video: motivationVideo,
    keywords: [
      "stay motivated",
      "motivation",
      "motivated",
      "keep going",
      "jaari rakhiye",
      "himmat",
    ],
  },
  {
    id: 6,
    text: "How can I improve my self confidence?",
    answer:
      "Start with small wins, speak to yourself kindly, and practice doing things that make you feel capable.",
    video: smallVideo,
    keywords: [
      "self confidence",
      "confidence",
      "improve confidence",
      "self esteem",
      "apne aap par bharosa",
      "bilkul",
      "taaqat",
    ],
  },
  {
    id: 7,
    text: "How do I cope with negative thoughts?",
    answer:
      "Notice the thought, challenge whether it is true, and replace it with a kinder, more balanced perspective.",
    video: noticeVideo,
    keywords: [
      "negative thoughts",
      "cope with negative thoughts",
      "bad thoughts",
      "negative thinking",
      "bure khyaal",
      "negative soch",
    ],
  },
  {
    id: 8,
    text: "Give me mental wellness tips.",
    answer:
      "Focus on sleep, movement, connection, and small habits that help you feel steadier each day.",
    video: mentalVideo,
    keywords: [
      "mental wellness tips",
      "mental wellness",
      "wellness tips",
      "mental health",
      "dimaagi sehat",
      "tips",
      "salah",
    ],
  },
];

function LiveSession() {
  const { user } = useAuth();
  const { updateEmotion } = useEmotion();
  const socketRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoStageRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "HumDard Ai",
      text: `Welcome to HumDard Live Session, ${user?.name || "User"}. I am ready to help.`,
    },
  ]);
  const [conversationBubble, setConversationBubble] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(helloVideo); // 📹 Start with hello video on page load
  const [detectedKeyword, setDetectedKeyword] = useState("welcome");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bubbleTimerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === videoStageRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!videoStageRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await videoStageRef.current.requestFullscreen();
  };

  const socketUrl = useMemo(
    // Default to empty to avoid auto-connecting to backend during simple frontend-only runs
    () => import.meta.env.VITE_SOCKET_URL || "",
    [],
  );
  const userStoppedRef = useRef(false);
  const recognitionActiveRef = useRef(false);

  // No TTS: videos include their own audio; keep speech synthesis disabled.

  const showConversationBubble = useCallback((speaker, text) => {
    setConversationBubble({ speaker, text });

    if (bubbleTimerRef.current) {
      clearTimeout(bubbleTimerRef.current);
    }

    bubbleTimerRef.current = setTimeout(() => {
      setConversationBubble(null);
    }, 3800);
  }, []);

  const detectEmotionFromText = useCallback((text) => {
    const normalized = text.toLowerCase();

    if (
      /(anxious|anxiety|stress|tension|pareshani|ghabi|dab|dar|worried)/.test(
        normalized,
      )
    ) {
      return { emotion: "angry", intensity: 76, keywords: ["anxious"] };
    }

    if (/(sad|low|udaas|ghussa|neeche|depressed|down)/.test(normalized)) {
      return { emotion: "sad", intensity: 70, keywords: ["sad"] };
    }

    if (
      /(happy|motivat|confidence|confident|good|great|well|relaxed|peaceful|thank|thanks)/.test(
        normalized,
      )
    ) {
      return { emotion: "happy", intensity: 82, keywords: ["positive"] };
    }

    return { emotion: "neutral", intensity: 50, keywords: [] };
  }, []);

  // const sendMessage = useCallback(
  //   (text) => {
  //     const userMessage = { id: Date.now(), sender: "user", text };
  //     setMessages((prev) => [...prev, userMessage]);

  //     showConversationBubble("user", text);

  //     const normalized = text.trim().toLowerCase();
  //     const matchedQuestion = sampleQuestions.find((question) =>
  //       question.keywords.some((keyword) => normalized.includes(keyword)),
  //     );

  //     // Keep Listening video for unmatched speech
  //     // Only switch video if matched question has a different video
  //     if (
  //       matchedQuestion &&
  //       matchedQuestion.video &&
  //       matchedQuestion.video !== listeningVideo
  //     ) {
  //       setCurrentVideo(matchedQuestion.video);
  //       setDetectedKeyword(matchedQuestion.text);
  //       setIsVideoLoading(true);
  //       setVideoLoaded(false);
  //     } else {
  //       // For unmatched speech or matched with Listening video, ensure Listening stays visible
  //       setCurrentVideo(listeningVideo);
  //       setDetectedKeyword("Listening");
  //       setVideoLoaded(true); // Keep it visible since Listening video is already known
  //     }

  //     if (socketRef.current?.connected) {
  //       socketRef.current.emit("user:message", text);
  //     }

  //     setTimeout(() => {
  //       const response = matchedQuestion
  //         ? matchedQuestion.answer
  //         : "Sorry, I can't understand it.";

  //       const aiMessage = { id: Date.now() + 1, sender: "ai", text: response };
  //       setMessages((prev) => [...prev, aiMessage]);
  //       speakText(response);
  //       showConversationBubble("ai", response);
  //       if (!matchedQuestion) {
  //         setCurrentVideo(sorryVideo);
  //         setDetectedKeyword("unmatched");
  //         setIsVideoLoading(true);
  //         setVideoLoaded(false);
  //       }
  //     }, 600);
  //   },
  //   [speakText, showConversationBubble],
  // );

  const playVideoSource = useCallback((videoSrc) => {
    const video = videoRef.current;
    if (!video) return;

    if (videoSrc) {
      if (video.src !== videoSrc) {
        video.src = videoSrc;
        video.load();
      }
      video.muted = false;
      video.volume = 1;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Some browsers may block autoplay with sound until a user interaction occurs.
        });
      }
    }
  }, []);

  const changeVideoWithTransition = useCallback(
    (nextVideoSrc, keyword) => {
      if (!nextVideoSrc || nextVideoSrc === currentVideo) {
        return;
      }

      setDetectedKeyword(keyword || "");
      setIsVideoFading(true);
      setCurrentVideo(nextVideoSrc);
      playVideoSource(nextVideoSrc);
    },
    [currentVideo, playVideoSource],
  );

  const sendMessage = useCallback(
    (text) => {
      const userMessage = {
        id: Date.now(),
        sender: "user",
        text,
      };

      setMessages((prev) => [...prev, userMessage]);

      showConversationBubble("user", text);

      const normalized = text.toLowerCase().trim();
      const detectedEmotion = detectEmotionFromText(text);
      updateEmotion({
        ...detectedEmotion,
        keywords:
          detectedEmotion.keywords.length > 0 ? detectedEmotion.keywords : [],
      });

      const matchedQuestion = sampleQuestions.find((question) =>
        question.keywords.some((keyword) =>
          normalized.includes(keyword.toLowerCase()),
        ),
      );

      let response = "";
      if (matchedQuestion) {
        changeVideoWithTransition(matchedQuestion.video, matchedQuestion.text);
        playVideoSource(matchedQuestion.video);

        response = matchedQuestion.answer;

        const aiMessage = {
          id: Date.now() + 1,
          sender: "ai",
          text: response,
        };

        setMessages((prev) => [...prev, aiMessage]);

        setTimeout(() => {
          showConversationBubble("ai", response);
        }, 300);
      } else {
        response = "Sorry, I can't understand it.";
        changeVideoWithTransition(sorryVideo, "unmatched");
        playVideoSource(sorryVideo);

        const aiMessage = {
          id: Date.now() + 1,
          sender: "ai",
          text: response,
        };

        setMessages((prev) => [...prev, aiMessage]);

        setTimeout(() => {
          showConversationBubble("ai", response);
        }, 300);
      }
    },
    [
      showConversationBubble,
      changeVideoWithTransition,
      detectEmotionFromText,
      updateEmotion,
    ],
  );

  // const handleSampleQuestion = useCallback(
  //   (question) => {
  //     const timestamp = Date.now();
  //     const userMessage = {
  //       id: timestamp,
  //       sender: "user",
  //       text: question.text,
  //     };
  //     const aiMessage = {
  //       id: timestamp + 1,
  //       sender: "ai",
  //       text: question.answer,
  //     };

  //     setMessages((prev) => [...prev, userMessage, aiMessage]);
  //     setCurrentVideo(question.video);
  //     setDetectedKeyword(question.text);
  //     setIsVideoLoading(true);
  //     setVideoLoaded(false);
  //     showConversationBubble("user", question.text);

  //     setTimeout(() => {
  //       showConversationBubble("ai", question.answer);
  //       speakText(question.answer);
  //     }, 600);
  //   },
  //   [speakText, showConversationBubble],
  // );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Autoplay with sound may still be blocked in some browsers.
      });
    }
  }, [currentVideo]);

  const handleSampleQuestion = useCallback(
    (question) => {
      const timestamp = Date.now();
      const detectedEmotion = detectEmotionFromText(question.text);
      updateEmotion(detectedEmotion);

      setMessages((prev) => [
        ...prev,
        {
          id: timestamp,
          sender: "user",
          text: question.text,
        },
        {
          id: timestamp + 1,
          sender: "ai",
          text: `HumDard : ${question.text}`,
        },
      ]);

      changeVideoWithTransition(question.video, question.text);

      showConversationBubble("user", question.text);

      setTimeout(() => {
        showConversationBubble("ai", `Playing video for ${question.text}`);
      }, 300);
    },
    [
      changeVideoWithTransition,
      showConversationBubble,
      detectEmotionFromText,
      updateEmotion,
    ],
  );

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0]?.transcript || "";
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const displayText = finalTranscript || interimTranscript;
      setLiveTranscript(displayText.trim());

      // Do not switch videos on interim (partial) transcripts.
      // Only act when final transcript is available below.

      if (finalTranscript.trim()) {
        sendMessage(finalTranscript.trim());
        setLiveTranscript("");
      }
    };

    recognition.onerror = () => {
      if (userStoppedRef.current) {
        return;
      }

      recognitionActiveRef.current = false;
      setIsListening(false);
    };

    recognition.onnomatch = () => {
      if (!userStoppedRef.current) {
        setLiveTranscript("");
      }
    };

    recognition.onend = () => {
      if (userStoppedRef.current) {
        recognitionActiveRef.current = false;
        setIsListening(false);
        return;
      }

      if (recognitionActiveRef.current) {
        window.setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            recognitionActiveRef.current = false;
            setIsListening(false);
          }
        }, 250);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        userStoppedRef.current = true;
        recognition.stop();
      } catch (e) {
        // ignore
      }
    };
  }, [sendMessage]);

  const toggleListening = () => {
    if (!speechSupported) {
      // Allow the user to start the video even if speech recognition is unavailable.
      setIsListening(true);
      playVideoSource(currentVideo);
      return;
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      userStoppedRef.current = true;
      recognitionActiveRef.current = false;
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      return;
    }

    setLiveTranscript("");
    try {
      userStoppedRef.current = false;
      recognitionActiveRef.current = true;
      recognitionRef.current.start();
      setIsListening(true);
      playVideoSource(currentVideo);
    } catch {
      recognitionActiveRef.current = false;
      setIsListening(false);
    }
  };

  useEffect(() => {
    // If no socket URL provided, skip socket initialization (frontend-only mode)
    if (!socketUrl) return undefined;

    const socket = io(socketUrl, {
      autoConnect: false,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("ai:message", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          text: message,
        },
      ]);

      showConversationBubble("ai", message);
    });

    socket.connect();

    return () => {
      socket.disconnect();
      if (bubbleTimerRef.current) {
        clearTimeout(bubbleTimerRef.current);
      }
    };
  }, [socketUrl, showConversationBubble]);

  return (
    <main className="live-session-shell page-surface min-h-[calc(100vh-78px)] px-3 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="live-session-layout mx-auto grid w-full max-w-[90rem] gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.75fr)]">
        <section className="space-y-5">
          <article ref={videoStageRef} className="live-session-video-stage overflow-hidden border border-slate-300 bg-slate-950 shadow-[0_24px_55px_-30px_rgba(15,23,42,0.6)] dark:border-cyan-300/50 dark:bg-slate-950 dark:shadow-[0_24px_55px_-30px_rgba(8,145,178,0.3)]">
            <div className="live-session-header flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:px-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
                  Live session
                </p>
                  <h1 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">
                  Emotional support conversation
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-blue-300 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-cyan-300 dark:bg-blue-500/10 dark:text-cyan-200">
                  Active
                </span>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="border border-slate-300 bg-white p-2 text-slate-900 transition hover:border-blue-600 hover:text-blue-600 dark:border-cyan-200 dark:bg-slate-900 dark:text-white dark:hover:text-cyan-300"
                  aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
                  title={isFullscreen ? "Exit full screen" : "Enter full screen"}
                >
                  {isFullscreen ? (
                    <ArrowsPointingInIcon className="h-4 w-4" />
                  ) : (
                    <ArrowsPointingOutIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-video w-full bg-slate-900">
              {/* 📹 Show triggered video if available */}
              {currentVideo ? (
                <div className="relative h-full w-full flex flex-col items-center justify-center bg-slate-950">
                  <video
                    ref={videoRef}
                    src={currentVideo}
                    autoPlay
                    preload="auto"
                    loop={currentVideo === listeningVideo && isListening}
                    playsInline
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-5000 ease-in-out ${isVideoFading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                    muted={false}
                    onLoadedData={() => {
                      if (isVideoFading) {
                        setIsVideoFading(false);
                      }
                      const video = videoRef.current;
                      if (video) {
                        video.muted = false;
                        video.volume = 1;
                        const promise = video.play();
                        if (promise?.catch) {
                          promise.catch(() => {
                            // Ignore playback permission errors.
                          });
                        }
                      }
                    }}
                    onEnded={() => {
                      if (currentVideo === listeningVideo) {
                        if (!isListening) {
                          changeVideoWithTransition(nothingVideo, "");
                        }
                      } else {
                        // Any non-listening video: return to idle nothing loop
                        changeVideoWithTransition(nothingVideo, "");
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
                  <img
                    src={avtar1}
                    alt="HumDard Avatar"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end pb-12">
                    <p className="text-lg uppercase tracking-widest text-white font-bold">
                      HumDard AI
                    </p>
                    <p className="mt-2 text-sm text-white/80 text-center max-w-xs">
                      Start speaking to begin your session
                    </p>
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="border border-slate-300 bg-white p-5 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-[#181818]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
                  Session details
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-3xl">
                  HumDard AI live care session
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
                  <AcademicCapIcon className="h-4 w-4" />
                  Guided support
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-rose-600 dark:bg-rose-500/10 dark:text-rose-200">
                  <HeartIcon className="h-4 w-4" />
                  Mood: calm
                </span>
              </div>
            </div>
          </article>

          <article className="border border-slate-300 bg-white p-5 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-[#181818]">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                  Start your session
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Speak naturally and receive calm, supportive guidance in real time.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`inline-flex items-center gap-2 border border-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition dark:border-cyan-200 ${
                    isListening
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <MicrophoneIcon className="h-5 w-5" />
                  {isListening ? "Stop session" : "Start session"}
                </button>
              </div>
            </div>

            {!speechSupported && (
              <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
                Speech recognition is not available in this browser.
              </p>
            )}

            <div className="mt-4 border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {isListening ? "Listening" : "Ready"}
              </p>
              <div className="mt-3 border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-[#111827]">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {isListening
                    ? liveTranscript || "Listening for your question..."
                    : "Start session to speak with HumDard AI."}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {isListening
                    ? "Speak clearly and the assistant will respond once you stop."
                    : "Tap the mic button to begin."}
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="live-session-chat flex min-h-[620px] flex-col overflow-hidden border border-slate-300 bg-white shadow-[0_20px_45px_-26px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-[#181818] dark:shadow-[0_20px_45px_-26px_rgba(8,145,178,0.25)] lg:min-h-[calc(100vh-7rem)]">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              <ChatBubbleLeftRightIcon className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
              Live Chat
            </h2>
            <span className="border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Top chat
            </span>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-100/70 dark:bg-[#111111]">
            <ChatBox
              conversationBubble={conversationBubble}
              messages={messages}
              onSendMessage={sendMessage}
              sampleQuestions={sampleQuestions}
              onSampleQuestion={handleSampleQuestion}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default LiveSession;
