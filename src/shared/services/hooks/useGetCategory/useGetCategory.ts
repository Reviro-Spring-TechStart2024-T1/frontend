'use client';

import useSWRImmutable from 'swr/immutable';

import { TCategory } from '@/entities/category';
import { fetcher } from '@/shared';

import { CategoryProps } from './types';

export const useGetCategory = ({ id }: CategoryProps) => {
  const { data: categoryWithId, isLoading } = useSWRImmutable<TCategory>(
    () => (id ? `/categories/${id}/` : null),
    fetcher,
  );

  return {
    categoryWithId,
    isCategoryLoading: isLoading,
  };
};
