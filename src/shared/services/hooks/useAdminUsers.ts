import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

export interface AdminUsers {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'partner';
  sex: string;
  date_of_birth: string;
}

export interface AdminUsersResponse {
  count: number;
  next: string;
  previous: string;
  results: AdminUsers[];
}

export const useAdminUsers = (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const { data: userData, isLoading } = useSWR<AdminUsersResponse>(
    `/users/?offset=${offset}&limit=${limit}`,
    fetcher,
  );

  useSWR(`/users/?offset=${offset + limit}&limit=${limit}`, fetcher);

  const data = {
    ...userData,
    pages: userData && Math.ceil(userData.count / limit),
  };

  return {
    data,
    isLoading,
  };
};
