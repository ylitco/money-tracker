import { z } from 'zod';
import { OperationSchema } from '../../models';

type DateISOString = string;

export interface OperationForm {
  transactionDate: DateISOString | null;
  amount: number | null;
  note?: string;
}

type Operation = z.infer<typeof OperationSchema>;

export interface AccountingFormProps {
  defaultValue?: OperationForm;
  onSubmit: (operation: Operation) => void;
}
