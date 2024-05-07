'use client';

import useSWR from 'swr';

import { testFetcher } from '@/shared/helper/testFetcher';

import { UsersResponse } from '../types';

export const useUsers = (page: number) => {
  const limit = 10;

  const { data, isLoading } = useSWR<UsersResponse>(
    `/users?_page=${page}&_per_page=${limit}`,
    testFetcher,
  );

  useSWR<UsersResponse>(
    `/users?_page=${page + 1}&_per_page=${limit}`,
    testFetcher,
  );

  return {
    data,
    isLoading,
  };
};
