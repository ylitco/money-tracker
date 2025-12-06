import { NumberField } from '@base-ui-components/react/number-field';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { sizePropAdapter } from '../../../../lib';
import { InputProps } from '../../models/common-props';

type NumberProps = NumberField.Root.Props & InputProps;

export function Number({ id, label, size, ...props }: NumberProps) {
  const adaptedSize = sizePropAdapter(size);

  return (
    <NumberField.Root {...props}>
      {!!label && label}
      <NumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: props,
            }}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  flexDirection: 'column',
                  maxHeight: 'unset',
                  alignSelf: 'stretch',
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                  ml: 0,
                  '& button': {
                    py: 0,
                    flex: 1,
                    borderRadius: 0.5,
                  },
                }}
              >
                <NumberField.Increment
                  render={
                    <IconButton size={adaptedSize} aria-label="Increase" />
                  }
                >
                  <KeyboardArrowUpIcon
                    fontSize={adaptedSize}
                    sx={{ transform: 'translateY(2px)' }}
                  />
                </NumberField.Increment>

                <NumberField.Decrement
                  render={
                    <IconButton size={adaptedSize} aria-label="Decrease" />
                  }
                >
                  <KeyboardArrowDownIcon
                    fontSize={adaptedSize}
                    sx={{ transform: 'translateY(-2px)' }}
                  />
                </NumberField.Decrement>
              </InputAdornment>
            }
            sx={{ pr: 0, width: '100%' }}
          />
        )}
      />
    </NumberField.Root>
  );
}
