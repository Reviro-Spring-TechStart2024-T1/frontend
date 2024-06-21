'use client';

import useSWRMutation from 'swr/mutation';

import { createCategory } from '../../api';

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
