'use client';

import useSWR from 'swr';

import { testFetcher } from '@/shared/helper/testFetcher';

import { OrderHistoryResponse } from '../types';

export const useOrderHistory = (page: number) => {
  const limit = 10;

  const { data, isLoading } = useSWR<OrderHistoryResponse[]>(
    `/order_history?_page=${page}&_limit=${limit}`,
    testFetcher,
  );

  useSWR(`/order_history?_page=${page + 1}&_limit=${limit}`, testFetcher);

  return {
    order_history: data,
    isLoading,
  };
};
