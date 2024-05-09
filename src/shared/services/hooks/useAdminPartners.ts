import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

interface AdminPartners {
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

export const useAdminPartners = () => {
  const { data, isLoading } = useSWR<AdminPartnersResponse>(
    '/users/register/partner/',
    fetcher,
  );

  return {
    partners: data,
    isLoading,
  };
};
