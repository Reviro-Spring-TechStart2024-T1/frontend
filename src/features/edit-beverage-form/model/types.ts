import { TBeverage } from '@/entities/beverage';

export type TFormState = {
  message?: 'success' | 'error' | '' | string | undefined;
  errors?: {
    name?: string[] | undefined;
    category?: string[] | undefined;
    price?: string[] | undefined;
    desc?: string[] | undefined;
    image?: string[] | undefined;
    quantity?: string[] | undefined;
  };
  errorMessage?: string;
  fieldValues?: Partial<TBeverage>;
};
