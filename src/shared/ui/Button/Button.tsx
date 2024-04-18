import { ComponentProps, forwardRef } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './types/Button.types';

const buttonVariants = cva(
  [
    'flex',
    'leading-none',
    'gap-2',
    'items-center',
    'justify-center',
    'outline-none',
    'focus:outline-none',
    'focus-visible:ring-4',
    'transition-all',
    'rounded-md',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-theme-primary-300',
          'text-theme-white',
          'hover:bg-theme-primary-200',
          'active:bg-theme-primary-400',
          'focus-visible:bg-theme-primary-300',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'ring-theme-primary-100',
        ],
        outline: [
          'bg-theme-white',
          'text-theme-black',
          'hover:bg-theme-grey-200',
          'border-2',
          'border-theme-grey-200',
          'active:bg-theme-grey-300',
          'focus-visible:bg-theme-grey-300',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'ring-theme-grey-200',
        ],
        delete: [
          'bg-theme-red-200',
          'text-theme-red-500',
          'hover:bg-theme-red-100',
          'active:bg-theme-red-300',
          'focus-visible:bg-theme-red-200',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'ring-theme-red-400',
        ],
        icon: ['bg-transparent'],
      },
      size: {
        md: ['text-base', 'py-2.5', 'px-6'],
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
      },
    },
    compoundVariants: [{ variant: 'icon', size: 'md', class: 'p-0 h-6 w-6' }],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      width: 'auto',
    },
  },
);

const Button = forwardRef<ComponentProps<'button'>, ButtonProps>(props => {
  const { children, variant, size, width, className, disabled, ref, ...rest } =
    props;

  const classNameGenerated = twMerge(
    buttonVariants({
      variant,
      size,
      width,
    }),
    className,
  );

  return (
    <button
      ref={ref}
      {...rest}
      aria-label="button"
      disabled={disabled}
      className={classNameGenerated}
    >
      {children}
    </button>
  );
});

export { Button, buttonVariants };
