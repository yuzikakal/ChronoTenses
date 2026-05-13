// layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "Chrono Tenses",
    template: "%s | Chrono Tenses",
  },
  description: "Chrono Tenses is an interactive game for learning English tenses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-yellow-50 text-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}