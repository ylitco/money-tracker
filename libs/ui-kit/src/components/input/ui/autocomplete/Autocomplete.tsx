import {
  Autocomplete as BaseAutocomplete,
  Input,
} from '@base-ui-components/react';
import {
  Autocomplete as ImplAutocomplete,
  type AutocompleteProps as ImplAutocompleteProps,
  TextField,
} from '@mui/material';
import { ElementType, useCallback, useImperativeHandle, useRef } from 'react';
import { InputProps } from '../../models/common-props';

export interface AutocompleteRef {
  focus: () => void;
}

interface AutocompleteProps<ItemType>
  extends Omit<
      BaseAutocomplete.Root.Props<ItemType>,
      'onValueChange' | 'value'
    >,
    Omit<InputProps, 'onValueChange' | 'value'> {
  label?: string;
  onValueChange?: (
    value: string | null,
    eventDetails: BaseAutocomplete.Root.ChangeEventDetails
  ) => void;
  options?: ItemType[];
  getValueId: (item: ItemType) => string;
  ref?: React.Ref<AutocompleteRef>;
  value: BaseAutocomplete.Root.Props<ItemType>['value'] | null;
}

export function Autocomplete<ItemType>({
  autoHighlight,
  disabled,
  getValueId,
  itemToStringValue,
  label,
  name,
  onValueChange,
  options = [],
  ref,
  value,
  ...props
}: AutocompleteProps<ItemType>) {
  const internalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      const input = internalRef.current?.querySelector('input');
      input?.focus();
    },
  }));

  const adaptedAutoHighlight =
    autoHighlight === 'always' ? true : autoHighlight;

  const handleChange = useCallback<
    Exclude<
      ImplAutocompleteProps<
        ItemType,
        false,
        false,
        false,
        ElementType
      >['onChange'],
      undefined
    >
  >(
    (_e, newValue) => {
      onValueChange?.(newValue ? getValueId(newValue) : null, {
        allowPropagation() {
          this.isPropagationAllowed = true;
        },
        cancel() {
          this.isCanceled = true;
        },
        event: new Event('change'),
        isCanceled: false,
        isPropagationAllowed: false,
        reason: 'none',
        trigger: undefined,
      });
    },
    [getValueId, onValueChange]
  );

  return (
    <Input
      disabled={disabled}
      name={name}
      {...props}
      render={() => {
        const selectedOption = value
          ? options.find((o) => getValueId(o) === value)
          : null;

        return (
          <ImplAutocomplete<ItemType>
            autoHighlight={adaptedAutoHighlight}
            disabled={disabled}
            getOptionKey={(option) => getValueId(option) ?? 1}
            getOptionLabel={(option) => itemToStringValue?.(option) || ''}
            id={props.id}
            onChange={handleChange}
            options={options}
            ref={internalRef}
            renderInput={(params) => (
              <TextField {...params} label={label} name={name} />
            )}
            isOptionEqualToValue={(option) =>
              value ? getValueId(option) === value : false
            }
            value={selectedOption ?? null}
          />
        );
      }}
    />
  );
}
