'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import { TCategoriesResponse } from '@/shared/services';

export const useCategories = (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const { data: categoryData, isLoading } = useSWR<TCategoriesResponse>(
    `/categories/?offset=${offset}&limit=${limit}`,
    fetcher,
    {
      refreshInterval: 20000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  useSWR(`/categories/?offset=${offset + limit}&limit=${limit}`, fetcher);

  const data = {
    ...categoryData,
    pages: categoryData && Math.ceil(categoryData.count / limit),
  };

  return {
    data,
    isLoading,
  };
};
