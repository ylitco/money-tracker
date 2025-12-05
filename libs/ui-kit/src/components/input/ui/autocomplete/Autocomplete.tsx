import { Autocomplete as BaseAutocomplete } from '@base-ui-components/react';
import { Autocomplete as ImplAutocomplete, TextField } from '@mui/material';

interface AutocompleteProps<ItemType>
  extends BaseAutocomplete.Root.Props<ItemType> {
  label?: string;
  options?: ItemType[];
}

export function Autocomplete<ItemType>({
  autoHighlight,
  label,
  options = [],
  ...props
}: AutocompleteProps<ItemType>) {
  let opts: string[] = [];

  if (isStringArray(options)) {
    opts = options;
  } else {
    assertPropMethod(props, 'itemToStringValue');

    opts = options.map((o) => props.itemToStringValue(o));
  }

  const adaptedAutoHighlight =
    autoHighlight === 'always' ? true : autoHighlight;

  return (
    <ImplAutocomplete
      autoHighlight={adaptedAutoHighlight}
      options={opts}
      renderInput={(params) => <TextField {...params} label={label} />}
      {...props}
    />
  );
}

function isStringArray(value: unknown[]): value is string[] {
  return value.every((item) => typeof item === 'string');
}

function assertPropMethod<PropObject, PropKey extends keyof PropObject>(
  propObject: PropObject,
  propKey: PropKey
): asserts propObject is PropObject &
  Record<PropKey, NonNullable<PropObject[PropKey]>> {
  if (!propObject[propKey]) {
    throw new Error(`${String(propKey)} is required`);
  }
}
