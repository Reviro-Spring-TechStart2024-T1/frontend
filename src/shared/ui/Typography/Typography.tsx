import { createElement, FC } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

import { TypographyProps, TypographyTags } from './types/Typography.types';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      paragraph: 'text-base',
      caption: 'text-sm',
      link: 'text-sm hover:underline cursor-pointer',
    },
    color: {
      black: 'text-theme-black',
      grey: 'text-theme-grey-500',
      blue: 'text-theme-blue-300',
      red: 'text-theme-red-500',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    format: {
      normal: 'normal-case',
      capitalize: 'capitalize',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
    },
  },
  defaultVariants: {
    weight: 'regular',
    format: 'normal',
  },
});

const Typography: FC<TypographyProps> = props => {
  const { children, className, variant, color, weight, format, ...rest } =
    props;

  const Tags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    paragraph: 'p',
    caption: 'p',
    link: 'a',
  };

  return createElement(
    Tags[variant as keyof TypographyTags],
    {
      className: twMerge(
        typographyVariants({ variant, weight, color, format }),
        className,
      ),
      ...rest,
    },
    children,
  );
};

export { Typography, typographyVariants };
