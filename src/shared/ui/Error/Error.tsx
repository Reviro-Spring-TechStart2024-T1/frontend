import { ComponentPropsWithoutRef, FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const Error: FC<ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
}) => <div className={twMerge(' text-red-300', className)}>{children}</div>;
