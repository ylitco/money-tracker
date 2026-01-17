export const historyLocale = {
  columns: {
    date: {
      label: 'Дата транзакции',
      format: 'DD.MM.YYYY',
    },
    debitAccount: {
      label: 'Дебет по счёту',
    },
    creditAccount: {
      label: 'Кредит по счёту',
    },
    amount: {
      label: 'Сумма операции',
      formatter: new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'rub',
        minimumFractionDigits: 2,
      }),
    },
    note: {
      label: 'Комментарий',
    },
  },
} as const;

export type HistoryLocale = typeof historyLocale;

export function useHistoryLocale(): HistoryLocale {
  return historyLocale;
}
