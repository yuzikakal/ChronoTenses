import type { BlueprintType } from "./types";
import { fillTemplate, sanitizeAIText } from "./utils";
import { getRandomTimeMarker, getTenseBase } from "./timeMarkers";

// Cek plural subject
function isPluralSubj(s: string): boolean {
  const l = s.toLowerCase().trim();
  return l === "they" || l === "we" || l === "you" || l.startsWith("they ") || l.startsWith("we ") || l.includes(" and ");
}

// Cek kecocokan Subject vs Auxiliary
function isValidSubjectAuxPair(sub: string, aux: string): boolean {
  const s = sub.toLowerCase().trim();
  const a = aux.toLowerCase().trim();
  const pronounRules: Record<string, string[]> = {
    i: ["am", "was", "have", "do"], you: ["are", "were", "have", "do"],
    he: ["is", "was", "has", "does"], she: ["is", "was", "has", "does"], it: ["is", "was", "has", "does"],
    we: ["are", "were", "have", "do"], they: ["are", "were", "have", "do"],
  };
  if (pronounRules[s]) return pronounRules[s].includes(a);
  const plural = isPluralSubj(s);
  if (plural) return ["are", "were", "have", "do"].includes(a);
  return ["is", "was", "has", "does"].includes(a);
}

const UNCHANGED_VERBS = new Set(["cut", "put", "hit", "hurt", "cost", "let", "set", "shut", "split", "spread", "read", "broadcast", "upset", "burst", "cast", "bet", "quit", "sweat", "thrust"]);

const IRREGULAR_VERBS: Record<string, { v2: string; v3: string }> = {
  meet: { v2: "met", v3: "met" }, build: { v2: "built", v3: "built" }, find: { v2: "found", v3: "found" },
  make: { v2: "made", v3: "made" }, go: { v2: "went", v3: "gone" }, see: { v2: "saw", v3: "seen" },
  take: { v2: "took", v3: "taken" }, send: { v2: "sent", v3: "sent" }, think: { v2: "thought", v3: "thought" },
  fight: { v2: "fought", v3: "fought" }, catch: { v2: "caught", v3: "caught" }, break: { v2: "broke", v3: "broken" },
  speak: { v2: "spoke", v3: "spoken" }, write: { v2: "wrote", v3: "written" }, drive: { v2: "drove", v3: "driven" },
  fly: { v2: "flew", v3: "flown" }, run: { v2: "ran", v3: "run" }, give: { v2: "gave", v3: "given" },
  throw: { v2: "threw", v3: "thrown" }, know: { v2: "knew", v3: "known" }, begin: { v2: "began", v3: "begun" },
  swim: { v2: "swam", v3: "swum" }, sing: { v2: "sang", v3: "sung" }, ring: { v2: "rang", v3: "rung" },
  wear: { v2: "wore", v3: "worn" }, tear: { v2: "tore", v3: "torn" }, bear: { v2: "bore", v3: "born" },
  steal: { v2: "stole", v3: "stolen" }, choose: { v2: "chose", v3: "chosen" }, freeze: { v2: "froze", v3: "frozen" },
  rise: { v2: "rose", v3: "risen" }, wake: { v2: "woke", v3: "woken" }, hide: { v2: "hid", v3: "hidden" },
};

