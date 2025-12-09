import { Input } from '@base-ui-components/react';
import {
  DateCalendar as MuiDateCalendar,
  DateCalendarProps as MuiDateCalendarProps,
} from '@mui/x-date-pickers';
import { useCallback } from 'react';
import { type InputProps } from '../../models/common-props';
import { classNamePropAdapter } from '../../../../lib';

interface DateCalendarProps
  extends Omit<InputProps, 'value' | 'defaultValue'>,
    Pick<
      MuiDateCalendarProps,
      'value' | 'defaultValue' | 'minDate' | 'maxDate'
    > {}

export function DateCalendar({
  className,
  defaultValue,
  disabled,
  maxDate,
  minDate,
  onValueChange,
  value,
  ...props
}: DateCalendarProps) {
  const adaptedClassName = classNamePropAdapter(className);
  const handleChange = useCallback<
    Exclude<MuiDateCalendarProps['onChange'], undefined>
  >(
    (newValue) => {
      onValueChange?.(newValue, {
        allowPropagation() {
          this.isPropagationAllowed = true;
        },
        cancel() {
          this.isCanceled = true;
        },
        event: new Event('change'),
        isCanceled: false,
        isPropagationAllowed: false,
        reason: 'none',
        trigger: undefined,
      });
    },
    [onValueChange]
  );

  return (
    <Input
      {...props}
      render={() => {
        return (
          <MuiDateCalendar
            className={adaptedClassName}
            defaultValue={defaultValue}
            disabled={disabled}
            maxDate={maxDate}
            minDate={minDate}
            onChange={(e) => handleChange(e)}
            slotProps={{
              day: {
                id: props.id,
              },
            }}
            value={value}
          />
        );
      }}
    />
  );
}
