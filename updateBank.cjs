const fs = require("fs");
const path = require("path");

// 1. Read the file
const fileContent = fs.readFileSync(
  path.join(__dirname, "sentenceBank.ts"),
  "utf8",
);

// 2. Extract the array
const arrayStart = fileContent.indexOf("[");
const arrayEnd = fileContent.lastIndexOf("]");
const arrayString = fileContent.substring(arrayStart, arrayEnd + 1);

let originalData;
try {
  originalData = eval(`(${arrayString})`);
} catch (e) {
  console.error("Failed to parse array", e);
  process.exit(1);
}

// Helper function to extract furigana for a specific chunk
// This is tricky because the full furigana string covers the whole sentence.
// We will do a simple approximation: if the chunk has Kanji, we try to find it in the main furigana string.
const getFuriganaForChunk = (chunk, fullFurigana) => {
  // If no kanji, no furigana needed
  if (!/[\u4e00-\u9faf]/.test(chunk)) return chunk;

  // Try to find the chunk pattern in the full furigana string
  // e.g. chunk "図書館" -> look for 図書館[...]
  const match = fullFurigana.match(new RegExp(`(${chunk})\\[([^\\]]+)\\]`));
  if (match) return match[0];

  // If we can't find it exactly, just return the chunk as is (fallback)
  return chunk;
};

const convertedData = originalData.map((item) => {
  const newWordBank = item.wordBank.map((chunk) => {
    // 1. Get Furigana (best effort based on full sentence furigana)
    const furiganaChunk = getFuriganaForChunk(chunk, item.furigana);

    // 2. Get English (Placeholder for now, we will fix this with AI later)
    // We will just use the chunk name as a placeholder so the code works.
    const en = "?";

    return {
      ja: chunk,
      furigana: furiganaChunk,
      en: en,
    };
  });

  return {
    ...item,
    wordBank: newWordBank,
  };
});

// Write output
const outputContent = `import { JapaneseSentence } from './types';\n\nexport const N5_SENTENCE_BANK: JapaneseSentence[] = ${JSON.stringify(convertedData, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "sentenceBank.ts"), outputContent);

console.log(`Successfully converted ${convertedData.length} sentences!`);
console.log(`Check your folder for 'sentenceBank.ts'`);
