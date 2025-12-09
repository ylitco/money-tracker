import { Field } from '@base-ui-components/react';
import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import { useId, useMemo, type ReactElement } from 'react';
import { classNamePropAdapter, colorPropAdapter } from '../../../../lib';

type ControlRenderFunction = Exclude<
  Field.Control.Props['render'],
  ReactElement | undefined
>;

type FormFieldProps = Omit<Field.Root.Props, 'render'> & {
  control: ControlRenderFunction;
  description?: string;
  errors?: Array<string | { message: string } | unknown> | null;
  label?: string;
};

export function FormField({
  control,
  description,
  errors,
  label,
  ...props
}: FormFieldProps) {
  const id = useId();
  const errorMessages = useMemo(
    () =>
      Array.isArray(errors)
        ? errors
            .map((error) => {
              if (typeof error === 'string') return error;
              if (error && typeof error === 'object' && 'message' in error) {
                return String(error.message);
              }
              return String(error);
            })
            .filter(Boolean)
        : [],
    [errors]
  );

  return (
    <Field.Root
      render={({ color, ...rootProps }) => {
        const adaptedColor = colorPropAdapter(color);

        return <FormControl color={adaptedColor} {...rootProps} />;
      }}
      {...props}
    >
      {!!label && (
        <Field.Label
          render={({ className, color, ...props }) => {
            const adaptedClassName = classNamePropAdapter(className);
            const adaptedColor = colorPropAdapter(color);

            return (
              <FormLabel
                className={adaptedClassName}
                color={adaptedColor}
                {...props}
              />
            );
          }}
        >
          {label}
        </Field.Label>
      )}
      <Field.Control id={id} render={control} />
      {!!description && (
        <Field.Description render={(props) => <FormHelperText {...props} />}>
          {description}
        </Field.Description>
      )}
      {errorMessages.length > 0 && (
        <Field.Error
          match={true}
          render={(props) => {
            return <FormHelperText error {...props} />;
          }}
        >
          {errorMessages.join(', ')}
        </Field.Error>
      )}
    </Field.Root>
  );
}
