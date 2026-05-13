// hooks/useTypewriter.js
import { useState, useEffect, useCallback, useRef } from "react";

export function useTypewriter(fullText, speed = 40, triggerId = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Reset counter aja, jangan kosongin teks
    indexRef.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTyping(true);
    
    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        // Teks langsung ditimpa mulai dari indeks 1
        setDisplayedText(fullText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        intervalRef.current = null;
      }
    }, speed);

    intervalRef.current = interval;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fullText, speed, triggerId]);

  const skip = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayedText(fullText);
    setIsTyping(false);
  }, [fullText]);

  return { displayedText, isTyping, skip };
}