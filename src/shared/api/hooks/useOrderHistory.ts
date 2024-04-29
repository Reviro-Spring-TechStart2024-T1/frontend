import useSWR from 'swr';

import { fetcher } from '@/shared';

import { OrderHistoryResponse } from '../types';

export const useOrderHistory = (page: number, limit: number) => {
  const { data, isLoading } = useSWR<OrderHistoryResponse>(
    `/order_history?_page=${page}&_per_page=${limit}`,
    fetcher,
  );

  useSWR<OrderHistoryResponse>(
    `/order_history?_page=${page + 1}&_per_page=${limit}`,
    fetcher,
  );

  return {
    order_history: data,
    isLoading,
  };
};
