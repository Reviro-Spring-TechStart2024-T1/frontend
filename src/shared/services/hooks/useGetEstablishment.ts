'use client';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/shared/helper';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';

export const useGetEstablishment = () => {
  const [establishmentId] = useLocalStorage('establishment_id', null);

  const { data } = useSWRImmutable(
    `/establishments/${establishmentId}`,
    fetcher,
  );

  return {
    establishment: data,
  };
};
