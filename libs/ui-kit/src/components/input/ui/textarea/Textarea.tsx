import { TextField, TextFieldProps } from '@mui/material';
import { classNamePropAdapter, sizePropAdapter } from '../../../../lib';
import { InputProps } from '../../models/common-props';

interface TextareaProps extends InputProps {
  rows?: TextFieldProps['rows'];
}

export function Textarea({ className, size, ...props }: TextareaProps) {
  const adaptedClassName = classNamePropAdapter(className);
  const adaptedSize = sizePropAdapter(size);

  return <TextField className={adaptedClassName} size={adaptedSize} {...props} multiline />;
}
