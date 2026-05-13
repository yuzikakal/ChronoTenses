"use client";
import { RefreshCw } from "lucide-react";

export default function EnergyCrystal({ points, onReset }: { points: number; onReset: () => void }) {
  const maxPoints = 100;
  const percentage = Math.min(Math.max((points / maxPoints) * 100, 0), 100);

  let barGradient = "from-red-500 to-red-400";
  let glowShadow = "shadow-red-500/60";

  if (percentage >= 15 && percentage < 40) {
    barGradient = "from-chrono-past to-yellow-400";
    glowShadow = "shadow-chrono-past/60"; 
  } else if (percentage >= 40) {
    barGradient = "from-chrono-present to-magic-cyan";
    glowShadow = "shadow-chrono-present/60";
  }

  return (
    <div className="w-full mx-auto select-none flex flex-row items-center gap-4">
      <span
        className="text-2xl md:text-3xl font-black tracking-widest text-right min-w-[3rem]
                   text-transparent bg-clip-text bg-gradient-to-b from-chrono-gold to-chrono-gold/60 
                   drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
      >
        {points}
      </span>

      <div
        role="progressbar"
        aria-valuenow={points}
        className="relative h-7 md:h-9 rounded-xl overflow-hidden border-2 border-chrono-gold/40 
             bg-chrono-dark shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] w-full"
      >
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${barGradient} rounded-lg
                      transition-all duration-700 ease-out shadow-lg ${glowShadow} overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/10 rounded-lg" />
          {points > 0 && (
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          )}
        </div>
      </div>

      {/* Tombol Restart */}
      <div className="shrink-0 z-10">
        <button
          onClick={onReset}
          className="bg-red-900/80 hover:bg-red-600 text-white p-2 md:px-5 md:py-2 rounded-full md:rounded-xl shadow-lg border-2 border-red-950 backdrop-blur-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          title="Restart Game"
        >
          <RefreshCw size={20} className="md:size-[18px] group-hover:-rotate-180 transition-transform duration-500" />
          <span className="hidden md:inline font-bold text-sm tracking-wide">Restart</span>
        </button>
      </div>
    </div>
  );
}