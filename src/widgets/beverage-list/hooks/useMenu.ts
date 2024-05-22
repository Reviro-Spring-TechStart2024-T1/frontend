'use client';

import useSWR from 'swr';

import { fetcher, useLocalStorage } from '@/shared';
import { TMenusResponse } from '@/widgets/beverage-list';

export const useMenu = () => {
  const [menuId] = useLocalStorage('menu_id', null); //FIXME - is null even though on "Create Menu" localStorage gets updated correctly

  return useSWR<TMenusResponse>(`/menus/${menuId}`, fetcher, {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });
};
