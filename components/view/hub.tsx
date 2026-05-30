// /components/view/hub.tsx
"use client"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import TextBox from "@/components/TextBox"
import { useTypewriter } from "@/app/hooks/useTypewriter"
import { useMenu } from "@/app/hooks/menuContext"

interface HubProps {
  onPilihEra: (pilihan: string) => void
}

export default function Hub({ onPilihEra }: HubProps) {
  const teksHub = "Which time should we visit, my friend?"
  const { textSpeed, playSfx } = useMenu(); 

  const [typingTrigger, setTypingTrigger] = useState(0)
  const { displayedText, isTyping, skip } = useTypewriter(
    teksHub,
    textSpeed,
    typingTrigger,
  )

  const handleTextBoxClick = useCallback(() => {
    if (isTyping) {
      skip()
    } else {
      setTypingTrigger((prev) => prev + 1)
    }
  }, [isTyping, skip])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault()
        handleTextBoxClick()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleTextBoxClick])

  return (
    // Container utama: Di Mobile colom (bawah-an), di MD keatas jadi baris (kiri-kanan)
    <div className="fixed inset-0 w-full h-full flex flex-col md:flex-row overflow-hidden">
      
      {/* BAGIAN KIRI: TOMBOL-TOMBOL ERA */}
      <div className="flex-1 flex flex-col justify-center gap-4 h-full px-5 pt-24 md:pt-0 md:px-10 xl:pl-50 2xl:pl-70 xl:pr-0 pb-40 overflow-y-auto">
        {/* Tombol PAST */}
        <button
          onClick={() => { playSfx('click'); onPilihEra("past") }}
          className="text-chrono-dark px-6 py-2 rounded-[1.5rem] text-xl md:text-3xl font-black transition-all active:scale-95 text-left flex flex-row justify-between items-center bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_5px_0_rgb(154,52,18)] hover:shadow-[0_2px_0_rgb(154,52,18)] hover:translate-y-[3px]"
        >
          PAST
          <Image src="/jam.png" alt="past time" width={80} height={80} className="w-16 h-16 xl:w-28 xl:h-28 motion-safe:animate-[spin_4s_linear_infinite_reverse]" loading="eager" draggable="false" />
        </button>

        {/* Tombol PRESENT */}
        <button
          onClick={() => { playSfx('click'); onPilihEra("present") }}
          className="text-white px-6 py-2 rounded-[1.5rem] text-xl md:text-3xl font-black transition-all active:scale-95 text-left flex flex-row justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_5px_0_rgb(30,58,138)] hover:shadow-[0_2px_0_rgb(30,58,138)] hover:translate-y-[3px]"
        >
          PRESENT
          <Image src="/jamR.png" alt="present time" width={80} height={80} className="w-16 h-16 xl:w-28 xl:h-28" loading="eager" draggable="false" />
        </button>

        {/* Tombol FUTURE */}
        <button
          onClick={() => { playSfx('click'); onPilihEra("future") }}
          className="text-white px-6 py-2 rounded-[1.5rem] text-xl md:text-3xl font-black transition-all active:scale-95 text-left flex flex-row justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_5px_0_rgb(55,48,163)] hover:shadow-[0_2px_0_rgb(55,48,163)] hover:translate-y-[3px]"
        >
          FUTURE
          <Image src="/jam.png" alt="future time" width={80} height={80} className="w-16 h-16 xl:w-28 xl:h-28 motion-safe:animate-[spin_4s_linear_infinite]" loading="eager" draggable="false" />
        </button>
      </div>

      {/* BAGIAN KANAN: KARAKTER CHRONO (HIDDEN DI MOBILE) */}
      <div className="hidden md:flex w-1/3 lg:w-2/5 items-center justify-center pointer-events-none select-none pr-5 lg:pr-10 pb-20">
        <div className="animate-breathe">
          <Image
            src="/characters/chrono-hmm.png"
            alt="Chrono"
            width={400}
            height={500}
            className="w-64 lg:w-80 xl:w-96 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            priority
          />
        </div>
      </div>

      {/* TEXTBOX */}
      <div className="fixed bottom-0 flex justify-center w-full px-4 pb-10 z-30">
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
  )
}