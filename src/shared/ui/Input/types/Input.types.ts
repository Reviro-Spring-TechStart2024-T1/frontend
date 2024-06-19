import { ComponentProps } from 'react';

type InputTypes = 'text' | 'number' | 'password' | 'email' | 'file' | 'hidden';

export interface InputProps extends ComponentProps<'input'> {
  title?: string;
}
