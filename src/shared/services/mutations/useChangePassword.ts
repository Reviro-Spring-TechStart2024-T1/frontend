'use client';

import useSWRMutation from 'swr/mutation';

import { changePassword } from '@/shared';

export const useChangePassword = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    '/users/change-password/',
    changePassword,
    {
      onError(error: string[][]) {
        console.log('Error:', error);
      },
      onSuccess: () => {
        console.log('success');
      },
    },
  );

  return {
    hasPasswordChanged: data,
    changePassword: trigger,
    changePasswordError: error,
    isPasswordChanging: isMutating,
  };
};
