import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from '../lib/ChartOfAccountsImporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateChartOfAccounts() {
  try {
    console.log('Parsing chart of accounts from Excel...');
    const chartOfAccounts = await parse();

    console.log(`Found ${chartOfAccounts.length} accounts`);

    const outputPath = resolve(__dirname, '../../data/chart-of-accounts.json');
    await writeFile(
      outputPath,
      JSON.stringify(chartOfAccounts, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('❌ Error generating chart of accounts:', error);
    process.exit(1);
  }
}

generateChartOfAccounts();
