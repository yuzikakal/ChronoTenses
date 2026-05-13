import type { BlueprintType } from "./types";

// Instruksi untuk AI
const AI_SUBJ_NORM = 'Give 1 CREATIVE subject noun phrase (e.g. "the rebel", "Dr. Lin"), ';
const AI_SUBJ_PRON = "Give 1 SHORT PRONOUN subject (he/she/they/we), ";
const AI_OBJ = "1 short objective noun phrase (NO time words).";

// PERUBAHAN: Keterangan waktu diganti jadi [TIME] agar dinamis!
export const advancedBlueprints: BlueprintType[] = [
  // ===== PAST SIMPLE =====
  { id: "past_simple_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => d.V2, getHint: (d) => `Past Simple of '${d.BASE}' (V2).`, aiVars: `${AI_SUBJ_NORM} 1 BASE verb, 1 V2, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V2":"...","OBJ":"..."}` },
  { id: "past_simple_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `did not ${d.BASE}`, getHint: () => `Negative Past Simple (did not + V1).`, aiVars: `${AI_SUBJ_NORM} 1 BASE verb, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","OBJ":"..."}` },
  { id: "past_simple_int", textUser: "Why {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `did ${d.SUB} ${d.BASE}`, getHint: () => `Question Past Simple (did + S + V1).`, aiVars: `${AI_SUBJ_PRON} 1 BASE verb, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","OBJ":"..."}` },

  // ===== PAST CONTINUOUS =====
  { id: "past_continuous_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} ${d.V_ING}`, getHint: (d) => `Past Continuous of '${d.BASE}' (was/were + V-ing).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (was/were), 1 BASE verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },
  { id: "past_continuous_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} not ${d.V_ING}`, getHint: () => `Negative Past Continuous (was/were not + V-ing).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (was/were), 1 BASE verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },
  { id: "past_continuous_int", textUser: "Where {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `${d.AUX} ${d.SUB} ${d.V_ING}`, getHint: () => `Question Past Continuous (was/were + S + V-ing).`, aiVars: `${AI_SUBJ_PRON} 1 AUX (was/were), 1 BASE verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },

  // ===== PAST PERFECT =====
  { id: "past_perfect_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `had ${d.V3}`, getHint: (d) => `Past Perfect of '${d.BASE}' (had + V3).`, aiVars: `${AI_SUBJ_NORM} 1 BASE verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V3":"...","OBJ":"..."}` },
  { id: "past_perfect_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `had not ${d.V3}`, getHint: () => `Negative Past Perfect (had not + V3).`, aiVars: `${AI_SUBJ_NORM} 1 BASE verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V3":"...","OBJ":"..."}` },
  { id: "past_perfect_int", textUser: "How {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `had ${d.SUB} ${d.V3}`, getHint: () => `Question Past Perfect (had + S + V3).`, aiVars: `${AI_SUBJ_PRON} 1 BASE verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V3":"...","OBJ":"..."}` },

  // ===== PRESENT SIMPLE =====
  { id: "present_simple_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => d.V1_S, getHint: (d) => `Present Simple of '${d.BASE}' (V1+s/es).`, aiVars: `${AI_SUBJ_NORM} 1 BASE verb, 1 V1_S (verb+s/es), ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V1_S":"...","OBJ":"..."}` },
  { id: "present_simple_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} not ${d.BASE}`, getHint: () => `Negative Present Simple (do/does not + V1).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (do/does), 1 BASE verb, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","OBJ":"..."}` },
  { id: "present_simple_int", textUser: "Why {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `${d.AUX} ${d.SUB} ${d.BASE}`, getHint: () => `Question Present Simple (do/does + S + V1).`, aiVars: `${AI_SUBJ_PRON} 1 AUX (do/does), 1 BASE verb, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","OBJ":"..."}` },

  // ===== PRESENT CONTINUOUS =====
  { id: "present_continuous_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} ${d.V_ING}`, getHint: (d) => `Present Continuous of '${d.BASE}' (is/are + V-ing).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (is/are), 1 BASE verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },
  { id: "present_continuous_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} not ${d.V_ING}`, getHint: () => `Negative Present Continuous (is/are not + V-ing).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (is/are), 1 BASE verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },
  { id: "present_continuous_int", textUser: "Why {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `${d.AUX} ${d.SUB} ${d.V_ING}`, getHint: () => `Question Present Continuous (is/are + S + V-ing).`, aiVars: `${AI_SUBJ_PRON} 1 AUX (is/are), 1 BASE verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },

  // ===== PRESENT PERFECT =====
  { id: "present_perfect_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} ${d.V3}`, getHint: (d) => `Present Perfect of '${d.BASE}' (has/have + V3).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (has/have), 1 BASE verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V3":"...","OBJ":"..."}` },
  { id: "present_perfect_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `${d.AUX} not ${d.V3}`, getHint: () => `Negative Present Perfect (has/have not + V3).`, aiVars: `${AI_SUBJ_NORM} 1 AUX (has/have), 1 BASE verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V3":"...","OBJ":"..."}` },
  { id: "present_perfect_int", textUser: "Why {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `${d.AUX} ${d.SUB} ${d.V3}`, getHint: () => `Question Present Perfect (has/have + S + V3).`, aiVars: `${AI_SUBJ_PRON} 1 AUX (has/have), 1 BASE verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","AUX":"...","BASE":"...","V3":"...","OBJ":"..."}` },

  // ===== FUTURE SIMPLE =====
  { id: "future_simple_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `will ${d.BASE}`, getHint: (d) => `Future Simple of '${d.BASE}' (will + V1).`, aiVars: `${AI_SUBJ_NORM} 1 BASE root verb (do NOT include "will"), ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","OBJ":"..."}` },
  { id: "future_simple_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `will not ${d.BASE}`, getHint: () => `Negative Future Simple (will not + V1).`, aiVars: `${AI_SUBJ_NORM} 1 BASE root verb (do NOT include "will"), ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","OBJ":"..."}` },
  { id: "future_simple_int", textUser: "Where {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `will ${d.SUB} ${d.BASE}`, getHint: () => `Question Future Simple (will + S + V1).`, aiVars: `${AI_SUBJ_PRON} 1 BASE root verb, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","OBJ":"..."}` },

  // ===== FUTURE CONTINUOUS =====
  { id: "future_continuous_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `will be ${d.V_ING}`, getHint: (d) => `Future Continuous of '${d.BASE}' (will be + V-ing).`, aiVars: `${AI_SUBJ_NORM} 1 BASE root verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },
  { id: "future_continuous_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `will not be ${d.V_ING}`, getHint: () => `Negative Future Continuous (will not be + V-ing).`, aiVars: `${AI_SUBJ_NORM} 1 BASE root verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },
  { id: "future_continuous_int", textUser: "Why {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `will ${d.SUB} be ${d.V_ING}`, getHint: () => `Question Future Continuous (will + S + be + V-ing).`, aiVars: `${AI_SUBJ_PRON} 1 BASE root verb, 1 V_ING, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V_ING":"...","OBJ":"..."}` },

  // ===== FUTURE PERFECT =====
  { id: "future_perfect_aff", textUser: "[SUB] {BLANK} ([BASE]) [OBJ] [TIME].", getAnswer: (d) => `will have ${d.V3}`, getHint: (d) => `Future Perfect of '${d.BASE}' (will have + V3).`, aiVars: `${AI_SUBJ_NORM} 1 BASE root verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V3":"...","OBJ":"..."}` },
  { id: "future_perfect_neg", textUser: "[SUB] {BLANK} (not / [BASE]) [OBJ] [TIME].", getAnswer: (d) => `will not have ${d.V3}`, getHint: () => `Negative Future Perfect (will not have + V3).`, aiVars: `${AI_SUBJ_NORM} 1 BASE root verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V3":"...","OBJ":"..."}` },
  { id: "future_perfect_int", textUser: "How {BLANK} ([SUB] / [BASE]) [OBJ] [TIME]?", getAnswer: (d) => `will ${d.SUB} have ${d.V3}`, getHint: () => `Question Future Perfect (will + S + have + V3).`, aiVars: `${AI_SUBJ_PRON} 1 BASE root verb, 1 V3, ${AI_OBJ} JSON: {"SUB":"...","BASE":"...","V3":"...","OBJ":"..."}` },
];