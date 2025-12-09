import { LocalizationProvider } from '@money-tracker/ui-kit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import 'dayjs/locale/ru';
import { action } from 'storybook/actions';
import { AccountingForm } from './Form';

const withLocalization: Decorator = (Story) => (
  <LocalizationProvider
    adapterLocale="ru"
    dateAdapter={AdapterDayjs}
    localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
  >
    <Story />
  </LocalizationProvider>
);

const meta = {
  component: AccountingForm,
  decorators: [withLocalization],
  title: 'Accounting/Form',
} satisfies Meta<typeof AccountingForm>;
export default meta;

type Story = StoryObj<typeof AccountingForm>;

export const Primary = {
  args: {},
  render: ({ onSubmit, ...args }) => (
    <AccountingForm onSubmit={action('submited')} {...args} />
  ),
} satisfies Story;
