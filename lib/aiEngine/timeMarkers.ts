// Bank keterangan waktu dinamis agar soal tidak membosankan
export const timeMarkers: Record<string, string[]> = {
  past_simple: ["yesterday", "last week", "in 1999", "two days ago", "last month"],
  past_continuous: ["when the alarm rang", "when the portal glitched", "while the system rebooted", "at that exact moment"],
  past_perfect: ["before the explosion", "before the timeline collapsed", "by the time the commander arrived", "prior to the reset"],
  present_simple: ["every day", "on a daily basis", "as a routine", "consistently", "every morning"],
  present_continuous: ["right now", "at this very moment", "currently", "as we speak"],
  present_perfect: ["since this morning", "since the anomaly was detected", "for the last decade", "just recently"],
  future_simple: ["tomorrow", "next week", "soon", "in the near future", "later tonight"],
  future_continuous: ["at this exact time tomorrow", "later this evening", "during the next cycle", "at this moment tomorrow"],
  future_perfect: ["by next year", "by the year 3024", "before the next cosmic cycle", "by the time the sun sets", "before the mission ends"],
};

// Ambil marker waktu secara random berdasarkan kategori tense
export function getRandomTimeMarker(tenseBase: string): string {
  const markers = timeMarkers[tenseBase] || timeMarkers.present_simple;
  return markers[Math.floor(Math.random() * markers.length)];
}

// Ekstrak base tense dari ID (misal: "past_continuous_aff" -> "past_continuous")
export function getTenseBase(tenseId: string): string {
  const parts = tenseId.split("_");
  return parts.length >= 3 ? parts.slice(0, -1).join("_") : tenseId;
}