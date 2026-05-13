export interface TenseInfo {
  name: string;
  rule: string;
  reason: string;
}

// Fungsi pendeteksi Tenses berdasarkan pola jawaban yang benar
function detectTenseRule(correctAnswer: string, questionText: string): TenseInfo {
  const c = correctAnswer.toLowerCase().trim();
  const qText = questionText.toLowerCase();

  // Future Perfect
  if (c.startsWith("will not have")) return { name: "Future Perfect (Negative)", rule: "S + will not have + V3", reason: "the sentence denies an action completed before a specific future point" };
  if (c.startsWith("will have")) return { name: "Future Perfect", rule: "S + will have + V3", reason: "the sentence indicates an action completed before a specific future point" };

  // Future Continuous
  if (c.startsWith("will not be")) return { name: "Future Continuous (Negative)", rule: "S + will not be + V-ing", reason: "the sentence denies an ongoing action in the future" };
  if (c.startsWith("will be")) return { name: "Future Continuous", rule: "S + will be + V-ing", reason: "the sentence indicates an ongoing action at a specific future moment" };

  // Future Simple
  if (c.startsWith("will not")) return { name: "Future Simple (Negative)", rule: "S + will not + V1", reason: "the sentence denies a planned future action" };
  if (c.startsWith("will")) return { name: "Future Simple", rule: "S + will + V1", reason: "the sentence talks about a planned future action" };

  // Past Perfect
  if (c.startsWith("had not")) return { name: "Past Perfect (Negative)", rule: "S + had not + V3", reason: "the sentence denies an action completed before another past event" };
  if (c.startsWith("had")) return { name: "Past Perfect", rule: "S + had + V3", reason: "the sentence indicates an action completed before another past event" };

  // Past Continuous
  if (c.startsWith("was not") || c.startsWith("were not")) return { name: "Past Continuous (Negative)", rule: "S + was/were not + V-ing", reason: "the sentence denies an action in progress when another event interrupted" };
  if (c.startsWith("was") || c.startsWith("were")) return { name: "Past Continuous", rule: "S + was/were + V-ing", reason: "the sentence indicates an action in progress when another event interrupted" };

  // Past Simple
  if (c.startsWith("did not")) return { name: "Past Simple (Negative)", rule: "S + did not + V1", reason: "the sentence denies a completed action in the past" };

  // Present Perfect
  if (c.startsWith("has not") || c.startsWith("have not")) return { name: "Present Perfect (Negative)", rule: "S + has/have not + V3", reason: "the sentence denies an action accomplished up to the present" };
  if (c.startsWith("has") || c.startsWith("have")) return { name: "Present Perfect", rule: "S + has/have + V3", reason: "the sentence indicates an action accomplished up to the present" };

  // Present Continuous
  if (c.startsWith("is not") || c.startsWith("are not") || c.startsWith("am not")) return { name: "Present Continuous (Negative)", rule: "S + is/are/am not + V-ing", reason: "the sentence denies an action happening right now" };
  if (c.startsWith("is") || c.startsWith("are") || c.startsWith("am")) return { name: "Present Continuous", rule: "S + is/are/am + V-ing", reason: "the sentence indicates an action happening right now" };

  // Present Simple Negative
  if (c.startsWith("does not") || c.startsWith("do not")) return { name: "Present Simple (Negative)", rule: "S + do/does not + V1", reason: "the sentence denies a habit or routine" };

  // PERBAIKAN BUG #1: Deteksi V2 atau V1+s yang berdiri sendiri tanpa auxiliary
  const pastMarkers = ["yesterday", "ago", "last week", "last month", "in 1999", "before the"];
  const presentMarkers = ["every day", "always", "usually", "every morning", "daily", "every time"];

  if (pastMarkers.some(m => qText.includes(m))) {
    return { name: "Past Simple", rule: "S + V2", reason: "the sentence describes a completed action in the past" };
  }
  if (presentMarkers.some(m => qText.includes(m))) {
    return { name: "Present Simple", rule: "S + V1+s/es", reason: "the sentence describes a habit or routine" };
  }

  // Default Fallback Terakhir
  return { name: "the correct tense", rule: "the appropriate formula", reason: "the sentence requires correct conjugation" };
}

