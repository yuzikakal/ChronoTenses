// components/panel/SetPanel.jsx
"use client";
import { Cinzel } from "next/font/google";
import { useMenu } from "@/app/hooks/menuContext"; 
import { X , Play, Pause, Music, Volume2, MessageSquareText } from "lucide-react"; // Ditambah ikon baru

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function SetPanel() {
  // Ambil semua state dan fungsi dari context (Perhatikan nama variabel yang diupdate)
  const { 
    setIsSetOpen, 
    isPlaying, togglePlay, 
    bgmVolume, handleBgmVolumeChange, // PERBAIKAN: Nama fungsi disesuaikan
    sfxVolume, handleSfxVolumeChange, // BARU: SFX Volume
    textSpeed, setTextSpeed, speedOptions, // BARU: Text Speed
    playSfx // BARU: Untuk membunyikan suara klik saat geser slider
  } = useMenu(); 

  // Logika untuk Slider Text Speed (Step by step)
  const speedLevels = [speedOptions.slow, speedOptions.normal, speedOptions.fast, speedOptions.instant];
  const speedLabels = ["Slow", "Normal", "Fast", "Instant"];
  const currentSpeedIndex = speedLevels.indexOf(textSpeed);

  const handleSpeedChange = (index) => {
    setTextSpeed(speedLevels[index]);
    playSfx('click'); // Bunyikan suara klik saat ganti speed
  };

  return (
    <div 
      onClick={() => setIsSetOpen(false)} 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-chrono-dark/60 backdrop-blur-md px-6"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-lg h-3/4 bg-chrono-dark/95 border-4 border-chrono-gold/40 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(160,32,240,0.25)] flex flex-col"
      >
        {/* Ornamen Cahaya Pojok */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-magic-purple/20 blur-[80px] rounded-full pointer-events-none"></div>
        
        {/* Tombol Tutup */}
        <button 
          onClick={() => { playSfx('click'); setIsSetOpen(false); }} // Tambah SFX
          className="absolute top-6 right-6 bg-chrono-gold text-chrono-dark p-2 rounded-full hover:scale-110 active:scale-90 transition-all z-10 shadow-lg"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <h1 className={`${cinzel.className} text-2xl md:text-4xl font-bold text-chrono-gold mb-8 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]`}>
          SETTINGS
        </h1>

        {/* Bagian isi dengan overflow */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-chrono-text scrollbar-hide md:scrollbar-thin">
          
          <p className="text-center text-chrono-text opacity-80 italic text-lg">
            Adjust your time-travel frequencies
          </p>
          
          {/* === AUDIO SETTINGS === */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-[2rem] flex flex-col gap-6 shadow-inner">
            
            <h2 className="text-chrono-gold font-bold tracking-widest border-b border-white/10 pb-2 flex items-center gap-2 text-sm">
              <Music size={16} /> AUDIO
            </h2>

            {/* BGM Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-magic-cyan/20 rounded-xl">
                  <Music className="text-magic-cyan size-6" />
                </div>
                <span className="text-chrono-text font-bold tracking-wide">Music</span>
              </div>
              <button 
                onClick={() => { playSfx('click'); togglePlay(); }} // Tambah SFX
                className="bg-chrono-gold text-chrono-dark p-2 md:p-4 rounded-2xl font-bold hover:brightness-110 shadow-[0_4px_0_0_#b8860b] active:translate-y-1 active:shadow-none transition-all"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
            </div>
            <div className="space-y-2">
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={bgmVolume}
                onChange={(e) => handleBgmVolumeChange(parseFloat(e.target.value))}
                className="w-full h-4 bg-chrono-dark border border-white/10 rounded-full appearance-none cursor-pointer accent-chrono-gold shadow-inner"
              />
              <div className="flex justify-between text-[10px] font-black text-chrono-gold/60 tracking-widest px-1">
                <span>SILENT</span>
                <span>MAX</span>
              </div>
            </div>

            {/* SFX Section */}
            <div className="flex items-center gap-3 mt-2">
              <div className="p-2 bg-magic-purple/20 rounded-xl">
                <Volume2 className="text-magic-purple size-6" />
              </div>
              <span className="text-chrono-text font-bold tracking-wide flex-1">Sound Effects</span>
            </div>
            <div className="space-y-2">
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={sfxVolume}
                // Saat user geser slider SFX, langsung bunyikan klik biar tau kerasanya
                onChange={(e) => { handleSfxVolumeChange(parseFloat(e.target.value)); playSfx('click'); }} 
                className="w-full h-4 bg-chrono-dark border border-white/10 rounded-full appearance-none cursor-pointer accent-magic-purple shadow-inner"
              />
              <div className="flex justify-between text-[10px] font-black text-chrono-gold/60 tracking-widest px-1">
                <span>SILENT</span>
                <span>MAX</span>
              </div>
            </div>
          </div>

          {/* === DIALOGUE SETTINGS === */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-[2rem] flex flex-col gap-6 shadow-inner">
            
            <h2 className="text-chrono-gold font-bold tracking-widest border-b border-white/10 pb-2 flex items-center gap-2 text-sm">
              <MessageSquareText size={16} /> DIALOGUE
            </h2>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-chrono-gold/20 rounded-xl">
                <MessageSquareText className="text-chrono-gold size-6" />
              </div>
              <span className="text-chrono-text font-bold tracking-wide flex-1">Text Speed</span>
            </div>
            
            <div className="space-y-2">
              <input 
                type="range" min="0" max="3" step="1" // 0 sampai 3 (4 level)
                value={currentSpeedIndex}
                onChange={(e) => handleSpeedChange(parseInt(e.target.value))}
                className="w-full h-4 bg-chrono-dark border border-white/10 rounded-full appearance-none cursor-pointer accent-chrono-gold shadow-inner"
              />
              <div className="flex justify-between text-[10px] font-black text-chrono-gold/60 tracking-widest px-1">
                {speedLabels.map(label => <span key={label}>{label.toUpperCase()}</span>)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}