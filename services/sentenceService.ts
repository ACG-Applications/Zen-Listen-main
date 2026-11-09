import { JapaneseSentence, JLPTLevel } from "../types";
import { N5_SENTENCE_BANK } from "../sentenceBank";
import { N4_SENTENCE_BANK } from "../sentenceBankN4";
import { N3_SENTENCE_BANK } from "../sentenceBankN3";
import { N2_SENTENCE_BANK } from "../sentenceBankN2";
import { N1_SENTENCE_BANK } from "../sentenceBankN1";

export const cleanString = (str: string) => str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()！？。、（）\s]/g, "");

export function getShuffledBank(level: JLPTLevel): JapaneseSentence[] {
  let bank: JapaneseSentence[] = N5_SENTENCE_BANK;
  
  switch (level) {
    case 'N5': bank = N5_SENTENCE_BANK; break;
    case 'N4': bank = N4_SENTENCE_BANK; break;
    case 'N3': bank = N3_SENTENCE_BANK; break;
    case 'N2': bank = N2_SENTENCE_BANK; break;
    case 'N1': bank = N1_SENTENCE_BANK; break;
  }
  
  // Return a new shuffled copy of the bank
  return [...bank].sort(() => Math.random() - 0.5);
}