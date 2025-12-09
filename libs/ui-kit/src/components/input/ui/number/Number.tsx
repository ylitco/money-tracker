import { NumberField } from '@base-ui-components/react/number-field';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type NumberProps = NumberField.Root.Props;

export function Number({ id, ...props }: NumberProps) {
  return (
    <NumberField.Root {...props}>
      <NumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
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
                  render={<IconButton size="medium" aria-label="Increase" />}
                >
                  <KeyboardArrowUpIcon
                    fontSize="medium"
                    sx={{ transform: 'translateY(2px)' }}
                  />
                </NumberField.Increment>

                <NumberField.Decrement
                  render={<IconButton size="medium" aria-label="Decrease" />}
                >
                  <KeyboardArrowDownIcon
                    fontSize="medium"
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
