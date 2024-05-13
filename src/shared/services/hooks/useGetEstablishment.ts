'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';

export const useGetEstablishment = () => {
  const [establishmentId] = useLocalStorage('establishment_id', null);

  const { data } = useSWR(`/establishments/${establishmentId}`, fetcher);

  return {
    establishment: data,
  };
};
