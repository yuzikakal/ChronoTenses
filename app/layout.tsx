// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Cegah zoom tak sengaja di game
  themeColor: "#1A1B41",
};

// global metadata
export const metadata: Metadata = {
  // WAJIB: Base URL agar OG Image & Sitemap tidak error
  metadataBase: new URL("https://chrono-tenses.vercel.app"),

  title: {
    default: "Chrono Tenses - Master English Tenses",
    template: "%s | Chrono Tenses",
  },
  description:
    "Master English tenses with Chrono Tenses interactive game. Learn present, past, and future tenses through engaging time-travel gameplay.",
  keywords: [
    "English tenses",
    "learn tenses",
    "grammar game",
    "English learning",
    "past tense",
    "present tense",
    "future tense",
    "interactive english",
  ],
  creator: "Yuzikakal",
  publisher: "Chrono Tenses",

  // Open Graph (Tampilan saat share link WA/Twitter/Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chrono-tenses.vercel.app",
    siteName: "Chrono Tenses",
    title: "Chrono Tenses - Master English Tenses",
    description: "Interactive time-travel RPG game for learning English tenses.",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Chrono Tenses - Learn English Game",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Chrono Tenses",
    description: "Learn English tenses interactively",
    creator: "@Yuzikakal",
    images: ["/og-image.png"],
  },

  // Canonical URL (Mencegah duplikat konten di Google)
  alternates: {
    canonical: "https://chrono-tenses.vercel.app",
  },

  // Robots (Perintah indexing)
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

// ===== ROOT LAYOUT =====
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Chrono Tenses",
    description: "Interactive game for learning English tenses",
    url: "https://chrono-tenses.vercel.app",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Yuzikakal",
      url: "https://github.com/yuzikakal",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data untuk Google Rich Snippet */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Verifikasi Google Search Console (Ganti XXXX) */}
        <meta name="google-site-verification" content="5Fa3ZuwfQwY5KlojYy3BDg725NSbhDvG8LsnV4YLWEw" />

        {/* Preconnect untuk performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body className="bg-yellow-50 text-white">
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}