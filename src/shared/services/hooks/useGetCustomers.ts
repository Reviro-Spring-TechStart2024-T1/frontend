'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { CustomersResponse } from '../types';

export const useGetCustomers = (page: number, limit: number, search = '') => {
  const offset = (page - 1) * limit;

  const { data: customersData, isLoading } = useSWR<CustomersResponse>(
    `/orders/partner-customers/?offset=${offset}&limit=${limit}&search=${search}`,
    fetcher,
    { keepPreviousData: true },
  );

  useSWR(
    `/orders/partner-customers/?offset=${offset + limit}&limit=${limit}&search=${search}`,
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
