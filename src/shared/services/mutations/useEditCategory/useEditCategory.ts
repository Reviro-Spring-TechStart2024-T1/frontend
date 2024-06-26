'use client';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { editCategory } from '../../api';

import { EditCategoryProps } from './types';

export const useEditCategory = ({ id }: EditCategoryProps) => {
  return useSWRMutation(`/categories/${id}/`, editCategory, {
    onError() {
      toast.success('The error occurred');
    },
    onSuccess() {
      toast.success('The category was updated');

      mutate(
        key => typeof key === 'string' && key.startsWith('/categories/'),
        undefined,
      );
    },
  });
};
