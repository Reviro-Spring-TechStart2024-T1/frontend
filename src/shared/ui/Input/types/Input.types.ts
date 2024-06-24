import { ComponentProps } from 'react';
import { FormikErrors } from 'formik';

export interface InputProps extends ComponentProps<'input'> {
  title?: string;
  errors?: FormikErrors<any>;
}
