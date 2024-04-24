import { createElement, FC } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

import { TypographyProps, TypographyTags } from './types/Typography.types';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl',
      h2: 'text-4xl',
      h3: 'text-3xl',
      h4: 'text-2xl',
      h5: 'text-xl',
      paragraph: 'text-base',
      caption: 'text-sm',
      link: 'text-base',
    },
    color: {
      black: 'text-theme-black',
      grey: 'text-theme-grey-500',
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
    caption: 'span',
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
