import { resolve, dirname } from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DEFAULT_BALANCE_PATH = resolve(__dirname, '../../data/balance.xlsx');

export async function readBalanceWorkbook(
  filePath?: string
): Promise<XLSX.WorkBook> {
  const balancePath = filePath ?? DEFAULT_BALANCE_PATH;
  const file = await readFile(balancePath);
  return XLSX.read(file, { cellDates: true });
}
