'use client';

import useSWRMutation from 'swr/mutation';

import { createMenu } from '@/widgets/beverage-list';

export const useCreateMenu = () => {
  return useSWRMutation(`/menus/`, createMenu, {
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });
};
