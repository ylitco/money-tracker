import useMediaQuery from '@mui/material/useMediaQuery';
import {
  type DatePickerProps,
  DatePicker as BaseDatePicker,
  MobileDatePicker,
} from '@mui/x-date-pickers';

export function DatePicker(props: DatePickerProps) {
  const isSmallMobile = useMediaQuery('(max-width: 320px)');

  return isSmallMobile ? (
    <MobileDatePicker {...props} />
  ) : (
    <BaseDatePicker {...props} />
  );
}
