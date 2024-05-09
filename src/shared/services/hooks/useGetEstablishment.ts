'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

export const useGetEstablishment = () => {
  const id =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('establishment_id')
      : false;

  const { data } = useSWR(`/establishments/${id}`, fetcher);

  return {
    establishment: data,
  };
};
