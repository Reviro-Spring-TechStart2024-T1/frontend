import { TBeverage } from '@/entities/beverage';

export type TForm = {
  isActive: boolean;
  closeModal: () => void;
};

export type TFormState = {
  message?: 'success' | 'error' | '' | string | undefined;
  errors?: string | string[];
  fieldValues?: Partial<TBeverage>;
};
