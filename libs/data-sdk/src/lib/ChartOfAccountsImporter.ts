import { utils } from 'xlsx';
import { readBalanceWorkbook } from './balance-reader.js';
import { Account } from 'src/models/index.ts';

export async function parse() {
  const workbook = await readBalanceWorkbook();

  const chartOfAccountsSheet = workbook.Sheets[workbook.SheetNames[1]];

  return utils.sheet_to_json<Account & { __rowNum__: number }>(
    chartOfAccountsSheet,
    {
      header: [
        'name',
        'section',
        'account',
        'subaccount',
        'number',
        'type',
        'acceptedOn',
        'goal',
        'openingBalance',
      ],
    }
  );
}
