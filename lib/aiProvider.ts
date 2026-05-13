import { createOpenAI } from '@ai-sdk/openai';

// Groq (primary) - 100.000 token/hari, ~1.000 req/hari
export const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// OpenRouter (fallback) - 50 req/hari gratis, bisa upgrade ke 1.000/hari dengan isi saldo $10
export const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'http://localhost:3000', // Ganti dengan domain Vercel nanti
    'X-Title': 'ChronoQuest Game',
  },
});