import { SelectOption } from '@/shared/ui/Select/types/Select.types';

export interface PlanArg {
  title: string;
  description: string;
  period: SelectOption | null;
  price: number;
  days: number;
}
