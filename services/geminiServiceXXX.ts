import { GoogleGenAI, Modality } from "@google/genai";
import { JapaneseSentence, JLPTLevel } from "../types";
import { N5_SENTENCE_BANK } from "../sentenceBank"; // Import your 244 sentences!
import { N4_SENTENCE_BANK } from "../sentenceBankN4";
import { N3_SENTENCE_BANK } from "../sentenceBankN3";
import { N2_SENTENCE_BANK } from "../sentenceBankN2"; 
import { N1_SENTENCE_BANK } from "../sentenceBankN1"; // Add this

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

// --- LOCAL STORAGE CACHE LOGIC ---
const CACHE_KEY = "zen_listen_sentence_bank";
const cleanString = (str: string) => str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()！？。、\s]/g, "");

const primeCache = () => {
  try {
    const existing = localStorage.getItem(CACHE_KEY);
    if (!existing || JSON.parse(existing).length === 0) {
      // Start the cache with the first 5 sentences from your static bank
      localStorage.setItem(CACHE_KEY, JSON.stringify(N5_SENTENCE_BANK.slice(0, 5)));
    }
  } catch (e) {
    console.error("Failed to prime cache", e);
  }
};

primeCache();

export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY);
  primeCache(); 
};

export const updateAudioInCache = (kanji: string, audioBase64: string) => {
  try {
    const existing = localStorage.getItem(CACHE_KEY);
    if (!existing) return;
    const bank: JapaneseSentence[] = JSON.parse(existing);
    const targetKanji = cleanString(kanji);
    const index = bank.findIndex(s => cleanString(s.kanji) === targetKanji);
    
    if (index !== -1 && !bank[index].audioBase64) {
      bank[index].audioBase64 = audioBase64;
      localStorage.setItem(CACHE_KEY, JSON.stringify(bank));
    }
  } catch (e) {
    console.warn("Could not save audio to Local Storage.", e);
  }
};
// ---------------------------------

// --- STATIC BANK LOGIC ---
export async function fetchRandomSentence(level: JLPTLevel, currentKanji?: string): Promise<JapaneseSentence> {
  let bank = N5_SENTENCE_BANK; // Default
  
  if (level === 'N4') bank = N4_SENTENCE_BANK;
  if (level === 'N3') bank = N3_SENTENCE_BANK;
  if (level === 'N2') bank = N2_SENTENCE_BANK;
  if (level === 'N1') bank = N1_SENTENCE_BANK;
  
  const targetKanji = currentKanji ? cleanString(currentKanji) : undefined;
  let availableChoices = bank.filter(s => cleanString(s.kanji) !== targetKanji);
  if (availableChoices.length === 0) availableChoices = bank;

  const randomIndex = Math.floor(Math.random() * availableChoices.length);
  return availableChoices[randomIndex];
}

// --- AUDIO GENERATION ---
export async function generateSpeech(text: string, phonetic?: string): Promise<string | undefined> {
  const ai = getGeminiClient();
  const prompt = phonetic 
    ? `You are a professional Japanese native narrator. Read this sentence naturally. Text: ${text} Reading: ${phonetic}`
    : `Read this Japanese sentence clearly and naturally: ${text}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (e) {
    throw e; 
  }
}