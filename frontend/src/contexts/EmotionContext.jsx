import { createContext, useContext, useMemo, useState } from "react";

const EmotionContext = createContext(null);

export function EmotionProvider({ children }) {
  const [emotion, setEmotion] = useState("neutral");
  const [intensity, setIntensity] = useState(20);
  const [keywords, setKeywords] = useState([]);

  const updateEmotion = ({
    emotion: nextEmotion,
    intensity: nextIntensity,
    keywords: nextKeywords,
  } = {}) => {
    setEmotion(nextEmotion || "neutral");
    setIntensity(Math.min(100, Math.max(0, nextIntensity ?? 20)));
    setKeywords(Array.isArray(nextKeywords) ? nextKeywords : []);
  };

  const resetEmotion = () => {
    setEmotion("neutral");
    setIntensity(20);
    setKeywords([]);
  };

  const value = useMemo(
    () => ({ emotion, intensity, keywords, updateEmotion, resetEmotion }),
    [emotion, intensity, keywords],
  );

  return (
    <EmotionContext.Provider value={value}>{children}</EmotionContext.Provider>
  );
}

export function useEmotion() {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error("useEmotion must be used within an EmotionProvider");
  }
  return context;
}
