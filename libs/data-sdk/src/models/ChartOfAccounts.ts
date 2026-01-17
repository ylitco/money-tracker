import { Account } from "./Account.ts";

export interface ChartOfAccounts {
  acceptedOn: Date;
  status: 'draft' | 'active' | 'archive';
  accounts: Array<Account>;
}
