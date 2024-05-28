import { ClassNameValue } from 'tailwind-merge';

export type TCardProps = {
  data: number;
  variant: TCardVariant;
  className?: ClassNameValue;
};

export type TCardVariant = 'quantity' | 'sum';
