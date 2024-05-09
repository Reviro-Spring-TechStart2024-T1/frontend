'use client';

import useSWR from 'swr';

import { testFetcher } from '@/shared/helper/testFetcher';

import { UsersResponse } from '../types';

export const useUsers = (page: number, search?: string) => {
  const limit = 10;

  const { data, isLoading } = useSWR<UsersResponse[]>(
    `/users?_page=${page}&_limit=${limit}&q=${search}`,
    testFetcher,
  );

  useSWR<UsersResponse>(
    `/users?_page=${page + 1}&_limit=${limit}`,
    testFetcher,
  );

  return {
    users: data,
    isLoading,
  };
};
