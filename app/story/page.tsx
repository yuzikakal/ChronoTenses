// app/story/page.tsx
import type { Metadata } from "next";
import StoryClient from "./StoryClient";

export const metadata: Metadata = {
  title: 'Chrono Tenses Story',
  description: 'The timeline mixed and time traveler with Chrono the timekeeper must fix that',
  robots: {
    index: true,
    follow: true,
  }
};

// Ini adalah Server Component yang merender Client Component
export default function StoryPage() {
  return <StoryClient />;
}