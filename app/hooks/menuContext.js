// menuContext.js 
"use client";
import { createContext, useContext, useState, useRef } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [isSetOpen, setIsSetOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // --- LOGIKA BGM ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgmVolume, setBgmVolume] = useState(0.5); // Default BGM 50% biar ga kekerasan

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBgmVolumeChange = (newVolume) => {
    setBgmVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // --- LOGIKA SFX ---
  const [sfxVolume, setSfxVolume] = useState(1); // Default SFX 100%
  
  const handleSfxVolumeChange = (newVolume) => {
    setSfxVolume(newVolume);
  };

  // Fungsi ajaib untuk memainkan SFX kapan saja di mana saja
  const playSfx = (soundName) => {
    // Map nama suara ke file path
    const sfxMap = {
      click: '/sfx/click.mp3',
      success: '/sfx/clear.mp3',
      error: '/sfx/error.mp3',
      hint: '/sfx/hint.mp3',
      transition: '/sfx/transition.mp3',
      loading: '/sfx/loading.mp3',
      flip: '/sfx/flip.mp3',
      typing: '/sfx/typing.mp3',
      correct: '/sfx/correct.mp3',
      wrong: '/sfx/wrong.mp3',
      yeay: '/sfx/yeay.mp3',
    };

    const src = sfxMap[soundName];
    if (!src) return; // Kalau suara tidak ada di map, abaikan

    // Buat objek audio baru di memori
    const sfx = new Audio(src);
    // Atur volume SFX berdasarkan slider nanti
    sfx.volume = sfxVolume;
    // Putar suaranya
    sfx.play().catch(e => console.log("SFX blocked by browser:", e));
  };

  // --- LOGIKA TEXT SPEED ---
  // Pilihan speed dalam milidetik per huruf
  const speedOptions = { slow: 80, normal: 50, fast: 30, instant: 0 };
  const [textSpeed, setTextSpeed] = useState(speedOptions.normal);

  return (
    <MenuContext.Provider 
      value={{ 
        isSetOpen, setIsSetOpen, 
        isInfoOpen, setIsInfoOpen,
        
        // BGM
        isPlaying, togglePlay,             
        bgmVolume, handleBgmVolumeChange,         
        
        // SFX
        sfxVolume, handleSfxVolumeChange,
        playSfx, // <-- Ini yang akan kita pakai di tombol

        // Text Speed
        textSpeed, setTextSpeed, speedOptions
      }}
    >
      {/* Audio Element BGM ditaruh di sini agar tidak pernah mati */}
      <audio ref={audioRef} src="/music/tesdua.mp3" loop />
      
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu harus digunakan di dalam MenuProvider");
  }
  return context;
};