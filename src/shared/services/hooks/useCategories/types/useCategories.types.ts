import { TCategory } from '@/entities/category';

export type TCategoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCategory[];
};

export interface CategoriesProps {
  page: number;
  limit: number;
}
