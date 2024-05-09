'use client';

import { drinkjoyApi } from '@/shared/services';

import { TMenusResponse } from './types';

export const createMenu = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      establishment: string;
    };
  },
) => {
  const { data } = await drinkjoyApi.post<TMenusResponse>(url, { ...arg });

  if (data) {
    localStorage.setItem('menu_id', String(data.id));
  }

  return data;
};
