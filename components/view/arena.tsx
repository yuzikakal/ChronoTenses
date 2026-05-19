"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { generateAISoal, checkAIAnswer, type Soal } from "@/lib/aiService";
import TextBox from "@/components/TextBox";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { useMenu } from "@/app/hooks/menuContext";

type ArenaProps = {
  era: string;
  prevEra: string; // TAMBAHAN
  history: string[];
  onBack: (
    isCorrect: boolean,
    explanation: string,
    lastSoalText: string,
    userAnswer: string,
    correctAnswer: string,
    hint: string,
    context: string
  ) => void;
  onUseHint: () => void;
};

type ThemeStyle = {
  box: string;
  badge: string;
  inputFocus: string;
  hintText: string;
  hintBtn: string;
  btn: string;
};

const eraThemes: Record<string, ThemeStyle> = {
  past: {
    box: "border-orange-800/60 shadow-[0_0_30px_rgba(154,52,18,0.5)]",
    badge: "from-orange-900 to-amber-700 shadow-[0_0_15px_rgba(154,52,18,0.6)] text-orange-100 border-orange-950",
    inputFocus: "focus:border-orange-500 focus:bg-[#2a1a11]/80",
    hintText: "text-orange-300",
    hintBtn: "hover:bg-orange-900/40 border-orange-800/50",
    btn: "from-orange-700 via-amber-600 to-orange-800 hover:from-orange-600 hover:to-amber-500 shadow-[0_5px_0_rgb(124,45,18)] hover:shadow-[0_2px_0_rgb(124,45,18)] text-white",
  },
  present: {
    box: "border-yellow-500/40 shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    badge: "from-yellow-600 to-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] text-black border-black",
    inputFocus: "focus:border-yellow-400 focus:bg-black/80",
    hintText: "text-white",
    hintBtn: "hover:bg-yellow-500/30 border-yellow-500/50",
    btn: "from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 shadow-[0_5px_0_rgb(180,110,0)] hover:shadow-[0_2px_0_rgb(180,110,0)] text-black",
  },
  future: {
    box: "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.5)]",
    badge: "from-fuchsia-600 to-cyan-500 shadow-[0_0_15px_rgba(217,70,239,0.6)] text-white border-cyan-900",
    inputFocus: "focus:border-cyan-400 focus:bg-[#081a2e]/80",
    hintText: "text-cyan-300",
    hintBtn: "hover:bg-cyan-500/20 border-cyan-500/30",
    btn: "from-cyan-500 via-blue-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 shadow-[0_5px_0_rgb(134,25,143)] hover:shadow-[0_2px_0_rgb(134,25,143)] text-white",
  },
};

