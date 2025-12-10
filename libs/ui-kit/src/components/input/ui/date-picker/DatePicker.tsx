import { Input } from '@base-ui-components/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  DatePicker as BaseDatePicker,
  DatePickerProps as MuiDatePickerProps,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { useCallback } from 'react';
import { type InputProps } from '../../models/common-props';
import { classNamePropAdapter } from '../../../../lib';

interface DatePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue'>,
    Pick<
      MuiDatePickerProps,
      'value' | 'defaultValue' | 'minDate' | 'maxDate'
    > {}

export function DatePicker({
  className,
  defaultValue,
  disabled,
  maxDate,
  minDate,
  onValueChange,
  value,
  ...props
}: DatePickerProps) {
  const isSmallMobile = useMediaQuery('(max-width: 320px)');
  const adaptedClassName = classNamePropAdapter(className);

  const handleChange = useCallback<
    Exclude<MuiDatePickerProps['onChange'], undefined>
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

  const PickerComponent = isSmallMobile ? MobileDatePicker : BaseDatePicker;

  return (
    <Input
      {...props}
      render={() => {
        return (
          <PickerComponent
            className={adaptedClassName}
            defaultValue={defaultValue}
            disabled={disabled}
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleChange}
            slotProps={{
              textField: {
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
