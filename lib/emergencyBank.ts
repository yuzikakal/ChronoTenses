type Theme = 'scifi' | 'fantasy' | 'modern';

export interface Soal {
  context?: string;
  text: string;
  answer: string;
  hint: string;
}

interface VerbBank {
  BASE: string;
  V2: string;
  V3: string;
  V_ING: string;
  V1_S: string;
}

const themes: Record<Theme, { subjects: string[]; verbs: VerbBank[]; objects: string[] }> = {
  scifi: {
    subjects: ["The time traveler", "The cyborg", "Professor Chrono", "The AI", "The alien", "The android", "The commander", "The pilot", "The navigator", "The sentinel"],
    verbs: [
      { BASE: "scan", V2: "scanned", V3: "scanned", V_ING: "scanning", V1_S: "scans" },
      { BASE: "analyze", V2: "analyzed", V3: "analyzed", V_ING: "analyzing", V1_S: "analyzes" },
      { BASE: "repair", V2: "repaired", V3: "repaired", V_ING: "repairing", V1_S: "repairs" },
      { BASE: "hack", V2: "hacked", V3: "hacked", V_ING: "hacking", V1_S: "hacks" },
      { BASE: "override", V2: "overrode", V3: "overridden", V_ING: "overriding", V1_S: "overrides" },
      { BASE: "calculate", V2: "calculated", V3: "calculated", V_ING: "calculating", V1_S: "calculates" },
      { BASE: "launch", V2: "launched", V3: "launched", V_ING: "launching", V1_S: "launches" },
      { BASE: "observe", V2: "observed", V3: "observed", V_ING: "observing", V1_S: "observes" },
      { BASE: "extract", V2: "extracted", V3: "extracted", V_ING: "extracting", V1_S: "extracts" },
      { BASE: "decode", V2: "decoded", V3: "decoded", V_ING: "decoding", V1_S: "decodes" },
    ],
    objects: ["the temporal beacon", "the quantum relay", "the portal coordinates", "the wormhole data", "the time capsule", "the rift scanner", "the chroniton sample", "the mainframe", "the flux capacitor", "the AI core"],
  },
  fantasy: {
    subjects: ["The wizard", "The knight", "The dragon", "The elf", "The oracle", "The sorceress", "The paladin", "The rogue", "The bard", "The enchantress"],
    verbs: [
      { BASE: "cast", V2: "cast", V3: "cast", V_ING: "casting", V1_S: "casts" },
      { BASE: "forge", V2: "forged", V3: "forged", V_ING: "forging", V1_S: "forges" },
      { BASE: "summon", V2: "summoned", V3: "summoned", V_ING: "summoning", V1_S: "summons" },
      { BASE: "enchant", V2: "enchanted", V3: "enchanted", V_ING: "enchanting", V1_S: "enchants" },
      { BASE: "protect", V2: "protected", V3: "protected", V_ING: "protecting", V1_S: "protects" },
      { BASE: "destroy", V2: "destroyed", V3: "destroyed", V_ING: "destroying", V1_S: "destroys" },
      { BASE: "conjure", V2: "conjured", V3: "conjured", V_ING: "conjuring", V1_S: "conjures" },
      { BASE: "reveal", V2: "revealed", V3: "revealed", V_ING: "revealing", V1_S: "reveals" },
      { BASE: "banish", V2: "banished", V3: "banished", V_ING: "banishing", V1_S: "banishes" },
      { BASE: "heal", V2: "healed", V3: "healed", V_ING: "healing", V1_S: "heals" },
    ],
    objects: ["the ancient tome", "the runic ward", "the enchanted amulet", "the mana crystal", "the cursed artifact", "the spell scroll", "the dragon egg", "the elixir of time", "the oracle's eye", "the holy relic"],
  },
  modern: {
    subjects: ["She", "He", "The student", "The teacher", "The explorer", "The detective", "The scientist", "The traveler", "The architect", "The musician"],
    verbs: [
      { BASE: "explore", V2: "explored", V3: "explored", V_ING: "exploring", V1_S: "explores" },
      { BASE: "discover", V2: "discovered", V3: "discovered", V_ING: "discovering", V1_S: "discovers" },
      { BASE: "record", V2: "recorded", V3: "recorded", V_ING: "recording", V1_S: "records" },
      { BASE: "modify", V2: "modified", V3: "modified", V_ING: "modifying", V1_S: "modifies" },
      { BASE: "navigate", V2: "navigated", V3: "navigated", V_ING: "navigating", V1_S: "navigates" },
      { BASE: "activate", V2: "activated", V3: "activated", V_ING: "activating", V1_S: "activates" },
      { BASE: "construct", V2: "constructed", V3: "constructed", V_ING: "constructing", V1_S: "constructs" },
      { BASE: "investigate", V2: "investigated", V3: "investigated", V_ING: "investigating", V1_S: "investigates" },
      { BASE: "examine", V2: "examined", V3: "examined", V_ING: "examining", V1_S: "examines" },
      { BASE: "create", V2: "created", V3: "created", V_ING: "creating", V1_S: "creates" },
    ],
    objects: ["the encrypted drive", "the radio signal", "the temporal map", "the anomaly report", "the antique clock", "the secret journal", "the blueprint", "the flight recorder", "the museum artifact", "the hidden letter"],
  },
};

