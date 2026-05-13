// Tipe mode permintaan API
export type Mode = "generate" | "correct";

// Payload untuk mode koreksi jawaban
export interface CorrectPayload {
  era: string;
  userAnswer: string;
  correctAnswer: string;
  questionText: string;
}

// Body request dari frontend
export interface RequestBody {
  prompt: string | CorrectPayload;
  mode: Mode;
  restriction?: string;
}

// Format respons AI mentah
export interface AIResponseData {
  text?: string;
  answer?: string;
  [key: string]: unknown;
}

// Struktur Blueprint Tenses
export interface BlueprintType {
  id: string;
  textUser: string;
  getAnswer: (d: Record<string, string>) => string;
  getHint: (d: Record<string, string>) => string;
  aiVars: string;
}