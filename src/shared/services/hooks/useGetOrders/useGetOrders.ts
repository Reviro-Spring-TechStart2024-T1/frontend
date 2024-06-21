'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';

import { OrdersProps, TOrdersResponse } from './types';

export const useGetOrders = ({
  establishmentId,
  page,
  limit,
  search = '',
  beverage_name = '',
  status = '',
  time = '',
}: OrdersProps) => {
  const offset = (page - 1) * limit;

  const { data: orderData, isLoading } = useSWR<TOrdersResponse>(
    () =>
      establishmentId
        ? `/orders/partners/establishments/${establishmentId}/?offset=${offset}&limit=${limit}&id=${search}&beverage__name=${beverage_name}&status=${status}&time=${time}`
        : null,
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
    isLoading,
  };
};
