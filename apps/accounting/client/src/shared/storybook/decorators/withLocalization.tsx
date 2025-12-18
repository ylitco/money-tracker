import { LocalizationProvider } from '@money-tracker/ui-kit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import type { Decorator } from '@storybook/react-vite';
import 'dayjs/locale/ru';

export const withLocalization: Decorator = (Story) => (
  <LocalizationProvider
    adapterLocale="ru"
    dateAdapter={AdapterDayjs}
    localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
  >
    <Story />
  </LocalizationProvider>
);
