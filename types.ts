export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface JapaneseSentence {
  kanji: string;
  kana: string;
  furigana: string; 
  translation: string;
  wordBank: string[];
  audioBase64?: string; // Optional: stores the saved Gemini audio
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LISTENING = 'LISTENING',
  FINISHED = 'FINISHED'
}