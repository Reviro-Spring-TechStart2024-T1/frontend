'use client';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/shared';

import { BeverageProps } from './types';

export const useGetBeverage = <T>({ id }: BeverageProps) => {
  const { data, isLoading } = useSWRImmutable<T>(
    () => (id ? `/beverages/${id}/` : null),
    fetcher,
  );

  return {
    beverage: data,
    isBeverageLoading: isLoading,
  };
};
