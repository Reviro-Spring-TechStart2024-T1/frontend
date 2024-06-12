'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import { TMenusResponse } from '@/widgets/beverage-list';

export const useMenu = (menuId: number | undefined) => {
  return useSWR<TMenusResponse>(
    () => (menuId ? `/menus/${menuId}/` : null),
    fetcher,
    {
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('error');
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
