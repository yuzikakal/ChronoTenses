// /components/view/result.tsx
"use client";

type LogEntry = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  explanation: string;
  hint: string;     
  context: string; 
};

type ResultProps = {
  poin: number;
  log: LogEntry[];
  onRestart: () => void;
};

export default function Result({ poin, log, onRestart }: ResultProps) {
  const isWin = poin >= 100;

  return (
    <div className="fixed px-4 top-15 w-full max-w-2xl mx-auto flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700 h-[85vh]">
      {/* HEADER STATUS */}
      <div className="w-full bg-black/80 backdrop-blur-md p-6 rounded-3xl border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-1 ${isWin ? "bg-green-500" : "bg-red-500"} shadow-[0_0_10px_currentColor]`}
        ></div>
        <h1
          className={`text-4xl md:text-5xl font-black tracking-widest ${isWin ? "text-green-400" : "text-red-500"} drop-shadow-lg`}
        >
          {isWin ? "MISSION CLEARED!" : "MISSION FAILED!"}
        </h1>
        <p className="text-yellow-100/80 text-lg mt-2 font-medium tracking-wide">
          {isWin
            ? "You are save the time, Time Traveler!"
            : "You ran out of  energy. Try again!"}
        </p>
      </div>

      {/* SCROLLABLE HISTORY LIST */}
      <div className="w-full flex-1 overflow-y-auto pr-2 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-yellow-500/50 scrollbar-track-transparent">
        {log.map((item, index) => (
          <div
            key={index}
            className={`w-full p-5 rounded-2xl border ${item.isCorrect ? "bg-green-900/30 border-green-500/50" : "bg-red-900/30 border-red-500/50"} backdrop-blur-sm relative`}
          >
            {/* Header Question */}
            <div className="absolute top-4 right-4 text-2xl">
              {item.isCorrect ? "✅" : "❌"}
            </div>
            <p className="text-white/60 text-xs font-bold tracking-widest mb-2 uppercase">
              Question {index + 1}
            </p>
            <p className="text-white text-lg font-medium leading-relaxed pr-8">
              {item.question}
            </p>

            {/* Debug Info Box (Context & Hint) */}
            {/* <div className="mt-3 flex gap-2 flex-wrap">
              {item.context && (
                <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30">
                  💬 {item.context}
                </span>
              )}
              {item.hint && (
                <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded border border-yellow-500/30">
                  💡 {item.hint}
                </span>
              )}
            </div> */}

            {/* Jawaban & Penjelasan */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
              <p className="text-white/80 text-sm">
                Your Answer:{" "}
                <span
                  className={`font-bold px-2 py-1 rounded-md ${item.isCorrect ? "bg-green-500/30 text-green-300" : "bg-red-500/30 text-red-200"}`}
                >
                  {item.userAnswer}
                </span>
              </p>
              <p className="text-yellow-200/90 text-sm italic">
                &quot;{item.explanation}&quot;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PLAY AGAIN BUTTON */}
      <button
        onClick={onRestart}
        className="w-full mt-2 py-4 rounded-2xl font-black text-xl tracking-widest text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 active:scale-[0.98] transition-all shadow-[0_5px_0_rgb(180,110,0)]"
      >
        PLAY AGAIN
      </button>
    </div>
  );
}
