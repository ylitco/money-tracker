/**
 * MUI's standard color palette used across the component system
 */
type MuiColor = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const colorMap: Record<string, MuiColor> = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
};

export function colorPropAdapter(
  color?: string
): MuiColor | undefined {
  if (!color) return undefined;

  return color in colorMap ? colorMap[color] : undefined;
}
