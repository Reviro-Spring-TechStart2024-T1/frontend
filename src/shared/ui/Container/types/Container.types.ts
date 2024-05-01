import { ComponentProps } from 'react';

export interface ContainerProps extends ComponentProps<'div'> {
  title?: string;
}
