import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from '../lib/AccountingHistoryImporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateAccountingHistory() {
  try {
    console.log('Parsing accounting history from Excel...');
    const history = await parse();

    console.log(`Found ${history.length} records`);

    const outputPath = resolve(__dirname, '../../data/accounting-history.json');
    await writeFile(outputPath, JSON.stringify(history, null, 2), 'utf-8');

    console.log(`✅ Successfully generated accounting-history.json with ${history.length} records`);
  } catch (error) {
    console.error('❌ Error generating accounting history:', error);
    process.exit(1);
  }
}

generateAccountingHistory();
