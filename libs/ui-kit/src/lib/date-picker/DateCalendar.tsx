import {
  type DateCalendarProps,
  DateCalendar as BaseDateCalendar,
} from '@mui/x-date-pickers';

export function DateCalendar(props: DateCalendarProps) {
  return <BaseDateCalendar {...props} />;
}
