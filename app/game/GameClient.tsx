// app/game/GameClient.tsx
"use client";
import { useState, useEffect } from "react";
import EnergyCrystal from "@/components/EnergyCrystal";
import Feedback from "@/components/view/feedback";
import Hub from "@/components/view/hub";
import Arena from "@/components/view/arena";
import Result from "@/components/view/result";
import ResetPanel from "@/components/panel/ResetPanel";

type LogEntry = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  explanation: string;
  hint: string;
  context: string;
};

export default function GameClient() {
  const [poin, setPoin] = useState(50);
  const [fase, setFase] = useState("hub"); // hub, arena, feedback, result
  const [era, setEra] = useState("");
  const [prevEra, setPrevEra] = useState(""); // State untuk menyimpan era sebelumnya

  const [feedback, setFeedback] = useState({ 
    isCorrect: false, 
    explanation: "", 
    userAnswer: "", 
    correctAnswer: "" 
  });  
  const [soalHistory, setSoalHistory] = useState<string[]>([]);
  const [sessionLog, setSessionLog] = useState<LogEntry[]>([]); // State untuk riwayat lengkap
  
  const [isMounted, setIsMounted] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const savedPoin = localStorage.getItem("chrono_poin");
    const savedFase = localStorage.getItem("chrono_fase");
    const savedEra = localStorage.getItem("chrono_era");
    // Opsional: Kamu bisa juga meload sessionLog dari localStorage jika mau

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedPoin) setPoin(Number(savedPoin));
    if (savedFase) setFase(savedFase);
    if (savedEra) setEra(savedEra);

    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chrono_poin", poin.toString());
      localStorage.setItem("chrono_fase", fase);
      localStorage.setItem("chrono_era", era);
    }
  }, [poin, fase, era, isMounted]);

  const pilihEra = (pilihan: string) => {
    setPrevEra(era); // Simpan era saat ini sebelum berubah
    setEra(pilihan); 
    setFase("arena"); 
  };

  const handleUseHint = () => {
  setPoin(prev => {
    const newPoin = Math.max(prev - 5, 0);
    if (newPoin <= 0) {
      // Opsional: langsung game over
      setFase('result');
    }
    return newPoin;
  });
};

  const handleArenaSubmit = (isCorrect: boolean, explanation: string, lastSoalText: string, userAnswer: string, correctAnswer: string, hint: string, context: string) => {
    setFeedback({ isCorrect, explanation, userAnswer, correctAnswer });
    
    setPoin((prevPoin) => {
      let newPoin = isCorrect ? prevPoin + 10 : prevPoin - 5;
      if (newPoin >= 100) newPoin = 100; 
      if (newPoin <= 0) newPoin = 0;     
      return newPoin;
    });

    // Batasan untuk prompt AI
    setSoalHistory(prev => {
      const newHistory = [lastSoalText, ...prev];
      return newHistory.slice(0, 10); 
    });

    // Simpan ke catatan lengkap untuk halaman Result
    setSessionLog(prev => [...prev, { question: lastSoalText, userAnswer, isCorrect, explanation, hint, context }]);

    setFase("feedback");
  };

  const getBackground = () => {
    if (!isMounted) return "bg-langit"; 
    if (era === "past") return "bg-past";
    if (era === "present") return "bg-present";
    if (era === "future") return "bg-future";
    return "bg-langit"; 
  };

  const eksekusiReset = () => {
    localStorage.clear(); // Bersihkan semua history agar benar-benar fresh
    window.location.reload();
  };

  if (!isMounted) return <main className="bg-langit bg-cover h-screen w-screen"></main>;

  return (
    <main className={`relative ${getBackground()} bg-cover h-screen w-screen flex flex-col items-center text-black bg-[75%_center] 2xl:bg-center overflow-hidden transition-colors duration-500`}>

      {/* Sembunyikan Energy Crystal jika sudah di layar akhir */}
      {fase !== "result" && (
        <div className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/60 to-transparent pt-4 pb-8 pointer-events-none">
          <div className="pointer-events-auto w-full mx-auto px-4 flex items-center justify-center relative h-12">
            <div className="w-full max-w-4xl">
              <EnergyCrystal points={poin} onReset={() => setShowResetModal(true)} />
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full h-full flex flex-col items-center justify-center pt-24 pb-8 px-4">
        {fase === "hub" && <Hub onPilihEra={pilihEra} />}
        {fase === "arena" && <Arena era={era} prevEra={prevEra} history={soalHistory} onBack={handleArenaSubmit} onUseHint={handleUseHint} />}
        {fase === "feedback" && (
          <Feedback
            isCorrect={feedback.isCorrect}
            explanation={feedback.explanation}
            onNext={() => {
              if (poin >= 100 || poin <= 0) {
                setFase("result");
              } else {
                setFase("hub");
              }
            }}
          />
        )}
        
        {/* RENDER HALAMAN RESULT */}
        {fase === "result" && <Result poin={poin} log={sessionLog} onRestart={eksekusiReset} />}
      </div>

      {showResetModal && <ResetPanel onClose={() => setShowResetModal(false)} onConfirm={eksekusiReset} />}
    </main>
  );
}