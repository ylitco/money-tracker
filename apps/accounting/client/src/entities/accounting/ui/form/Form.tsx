import { Form, FormField, useAppForm } from '@money-tracker/ui-kit';
import { OperationSchema } from '../../models';
import { AccountingFormProps, OperationForm } from './Form.types';

const defaultValues: OperationForm = {
  amount: null,
};

export function AccountingForm({ onSubmit }: AccountingFormProps) {
  const form = useAppForm({
    defaultValues,
    onSubmit: ({ value: operation }) => {
      onSubmit(OperationSchema.parse(operation));
      form.reset();
    },
    onSubmitInvalid(props) {
      console.dir(props);
    },
    validators: {
      onChange: OperationSchema,
    },
  });

  return (
    <section>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="amount"
          children={(field) => {
            return (
              <FormField
                description="Введите сумму совершённой операции"
                label="Сумма операции"
                render={
                  <field.Number
                    value={field.state.value}
                    onValueChange={(amount) =>
                      field.handleChange(amount)
                    }
                  />
                }
              />
            );
          }}
        />
        <form.Button variant="contained" type="submit">
          Add
        </form.Button>
      </Form>
    </section>
  );
}
