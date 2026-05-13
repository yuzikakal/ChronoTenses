"use client";
import { useRouter } from "next/navigation";
import { SkipForward } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import TextBox from "@/components/TextBox";
import { useTypewriter } from "@/app/hooks/useTypewriter"; // PAKAI HOOKNYA
import { useMenu } from "@/app/hooks/menuContext";

const storyLines = [
  "Hi! I'm Chrono, the time keeper.",
  "The past and the future are mixing up. We must fix it!",
  "I need your help to save time.",
  "Answer these questions to get power so we can go home!",
];

export default function StoryPage() {
  const router = useRouter();
  const [currentLine, setCurrentLine] = useState(0);
  const { textSpeed } = useMenu();

  // Text otomatis ngetik berdasarkan currentLine
  const { displayedText, isTyping, skip } = useTypewriter(
    storyLines[currentLine],
    textSpeed
  );

  const handleNext = useCallback(() => {
    if (isTyping) {
      skip(); // Langsung tampilkan semua teks
    } else {
      if (currentLine < storyLines.length - 1) {
        setCurrentLine(currentLine + 1); // Pindah ke kalimat berikutnya
      } else {
        router.push("/game"); // Selesai, pindah halaman
      }
    }
  }, [isTyping, skip, currentLine, router]);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  return (
    <main className="bg-langit bg-cover h-screen flex items-center justify-center text-4xl md:text-5xl text-black bg-[75%_center] 2xl:bg-center">
      <button
        onClick={() => router.push("/game")}
        className="z-50 absolute top-8 right-8 text-white/50 hover:text-white font-mono tracking-widest items-center flex transition-colors duration-300"
      >
        SKIP <SkipForward className="inline-block ml-1 size-10" />
      </button>

      <div className="bg-black/40 w-full h-full bottom-0 flex flex-col items-center justify-end pb-10">
        {/* Kita kirim data dari hook ke komponen TextBox */}
        <TextBox
          speakerName="CHRONO"
          displayedText={displayedText}
          displayNext="▼"
          isTyping={isTyping}
          onClick={handleNext}
        />
        {/* Nanti tinggal taruh <img karakter /> di samping TextBox ini */}
      </div>
    </main>
  );
}
