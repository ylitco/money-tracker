import {
  Form,
  FormField,
  useAppForm,
  useMediaQuery,
} from '@money-tracker/ui-kit';
import dayjs from 'dayjs';
import { OperationSchema } from '../../models';
import { AccountingFormProps, OperationForm } from './Form.types';

const defaultValues: OperationForm = {
  transactionDate: dayjs().format('YYYY-MM-DD'),
  amount: null,
};

export function AccountingForm({ onSubmit }: AccountingFormProps) {
  const isSmallMobile = useMediaQuery('(max-width: 320px)');
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
      onSubmit: OperationSchema,
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
          name="transactionDate"
          validators={{
            onChange: OperationSchema.shape.transactionDate,
          }}
          children={(field) => {
            return (
              <FormField
                description="Введите дату совершения операции"
                errors={field.state.meta.errors}
                label="Дата операции"
                name="transactionDate"
                control={({ id }) =>
                  isSmallMobile ? (
                    <field.DatePicker
                      value={dayjs(field.state.value)}
                      onChange={(newDate) => {
                        field.handleChange(
                          newDate ? dayjs(newDate).format('YYYY-MM-DD') : null
                        );
                      }}
                    />
                  ) : (
                    <field.DateCalendar
                      id={id}
                      value={dayjs(field.state.value)}
                      onValueChange={(newDate) => {
                        field.handleChange(
                          newDate ? dayjs(newDate).format('YYYY-MM-DD') : null
                        );
                      }}
                    />
                  )
                }
              />
            );
          }}
        />
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
