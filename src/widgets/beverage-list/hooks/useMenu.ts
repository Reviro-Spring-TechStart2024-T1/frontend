'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared';

import { TMenusResponse } from '../model';

export const useMenu = () => {
  const menuId = localStorage.getItem('menu_id');

  return useSWR<TMenusResponse>(`/menus/${menuId}`, fetcher, {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });
};
