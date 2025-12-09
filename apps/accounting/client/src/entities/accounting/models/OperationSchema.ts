import { z } from 'zod';

export const OperationSchema = z.object({
  transactionDate: z.iso.date({ error: 'Не верный формат даты' }),
  amount: z
    .number({ message: 'Сумма операции обязательна для заполнения' })
    .positive({ message: 'Сумма операции должна быть больше нуля' }),
  note: z.string().optional(),
});
