// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function HomePage(): import("react/jsx-runtime").JSX.Element {
  return (
    <>
      <main className="flex flex-col px-8 text-center bg-langit bg-cover bg-[75%_center] 2xl:bg-center h-screen overflow-hidden justify-around md:justify-start">
        <div className="h-4/6 w-full flex flex-col md:flex-row justify-center items-center">
          <Image
            src="/chrono.png"
            alt="judul"
            width={500}
            height={500}
            className="object-contain xl:w-auto xl:h-auto drop-shadow-[0_0_50px_rgba(160,32,240,0.25)]"
            draggable="false"
            loading="eager"
          />
          <Image
            src="/jamR.png"
            alt="jam"
            width={300}
            height={300}
            className="motion-safe:animate-[spin_10s_linear_infinite] object-contain drop-shadow-[0_0_50px_rgba(160,32,240,0.25)]"
            draggable="false"
          />
        </div>

        <div className="flex justify-center pb-10 md:pb-0">
          <Link
            href="/story"
            className={`${cinzel.className} border-2 border-yellow-400/50 hover:border-chrono-gold hover:border-3 text-chrono-gold hover:text-chrono-text 
            bg-black/10 hover:bg-chrono-dark rounded-full font-semibold transition-colors duration-500
            px-5 py-3 md:px-10 md:py-6 text-2xl md:text-4xl md:hover:text-5xl backdrop-blur-sm`}
          >
            START
          </Link>
        </div>
      </main>
    </>
  );
}
