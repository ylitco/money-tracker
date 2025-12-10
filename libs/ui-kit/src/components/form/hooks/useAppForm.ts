import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import {
  Autocomplete,
  DateCalendar,
  DatePicker,
  Number,
  Textarea,
} from '../../input/ui';
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
