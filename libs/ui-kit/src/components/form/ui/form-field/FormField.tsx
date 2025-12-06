import { Field } from '@base-ui-components/react';
import { FormControl, FormHelperText, FormLabel } from '@mui/material';

type FormFieldProps = Field.Root.Props & {
  description?: string;
  errors?: string[] | null;
  label?: string;
};

export function FormField({
  description,
  errors,
  label,
  render,
  ...props
}: FormFieldProps) {
  return (
    <Field.Root render={<FormControl />}>
      {!!label && <Field.Label render={<FormLabel />}>{label}</Field.Label>}
      <Field.Control render={render} />
      {!!description && (
        <Field.Description render={<FormHelperText />}>
          {description}
        </Field.Description>
      )}
      {Array.isArray(errors) && (
        <Field.Error match={true}>{errors?.join(', ')}</Field.Error>
      )}
    </Field.Root>
  );
}
