'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import { TOrdersResponse } from '@/shared/services';

export const useGetOrders = (
  page: number,
  limit: number,
  search = '',
  beverage_name = '',
  status = '',
  time = '',
) => {
  const offset = (page - 1) * limit;

  const { data: orderData } = useSWR<TOrdersResponse>(
    `/orders/partners/?offset=${offset}&limit=${limit}&id=${search}&beverage__name=${beverage_name}&status=${status}&time=${time}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  const data = {
    ...orderData,
    pages: orderData && Math.ceil(orderData.count / limit),
  };

  return {
    data,
  };
};
