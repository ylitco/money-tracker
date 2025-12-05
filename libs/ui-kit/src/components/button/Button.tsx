import { Button as BaseButton } from '@base-ui-components/react';
import {
  Button as ImplButton,
  ButtonProps as ImplButtonProps,
} from '@mui/material';

type ButtonProps = BaseButton.Props & {
  variant: ImplButtonProps['variant'];
};

export function Button({ className, ...props }: ButtonProps) {
  const adaptedClassName =
    typeof className === 'function'
      ? className({} as BaseButton.State)
      : className;

  return <ImplButton className={adaptedClassName} {...props} />;
}
