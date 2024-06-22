'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/lib';

import { BeveragesResponse } from './types';

export const useGetBeverages = () => {
  const { data } = useSWR<BeveragesResponse>('/beverages', fetcher);

  const beveragesOptions = data
    ? data.results.map(item => ({
        id: item.id,
        key: item.name,
        label: item.name,
      }))
    : [];

  return {
    data,
    beveragesOptions,
  };
};
