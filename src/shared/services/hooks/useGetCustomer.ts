import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { CustomerResponse } from '../types';

export const useGetCustomer = (id: string | number) => {
  const { data } = useSWR<CustomerResponse>(
    `/orders/partner-customers/${id}`,
    fetcher,
  );

  return {
    customer: data,
  };
};
