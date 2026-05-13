// lib/aiService.ts
import { logger } from '@/lib/logger';
import { generateChronoFeedback } from '@/lib/chronoFeedback';

export interface Soal {
  context?: string;
  text: string;
  answer: string;
  hint: string;
}

const AI_TIMEOUT = 8000;

function normalizeContractions(text: string): string {
  return text
    .toLowerCase()
    .replace(/didn't/g, 'did not')
    .replace(/doesn't/g, 'does not')
    .replace(/don't/g, 'do not')
    .replace(/wasn't/g, 'was not')
    .replace(/weren't/g, 'were not')
    .replace(/isn't/g, 'is not')
    .replace(/aren't/g, 'are not')
    .replace(/hasn't/g, 'has not')
    .replace(/haven't/g, 'have not')
    .replace(/hadn't/g, 'had not')
    .replace(/won't/g, 'will not')
    .replace(/wouldn't/g, 'would not')
    .replace(/can't/g, 'cannot')
    .replace(/couldn't/g, 'could not')
    .replace(/shouldn't/g, 'should not');
}

export const generateAISoal = async (era: string, history: string[] = []): Promise<Soal> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT);

  try {
    let restrictionMsg = "";
    if (history.length > 0) {
      restrictionMsg = `\n\nFORBIDDEN QUESTIONS (Do NOT make questions similar to these):\n- ${history.join("\n- ")}`;
    }

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: era,
        mode: "generate",
        restriction: restrictionMsg,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn('WARN: AI generate gagal, pakai soal lokal');
      logger.warn('AI generate fallback ke soal lokal', { era, status: res.status });
      return getRandomSoal(era);
    }

    const data = await res.json();

    if (data.text && data.answer && data.hint) {
      return data as Soal;
    }

    logger.warn('AI generate format invalid, fallback lokal', { era, data });
    return getRandomSoal(era);
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === "AbortError") {
      console.warn("WARN: AI timeout, pakai soal lokal");
      logger.warn('AI generate timeout', { era });
    } else {
      console.warn("ERROR: Generate Error (pakai soal lokal):", error);
      logger.error('AI generate error', { era, error: String(error) });
    }
    return getRandomSoal(era);
  }
};

export const checkAIAnswer = async (params: {
  era: string;
  userAnswer: string;
  correctAnswer: string;
  questionText: string;
}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT);

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: JSON.stringify(params),
        mode: "correct",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.isCorrect === 'boolean' && data.explanation) {
        return data;
      }
    }
    console.warn('WARN: AI correction gagal, pakai koreksi lokal');
    logger.warn('AI correction fallback ke koreksi lokal', { era: params.era });
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn('WARN: AI correction error, pakai koreksi lokal');
    logger.error('AI correction error', { era: params.era, error: String(error) });
  }

  // ========== LOCAL FALLBACK ==========
  const uClean = normalizeContractions(params.userAnswer).trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
  const cClean = normalizeContractions(params.correctAnswer).trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');

  if (cClean.includes(' / ')) {
    const parts = cClean.split(' / ').map((s: string) => s.trim());
    const userParts = uClean.split(/[\s/]+/).filter(Boolean);

    if (parts.length === 2) {
      const match1 = userParts.includes(parts[0]);
      const match2 = userParts.includes(parts[1]);
      if (match1 && match2) {
        return { isCorrect: true, explanation: generateChronoFeedback(true, params.userAnswer, params.correctAnswer, params.questionText) };
      }
      if (match1 || match2) {
        const missing = match1 ? parts[1] : parts[0];
        return { isCorrect: false, explanation: `TIME GLITCH! Almost! You got one part right, but the second part should be "${missing}". Keep going!` };
      }
    }

    const isCorrect = parts.includes(uClean);
    return { isCorrect, explanation: generateChronoFeedback(isCorrect, params.userAnswer, parts[0], params.questionText) };
  }

  const isExact = uClean === cClean;
  const isTypo = !isExact && (() => {
    if (Math.abs(uClean.length - cClean.length) > 1) return false;
    let diff = 0, i = 0, j = 0;
    while (i < uClean.length && j < cClean.length) {
      if (uClean[i] !== cClean[j]) {
        diff++;
        if (diff > 1) return false;
        if (uClean.length > cClean.length) i++;
        else if (cClean.length > uClean.length) j++;
        else { i++; j++; }
      } else { i++; j++; }
    }
    return diff <= 1;
  })();

  const isCorrect = isExact || isTypo;
  return {
    isCorrect,
    explanation: generateChronoFeedback(isCorrect, params.userAnswer, params.correctAnswer, params.questionText),
  };
};

const fallbackSoal: Record<string, Soal[]> = {
  past: [
    { context: "Past Simple (Affirmative)", text: "He ___ (eat) breakfast yesterday.", answer: "ate", hint: "Past Simple of 'eat' (V2)." },
    { context: "Past Simple (Negative)", text: "She ___ (not / go) to the market yesterday.", answer: "did not go", hint: "Negative Past Simple (did not + V1)." },
    { context: "Past Simple (Question)", text: "Why ___ (he / run) yesterday?", answer: "did he run", hint: "Question Past Simple (did + S + V1)." },
    { context: "Past Continuous (Affirmative)", text: "The knight ___ (fight) a dragon when the alarm rang.", answer: "was fighting", hint: "Past Continuous of 'fight' (was/were + V-ing)." },
    { context: "Past Continuous (Negative)", text: "They ___ (not / dance) when the alarm rang.", answer: "were not dancing", hint: "Negative Past Continuous (was/were not + V-ing)." },
    { context: "Past Perfect (Affirmative)", text: "The pirate ___ (find) the map before the explosion.", answer: "had found", hint: "Past Perfect of 'find' (had + V3)." },
  ],
  present: [
    { context: "Present Simple (Affirmative)", text: "She ___ (walk) to school every day.", answer: "walks", hint: "Present Simple of 'walk' (V1+s)." },
    { context: "Present Simple (Negative)", text: "He ___ (not / like) spicy food every day.", answer: "does not like", hint: "Negative Present Simple (does not + V1)." },
    { context: "Present Simple (Question)", text: "Why ___ (she / read) books every day?", answer: "does she read", hint: "Question Present Simple (does + S + V1)." },
    { context: "Present Continuous (Affirmative)", text: "The cats ___ (play) with toys right now.", answer: "are playing", hint: "Present Continuous of 'play' (are + V-ing)." },
    { context: "Present Continuous (Negative)", text: "I ___ (not / sleep) right now.", answer: "am not sleeping", hint: "Negative Present Continuous (am not + V-ing)." },
    { context: "Present Perfect (Question)", text: "How long ___ (you / live) here since this morning?", answer: "have you lived", hint: "Question Present Perfect (have + S + V3)." },
  ],
  future: [
    { context: "Future Simple (Affirmative)", text: "They ___ (go) to the base tomorrow.", answer: "will go", hint: "Future Simple of 'go' (will + V1)." },
    { context: "Future Simple (Negative)", text: "She ___ (not / come) to the party tomorrow.", answer: "will not come", hint: "Negative Future Simple (will not + V1)." },
    { context: "Future Simple (Question)", text: "Where ___ (he / stay) tomorrow?", answer: "will he stay", hint: "Question Future Simple (will + S + V1)." },
    { context: "Future Continuous (Affirmative)", text: "The robot ___ (scan) the area at this exact time tomorrow.", answer: "will be scanning", hint: "Future Continuous of 'scan' (will be + V-ing)." },
    { context: "Future Perfect (Affirmative)", text: "The crew ___ (build) the station by next year.", answer: "will have built", hint: "Future Perfect of 'build' (will have + V3)." },
    { context: "Future Perfect (Negative)", text: "The scientist ___ (not / finish) the project by next year.", answer: "will not have finished", hint: "Negative Future Perfect (will not have + V3)." },
  ],
};

const getRandomSoal = (era: string): Soal => {
  const soalList = fallbackSoal[era] || fallbackSoal.present;
  return soalList[Math.floor(Math.random() * soalList.length)];
};