// /components/view/feedback.tsx
"use client";
import Image from "next/image"

type FeedbackProps = {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
};

export default function Feedback({ isCorrect, explanation, onNext }: FeedbackProps) {
  // Styling dinamis yang lebih RPG-style tergantung benar/salah
  const boxBorder = isCorrect ? "border-green-500/60" : "border-red-500/60";
  const textColor = isCorrect ? "text-green-400" : "text-red-400";
  const glow = isCorrect ? "shadow-[0_0_40px_rgba(34,197,94,0.4)]" : "shadow-[0_0_40px_rgba(239,68,68,0.4)]";
  const bgAccent = isCorrect ? "bg-green-500/10" : "bg-red-500/10";
  const chronoImage = isCorrect ? "/characters/chrono-correct.png" : "/characters/chrono-wrong.png";

  return (
    <div className="flex flex-row w-full max-w-7xl">
      <div className={`w-full max-w-lg mx-auto bg-black/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border-2 ${boxBorder} ${glow} text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-400`}>

        {/* Ikon dengan bayangan 3D */}
        <div className={`text-4xl p-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] ${isCorrect ? "animate-bounce" : "animate-pulse"}`}>
          {isCorrect ? "✅" : "❌"}
        </div>

        {/* Judul Feedback - Bahasa Inggris Ramah Anak */}
        <h2 className={`text-3xl md:text-4xl font-black tracking-widest ${textColor} drop-shadow-md`}>
          {isCorrect ? "EXCELLENT!" : "SYSTEM WARNING!"}
        </h2>

        {/* Kotak Penjelasan ala Sistem Log RPG */}
        <div className={`text-white text-base md:text-xl leading-relaxed ${bgAccent} p-6 rounded-2xl w-full border border-white/10 shadow-inner`}>
          <p className="font-medium drop-shadow-sm">{explanation}</p>
        </div>

        {/* Tombol bergaya 3D persis seperti di Arena */}
        <button
          onClick={onNext}
          className="w-full mt-4 py-4 rounded-2xl font-black text-lg md:text-xl tracking-widest text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] transition-all shadow-[0_5px_0_rgb(180,110,0)] hover:shadow-[0_2px_0_rgb(180,110,0)] hover:translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
        >
          CONTINUE
        </button>
      </div>
      <div className="hidden md:flex w-1/3 lg:w-2/5 items-center justify-center pointer-events-none select-none pr-5 lg:pr-10 pb-20">
        <div className="animate-breathe">
          <Image
            src={chronoImage}
            alt="Chrono"
            width={400}
            height={500}
            className="w-64 lg:w-80 xl:w-96 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            priority
          />
        </div>
      </div>
    </div>
  );
}