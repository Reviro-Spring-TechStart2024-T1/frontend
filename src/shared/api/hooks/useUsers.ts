import useSWR from 'swr';

import { fetcher } from '@/shared';

import { UsersResponse } from '../types';

export const useUsers = (page: number) => {
  const limit = 10;

  const { data, isLoading } = useSWR<UsersResponse>(
    `/users?_page=${page}&_per_page=${limit}`,
    fetcher,
  );

  useSWR<UsersResponse>(`/users?_page=${page + 1}&_per_page=${limit}`, fetcher);

  return {
    users: data,
    isLoading,
  };
};
