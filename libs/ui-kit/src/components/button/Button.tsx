import { Button as BaseButton } from '@base-ui-components/react';
import {
  Button as ImplButton,
  ButtonProps as ImplButtonProps,
} from '@mui/material';
import { classNamePropAdapter } from '../../lib';

type ButtonProps = BaseButton.Props & {
  variant: ImplButtonProps['variant'];
};

export function Button({ className, ...props }: ButtonProps) {
  const adaptedClassName = classNamePropAdapter(className);

  return <ImplButton className={adaptedClassName} {...props} />;
}
