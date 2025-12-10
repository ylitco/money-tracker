import { OperationForm, OperationRecord } from '../../models';

export interface AccountingFormProps {
  defaultValue?: OperationForm;
  onSubmit: (operation: OperationRecord) => void;
}
