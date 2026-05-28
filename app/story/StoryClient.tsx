// app/story/StoryClient.tsx
"use client";
import { useRouter } from "next/navigation";
import { SkipForward, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import TextBox from "@/components/TextBox";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { useMenu } from "@/app/hooks/menuContext";
import GrammarPanel from "@/components/panel/GrammarPanel";

const storyData = [
  { text: "Hello! I'm Chrono, the time keeper.", img: "/characters/chrono-hi.png" },
  { text: "The past and the future are mixing up. We must fix it!", img: "/characters/chrono-crack.png" },
  { text: "I need your help to fix the broken Time-Logs.", img: "/characters/chrono-idle.png" },
  { text: "You have to type the correct missing words to fill Chrono Energy. Let me show you how to play!", img: "/characters/chrono-bar.png" },
];

const tutorialSlides = [
  { mobile: "/tutorial/step1-mobile.png", tablet: "/tutorial/step1-desktop.png", desktop: "/tutorial/step1-desktop.png" },
  { mobile: "/tutorial/step2-mobile.png", tablet: "/tutorial/step2-desktop.png", desktop: "/tutorial/step2-desktop.png" },
  { mobile: "/tutorial/step3-mobile.png", tablet: "/tutorial/step3-desktop.png", desktop: "/tutorial/step3-desktop.png" },
];

export default function StoryClient() {
  const router = useRouter();
  const [currentLine, setCurrentLine] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [fase, setFase] = useState("story");
  const [currentSlide, setCurrentSlide] = useState(0);

  const { textSpeed, playSfx } = useMenu();

  const currentStory = storyData[currentLine];

  const { displayedText, isTyping, skip } = useTypewriter(
    currentStory.text,
    textSpeed
  );

  useEffect(() => {
    const preloadImages = [
      ...storyData.map(s => s.img),
      ...tutorialSlides.flatMap(s => [s.mobile, s.tablet, s.desktop])
    ];

    preloadImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
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
        playSfx('flip');
        setFase("tutorial");
      }
    }
  }, [isTyping, skip, currentLine, playSfx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        if (fase === "story") handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, fase]);

  const nextSlide = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      playSfx('flip');
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      playSfx('flip');
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <main className="bg-langit bg-cover h-screen flex items-center justify-center text-4xl md:text-5xl text-black bg-[75%_center] 2xl:bg-center relative overflow-hidden">
      <section className="sr-only">
        <h1>Chrono Tenses Story</h1>
        <p>
          Chrono Tenses is an interactive English learning game where players
          travel through time and repair broken timelines by mastering English tenses.
        </p>
      </section>

      {/* SKIP BUTTON */}
      <button
        onClick={() => router.push("/game")}
        className={`z-[70] absolute top-8 right-8 text-white/50 hover:text-white font-mono tracking-widest items-center flex transition-colors duration-300 ${fase !== "story" && 'hidden lg:block'}`}
      >
        SKIP <SkipForward className="inline-block ml-1 size-10 xl:size-12" />
      </button>

      {/* WADAH FASE (SLIDING CONTROLLER) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/40">

        {/* FASE 1: DIALOG CERITA */}
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${fase !== "story" ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}>
          <div className="w-full h-full bottom-0 flex flex-col items-center justify-end pb-10">
            <div className="absolute bottom-36 md:bottom-56 select-none animate-breathe cursor-pointer" onClick={handleNext}>
              <Image
                src={currentStory.img}
                alt="Chrono"
                width={400}
                height={500}
                className={`w-72 md:w-80 lg:w-96 xl:w-120 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)] select-none ${isFading ? 'animate-fade-out' : 'animate-fade-in'}`}
                priority
                draggable="false"
              />
            </div>
            <TextBox
              speakerName="CHRONO"
              displayedText={displayedText}
              displayNext="▼"
              isTyping={isTyping}
              onClick={handleNext}
            />
          </div>
        </div>

        {/* FASE 2: TUTORIAL CAROUSEL */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700 ease-in-out ${fase === "tutorial" ? "translate-x-0 opacity-100" : fase === "story" ? "translate-x-full opacity-0 pointer-events-none" : "-translate-x-full opacity-0 pointer-events-none"}`}>
          <h2 className="text-chrono-gold font-bold text-2xl md:text-4xl mb-6 tracking-[0.2em] uppercase drop-shadow-lg">
            How to Play
          </h2>

          <div className="relative w-full max-w-7xl flex-1 max-h-[80vh] bg-transparent overflow-hidden flex items-center justify-center">
            <Image
              src={tutorialSlides[currentSlide].mobile}
              alt={`Tutorial Step ${currentSlide + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              className="object-contain transition-opacity duration-300 block md:hidden lg:hidden"
              priority={currentSlide === 0}
            />
            <Image
              src={tutorialSlides[currentSlide].tablet}
              alt={`Tutorial Step ${currentSlide + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              className="object-contain transition-opacity duration-300 hidden md:block lg:hidden"
              priority={currentSlide === 0}
            />
            <Image src={tutorialSlides[currentSlide].desktop}
              alt={`Tutorial Step ${currentSlide + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              className="object-contain transition-opacity duration-300 hidden md:hidden lg:block"
              priority={currentSlide === 0}
            />

            {currentSlide > 0 && (
              <button onClick={prevSlide} className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 p-0 md:p-3 rounded-full text-white hover:text-chrono-gold transition-all z-10 shadow-xl">
                <ChevronLeft size={50} className="size-10 lg:size-13" />
              </button>
            )}

            {currentSlide < tutorialSlides.length - 1 ? (
              <button onClick={nextSlide} className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 p-0 md:p-3 rounded-full text-white hover:text-chrono-gold transition-all z-10 shadow-xl">
                <ChevronRight size={50} className="size-10 lg:size-13" />
              </button>
            ) : (
              <button 
                onClick={() => { playSfx('flip'); setFase("module"); }} 
                className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 text-chrono-gold p-3 rounded-full font-black hover:brightness-110 transition-all z-10 shadow-xl animate-pulse"
              >
                <ChevronRight size={50} className="size-10 lg:size-13" />
              </button>
            )}
          </div>

          <div className="flex gap-3 mt-4 md:mt-6 xl:mt-8">
            {tutorialSlides.map((_, index) => (
              <div key={index} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-chrono-gold scale-125' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* FASE 3: GRAMMAR PANEL */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${fase === "module" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
          <GrammarPanel 
            onStartMission={() => {
              playSfx('click');
              router.push("/game");
            }} 
          />
        </div>

      </div>
    </main>
  );
}