export function validateAndFormat(
  aiVars: Record<string, string>,
  chosenId: string,
  chosenBlueprint: BlueprintType,
): { text: string; answer: string; hint: string } {
  // LAPIS 1: Undefined / Empty
  for (const key in aiVars) { if (!aiVars[key] || aiVars[key].trim() === "") throw new Error(`LAPIS 1: Var ${key} kosong`); }
  
  // LAPIS 2: Sanitasi dasar
  for (const key in aiVars) { aiVars[key] = aiVars[key].trim().replace(/[.,!]+$/, ""); }
  
  // LAPIS 3: BASE dilarang mengandung helper verb
  if (aiVars.BASE && /^(will|is|are|am|was|were|have|has|had|did|do|does)\b/i.test(aiVars.BASE)) throw new Error(`LAPIS 3: BASE mengandung helper verb: "${aiVars.BASE}"`);
  
  // LAPIS 4: BASE dilarang mengandung contraction
  if (aiVars.BASE && /\b(didn't|doesn't|don't|wasn't|weren't|isn't|aren't|hasn't|haven't|hadn't|won't|wouldn't|can't|couldn't|shouldn't)\b/i.test(aiVars.BASE)) throw new Error(`LAPIS 4: BASE mengandung contraction: "${aiVars.BASE}"`);
  
  // LAPIS 5: Deteksi V2/V3 di BASE
  if (aiVars.BASE) {
    const baseLower = aiVars.BASE.toLowerCase();
    if (/(ed|ied)$/.test(baseLower) && baseLower.length > 3) throw new Error(`LAPIS 5: BASE berakhiran -ed: "${aiVars.BASE}"`);
    if (aiVars.V_ING && baseLower === aiVars.V_ING.toLowerCase()) throw new Error(`LAPIS 5: BASE = V_ING: "${aiVars.BASE}"`);
  }
  
  // LAPIS 6: Cek Irregular verbs
  if (aiVars.BASE) {
    const baseLower = aiVars.BASE.toLowerCase();
    if (IRREGULAR_VERBS[baseLower]) {
      const expected = IRREGULAR_VERBS[baseLower];
      if (aiVars.V2 && aiVars.V2.toLowerCase() !== expected.v2) throw new Error(`LAPIS 6: V2 salah untuk "${aiVars.BASE}"`);
      if (aiVars.V3 && aiVars.V3.toLowerCase() !== expected.v3) throw new Error(`LAPIS 6: V3 salah untuk "${aiVars.BASE}"`);
    }
  }
  
  // LAPIS 7: Cek AI malas (V1 = V2/V3 padahal bukan unchanged verb)
  if (aiVars.BASE) {
    const baseLower = aiVars.BASE.toLowerCase();
    const isUnchangedOrIrregular = UNCHANGED_VERBS.has(baseLower) || !!IRREGULAR_VERBS[baseLower];
    if (!isUnchangedOrIrregular) {
      if (aiVars.V2 && baseLower === aiVars.V2.toLowerCase()) throw new Error(`LAPIS 7: V2 identik dengan BASE`);
      if (aiVars.V3 && baseLower === aiVars.V3.toLowerCase()) throw new Error(`LAPIS 7: V3 identik dengan BASE`);
    }
  }
  
  // LAPIS 8: Word count
  for (const key in aiVars) { if (key !== "AUX" && aiVars[key].split(" ").length > 3) throw new Error(`LAPIS 8: Var ${key} kepanjangan`); }
  
  // LAPIS 9: Subject-AUX agreement
  if (aiVars.AUX && !isValidSubjectAuxPair(aiVars.SUB, aiVars.AUX)) throw new Error(`LAPIS 9: Subject "${aiVars.SUB}" tidak cocok dengan AUX "${aiVars.AUX}"`);
  
    // LAPIS 10: V_ING check
  if (aiVars.V_ING && aiVars.BASE) {
    if (!aiVars.V_ING.toLowerCase().endsWith("ing")) throw new Error(`LAPIS 10: V_ING tidak berakhiran -ing`);
    const baseLower = aiVars.BASE.toLowerCase();
    if (baseLower.length > 3) {
      const root = baseLower.substring(0, baseLower.length - 2);
      if (!aiVars.V_ING.toLowerCase().includes(root)) throw new Error(`LAPIS 10: V_ING tidak cocok dengan BASE`);
    }
  }
  
  // LAPIS 11: Cegah double 'e' (exploreing)
  if (aiVars.V_ING && aiVars.BASE) {
    const baseLower = aiVars.BASE.toLowerCase();
    const vIngLower = aiVars.V_ING.toLowerCase();
    if (baseLower.endsWith('e') && !baseLower.endsWith('ie') && vIngLower.includes('eing')) throw new Error(`LAPIS 11: V_ING salah eja (double e)`);
  }
  
  // LAPIS 12: OBJ dilarang pakai kata waktu
  if (aiVars.OBJ && /(yesterday|tomorrow|every|already|soon|ago|last|right now|when|before|by)/i.test(aiVars.OBJ)) throw new Error("LAPIS 12: OBJ mengandung kata waktu terlarang");

  // Lowercase SUB untuk interrogative (Ini persiapan data, bukan validasi error)
  if (chosenId.endsWith("_int") && aiVars.SUB) { aiVars.SUB = aiVars.SUB.toLowerCase(); }

  const finalAnswer = chosenBlueprint.getAnswer(aiVars);
  
  // Suntikkan Time Marker dinamis
  const tenseBase = getTenseBase(chosenId);
  const timePhrase = getRandomTimeMarker(tenseBase);
  const varsWithTime = { ...aiVars, TIME: timePhrase };

  let finalText = fillTemplate(chosenBlueprint.textUser, varsWithTime);
  finalText = finalText.replace("{BLANK}", "___");

  // LAPIS 13: Pastikan ada slot ___ di dalam teks final
  if (!finalText.includes("___")) throw new Error("LAPIS 13: Blank slot not found in text!");

  const sanitizedData = sanitizeAIText({ text: finalText });
  finalText = sanitizedData.text || finalText;
  finalText = finalText.charAt(0).toUpperCase() + finalText.slice(1);

  return { text: finalText, answer: finalAnswer, hint: chosenBlueprint.getHint(aiVars) };
}