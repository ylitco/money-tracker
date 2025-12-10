import {
  Form,
  FormField,
  useAppForm,
  useMediaQuery,
} from '@money-tracker/ui-kit';
import dayjs from 'dayjs';
import {
  Account,
  AccountNumber,
  MOCK_CHART_OF_ACCOUNT,
  OperationForm,
  OperationSchema,
} from '../../models';
import { AccountingFormProps } from './Form.types';

const defaultValues: OperationForm = {
  transactionDate: dayjs().format('YYYY-MM-DD'),
  debitAccount: null,
  creditAccount: null,
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
                control={({ id }) =>
                  isSmallMobile ? (
                    <field.DatePicker
                      id={id}
                      onValueChange={(newDate) => {
                        field.handleChange(
                          newDate ? dayjs(newDate).format('YYYY-MM-DD') : null
                        );
                      }}
                      value={dayjs(field.state.value)}
                    />
                  ) : (
                    <field.DateCalendar
                      id={id}
                      onValueChange={(newDate) => {
                        field.handleChange(
                          newDate ? dayjs(newDate).format('YYYY-MM-DD') : null
                        );
                      }}
                      value={dayjs(field.state.value)}
                    />
                  )
                }
                description="Введите дату совершения операции"
                dirty={field.state.meta.isDirty}
                errors={field.state.meta.errors}
                invalid={!field.state.meta.isValid}
                label="Дата операции"
                name={field.name}
                touched={field.state.meta.isTouched}
              />
            );
          }}
        />
        <form.AppField
          name="debitAccount"
          validators={{
            onChange: OperationSchema.shape.debitAccount,
          }}
          children={(field) => {
            return (
              <FormField
                control={({ id }) => (
                  <field.Autocomplete<Account>
                    getValueId={(item) => item.number}
                    id={id}
                    itemToStringValue={(item) => item.name}
                    onValueChange={(accountNumber) =>
                      field.handleChange(accountNumber as AccountNumber | null)
                    }
                    options={MOCK_CHART_OF_ACCOUNT}
                    value={field.state.value}
                  />
                )}
                description="Введите счёт на который были зачислены средства"
                dirty={field.state.meta.isDirty}
                errors={field.state.meta.errors}
                invalid={!field.state.meta.isValid}
                label="Дебет по счёту"
                name={field.name}
                touched={field.state.meta.isTouched}
              />
            );
          }}
        />
        <form.AppField
          name="creditAccount"
          validators={{
            onChange: OperationSchema.shape.creditAccount,
          }}
          children={(field) => {
            return (
              <FormField
                control={({ id }) => (
                  <field.Autocomplete<Account>
                    getValueId={(item) => item.number}
                    id={id}
                    itemToStringValue={(item) => item.name}
                    onValueChange={(accountNumber) =>
                      field.handleChange(accountNumber as AccountNumber | null)
                    }
                    options={MOCK_CHART_OF_ACCOUNT}
                    value={field.state.value}
                  />
                )}
                description="Введите счёт с которого были списаны средства"
                dirty={field.state.meta.isDirty}
                errors={field.state.meta.errors}
                invalid={!field.state.meta.isValid}
                label="Кредит по счёту"
                name={field.name}
                touched={field.state.meta.isTouched}
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
                control={({ id }) => (
                  <field.Number
                    id={id}
                    onValueChange={field.handleChange}
                    value={field.state.value}
                  />
                )}
                description="Введите сумму совершённой операции"
                dirty={field.state.meta.isDirty}
                errors={field.state.meta.errors}
                invalid={!field.state.meta.isValid}
                label="Сумма операции"
                name={field.name}
                touched={field.state.meta.isTouched}
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
                control={({ id }) => (
                  <field.Textarea
                    id={id}
                    onBlur={field.handleBlur}
                    onValueChange={field.handleChange}
                    rows={4}
                    value={field.state.value ?? ''}
                  />
                )}
                description="Введите комментарий в отношении операции"
                dirty={field.state.meta.isDirty}
                errors={field.state.meta.errors}
                invalid={!field.state.meta.isValid}
                label="Комментарий"
                name={field.name}
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
