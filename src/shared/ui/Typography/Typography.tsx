import { createElement } from 'react';
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
  },
});

function Typography({
  className,
  variant,
  children,
  ...props
}: TypographyProps) {
  const classNameGenerated = twMerge(
    typographyVariants({ variant, className }),
  );

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
    { className: classNameGenerated, ...props },
    children,
  );
}

export { Typography, typographyVariants };
