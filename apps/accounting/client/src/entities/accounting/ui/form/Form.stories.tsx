import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { expect, within, userEvent, waitFor, screen } from 'storybook/test';
import { withLocalization } from '~/shared/storybook';
import { AccountingForm } from './Form';
import { formLocale } from './Form.i18n';

const meta = {
  component: AccountingForm,
  decorators: [withLocalization],
  title: 'Accounting/Form',
} satisfies Meta<typeof AccountingForm>;
export default meta;

type Story = StoryObj<typeof AccountingForm>;

export const Primary = {
  name: 'Fill & Submit the Form',
  args: {},
  render: ({ onSubmit, ...args }) => (
    <AccountingForm onSubmit={action('submited')} {...args} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const debitAccountInput = canvas.getByLabelText(formLocale.fields.debitAccount.label);
    const creditAccountInput = canvas.getByLabelText(formLocale.fields.creditAccount.label);
    const amountInput = canvas.getByLabelText(formLocale.fields.amount.label);
    const noteTextarea = canvas.getByLabelText(formLocale.fields.note.label);
    const submitButton = canvas.getByRole('button', { name: formLocale.actions.submit });

    await user.click(debitAccountInput);
    await user.keyboard('Продукты');
    await waitFor(async () => {
      // MUI Autocomplete renders options in a portal, use screen instead of canvas
      const option = await screen.findByText(/Продукты/);
      await user.click(option);
    });

    await user.click(creditAccountInput);
    await user.keyboard('Кред');
    await waitFor(async () => {
      // MUI Autocomplete renders options in a portal, use screen instead of canvas
      const option = await screen.findByText(/Кредитная карта 100 дней без %/);
      await user.click(option);
    });

    await user.click(amountInput);
    await user.keyboard('5000');

    await user.click(noteTextarea);
    await user.keyboard('Оплачены продукты в Пятёрочке');

    await user.click(submitButton);

    await waitFor(() => {
      expect(debitAccountInput).toHaveFocus();
    });
  },
} satisfies Story;
