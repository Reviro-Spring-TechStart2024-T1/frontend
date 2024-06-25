import { ComponentPropsWithoutRef, FC } from 'react';

import { Typography } from '../Typography';

export const Error: FC<ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
}) => (
  <Typography variant="caption" color="red" className={className}>
    {children}
  </Typography>
);
