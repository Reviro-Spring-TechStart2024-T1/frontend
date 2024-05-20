import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

export interface AdminPartners {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'partner';
  sex: string;
  date_of_birth: string;
}

export interface AdminPartnersResponse {
  count: number;
  next: string;
  previous: string;
  results: AdminPartners[];
}

export const useAdminPartners = (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const { data: partnerData, isLoading } = useSWR<AdminPartnersResponse>(
    `/users/register/partner/?offset=${offset}&limit=${limit}`,
    fetcher,
    { keepPreviousData: true },
  );

  useSWR(
    `/users/register/partner/?offset=${offset + limit}&limit=${limit}`,
    fetcher,
  );

  const data = {
    ...partnerData,
    pages: partnerData && Math.ceil(partnerData.count / limit),
  };

  return {
    data,
    isLoading,
  };
};
