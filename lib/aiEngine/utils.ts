import type { AIResponseData } from "./types";

// Ekstrak pesan error
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Bersihkan respons AI dari markdown JSON
export function cleanJSON(raw: string): string {
  const cleaned = raw.trim().replace(/```json\n?/g, "").replace(/\n?```\n?/g, "").trim();
  const jsonMatch = cleaned.match(/{[\s\S]*}/);
  return jsonMatch ? jsonMatch[0] : cleaned;
}

// Batasi kata setelah blank agar soal tidak kepanjangan
export function sanitizeAIText(parsedData: AIResponseData): AIResponseData {
  if (parsedData?.text) {
    parsedData.text = parsedData.text.replace(/[_]{2,}/g, "___");
    const blankIndex = parsedData.text.indexOf("___");
    if (blankIndex !== -1) {
      const textAfterBlank = parsedData.text.substring(blankIndex + 3).trim();
      const wordsAfterBlank = textAfterBlank.split(/\s+/);
      if (wordsAfterBlank.length > 10) {
        parsedData.text = parsedData.text.substring(0, blankIndex + 3) + " " + wordsAfterBlank.slice(0, 10).join(" ") + ".";
      }
    }
  }
  return parsedData;
}

// Isi template [VAR] dengan data
export function fillTemplate(template: string, vars: Record<string, string>): string {
  let filled = template;
  for (const [k, v] of Object.entries(vars)) {
    filled = filled.replaceAll(`[${k}]`, v);
  }
  return filled;
}