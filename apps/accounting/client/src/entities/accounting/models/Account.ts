export type AccountNumber = `${number}-${number}` | `${number}`;

export interface Account {
  name: string;
  section: string;
  account: number;
  subaccount?: number;
  number: AccountNumber;
  type: string;
  acceptedOn?: {
    $date: string;
  }
  openingBalance?: number;
  goal?: number;
}
