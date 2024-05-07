'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';

export const useBeverages = <T>(id: number) =>
  useSWR<T>(`${process.env.NEXT_PUBLIC_API_URL}/beverages/${id}`, fetcher, {
    refreshInterval: 0,
  });
