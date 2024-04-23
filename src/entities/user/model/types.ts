import { TFilters } from '@/features/filter-users';

export type TUser = {
  id: number;
  name: string;
  email: string;
  phone: number;
};

export type TFiltersList = {
  isActive: boolean;
  setFilter: (filter: TFilters) => void;
};
