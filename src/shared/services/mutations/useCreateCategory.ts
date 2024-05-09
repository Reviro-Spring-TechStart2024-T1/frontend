'use client';

import useSWRMutation from 'swr/mutation';

import { createCategory } from '@/shared';

export const useCreateCategory = () => {
  return useSWRMutation('/categories/', createCategory, {
    onSuccess() {
      console.log('success');
    },
    onError() {
      console.log('error');
    },
  });
};
