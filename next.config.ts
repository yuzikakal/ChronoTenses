import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  compress: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:;"
          }
        ],
      },
    ];
  },

    // SEO REDIRECTS
  async redirects() {
    return [
      // 1. Redirect HTTP ke HTTPS (Security & SEO Rank)
      // Google sangat menyukai website yang aman (HTTPS)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://chrono-tenses.vercel.app/:path*',
        permanent: true,
      },
      // 2. (Opsional) Jika nanti kamu beli domain sendiri,
      // baru aktifkan redirect www ke non-www di sini.
      // Untuk vercel.app, biarkan kosong saja agar tidak bikin error 404 jika URL-nya tidak match.
    ];
  },
};

export default nextConfig;