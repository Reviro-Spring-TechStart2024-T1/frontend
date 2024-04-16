import { ReactNode } from 'react';
import { ClassNameValue } from 'tailwind-merge';

export interface TypographyProps {
  className?: ClassNameValue;
  variant: TypographyVariants;
  children: ReactNode;
}

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'paragraph'
  | 'caption'
  | 'link';

export interface TypographyTags {
  h1: string;
  h2: string;
  h3: string;
  paragraph: string;
  caption: string;
  link: string;
}
