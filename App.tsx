import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchRandomSentence } from './services/sentenceService';
import { JapaneseSentence, AppState, JLPTLevel, WordChunk } from './types';

const JLPT_LEVELS: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

const FuriganaText = ({ text, showFurigana }: { text: string, showFurigana: boolean }) => {
  const parseFurigana = (str: string) => {
    if (str.includes('[')) {
      const parts = [];
      const regex = /([^\[]+)\[([^\]]+)\]/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(str)) !== null) {
        const baseText = match[1]; 
        const reading = match[2];

        const kanjiMatch = baseText.match(/[\u4e00-\u9faf]+/);
        
        if (kanjiMatch) {
            const kanji = kanjiMatch[0];
            const beforeKanji = baseText.split(kanji)[0];
            const afterKanji = baseText.split(kanji)[1] || "";

            if (beforeKanji) {
              parts.push(<span key={`pre-${match.index}`} className="text-black">{beforeKanji}</span>);
            }
            
            parts.push(
              <ruby key={`ruby-${match.index}`} className="mx-0 text-black" style={{ rubyAlign: 'start', rubyPosition: 'over' }}>
                {kanji}
                <rt className={`text-[0.55em] font-bold text-red-600 transition-all duration-300 ${showFurigana ? 'opacity-100' : 'opacity-0 overflow-hidden'}`} style={{ lineHeight: '1' }}>
                  {reading}
                </rt>
              </ruby>
            );

            if (afterKanji) {
              parts.push(<span key={`post-${match.index}`} className="text-black">{afterKanji}</span>);
            }
        } else {
            parts.push(<span key={`text-${match.index}`} className="text-black">{baseText}</span>);
        }
        
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < str.length) {
        parts.push(<span key={`text-end`} className="text-black">{str.slice(lastIndex)}</span>);
      }
      return parts.length > 0 ? parts : [str];
    }
    return [<span key="raw" className="text-black">{str}</span>];
  };
  return <>{parseFurigana(text)}</>;
};

