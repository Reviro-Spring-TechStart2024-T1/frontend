import { TBeverage } from '@/entities/beverage';

export type TMenusResponse = {
  id: number;
  establishment: number;
  created_at: string;
  updated_at: string;
  beverages: TBeverage[];

  detail?: string;
};