export default function Arena({ era, prevEra, history, onBack, onUseHint }: ArenaProps) {
  const [soal, setSoal] = useState<Soal | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { textSpeed, sfxVolume, playSfx } = useMenu();

  const clockAudioRef = useRef<HTMLAudioElement | null>(null);

  // EFEK SFX JAM BERPUTAR (LOADING)
  useEffect(() => {
    if (loading) {
      if (!clockAudioRef.current) {
        clockAudioRef.current = new Audio("/sfx/clock.mp3");
      }

      if (clockAudioRef.current) {
        clockAudioRef.current.volume = sfxVolume * 0.6; // Dikali 0.6 biar ga kebisingan musiknya
        clockAudioRef.current.play().catch(() => { }); // Abaikan error browser block
      }
    }
    // Jika loading selesai, hentikan suara jam
    else {
      if (clockAudioRef.current) {
        clockAudioRef.current.pause();
        clockAudioRef.current.currentTime = 0; // Reset
      }
    }

    // Cleanup saat komponen unmount
    return () => {
      if (clockAudioRef.current) {
        clockAudioRef.current.pause();
      }
    };
  }, [loading, era, sfxVolume]); // Ter-trigger saat loading/era/volume berubah

  const dialogText = soal?.context ?? "Preparing your next time mission...";

  const [typingTrigger, setTypingTrigger] = useState(0);
  const { displayedText, isTyping, skip } = useTypewriter(dialogText, textSpeed, typingTrigger);

  const handleTextBoxClick = useCallback(() => {
    if (isTyping) {
      skip();
    } else {
      setTypingTrigger((prev) => prev + 1);
    }
  }, [isTyping, skip]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        const target = e.target as HTMLElement | null;
        const isTypingField =
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target?.isContentEditable;
        if (isTypingField) return;
        e.preventDefault();
        handleTextBoxClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTextBoxClick]);

  const theme = eraThemes[era] || eraThemes.present;

  const getClockAnimation = () => {
    const eraIndex: Record<string, number> = { past: 0, present: 1, future: 2 };

    const current = eraIndex[era] ?? 1;
    const prev = eraIndex[prevEra] ?? 1; // Default 1 (present) jika pertama kali main
    // Jika era sekarang sama dengan era sebelumnya, jam diam
    if (current === prev) return "";
    if (current > prev) {
      return "motion-safe:animate-[spin_1s_linear_infinite]";
    }
    return "motion-safe:animate-[spin_1s_linear_infinite_reverse]";
  };

  // Gambar jam dinamis berdasarkan era
  const clockSrc = era === "past" ? "/jam.png" : "/jamR.png";

  useEffect(() => {
    const loadSoal = async () => {
      setLoading(true);
      setShowHint(false);
      setUserAnswer("");
      const newSoal = await generateAISoal(era, history);
      setSoal(newSoal);
      setLoading(false);
    };
    loadSoal();
  }, [era, history]);

  const handleSubmit = async () => {
    if (!soal || !userAnswer.trim() || isChecking) return;

    setIsChecking(true);
    const { isCorrect, explanation } = await checkAIAnswer({
      era,
      userAnswer,
      correctAnswer: soal.answer,
      questionText: soal.text,
    });

    setIsChecking(false);
     if (isCorrect) {
      playSfx("correct"); 
      playSfx("yeay"); 
    } else {
      playSfx("wrong");
    }

    onBack(isCorrect, explanation, soal.text, userAnswer, soal.answer, soal.hint, soal.context || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <div className="w-full max-w-lg xl:max-w-2xl mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-500 pb-40">
        {loading ? (
          <div className="text-white text-xl font-bold tracking-widest text-center flex flex-col items-center justify-center h-[300px]">
            {/* GABUNGAN IMAGE DENGAN ANIMASI DINAMIS */}
            <Image
              src={clockSrc}
              alt={`${era} time`}
              width={80}
              height={80}
              className={`w-50 h-50 xl:w-70 xl:h-70 mb-4 ${getClockAnimation()}`}
              loading="eager"
              draggable="false"
            />
            <div className="animate-pulse">
              TRAVELING TO THE {era.toUpperCase()}...
            </div>
          </div>
        ) : (
          <>
            <div
              className={`w-full relative bg-black/50 backdrop-blur-sm border-2 p-4 lg:p-6 md:p-8 rounded-3xl flex flex-col items-center text-center mt-4 transition-colors duration-700 ${theme.box}`}
            >
              {soal?.context && (
                <div
                  className={`absolute -top-4 bg-gradient-to-r px-6 py-1.5 rounded-full text-xs md:text-sm font-extrabold tracking-widest border-2 ${theme.badge}`}
                >
                  {era.toUpperCase()} ERA
                </div>
              )}

              <p className="text-white text-lg md:text-2xl xl:text-4xl font-semibold leading-relaxed mt-2 md:mt-4 drop-shadow-md">
                {soal?.text}
              </p>
            </div>

            <div className="w-full flex flex-col gap-4 mt-2">
              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isChecking}
                placeholder="Type your answer here..."
                autoFocus
                className={`w-full p-4 md:p-5 bg-black/60 text-white placeholder-white/30 border-2 border-white/20 rounded-2xl focus:outline-none text-center text-sm md:text-xl transition-all duration-300 disabled:opacity-50 shadow-inner ${theme.inputFocus}`}
              />

              {soal?.hint && (
                <div className="flex justify-center min-h-[50px] items-center">
                  {!showHint ? (
                    <button
                      onClick={() => {
                        playSfx("hint");
                        if (showHint) return;
                        onUseHint();
                        setShowHint(true);
                      }}
                      className={`group flex items-center gap-2 bg-black/50 border px-5 py-2 rounded-full transition-all duration-300 active:scale-95 cursor-pointer ${theme.hintBtn}`}
                    >
                      <span className="text-sm md:text-xl group-hover:scale-110 transition-transform duration-300">
                        💡
                      </span>
                      <span className={`text-sm font-medium ${theme.hintText}`}>
                        Need a Hint?
                      </span>
                    </button>
                  ) : (
                    <p
                      className={`text-sm md:text-base text-center font-medium bg-black/60 px-6 py-3 rounded-2xl border animate-in fade-in slide-in-from-bottom-2 duration-300 ${theme.hintText} ${theme.hintBtn.replace("hover:", "")}`}
                    >
                      <span className="mr-2">💡</span>
                      {soal.hint}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isChecking || !userAnswer.trim()}
              className={`w-full py-3 lg:py-4 rounded-2xl font-black text-sm md:text-lg lg:text-xl tracking-widest bg-gradient-to-r active:scale-[0.98] transition-all hover:translate-y-1 disabled:opacity-50 disabled:active:scale-100 disabled:translate-y-0 ${theme.btn}`}
            >
              {isChecking ? "CHECKING..." : "SUBMIT ANSWER"}
            </button>
          </>
        )}
      </div>

      {!loading && (
        <div className="fixed bottom-0 left-0 flex justify-center w-full pb-12 xl:pb-10 z-40 pointer-events-none">
          <div className="pointer-events-auto w-full flex justify-center">
            <TextBox
              speakerName="CHRONO"
              displayedText={displayedText}
              displayNext={
                <Image
                  src="/characters/chrono-icon.png"
                  alt="Next"
                  width={30}
                  height={30}
                  className="drop-shadow-md size-8 md:size-10 xl:size-12 animate-bounce"
                />
              }
              isTyping={isTyping}
              onClick={handleTextBoxClick}
            />
          </div>
        </div>
      )}
    </>
  );
}