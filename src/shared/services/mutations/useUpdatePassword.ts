'use client';

import useSWRMutation from 'swr/mutation';

import { updatePassword } from '@/shared';

export const useUpdatePassword = () => {
  return useSWRMutation('/users/forgot-password/confirm/', updatePassword, {
    onError(error) {
      console.log('Error:', error);
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};
