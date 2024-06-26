'use client';

import useSWRMutation from 'swr/mutation';

import { updatePassword } from '../../api';

export const useUpdatePassword = () => {
  return useSWRMutation('/users/forgot-password/confirm/', updatePassword, {
    onError(error: string[][]) {
      console.log('Error:', error);
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};
