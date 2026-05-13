// /components/view/hub.tsx
"use client"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import TextBox from "@/components/TextBox" // Komponen tampilan kotak RPG-mu
import { useTypewriter } from "@/app/hooks/useTypewriter" // hook
import { useMenu } from "@/app/hooks/menuContext" // untuk akses setting suara

interface HubProps {
  onPilihEra: (pilihan: string) => void
}

export default function Hub({ onPilihEra }: HubProps) {
  const teksHub = "Which time should we visit first, friend?"
  const { textSpeed, sfxVolume, playSfx } = useMenu(); 

  const [typingTrigger, setTypingTrigger] = useState(0)
  const { displayedText, isTyping, skip } = useTypewriter(
    teksHub,
    textSpeed,
    typingTrigger,
  )

  // 3. Fungsi jika kotak RPG diklik
  const handleTextBoxClick = useCallback(() => {
    if (isTyping) {
      skip() // Kalau masih ngetik, langsung tamatkan
    } else {
      setTypingTrigger((prev) => prev + 1)
    }
  }, [isTyping, skip])

  // Keyboard listener
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
    <div className="flex flex-col items-center xl:place-items-baseline fixed inset-0 w-full h-full overflow-hidden">
      <div className="flex flex-col justify-start md:justify-center gap-4 h-full w-full xl:w-5xl px-5 pt-24 md:pt-0 pb-40 xl:pb-30 xl:pl-60 overflow-y-auto">
        {/* Tombol PAST */}
        <button
          onClick={() => onPilihEra("past")}
          className="text-chrono-dark px-6 py-2 rounded-[1.5rem] text-xl md:text-3xl font-black transition-all active:scale-95 text-left flex flex-row justify-between items-center
        bg-gradient-to-r from-yellow-400 to-orange-500 border-b-4 border-orange-800 shadow-xl"
        >
          PAST
          <Image
            src="/jam.png"
            alt="past time"
            width={80}
            height={80}
            className="w-16 h-16 xl:w-28 xl:h-28 motion-safe:animate-[spin_4s_linear_infinite_reverse]"
            loading="eager"
            draggable="false"
          />
        </button>

        {/* Tombol PRESENT */}
        <button
          onClick={() => onPilihEra("present")}
          className="text-white px-6 py-2 rounded-[1.5rem] text-xl md:text-3xl font-black transition-all active:scale-95 text-left flex flex-row justify-between items-center
        bg-gradient-to-r from-cyan-500 to-blue-600 border-b-4 border-blue-900 shadow-xl"
        >
          PRESENT
          <Image
            src="/jamR.png"
            alt="present time"
            width={80}
            height={80}
            className="w-16 h-16 xl:w-28 xl:h-28"
            loading="eager"
            draggable="false"
          />
        </button>

        {/* Tombol FUTURE */}
        <button
          onClick={() => onPilihEra("future")}
          className="text-white px-6 py-2 rounded-[1.5rem] text-xl md:text-3xl font-black transition-all active:scale-95 text-left flex flex-row justify-between items-center
        bg-gradient-to-r from-purple-600 to-indigo-600 border-b-4 border-indigo-900 shadow-xl"
        >
          FUTURE
          <Image
            src="/jam.png"
            alt="future time"
            width={80}
            height={80}
            className="w-16 h-16 xl:w-28 xl:h-28 motion-safe:animate-[spin_4s_linear_infinite]"
            loading="eager"
            draggable="false"
          />
        </button>
      </div>

      {/* TextBox */}
      <div className="fixed bottom-0 flex justify-center w-full px-4 pb-10">
        <TextBox
          speakerName="CHRONO"
          displayedText={displayedText}
          displayNext=""
          isTyping={isTyping}
          onClick={handleTextBoxClick}
        />
      </div>
    </div>
  )
}
