// components/ResetPanel.tsx
"use client";
import { useMenu } from "@/app/hooks/menuContext";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700", "900"] });

interface ResetPanelProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetPanel({ onClose, onConfirm }: ResetPanelProps) {

  const { playSfx } = useMenu();

  const Konfirmo = () => {
    playSfx('click');
    onConfirm();
  };
  return (
    <div 
      // Background gelap nge-blur, klik di luar kotak akan menutup panel
      onClick={onClose} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-chrono-dark/70 backdrop-blur-md px-6"
    >
      <div 
        // e.stopPropagation() agar klik di dalam kotak tidak ikut menutup panel
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-sm bg-chrono-dark/95 border-4 border-red-500/60 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(220,38,38,0.25)] flex flex-col items-center text-center transform transition-all animate-bounce-in"
      >
        {/* Ornamen Cahaya Pojok (Merah) */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full pointer-events-none"></div>

        <h3 className={`${cinzel.className} text-2xl md:text-3xl font-bold text-red-500 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
          SYSTEM REBOOT?
        </h3>
        
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 relative z-10">
          Are you sure you want to restart your journey? All your <span className="text-chrono-gold font-bold">Chrono Energy</span> and progress will be lost to the void of time.
        </p>
        
        <div className="flex w-full gap-3 relative z-10">
          {/* Tombol Batal */}
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 active:scale-95"
          >
            Cancel
          </button>
          
          {/* Tombol Eksekusi Reset */}
          <button 
            onClick={Konfirmo} 
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all active:scale-95"
          >
            Yes, Restart
          </button>
        </div>
      </div>
    </div>
  );
}