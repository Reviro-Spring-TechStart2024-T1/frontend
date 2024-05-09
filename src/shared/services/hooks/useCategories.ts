'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import { TCategoriesResponse } from '@/shared/services';

export const useCategories = () =>
  useSWR<TCategoriesResponse>(`/categories/`, fetcher, {
    refreshInterval: 20000,
    revalidateOnFocus: false,
  });
