import { ReactNode } from 'react';
import { ClassNameValue } from 'tailwind-merge';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'paragraph'
  | 'caption'
  | 'link';

export type TypographyFormats = 'capitalize' | 'uppercase';
export interface TypographyProps {
  children: ReactNode;
  variant: TypographyVariants;
  className?: ClassNameValue;
  format?: TypographyFormats;
}

export interface TypographyTags {
  h1: string;
  h2: string;
  h3: string;
  paragraph: string;
  caption: string;
  link: string;
}
