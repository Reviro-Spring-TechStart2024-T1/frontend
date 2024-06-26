'use client';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { createCategory } from '../../api';

export const useCreateCategory = () => {
  return useSWRMutation('/categories/', createCategory, {
    onError() {
      toast.error('The error occurred');
    },
    onSuccess() {
      toast.success('The category was created');

      mutate(
        key => typeof key === 'string' && key.startsWith('/categories/'),
        undefined,
      );
    },
  });
};
