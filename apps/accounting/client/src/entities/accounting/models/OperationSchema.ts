import { z } from 'zod';

export const OperationSchema = z.object({
  amount: z
    .number({ message: 'Сумма операции обязательна для заполнения' })
    .positive({ message: 'Сумма операции должна быть больше нуля' }),
  note: z.string().optional(),
});
