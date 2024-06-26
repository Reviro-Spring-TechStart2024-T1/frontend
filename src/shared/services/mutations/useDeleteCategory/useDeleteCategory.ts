'use client';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { deleteCategory } from '../../api';

import { DeleteCategoryProps } from './types';

export const useDeleteCategory = ({ id }: DeleteCategoryProps) => {
  return useSWRMutation(`/categories/${id}/`, deleteCategory, {
    onError() {
      toast.success('The error occurred');
    },
    onSuccess() {
      toast.success('The category was deleted');

      mutate(
        key => typeof key === 'string' && key.startsWith('/categories/'),
        undefined,
      );
    },
  });
};
