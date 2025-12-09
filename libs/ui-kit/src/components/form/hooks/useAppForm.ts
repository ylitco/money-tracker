import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Autocomplete, Number, Textarea } from '../../input/ui';
import { DateCalendar, DatePicker } from '../../../lib/date-picker';
import { Button } from '../../button';

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Autocomplete,
    DateCalendar,
    DatePicker,
    Number,
    Textarea,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export default useAppForm;
