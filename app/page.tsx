// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import type { Metadata } from 'next';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: 'Chrono Tenses - Master English Tenses Interactively',
  description:
    'Learn English tenses through interactive gameplay. Master present, past, and future tenses with Chrono Tenses - the fun way to improve your grammar.',
  alternates: {
    canonical: 'https://chrono-tenses.vercel.app',
  },
  openGraph: {
    title: 'Chrono Tenses - Master English Tenses',
    description: 'Learn English tenses through interactive gameplay',
    url: 'https://chrono-tenses.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://chrono-tenses.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chrono Tenses Game Preview',
      },
    ],
  },
  keywords: [
    'learn English tenses',
    'English grammar game',
    'tense learning game',
    'interactive English',
  ],
}

export default function HomePage(): import("react/jsx-runtime").JSX.Element {
  return (
    <>
      <main className="flex flex-col px-8 text-center bg-langit bg-cover bg-[75%_center] 2xl:bg-center h-screen overflow-hidden justify-around md:justify-start">
        <div className="h-4/6 w-full flex flex-col lg:flex-row justify-center items-center">
          <Image
            src="/chrono.png"
            alt="Chrono Tenses Game Title"
            width={500}
            height={500}
            quality={75}
            className="object-contain xl:w-auto xl:h-auto drop-shadow-[0_0_50px_rgba(160,32,240,0.25)]"
            draggable="false"
            priority
          />
          <Image
            src="/jamR.png"
            alt="Time Machine Clock"
            width={300}
            height={300}
            quality={75}
            className="motion-safe:animate-[spin_10s_linear_infinite] object-contain drop-shadow-[0_0_50px_rgba(160,32,240,0.25)]"
            draggable="false"
            priority
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
        <div className="fixed bottom-4 w-full text-center right-0">
          <p className="text-white/40 text-xs tracking-wide">
            Learn Present, Past, and Future tenses interactively.
          </p>
        </div>
      </main>
      <div className="sr-only overflow-hidden">
        <section className="sr-only">
          <h1 className="text-3xl font-bold mb-4 text-center">Master English Tenses Interactively</h1>

          <p className="text-base leading-relaxed mb-4 text-justify">
            Tired of boring grammar exercises? <strong>Chrono Tenses</strong> is an educational web game designed to help you master Present, Past, and Future tenses through an engaging time-travel adventure. Join Chrono, the timekeeper, to fix broken timelines by typing the correct missing words.
          </p>

          <h2 className="text-xl font-bold mb-3">Why Play Chrono Tenses?</h2>
          <ul className="list-disc list-inside mb-4 space-y-1 text-base">
            <li><strong>Active Recall:</strong> Improve memory retention by actively typing answers instead of just choosing multiple choice.</li>
            <li><strong>Contextual Learning:</strong> Every question is generated with a unique time-travel context to help you understand when to use a specific tense.</li>
            <li><strong>Instant Feedback:</strong> Get detailed explanations immediately after answering to correct misunderstandings on the spot.</li>
          </ul>

          <h2 className="text-xl font-bold mb-3">How To Play</h2>
          <p className="text-base leading-relaxed">
            Navigate through different eras (Past, Present, Future). Read the timeline context, analyze the sentence, and type the correct verb form to charge the Chrono Energy. If you run out of energy or reach maximum power, your session ends.
          </p>

          <h2 className="text-xl font-bold mb-3">Features</h2>
          <ul>
            <li>Interactive English tense gameplay</li>
            <li>Story-driven tutorial experience</li>
            <li>Real-time answer feedback</li>
            <li>Timeline-based learning system</li>
            <li>Responsive UI for desktop & mobile</li>
            <li>Immersive visual novel inspired presentation</li>
            <li>Persistent game progress using localStorage</li>
          </ul>
        </section>
      </div>
    </>
  );
}