import { MutableRefObject } from 'react';
import { FieldProps } from 'formik';

export type TFormProps = {
  isActive?: boolean;
  setModalState: (bool: boolean) => void;
};

export type ExtendedFieldProps = FieldProps & {
  type: InputTypes;
  placeholder?: string;
  className?: string;
  ref?: MutableRefObject<HTMLInputElement | null>;
  value?: string;
  onClick?: () => void;
};

export type InputTypes =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'hidden'
  | 'file';
