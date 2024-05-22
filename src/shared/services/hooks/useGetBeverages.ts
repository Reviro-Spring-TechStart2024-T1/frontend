'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

interface Beverage {
  id: number;
  menu: number;
  name: string;
  category: number;
  price: number;
  description: string;
  in_stock: number;
}

interface BeveragesResponse {
  count: number;
  next: string;
  previous: string;
  results: Beverage[];
}

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
