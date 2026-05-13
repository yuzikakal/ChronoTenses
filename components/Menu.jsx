"use client";
import { useState } from "react";
import { Settings, Info, ChevronUp } from "lucide-react";
import { useMenu } from "@/app/hooks/menuContext";
import SetPanel from "@/components/panel/SetPanel";
import InfoPanel from "@/components/panel/InfoPanel";

export default function Menu() {
  const { isSetOpen, setIsSetOpen, isInfoOpen, setIsInfoOpen } = useMenu();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isInfoOpen && <InfoPanel />}
      {isSetOpen && <SetPanel />}

      <div className="fixed p-4 pb-7 md:p-10 bottom-0 right-0 flex flex-col gap-3 items-center justify-center z-40">
        
        {/* Menu Items Container */}
        <div className={`
          flex flex-col items-center justify-around
          /* Ganti ke warna chrono-dark agar solid dan mewah */
          bg-chrono-dark/80 backdrop-blur-md border-2 border-chrono-gold/30 
          w-14 md:w-20 rounded-[2rem] overflow-hidden transition-all duration-500 ease-in-out
          shadow-[0_0_20px_rgba(0,0,0,0.3)]
          ${isOpen ? "h-40 md:h-56 opacity-100 py-4 mb-2" : "h-0 opacity-0 py-0 mb-0"}
        `}>
          <button 
            onClick={() => {setIsInfoOpen(true); setIsSetOpen(false)}} 
            className="text-chrono-text hover:text-chrono-gold hover:scale-110 transition-all"
          >
            <Info className="size-7 md:size-9" />
          </button>
          
          {/* Garis pemisah tipis antara info & setting */}
          <div className="w-8 h-[1px] bg-white/10"></div>

          <button 
            onClick={() => {setIsSetOpen(true); setIsInfoOpen(false)}} 
            className="text-chrono-text hover:text-chrono-gold hover:scale-110 transition-all"
          >
            <Settings className="size-7 md:size-9" />
          </button>
        </div>

        {/* Toggle Button (Trigger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            /* Gunakan warna emas untuk tombol utama agar pop-out */
            bg-chrono-gold text-chrono-dark p-3 md:p-5 rounded-full 
            shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            hover:brightness-110 active:scale-90
            transition-all duration-500
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
        >
          <ChevronUp className="size-5 md:size-10" strokeWidth={3} />
        </button>
      </div>
    </>
  );
}
