'use client';

import useSWRMutation from 'swr/mutation';

import { deleteCategory } from '../../api';

import { DeleteCategoryProps } from './types';

export const useDeleteCategory = ({ id }: DeleteCategoryProps) => {
  return useSWRMutation(`/categories/${id}/`, deleteCategory, {
    onSuccess() {
      console.log('success');
    },
    onError() {
      console.log('error');
    },
  });
};
