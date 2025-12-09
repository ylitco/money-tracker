import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Autocomplete, DateCalendar, Number, Textarea } from '../../input/ui';
import { DatePicker } from '../../../lib/date-picker';
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