const pronounSubjects = ["he", "she", "it", "they", "we"];

function isPlural(subj: string): boolean {
  const s = subj.toLowerCase().trim();
  return s.startsWith("they") || s.startsWith("we ") || s === "we" || s.includes(" and ");
}

function getAuxForPronoun(pronoun: string, baseTense: string): string {
  const p = pronoun.toLowerCase();
  const isGroup = (p === 'they' || p === 'we');
  switch (baseTense) {
    case 'past_continuous': return isGroup ? 'were' : 'was';
    case 'present_continuous': return isGroup ? 'are' : 'is';
    case 'present_perfect': return isGroup ? 'have' : 'has';
    case 'present_simple': return isGroup ? 'do' : 'does';
    default: return '';
  }
}

function getAuxForNoun(subj: string, baseTense: string): string {
  const plural = isPlural(subj);
  switch (baseTense) {
    case 'past_continuous': return plural ? 'were' : 'was';
    case 'present_continuous': return plural ? 'are' : 'is';
    case 'present_perfect': return plural ? 'have' : 'has';
    case 'present_simple': return plural ? 'do' : 'does';
    default: return '';
  }
}

function extractUsedVerbs(restriction?: string): string[] {
  if (!restriction) return [];
  const matches = restriction.match(/\(([^)]+)\)/g);
  if (!matches) return [];
  return matches.map(m => {
    const inner = m.replace(/[()]/g, '');
    const parts = inner.split('/');
    const lastPart = parts[parts.length - 1].trim().toLowerCase();
    return lastPart.replace(/^(not|did|does|do|will|was|were|has|have|had|is|are|am)\s*/i, '').trim();
  }).filter(v => v.length > 0);
}

export function getEmergencyVariables(tenseId: string, restriction?: string): Record<string, string> {
  const forbiddenBases = extractUsedVerbs(restriction);
  const parts = tenseId.split('_');
  const form = parts.length >= 3 ? parts[parts.length - 1] : 'aff';
  const baseTense = parts.length >= 3 ? parts.slice(0, -1).join('_') : tenseId;

  const themeKeys = Object.keys(themes) as Theme[];
  const chosenTheme = themes[themeKeys[Math.floor(Math.random() * themeKeys.length)]];

  let availableVerbs = chosenTheme.verbs.filter(v => !forbiddenBases.includes(v.BASE.toLowerCase()));
  if (availableVerbs.length === 0) availableVerbs = chosenTheme.verbs;

  const verb = availableVerbs[Math.floor(Math.random() * availableVerbs.length)];
  const obj = chosenTheme.objects[Math.floor(Math.random() * chosenTheme.objects.length)];

  if (form === 'int') {
    const pronoun = pronounSubjects[Math.floor(Math.random() * pronounSubjects.length)];
    const aux = getAuxForPronoun(pronoun, baseTense);
    switch (baseTense) {
      case 'past_simple': return { SUB: pronoun, BASE: verb.BASE, OBJ: obj };
      case 'past_continuous': return { SUB: pronoun, AUX: aux, BASE: verb.BASE, V_ING: verb.V_ING, OBJ: obj };
      case 'past_perfect': return { SUB: pronoun, BASE: verb.BASE, V3: verb.V3, OBJ: obj };
      case 'present_simple': return { SUB: pronoun, AUX: aux, BASE: verb.BASE, OBJ: obj };
      case 'present_continuous': return { SUB: pronoun, AUX: aux, BASE: verb.BASE, V_ING: verb.V_ING, OBJ: obj };
      case 'present_perfect': return { SUB: pronoun, AUX: aux, BASE: verb.BASE, V3: verb.V3, OBJ: obj };
      case 'future_simple': return { SUB: pronoun, BASE: verb.BASE, OBJ: obj };
      case 'future_continuous': return { SUB: pronoun, BASE: verb.BASE, V_ING: verb.V_ING, OBJ: obj };
      case 'future_perfect': return { SUB: pronoun, BASE: verb.BASE, V3: verb.V3, OBJ: obj };
      default: return { SUB: pronoun, BASE: verb.BASE, V2: verb.V2, OBJ: obj };
    }
  }

  const subj = chosenTheme.subjects[Math.floor(Math.random() * chosenTheme.subjects.length)];
  const aux = getAuxForNoun(subj, baseTense);
  switch (baseTense) {
    case 'past_simple': return { SUB: subj, BASE: verb.BASE, V2: verb.V2, OBJ: obj };
    case 'past_continuous': return { SUB: subj, AUX: aux, BASE: verb.BASE, V_ING: verb.V_ING, OBJ: obj };
    case 'past_perfect': return { SUB: subj, BASE: verb.BASE, V3: verb.V3, OBJ: obj };
    case 'present_simple': return { SUB: subj, BASE: verb.BASE, V1_S: verb.V1_S, OBJ: obj };
    case 'present_continuous': return { SUB: subj, AUX: aux, BASE: verb.BASE, V_ING: verb.V_ING, OBJ: obj };
    case 'present_perfect': return { SUB: subj, AUX: aux, BASE: verb.BASE, V3: verb.V3, OBJ: obj };
    case 'future_simple': return { SUB: subj, BASE: verb.BASE, OBJ: obj };
    case 'future_continuous': return { SUB: subj, BASE: verb.BASE, V_ING: verb.V_ING, OBJ: obj };
    case 'future_perfect': return { SUB: subj, BASE: verb.BASE, V3: verb.V3, OBJ: obj };
    default: return { SUB: subj, BASE: verb.BASE, V2: verb.V2, OBJ: obj };
  }
}