const WordBlock = ({ 
  chunk, 
  showEigo, 
  showWordFurigana, 
  onClick 
}: { 
  chunk: WordChunk, 
  showEigo: boolean, 
  showWordFurigana: boolean, 
  onClick: () => void 
}) => {
  const hasFurigana = chunk.furigana.includes('[');
  const showTooltip = (showEigo && chunk.en !== "?") || (showWordFurigana && hasFurigana);

  return (
    <div className="relative group">
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-gray-200 shadow-xl rounded-lg p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex flex-col items-center gap-1">
          
          {showWordFurigana && hasFurigana && (
             <div className="text-base font-semibold">
                <FuriganaText text={chunk.furigana} showFurigana={true} />
             </div>
          )}
          
          {showEigo && chunk.en !== "?" && (
            <div className="text-xs text-gray-600 font-medium">
              {chunk.en}
            </div>
          )}
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
        </div>
      )}

      <button 
        onClick={onClick}
        className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-xl font-medium text-gray-700 shadow-sm hover:border-gray-300 hover:shadow hover:text-black transition-all active:scale-95"
      >
        {chunk.ja}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [level, setLevel] = useState<JLPTLevel>('N5');
  const [sentence, setSentence] = useState<JapaneseSentence | null>(null);
  
  const [showFurigana, setShowFurigana] = useState(true);
  const [isSlowAudio, setIsSlowAudio] = useState(false);
  const [enableWordAudio, setEnableWordAudio] = useState(false);
  const [showEigo, setShowEigo] = useState(false);
  const [showWordFurigana, setShowWordFurigana] = useState(false);

  const [selectedWords, setSelectedWords] = useState<WordChunk[]>([]);
  const [availableWords, setAvailableWords] = useState<WordChunk[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState<JapaneseSentence[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSentenceRef = useRef<string | undefined>(undefined);

  const playSuccessSound = useCallback(() => {
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, []);

  const speak = (text: string, rate: number = 0.9) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const initSession = useCallback(async (targetLevel: JLPTLevel = level) => {
    window.speechSynthesis.cancel();

    setAppState(AppState.LOADING);
    setSelectedWords([]);
    setAvailableWords([]);
    setIsCorrect(false);
    setShowHint(false);
    setHistoryIndex(null);
    
    try {
      const newSentence = await fetchRandomSentence(targetLevel, currentSentenceRef.current);
      currentSentenceRef.current = newSentence.kanji;
      
      setSentence(newSentence);
      const shuffledBank = [...(newSentence.wordBank || [])].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffledBank);
      setAppState(AppState.LISTENING);
      
      if (newSentence.kanji) {
        setTimeout(() => speak(newSentence.kanji, isSlowAudio ? 0.75 : 1.0), 300);
      }

    } catch (error) {
      console.error("Initialization error", error);
      setAppState(AppState.IDLE);
    }
  }, [level, isSlowAudio]);

  const handleReset = () => {
    currentSentenceRef.current = undefined;
    initSession();
  };

  const handleLevelChange = (newLevel: JLPTLevel) => {
    if (newLevel === level) return;
    setLevel(newLevel);
    initSession(newLevel);
  };

  const playAudio = useCallback(async () => {
    const activeSentence = historyIndex !== null ? history[historyIndex].kanji : sentence?.kanji;
    if (activeSentence) {
      speak(activeSentence, isSlowAudio ? 0.75 : 1.0);
    }
  }, [history, historyIndex, sentence, isSlowAudio]);

  const playMySentence = () => {
    if (selectedWords.length === 0) return;
    const mySentence = selectedWords.map(w => w.ja).join('');
    speak(mySentence, isSlowAudio ? 0.75 : 1.0);
  };

  const checkAnswer = (newSelectedWords: WordChunk[]) => {
    if (!sentence) return;
    
    const cleanRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()！？。、（）\s]/g;
    const cleanTarget = sentence.kanji.replace(cleanRegex, "");
    const joinedUserWords = newSelectedWords.map(w => w.ja).join('').replace(cleanRegex, "");
    
    if (joinedUserWords === cleanTarget) {
      setIsCorrect(true);
      setAppState(AppState.FINISHED);
      playSuccessSound();
      setHistory(prev => [...prev, sentence]);
    }
  };

  const handleWordClick = (chunk: WordChunk, index: number, fromBank: boolean) => {
    if (isCorrect) return;

    if (fromBank && enableWordAudio) {
      speak(chunk.ja, 0.85);
    }

    if (fromBank) {
      const newSelected = [...selectedWords, chunk];
      setSelectedWords(newSelected);
      setAvailableWords(prev => prev.filter((_, i) => i !== index));
      checkAnswer(newSelected);
    } else {
      const newSelected = selectedWords.filter((_, i) => i !== index);
      setSelectedWords(newSelected);
      setAvailableWords(prev => [...prev, chunk]);
    }
  };

  const navigateHistory = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (historyIndex === null) { if (history.length > 0) setHistoryIndex(history.length - 1); }
      else if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
    } else {
      if (historyIndex !== null) {
        if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1);
        else setHistoryIndex(null);
      }
    }
  };

  useEffect(() => { initSession(); }, []);

  const displayedSentence = historyIndex !== null ? history[historyIndex] : sentence;
  const isViewingHistory = historyIndex !== null;
  const canGoBack = history.length > 0 && (historyIndex === null || historyIndex > 0);
  const fadeUp = "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards";

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-[#fdfdfd] text-[#2c2c2c] selection:bg-gray-100 font-sans transition-all duration-700">
      
      <nav className="fixed top-12 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-8 z-30 h-8">
        {JLPT_LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={`text-xs font-semibold tracking-[0.4em] transition-all duration-300 ${
              level === lvl 
                ? 'text-black scale-125' 
                : 'text-gray-200 hover:text-gray-400'
            }`}
          >
            {lvl}
          </button>
        ))}
      </nav>

      <div className="fixed top-12 right-12 z-20 flex flex-col items-end space-y-4">
        <div className="flex items-center space-x-6">
            <button onClick={handleReset} className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-red-400 transition-colors">
              Reset Session
            </button>
            
            <label className="flex items-center cursor-pointer space-x-3 group">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">Furigana</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={showFurigana} onChange={() => setShowFurigana(!showFurigana)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${showFurigana ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showFurigana ? 'translate-x-4' : ''}`}></div>
              </div>
            </label>
        </div>

        <div className="flex items-center space-x-6">
            <label className="flex items-center cursor-pointer space-x-3 group">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">Slow Audio</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={isSlowAudio} onChange={() => setIsSlowAudio(!isSlowAudio)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${isSlowAudio ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isSlowAudio ? 'translate-x-4' : ''}`}></div>
              </div>
            </label>

            <label className="flex items-center cursor-pointer space-x-3 group">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">Word Audio</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={enableWordAudio} onChange={() => setEnableWordAudio(!enableWordAudio)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${enableWordAudio ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enableWordAudio ? 'translate-x-4' : ''}`}></div>
              </div>
            </label>
        </div>

        <div className="flex items-center space-x-6">
            <label className="flex items-center cursor-pointer space-x-3 group">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">Word Eigo</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={showEigo} onChange={() => setShowEigo(!showEigo)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${showEigo ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showEigo ? 'translate-x-4' : ''}`}></div>
              </div>
            </label>

            <label className="flex items-center cursor-pointer space-x-3 group">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">Word Furigana</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={showWordFurigana} onChange={() => setShowWordFurigana(!showWordFurigana)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${showWordFurigana ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showWordFurigana ? 'translate-x-4' : ''}`}></div>
              </div>
            </label>
        </div>
      </div>

      {history.length > 0 && (
        <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 z-20">
          <button onClick={() => navigateHistory('prev')} disabled={!canGoBack}
            className={`p-4 rounded-full border border-gray-100 bg-white shadow-sm transition-all duration-300 active:scale-90 disabled:opacity-0 ${canGoBack ? 'hover:shadow-md hover:border-gray-200 text-gray-400 hover:text-black' : 'pointer-events-none'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          {isViewingHistory && (
            <button onClick={() => navigateHistory('next')}
              className="p-4 rounded-full border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200 text-gray-400 hover:text-black active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      )}

      <div className="max-w-2xl w-full flex-grow flex flex-col items-center justify-center space-y-12 pt-32">
        <header className="text-center opacity-40"><h1 className="text-sm font-medium tracking-[0.3em] uppercase">{isViewingHistory ? 'Review Mode' : 'Zen Listen'}</h1></header>

        <div className="flex flex-col items-center space-y-8">
          <button onClick={playAudio}
            disabled={(!isViewingHistory && (appState === AppState.LOADING || !sentence)) || (isViewingHistory && !history[historyIndex])}
            className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 bg-blue-50 border border-blue-100 shadow-sm hover:shadow-lg hover:bg-blue-100 hover:border-blue-200 active:scale-95 disabled:opacity-30 ${appState === AppState.LOADING ? 'animate-pulse' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 transition-colors ${(!isViewingHistory && !sentence) ? 'text-blue-200' : 'text-blue-500 group-hover:text-blue-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            {appState === AppState.LOADING && <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin opacity-10" />}
          </button>
        </div>

        {!isViewingHistory && (
          <div className="w-full space-y-12">
            <div className="relative flex flex-col items-center min-h-[120px] justify-center border-b border-gray-100 pb-6">
              {isCorrect && (
                <div className="absolute -top-12 animate-in zoom-in fade-in duration-500 fill-mode-forwards">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-3">
                {selectedWords.length === 0 && <span className="text-gray-200 text-2xl font-light tracking-wide mt-4">Tap words below to build the sentence</span>}
                {selectedWords.map((chunk, idx) => (
                  <button key={`selected-${idx}`} onClick={() => handleWordClick(chunk, idx, false)} disabled={isCorrect}
                    className={`px-5 py-3 rounded-xl text-2xl font-medium transition-all ${isCorrect ? 'bg-green-50 text-green-600 cursor-default' : 'bg-gray-50 text-black hover:bg-gray-100 active:scale-95'}`}>
                    {chunk.ja}
                  </button>
                ))}
              </div>
            </div>
            
            {!isCorrect && (
              <div className="flex flex-col items-center space-y-6 pt-4">
                
                {selectedWords.length > 0 && (
                  <button onClick={playMySentence} className="flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Play My Sentence</span>
                  </button>
                )}

                <div className="flex flex-wrap justify-center gap-3">
                  {availableWords.map((chunk, idx) => (
                    <WordBlock 
                      key={`bank-${idx}`} 
                      chunk={chunk} 
                      showEigo={showEigo} 
                      showWordFurigana={showWordFurigana} 
                      onClick={() => handleWordClick(chunk, idx, true)} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(isCorrect || isViewingHistory) && displayedSentence && (
          <div className={`flex flex-col items-center space-y-12 w-full ${fadeUp}`}>
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-5xl font-normal text-black flex justify-center flex-wrap gap-x-1 leading-[2] items-baseline">
                   <FuriganaText text={displayedSentence.furigana || displayedSentence.kanji} showFurigana={showFurigana} />
                </p>
              </div>
              <div className="pt-6 max-w-lg mx-auto">
                <p className="text-2xl text-gray-600 font-light tracking-wide">{displayedSentence.translation}</p>
              </div>
            </div>
            <button onClick={() => isViewingHistory ? setHistoryIndex(null) : initSession()}
              className="px-12 py-5 bg-black text-white rounded-full text-xs font-semibold hover:bg-gray-800 transition-all hover:px-14 active:scale-95 tracking-[0.4em] uppercase shadow-lg shadow-black/5">
              {isViewingHistory ? 'Back to Current' : 'Next Sentence'}
            </button>
          </div>
        )}

        {!isCorrect && !isViewingHistory && appState !== AppState.LOADING && (
          <div className="pt-8">
            <button onClick={() => setShowHint(!showHint)} className="text-[10px] text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-[0.4em] font-bold">
              {showHint ? 'Dismiss Hint' : 'Stuck?'}
            </button>
            {showHint && sentence && (
              <div className={`mt-8 text-center space-y-3 ${fadeUp}`}>
                <div className="space-y-1">
                  <p className="text-gray-300 text-xs italic font-light">{sentence.translation}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>


    </div>
  );
};

export default App;