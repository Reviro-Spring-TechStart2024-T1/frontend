import useSWR from 'swr';

import { fetcher } from '@/shared';

import { OrderHistoryResponse } from '../types';

export const useOrderHistory = (page: number, per_page: number) => {
  const { data, isLoading } = useSWR<OrderHistoryResponse>(
    `/order_history?_page=${page}&_per_page=${per_page}`,
    fetcher,
  );

  return {
    order_history: data,
    isLoading,
  };
};
