export const accountingFormText = {
  fields: {
    transactionDate: {
      label: 'Дата операции',
      description: 'Введите дату совершения операции',
    },
    debitAccount: {
      label: 'Дебет по счёту',
      description: 'Введите счёт на который были зачислены средства',
    },
    creditAccount: {
      label: 'Кредит по счёту',
      description: 'Введите счёт с которого были списаны средства',
    },
    amount: {
      label: 'Сумма операции',
      description: 'Введите сумму совершённой операции',
    },
    note: {
      label: 'Комментарий',
      description: 'Введите комментарий в отношении операции',
    },
  },
  actions: {
    submit: 'Создать',
  },
} as const;

export type AccountingFormText = typeof accountingFormText;

export function useAccountingFormText(): AccountingFormText {
  return accountingFormText;
}
