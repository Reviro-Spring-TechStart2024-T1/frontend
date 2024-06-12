'use client';

import useSWRImmutable from 'swr/immutable';

import { fetcher, TPartnerEstablishment } from '@/shared';

export const useGetEstablishments = () => {
  const { data, isLoading, error } = useSWRImmutable<TPartnerEstablishment>(
    `/establishments/partner/`,
    fetcher,
  );

  return {
    establishment: data,
    isLoading,
    error,
  };
};
