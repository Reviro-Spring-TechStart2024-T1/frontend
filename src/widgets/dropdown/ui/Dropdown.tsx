import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';

export const Dropdown: FC<ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
}) => {
  return <div className={clsx('dropdown relative', className)}>{children}</div>;
};