function formatSubject(subj: string): string {
  const lowerSubj = subj.toLowerCase();
  const pronouns = ["he", "she", "it", "they", "we", "i", "you"];
  if (pronouns.includes(lowerSubj)) return lowerSubj;
  return subj.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getEmergencyContext(tenseId: string, subj: string, _verbData?: Record<string, string>): string {
  const s = formatSubject(subj);
  const parts = tenseId.split('_');
  const form = parts.length >= 3 ? parts[parts.length - 1] : 'aff';
  const baseTense = parts.length >= 3 ? parts.slice(0, -1).join('_') : tenseId;

  const checkPlural = isPlural(subj);
  const beAuxPast = checkPlural ? 'were' : 'was';
  const beAuxPresent = checkPlural ? 'are' : 'is';
  const haveAuxPresent = checkPlural ? 'have' : 'has';
  const doAuxPresent = checkPlural ? 'do' : 'does';

  const dialogues: Record<string, Record<string, string[]>> = {
    past_simple: {
      aff: [
        `Fascinating! ${s} actually did that in the past!`,
        `I remember this! ${s} took action back then!`,
        `History records that ${s} made a move in the past!`
      ],
      neg: [
        `Wait, history says ${s} did NOT do this!`,
        `Timeline correction! ${s} refused to act back then!`,
        `Interesting... ${s} completely avoided this action in the past!`
      ],
      int: [
        `Curious... did ${s} really do that back then?`,
        `I'm detecting a question about the past! Did ${s} take that action?`,
        `An anomaly! Did ${s} actually do that in the past?`
      ]
    },
    past_continuous: {
      aff: [
        `I'm detecting temporal ripples! ${s} ${beAuxPast} right in the middle of something!`, // was/were dinamis
        `At that exact moment, ${s} ${beAuxPast} actively doing this!`,
        `Watch closely! ${s} ${beAuxPast} in the process of acting when interrupted!`
      ],
      neg: [
        `Scanners clear! ${s} ${beAuxPast} NOT doing anything at that moment!`,
        `All quiet on the timeline! ${s} ${beAuxPast}n't in the middle of this!`,
        `Negative activity! ${s} ${beAuxPast} completely still when it happened!`
      ],
      int: [
        `An anomaly detected! What ${beAuxPast} ${s} doing at that exact second?`, // was/were dinamis
        `I need to know... ${beAuxPast} ${s} really in the middle of something?`,
        `Temporal query! What action ${beAuxPast} ${s} performing then?`
      ]
    },
    past_perfect: {
      aff: [
        `Look closely! Before that event happened, ${s} had already finished!`,
        `Timeline overlap! ${s} completed this even earlier!`,
        `A temporal precedent! ${s} had already taken action before!`
      ],
      neg: [
        `Timeline divergence! ${s} hadn't finished this yet!`,
        `Wait! ${s} did NOT complete this before the other event!`,
        `A lucky delay! ${s} had not done this earlier!`
      ],
      int: [
        `A temporal lock... had ${s} completed this earlier?`, // Ubah struktur agar tidak pakai "made they"
        `I need data! Had ${s} actually finished this before the reset?`,
        `Querying the deep past... had ${s} done this ahead of time?`
      ]
    },
    present_simple: {
      aff: [
        `A constant in this timeline! ${s} ${doAuxPresent} this all the time!`, // do/does dinamis
        `It's a daily routine! ${s} performs this action consistently!`,
        `Universal truth! ${s} always ${doAuxPresent} this!`
      ],
      neg: [
        `That breaks the routine! ${s} ${doAuxPresent}es not do this!`, // do/does dinamis
        `Hold on! ${s} ${doAuxPresent} NOT make this a habit!`,
        `Anomaly! ${s} refuses to do this regularly!`
      ],
      int: [
        `Hmm, I wonder... ${doAuxPresent} ${s} actually do this regularly?`, // do/does dinamis
        `Investigating the routine! Why ${doAuxPresent} ${s} perform this action?`,
        `A question of habit! What makes ${s} do this?` // "makes" aman untuk semua subjek
      ]
    },
    present_continuous: {
      aff: [
        `Look at the monitor! ${s} ${beAuxPresent} doing it right now!`, // is/are dinamis
        `Live feed! ${s} ${beAuxPresent} currently in the middle of this!`,
        `Action detected in the present! ${s} ${beAuxPresent} doing this as we speak!`
      ],
      neg: [
        `Strange... ${s} ${beAuxPresent}n't doing that right now!`, // is/are dinamis
        `Stand down! ${s} ${beAuxPresent} NOT in the middle of this!`,
        `Negative current action! ${s} ${beAuxPresent} idle at the moment!`
      ],
      int: [
        `Wait, what ${beAuxPresent} ${s} doing at this exact second?`, // is/are dinamis
        `I need a status report! Why ${beAuxPresent} ${s} acting right now?`,
        `Temporal curiosity! What ${beAuxPresent} ${s} currently performing?`
      ]
    },
    present_perfect: {
      aff: [
        `Update! ${s} ${haveAuxPresent} just done this, altering the present!`, // has/have dinamis
        `Timeline secured! ${s} ${haveAuxPresent} completed this up to now!`,
        `The effect is present! ${s} ${haveAuxPresent} just finished an action!`
      ],
      neg: [
        `Zero records! ${s} ${haveAuxPresent} never done this up to now!`, // has/have dinamis
        `Unbelievable! ${s} ${haveAuxPresent} NOT experienced this yet!`,
        `A clean slate! ${s} ${haveAuxPresent}n't performed this action at all!`
      ],
      int: [
        `I need to check the logs... ${haveAuxPresent} ${s} actually done this yet?`, // has/have dinamis
        `Querying the present... how much of this ${haveAuxPresent} ${s} done up to now?`,
        `A lingering effect! How long ${haveAuxPresent} ${s} been doing this?`
      ]
    },
    future_simple: {
      aff: [
        `My sensors predict ${s} will do this soon!`,
        `Pew! Let's peek into the future... ${s} is going to take action!`,
        `Temporal forecast! ${s} will make a move!`
      ],
      neg: [
        `Time refuses it! ${s} definitely won't do this!`,
        `Future denied! ${s} refuses to take this action!`,
        `I can see it clearly... ${s} will NOT do this!`
      ],
      int: [
        `A mystery ahead... will ${s} actually do this?`,
        `Forecasting the future... when will ${s} make a move?`,
        `I need to know! Will ${s} take this action?`
      ]
    },
    future_continuous: {
      aff: [
        `Fast forward! ${s} will still be in the middle of this!`,
        `Temporal jump! At that exact moment, ${s} will be actively doing this!`,
        `Future scan! I see ${s} in the middle of an action!`
      ],
      neg: [
        `Future scan clear! ${s} won't be doing this then!`,
        `Freedom in the future! ${s} will NOT be in the middle of this!`,
        `Negative future state! ${s} won't be performing this action!`
      ],
      int: [
        `Peeking ahead... what will ${s} be doing at that exact moment?`,
        `Future query! Why will ${s} still be in the middle of this?`,
        `A continuous future anomaly! What will ${s} be performing?`
      ]
    },
    future_perfect: {
      aff: [
        `By that point, ${s} will have already completed this! Amazing!`,
        `Future milestone! ${s} will have finished this!`,
        `Temporal guarantee! ${s} will have done this by then!`
      ],
      neg: [
        `Behind schedule! ${s} won't have finished this by then!`,
        `Future delay! ${s} will NOT have completed this in time!`,
        `A failed deadline! ${s} won't have done this!`
      ],
      int: [
        `A future milestone... will ${s} have completed this in time?`,
        `Forecasting the deadline... how will ${s} have finished this?`,
        `I need calculations! Will ${s} have done this by then?`
      ]
    }
  };

  const tenseDialogues = dialogues[baseTense];
  if (!tenseDialogues) return `Processing temporal data for ${s}...`;

  const formDialogues = tenseDialogues[form];
  if (!formDialogues) return `Processing temporal data for ${s}...`;

  return pickRandom(formDialogues);
}