import { SelectOption } from '@/shared/ui/Select/types/Select.types';

export interface PlanArg {
  product_id: string;
  title: String;
  description: String;
  period: SelectOption;
  price: String;
}
