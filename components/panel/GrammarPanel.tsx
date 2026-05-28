"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";

const moduleData = [
  {
    era: "PAST",
    title: "Past Dimension",
    accent: "text-amber-400 border-amber-500/50",
    activeBg: "bg-amber-500/20 border-amber-400",
    glow: "shadow-amber-500/20",
    aspects: [
      {
        name: "Simple",
        plus: "S + V2",
        minus: "S + did not + V1",
        question: "Did + S + V1?",
        exPlus: "Chrono fixed the timeline.",
        exMinus: "Chrono did not fix the timeline.",
        exQuestion: "Did Chrono fix the timeline?"
      },
      {
        name: "Continuous",
        plus: "S + was/were + V-ing",
        minus: "S + was/were not + V-ing",
        question: "Was/Were + S + V-ing?",
        exPlus: "The portal was glowing.",
        exMinus: "The portal was not glowing.",
        exQuestion: "Was the portal glowing?"
      },
      {
        name: "Perfect",
        plus: "S + had + V3",
        minus: "S + had not + V3",
        question: "Had + S + V3?",
        exPlus: "She had left before it broke.",
        exMinus: "She had not left before it broke.",
        exQuestion: "Had she left before it broke?"
      }
    ]
  },
  {
    era: "PRESENT",
    title: "Present Dimension",
    accent: "text-emerald-400 border-emerald-500/50",
    activeBg: "bg-emerald-500/20 border-emerald-400",
    glow: "shadow-emerald-500/20",
    aspects: [
      {
        name: "Simple",
        plus: "S + V1(s/es)",
        minus: "S + do/does not + V1",
        question: "Do/Does + S + V1?",
        exPlus: "He studies the logs.",
        exMinus: "He does not study the logs.",
        exQuestion: "Does he study the logs?"
      },
      {
        name: "Continuous",
        plus: "S + am/is/are + V-ing",
        minus: "S + am/is/are not + V-ing",
        question: "Am/Is/Are + S + V-ing?",
        exPlus: "Time is running out.",
        exMinus: "Time is not running out.",
        exQuestion: "Is time running out?"
      },
      {
        name: "Perfect",
        plus: "S + have/has + V3",
        minus: "S + have/has not + V3",
        question: "Have/Has + S + V3?",
        exPlus: "We have repaired it.",
        exMinus: "We have not repaired it.",
        exQuestion: "Have we repaired it?"
      }
    ]
  },
  {
    era: "FUTURE",
    title: "Future Dimension",
    accent: "text-cyan-400 border-cyan-500/50",
    activeBg: "bg-cyan-500/20 border-cyan-400",
    glow: "shadow-cyan-500/20",
    aspects: [
      {
        name: "Simple",
        plus: "S + will + V1",
        minus: "S + will not + V1",
        question: "Will + S + V1?",
        exPlus: "We will win this fight.",
        exMinus: "We will not win this fight.",
        exQuestion: "Will we win this fight?"
      },
      {
        name: "Continuous",
        plus: "S + will be + V-ing",
        minus: "S + will not be + V-ing",
        question: "Will + S + be + V-ing?",
        exPlus: "I will be waiting for you.",
        exMinus: "I will not be waiting for you.",
        exQuestion: "Will I be waiting for you?"
      },
      {
        name: "Perfect",
        plus: "S + will have + V3",
        minus: "S + will not have + V3",
        question: "Will + S + have + V3?",
        exPlus: "You will have saved the world.",
        exMinus: "You will not have saved the world.",
        exQuestion: "Will you have saved the world?"
      }
    ]
  }
];

