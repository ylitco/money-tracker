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
