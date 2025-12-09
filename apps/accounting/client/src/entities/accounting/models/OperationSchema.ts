import { z } from 'zod';

export const OperationSchema = z.object({
  amount: z.number().positive(),
  note: z.string().optional(),
});
