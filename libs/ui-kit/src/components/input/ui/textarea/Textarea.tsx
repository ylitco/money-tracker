import { Input } from '@base-ui-components/react';
import { TextField, type TextFieldProps } from '@mui/material';
import { type ChangeEventHandler, useCallback } from 'react';
import { classNamePropAdapter, sizePropAdapter } from '../../../../lib';
import { InputProps } from '../../models/common-props';

interface TextareaProps extends InputProps {
  rows?: TextFieldProps['rows'];
}

export function Textarea({
  className,
  onValueChange,
  size,
  ...props
}: TextareaProps) {
  const adaptedClassName = classNamePropAdapter(className);
  const adaptedSize = sizePropAdapter(size);

  const handleChange = useCallback<
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(
    (e) => {
      onValueChange?.(e.target.value, {
        reason: 'none',
        event: e.nativeEvent,
        cancel() {
          this.isCanceled = true;
        },
        allowPropagation() {
          this.isPropagationAllowed = true;
        },
        isCanceled: false,
        isPropagationAllowed: false,
        trigger: e.target,
      });
    },
    [onValueChange]
  );

  return (
    <Input
      {...props}
      render={() => {
        return (
          <TextField
            className={adaptedClassName}
            id={props.id}
            multiline
            onChange={handleChange}
            size={adaptedSize}
            value={props.value}
            rows={props.rows}
          />
        );
      }}
    />
  );
}
