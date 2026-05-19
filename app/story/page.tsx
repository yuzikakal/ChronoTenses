// app/story/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { SkipForward, ChevronLeft, ChevronRight, Play } from "lucide-react"; // Tambah ikon carousel
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import TextBox from "@/components/TextBox";
import { useTypewriter } from "@/app/hooks/useTypewriter"; 
import { useMenu } from "@/app/hooks/menuContext";

const storyData = [
  { text: "Hello! I'm Chrono, the time keeper.", img: "/characters/chrono-hi.png" }, 
  { text: "The past and the future are mixing up. We must fix it!", img: "/characters/chrono-crack.png" }, 
  { text: "I need your help to fix the broken Time-Logs.", img: "/characters/chrono-idle.png" }, 
  { text: "You have to type the correct missing words to fill Chrono Energy. Let me show you how to play!", img: "/characters/chrono-bar.png" },
];

// DATA TUTORIAL CAROUSEL
const tutorialSlides = [
  { 
    mobile: "/tutorial/step1-mobile.png", 
    tablet: "/tutorial/step1-tablet.png", 
    desktop: "/tutorial/step1-desktop.png" 
  },
  { 
    mobile: "/tutorial/step2-mobile.png", 
    tablet: "/tutorial/step2-tablet.png", 
    desktop: "/tutorial/step2-desktop.png" 
  },
  { 
    mobile: "/tutorial/step3-mobile.png", 
    tablet: "/tutorial/step3-tablet.png", 
    desktop: "/tutorial/step3-desktop.png" 
  },
];

export default function StoryPage() {
  const router = useRouter();
  const [currentLine, setCurrentLine] = useState(0);
  const [isFading, setIsFading] = useState(true);
  
  // State untuk Tutorial Carousel
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { textSpeed } = useMenu();

  const currentStory = storyData[currentLine];

  const { displayedText, isTyping, skip } = useTypewriter(
    currentStory.text,
    textSpeed
  );

  // Fade in saat pertama kali load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    if (isTyping) {
      skip();
    } else {
      if (currentLine < storyData.length - 1) {
        setIsFading(true);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setIsFading(false);
        }, 300);
      } else {
        // Jika dialog terakhir selesai, JANGAN langsung ke /game
        // Tampilkan modal tutorial
        setShowTutorial(true);
      }
    }
  }, [isTyping, skip, currentLine]);

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

  // Fungsi navigasi carousel
  const nextSlide = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <main className="bg-langit bg-cover h-screen flex items-center justify-center text-4xl md:text-5xl text-black bg-[75%_center] 2xl:bg-center relative overflow-hidden">
      
      {/* SKIP BUTTON (Z-Index dinaikkan ke 70 agar selalu di atas modal) */}
      <button
        onClick={() => router.push("/game")}
        className="z-[70] absolute top-8 right-8 text-white/50 hover:text-white font-mono tracking-widest items-center flex transition-colors duration-300"
      >
        SKIP <SkipForward className="inline-block ml-1 size-10 xl:size-12" />
      </button>

      {/* OVERLAY GELAP & KARAKTER (Akan tertutup modal jika showTutorial true) */}
      <div className="bg-black/40 w-full h-full bottom-0 flex flex-col items-center justify-end pb-10">
        <div className="absolute bottom-36 md:bottom-56 pointer-events-none select-none animate-breathe">
          <Image
            key={currentStory.img} // Key berubah = reset animasi fade-in otomatis
            src={currentStory.img}
            alt="Chrono"
            width={400}
            height={500}
            className={`w-72 md:w-80 lg:w-96 xl:w-120 animate-fade-in drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]
              ${isFading ? 'opacity-0' : 'opacity-100'}`}
            priority
          />
        </div>

        {/* TEXTBOX */}
        <TextBox
          speakerName="CHRONO"
          displayedText={displayedText}
          displayNext="▼"
          isTyping={isTyping}
          onClick={handleNext}
        />
      </div>

      {/* =========================================
          MODAL TUTORIAL CAROUSEL
          ========================================= */}
      {showTutorial && (
        <div className="fixed inset-0 z-[100] bg-langit bg-cover backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-fade-in">
          
          <h2 className="text-chrono-gold font-bold text-2xl md:text-4xl mb-6 tracking-[0.2em] uppercase drop-shadow-lg">
            How to Play
          </h2>
          
          {/* Container Carousel */}
          <div className="relative w-full max-w-7xl flex-1 max-h-[80vh] bg-black/50 border-2 border-chrono-gold/30 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.1)]">
            
            {/* Gambar Tutorial */}
            <Image
              src={tutorialSlides[currentSlide].mobile}
              alt={`Tutorial Step ${currentSlide + 1}`}
              fill
              className="object-contain p-4 md:p-8 transition-opacity duration-300 block md:hidden lg:hidden"
              priority
            />
            <Image
              src={tutorialSlides[currentSlide].tablet}
              alt={`Tutorial Step ${currentSlide + 1}`}
              fill
              className="object-contain p-4 md:p-8 transition-opacity duration-300 hidden md:block lg:hidden"
              priority
            />
            <Image
              src={tutorialSlides[currentSlide].desktop}
              alt={`Tutorial Step ${currentSlide + 1}`}
              fill
              className="object-contain p-4 md:p-8 transition-opacity duration-300 hidden md:hidden lg:block"
              priority
            />

            {/* Tombol Kiri (Muncul jika bukan slide pertama) */}
            {currentSlide > 0 && (
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-chrono-dark/80 border border-white/20 p-3 rounded-full text-white hover:bg-chrono-gold hover:text-chrono-dark transition-all z-10 shadow-xl"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Tombol Kanan / Play (Muncul di sisi kanan) */}
            {currentSlide < tutorialSlides.length - 1 ? (
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-chrono-dark/80 border border-white/20 p-3 rounded-full text-white hover:bg-chrono-gold hover:text-chrono-dark transition-all z-10 shadow-xl"
              >
                <ChevronRight size={24} />
              </button>
            ) : (
              // Jika ini slide terakhir, tombol kanan berubah jadi Play untuk mulai game
              <button 
                onClick={() => router.push("/game")}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-chrono-gold text-chrono-dark p-3 rounded-full font-black hover:brightness-110 transition-all z-10 shadow-xl"
              >
                <Play size={24} fill="currentColor" />
              </button>
            )}
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-3 mt-6">
            {tutorialSlides.map((_, index) => (
              <div 
                key={index} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-chrono-gold scale-125' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      )}

    </main>
  );
}