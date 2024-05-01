import { TBeverage } from '@/entities/beverage';

export type TFormState = {
  message?: 'success' | 'error' | '' | string;
  errors?: {
    name?: string[];
    category?: string[];
    price?: string[];
    desc?: string[];
    image?: string[];
    quantity?: string[];
  };
  errorMessage?: string;
  fieldValues?: Partial<TBeverage>;
};
