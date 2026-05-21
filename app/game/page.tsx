// app/game/page.tsx
import type { Metadata } from "next";
import GameClient from "./GameClient";

export const metadata: Metadata = {
  title: 'Chrono Tenses Game',
  description: 'Fix the broken Time-Logs by typing the correct tenses. Play the Chrono Tenses game now!',
  robots: {
    index: false,
    follow: false,
  },
};

export default function GamePage() {
  return <GameClient />;
}