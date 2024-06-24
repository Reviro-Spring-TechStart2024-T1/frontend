import { SelectOption } from '@/shared/ui/Select/types/Select.types';

export interface FormValues {
  title: string;
  description: string;
  period: SelectOption | null;
  price: number | null;
  days: number | null;
}
