'use client';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/shared';

export const useGetBeverage = <T>(id: string | null) => {
  const { data, isLoading } = useSWRImmutable<T>(
    () => (id ? `/beverages/${id}/` : null),
    fetcher,
  );

  return {
    beverage: data,
    isBeverageLoading: isLoading,
  };
};
