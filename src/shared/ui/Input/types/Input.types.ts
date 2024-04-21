import { ComponentProps } from 'react';

type InputTypes = 'text' | 'number' | 'password' | 'email' | 'file';

export interface InputProps extends ComponentProps<'input'> {
  type?: InputTypes;
}
