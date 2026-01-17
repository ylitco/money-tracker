import { utils } from 'xlsx';
import { readBalanceWorkbook } from './balance-reader.js';
import { Transaction } from 'src/models/index.ts';

export async function parse() {
  const workbook = await readBalanceWorkbook();

  const accountingSheet = workbook.Sheets[workbook.SheetNames[2]];

  return utils
    .sheet_to_json<Transaction & { __rowNum__: number }>(accountingSheet, {
      header: ['date', 'debit', 'credit', 'amount', 'note'],
      range: 4,
    });
}
