import { Autocomplete as BaseAutocomplete } from '@base-ui-components/react';
import { Autocomplete as ImplAutocomplete, TextField } from '@mui/material';

interface AutocompleteProps<ItemType>
  extends BaseAutocomplete.Root.Props<ItemType> {
  label?: string;
  options?: ItemType[];
}

export function Autocomplete<ItemType>({
  autoHighlight,
  itemToStringValue,
  label,
  options = [],
  ...props
}: AutocompleteProps<ItemType>) {
  let opts: string[] = [];

  if (isStringArray(options)) {
    opts = options;
  } else {
    assertFunction(itemToStringValue, 'itemToStringValue');

    opts = options.map((o) => itemToStringValue(o));
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

function assertFunction<ArgType>(
  func: ((arg: ArgType) => string) | undefined,
  name: string
): asserts func is (arg: ArgType) => string {
  if (!func) throw new Error(`${name} is required`);
}
