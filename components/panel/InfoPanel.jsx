// components/InfoPanel.jsx
"use client";
import { Cinzel } from "next/font/google";
import { useMenu } from "@/app/hooks/menuContext";
import { X, Sparkles, ExternalLink, Globe } from "lucide-react";
import Image from "next/image";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function InfoPanel() {
  const { setIsInfoOpen, playSfx } = useMenu();

  return (
    <div
      onClick={() => setIsInfoOpen(false)}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-chrono-dark/60 backdrop-blur-md px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg h-3/4 bg-chrono-dark/95 border-4 border-chrono-gold/40 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(160,32,240,0.25)] flex flex-col"
      >
        {/* Glow */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-magic-cyan/20 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Close */}
        <button
          onClick={() => { setIsInfoOpen(false); playSfx('click'); }}
          className="absolute top-6 right-6 bg-chrono-gold text-chrono-dark p-2 rounded-full hover:scale-110 active:scale-90 transition-all z-10 shadow-lg"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Title */}
        <h1
          className={`${cinzel.className} text-2xl md:text-4xl font-bold text-chrono-gold mb-8 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]`}
        >
          ABOUT
        </h1>

        {/* Scrollable */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-chrono-text scrollbar-hide md:scrollbar-thin">
          {/* Main Description */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-inner relative overflow-hidden group">
            <Sparkles className="absolute -right-2 -top-2 text-chrono-gold/20 size-16 rotate-12 group-hover:scale-110 transition-transform" />

            <p className="leading-relaxed relative z-10">
              <span className="text-chrono-gold font-black tracking-wide">
                CHRONO TENSES
              </span>{" "}
              is a time-travel adventure where players repair the timeline by
              mastering English tenses through interactive missions across
              different eras.
            </p>
          </div>

          {/* Lore Quote */}
          <div className="text-center px-4">
            <p className="italic text-sm md:text-base opacity-70">
              “Every tense shapes the timeline.”
            </p>
          </div>

          {/* Developer */}
          <div className="space-y-4 px-2">
            <p className="opacity-80 leading-relaxed text-base">
              This web application was developed by
              <a
                href="https://github.com/yuzikakal"
                className="mx-1 text-magic-cyan font-bold hover:text-chrono-gold transition-colors underline decoration-2 underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yuzikakal
              </a>
              as a final project for the{" "}
              <span className="italic font-medium text-chrono-gold">
                Conversation II
              </span>{" "}
              course at TRPL POLMED.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] opacity-50 font-bold">
              CHRONO NETWORK
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="https://github.com/yuzikakal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-chrono-dark border border-white/10 p-4 rounded-2xl hover:border-chrono-gold/50 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="font-semibold">GitHub</span>
                </div>

                <ExternalLink
                  size={16}
                  className="opacity-40 group-hover:opacity-100"
                />
              </a>

              <a
                href="https://instagram.com/yuzika_kalzamzami/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-chrono-dark border border-white/10 p-4 rounded-2xl hover:border-chrono-gold/50 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/ig.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="font-semibold">Instagram</span>
                </div>

                <ExternalLink
                  size={16}
                  className="opacity-40 group-hover:opacity-100"
                />
              </a>

              <a
                href="https://facebook.com/yuzikakal2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-chrono-dark border border-white/10 p-4 rounded-2xl hover:border-chrono-gold/50 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/fb.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="font-semibold">Facebook</span>
                </div>

                <ExternalLink
                  size={16}
                  className="opacity-40 group-hover:opacity-100"
                />
              </a>

              {/* <a
                href="https://x.com/Yuzikakal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-chrono-dark border border-white/10 p-4 rounded-2xl hover:border-chrono-gold/50 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg">𝕏</span>
                  <span className="font-semibold">X / Twitter</span>
                </div>

                <ExternalLink
                  size={16}
                  className="opacity-40 group-hover:opacity-100"
                />
              </a> */}

              <a
                href="https://yuzika5.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-chrono-dark border border-white/10 p-4 rounded-2xl hover:border-chrono-gold/50 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg">
                    <Globe size={20} />
                  </span>
                  <span className="font-semibold">Portofolio</span>
                </div>

                <ExternalLink
                  size={16}
                  className="opacity-40 group-hover:opacity-100"
                />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] opacity-50 font-bold">
              TECHNOLOGY
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "Tailwind CSS",
                "OpenRouter",
                "Groq",
                "AI Generated Questions",
                "Vercel",
              ].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:border-chrono-gold/40 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Other Game */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] mb-3 opacity-50 font-bold">
              ALSO PLAY:
            </p>

            <a
              href="https://raora.vercel.app/002/"
              className="flex items-center justify-between bg-chrono-dark border-2 border-chrono-gold/30 p-4 rounded-2xl hover:bg-chrono-gold hover:text-chrono-dark transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-bold">👗 Raora Dress Up Game</span>

              <ExternalLink
                size={18}
                className="opacity-50 group-hover:opacity-100"
              />
            </a>

            <a
              href="https://yuzikakal.github.io/tetorizu/tetris.html"
              className="flex items-center justify-between bg-chrono-dark border-2 border-chrono-gold/30 p-4 rounded-2xl hover:bg-chrono-gold hover:text-chrono-dark transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-bold">🎮 Tetris Game</span>

              <ExternalLink
                size={18}
                className="opacity-50 group-hover:opacity-100"
              />
            </a>
          </div>

          {/* Version */}
          <div className="text-center pt-2">
            <p className="text-xs opacity-40 tracking-[0.15em] uppercase">
              Chrono Tenses v1.0 • Build 2026
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-[10px] md:text-xs opacity-40 font-bold tracking-[0.3em] uppercase">
              © {new Date().getFullYear()} Chrono Tenses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
