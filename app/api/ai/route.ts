import { generateText, type LanguageModel } from "ai";
import { groq, openrouter } from "@/lib/aiProvider";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "@/lib/ratelimit";
import { getEmergencyVariables, getEmergencyContext } from "@/lib/emergencyBank";
import { generateChronoFeedback } from "@/lib/chronoFeedback";
import type { RequestBody, CorrectPayload } from "@/lib/aiEngine/types";
import { getErrorMessage, cleanJSON, fillTemplate } from "@/lib/aiEngine/utils";
import { evaluateLocally } from "@/lib/aiEngine/evaluator";
import { advancedBlueprints } from "@/lib/aiEngine/blueprints";
import { validateAndFormat } from "@/lib/aiEngine/validator";
import { getRandomTimeMarker, getTenseBase } from "@/lib/aiEngine/timeMarkers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, mode, restriction } = body as RequestBody;
    
    // Rate limit
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

    // ==========================================
    // MODE: GENERATE SOAL
    // ==========================================
    if (mode === "generate") {
      const era = String(prompt);
      const eraMap: Record<string, string[]> = {
        past: ["past_simple_aff", "past_simple_neg", "past_simple_int", "past_continuous_aff", "past_continuous_neg", "past_continuous_int", "past_perfect_aff", "past_perfect_neg", "past_perfect_int"],
        present: ["present_simple_aff", "present_simple_neg", "present_simple_int", "present_continuous_aff", "present_continuous_neg", "present_continuous_int", "present_perfect_aff", "present_perfect_neg", "present_perfect_int"],
        future: ["future_simple_aff", "future_simple_neg", "future_simple_int", "future_continuous_aff", "future_continuous_neg", "future_continuous_int", "future_perfect_aff", "future_perfect_neg", "future_perfect_int"],
      };

      const pool = eraMap[era] || eraMap.present;
      const chosenId = pool[Math.floor(Math.random() * pool.length)];
      const chosenBlueprint = advancedBlueprints.find((b) => b.id === chosenId)!;

      const aiSystemPrompt = "You are a precise JSON generator for an English learning app. Return ONLY valid JSON. No extra text, no markdown.";
      const aiUserPrompt = `Generate variables for a ${chosenId.replace(/_/g, " ")} sentence.
 ${chosenBlueprint.aiVars}
CRITICAL RULES:
- Do NOT use "I" or "You" as subjects. Use 3rd person (He/She/It/They/Names).
- "BASE" MUST be the root verb (V1). Examples of WRONG BASE: "went", "built", "explored". Example of CORRECT BASE: "go", "build", "explore".
- V2 and V3 MUST be correct irregular forms (e.g., "met" not "meeted", "built" not "builded").
- V_ING MUST drop the 'e' if the base ends in 'e' (e.g., "exploring" not "exploreing", "creating" not "createing").
- OBJ MUST NOT contain time words (no "yesterday", "now", "tomorrow", etc). Time context is handled separately.
- OBJ MUST be a tangible, grounded object (e.g., "the temporal beacon", "the coordinates", "the artifact"). Do NOT use abstract/god-like concepts like "a universe", "time itself", or "the timeline" as objects.
- Topic: Time travel. ${restriction ? `Avoid these verbs: ${restriction}` : ""}`;

      // Fungsi helper untuk mencoba AI
      const attemptAI = async (model: LanguageModel, aiName: string) => {
        console.log(`[AI INFO] Mencoba menggunakan AI: ${aiName}...`);

        const result = await generateText({ model, system: aiSystemPrompt, prompt: aiUserPrompt, temperature: 0.7 });
        
        console.log(`[AI SUCCESS] Berhasil mendapatkan respons dari: ${aiName}!`);

        const aiVars = JSON.parse(cleanJSON(result.text)) as Record<string, string>;
        const resultData = validateAndFormat(aiVars, chosenId, chosenBlueprint);
        
        const chronoDialogue = getEmergencyContext(chosenId, aiVars.SUB, aiVars);
        
        return NextResponse.json({ context: chronoDialogue, type: "fill", ...resultData });
      };

      // Percobaan 1: Groq
      try { return await attemptAI(groq("llama-3.3-70b-versatile"), "Groq (Llama 3.3 70B)"); } 
      catch (groqError) { console.warn(`WARN: Groq failed: ${getErrorMessage(groqError)}`); }

      // Percobaan 2: OpenRouter
      try { return await attemptAI(openrouter("meta-llama/llama-3.1-8b-instruct"), "OpenRouter (Llama 3.1 8B)"); } 
      catch (orError) { console.warn(`WARN: OpenRouter failed: ${getErrorMessage(orError)}`); }

      // ==========================================
      // FALLBACK: EMERGENCY BANK
      // ==========================================
      const eVars = getEmergencyVariables(chosenId, restriction);
      const eAnswer = chosenBlueprint.getAnswer(eVars);

      if (chosenId.endsWith("_int") && eVars.SUB) eVars.SUB = eVars.SUB.toLowerCase();

      // Suntikkan time marker ke fallback juga
      const tenseBase = getTenseBase(chosenId);
      const timePhrase = getRandomTimeMarker(tenseBase);
      const eVarsWithTime = { ...eVars, TIME: timePhrase };

      let eText = fillTemplate(chosenBlueprint.textUser, eVarsWithTime).replace("{BLANK}", "___");
      eText = eText.charAt(0).toUpperCase() + eText.slice(1);

      return NextResponse.json({
        context: getEmergencyContext(chosenId, eVars.SUB, eVars),
        type: "fill",
        text: eText,
        answer: eAnswer,
        hint: chosenBlueprint.getHint(eVars),
      });
    }

    // ==========================================
    // MODE: CORRECT JAWABAN
    // ==========================================
    if (mode === "correct") {
      let userAnswer = "", correctAnswer = "", questionText = "";
      try {
        const p = typeof prompt === "string" ? (JSON.parse(prompt) as CorrectPayload) : prompt;
        userAnswer = p.userAnswer ?? "";
        correctAnswer = p.correctAnswer ?? "";
        questionText = p.questionText ?? "";
      } catch { return NextResponse.json({ error: "Invalid payload" }, { status: 400 }); }

      const isCorrect = evaluateLocally(userAnswer, correctAnswer);
      const explanation = generateChronoFeedback(isCorrect, userAnswer, correctAnswer, questionText);
      return NextResponse.json({ isCorrect, explanation });
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (error) {
    console.error("AI Route Error:", getErrorMessage(error));
    return NextResponse.json({ error: "AI_UNREACHABLE" }, { status: 500 });
  }
}