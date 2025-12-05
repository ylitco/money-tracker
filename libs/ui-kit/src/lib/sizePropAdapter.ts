import { TextFieldProps } from '@mui/material';

const sizeMap: Record<number, TextFieldProps['size']> = {
  0: 'small',
  1: 'medium',
};

export function sizePropAdapter(size?: number): 'small' | 'medium' {
  return size && size in sizeMap ? sizeMap[size] ?? 'medium' : 'medium';
}
