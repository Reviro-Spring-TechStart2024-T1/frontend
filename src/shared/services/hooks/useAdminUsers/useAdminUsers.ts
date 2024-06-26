'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/lib';

import { AdminUsersProps, AdminUsersResponse } from './types';

export const useAdminUsers = ({ page, limit }: AdminUsersProps) => {
  const offset = (page - 1) * limit;

  const { data: userData, isLoading } = useSWR<AdminUsersResponse>(
    `/users/?offset=${offset}&limit=${limit}`,
    fetcher,
    { keepPreviousData: true },
  );

  useSWR(`/users/?offset=${offset + limit}&limit=${limit}`, fetcher);

  const data = {
    ...userData,
    pages: userData && Math.ceil(userData.count / limit),
    results: userData?.results.toSorted((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;

      return 0;
    }),
  };

  return {
    data,
    isLoading,
  };
};
