import { JapaneseSentence, JLPTLevel } from "../types";
import { N5_SENTENCE_BANK } from "../sentenceBank";
import { N4_SENTENCE_BANK } from "../sentenceBankN4";
import { N3_SENTENCE_BANK } from "../sentenceBankN3";
import { N2_SENTENCE_BANK } from "../sentenceBankN2";
import { N1_SENTENCE_BANK } from "../sentenceBankN1";

const cleanString = (str: string) => str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()！？。、（）\s]/g, "");

export async function fetchRandomSentence(level: JLPTLevel, currentKanji?: string): Promise<JapaneseSentence> {
  let bank: JapaneseSentence[] = N5_SENTENCE_BANK; // Default
  
  switch (level) {
    case 'N5': bank = N5_SENTENCE_BANK; break;
    case 'N4': bank = N4_SENTENCE_BANK; break;
    case 'N3': bank = N3_SENTENCE_BANK; break;
    case 'N2': bank = N2_SENTENCE_BANK; break;
    case 'N1': bank = N1_SENTENCE_BANK; break;
  }
  
  const targetKanji = currentKanji ? cleanString(currentKanji) : undefined;
  
  // Filter out the current sentence so we don't repeat it
  let availableChoices = bank.filter(s => cleanString(s.kanji) !== targetKanji);
  
  // If the filter empties the array, reset it to the full bank
  if (availableChoices.length === 0) availableChoices = bank;

  // Pick a random sentence
  const randomIndex = Math.floor(Math.random() * availableChoices.length);
  return availableChoices[randomIndex];
}