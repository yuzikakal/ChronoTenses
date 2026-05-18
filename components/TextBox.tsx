// components/TextBox.tsx
"use client";
import { useEffect, useRef, type ReactNode } from "react"; 
import { useMenu } from "@/app/hooks/menuContext"; 
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

interface TextBoxProps {
  speakerName?: string; 
  displayedText: string; 
  displayNext?: ReactNode;
  isTyping: boolean; 
  onClick: () => void;
}

export default function TextBox({ 
  speakerName = "CHRONO", 
  displayedText, 
  displayNext = "▼",
  isTyping, 
  onClick 
}: TextBoxProps) {
  const { sfxVolume } = useMenu(); 
  
  const blipAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!blipAudioRef.current) {
      blipAudioRef.current = new Audio("/sfx/typing.mp3");
    }
  }, []);

  useEffect(() => {
    if (isTyping && displayedText.length > 0) {
      if (blipAudioRef.current) {
        blipAudioRef.current.volume = sfxVolume * 0.6; 
        blipAudioRef.current.currentTime = 0; 
        blipAudioRef.current.play().catch(() => {}); 
      }
    }
  }, [displayedText, isTyping, sfxVolume]);

  return (
    <div 
      onClick={onClick}
      className="relative z-10 w-full max-w-[90%] md:max-w-[70%] bg-chrono-dark/85 backdrop-blur-md hover:bg-chrono-dark border-4 border-chrono-gold/60 rounded-[2rem] p-6 md:p-8 lg:p-10 2xl:p-10 cursor-pointer transition-all shadow-[0_0_30px_rgba(255,215,0,0.15)] text-md lg:text-2xl xl:text-4xl flex justify-center group"
    >
      <div className={`absolute -top-6 md:-top-8 xl:-top-10 left-5 bg-chrono-gold text-chrono-dark px-6 py-1 md:py-3 font-black rounded-2xl text-base md:text-xl xl:text-3xl ${cinzel.className}`}>
        {speakerName}
      </div>

      <p className="text-chrono-text font-medium text-center leading-relaxed min-h-[80%] w-full xl:max-w-[90%] drop-shadow-sm text-lg md:text-2xl lg:text-3xl 2xl:text-4xl">
        {displayedText}
      </p>

      {!isTyping && displayNext && (
        <div className="absolute bottom-4 right-3 lg:right-8 text-chrono-gold animate-bounce">
          <span className="text-lg md:text-3xl">{displayNext}</span>
        </div>
      )}
      
      <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 pointer-events-none group-hover:border-chrono-gold/50 transition-colors"></div>
    </div>
  );
}