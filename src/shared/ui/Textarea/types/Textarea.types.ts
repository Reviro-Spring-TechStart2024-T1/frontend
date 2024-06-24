import { ComponentProps } from 'react';
import { FormikErrors } from 'formik';

export interface TextareaProps extends ComponentProps<'textarea'> {
  title?: string;
  errors?: FormikErrors<any>;
}
