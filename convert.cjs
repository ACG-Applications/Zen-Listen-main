const fs = require('fs');
const path = require('path');

// 1. Read the file as plain text instead of requiring it
const fileContent = fs.readFileSync(path.join(__dirname, 'sentences.js'), 'utf8');

// 2. Find the array inside the text file (everything between the first [ and the last ])
const arrayStart = fileContent.indexOf('[');
const arrayEnd = fileContent.lastIndexOf(']');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error("Could not find the array in sentences.js");
  process.exit(1);
}

const arrayString = fileContent.substring(arrayStart, arrayEnd + 1);

// 3. Convert that string into a real JavaScript array
let originalData;
try {
  // We use eval here just for this local script to parse the JS array
  originalData = eval(`(${arrayString})`);
} catch (e) {
  console.error("Failed to parse the array", e);
  process.exit(1);
}

const genericDistractors = ["食べます", "飲みます", "行きます", "見ます", "昨日", "明日", "学校", "家", "電車"];

const convertedData = originalData.map((item) => {
  // Clean the Kanji (remove spaces and reading brackets)
  let cleanKanji = item.jp.replace(/（[^）]+）/g, '').replace(/\s+/g, '');
  let cleanKana = item.reading.replace(/\s+/g, '');

  // Create the Furigana string
  let furiganaString = "";
  const regex = /([^（\s]+)（([^）]+)）|([^\s]+)/g;
  let match;
  
  while ((match = regex.exec(item.jp)) !== null) {
    if (match[1] && match[2]) {
      furiganaString += `${match[1]}[${match[2]}]`;
    } else if (match[3]) {
      furiganaString += match[3];
    }
  }

  // 4. Create a simple Word Bank
  // We split the original jp string by spaces, AND remove the brackets permanently
  let chunks = item.jp.split(/\s+/).map(chunk => {
    // This line removes the (reading) from the chunks!
    return chunk.replace(/（[^）]+）/g, '').replace(/\([^)]+\)/g, '').trim();
  }).filter(chunk => chunk.length > 0); 

  const shuffledDistractors = genericDistractors.sort(() => 0.5 - Math.random()).slice(0, 3);
  let wordBank = [...chunks, ...shuffledDistractors].sort(() => 0.5 - Math.random());

  return {
    kanji: cleanKanji,
    kana: cleanKana,
    furigana: furiganaString,
    translation: item.translation,
    wordBank: wordBank
  };
});

// Write the output to a new file
const outputContent = `import { JapaneseSentence } from './types';\n\nexport const N5_SENTENCE_BANK: JapaneseSentence[] = ${JSON.stringify(convertedData, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'sentenceBank.ts'), outputContent);

console.log(`Successfully converted ${convertedData.length} sentences!`);
console.log(`Check your folder for 'sentenceBank.ts'`);