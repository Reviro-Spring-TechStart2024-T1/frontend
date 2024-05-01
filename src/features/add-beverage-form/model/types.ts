import { TBeverage } from '@/entities/beverage';

export type TFormState = {
  message?: 'success' | 'error' | '' | string;
  errors?: {
    name?: string[];
    category?: string[];
    price?: string[];
    description?: string[];
    image?: string[];
    quantity?: string[];
  };
  fieldValues?: Partial<TBeverage>;
};
