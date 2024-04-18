import { createElement, FC } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

import { TypographyProps, TypographyTags } from './types/Typography.types';

const typographyVariants = cva('text-black', {
  variants: {
    variant: {
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      paragraph: 'text-base',
      caption: 'text-sm',
      link: 'text-base',
    },
    format: {
      normal: 'normal-case',
      capitalize: 'capitalize',
      uppercase: 'uppercase',
    },
  },
  defaultVariants: {
    format: 'normal',
  },
});

const Typography: FC<TypographyProps> = props => {
  const { children, className, variant, format, ...rest } = props;

  const Tags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    paragraph: 'p',
    caption: 'span',
    link: 'a',
  };

  return createElement(
    Tags[variant as keyof TypographyTags],
    {
      className: twMerge(typographyVariants({ variant, format }), className),
      ...rest,
    },
    children,
  );
};

export { Typography, typographyVariants };
