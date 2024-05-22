'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import { TOrdersResponse } from '@/shared/services';

export const useOrders = () =>
  useSWR<TOrdersResponse>(`/orders/partners/`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });
