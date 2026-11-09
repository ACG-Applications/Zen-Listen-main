import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchRandomSentence } from "./services/sentenceService";
import { useRecorder } from "./hooks/useRecorder";
import { JapaneseSentence, AppState, JLPTLevel, WordChunk } from "./types";

const SLOW_AUDIO_RATE = 0.6;
const NORMAL_AUDIO_RATE = 1.0;

const JLPT_LEVELS: JLPTLevel[] = ["N5", "N4", "N3", "N2", "N1"];

interface EphemeralRecordings {
  before?: string; // data URL, pre-solve "first impression"
  after?: string; // data URL, post-solve "shadow"
}

const FuriganaText = ({
  text,
  showFurigana,
}: {
  text: string;
  showFurigana: boolean;
}) => {
  const parseFurigana = (str: string) => {
    if (str.includes("[")) {
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
            parts.push(
              <span key={`pre-${match.index}`} className="text-inherit">
                {beforeKanji}
              </span>,
            );
          }

          parts.push(
            <ruby
              key={`ruby-${match.index}`}
              className="mx-0 text-inherit"
              style={{ rubyAlign: "start", rubyPosition: "over" }}
            >
              {kanji}
              <rt
                className={`text-[0.55em] font-bold text-red-600 transition-all duration-300 ${showFurigana ? "opacity-100" : "opacity-0 overflow-hidden"}`}
                style={{ lineHeight: "1.6", paddingBottom: "2px" }}
              >
                {reading}
              </rt>
            </ruby>,
          );

          if (afterKanji) {
            parts.push(
              <span key={`post-${match.index}`} className="text-inherit">
                {afterKanji}
              </span>,
            );
          }
        } else {
          parts.push(
            <span key={`text-${match.index}`} className="text-inherit">
              {baseText}
            </span>,
          );
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < str.length) {
        parts.push(
          <span key={`text-end`} className="text-inherit">
            {str.slice(lastIndex)}
          </span>,
        );
      }
      return parts.length > 0 ? parts : [str];
    }
    return [
      <span key="raw" className="text-inherit">
        {str}
      </span>,
    ];
  };
  return <>{parseFurigana(text)}</>;
};

