// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://chrono-tenses.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // ===== EXCLUDE HALAMAN INI DARI INDEXING =====
        disallow: [
          '/story',      // Halaman cerita (private)
          '/game',       // Halaman game (private)
          '/api',        // API routes
          '/*.json$',    // JSON files
          '/*?*sort=',   // Query parameters
          '/*?*filter=', // Filter parameters
        ],
      },
      // Aturan khusus untuk bot lain
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
    ],
    // Lokasi sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}