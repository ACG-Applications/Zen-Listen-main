import { JapaneseSentence, JLPTLevel } from "../types";

export const cleanString = (str: string) => str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()！？。、（）\s]/g, "");

// One chunk per level: Vite turns each dynamic import into its own file, so the app
// only downloads the bank being played (N5 loads as soon as the first session starts).
const BANK_LOADERS: Record<JLPTLevel, () => Promise<JapaneseSentence[]>> = {
  N5: () => import("../sentenceBank").then((m) => m.N5_SENTENCE_BANK),
  N4: () => import("../sentenceBankN4").then((m) => m.N4_SENTENCE_BANK),
  N3: () => import("../sentenceBankN3").then((m) => m.N3_SENTENCE_BANK),
  N2: () => import("../sentenceBankN2").then((m) => m.N2_SENTENCE_BANK),
  N1: () => import("../sentenceBankN1").then((m) => m.N1_SENTENCE_BANK),
};

export function shuffle<T>(items: T[]): T[] {
  // Fisher-Yates: sort(() => Math.random() - 0.5) is biased and leaves items
  // noticeably close to their original positions.
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export async function getShuffledBank(
  level: JLPTLevel,
): Promise<JapaneseSentence[]> {
  const load = BANK_LOADERS[level] ?? BANK_LOADERS.N5;
  return shuffle(await load());
}
