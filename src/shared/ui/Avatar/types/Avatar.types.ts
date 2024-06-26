import { ComponentProps } from 'react';

export interface AvatarProps extends ComponentProps<'div'> {
  avatar?: string;
  alt: string;
  name?: string;
  isAdmin?: boolean;
}