export default function GrammarPanel({ onStartMission }: { onStartMission: () => void }) {
  const [activeEra, setActiveEra] = useState(0);
  const [activeAspect, setActiveAspect] = useState(0);
  const [activeSentenceType, setActiveSentenceType] = useState<"+" | "-" | "?">("+");

  const currentEra = moduleData[activeEra];
  const currentAspect = currentEra.aspects[activeAspect];

  // Logic untuk menentukan contoh kalimat yang muncul
  const currentExample = 
    activeSentenceType === "+" ? currentAspect.exPlus :
    activeSentenceType === "-" ? currentAspect.exMinus :
    currentAspect.exQuestion;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-4 md:gap-6 h-full justify-center p-4 md:p-6">
      
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-chrono-gold font-black text-2xl md:text-4xl tracking-widest uppercase drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
          Temporal Briefing
        </h2>
        <p className="text-white/50 font-mono text-[10px] md:text-xs mt-2 tracking-wider">
          SELECT DIMENSION & SCAN GRAMMAR PATTERNS
        </p>
      </div>

      {/* MAIN TERMINAL BOX */}
      <div className={`relative w-full bg-black/60 border-2 ${currentEra.accent} rounded-2xl p-4 md:p-6 shadow-2xl ${currentEra.glow} backdrop-blur-md transition-all duration-500`}>
        
        {/* Scanline Effect (Decorative) */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,black_2px,black_4px)]"></div>

        {/* ERA SELECTOR */}
        <div className="flex gap-2 md:gap-4 mb-4 relative z-10">
          {moduleData.map((era, i) => (
            <button 
              key={i} 
              onClick={() => { setActiveEra(i); setActiveAspect(0); setActiveSentenceType("+"); }}
              className={`flex-1 py-2 md:py-3 border-2 font-black text-xs md:text-lg tracking-widest rounded-lg transition-all duration-300 uppercase
                ${activeEra === i 
                  ? `${era.activeBg} ${era.accent} scale-105 shadow-lg` 
                  : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white/70'}
              `}
            >
              {era.era}
            </button>
          ))}
        </div>

        {/* ASPECT SELECTOR */}
        <div className="flex gap-2 mb-5 relative z-10">
          {currentEra.aspects.map((asp, i) => (
            <button 
              key={i} 
              onClick={() => { setActiveAspect(i); setActiveSentenceType("+"); }}
              className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full font-bold text-[10px] md:text-sm tracking-wider transition-all duration-300 border
                ${activeAspect === i 
                  ? `bg-white/20 ${currentEra.accent} border-white/50` 
                  : 'bg-white/5 text-white/40 border-transparent hover:bg-white/10'}
              `}
            >
              {asp.name}
            </button>
          ))}
        </div>

        {/* FORMULA DISPLAY */}
        <div className="relative z-10 bg-black/40 rounded-xl p-3 md:p-5 border border-white/10 space-y-3 font-mono shadow-inner">
          
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-black text-xs md:text-base mt-0.5 shrink-0">[+]</span>
            <div className="text-sm md:text-lg text-white/90 tracking-wide break-all">{currentAspect.plus}</div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-black text-xs md:text-base mt-0.5 shrink-0">[-]</span>
            <div className="text-sm md:text-lg text-white/90 tracking-wide break-all">{currentAspect.minus}</div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-sky-400 font-black text-xs md:text-base mt-0.5 shrink-0">[?]</span>
            <div className="text-sm md:text-lg text-white/90 tracking-wide break-all">{currentAspect.question}</div>
          </div>

          {/* EXAMPLE SECTION - INTERACTIVE BUTTONS */}
          <div className="border-t border-white/10 pt-3 mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/40 font-bold text-[10px] md:text-xs tracking-widest uppercase">Example</span>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setActiveSentenceType("+")} 
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-md font-black text-xs md:text-sm flex items-center justify-center border transition-all
                    ${activeSentenceType === "+" ? 'bg-green-500/30 text-green-400 border-green-400 scale-110' : 'bg-white/5 text-white/30 border-white/10 hover:text-white/60'}`}
                >+</button>
                <button 
                  onClick={() => setActiveSentenceType("-")} 
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-md font-black text-xs md:text-sm flex items-center justify-center border transition-all
                    ${activeSentenceType === "-" ? 'bg-red-500/30 text-red-400 border-red-400 scale-110' : 'bg-white/5 text-white/30 border-white/10 hover:text-white/60'}`}
                >-</button>
                <button 
                  onClick={() => setActiveSentenceType("?")} 
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-md font-black text-xs md:text-sm flex items-center justify-center border transition-all
                    ${activeSentenceType === "?" ? 'bg-sky-500/30 text-sky-400 border-sky-400 scale-110' : 'bg-white/5 text-white/30 border-white/10 hover:text-white/60'}`}
                >?</button>
              </div>
            </div>
            <div className={`min-h-[40px] flex items-center text-sm md:text-base italic transition-all duration-300 ${
              activeSentenceType === "+" ? 'text-green-300/80' : 
              activeSentenceType === "-" ? 'text-red-300/80' : 'text-sky-300/80'
            }`}>
              {currentExample}
            </div>
          </div>

        </div>

      </div>

      {/* ACTION BUTTON - MATCHING REQUESTED STYLE */}
      <button 
        onClick={onStartMission}
        className="w-full max-w-md py-4 rounded-2xl font-black text-lg md:text-xl tracking-widest text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] transition-all shadow-[0_5px_0_rgb(180,110,0)] hover:shadow-[0_2px_0_rgb(180,110,0)] hover:translate-y-1 flex items-center justify-center gap-3 group cursor-pointer"
      >
        INITIALIZE MISSION 
        <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}