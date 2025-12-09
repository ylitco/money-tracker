import { z } from 'zod';
import { OperationSchema } from '../../models';

export interface OperationForm {
  amount: number | null;
  note?: string;
}

type Operation = z.infer<typeof OperationSchema>;

export interface AccountingFormProps {
  defaultValue?: OperationForm;
  onSubmit: (operation: Operation) => void;
}
