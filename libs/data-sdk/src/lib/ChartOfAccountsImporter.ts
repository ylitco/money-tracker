import { utils } from 'xlsx';
import { readBalanceWorkbook } from './balance-reader.js';

export interface Account {
  name: string;
  section: string;
  account: number;
  subaccount?: number;
  number: string;
  type: 'active' | 'passive';
  acceptedOn: Date;
  goal?: number;
  openingBalance: number;
}

export interface ChartOfAccounts {
  acceptedOn: Date;
  status: 'draft' | 'active' | 'archive';
  accounts: Array<Account>;
}

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
