'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';

import { TMenusResponse } from '../model';

export const useMenu = () => {
  const [menuId] = useLocalStorage('menu_id', null);

  return useSWR<TMenusResponse>(`/menus/${menuId}`, fetcher, {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });
};
