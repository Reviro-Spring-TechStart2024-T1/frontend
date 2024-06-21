'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { CustomersProps, CustomersResponse } from './types';

export const useGetCustomers = ({
  establishmentId,
  page,
  limit,
  search = '',
}: CustomersProps) => {
  const offset = (page - 1) * limit;

  const { data: customersData, isLoading } = useSWR<CustomersResponse>(
    () =>
      establishmentId
        ? `/orders/partners-customers/${establishmentId}/?offset=${offset}&limit=${limit}&search=${search}`
        : null,
    fetcher,
    { keepPreviousData: true },
  );

  useSWR(
    `/orders/partners-customers/?offset=${offset + limit}&limit=${limit}&search=${search}`,
    fetcher,
  );

  const data = {
    ...customersData,
    pages: customersData && Math.ceil(customersData.count / limit),
  };

  return {
    data,
    isLoading,
  };
};
