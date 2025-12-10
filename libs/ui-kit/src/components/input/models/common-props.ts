import { Input } from '@base-ui-components/react';
import { ReactNode } from 'react';

export interface InputProps extends Input.Props {
  label?: ReactNode;
}