const WordBlock = ({
  chunk,
  showEigo,
  showWordFurigana,
  onClick,
  variant = "available",
}: {
  chunk: WordChunk;
  showEigo: boolean;
  showWordFurigana: boolean;
  onClick: () => void;
  variant?: "available" | "selected" | "correct";
}) => {
  const hasFurigana = chunk.furigana.includes("[");
  const showTooltip =
    (showEigo && chunk.en !== "?") || (showWordFurigana && hasFurigana);

  const buttonClasses = {
    available:
      "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow hover:text-black",
    selected: "bg-gray-50 border-gray-200 text-black hover:bg-gray-100",
    correct: "bg-green-50 border-green-200 text-green-600 cursor-default",
  }[variant];

  return (
    <div className="relative group hover:z-50">
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-gray-200 shadow-xl rounded-lg p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex flex-col items-center gap-1">
          {showWordFurigana && hasFurigana && (
            <div className="text-base font-semibold">
              <FuriganaText text={chunk.furigana} showFurigana={true} />
            </div>
          )}

          {showEigo && chunk.en !== "?" && (
            <div className="text-xs text-gray-600 font-medium">{chunk.en}</div>
          )}

          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
        </div>
      )}

      <button
        onClick={onClick}
        disabled={variant === "correct" && !onClick}
        className={`px-5 py-3 rounded-xl border text-xl font-medium shadow-sm transition-all active:scale-95 ${buttonClasses}`}
      >
        {chunk.ja}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [level, setLevel] = useState<JLPTLevel>("N5");
  const [sentence, setSentence] = useState<JapaneseSentence | null>(null);

  const [showFurigana, setShowFurigana] = useState(true);
  const [isSlowAudio, setIsSlowAudio] = useState(false);
  const [enableWordAudio, setEnableWordAudio] = useState(false);
  const [showEigo, setShowEigo] = useState(false);
  const [showWordFurigana, setShowWordFurigana] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const [selectedWords, setSelectedWords] = useState<WordChunk[]>([]);
  const [availableWords, setAvailableWords] = useState<WordChunk[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [isCorrect, setIsCorrect] = useState(false);
  const [history, setHistory] = useState<JapaneseSentence[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const [recording, setRecording] = useState<EphemeralRecordings>({});
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);
  const [shadowOpen, setShadowOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem("zen-listen:shadowOpen") === "1";
    } catch {
      return false;
    }
  });
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const recorder = useRecorder();

  const initialBankRef = useRef<WordChunk[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSentenceRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem("zen-listen:shadowOpen", shadowOpen ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [shadowOpen]);

  // Handle Esc key for closing modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsHowToOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const playSuccessSound = useCallback(() => {
    if (!audioContextRef.current)
      audioContextRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
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

  const speak = useCallback((text: string, rate: number = 0.9) => {
    if (!text) return;
    if (document.hidden) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }, []);

  const initSession = useCallback(
    async (targetLevel: JLPTLevel = level) => {
      window.speechSynthesis.cancel();

      setAppState(AppState.LOADING);
      setSelectedWords([]);
      setAvailableWords([]);
      setIsCorrect(false);
      setHistoryIndex(null);
      setRecording({});
      setShowTranslation(false);
      setIsSequencePlaying(false);

      try {
        const newSentence = await fetchRandomSentence(
          targetLevel,
          currentSentenceRef.current,
        );
        currentSentenceRef.current = newSentence.kanji;

        setSentence(newSentence);
        const shuffledBank = [...(newSentence.wordBank || [])].sort(
          () => Math.random() - 0.5,
        );
        initialBankRef.current = [...shuffledBank]; // Store original shuffled order
        setAvailableWords(shuffledBank);
        setAppState(AppState.LISTENING);
      } catch (error) {
        console.error("Initialization error", error);
        setAppState(AppState.IDLE);
      }
    },
    [level],
  );

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
    const activeSentence =
      historyIndex !== null ? history[historyIndex].kanji : sentence?.kanji;
    if (activeSentence) {
      speak(activeSentence, isSlowAudio ? SLOW_AUDIO_RATE : NORMAL_AUDIO_RATE);
    }
  }, [history, historyIndex, sentence, isSlowAudio, speak]);

  const playMySentence = () => {
    if (selectedWords.length === 0) return;
    const mySentence = selectedWords.map((w) => w.ja).join("");
    speak(mySentence, isSlowAudio ? SLOW_AUDIO_RATE : NORMAL_AUDIO_RATE);
  };

  const checkAnswer = (newSelectedWords: WordChunk[]) => {
    if (!sentence) return;

    const cleanRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()！？。、（）\s]/g;
    const cleanTarget = sentence.kanji.replace(cleanRegex, "");
    const joinedUserWords = newSelectedWords
      .map((w) => w.ja)
      .join("")
      .replace(cleanRegex, "");

    if (joinedUserWords === cleanTarget) {
      setIsCorrect(true);
      setAppState(AppState.FINISHED);
      playSuccessSound();
      setHistory((prev) => [...prev, sentence]);

      // Auto-play sentence slightly after success chime
      setTimeout(
        () =>
          speak(
            sentence.kanji,
            isSlowAudio ? SLOW_AUDIO_RATE : NORMAL_AUDIO_RATE,
          ),
        400,
      );
    }
  };

  const handleWordClick = (
    chunk: WordChunk,
    index: number,
    fromBank: boolean,
  ) => {
    if (isCorrect) {
      // In correct state, clicking a word just speaks it
      speak(chunk.ja, 0.75);
      return;
    }

    if (fromBank && enableWordAudio) {
      speak(chunk.ja, 0.75);
    }

    if (fromBank) {
      const newSelected = [...selectedWords, chunk];
      setSelectedWords(newSelected);
      setAvailableWords((prev) => prev.filter((_, i) => i !== index));
      checkAnswer(newSelected);
    } else {
      // Removing a word: Speak it if Word Audio is on
      if (enableWordAudio) {
        speak(chunk.ja, 0.75);
      }
      const newSelected = selectedWords.filter((_, i) => i !== index);
      setSelectedWords(newSelected);

      // Smarter undo: Insert back into the bank and sort by original order
      setAvailableWords((prev) => {
        const nextBank = [...prev, chunk];
        return nextBank.sort((a, b) => {
          const indexA = initialBankRef.current.findIndex((w) => w.ja === a.ja);
          const indexB = initialBankRef.current.findIndex((w) => w.ja === b.ja);
          return indexA - indexB;
        });
      });
    }
  };

  const handleClearAll = () => {
    if (isCorrect) return;
    setSelectedWords([]);
    setAvailableWords([...initialBankRef.current]);
  };

  const navigateHistory = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (historyIndex === null) {
        if (history.length > 0) setHistoryIndex(history.length - 1);
      } else if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
    } else {
      if (historyIndex !== null) {
        if (historyIndex < history.length - 1)
          setHistoryIndex(historyIndex + 1);
        else setHistoryIndex(null);
      }
    }
  };

  useEffect(() => {
    initSession();
  }, []);

  const displayedSentence =
    historyIndex !== null ? history[historyIndex] : sentence;
  const isViewingHistory = historyIndex !== null;
  const canGoBack =
    history.length > 0 && (historyIndex === null || historyIndex > 0);
  const fadeUp =
    "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards";

  const handleRecordBefore = async () => {
    if (recorder.isRecording) {
      const url = await recorder.stop();
      if (url) setRecording((prev) => ({ ...prev, before: url }));
    } else {
      await recorder.start();
    }
  };

  const handleRecordAfter = async () => {
    if (recorder.isRecording) {
      const url = await recorder.stop();
      if (url) setRecording((prev) => ({ ...prev, after: url }));
    } else {
      await recorder.start();
    }
  };

  const handleDeleteBefore = () => {
    setRecording((prev) => ({ ...prev, before: undefined }));
  };

  const handleDeleteAfter = () => {
    setRecording((prev) => ({ ...prev, after: undefined }));
  };

  const playSequence = () => {
    if (isSequencePlaying) return;
    setIsSequencePlaying(true);

    // 1. Play Model
    speak(
      displayedSentence!.kanji,
      isSlowAudio ? SLOW_AUDIO_RATE : NORMAL_AUDIO_RATE,
    );

    // 2. Wait roughly 3.5s (estimate for sentence length), then play Before
    setTimeout(() => {
      if (recording.before) {
        const audioBefore = new Audio(recording.before);
        audioBefore.play();

        // 3. Wait for Before to finish, then play After
        audioBefore.onended = () => {
          setTimeout(() => {
            if (recording.after) {
              const audioAfter = new Audio(recording.after);
              audioAfter.play();
              audioAfter.onended = () => setIsSequencePlaying(false);
            } else {
              setIsSequencePlaying(false);
            }
          }, 1000); // 1s pause
        };
      } else if (recording.after) {
        const audioAfter = new Audio(recording.after);
        audioAfter.play();
        audioAfter.onended = () => setIsSequencePlaying(false);
      } else {
        setIsSequencePlaying(false);
      }
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-[#fdfdfd] text-[#2c2c2c] selection:bg-gray-100 font-sans transition-all duration-700">
      {/* --- Antonio (Top Left) --- */}
      <div className="fixed top-8 left-8 z-20 pointer-events-none opacity-40">
        <img
          src="/Zen-Listen-main/Antonio.png"
          alt="Antonio"
          className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply"
        />
      </div>
      {/* --------------------------- */}

      {/* --- HOW TO MODAL --- */}
      {isHowToOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsHowToOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black tracking-wide">
                How to use Zen Listen
              </h2>
              <button
                onClick={() => setIsHowToOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <section>
                <h3 className="font-bold text-black mb-1">The basics</h3>
                <p>
                  Listen to the sentence using the big blue speaker button.
                  Then, tap the word blocks below to build what you heard. Tap
                  them again to remove them. When you are correct, you'll see a
                  green tick.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-black mb-1">Getting help</h3>
                <p>
                  Hover over any word (or long-press on mobile) to see its
                  English meaning and reading. This works on both the available
                  words and the ones you have placed in the sentence.
                </p>
              </section>

              <section className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-600 mb-1 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  Shadow & Compare
                </h3>
                <p className="mb-2">
                  This is the most powerful feature for learning:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1 mb-2">
                  <li>
                    <strong>Capture first impression:</strong> Record yourself
                    before solving. This is your raw interpretation.
                  </li>
                  <li>
                    <strong>My first impression:</strong> After solving, listen
                    back to what you thought it was.
                  </li>
                  <li>
                    <strong>Record Shadow:</strong> Make a second attempt now
                    that you know the correct sentence.
                  </li>
                  <li>
                    <strong>Play Sequence:</strong> Listen to the Model, then
                    your First Impression, then your Shadow back-to-back.
                  </li>
                </ul>
                <p className="text-xs text-blue-600/80 italic">
                  Comparing your attempts shows you exactly what your ear
                  missed.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-black mb-1">Toggles</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Furigana:</strong> Shows/hides readings over the
                    completed sentence.
                  </li>
                  <li>
                    <strong>Slow Audio:</strong> Slows down the model speaker
                    for listening practice.
                  </li>
                  <li>
                    <strong>Word Audio:</strong> Speaks each word as you tap it.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-black mb-1">History</h3>
                <p>
                  Use the <strong>Review</strong> button on the right edge to
                  step back through sentences you've already solved.
                </p>
              </section>
            </div>

            <button
              onClick={() => setIsHowToOpen(false)}
              className="mt-8 w-full py-3 bg-black text-white rounded-xl text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      {/* ------------------- */}

      <div className="fixed top-12 right-12 z-30 flex flex-col items-end space-y-6">
        <nav className="flex items-center justify-end space-x-6 h-6">
          {JLPT_LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`text-xs font-semibold tracking-[0.4em] transition-all duration-300 ${
                level === lvl
                  ? "text-black scale-125"
                  : "text-gray-200 hover:text-gray-400"
              }`}
            >
              {lvl}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsHowToOpen(true)}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>How To</span>
          </button>

          <button
            onClick={handleReset}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-red-400 transition-colors"
          >
            Reset Session
          </button>

          <label className="flex items-center cursor-pointer space-x-3 group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">
              Furigana
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={showFurigana}
                onChange={() => setShowFurigana(!showFurigana)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${showFurigana ? "bg-black" : "bg-gray-200"}`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showFurigana ? "translate-x-4" : ""}`}
              ></div>
            </div>
          </label>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center cursor-pointer space-x-3 group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">
              Slow Audio
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isSlowAudio}
                onChange={() => setIsSlowAudio(!isSlowAudio)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${isSlowAudio ? "bg-black" : "bg-gray-200"}`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isSlowAudio ? "translate-x-4" : ""}`}
              ></div>
            </div>
          </label>

          <label className="flex items-center cursor-pointer space-x-3 group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">
              Word Audio
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={enableWordAudio}
                onChange={() => setEnableWordAudio(!enableWordAudio)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${enableWordAudio ? "bg-black" : "bg-gray-200"}`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enableWordAudio ? "translate-x-4" : ""}`}
              ></div>
            </div>
          </label>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center cursor-pointer space-x-3 group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">
              Word Eigo
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={showEigo}
                onChange={() => setShowEigo(!showEigo)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${showEigo ? "bg-black" : "bg-gray-200"}`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showEigo ? "translate-x-4" : ""}`}
              ></div>
            </div>
          </label>

          <label className="flex items-center cursor-pointer space-x-3 group">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">
              Word Furigana
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={showWordFurigana}
                onChange={() => setShowWordFurigana(!showWordFurigana)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${showWordFurigana ? "bg-black" : "bg-gray-200"}`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showWordFurigana ? "translate-x-4" : ""}`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {history.length > 0 && (
        <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 z-20">
          <button
            onClick={() => navigateHistory("prev")}
            disabled={!canGoBack}
            className={`px-5 py-3 rounded-full border border-gray-100 bg-white shadow-sm transition-all duration-300 active:scale-90 disabled:opacity-0 flex items-center space-x-2 ${canGoBack ? "hover:shadow-md hover:border-gray-200 text-gray-400 hover:text-black" : "pointer-events-none"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Review
            </span>
          </button>

          {isViewingHistory && (
            <button
              onClick={() => navigateHistory("next")}
              className="px-5 py-3 rounded-full border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200 text-gray-400 hover:text-black active:scale-90 flex items-center space-x-2"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Next
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="max-w-2xl w-full flex-grow flex flex-col items-center justify-center space-y-8 pt-24 pb-12">
        <header className="text-center opacity-40">
          <h1 className="text-sm font-medium tracking-[0.3em] uppercase">
            {isViewingHistory ? "Review Mode" : "🧘 Zen Listen 🧘"}
          </h1>
        </header>

        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={playAudio}
            disabled={
              (!isViewingHistory &&
                (appState === AppState.LOADING || !sentence)) ||
              (isViewingHistory && !history[historyIndex])
            }
            className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 bg-blue-50 border border-blue-100 shadow-sm hover:shadow-lg hover:bg-blue-100 hover:border-blue-200 active:scale-95 disabled:opacity-30 ${appState === AppState.LOADING ? "animate-pulse" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-8 h-8 transition-colors ${!isViewingHistory && !sentence ? "text-blue-200" : "text-blue-500 group-hover:text-blue-700"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
            {appState === AppState.LOADING && (
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin opacity-10" />
            )}
          </button>

          {recorder.isSupported && !isViewingHistory && (
            <div className="flex flex-wrap justify-center items-center gap-3">
              {recording.before && !recorder.isRecording ? (
                <>
                  <audio controls src={recording.before} className="h-9" />
                  <button
                    onClick={handleRecordBefore}
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
                  >
                    Re-record
                  </button>
                  <button
                    onClick={handleDeleteBefore}
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete recording"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <button
                  onClick={handleRecordBefore}
                  disabled={appState === AppState.LOADING || !sentence}
                  className={`flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors disabled:opacity-40 ${recorder.isRecording ? "text-red-500" : "text-gray-400 hover:text-black"}`}
                >
                  {recorder.isRecording ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 animate-pulse"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="12" r="8" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                      />
                    </svg>
                  )}
                  <span>
                    {recorder.isRecording ? "Stop" : "Capture first impression"}
                  </span>
                </button>
              )}
              {recorder.error && (
                <span className="text-[10px] text-red-400">
                  {recorder.error}
                </span>
              )}
            </div>
          )}
        </div>

        {!isViewingHistory && (
          <div className="w-full space-y-8">
            <div className="relative flex flex-col items-center min-h-[100px] justify-center border-b border-gray-100 pb-4 pt-4">
              <div className="flex flex-wrap justify-center gap-3 items-center">
                {selectedWords.length === 0 && (
                  <span className="text-gray-400 text-xl font-light tracking-wide mt-2">
                    Tap words below to build the sentence
                  </span>
                )}

                {selectedWords.map((chunk, idx) => (
                  <WordBlock
                    key={`selected-${idx}`}
                    chunk={chunk}
                    showEigo={showEigo}
                    showWordFurigana={showWordFurigana}
                    onClick={() => handleWordClick(chunk, idx, false)}
                    variant={isCorrect ? "correct" : "selected"}
                  />
                ))}

                {isCorrect && (
                  <div className="ml-2 animate-in zoom-in fade-in duration-500 fill-mode-forwards flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {!isCorrect && (
              <div className="flex flex-col items-center space-y-4 pt-2">
                {selectedWords.length > 0 && (
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={playMySentence}
                      className="flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Play My Sentence</span>
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 hover:text-red-400 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-3">
                  {availableWords.map((chunk, idx) => (
                    <WordBlock
                      key={`bank-${idx}`}
                      chunk={chunk}
                      showEigo={showEigo}
                      showWordFurigana={showWordFurigana}
                      onClick={() => handleWordClick(chunk, idx, true)}
                      variant="available"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(isCorrect || isViewingHistory) && displayedSentence && (
          <div
            className={`flex flex-col items-center space-y-8 w-full ${fadeUp}`}
          >
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <p className="text-4xl font-normal text-black flex justify-center flex-wrap gap-x-1 leading-[2] items-baseline">
                  <FuriganaText
                    text={displayedSentence.furigana || displayedSentence.kanji}
                    showFurigana={showFurigana}
                  />
                </p>
              </div>

              {/* --- NEW REVIEW WORD CHUNKS SECTION --- */}
              {isViewingHistory && (
                <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-6 space-y-4">
                  {/* The correct chunks (Green) */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {displayedSentence.wordBank
                      .filter((chunk) =>
                        displayedSentence.kanji.includes(chunk.ja),
                      )
                      .map((chunk, idx) => (
                        <div
                          key={`correct-${idx}`}
                          className="relative hover:z-50 group"
                          title={chunk.en}
                        >
                          {/* Tooltip */}
                          {showEigo && chunk.en !== "?" && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-gray-200 shadow-xl rounded-lg p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex flex-col items-center gap-1">
                              <div className="text-xs text-gray-600 font-medium">
                                {chunk.en}
                              </div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
                            </div>
                          )}

                          <button
                            onClick={() =>
                              enableWordAudio && speak(chunk.ja, 0.85)
                            }
                            className="px-3 py-1.5 rounded-lg bg-green-50/50 border border-green-200 text-base font-medium text-green-700 flex items-center transition-colors hover:bg-green-100/50 cursor-pointer"
                          >
                            <FuriganaText
                              text={chunk.furigana}
                              showFurigana={showWordFurigana}
                            />
                          </button>
                        </div>
                      ))}
                  </div>

                  {/* The distractors (Purple, dashed) */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2 w-full">
                    {displayedSentence.wordBank
                      .filter(
                        (chunk) => !displayedSentence.kanji.includes(chunk.ja),
                      )
                      .map((chunk, idx) => (
                        <div
                          key={`distractor-${idx}`}
                          className="relative hover:z-50 group"
                          title={chunk.en}
                        >
                          {/* Tooltip */}
                          {showEigo && chunk.en !== "?" && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-white border border-gray-200 shadow-xl rounded-lg p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex flex-col items-center gap-1">
                              <div className="text-xs text-gray-600 font-medium">
                                {chunk.en}
                              </div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
                            </div>
                          )}

                          <button
                            onClick={() =>
                              enableWordAudio && speak(chunk.ja, 0.85)
                            }
                            className="px-3 py-1.5 rounded-lg bg-violet-50/50 border border-dashed border-violet-300 text-base font-medium text-violet-500 opacity-80 flex items-center transition-colors hover:bg-violet-100/50 hover:opacity-100 cursor-pointer"
                          >
                            <FuriganaText
                              text={chunk.furigana}
                              showFurigana={showWordFurigana}
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {/* -------------------------------------- */}

              <div className="pt-4 max-w-lg mx-auto flex flex-col items-center min-h-[3rem]">
                {!isViewingHistory && !showTranslation ? (
                  <button
                    onClick={() => setShowTranslation(true)}
                    className="text-xs font-semibold tracking-[0.1em] text-gray-400 hover:text-black transition-colors border-b border-gray-200 hover:border-black pb-0.5"
                  >
                    Reveal English
                  </button>
                ) : (
                  <p className="text-xl text-gray-600 font-light tracking-wide animate-in fade-in duration-300">
                    {displayedSentence.translation}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() =>
                isViewingHistory ? setHistoryIndex(null) : initSession()
              }
              className="px-10 py-4 bg-black text-white rounded-full text-xs font-semibold hover:bg-gray-800 transition-all hover:px-12 active:scale-95 tracking-[0.4em] uppercase shadow-lg shadow-black/5"
            >
              {isViewingHistory ? "Back to Current" : "Next Sentence"}
            </button>

            {!isViewingHistory && (
              <div className="w-full max-w-lg mx-auto">
                <button
                  onClick={() => setShadowOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
                  aria-expanded={shadowOpen}
                >
                  <span>Shadow &amp; Compare</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${shadowOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {shadowOpen && (
                  <div className={`mt-2 space-y-4 ${fadeUp}`}>
                    {/* 1. Model */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50/50 border border-blue-100">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500">
                        Model
                      </span>
                      <button
                        onClick={() =>
                          speak(
                            displayedSentence.kanji,
                            isSlowAudio ? SLOW_AUDIO_RATE : NORMAL_AUDIO_RATE,
                          )
                        }
                        className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                        aria-label="Play model"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* 2. First Impression */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                        My first impression
                      </span>
                      {recording.before ? (
                        <div className="flex items-center space-x-3">
                          <audio
                            controls
                            src={recording.before}
                            className="h-9"
                          />
                          <button
                            onClick={handleDeleteBefore}
                            className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Delete first impression"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-300 italic">
                          not recorded
                        </span>
                      )}
                    </div>

                    {/* 3. Post-Solve Attempt */}
                    {recorder.isSupported && (
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                          {recorder.isRecording
                            ? "Recording…"
                            : recording.after
                              ? "My Shadow"
                              : "Record Shadow"}
                        </span>
                        {recording.after && !recorder.isRecording ? (
                          <div className="flex items-center space-x-3">
                            <audio
                              controls
                              src={recording.after}
                              className="h-9"
                            />
                            <button
                              onClick={handleRecordAfter}
                              className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
                            >
                              Re-record
                            </button>
                            <button
                              onClick={handleDeleteAfter}
                              className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Delete second attempt"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleRecordAfter}
                            className={`flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${recorder.isRecording ? "text-red-500" : "text-gray-400 hover:text-black"}`}
                          >
                            {recorder.isRecording ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 animate-pulse"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <circle cx="12" cy="12" r="8" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                                />
                              </svg>
                            )}
                            <span>Record</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* 4. Play Sequence Button */}
                    {(recording.before || recording.after) &&
                      !recorder.isRecording && (
                        <button
                          onClick={playSequence}
                          disabled={isSequencePlaying}
                          className={`w-full mt-4 py-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${
                            isSequencePlaying
                              ? "bg-gray-50 text-gray-400 border-gray-200 cursor-wait"
                              : "bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]"
                          }`}
                        >
                          {isSequencePlaying ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Playing...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>Play Sequence</span>
                            </>
                          )}
                        </button>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="fixed bottom-6 text-[10px] text-gray-400 opacity-60 hover:opacity-100 transition-opacity duration-300 text-center px-4 w-full">
        Base code by{" "}
        <a
          href="https://github.com/chrisloveliverpool-debug/Zen-Listen"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-gray-300 hover:text-black transition-colors"
        >
          chrisloveliverpool-debug
        </a>{" "}
        • Perfected with the help of{" "}
        <a
          href="https://github.com/ACG-Applications"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-gray-300 hover:text-black transition-colors"
        >
          ACG-Applications
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/deepseek-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-gray-300 hover:text-black transition-colors"
        >
          DeepSeek
        </a>
      </footer>
    </div>
  );
};

export default App;
