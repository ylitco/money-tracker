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
          validators={{
            onChange: OperationSchema.shape.amount,
          }}
          children={(field) => {
            return (
              <FormField
                description="Введите сумму совершённой операции"
                control={({ id }) => (
                  <field.Number
                    id={id}
                    onValueChange={field.handleChange}
                    value={field.state.value}
                  />
                )}
                errors={field.state.meta.errors}
                label="Сумма операции"
                name={field.name}
              />
            );
          }}
        />
        <form.AppField
          name="note"
          validators={{
            onChange: OperationSchema.shape.note,
          }}
          children={(field) => {
            return (
              <FormField
                description="Введите комментарий в отношении операции"
                dirty={field.state.meta.isDirty}
                invalid={!field.state.meta.isValid}
                label="Комментарий"
                name="note"
                errors={field.state.meta.errors}
                control={(props) => (
                  <field.Textarea
                    rows={4}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    onBlur={field.handleBlur}
                    {...props}
                  />
                )}
                touched={field.state.meta.isTouched}
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
