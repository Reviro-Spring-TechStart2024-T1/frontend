'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';

export const useBeverages = <T>() =>
  useSWR<T>(`${process.env.NEXT_PUBLIC_API_URL}/beverages`, fetcher);
