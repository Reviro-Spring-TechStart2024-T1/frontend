import { ReactNode } from 'react';
import { ClassNameValue } from 'tailwind-merge';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'paragraph'
  | 'caption'
  | 'link';

export type TypographyFormats = 'capitalize' | 'uppercase';

export type TypographyWeights = 'regular' | 'medium' | 'semibold' | 'bold';
export interface TypographyProps {
  children: ReactNode;
  variant: TypographyVariants;
  className?: ClassNameValue;
  weight?: TypographyWeights;
  format?: TypographyFormats;
}

export interface TypographyTags {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  paragraph: string;
  caption: string;
  link: string;
}
