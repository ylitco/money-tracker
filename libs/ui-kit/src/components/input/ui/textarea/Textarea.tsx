import { Input } from '@base-ui-components/react';
import { TextField, TextFieldProps } from '@mui/material';
import { classNamePropAdapter } from '../../../../lib';

interface TextareaProps extends Input.Props {
  label?: string;
  rows?: TextFieldProps['rows'];
}

const sizeMap: Record<number, TextFieldProps['size']> = {
  0: 'small',
  1: 'medium',
}

export function Textarea({ className, size, ...props }: TextareaProps) {
  const adaptedClassName = classNamePropAdapter(className);
  const adaptedSize = size ? sizeMap[size] : 'medium';

  return <TextField className={adaptedClassName} size={adaptedSize} {...props} multiline />;
}
