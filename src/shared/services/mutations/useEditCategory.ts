'use client';

import useSWRMutation from 'swr/mutation';

import { editCategory } from '@/shared';

export const useEditCategory = (id: string) => {
  return useSWRMutation(`/categories/${id}/`, editCategory, {
    onSuccess() {
      console.log('success');
    },
    onError() {
      console.log('error');
    },
  });
};
