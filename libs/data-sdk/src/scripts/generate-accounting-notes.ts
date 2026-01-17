import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from '../lib/AccountingNotesImporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateAccountingNotes() {
  try {
    console.log('Parsing accounting notes from Excel...');
    const notes = await parse();

    console.log(`Found ${notes.length} notes`);

    // Create a Map to count duplicates
    const notesMap = new Map<string, number>();
    for (const note of notes) {
      notesMap.set(note, (notesMap.get(note) || 0) + 1);
    }

    // Sort by count in increasing order and convert to plain object
    const sortedEntries = Array.from(notesMap.entries()).sort((a, b) => b[1] - a[1]);
    const notesObject = Object.fromEntries(sortedEntries);

    console.log(`Unique notes: ${notesMap.size}`);

    const outputPath = resolve(__dirname, '../../data/accounting-notes.json');
    await writeFile(outputPath, JSON.stringify(notesObject, null, 2), 'utf-8');

    console.log(`✅ Successfully generated accounting-notes.json with ${notesMap.size} unique notes`);
  } catch (error) {
    console.error('❌ Error generating accounting notes:', error);
    process.exit(1);
  }
}

generateAccountingNotes();
