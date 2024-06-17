'use client';

import useSWRMutation from 'swr/mutation';

import { forgotPassword } from '@/shared';

export const useForgotPassword = () => {
  return useSWRMutation('/users/forgot-password/', forgotPassword, {
    onError(error: string[]) {
      console.log('Error:', error);
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};
