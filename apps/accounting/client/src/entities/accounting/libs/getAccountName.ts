import { Account } from '@money-tracker/data-sdk';

export function getAccountName(
  chart: Account[],
  accountNumber?: string | number
): string {
  const a = chart.find(({ number }) => {
    return number === accountNumber?.toString();
  });

  if (a) {
    return a.name;
  } else {
    return '';
  }
}
