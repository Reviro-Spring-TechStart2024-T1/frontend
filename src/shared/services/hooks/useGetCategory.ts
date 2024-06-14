'use client';

import useSWRImmutable from 'swr/immutable';

import { TCategory } from '@/entities/category';
import { fetcher } from '@/shared';

export const useGetCategory = (id: number | undefined) => {
  const { data: categoryWithId, isLoading } = useSWRImmutable<TCategory>(
    () => (id ? `/categories/${id}/` : null),
    fetcher,
  );

  return {
    categoryWithId,
    isCategoryLoading: isLoading,
  };
};
