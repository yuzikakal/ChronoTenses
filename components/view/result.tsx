// /components/view/result.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Tambahan untuk Next.js routing
import Image from "next/image";
import TextBox from "@/components/TextBox";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { useMenu } from "@/app/hooks/menuContext";

type LogEntry = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  explanation: string;
  hint: string;
  context: string;
};

type ResultProps = {
  poin: number;
  log: LogEntry[];
  onRestart: () => void;
  onExit?: () => void;
};

export default function Result({ poin, log, onRestart, onExit }: ResultProps) {
  const router = useRouter(); // Inisialisasi router
  const isWin = poin >= 100;

  const [showChrono, setShowChrono] = useState(false);
  const [showActions, setShowActions] = useState(false); // State baru untuk tombol aksi
  const [typingTrigger, setTypingTrigger] = useState(0);
  const { textSpeed, playSfx } = useMenu();

  const chronoText = isWin
    ? "Hurray! Your secured the timeline. Thank you, Time Traveler!"
    : "Nice try! The timeline is still broken, but we can fix this together!";

  const { displayedText, isTyping, skip } = useTypewriter(
    showChrono && !showActions ? chronoText : "",
    textSpeed,
    typingTrigger
  );

  const handleNext = () => {
    playSfx('click');
    setShowChrono(true);
    setShowActions(false); // Reset agar TextBox muncul duluan
    setTypingTrigger(prev => prev + 1);
  };

  const handleBackToReview = () => {
    playSfx('flip');
    setShowChrono(false);
    setShowActions(false);
  };

  const handleTextBoxClick = useCallback(() => {
    if (isTyping) {
      skip(); // Jika masih ngetik, skip
    } else {
      playSfx('click');
      setShowActions(true); // Jika sudah selesai, ganti ke tombol aksi
    }
  }, [isTyping, skip]);

  return (
    <div className="fixed inset-0 px-4 pt-10 md:pt-16 pb-6 w-full max-w-2xl mx-auto flex flex-col items-center gap-4 md:gap-6 animate-in fade-in zoom-in duration-700 z-40">

      {/* =========================================
          HEADER STATUS
          ========================================= */}
      <div className="w-full bg-black/80 backdrop-blur-md p-5 md:p-6 rounded-3xl border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] text-center relative overflow-hidden shrink-0 z-10">
        <div className={`absolute top-0 left-0 w-full h-1 ${isWin ? "bg-green-500" : "bg-red-500"} shadow-[0_0_10px_currentColor]`}></div>
        <h1 className={`text-2xl md:text-5xl font-black tracking-widest ${isWin ? "text-green-400" : "text-red-500"} drop-shadow-lg`}>
          {isWin ? "MISSION CLEARED!" : "MISSION FAILED!"}
        </h1>
      </div>

      {/* =========================================
          WADAH KONTEN DENGAN ANIMASI SLIDE
          ========================================= */}
      <div className="w-full flex-1 relative overflow-hidden min-h-0">

        {/* === FASE 1: REVIEW LOG === */}
        <div className={`absolute inset-0 flex flex-col gap-4 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500/50 scrollbar-track-transparent transition-all duration-700 ease-in-out ${showChrono ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}>
          {log.map((item, index) => (
            <div key={index} className={`w-full p-5 rounded-2xl border ${item.isCorrect ? "bg-green-900/30 border-green-500/50" : "bg-red-900/30 border-red-500/50"} backdrop-blur-sm relative shrink-0`}>
              <div className="absolute top-4 right-4 text-2xl">{item.isCorrect ? "✅" : "❌"}</div>
              <p className="text-white/60 text-xs font-bold tracking-widest mb-2 uppercase">Question {index + 1}</p>
              <p className="text-white text-lg font-medium leading-relaxed pr-8">{item.question}</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                <p className="text-white/80 text-sm">
                  Your Answer: <span className={`font-bold px-2 py-1 rounded-md ${item.isCorrect ? "bg-green-500/30 text-green-300" : "bg-red-500/30 text-red-200"}`}>{item.userAnswer}</span>
                </p>
                <p className="text-yellow-200/90 text-sm italic">&quot;{item.explanation}&quot;</p>
              </div>
            </div>
          ))}
        </div>

        {/* === FASE 2: KARAKTER CHRONO (Tengah/Kanan) === */}
        <div className={`absolute inset-0 flex justify-center items-start p-2 transition-all duration-700 ease-in-out ${showChrono ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
          <div className="pointer-events-none select-none animate-breathe pb-4">
            <Image
              src={isWin ? "/characters/chrono-horay.png" : "/characters/chrono-wrong.png"}
              alt="Chrono Expression"
              width={400}
              height={500}
              className="w-72 md:w-80 lg:w-96 drop-shadow-[0_0_25px_rgba(255,215,0,0.2)]"
              priority
            />
          </div>
        </div>
        {/* Tampilkan Tombol Aksi (Menggantikan TextBox) */}
        {showActions && (
          <div className="absolute bottom-0 left-0 flex justify-center w-full z-30">
            <div className="w-full max-w-[90%] flex flex-col gap-3 animate-fade-in backdrop-blur-sm">

              {/* Tombol Play Again */}
              <button
                onClick={() => { playSfx('click'); onRestart(); }}
                className="w-full py-4 rounded-2xl font-black text-xl tracking-widest text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] transition-all shadow-[0_5px_0_rgb(180,110,0)] hover:shadow-[0_2px_0_rgb(180,110,0)] hover:translate-y-1"
              >
                PLAY AGAIN
              </button>

              {/* Tombol Home & Back to Review (Sejajar) */}
              <div className="flex gap-3">
                <button
                  onClick={() => { playSfx('click'); router.push('/'); }} // Next.js Router ke Root
                  className="flex-1 py-3 rounded-2xl font-bold text-sm tracking-widest text-chrono-text bg-white/10 border border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
                >
                  HOME
                </button>

                <button
                  onClick={handleBackToReview}
                  className="flex-1 py-3 rounded-2xl font-bold text-sm tracking-widest text-chrono-text bg-white/10 border border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
                >
                  BACK TO REVIEW
                </button>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================
          TOMBOL NEXT (Fase 1)
          ========================================= */}
      {!showChrono && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-black text-xl tracking-widest text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] transition-all shadow-[0_5px_0_rgb(180,110,0)] shrink-0 z-20"
        >
          NEXT
        </button>
      )}

      {/* BOTTOM AREA FASE 2 */}
      {showChrono && (
        <>

          {/* Tampilkan TextBox (Jika tombol aksi belum muncul) */}
          {!showActions && (
            <div className="fixed bottom-0 left-0 flex justify-center w-full pb-10 z-30 animated fade-in">
              <TextBox
                speakerName="CHRONO"
                displayedText={displayedText}
                displayNext={
                  <Image src="/characters/chrono-icon.png" alt="Next" width={30} height={30} className="drop-shadow-md size-8 md:size-10 xl:size-12 animate-bounce" />
                }
                isTyping={isTyping}
                onClick={handleTextBoxClick}
              />
            </div>
          )}

        </>
      )}

    </div>
  );
}