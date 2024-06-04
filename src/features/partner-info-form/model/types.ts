import { MutableRefObject } from 'react';
import { FieldProps } from 'formik';

export type TFormValues = {
  name: string;
  description: string;
  email: string;
  street_name: string;
  street_number: string;
  phone_number: string;
  latitude: string;
  longitude: string;
  happy_hour_start: string;
  happy_hour_end: string;
  logo: File | null;
};

export type InputTypes =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'hidden'
  | 'file';

export type ExtendedFieldProps = FieldProps & {
  type: InputTypes;
  placeholder?: string;
  className?: string;
  ref?: MutableRefObject<HTMLInputElement | null>;
  value?: string;
  onClick?: () => void;
};
