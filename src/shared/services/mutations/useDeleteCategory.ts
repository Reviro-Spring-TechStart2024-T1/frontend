'use client';

import useSWRMutation from 'swr/mutation';

import { deleteCategory } from '@/shared';

export const useDeleteCategory = (id: string) => {
  return useSWRMutation(`/categories/${id}/`, deleteCategory, {
    onSuccess() {
      console.log('success');
    },
    onError() {
      console.log('error');
    },
  });
};
