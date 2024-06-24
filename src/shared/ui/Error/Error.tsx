import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

export const Error: FC<ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
}) => (
  <Typography
    variant="caption"
    color="red"
    className={twMerge('absolute', className)}
  >
    {children}
  </Typography>
);
