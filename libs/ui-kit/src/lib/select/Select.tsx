import type { Select as BaseSelect } from '@base-ui-components/react';
import { Select as ImplSelect } from '@mui/material';

export function Select<Value>(props: BaseSelect.Root.Props<Value>) {
  return <ImplSelect {...props} />;
}
