// Normalisasi contraction (didn't -> did not)
function normalizeContractions(text: string): string {
  return text.toLowerCase()
    .replace(/didn't/g, "did not").replace(/doesn't/g, "does not")
    .replace(/don't/g, "do not").replace(/wasn't/g, "was not")
    .replace(/weren't/g, "were not").replace(/isn't/g, "is not")
    .replace(/aren't/g, "are not").replace(/hasn't/g, "has not")
    .replace(/haven't/g, "have not").replace(/hadn't/g, "had not")
    .replace(/won't/g, "will not").replace(/wouldn't/g, "would not")
    .replace(/can't/g, "cannot").replace(/couldn't/g, "could not")
    .replace(/shouldn't/g, "should not");
}

// Evaluasi jawaban user vs jawaban benar (toleransi typo)
export function evaluateLocally(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (text: string) => {
    let t = text.toLowerCase().trim();
    t = t.replace(/\bdidnt\b/g, "did not").replace(/\bdoesnt\b/g, "does not")
         .replace(/\bdont\b/g, "do not").replace(/\bwasnt\b/g, "was not")
         .replace(/\bwerent\b/g, "were not").replace(/\bisnt\b/g, "is not")
         .replace(/\barent\b/g, "are not").replace(/\bhasnt\b/g, "has not")
         .replace(/\bhavent\b/g, "have not").replace(/\bhadnt\b/g, "had not")
         .replace(/\bwont\b/g, "will not");
    t = normalizeContractions(t);
    return t.replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
  };

  const uClean = normalize(userAnswer);
  const cClean = normalize(correctAnswer);
  if (uClean === cClean) return true;

  const uWords = uClean.split(" ");
  const cWords = cClean.split(" ");

  // Cek typo per kata
  if (uWords.length === cWords.length) {
    let typoCount = 0;
    for (let i = 0; i < uWords.length; i++) { if (uWords[i] !== cWords[i]) typoCount++; }
    if (typoCount === 1) {
      const diffWord_user = uWords.find((w, i) => w !== cWords[i]) || "";
      const diffWord_correct = cWords.find((w, i) => w !== uWords[i]) || "";
      if (diffWord_correct.length <= 5) return false; // Kata pendek tidak boleh typo
      if (Math.abs(diffWord_user.length - diffWord_correct.length) <= 1) {
        let diff = 0, i = 0, j = 0;
        while (i < diffWord_user.length && j < diffWord_correct.length) {
          if (diffWord_user[i] !== diffWord_correct[j]) { diff++; if (diff > 1) break; if (diffWord_user.length > diffWord_correct.length) i++; else if (diffWord_correct.length > diffWord_user.length) j++; else { i++; j++; } } else { i++; j++; }
        }
        if (diff <= 1) return true;
      }
    }
  }

  // Cek typo keseluruhan kalimat pendek
  if (Math.abs(uClean.length - cClean.length) <= 1 && uClean.length <= 10) {
    let diff = 0, i = 0, j = 0;
    while (i < uClean.length && j < cClean.length) {
      if (uClean[i] !== cClean[j]) { diff++; if (diff > 1) break; if (uClean.length > cClean.length) i++; else if (cClean.length > uClean.length) j++; else { i++; j++; } } else { i++; j++; }
    }
    if (diff <= 1) return true;
  }
  return false;
}