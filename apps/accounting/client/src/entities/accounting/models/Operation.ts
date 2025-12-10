import { z } from 'zod';
import { AccountNumber } from './Account';

export type DateISOString = string;

export interface OperationForm {
  transactionDate: DateISOString | null;
  debitAccount: AccountNumber | null;
  creditAccount: AccountNumber | null;
  amount: number | null;
  note?: string;
}

export type OperationRecord = z.infer<typeof OperationSchema>;

const AccountNumberSchema = z.union(
  [
    z.templateLiteral([z.number(), '-', z.number()]),
    z.templateLiteral([z.number()]),
  ],
  {
    error: (issue) => {
      if (issue.input === null) return 'Счёт обязателен для заполнения';
      else return 'Счёт должен быть в формате "номер" или "номер-субсчёт"';
    },
  }
);

export const OperationSchema = z.object({
  transactionDate: z.iso.date({ error: 'Не верный формат даты' }),
  debitAccount: AccountNumberSchema,
  creditAccount: AccountNumberSchema,
  amount: z
    .number({ message: 'Сумма операции обязательна для заполнения' })
    .positive({ message: 'Сумма операции должна быть больше нуля' }),
  note: z.string().optional(),
});
