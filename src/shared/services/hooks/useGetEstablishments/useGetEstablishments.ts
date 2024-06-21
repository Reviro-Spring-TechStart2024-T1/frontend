'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { TPartnerEstablishment } from './types';

export const useGetEstablishments = () => {
  const { data, isLoading, error } = useSWR<TPartnerEstablishment>(
    `/establishments/partner/`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    },
  );

  return {
    establishment: data,
    isLoading,
    error,
  };
};
