import { TFilters } from '@/features/filter-users';

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  joinedAt: string;
  email: string;
  phone: number;
};

export type TFiltersList = {
  isActive: boolean;
  setFilter: (filter: TFilters) => void;
};
