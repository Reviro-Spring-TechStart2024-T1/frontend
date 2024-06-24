'use client';

import useSWRMutation from 'swr/mutation';

import { editCategory } from '../../api';

import { EditCategoryProps } from './types';

export const useEditCategory = ({ id }: EditCategoryProps) => {
  return useSWRMutation(`/categories/${id}/`, editCategory, {
    onSuccess() {
      console.log('success');
    },
    onError() {
      console.log('error');
    },
  });
};
