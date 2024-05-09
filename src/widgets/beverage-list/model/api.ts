'use client';

import { drinkjoyApi } from '@/shared/services';

import { TMenusResponse } from './types';

export const createMenu = async (
  url: string,
  {
    args,
  }: {
    args: {
      establishment: string;
    };
  },
) => {
  const { data } = await drinkjoyApi.post<TMenusResponse>(url, { ...args });

  if (data) {
    localStorage.setItem('menu_id', String(data.id));
  }

  return data;
};
