'use client';

import { useMemo } from 'react';
import useSWR from 'swr';

import { fetcher } from '@/shared';

import { CategoriesProps, TCategoriesResponse } from './types';

export const useCategories = ({ page, limit }: CategoriesProps) => {
  const offset = (page - 1) * limit;

  const { data: categoryData, isLoading } = useSWR<TCategoriesResponse>(
    `/categories/?offset=${offset}&limit=${limit}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  useSWR(`/categories/?offset=${offset + limit}&limit=${limit}`, fetcher, {
    keepPreviousData: true,
  });

  const memoizedCategories = useMemo(() => {
    return categoryData?.results;
  }, [categoryData?.results]);

  const data = {
    ...categoryData,
    pages: categoryData && Math.ceil(categoryData.count / limit),
    results: categoryData?.results.toSorted((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;

      return 0;
    }),
  };

  return {
    categories: memoizedCategories,
    data,
    isLoading,
  };
};
