import { ComponentProps } from 'react';

export interface ContainerProps extends ComponentProps<'html'> {
  title?: string;
}
