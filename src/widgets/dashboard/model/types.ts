import { ClassNameValue } from 'tailwind-merge';

export type TCardProps = {
  data: string;
  variant: TCardVariant;
  className?: ClassNameValue;
};

export type TCardVariant = 'quantity' | 'sum';
