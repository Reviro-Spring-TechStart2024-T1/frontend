'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import { TMenusResponse } from '@/widgets/beverage-list';

export const useMenu = (menuId: number | null) => {
  return useSWR<TMenusResponse>(`/menus/${menuId}/`, fetcher, {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
