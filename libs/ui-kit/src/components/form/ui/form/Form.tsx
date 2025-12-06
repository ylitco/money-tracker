import { Form as BaseForm } from '@base-ui-components/react';
import clsx from 'clsx';
import { classNamePropAdapter } from '../../../../lib';
import classes from './Form.module.scss';

export function Form({ children, className, ...props }: BaseForm.Props) {
  const adaptedClassName = classNamePropAdapter(className);

  return (
    <BaseForm className={clsx(classes.form, adaptedClassName)} {...props}>
      {children}
    </BaseForm>
  );
}