// Fungsi pendeteksi Tenses khusus Question
function detectQuestionRule(correctAnswer: string): TenseInfo | null {
  const c = correctAnswer.toLowerCase().trim();
  if (!c.includes(" ")) return null; 

  const firstWord = c.split(" ")[0];
  
  if (firstWord === "will") {
    if (c.includes(" have ")) return { name: "Future Perfect (Question)", rule: "Will + S + have + V3?", reason: "the sentence asks about an action completed before a specific future point" };
    if (c.includes(" be ")) return { name: "Future Continuous (Question)", rule: "Will + S + be + V-ing?", reason: "the sentence asks about an ongoing action at a specific future moment" };
    return { name: "Future Simple (Question)", rule: "Will + S + V1?", reason: "the sentence asks about a planned future action" };
  }
  if (firstWord === "had") return { name: "Past Perfect (Question)", rule: "Had + S + V3?", reason: "the sentence asks about an action completed before another past event" };
  if (firstWord === "was" || firstWord === "were") return { name: "Past Continuous (Question)", rule: "Was/Were + S + V-ing?", reason: "the sentence asks about an action in progress when another event interrupted" };
  if (firstWord === "did") return { name: "Past Simple (Question)", rule: "Did + S + V1?", reason: "the sentence asks about a completed action in the past" };
  if (firstWord === "has" || firstWord === "have") return { name: "Present Perfect (Question)", rule: "Has/Have + S + V3?", reason: "the sentence asks about an action accomplished up to the present" };
  if (firstWord === "is" || firstWord === "are") return { name: "Present Continuous (Question)", rule: "Is/Are + S + V-ing?", reason: "the sentence asks about an action happening right now" };
  if (firstWord === "does" || firstWord === "do") return { name: "Present Simple (Question)", rule: "Does/Do + S + V1?", reason: "the sentence asks about a habit or routine" };

  return null;
}

export function generateChronoFeedback(
  isCorrect: boolean,
  userAnswer: string,
  correctAnswer: string,
  questionText: string
): string {
  const isQuestion = questionText.trim().endsWith("?");
  // PERBAIKAN: Kirim questionText ke detectTenseRule
  const rule = isQuestion ? detectQuestionRule(correctAnswer) : detectTenseRule(correctAnswer, questionText);
  
  const tenseName = rule?.name || "the correct tense";
  const formula = rule?.rule || "the appropriate formula";
  const reason = rule?.reason || "the sentence requires it";

  if (isCorrect) {
    const correctPhrases = [
      "TIMELINE SECURED!",
      "CHRONO APPROVES!",
      "BRILLIANT MOVE!",
      "PERFECT CONJUGATION!",
      "TEMPORAL SYNC COMPLETE!"
    ];
    const randomPhrase = correctPhrases[Math.floor(Math.random() * correctPhrases.length)];
    return `${randomPhrase} '${correctAnswer}' is exactly right! Because ${reason}, so we use the ${tenseName} rule: ${formula}.`;
  } else {
    // Cek typo
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
    const uNorm = normalize(userAnswer);
    const cNorm = normalize(correctAnswer);
    
    if (uNorm.length > 0 && cNorm.length > 0 && Math.abs(uNorm.length - cNorm.length) <= 1) {
      let diff = 0;
      let i = 0, j = 0;
      while (i < uNorm.length && j < cNorm.length) {
        if (uNorm[i] !== cNorm[j]) { diff++; if (uNorm.length > cNorm.length) i++; else if (cNorm.length > uNorm.length) j++; else { i++; j++; } }
        else { i++; j++; }
      }
      
      if (diff <= 1) {
        return `TEMPORAL ANOMALY! You typed '${userAnswer}', but the timeline demands '${correctAnswer}'. Because ${reason}. Formula: ${formula}.`;
      }
    }

    // Jika murni salah
    const wrongPhrases = [
      "TIME GLITCH!",
      "TIMELINE SHIFT!",
      "TEMPORAL PARADOX!",
      "SYSTEM FAILURE!"
    ];
    const randomWrong = wrongPhrases[Math.floor(Math.random() * wrongPhrases.length)];
    return `${randomWrong} It should be '${correctAnswer}', not '${userAnswer}'. Because ${reason}, so we use the ${tenseName} rule: ${formula}.`;
  }
}